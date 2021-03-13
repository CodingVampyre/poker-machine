import {CardColor, CardValue} from "../../../model/card.interface";
import {ITable, TableMessage} from "../../../model/table.interface";
import {Action, IPlayerAction} from "../../../model/player-action.interface";

/**
 * Table At the beginning
 */
const tableState1: ITable = {
	players: [
		{ id: 'A', bankroll: 3000, tokensOnTable: 0, hand: [[CardColor.CLUBS, CardValue.JACK], [CardColor.DIAMONDS, CardValue.SEVEN],] },
		{ id: 'B', bankroll: 3000, tokensOnTable: 50, hand: [[CardColor.HEARTS, CardValue.FOUR], [CardColor.CLUBS, CardValue.KING],] },
		{ id: 'C', bankroll: 3000, tokensOnTable: 100, hand: [[CardColor.DIAMONDS, CardValue.FOUR], [CardColor.CLUBS, CardValue.TWO],] },
		{ id: 'D', bankroll: 3000, tokensOnTable: 0, hand: [[CardColor.SPADES, CardValue.TEN], [CardColor.DIAMONDS, CardValue.QUEEN],] }
	],
	pots: [{ amount: 150, }],
	board: {
		flop: { cards: [[CardColor.HEARTS, CardValue.TEN], [CardColor.DIAMONDS, CardValue.NINE], [CardColor.SPADES, CardValue.NINE],], revealed: false,},
		turn: { card: [CardColor.HEARTS, CardValue.FIVE], revealed: false, },
		river: { card: [CardColor.DIAMONDS, CardValue.KING], revealed: false, },
	},
	currentActingPlayer: { index: 3, possibleActions: [Action.FOLD, Action.CALL, Action.RAISE, Action.ALL_IN] },
	dealingPlayer: 0,
	bigBlindHasActed: false,
	blindAmount: 100,
	messages: [TableMessage.NEW_GAME, TableMessage.NEW_ROUND, TableMessage.NEW_GO_THROUGH]
}

const action1: IPlayerAction = {
	player: 3,
	action: Action.CALL,
}

const tableState2: ITable = {
	players: [
		{ id: 'A', bankroll: 3000, tokensOnTable: 0, hand: [[CardColor.CLUBS, CardValue.JACK], [CardColor.DIAMONDS, CardValue.SEVEN],] },
		{ id: 'B', bankroll: 3000, tokensOnTable: 50, hand: [[CardColor.HEARTS, CardValue.FOUR], [CardColor.CLUBS, CardValue.KING],] },
		{ id: 'C', bankroll: 3000, tokensOnTable: 100, hand: [[CardColor.DIAMONDS, CardValue.FOUR], [CardColor.CLUBS, CardValue.TWO],] },
		{ id: 'D', bankroll: 3000, tokensOnTable: 100, hand: [[CardColor.SPADES, CardValue.TEN], [CardColor.DIAMONDS, CardValue.QUEEN],] }
	],
	dealingPlayer: 0,
	pots: [{ amount: 250, }],
	board: {
		flop: { cards: [[CardColor.HEARTS, CardValue.TEN], [CardColor.DIAMONDS, CardValue.NINE], [CardColor.SPADES, CardValue.NINE],], revealed: false,},
		turn: { card: [CardColor.HEARTS, CardValue.FIVE], revealed: false, },
		river: { card: [CardColor.DIAMONDS, CardValue.KING], revealed: false, },
	},
	currentActingPlayer: { index: 0, possibleActions: [Action.FOLD, Action.CALL, Action.RAISE, Action.ALL_IN] },
	bigBlindHasActed: false,
	blindAmount: 100,
	messages: [TableMessage.PLAYER_CALLED]
}

const action2: IPlayerAction = {
	player: 0,
	action: Action.CALL,
}

const tableState3: ITable = {
	players: [
		{ id: 'A', bankroll: 3000, tokensOnTable: 100, hand: [[CardColor.CLUBS, CardValue.JACK], [CardColor.DIAMONDS, CardValue.SEVEN],] },
		{ id: 'B', bankroll: 3000, tokensOnTable: 50, hand: [[CardColor.HEARTS, CardValue.FOUR], [CardColor.CLUBS, CardValue.KING],] },
		{ id: 'C', bankroll: 3000, tokensOnTable: 100, hand: [[CardColor.DIAMONDS, CardValue.FOUR], [CardColor.CLUBS, CardValue.TWO],] },
		{ id: 'D', bankroll: 3000, tokensOnTable: 100, hand: [[CardColor.SPADES, CardValue.TEN], [CardColor.DIAMONDS, CardValue.QUEEN],] }
	],
	dealingPlayer: 0,
	pots: [{ amount: 350, }],
	board: {
		flop: { cards: [[CardColor.HEARTS, CardValue.TEN], [CardColor.DIAMONDS, CardValue.NINE], [CardColor.SPADES, CardValue.NINE],], revealed: false,},
		turn: { card: [CardColor.HEARTS, CardValue.FIVE], revealed: false, },
		river: { card: [CardColor.DIAMONDS, CardValue.KING], revealed: false, },
	},
	currentActingPlayer: { index: 1, possibleActions: [Action.FOLD, Action.CALL, Action.RAISE, Action.ALL_IN] },
	bigBlindHasActed: false,
	blindAmount: 100,
	messages: [TableMessage.PLAYER_CALLED]
}

export const bundles: Array<{
	tableBefore: ITable,
	action: IPlayerAction,
	tableAfter: ITable,
}> = [
	{
		tableBefore: tableState1,
		action: action1,
		tableAfter: tableState2,
	},
	{
		tableBefore: tableState2,
		action: action2,
		tableAfter: tableState3,
	}
];
