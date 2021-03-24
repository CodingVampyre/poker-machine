import {ITable} from "../model/table.interface";
import {HandValidator} from "../hand-validator/hand-validator.class";
import {Card} from "../model/card.interface";
import {IHandValidationResult} from "../hand-validator/hand-validation-result.interface";
import {IPlayer} from "../model/player.interface";

interface IPlayerWithResult {
	player: IPlayer;
	result: IHandValidationResult;
}

/**
 *
 * @param table
 * @return an ordered list with ids of players that won
 */
export function determineWinner(table: ITable): number[][] {
	// for every player, calculate their result
	const participatingPlayers = table.players.slice().filter(p => p.isParticipating);
	const board: Card[] = [...table.board.flop.cards, table.board.turn.card, table.board.river.card];
	const results = participatingPlayers.map(player => ({ result: HandValidator.validateHand(player.hand, board), player: player, }));

	/*
		sort by result, if results are equal by kicker and if they are equal, put them side by side
		Structure Example
		[
			[Flush/King, Flush/King],
			[Flush/Seven],
			[Pair/Three, Pair/Three],
			[High/Ace]
		]
	 */

	// Sort
	results.sort(sortByBestHand);

	// Group Similar
}

function toId(player: IPlayer) { return player.id; }

function sortByBestHand(a: IPlayerWithResult, b: IPlayerWithResult): -1 | 0 | 1 {
	if (a.result.hand > b.result.hand) { return -1; }
	if (a.result.hand < b.result.hand) { return 1; }

	if (a.result.highCard[1] > b.result.highCard[1]) { return -1; }
	if (a.result.highCard[1] < b.result.highCard[1]) { return 1; }

	return 0;
}
