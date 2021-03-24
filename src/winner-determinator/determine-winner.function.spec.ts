import {ITable, TableMessage} from "../model/table.interface";
import {CardColor, CardValue} from "../model/card.interface";
import {determineWinner} from "./determine-winner.function";

describe('winner determination',  () => {

    it('should sort normal hierarchies', () => {
        const table: ITable = {
            players: [
                { id: 0, bankroll: 2800, tokensOnTable: 200, isParticipating: true, hand: [[CardColor.CLUBS, CardValue.JACK], [CardColor.DIAMONDS, CardValue.SEVEN],], hasActed: false, },
                { id: 1, bankroll: 2800, tokensOnTable: 200, isParticipating: true, hand: [[CardColor.HEARTS, CardValue.FOUR], [CardColor.CLUBS, CardValue.KING],], hasActed: false, },
                { id: 2, bankroll: 2800, tokensOnTable: 200, isParticipating: true, hand: [[CardColor.DIAMONDS, CardValue.FOUR], [CardColor.CLUBS, CardValue.TWO],], hasActed: false, },
                { id: 3, bankroll: 2800, tokensOnTable: 200, isParticipating: true, hand: [[CardColor.SPADES, CardValue.TEN], [CardColor.DIAMONDS, CardValue.QUEEN],], hasActed: false, }
            ],
            dealingPlayer: 0,
            pots: [{ amount: 800, potCap: undefined, forPlayers: [1, 2, 3, 4] }],
            board: {
                flop: { cards: [[CardColor.HEARTS, CardValue.TEN], [CardColor.DIAMONDS, CardValue.NINE], [CardColor.SPADES, CardValue.NINE],], revealed: true,},
                turn: { card: [CardColor.HEARTS, CardValue.FIVE], revealed: true, },
                river: { card: [CardColor.DIAMONDS, CardValue.KING], revealed: true, },
            },
            currentActingPlayer: { index: -1, possibleActions: [], tokensRequiredToCall: undefined, },
            blindAmount: 100,
            messages: [TableMessage.PLAYER_CALLED, TableMessage.ROUND_FINISHED, TableMessage.GO_TROUGH_FINISHED],
        }

        const winners = determineWinner(table);
        expect(winners).toStrictEqual([
           [1], [3], [0], [2],
        ]);
    });

    it('should sort normal hierarchies (2)', () => {
        const table: ITable = {
            players: [
                { id: 0, bankroll: 2800, tokensOnTable: 200, isParticipating: true, hand: [[CardColor.HEARTS, CardValue.KING], [CardColor.DIAMONDS, CardValue.SEVEN],], hasActed: false, },
                { id: 1, bankroll: 2800, tokensOnTable: 200, isParticipating: true, hand: [[CardColor.HEARTS, CardValue.FOUR], [CardColor.CLUBS, CardValue.KING],], hasActed: false, },
                { id: 2, bankroll: 2800, tokensOnTable: 200, isParticipating: true, hand: [[CardColor.DIAMONDS, CardValue.FOUR], [CardColor.CLUBS, CardValue.TWO],], hasActed: false, },
                { id: 3, bankroll: 2800, tokensOnTable: 200, isParticipating: true, hand: [[CardColor.SPADES, CardValue.TEN], [CardColor.DIAMONDS, CardValue.QUEEN],], hasActed: false, }
            ],
            dealingPlayer: 0,
            pots: [{ amount: 800, potCap: undefined, forPlayers: [1, 2, 3, 4] }],
            board: {
                flop: { cards: [[CardColor.HEARTS, CardValue.TEN], [CardColor.HEARTS, CardValue.JACK], [CardColor.SPADES, CardValue.SIX],], revealed: true,},
                turn: { card: [CardColor.HEARTS, CardValue.ACE], revealed: true, },
                river: { card: [CardColor.HEARTS, CardValue.QUEEN], revealed: true, },
            },
            currentActingPlayer: { index: -1, possibleActions: [], tokensRequiredToCall: undefined, },
            blindAmount: 100,
            messages: [TableMessage.PLAYER_CALLED, TableMessage.ROUND_FINISHED, TableMessage.GO_TROUGH_FINISHED],
        }

        const winners = determineWinner(table);
        expect(winners).toStrictEqual([
            [0], [1], [3], [2],
        ]);
    });

    it('should sort normal hierarchies (3)', () => {
        const table: ITable = {
            players: [
                { id: 0, bankroll: 2800, tokensOnTable: 200, isParticipating: true, hand: [[CardColor.HEARTS, CardValue.KING], [CardColor.DIAMONDS, CardValue.SEVEN],], hasActed: false, },
                { id: 1, bankroll: 2800, tokensOnTable: 200, isParticipating: true, hand: [[CardColor.HEARTS, CardValue.FOUR], [CardColor.CLUBS, CardValue.KING],], hasActed: false, },
                { id: 2, bankroll: 2800, tokensOnTable: 200, isParticipating: true, hand: [[CardColor.SPADES, CardValue.QUEEN], [CardColor.CLUBS, CardValue.TEN],], hasActed: false, },
                { id: 3, bankroll: 2800, tokensOnTable: 200, isParticipating: true, hand: [[CardColor.SPADES, CardValue.TEN], [CardColor.DIAMONDS, CardValue.QUEEN],], hasActed: false, }
            ],
            dealingPlayer: 0,
            pots: [{ amount: 800, potCap: undefined, forPlayers: [1, 2, 3, 4] }],
            board: {
                flop: { cards: [[CardColor.HEARTS, CardValue.TEN], [CardColor.HEARTS, CardValue.JACK], [CardColor.SPADES, CardValue.SIX],], revealed: true,},
                turn: { card: [CardColor.HEARTS, CardValue.ACE], revealed: true, },
                river: { card: [CardColor.HEARTS, CardValue.QUEEN], revealed: true, },
            },
            currentActingPlayer: { index: -1, possibleActions: [], tokensRequiredToCall: undefined, },
            blindAmount: 100,
            messages: [TableMessage.PLAYER_CALLED, TableMessage.ROUND_FINISHED, TableMessage.GO_TROUGH_FINISHED],
        }

        const winners = determineWinner(table);
        expect(winners).toStrictEqual([
            [0], [1], [2, 3],
        ]);
    });

});
