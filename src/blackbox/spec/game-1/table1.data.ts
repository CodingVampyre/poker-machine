import {CardColor, CardValue} from "../../../model/card.interface";
import {ITable, TableMessage} from "../../../model/table.interface";
import {Action, IPlayerAction} from "../../../model/player-action.interface";

/**
 * Table At the beginning
 */
const tableState1: ITable = {
	players: [
		{ id: 0, bankroll: 3000, tokensOnTable: 0, isParticipating: true, hand: [[CardColor.CLUBS, CardValue.JACK], [CardColor.DIAMONDS, CardValue.SEVEN],], hasActed: false, },
		{ id: 1, bankroll: 2950, tokensOnTable: 50, isParticipating: true, hand: [[CardColor.HEARTS, CardValue.FOUR], [CardColor.CLUBS, CardValue.KING],], hasActed: false, },
		{ id: 2, bankroll: 2900, tokensOnTable: 100, isParticipating: true, hand: [[CardColor.DIAMONDS, CardValue.FOUR], [CardColor.CLUBS, CardValue.TWO],], hasActed: false, },
		{ id: 3, bankroll: 3000, tokensOnTable: 0, isParticipating: true, hand: [[CardColor.SPADES, CardValue.TEN], [CardColor.DIAMONDS, CardValue.QUEEN],], hasActed: false, }
	],
	pots: [{ amount: 150, potCap: undefined, }],
	board: {
		flop: { cards: [[CardColor.HEARTS, CardValue.TEN], [CardColor.DIAMONDS, CardValue.NINE], [CardColor.SPADES, CardValue.NINE],], revealed: false,},
		turn: { card: [CardColor.HEARTS, CardValue.FIVE], revealed: false, },
		river: { card: [CardColor.DIAMONDS, CardValue.KING], revealed: false, },
	},
	currentActingPlayer: { index: 3, possibleActions: [Action.FOLD, Action.CALL, Action.RAISE, Action.ALL_IN], tokensRequiredToCall: 100, },
	dealingPlayer: 0,
	blindAmount: 100,
	messages: [TableMessage.NEW_GAME, TableMessage.NEW_ROUND, TableMessage.NEW_GO_THROUGH]
}

const action1: IPlayerAction = {
	player: 3,
	action: Action.CALL,
}

const tableState2: ITable = {
	players: [
		{ id: 0, bankroll: 3000, tokensOnTable: 0, isParticipating: true, hand: [[CardColor.CLUBS, CardValue.JACK], [CardColor.DIAMONDS, CardValue.SEVEN],], hasActed: false, },
		{ id: 1, bankroll: 2950, tokensOnTable: 50, isParticipating: true, hand: [[CardColor.HEARTS, CardValue.FOUR], [CardColor.CLUBS, CardValue.KING],], hasActed: false, },
		{ id: 2, bankroll: 2900, tokensOnTable: 100, isParticipating: true, hand: [[CardColor.DIAMONDS, CardValue.FOUR], [CardColor.CLUBS, CardValue.TWO],], hasActed: false, },
		{ id: 3, bankroll: 2900, tokensOnTable: 100, isParticipating: true, hand: [[CardColor.SPADES, CardValue.TEN], [CardColor.DIAMONDS, CardValue.QUEEN],], hasActed: true, }
	],
	dealingPlayer: 0,
	pots: [{ amount: 250, potCap: undefined, forPlayers: [0, 1, 2, 3] }],
	board: {
		flop: { cards: [[CardColor.HEARTS, CardValue.TEN], [CardColor.DIAMONDS, CardValue.NINE], [CardColor.SPADES, CardValue.NINE],], revealed: false,},
		turn: { card: [CardColor.HEARTS, CardValue.FIVE], revealed: false, },
		river: { card: [CardColor.DIAMONDS, CardValue.KING], revealed: false, },
	},
	currentActingPlayer: { index: 0, possibleActions: [Action.FOLD, Action.CALL, Action.RAISE, Action.ALL_IN], tokensRequiredToCall: 100, },
	blindAmount: 100,
	messages: [TableMessage.PLAYER_CALLED]
}

