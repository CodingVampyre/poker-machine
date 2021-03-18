import {ITable, TableMessage} from "../model/table.interface";
import {Action, IPlayerAction} from "../model/player-action.interface";
import {IPlayer} from "../model/player.interface";

export class BlackBox {

    /**
     * calculates the next state of a tablr
     * @param action
     * @param table
     */
    public static calculateNextState(action: IPlayerAction, table: ITable): ITable | undefined {

        // VALIDATE ACTION AGAINST TABLE
        const isValidAction = BlackBox.validate(action, table);
        if (!isValidAction) { return undefined }

        // PERFORM ACTION AND SIDE EFFECTS
        return BlackBox.perform(action, table);
    }

    /**
     * checks if a player can submit the provided action to the table
     * @param action
     * @param table
     */
    public static validate(action: IPlayerAction, table: ITable): boolean {
        // Check if it is players turn
        if (action.player !== table.currentActingPlayer.index) { return false; }

        // check if player may perform action
        if (!table.currentActingPlayer.possibleActions.includes(action.action)) { return false; }

        // check if player has enough money for action
        return BlackBox
            .calculatePossiblePlayerActions(action.player, table)
            .includes(action.action);
    }

    public static perform(action: IPlayerAction, table: ITable): ITable {

        // wipe messages
        table.messages = [];

        // variables
        const currentActingPlayer = table.currentActingPlayer.index;

        // switch between actions
        switch(action.action) {
            case Action.FOLD: {
                table.players[currentActingPlayer].isParticipating = false;
                table.messages.push(TableMessage.PLAYER_FOLDED);
                break;
            }
            case Action.CHECK: {
                table.messages.push(TableMessage.PLAYER_CHECKED);
                break;
            }
            case Action.CALL: {
                // remove tokens from bankroll and put them onto the table
                if (table.currentActingPlayer.tokensRequiredToCall) {
                    table.players[currentActingPlayer].bankroll -= table.currentActingPlayer.tokensRequiredToCall;
                    table.players[currentActingPlayer].tokensOnTable += table.currentActingPlayer.tokensRequiredToCall;
                    table.pots[0].amount += table.currentActingPlayer.tokensRequiredToCall;
                    table.messages.push(TableMessage.PLAYER_CALLED);
                }
                break;
            }
            case Action.RAISE: {
                // raise amount is value to call + the amount you want to raise FROM THAT
                const netRaiseAmount =
                    (action.raiseAmount !== undefined ? action.raiseAmount : 0)
                    + BlackBox.getDifferenceToHighestBid(action.player, table.players);
                if (
                    netRaiseAmount > 0 &&
                    table.players[action.player].bankroll > netRaiseAmount
                ) {
                    table.players[action.player].bankroll -= netRaiseAmount;
                    table.players[action.player].tokensOnTable += netRaiseAmount;
                    table.pots[0].amount += netRaiseAmount;
                    table.messages.push(TableMessage.PLAYER_RAISED);
                }
                break;
            }
            case Action.ALL_IN: {
                // set amount
                const allInAmount = table.players[action.player].bankroll;
                table.players[action.player].bankroll = 0;
                table.players[action.player].tokensOnTable = allInAmount;
                table.pots[0].amount += allInAmount;

                // create new side pot
                table.pots.unshift({
                    amount: 0,
                    forPlayers: table.players
                        .filter((player, index) => player.isParticipating && player.bankroll > 0)
                        .map((player, index) => index),
                });

                table.messages.push(TableMessage.PLAYER_ALL_IN);
                break;
            }
        }
        table.players[currentActingPlayer].hasActed = true;

        // check if every player did something
        const everyPlayerActed = table.players.filter(player => player.isParticipating && !player.hasActed).length === 0;

        // if big blind did something and everyone has the same amount of money on the table, next go through
        let everyPlayerHasSameAmount = true;
        const highestTokenOfAnyPlayer = BlackBox.getHighestTokenOfAnyPlayer(table.players);
        for (const player of table.players) {
            if (player.isParticipating && player.tokensOnTable !== highestTokenOfAnyPlayer) {
                everyPlayerHasSameAmount = false;
                break;
            }
        }
        // unlock flop, turn and river
        const isNextStepAvailable = everyPlayerActed && everyPlayerHasSameAmount;
        if (isNextStepAvailable) {
            if (!table.board.flop.revealed) {
                table.board.flop.revealed = true;
                table.messages.push(TableMessage.FLOP_REVEALED);
                table.messages.push(TableMessage.NEW_GO_THROUGH);
            }
            else if (!table.board.turn.revealed) {
                table.board.turn.revealed = true;
                table.messages.push(TableMessage.TURN_REVEALED);
                table.messages.push(TableMessage.NEW_GO_THROUGH);
            }
            else if (!table.board.river.revealed) {
                table.board.river.revealed = true;
                table.messages.push(TableMessage.RIVER_REVEALED);
                table.messages.push(TableMessage.NEW_GO_THROUGH);
            }
            else {
                table.messages.push(TableMessage.ROUND_FINISHED);
            }
            table.messages.push(TableMessage.GO_TROUGH_FINISHED);
            for (const player of table.players) {
                player.hasActed = false;
            }
        }

        // check there are more then two players left
        if (table.players.filter(player => player.isParticipating).length === 1) {
            // player wins
            table.messages.push(TableMessage.ROUND_FINISHED);
        }

        // calculations for next player
        if(table.messages.includes(TableMessage.ROUND_FINISHED)) {
            table.currentActingPlayer.possibleActions = [];
            table.currentActingPlayer.index = -1;
            table.currentActingPlayer.tokensRequiredToCall = undefined;
            return table;
        }

        // select next player
        let canAct = false;
        while (!canAct) {
            table.currentActingPlayer.index = (table.currentActingPlayer.index + 1) % table.players.length;
            if (table.players[table.currentActingPlayer.index].isParticipating) { canAct = true; }
        }

        // calculate possible actions and call value
        table.currentActingPlayer.possibleActions = BlackBox.calculatePossiblePlayerActions(table.currentActingPlayer.index, table);
        const differenceToHighestBid = BlackBox.getDifferenceToHighestBid(table.currentActingPlayer.index, table.players);
        if (differenceToHighestBid > 0) {
            table.currentActingPlayer.tokensRequiredToCall = differenceToHighestBid;
        } else {
            table.currentActingPlayer.tokensRequiredToCall = undefined;
        }

        return table;
    }

