import {ITable, TableMessage} from "../../../model/table.interface";
import {CardColor, CardValue} from "../../../model/card.interface";
import {Action, IPlayerAction} from "../../../model/player-action.interface";

const tableState1: ITable = {
	players: [
		{ id: 'A', bankroll: 50, tokensOnTable: 0, isParticipating: true, hand: [[CardColor.CLUBS, CardValue.JACK], [CardColor.DIAMONDS, CardValue.SEVEN],], hasActed: false, },
		{ id: 'B', bankroll: 10, tokensOnTable: 50, isParticipating: true, hand: [[CardColor.HEARTS, CardValue.FOUR], [CardColor.CLUBS, CardValue.KING],], hasActed: false, },
		{ id: 'C', bankroll: 800, tokensOnTable: 100, isParticipating: true, hand: [[CardColor.DIAMONDS, CardValue.FOUR], [CardColor.CLUBS, CardValue.TWO],], hasActed: false, },
		{ id: 'D', bankroll: 100, tokensOnTable: 0, isParticipating: true, hand: [[CardColor.SPADES, CardValue.TEN], [CardColor.DIAMONDS, CardValue.QUEEN],], hasActed: false, }
	],
	dealingPlayer: 0,
	pots: [{ amount: 150, potCap: undefined }],
	board: {
		flop: { cards: [[CardColor.HEARTS, CardValue.TEN], [CardColor.DIAMONDS, CardValue.NINE], [CardColor.SPADES, CardValue.NINE],], revealed: false,},
		turn: { card: [CardColor.HEARTS, CardValue.FIVE], revealed: false, },
		river: { card: [CardColor.DIAMONDS, CardValue.KING], revealed: false, },
	},
	currentActingPlayer: { index: 3, possibleActions: [Action.FOLD, Action.ALL_IN], tokensRequiredToCall: undefined, },
	blindAmount: 100,
	messages: [TableMessage.NEW_ROUND],
}

const action1: IPlayerAction = {
	player: 3,
	action: Action.ALL_IN,
}

const tableState2: ITable = {
	players: [
		{ id: 'A', bankroll: 50, tokensOnTable: 0, isParticipating: true, hand: [[CardColor.CLUBS, CardValue.JACK], [CardColor.DIAMONDS, CardValue.SEVEN],], hasActed: false, },
		{ id: 'B', bankroll: 10, tokensOnTable: 50, isParticipating: true, hand: [[CardColor.HEARTS, CardValue.FOUR], [CardColor.CLUBS, CardValue.KING],], hasActed: false, },
		{ id: 'C', bankroll: 800, tokensOnTable: 100, isParticipating: true, hand: [[CardColor.DIAMONDS, CardValue.FOUR], [CardColor.CLUBS, CardValue.TWO],], hasActed: false, },
		{ id: 'D', bankroll: 0, tokensOnTable: 100, isParticipating: true, hand: [[CardColor.SPADES, CardValue.TEN], [CardColor.DIAMONDS, CardValue.QUEEN],], hasActed: true, }
	],
	dealingPlayer: 0,
	pots: [{ amount: 250, potCap: 100 }, { amount: 0, potCap: undefined, forPlayers: [0, 1, 2] }],
	board: {
		flop: { cards: [[CardColor.HEARTS, CardValue.TEN], [CardColor.DIAMONDS, CardValue.NINE], [CardColor.SPADES, CardValue.NINE],], revealed: false,},
		turn: { card: [CardColor.HEARTS, CardValue.FIVE], revealed: false, },
		river: { card: [CardColor.DIAMONDS, CardValue.KING], revealed: false, },
	},
	currentActingPlayer: { index: 0, possibleActions: [Action.FOLD, Action.ALL_IN], tokensRequiredToCall: undefined, },
	blindAmount: 100,
	messages: [TableMessage.PLAYER_ALL_IN],
}

const action2: IPlayerAction = {
	player: 0,
	action: Action.ALL_IN,
}

const tableState3: ITable = {
	players: [
		{ id: 'A', bankroll: 0, tokensOnTable: 50, isParticipating: true, hand: [[CardColor.CLUBS, CardValue.JACK], [CardColor.DIAMONDS, CardValue.SEVEN],], hasActed: true, },
		{ id: 'B', bankroll: 10, tokensOnTable: 50, isParticipating: true, hand: [[CardColor.HEARTS, CardValue.FOUR], [CardColor.CLUBS, CardValue.KING],], hasActed: false, },
		{ id: 'C', bankroll: 800, tokensOnTable: 100, isParticipating: true, hand: [[CardColor.DIAMONDS, CardValue.FOUR], [CardColor.CLUBS, CardValue.TWO],], hasActed: false, },
		{ id: 'D', bankroll: 0, tokensOnTable: 100, isParticipating: true, hand: [[CardColor.SPADES, CardValue.TEN], [CardColor.DIAMONDS, CardValue.QUEEN],], hasActed: true, }
	],
	dealingPlayer: 0,
	pots: [{ amount: 150, potCap: 50, }, { amount: 150, potCap: 50, forPlayers: [1, 2, 3] }, { amount: 0, potCap: undefined, forPlayers: [1, 2] }],
	board: {
		flop: { cards: [[CardColor.HEARTS, CardValue.TEN], [CardColor.DIAMONDS, CardValue.NINE], [CardColor.SPADES, CardValue.NINE],], revealed: false,},
		turn: { card: [CardColor.HEARTS, CardValue.FIVE], revealed: false, },
		river: { card: [CardColor.DIAMONDS, CardValue.KING], revealed: false, },
	},
	currentActingPlayer: { index: 1, possibleActions: [Action.FOLD, Action.ALL_IN], tokensRequiredToCall: undefined, },
	blindAmount: 100,
	messages: [],
}

