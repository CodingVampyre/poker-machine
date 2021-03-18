import {ITable, TableMessage} from "../../../model/table.interface";
import {CardColor, CardValue} from "../../../model/card.interface";
import {Action, IPlayerAction} from "../../../model/player-action.interface";

const tableState1: ITable = {
	players: [
		{ id: 'A', bankroll: 5900, tokensOnTable: 0, isParticipating: true, hand: [[CardColor.CLUBS, CardValue.JACK], [CardColor.DIAMONDS, CardValue.SEVEN],], hasActed: false, },
		{ id: 'B', bankroll: 2950, tokensOnTable: 50, isParticipating: true, hand: [[CardColor.HEARTS, CardValue.FOUR], [CardColor.CLUBS, CardValue.KING],], hasActed: false, },
		{ id: 'C', bankroll: 2900, tokensOnTable: 100, isParticipating: true, hand: [[CardColor.DIAMONDS, CardValue.FOUR], [CardColor.CLUBS, CardValue.TWO],], hasActed: false, },
		{ id: 'D', bankroll: 100, tokensOnTable: 0, isParticipating: true, hand: [[CardColor.SPADES, CardValue.TEN], [CardColor.DIAMONDS, CardValue.QUEEN],], hasActed: false, }
	],
	dealingPlayer: 0,
	pots: [{ amount: 0, }],
	board: {
		flop: { cards: [[CardColor.HEARTS, CardValue.TEN], [CardColor.DIAMONDS, CardValue.NINE], [CardColor.SPADES, CardValue.NINE],], revealed: false,},
		turn: { card: [CardColor.HEARTS, CardValue.FIVE], revealed: false, },
		river: { card: [CardColor.DIAMONDS, CardValue.KING], revealed: false, },
	},
	currentActingPlayer: { index: 3, possibleActions: [Action.RAISE, Action.ALL_IN, Action.FOLD], tokensRequiredToCall: 100, },
	blindAmount: 100,
	messages: [TableMessage.NEW_ROUND],
}

const action1: IPlayerAction = {
	player: 3,
	action: Action.ALL_IN,
}

const tableState2: ITable = {
	players: [
		{ id: 'A', bankroll: 5900, tokensOnTable: 0, isParticipating: true, hand: [[CardColor.CLUBS, CardValue.JACK], [CardColor.DIAMONDS, CardValue.SEVEN],], hasActed: false, },
		{ id: 'B', bankroll: 2950, tokensOnTable: 50, isParticipating: true, hand: [[CardColor.HEARTS, CardValue.FOUR], [CardColor.CLUBS, CardValue.KING],], hasActed: false, },
		{ id: 'C', bankroll: 2900, tokensOnTable: 100, isParticipating: true, hand: [[CardColor.DIAMONDS, CardValue.FOUR], [CardColor.CLUBS, CardValue.TWO],], hasActed: false, },
		{ id: 'D', bankroll: 0, tokensOnTable: 100, isParticipating: true, hand: [[CardColor.SPADES, CardValue.TEN], [CardColor.DIAMONDS, CardValue.QUEEN],], hasActed: true, }
	],
	dealingPlayer: 0,
	pots: [{ amount: 0, forPlayers: [0, 1, 2] }, { amount: 100, }],
	board: {
		flop: { cards: [[CardColor.HEARTS, CardValue.TEN], [CardColor.DIAMONDS, CardValue.NINE], [CardColor.SPADES, CardValue.NINE],], revealed: false,},
		turn: { card: [CardColor.HEARTS, CardValue.FIVE], revealed: false, },
		river: { card: [CardColor.DIAMONDS, CardValue.KING], revealed: false, },
	},
	currentActingPlayer: { index: 3, possibleActions: [Action.RAISE, Action.ALL_IN, Action.FOLD], tokensRequiredToCall: 100, },
	blindAmount: 100,
	messages: [TableMessage.NEW_ROUND],
}

export const Bundles: Array<{
	tableBefore: ITable,
	action: IPlayerAction,
	tableAfter: ITable,
}> = [
	{
		tableBefore: tableState1,
		action: action1,
		tableAfter: tableState2,
	}
];
