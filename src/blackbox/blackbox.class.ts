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
            case Action.RAISE: break;
            case Action.ALL_IN: break;
        }

        // if big blind did something and everyone has the same amount of money on the table, next go through

        // check if a round is near it's end

        // calculations for next player
        table.currentActingPlayer.index = (table.currentActingPlayer.index + 1) % table.players.length;
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
        if (table.players[playerIndex].isParticipating) { actions.push(Action.FOLD); }
        if (table.players[playerIndex].tokensOnTable === BlackBox.getHighestTokenOfAnyPlayer(table.players)) { actions.push(Action.CHECK); }
        if (
            table.players[playerIndex].tokensOnTable < BlackBox.getHighestTokenOfAnyPlayer(table.players) &&
            table.players[playerIndex].bankroll > BlackBox.getDifferenceToHighestBid(playerIndex, table.players)
        ) { actions.push(Action.CALL); }
        if (
            table.players[playerIndex].bankroll > BlackBox.getDifferenceToHighestBid(playerIndex, table.players)
        ) { actions.push(Action.RAISE, Action.ALL_IN); }
        return actions;
    }
}