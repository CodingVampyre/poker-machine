import {IPhase} from "../phase.interface";
import {Action, IPlayerAction} from "../../model/player-action.interface";
import {ITable, TableMessage} from "../../model/table.interface";
import {IPot} from "../../model/pot.interface";
import {IPlayer} from "../../model/player.interface";

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
                // remove him from all split pods
                table.pots = ActionPhase.removePlayerFromPots(currentActingPlayer, table.pots);
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
                    + ActionPhase.getDifferenceToHighestBid(action.player, table.players);
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

        return table;
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
     * returns how much the player must pay to call
     * @param playerIndex the current player
     * @param players all players participating in that game
     * @private
     */
    private static getDifferenceToHighestBid(playerIndex: number, players: IPlayer[]): number {
        const tokensOnTableForCurrentPlayer = ActionPhase.getTotalTokensOnTable(players[playerIndex]);
        const maxTokensOfAnyPlayer = ActionPhase.getHighestTokenOfAnyPlayer(players);
        return maxTokensOfAnyPlayer - tokensOnTableForCurrentPlayer;
    }

    /**
     *
     * @param player
     * @private
     */
    private static getTotalTokensOnTable(player: IPlayer) {
        return player.tokensOnTable.reduce((tokens, current) => tokens + current);
    }

    /**
     *
     * @param players
     * @private
     */
    private static getHighestTokenOfAnyPlayer(players: IPlayer[]) {
        const tokensOfAllPlayers = players.map(player => ActionPhase.getTotalTokensOnTable(player));
        return Math.max(...tokensOfAllPlayers);
    }

}