const action2: IPlayerAction = {
	player: 0,
	action: Action.CALL,
}

const tableState3: ITable = {
	players: [
		{ id: 0, bankroll: 2900, tokensOnTable: 100, isParticipating: true, hand: [[CardColor.CLUBS, CardValue.JACK], [CardColor.DIAMONDS, CardValue.SEVEN],], hasActed: true, },
		{ id: 1, bankroll: 2950, tokensOnTable: 50, isParticipating: true, hand: [[CardColor.HEARTS, CardValue.FOUR], [CardColor.CLUBS, CardValue.KING],], hasActed: false, },
		{ id: 2, bankroll: 2900, tokensOnTable: 100, isParticipating: true, hand: [[CardColor.DIAMONDS, CardValue.FOUR], [CardColor.CLUBS, CardValue.TWO],], hasActed: false, },
		{ id: 3, bankroll: 2900, tokensOnTable: 100, isParticipating: true, hand: [[CardColor.SPADES, CardValue.TEN], [CardColor.DIAMONDS, CardValue.QUEEN],], hasActed: true, }
	],
	dealingPlayer: 0,
	pots: [{ amount: 350, potCap: undefined, forPlayers: [0, 1, 2, 3] }],
	board: {
		flop: { cards: [[CardColor.HEARTS, CardValue.TEN], [CardColor.DIAMONDS, CardValue.NINE], [CardColor.SPADES, CardValue.NINE],], revealed: false,},
		turn: { card: [CardColor.HEARTS, CardValue.FIVE], revealed: false, },
		river: { card: [CardColor.DIAMONDS, CardValue.KING], revealed: false, },
	},
	currentActingPlayer: { index: 1, possibleActions: [Action.FOLD, Action.CALL, Action.RAISE, Action.ALL_IN], tokensRequiredToCall: 50, },
	blindAmount: 100,
	messages: [TableMessage.PLAYER_CALLED]
}

const action3: IPlayerAction = {
	player: 1,
	action: Action.CALL,
}

const tableState4: ITable = {
	players: [
		{ id: 0, bankroll: 2900, tokensOnTable: 100, isParticipating: true, hand: [[CardColor.CLUBS, CardValue.JACK], [CardColor.DIAMONDS, CardValue.SEVEN],], hasActed: true, },
		{ id: 1, bankroll: 2900, tokensOnTable: 100, isParticipating: true, hand: [[CardColor.HEARTS, CardValue.FOUR], [CardColor.CLUBS, CardValue.KING],], hasActed: true, },
		{ id: 2, bankroll: 2900, tokensOnTable: 100, isParticipating: true, hand: [[CardColor.DIAMONDS, CardValue.FOUR], [CardColor.CLUBS, CardValue.TWO],], hasActed: false, },
		{ id: 3, bankroll: 2900, tokensOnTable: 100, isParticipating: true, hand: [[CardColor.SPADES, CardValue.TEN], [CardColor.DIAMONDS, CardValue.QUEEN],], hasActed: true, }
	],
	dealingPlayer: 0,
	pots: [{ amount: 400, potCap: undefined, forPlayers: [0, 1, 2, 3] }],
	board: {
		flop: { cards: [[CardColor.HEARTS, CardValue.TEN], [CardColor.DIAMONDS, CardValue.NINE], [CardColor.SPADES, CardValue.NINE],], revealed: false,},
		turn: { card: [CardColor.HEARTS, CardValue.FIVE], revealed: false, },
		river: { card: [CardColor.DIAMONDS, CardValue.KING], revealed: false, },
	},
	currentActingPlayer: { index: 2, possibleActions: [Action.FOLD, Action.CHECK, Action.RAISE, Action.ALL_IN], tokensRequiredToCall: undefined, },
	blindAmount: 100,
	messages: [TableMessage.PLAYER_CALLED]
}

const action4: IPlayerAction = {
	player: 2,
	action: Action.CHECK,
}

