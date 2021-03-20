import {IPhase} from "../phase.interface";
import {ITable} from "../../model/table.interface";
import {Action, IPlayerAction} from "../../model/player-action.interface";
import {IPlayer} from "../../model/player.interface";

export class ValidationPhase implements IPhase {

    public execute(table: ITable, action: IPlayerAction): ITable | undefined {
        // Check if it is players turn
        if (action.player !== table.currentActingPlayer.index) { return undefined; }

        // check if player may perform action
        if (!table.currentActingPlayer.possibleActions.includes(action.action)) { return undefined; }

        // check if player has enough money for action
        const canPerformAction = ValidationPhase
            .calculatePossiblePlayerActions(action.player, table)
            .includes(action.action);

        return canPerformAction ? table : undefined;
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
        const isTokensOnTableEqualHighestToken = ValidationPhase.getTotalTokensOnTable(table.players[playerIndex]) === ValidationPhase.getHighestTokenOfAnyPlayer(table.players);
        if (isTokensOnTableEqualHighestToken) { actions.push(Action.CHECK); }

        // can call of below highest bid and enough money is there
        if (
            ValidationPhase.getTotalTokensOnTable(table.players[playerIndex]) < ValidationPhase.getHighestTokenOfAnyPlayer(table.players) &&
            table.players[playerIndex].bankroll > ValidationPhase.getDifferenceToHighestBid(playerIndex, table.players)
        ) { actions.push(Action.CALL); }

        // can raise if bankroll is higher then the amount required to call
        if (
            table.players[playerIndex].bankroll > ValidationPhase.getDifferenceToHighestBid(playerIndex, table.players)
        ) { actions.push(Action.RAISE); }

        // Can always go all in if got money
        if (table.players[playerIndex].bankroll > 0) { actions.push(Action.ALL_IN); }

        return actions;
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
        const tokensOfAllPlayers = players.map(player => ValidationPhase.getTotalTokensOnTable(player));
        return Math.max(...tokensOfAllPlayers);
    }

    /**
     * returns how much the player must pay to call
     * @param playerIndex the current player
     * @param players all players participating in that game
     * @private
     */
    private static getDifferenceToHighestBid(playerIndex: number, players: IPlayer[]): number {
        const tokensOnTableForCurrentPlayer = ValidationPhase.getTotalTokensOnTable(players[playerIndex]);
        const maxTokensOfAnyPlayer = ValidationPhase.getHighestTokenOfAnyPlayer(players);
        return maxTokensOfAnyPlayer - tokensOnTableForCurrentPlayer;
    }

}