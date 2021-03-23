import {ITable, TableMessage} from "../../../model/table.interface";
import {CardColor, CardValue} from "../../../model/card.interface";
import {Action, IPlayerAction} from "../../../model/player-action.interface";

const tableState1: ITable = {
	players: [
		{ id: 0, bankroll: 200, tokensOnTable: 0, isParticipating: true, hand: [[CardColor.CLUBS, CardValue.JACK], [CardColor.DIAMONDS, CardValue.SEVEN],], hasActed: false, },
		{ id: 1, bankroll: 400, tokensOnTable: 50, isParticipating: true, hand: [[CardColor.HEARTS, CardValue.FOUR], [CardColor.CLUBS, CardValue.KING],], hasActed: false, },
		{ id: 2, bankroll: 800, tokensOnTable: 100, isParticipating: true, hand: [[CardColor.DIAMONDS, CardValue.FOUR], [CardColor.CLUBS, CardValue.TWO],], hasActed: false, },
		{ id: 3, bankroll: 100, tokensOnTable: 0, isParticipating: true, hand: [[CardColor.SPADES, CardValue.TEN], [CardColor.DIAMONDS, CardValue.QUEEN],], hasActed: false, }
	],
	dealingPlayer: 0,
	pots: [{ amount: 150, potCap: undefined, forPlayers: [0, 1, 2, 3] }],
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
		{ id: 0, bankroll: 200, tokensOnTable: 0, isParticipating: true, hand: [[CardColor.CLUBS, CardValue.JACK], [CardColor.DIAMONDS, CardValue.SEVEN],], hasActed: false, },
		{ id: 1, bankroll: 400, tokensOnTable: 50, isParticipating: true, hand: [[CardColor.HEARTS, CardValue.FOUR], [CardColor.CLUBS, CardValue.KING],], hasActed: false, },
		{ id: 2, bankroll: 800, tokensOnTable: 100, isParticipating: true, hand: [[CardColor.DIAMONDS, CardValue.FOUR], [CardColor.CLUBS, CardValue.TWO],], hasActed: false, },
		{ id: 3, bankroll: 0, tokensOnTable: 100, isParticipating: true, hand: [[CardColor.SPADES, CardValue.TEN], [CardColor.DIAMONDS, CardValue.QUEEN],], hasActed: true, }
	],
	dealingPlayer: 0,
	pots: [{ amount: 250, potCap: 100, forPlayers: [0, 1, 2, 3] }, { amount: 0, forPlayers: [0, 1, 2], potCap: undefined, }],
	board: {
		flop: { cards: [[CardColor.HEARTS, CardValue.TEN], [CardColor.DIAMONDS, CardValue.NINE], [CardColor.SPADES, CardValue.NINE],], revealed: false,},
		turn: { card: [CardColor.HEARTS, CardValue.FIVE], revealed: false, },
		river: { card: [CardColor.DIAMONDS, CardValue.KING], revealed: false, },
	},
	currentActingPlayer: { index: 0, possibleActions: [Action.FOLD, Action.CALL, Action.RAISE, Action.ALL_IN], tokensRequiredToCall: 100, },
	blindAmount: 100,
	messages: [TableMessage.PLAYER_ALL_IN],
}

const action2: IPlayerAction = {
	player: 0,
	action: Action.FOLD,
}

const tableState3: ITable = {
	players: [
		{ id: 0, bankroll: 200, tokensOnTable: 0, isParticipating: false, hand: [[CardColor.CLUBS, CardValue.JACK], [CardColor.DIAMONDS, CardValue.SEVEN],], hasActed: true, },
		{ id: 1, bankroll: 400, tokensOnTable: 50, isParticipating: true, hand: [[CardColor.HEARTS, CardValue.FOUR], [CardColor.CLUBS, CardValue.KING],], hasActed: false, },
		{ id: 2, bankroll: 800, tokensOnTable: 100, isParticipating: true, hand: [[CardColor.DIAMONDS, CardValue.FOUR], [CardColor.CLUBS, CardValue.TWO],], hasActed: false, },
		{ id: 3, bankroll: 0, tokensOnTable: 100, isParticipating: true, hand: [[CardColor.SPADES, CardValue.TEN], [CardColor.DIAMONDS, CardValue.QUEEN],], hasActed: true, }
	],
	dealingPlayer: 0,
	pots: [{ amount: 250, potCap: 100, forPlayers: [1, 2, 3] }, { amount: 0, forPlayers: [1, 2], potCap: undefined, }],
	board: {
		flop: { cards: [[CardColor.HEARTS, CardValue.TEN], [CardColor.DIAMONDS, CardValue.NINE], [CardColor.SPADES, CardValue.NINE],], revealed: false,},
		turn: { card: [CardColor.HEARTS, CardValue.FIVE], revealed: false, },
		river: { card: [CardColor.DIAMONDS, CardValue.KING], revealed: false, },
	},
	currentActingPlayer: { index: 1, possibleActions: [Action.FOLD, Action.CALL, Action.RAISE, Action.ALL_IN], tokensRequiredToCall: 50, },
	blindAmount: 100,
	messages: [TableMessage.PLAYER_FOLDED],
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
	},
	{
		tableBefore: tableState2,
		action: action2,
		tableAfter: tableState3,
	}
];