const tableState5: ITable = {
	players: [
		{ id: 0, bankroll: 2900, tokensOnTable: 100, isParticipating: true, hand: [[CardColor.CLUBS, CardValue.JACK], [CardColor.DIAMONDS, CardValue.SEVEN],], hasActed: false, },
		{ id: 1, bankroll: 2900, tokensOnTable: 100, isParticipating: true, hand: [[CardColor.HEARTS, CardValue.FOUR], [CardColor.CLUBS, CardValue.KING],], hasActed: false, },
		{ id: 2, bankroll: 2900, tokensOnTable: 100, isParticipating: true, hand: [[CardColor.DIAMONDS, CardValue.FOUR], [CardColor.CLUBS, CardValue.TWO],], hasActed: false, },
		{ id: 3, bankroll: 2900, tokensOnTable: 100, isParticipating: true, hand: [[CardColor.SPADES, CardValue.TEN], [CardColor.DIAMONDS, CardValue.QUEEN],], hasActed: false, }
	],
	dealingPlayer: 0,
	pots: [{ amount: 400, potCap: undefined, forPlayers: [0, 1, 2, 3] }],
	board: {
		flop: { cards: [[CardColor.HEARTS, CardValue.TEN], [CardColor.DIAMONDS, CardValue.NINE], [CardColor.SPADES, CardValue.NINE],], revealed: true,},
		turn: { card: [CardColor.HEARTS, CardValue.FIVE], revealed: false, },
		river: { card: [CardColor.DIAMONDS, CardValue.KING], revealed: false, },
	},
	currentActingPlayer: { index: 3, possibleActions: [Action.FOLD, Action.CHECK, Action.RAISE, Action.ALL_IN], tokensRequiredToCall: undefined, },
	blindAmount: 100,
	messages: [TableMessage.PLAYER_CHECKED, TableMessage.FLOP_REVEALED, TableMessage.NEW_GO_THROUGH, TableMessage.GO_TROUGH_FINISHED]
}

const action5: IPlayerAction = {
	player: 3,
	action: Action.RAISE,
	raiseAmount: 100,
}

const tableState6: ITable = {
	players: [
		{ id: 0, bankroll: 2900, tokensOnTable: 100, isParticipating: true, hand: [[CardColor.CLUBS, CardValue.JACK], [CardColor.DIAMONDS, CardValue.SEVEN],], hasActed: false, },
		{ id: 1, bankroll: 2900, tokensOnTable: 100, isParticipating: true, hand: [[CardColor.HEARTS, CardValue.FOUR], [CardColor.CLUBS, CardValue.KING],], hasActed: false, },
		{ id: 2, bankroll: 2900, tokensOnTable: 100, isParticipating: true, hand: [[CardColor.DIAMONDS, CardValue.FOUR], [CardColor.CLUBS, CardValue.TWO],], hasActed: false, },
		{ id: 3, bankroll: 2800, tokensOnTable: 200, isParticipating: true, hand: [[CardColor.SPADES, CardValue.TEN], [CardColor.DIAMONDS, CardValue.QUEEN],], hasActed: true, }
	],
	dealingPlayer: 0,
	pots: [{ amount: 500, potCap: undefined, forPlayers: [0, 1, 2, 3] }],
	board: {
		flop: { cards: [[CardColor.HEARTS, CardValue.TEN], [CardColor.DIAMONDS, CardValue.NINE], [CardColor.SPADES, CardValue.NINE],], revealed: true,},
		turn: { card: [CardColor.HEARTS, CardValue.FIVE], revealed: false, },
		river: { card: [CardColor.DIAMONDS, CardValue.KING], revealed: false, },
	},
	currentActingPlayer: { index: 0, possibleActions: [Action.FOLD, Action.CALL, Action.RAISE, Action.ALL_IN], tokensRequiredToCall: 100 },
	blindAmount: 100,
	messages: [TableMessage.PLAYER_RAISED],
}

const action6: IPlayerAction = {
	player: 0,
	action: Action.FOLD,
}

