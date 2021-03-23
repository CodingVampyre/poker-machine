import {IPhase} from "../phase.interface";
import {Action, IPlayerAction} from "../../model/player-action.interface";
import {ITable, TableMessage} from "../../model/table.interface";
import {IPot} from "../../model/pot.interface";
import {IPlayer} from "../../model/player.interface";
import {calculatePots} from "../utilities/calculate-pots.function";

export class ActionPhase implements IPhase {
    public execute(table: ITable, action: IPlayerAction): ITable | undefined {

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
                break;
            }
            case Action.CHECK: {
                table.messages.push(TableMessage.PLAYER_CHECKED);
                break;
            }
            case Action.CALL: {
                // remove tokens from bankroll and put them onto the table
                if (table.currentActingPlayer.tokensRequiredToCall !== undefined) {
                    table.players[currentActingPlayer].bankroll -= table.currentActingPlayer.tokensRequiredToCall;
                    table.players[currentActingPlayer].tokensOnTable += table.currentActingPlayer.tokensRequiredToCall;
                    table.messages.push(TableMessage.PLAYER_CALLED);
                }
                break;
            }
            case Action.RAISE: {
                // raise amount is value to call + the amount you want to raise FROM THAT
                const netRaiseAmount =
                    (action.raiseAmount !== undefined ? action.raiseAmount : 0)
                    + ActionPhase.getDifferenceToHighestBid(action.player, table.players);
                const isRaiseAmountEnough = netRaiseAmount > 0;
                const isPlayerRichEnoughToRaise = table.players[action.player].bankroll > netRaiseAmount;
                if (isRaiseAmountEnough && isPlayerRichEnoughToRaise) {
                    table.players[currentActingPlayer].bankroll -= netRaiseAmount;
                    table.players[currentActingPlayer].tokensOnTable += netRaiseAmount;
                    table.messages.push(TableMessage.PLAYER_RAISED);
                }
                break;
            }
            case Action.ALL_IN: {
                // set amount
                const allInAmount = table.players[action.player].bankroll;
                table.players[action.player].bankroll = 0;
                table.players[action.player].tokensOnTable = allInAmount;
                table.messages.push(TableMessage.PLAYER_ALL_IN);
                break;
            }
        }
        table.pots = calculatePots(table.players);
        table.players[currentActingPlayer].hasActed = true;

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
        const maxTokensOfAnyPlayer = ActionPhase.getHighestTokenOfAnyPlayer(players);
        return maxTokensOfAnyPlayer - tokensOnTableForCurrentPlayer;
    }

    /**
     *
     * @param players
     * @private
     */
    private static getHighestTokenOfAnyPlayer(players: IPlayer[]) {
        const tokensOfAllPlayers = players.map(player => player.tokensOnTable);
        return Math.max(...tokensOfAllPlayers);
    }

}