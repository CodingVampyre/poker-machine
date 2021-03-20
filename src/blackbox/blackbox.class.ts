import {ITable, TableMessage} from "../model/table.interface";
import {Action, IPlayerAction} from "../model/player-action.interface";
import {IPlayer} from "../model/player.interface";
import {IPot} from "../model/pot.interface";
import {ValidationPhase} from "./phases/validation-phase.class";
import {IPhase} from "./phase.interface";

export class BlackBox {

    private static phases: IPhase[] = [
        new ValidationPhase(),
    ]

    /**
     * calculates the next state of a tablr
     * @param action
     * @param table
     */
    public static calculateNextState(action: IPlayerAction, table: ITable): ITable | undefined {

        // execute phases
        let currentStateTable: ITable | undefined = table;
        for (const phase of BlackBox.phases) {
            currentStateTable = phase.execute(table, action);
            if (currentStateTable === undefined) { return undefined; }
        }

        // PERFORM ACTION AND SIDE EFFECTS
        return BlackBox.perform(action, table);
    }

    public static perform(action: IPlayerAction, table: ITable): ITable {

        // wipe messages
        table.messages = [];

        // variables
        const currentActingPlayer = table.currentActingPlayer.index;

        // switch between actions
        switch(action.action) {
            case Action.FOLD: {
                // let player fold
                table.players[currentActingPlayer].isParticipating = false;
                table.messages.push(TableMessage.PLAYER_FOLDED);
                // remove him from all split pods
                table.pots = BlackBox.removePlayerFromPots(currentActingPlayer, table.pots);
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
                    let remaining = table.currentActingPlayer.tokensRequiredToCall;
                    for (const [index, pot] of table.pots.entries()) {
                        if (pot.potCap !== undefined) {
                            const deltaCap = pot.potCap - table.players[currentActingPlayer].tokensOnTable[index];
                            // add as much money to the pot until cap is full, switch to next one
                            if (deltaCap > 0) {
                                // fill up the difference between cap and what is already in that pot
                                table.players[currentActingPlayer].tokensOnTable[index] += deltaCap;
                                remaining -= deltaCap;
                            }
                        } else {
                            // add all the money to that pot
                            table.players[currentActingPlayer].tokensOnTable[index] += remaining;
                            pot.amount += remaining;
                            break;
                        }
                    }
                    table.messages.push(TableMessage.PLAYER_CALLED);
                }
                break;
            }
            case Action.RAISE: {
                // raise amount is value to call + the amount you want to raise FROM THAT
                const netRaiseAmount =
                    (action.raiseAmount !== undefined ? action.raiseAmount : 0)
                    + BlackBox.getDifferenceToHighestBid(action.player, table.players);
                const isRaiseAmountEnough = netRaiseAmount > 0;
                const isPlayerRichEnoughToRaise = table.players[action.player].bankroll > netRaiseAmount;
                if (isRaiseAmountEnough && isPlayerRichEnoughToRaise) {
                    table.players[action.player].bankroll -= netRaiseAmount;
                    let remaining = netRaiseAmount;
                    // for every pot, fill it up
                    // the last pot should get everything else
                    for (const [index, pot] of table.pots.entries()) {
                        // if there is a cap and the player has yet to fill it up
                        if (pot.potCap !== undefined && table.players[currentActingPlayer].tokensOnTable[index] < pot.potCap) {
                            const deltaCap = pot.potCap - table.players[currentActingPlayer].tokensOnTable[index];
                            // fill it up and remove this difference from tokens for next pots
                            table.players[currentActingPlayer].tokensOnTable[index] += deltaCap;
                            remaining -= deltaCap;
                        } else {
                            // if there are tokens remaining, put them into the last pot
                            if (remaining > 0) {
                                pot.amount += remaining;
                                table.players[currentActingPlayer].tokensOnTable[index] += remaining;
                                remaining = 0;
                            }
                            break;
                        }
                    }
                    table.messages.push(TableMessage.PLAYER_RAISED);
                }
                break;
            }
            case Action.ALL_IN: {
                // set amount
                const allInAmount = table.players[action.player].bankroll;
                table.players[action.player].bankroll = 0;
                table.players[action.player].tokensOnTable[0] = allInAmount; // bug all in logic is even more complex
                table.pots[0].amount += allInAmount;
                table.pots[0].potCap = allInAmount;

                // create new side pot for every player that can still participate
                table.pots.push({
                    amount: 0,
                    potCap: undefined,
                    forPlayers: table.players
                        .filter((player) => player.isParticipating && player.bankroll > 0)
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
            if (player.isParticipating && BlackBox.getTotalTokensOnTable(player) !== highestTokenOfAnyPlayer) {
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
        if (table.players.filter(player => player.isParticipating && !BlackBox.isPlayerAllIn(player)).length === 1) {
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
        // FIXME potential refactor to work without loop
        let canAct = false;
        while (!canAct) {
            table.currentActingPlayer.index = (table.currentActingPlayer.index + 1) % table.players.length;
            const playerIsParticipating = table.players[table.currentActingPlayer.index].isParticipating;
            const playerAllIn = BlackBox.isPlayerAllIn(table.players[table.currentActingPlayer.index]);
            if (playerIsParticipating && !playerAllIn) { canAct = true; }
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
        const tokensOnTableForCurrentPlayer = BlackBox.getTotalTokensOnTable(players[playerIndex]);
        const maxTokensOfAnyPlayer = BlackBox.getHighestTokenOfAnyPlayer(players);
        return maxTokensOfAnyPlayer - tokensOnTableForCurrentPlayer;
    }

    /**
     *
     * @param players
     * @private
     */
    private static getHighestTokenOfAnyPlayer(players: IPlayer[]) {
        const tokensOfAllPlayers = players.map(player => BlackBox.getTotalTokensOnTable(player));
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
        const isTokensOnTableEqualHighestToken = BlackBox.getTotalTokensOnTable(table.players[playerIndex]) === BlackBox.getHighestTokenOfAnyPlayer(table.players);
        if (isTokensOnTableEqualHighestToken) { actions.push(Action.CHECK); }

        // can call of below highest bid and enough money is there
        if (
            BlackBox.getTotalTokensOnTable(table.players[playerIndex]) < BlackBox.getHighestTokenOfAnyPlayer(table.players) &&
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

    /**
     * a player is all in when he has tokens on the table and no more tokens in a bank roll.
     * He should stay in game until the end
     * @param player
     */
    public static isPlayerAllIn(player: IPlayer) {
        const allTokensOnTable = player.tokensOnTable.reduce((previous, current) => previous + current);
        return allTokensOnTable > 0 && player.bankroll === 0;
    }

    /**
     * removes a player from all pots
     * @param currentActingPlayer
     * @param pots
     * @private
     */
    private static removePlayerFromPots(currentActingPlayer: number, pots: IPot[]) {
        return pots.map(pot => {
            if (pot.forPlayers !== undefined) {
                pot.forPlayers = pot.forPlayers.filter(player => player !== currentActingPlayer);
            }
            return pot;
        });
    }

    /**
     *
     * @param player
     * @private
     */
    private static getTotalTokensOnTable(player: IPlayer) {
        return player.tokensOnTable.reduce((tokens, current) => tokens + current);
    }
}