const tableState7: ITable = {
	players: [
		{ id: 0, bankroll: 2900, tokensOnTable: 100, isParticipating: false, hand: [[CardColor.CLUBS, CardValue.JACK], [CardColor.DIAMONDS, CardValue.SEVEN],], hasActed: true, },
		{ id: 1, bankroll: 2900, tokensOnTable: 100, isParticipating: true, hand: [[CardColor.HEARTS, CardValue.FOUR], [CardColor.CLUBS, CardValue.KING],], hasActed: false, },
		{ id: 2, bankroll: 2900, tokensOnTable: 100, isParticipating: true, hand: [[CardColor.DIAMONDS, CardValue.FOUR], [CardColor.CLUBS, CardValue.TWO],], hasActed: false, },
		{ id: 3, bankroll: 2800, tokensOnTable: 200, isParticipating: true, hand: [[CardColor.SPADES, CardValue.TEN], [CardColor.DIAMONDS, CardValue.QUEEN],], hasActed: true, }
	],
	dealingPlayer: 0,
	pots: [{ amount: 500, potCap: undefined, forPlayers: [0, 1, 2, 3] }],
	board: {
		flop: { cards: [[CardColor.HEARTS, CardValue.TEN], [CardColor.DIAMONDS, CardValue.NINE], [CardColor.SPADES, CardValue.NINE],], revealed: true,},
		turn: { card: [CardColor.HEARTS, CardValue.FIVE], revealed: false, },
		river: { card: [CardColor.DIAMONDS, CardValue.KING], revealed: false, },
	},
	currentActingPlayer: { index: 1, possibleActions: [Action.FOLD, Action.CALL, Action.RAISE, Action.ALL_IN], tokensRequiredToCall: 100, },
	blindAmount: 100,
	messages: [TableMessage.PLAYER_FOLDED],
}

const action7: IPlayerAction = {
	player: 1,
	action: Action.CALL,
}

const tableState8: ITable = {
	players: [
		{ id: 0, bankroll: 2900, tokensOnTable: 100, isParticipating: false, hand: [[CardColor.CLUBS, CardValue.JACK], [CardColor.DIAMONDS, CardValue.SEVEN],], hasActed: true, },
		{ id: 1, bankroll: 2800, tokensOnTable: 200, isParticipating: true, hand: [[CardColor.HEARTS, CardValue.FOUR], [CardColor.CLUBS, CardValue.KING],], hasActed: true, },
		{ id: 2, bankroll: 2900, tokensOnTable: 100, isParticipating: true, hand: [[CardColor.DIAMONDS, CardValue.FOUR], [CardColor.CLUBS, CardValue.TWO],], hasActed: false, },
		{ id: 3, bankroll: 2800, tokensOnTable: 200, isParticipating: true, hand: [[CardColor.SPADES, CardValue.TEN], [CardColor.DIAMONDS, CardValue.QUEEN],], hasActed: true, }
	],
	dealingPlayer: 0,
	pots: [{ amount: 600, potCap: undefined, forPlayers: [0, 1, 2, 3] }],
	board: {
		flop: { cards: [[CardColor.HEARTS, CardValue.TEN], [CardColor.DIAMONDS, CardValue.NINE], [CardColor.SPADES, CardValue.NINE],], revealed: true,},
		turn: { card: [CardColor.HEARTS, CardValue.FIVE], revealed: false, },
		river: { card: [CardColor.DIAMONDS, CardValue.KING], revealed: false, },
	},
	currentActingPlayer: { index: 2, possibleActions: [Action.FOLD, Action.CALL, Action.RAISE, Action.ALL_IN], tokensRequiredToCall: 100, },
	blindAmount: 100,
	messages: [TableMessage.PLAYER_CALLED],
}

const action8: IPlayerAction = {
	player: 2,
	action: Action.FOLD,
}

