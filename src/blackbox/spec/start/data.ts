import { CardColor, CardValue } from "../../../model/card.interface";
import { ITable } from "../../../model/table.interface";

const tableInitialized: ITable = {
    players: [
        {
            name: 'Jonny',
            bankroll: 2000,
            tokensOnTable: 0,
            hand: [
                [CardColor.DIAMONDS, CardValue.ACE],
                [CardColor.HEARTS, CardValue.KING],
            ]
        },
        {
            name: 'Kevin',
            bankroll: 2200,
            tokensOnTable: 0,
            hand: [
                [CardColor.DIAMONDS, CardValue.TWO],
                [CardColor.DIAMONDS, CardValue.SEVEN],
            ]
        },
        {
            name: 'James',
            bankroll: 1200,
            tokensOnTable: 0,
            hand: [
                [CardColor.SPADES, CardValue.QUEEN],
                [CardColor.HEARTS, CardValue.ACE],
            ]
        },
        {
            name: 'Jill',
            bankroll: 8400,
            tokensOnTable: 0,
            hand: [
                [CardColor.DIAMONDS, CardValue.FOUR],
                [CardColor.SPADES, CardValue.SIX],
            ]
        }
    ],
    pots: [{ amount: 0, }],
    board: {
        flop: {
            cards: [
                [CardColor.CLUBS, CardValue.SIX],
                [CardColor.CLUBS, CardValue.SEVEN],
                [CardColor.SPADES, CardValue.FIVE],
            ],
            revealed: false,
        },
        turn: {
            card: [CardColor.SPADES, CardValue.NINE],
            revealed: false,
        },
        river: {
            card: [CardColor.DIAMONDS, CardValue.EIGHT],
            revealed: false,
        },
    },
    currentActingPlayer: 0,
    dealingPlayer: 1,
    blindAmount: 100,
}
