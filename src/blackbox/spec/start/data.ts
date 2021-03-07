import { CardColor, CardValue } from "../../../model/card.interface";
import { ITable } from "../../../model/table.interface";

const tableInitialized: ITable = {
	players: [
		{
			name: 'Jonny',
			bankroll: 2000,
			tokensOnTable: 0,
			hand: [
				[CardColor.HEARTS, CardValue.JACK],
				[CardColor.HEARTS, CardValue.TWO],
			]
		},
		{
			name: 'Kevin',
			bankroll: 2200,
			tokensOnTable: 0,
			hand: [
				[CardColor.SPADES, CardValue.TEN],
				[CardColor.CLUBS, CardValue.TEN],
			]
		},
		{
			name: 'James',
			bankroll: 1200,
			tokensOnTable: 0,
			hand: [
				[CardColor.DIAMONDS, CardValue.EIGHT],
				[CardColor.SPADES, CardValue.JACK],
			]
		},
		{
			name: 'Jill',
			bankroll: 8400,
			tokensOnTable: 0,
			hand: [
				[CardColor.SPADES, CardValue.ACE],
				[CardColor.HEARTS, CardValue.KING],
			]
		}
	],
	pots: [{ amount: 0, }],
	board: {
		flop: {
			cards: [
				[CardColor.DIAMONDS, CardValue.JACK],
				[CardColor.SPADES, CardValue.SIX],
				[CardColor.CLUBS, CardValue.SIX],
			],
			revealed: false,
		},
		turn: {
			card: [CardColor.DIAMONDS, CardValue.THREE],
			revealed: false,
		},
		river: {
			card: [CardColor.HEARTS, CardValue.NINE],
			revealed: false,
		},
	},
	currentActingPlayer: 2,
	dealingPlayer: 0,
	blindAmount: 100,
}