const tableState9: ITable = {
	players: [
		{ id: 0, bankroll: 2900, tokensOnTable: 100, isParticipating: false, hand: [[CardColor.CLUBS, CardValue.JACK], [CardColor.DIAMONDS, CardValue.SEVEN],], hasActed: false, },
		{ id: 1, bankroll: 2800, tokensOnTable: 200, isParticipating: true, hand: [[CardColor.HEARTS, CardValue.FOUR], [CardColor.CLUBS, CardValue.KING],], hasActed: false, },
		{ id: 2, bankroll: 2900, tokensOnTable: 100, isParticipating: false, hand: [[CardColor.DIAMONDS, CardValue.FOUR], [CardColor.CLUBS, CardValue.TWO],], hasActed: false, },
		{ id: 3, bankroll: 2800, tokensOnTable: 200, isParticipating: true, hand: [[CardColor.SPADES, CardValue.TEN], [CardColor.DIAMONDS, CardValue.QUEEN],], hasActed: false, }
	],
	dealingPlayer: 0,
	pots: [{ amount: 600, potCap: undefined, forPlayers: [0, 1, 2, 3] }],
	board: {
		flop: { cards: [[CardColor.HEARTS, CardValue.TEN], [CardColor.DIAMONDS, CardValue.NINE], [CardColor.SPADES, CardValue.NINE],], revealed: true,},
		turn: { card: [CardColor.HEARTS, CardValue.FIVE], revealed: true, },
		river: { card: [CardColor.DIAMONDS, CardValue.KING], revealed: false, },
	},
	currentActingPlayer: { index: 3, possibleActions: [Action.FOLD, Action.CHECK, Action.RAISE, Action.ALL_IN], tokensRequiredToCall: undefined, },
	blindAmount: 100,
	messages: [TableMessage.PLAYER_FOLDED, TableMessage.TURN_REVEALED, TableMessage.NEW_GO_THROUGH, TableMessage.GO_TROUGH_FINISHED,],
}

const action9: IPlayerAction = {
	player: 3,
	action: Action.RAISE,
	raiseAmount: 100,
}

const tableState10: ITable = {
	players: [
		{ id: 0, bankroll: 2900, tokensOnTable: 100, isParticipating: false, hand: [[CardColor.CLUBS, CardValue.JACK], [CardColor.DIAMONDS, CardValue.SEVEN],], hasActed: false, },
		{ id: 1, bankroll: 2800, tokensOnTable: 200, isParticipating: true, hand: [[CardColor.HEARTS, CardValue.FOUR], [CardColor.CLUBS, CardValue.KING],], hasActed: false, },
		{ id: 2, bankroll: 2900, tokensOnTable: 100, isParticipating: false, hand: [[CardColor.DIAMONDS, CardValue.FOUR], [CardColor.CLUBS, CardValue.TWO],], hasActed: false, },
		{ id: 3, bankroll: 2700, tokensOnTable: 300, isParticipating: true, hand: [[CardColor.SPADES, CardValue.TEN], [CardColor.DIAMONDS, CardValue.QUEEN],], hasActed: true, }
	],
	dealingPlayer: 0,
	pots: [{ amount: 700, potCap: undefined, forPlayers: [0, 1, 2, 3] }],
	board: {
		flop: { cards: [[CardColor.HEARTS, CardValue.TEN], [CardColor.DIAMONDS, CardValue.NINE], [CardColor.SPADES, CardValue.NINE],], revealed: true,},
		turn: { card: [CardColor.HEARTS, CardValue.FIVE], revealed: true, },
		river: { card: [CardColor.DIAMONDS, CardValue.KING], revealed: false, },
	},
	currentActingPlayer: { index: 1, possibleActions: [Action.FOLD, Action.CALL, Action.RAISE, Action.ALL_IN], tokensRequiredToCall: 100 },
	blindAmount: 100,
	messages: [TableMessage.PLAYER_RAISED],
}

const action10: IPlayerAction = {
	player: 1,
	action: Action.CALL,
}

