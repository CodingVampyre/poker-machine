import {IPhase} from "../phase.interface";
import {ITable, TableMessage} from "../../model/table.interface";
import {IPlayerAction} from "../../model/player-action.interface";
import {IPlayer} from "../../model/player.interface";

export class GoThroughCheckPhase implements IPhase {
    public execute(table: ITable, action: IPlayerAction): ITable | undefined {
        // check if every player did something
        const everyPlayerActed = table.players.filter(player => player.isParticipating && !player.hasActed).length === 0;

        // if big blind did something and everyone has the same amount of money on the table, next go through
        let everyPlayerHasSameAmount = true;
        const highestTokenOfAnyPlayer = GoThroughCheckPhase.getHighestTokenOfAnyPlayer(table.players);
        for (const player of table.players) {
            if (player.isParticipating && GoThroughCheckPhase.getTotalTokensOnTable(player) !== highestTokenOfAnyPlayer) {
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

        // select all players that participate and are not all in
        const actingPlayers = table.players.filter(player => player.isParticipating && !GoThroughCheckPhase.isPlayerAllIn(player));
        // if there is only one player left
        const onlyLastPlayerStanding = actingPlayers.length === 1;
        // wait until he has acted and then end the round
        if (onlyLastPlayerStanding && actingPlayers[0].hasActed) {
            // player wins
            table.messages.push(TableMessage.ROUND_FINISHED);
        }

        return table;
    }

    /**
     * a player is all in when he has tokens on the table and no more tokens in a bank roll.
     * He should stay in game until the end
     * @param player
     */
    public static isPlayerAllIn(player: IPlayer) {
        const allTokensOnTable = player.tokensOnTable;
        return allTokensOnTable > 0 && player.bankroll === 0;
    }

    /**
     *
     * @param players
     * @private
     */
    private static getHighestTokenOfAnyPlayer(players: IPlayer[]) {
        const tokensOfAllPlayers = players.map(player => GoThroughCheckPhase.getTotalTokensOnTable(player));
        return Math.max(...tokensOfAllPlayers);
    }

    /**
     *
     * @param player
     * @private
     */
    private static getTotalTokensOnTable(player: IPlayer) {
        return player.tokensOnTable;
    }
}