    /**
     * returns how much the player must pay to call
     * @param playerIndex the current player
     * @param players all players participating in that game
     * @private
     */
    private static getDifferenceToHighestBid(playerIndex: number, players: IPlayer[]): number {
        const tokensOnTableForCurrentPlayer = players[playerIndex].tokensOnTable;
        const maxTokensOfAnyPlayer = BlackBox.getHighestTokenOfAnyPlayer(players);
        return maxTokensOfAnyPlayer - tokensOnTableForCurrentPlayer;
    }

    /**
     *
     * @param players
     * @private
     */
    private static getHighestTokenOfAnyPlayer(players: IPlayer[]) {
        const tokensOfAllPlayers = players.map(player => player.tokensOnTable)
        return Math.max(...tokensOfAllPlayers);
    }

    /**
     * looks on the actions a player may perform
     * @param playerIndex
     * @param table
     * @private
     */
    private static calculatePossiblePlayerActions(playerIndex: number, table: ITable): Action[] {
        if (!table.players[playerIndex].isParticipating) { return []; }
        const actions: Action[] = [];

        // a player can fold every time
        if (table.players[playerIndex].isParticipating) { actions.push(Action.FOLD); }

        // can check if bid as much as the highest bidder
        if (table.players[playerIndex].tokensOnTable === BlackBox.getHighestTokenOfAnyPlayer(table.players)) { actions.push(Action.CHECK); }

        // can call of below highest bid and enough money is there
        if (
            table.players[playerIndex].tokensOnTable < BlackBox.getHighestTokenOfAnyPlayer(table.players) &&
            table.players[playerIndex].bankroll > BlackBox.getDifferenceToHighestBid(playerIndex, table.players)
        ) { actions.push(Action.CALL); }

        // can raise if bankroll is higher then the amount required to call
        if (
            table.players[playerIndex].bankroll > BlackBox.getDifferenceToHighestBid(playerIndex, table.players)
        ) { actions.push(Action.RAISE); }

        // Can always go all in if got money
        if (table.players[playerIndex].bankroll > 0) { actions.push(Action.ALL_IN); }

        return actions;
    }
}