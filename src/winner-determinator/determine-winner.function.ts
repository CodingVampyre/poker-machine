import {ITable} from "../model/table.interface";
import {HandValidator} from "../hand-validator/hand-validator.class";
import {Card} from "../model/card.interface";

export function determineWinner(table: ITable) {
	// for every player, calculate their result
	const board: Card[] = [...table.board.flop.cards, table.board.turn.card, table.board.river.card];
	const results = table.players.map(player => HandValidator.validateHand(player.hand, board));

	// check if two or more players share the same highest result

	// compare their highest card

	// if high card is equal, split pot
}