const action3: IPlayerAction = {
	player: 1,
	action: Action.ALL_IN,
}

const tableState4: ITable = {
	players: [
		{ id: 'A', bankroll: 0, tokensOnTable: 50, isParticipating: true, hand: [[CardColor.CLUBS, CardValue.JACK], [CardColor.DIAMONDS, CardValue.SEVEN],], hasActed: true, },
		{ id: 'B', bankroll: 0, tokensOnTable: 60, isParticipating: true, hand: [[CardColor.HEARTS, CardValue.FOUR], [CardColor.CLUBS, CardValue.KING],], hasActed: true, },
		{ id: 'C', bankroll: 800, tokensOnTable: 100, isParticipating: true, hand: [[CardColor.DIAMONDS, CardValue.FOUR], [CardColor.CLUBS, CardValue.TWO],], hasActed: false, },
		{ id: 'D', bankroll: 0, tokensOnTable: 100, isParticipating: true, hand: [[CardColor.SPADES, CardValue.TEN], [CardColor.DIAMONDS, CardValue.QUEEN],], hasActed: true, }
	],
	dealingPlayer: 0,
	pots: [{ potCap: 50, amount: 150 }, { potCap: 10, forPlayers: [1, 2, 3], amount: 30, }, { potCap: 40, forPlayers: [2, 3], amount: 80 }, { potCap: undefined, amount: 0, forPlayers: [2] }],
	board: {
		flop: { cards: [[CardColor.HEARTS, CardValue.TEN], [CardColor.DIAMONDS, CardValue.NINE], [CardColor.SPADES, CardValue.NINE],], revealed: false,},
		turn: { card: [CardColor.HEARTS, CardValue.FIVE], revealed: false, },
		river: { card: [CardColor.DIAMONDS, CardValue.KING], revealed: false, },
	},
	currentActingPlayer: { index: 2, possibleActions: [Action.FOLD, Action.CHECK, Action.RAISE, Action.ALL_IN], tokensRequiredToCall: undefined, },
	blindAmount: 100,
	messages: [],
}

const action4: IPlayerAction = {
	player: 2,
	action: Action.ALL_IN,
}

const tableState5: ITable = {
	players: [
		{ id: 'A', bankroll: 0, tokensOnTable: 50, isParticipating: true, hand: [[CardColor.CLUBS, CardValue.JACK], [CardColor.DIAMONDS, CardValue.SEVEN],], hasActed: true, },
		{ id: 'B', bankroll: 0, tokensOnTable: 60, isParticipating: true, hand: [[CardColor.HEARTS, CardValue.FOUR], [CardColor.CLUBS, CardValue.KING],], hasActed: true, },
		{ id: 'C', bankroll: 0, tokensOnTable: 900, isParticipating: true, hand: [[CardColor.DIAMONDS, CardValue.FOUR], [CardColor.CLUBS, CardValue.TWO],], hasActed: true, },
		{ id: 'D', bankroll: 0, tokensOnTable: 100, isParticipating: true, hand: [[CardColor.SPADES, CardValue.TEN], [CardColor.DIAMONDS, CardValue.QUEEN],], hasActed: true, }
	],
	dealingPlayer: 0,
	pots: [],
	board: {
		flop: { cards: [[CardColor.HEARTS, CardValue.TEN], [CardColor.DIAMONDS, CardValue.NINE], [CardColor.SPADES, CardValue.NINE],], revealed: true,},
		turn: { card: [CardColor.HEARTS, CardValue.FIVE], revealed: true, },
		river: { card: [CardColor.DIAMONDS, CardValue.KING], revealed: true, },
	},
	currentActingPlayer: { index: -1, possibleActions: [], tokensRequiredToCall: undefined, },
	blindAmount: 100,
	messages: [TableMessage.ROUND_FINISHED, TableMessage.PLAYER_ALL_IN, TableMessage.FLOP_REVEALED, TableMessage.TURN_REVEALED, TableMessage.RIVER_REVEALED],
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
	},
	{
		tableBefore: tableState3,
		action: action3,
		tableAfter: tableState4,
	},
	{
		tableBefore: tableState4,
		action: action4,
		tableAfter: tableState5,
	}
];
