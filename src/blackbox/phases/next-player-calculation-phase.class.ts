import {IPhase} from "../phase.interface";
import {ITable, TableMessage} from "../../model/table.interface";
import {Action, IPlayerAction} from "../../model/player-action.interface";
import {IPlayer} from "../../model/player.interface";

export class NextPlayerCalculationPhase implements IPhase {
    public execute(table: ITable, action: IPlayerAction): ITable | undefined {
        // calculations for next player

        // end round if no player can act
        const playersThatCanAct = table.players.filter(player => player.isParticipating && player.bankroll !== 0).map(p => p.id);
        if (playersThatCanAct.length === 0) { table.messages.push(TableMessage.ROUND_FINISHED); }

        // nullify current acting player
        if (table.messages.includes(TableMessage.ROUND_FINISHED)) {
            // reveal all
            if (!table.board.flop.revealed) {
                table.board.flop.revealed = true;
                table.messages.push(TableMessage.FLOP_REVEALED);
            }
            if (!table.board.turn.revealed) {
                table.board.turn.revealed = true;
                table.messages.push(TableMessage.TURN_REVEALED);
            }
            if (!table.board.river.revealed) {
                table.board.river.revealed = true;
                table.messages.push(TableMessage.RIVER_REVEALED);
            }

            // reset player
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
            const playerAllIn = NextPlayerCalculationPhase.isPlayerAllIn(table.players[table.currentActingPlayer.index]);
            if (playerIsParticipating && !playerAllIn) { canAct = true; }
        }

        // calculate possible actions and call value
        table.currentActingPlayer.possibleActions = NextPlayerCalculationPhase.calculatePossiblePlayerActions(table.currentActingPlayer.index, table);
        const differenceToHighestBid = NextPlayerCalculationPhase.getDifferenceToHighestBid(table.currentActingPlayer.index, table.players);
        if (differenceToHighestBid > 0) {
            table.currentActingPlayer.tokensRequiredToCall = differenceToHighestBid;
        } else {
            table.currentActingPlayer.tokensRequiredToCall = undefined;
        }

        return table;
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
        const isTokensOnTableEqualHighestToken = table.players[playerIndex].tokensOnTable === NextPlayerCalculationPhase.getHighestTokenOfAnyPlayer(table.players);
        if (isTokensOnTableEqualHighestToken) { actions.push(Action.CHECK); }

        // can call of below highest bid and enough money is there
        if (
            table.players[playerIndex].tokensOnTable < NextPlayerCalculationPhase.getHighestTokenOfAnyPlayer(table.players) &&
            table.players[playerIndex].bankroll > NextPlayerCalculationPhase.getDifferenceToHighestBid(playerIndex, table.players)
        ) { actions.push(Action.CALL); }

        // can raise if bankroll is higher then the amount required to call
        if (
            table.players[playerIndex].bankroll > NextPlayerCalculationPhase.getDifferenceToHighestBid(playerIndex, table.players)
        ) { actions.push(Action.RAISE); }

        // Can always go all in if got money
        if (table.players[playerIndex].bankroll > 0) { actions.push(Action.ALL_IN); }

        return actions;
    }

    /**
     * returns how much the player must pay to call
     * @param playerIndex the current player
     * @param players all players participating in that game
     * @private
     */
    private static getDifferenceToHighestBid(playerIndex: number, players: IPlayer[]): number {
        const tokensOnTableForCurrentPlayer = players[playerIndex].tokensOnTable;
        const maxTokensOfAnyPlayer = NextPlayerCalculationPhase.getHighestTokenOfAnyPlayer(players);
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

    /**
     * a player is all in when he has tokens on the table and no more tokens in a bank roll.
     * He should stay in game until the end
     * @param player
     */
    public static isPlayerAllIn(player: IPlayer) {
        const allTokensOnTable = player.tokensOnTable;
        return allTokensOnTable > 0 && player.bankroll === 0;
    }

}