const tableState11: ITable = {
	players: [
		{ id: 0, bankroll: 2900, tokensOnTable: 100, isParticipating: false, hand: [[CardColor.CLUBS, CardValue.JACK], [CardColor.DIAMONDS, CardValue.SEVEN],], hasActed: false, },
		{ id: 1, bankroll: 2700, tokensOnTable: 300, isParticipating: true, hand: [[CardColor.HEARTS, CardValue.FOUR], [CardColor.CLUBS, CardValue.KING],], hasActed: false, },
		{ id: 2, bankroll: 2900, tokensOnTable: 100, isParticipating: false, hand: [[CardColor.DIAMONDS, CardValue.FOUR], [CardColor.CLUBS, CardValue.TWO],], hasActed: false, },
		{ id: 3, bankroll: 2700, tokensOnTable: 300, isParticipating: true, hand: [[CardColor.SPADES, CardValue.TEN], [CardColor.DIAMONDS, CardValue.QUEEN],], hasActed: false, }
	],
	dealingPlayer: 0,
	pots: [{ amount: 800, potCap: undefined, forPlayers: [0, 1, 2, 3] }],
	board: {
		flop: { cards: [[CardColor.HEARTS, CardValue.TEN], [CardColor.DIAMONDS, CardValue.NINE], [CardColor.SPADES, CardValue.NINE],], revealed: true,},
		turn: { card: [CardColor.HEARTS, CardValue.FIVE], revealed: true, },
		river: { card: [CardColor.DIAMONDS, CardValue.KING], revealed: true, },
	},
	currentActingPlayer: { index: 3, possibleActions: [Action.FOLD, Action.CHECK, Action.RAISE, Action.ALL_IN], tokensRequiredToCall: undefined, },
	blindAmount: 100,
	messages: [TableMessage.PLAYER_CALLED, TableMessage.RIVER_REVEALED, TableMessage.NEW_GO_THROUGH, TableMessage.GO_TROUGH_FINISHED,],
}

const action11: IPlayerAction = {
	player: 3,
	action: Action.RAISE,
	raiseAmount: 100,
}

const tableState12: ITable = {
	players: [
		{ id: 0, bankroll: 2900, tokensOnTable: 100, isParticipating: false, hand: [[CardColor.CLUBS, CardValue.JACK], [CardColor.DIAMONDS, CardValue.SEVEN],], hasActed: false, },
		{ id: 1, bankroll: 2700, tokensOnTable: 300, isParticipating: true, hand: [[CardColor.HEARTS, CardValue.FOUR], [CardColor.CLUBS, CardValue.KING],], hasActed: false, },
		{ id: 2, bankroll: 2900, tokensOnTable: 100, isParticipating: false, hand: [[CardColor.DIAMONDS, CardValue.FOUR], [CardColor.CLUBS, CardValue.TWO],], hasActed: false, },
		{ id: 3, bankroll: 2600, tokensOnTable: 400, isParticipating: true, hand: [[CardColor.SPADES, CardValue.TEN], [CardColor.DIAMONDS, CardValue.QUEEN],], hasActed: true, }
	],
	dealingPlayer: 0,
	pots: [{ amount: 900, potCap: undefined, forPlayers: [0, 1, 2, 3] }],
	board: {
		flop: { cards: [[CardColor.HEARTS, CardValue.TEN], [CardColor.DIAMONDS, CardValue.NINE], [CardColor.SPADES, CardValue.NINE],], revealed: true,},
		turn: { card: [CardColor.HEARTS, CardValue.FIVE], revealed: true, },
		river: { card: [CardColor.DIAMONDS, CardValue.KING], revealed: true, },
	},
	currentActingPlayer: { index: 1, possibleActions: [Action.FOLD, Action.CALL, Action.RAISE, Action.ALL_IN], tokensRequiredToCall: 100, },
	blindAmount: 100,
	messages: [TableMessage.PLAYER_RAISED],
}

const action12: IPlayerAction = {
	player: 1,
	action: Action.RAISE,
	raiseAmount: 100,
}

const tableState13: ITable = {
	players: [
		{ id: 0, bankroll: 2900, tokensOnTable: 100, isParticipating: false, hand: [[CardColor.CLUBS, CardValue.JACK], [CardColor.DIAMONDS, CardValue.SEVEN],], hasActed: false, },
		{ id: 1, bankroll: 2500, tokensOnTable: 500, isParticipating: true, hand: [[CardColor.HEARTS, CardValue.FOUR], [CardColor.CLUBS, CardValue.KING],], hasActed: true, },
		{ id: 2, bankroll: 2900, tokensOnTable: 100, isParticipating: false, hand: [[CardColor.DIAMONDS, CardValue.FOUR], [CardColor.CLUBS, CardValue.TWO],], hasActed: false, },
		{ id: 3, bankroll: 2600, tokensOnTable: 400, isParticipating: true, hand: [[CardColor.SPADES, CardValue.TEN], [CardColor.DIAMONDS, CardValue.QUEEN],], hasActed: true, }
	],
	dealingPlayer: 0,
	pots: [{ amount: 1100, potCap: undefined, forPlayers: [0, 1, 2, 3] }],
	board: {
		flop: { cards: [[CardColor.HEARTS, CardValue.TEN], [CardColor.DIAMONDS, CardValue.NINE], [CardColor.SPADES, CardValue.NINE],], revealed: true,},
		turn: { card: [CardColor.HEARTS, CardValue.FIVE], revealed: true, },
		river: { card: [CardColor.DIAMONDS, CardValue.KING], revealed: true, },
	},
	currentActingPlayer: { index: 3, possibleActions: [Action.FOLD, Action.CALL, Action.RAISE, Action.ALL_IN], tokensRequiredToCall: 100, },
	blindAmount: 100,
	messages: [TableMessage.PLAYER_RAISED],
}

const action13: IPlayerAction = {
	player: 3,
	action: Action.CALL,
}

const tableState14: ITable = {
	players: [
		{ id: 0, bankroll: 2900, tokensOnTable: 100, isParticipating: false, hand: [[CardColor.CLUBS, CardValue.JACK], [CardColor.DIAMONDS, CardValue.SEVEN],], hasActed: false, },
		{ id: 1, bankroll: 2500, tokensOnTable: 500, isParticipating: true, hand: [[CardColor.HEARTS, CardValue.FOUR], [CardColor.CLUBS, CardValue.KING],], hasActed: false, },
		{ id: 2, bankroll: 2900, tokensOnTable: 100, isParticipating: false, hand: [[CardColor.DIAMONDS, CardValue.FOUR], [CardColor.CLUBS, CardValue.TWO],], hasActed: false, },
		{ id: 3, bankroll: 2500, tokensOnTable: 500, isParticipating: true, hand: [[CardColor.SPADES, CardValue.TEN], [CardColor.DIAMONDS, CardValue.QUEEN],], hasActed: false, }
	],
	dealingPlayer: 0,
	pots: [{ amount: 1200, potCap: undefined, forPlayers: [0, 1, 2, 3] }],
	board: {
		flop: { cards: [[CardColor.HEARTS, CardValue.TEN], [CardColor.DIAMONDS, CardValue.NINE], [CardColor.SPADES, CardValue.NINE],], revealed: true,},
		turn: { card: [CardColor.HEARTS, CardValue.FIVE], revealed: true, },
		river: { card: [CardColor.DIAMONDS, CardValue.KING], revealed: true, },
	},
	currentActingPlayer: { index: -1, possibleActions: [], tokensRequiredToCall: undefined, },
	blindAmount: 100,
	messages: [TableMessage.PLAYER_CALLED, TableMessage.ROUND_FINISHED, TableMessage.GO_TROUGH_FINISHED],
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
	},
	{
		tableBefore: tableState5,
		action: action5,
		tableAfter: tableState6,
	},
	{
		tableBefore: tableState6,
		action: action6,
		tableAfter: tableState7,
	},
	{
		tableBefore: tableState7,
		action: action7,
		tableAfter: tableState8,
	},
	{
		tableBefore: tableState8,
		action: action8,
		tableAfter: tableState9,
	},
	{
		tableBefore: tableState9,
		action: action9,
		tableAfter: tableState10,
	},
	{
		tableBefore: tableState10,
		action: action10,
		tableAfter: tableState11,
	},
	{
		tableBefore: tableState11,
		action: action11,
		tableAfter: tableState12,
	},
	{
		tableBefore: tableState12,
		action: action12,
		tableAfter: tableState13,
	},
	{
		tableBefore: tableState13,
		action: action13,
		tableAfter: tableState14,
	},
];
