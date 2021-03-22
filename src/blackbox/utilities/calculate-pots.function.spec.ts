import {IPlayer} from "../../model/player.interface";
import {IPot} from "../../model/pot.interface";
import {calculatePots} from "./calculate-pots.function";
import {CardColor, CardValue} from "../../model/card.interface";

describe('calculate all in pots', () => {

	it('should handle ascending all ins', () => {
		const players: IPlayer[] = [
			{
				id: 0, isParticipating: true, hasActed: false, hand: [[CardColor.DIAMONDS, CardValue.KING], [CardColor.HEARTS, CardValue.KING]],
				bankroll: 0, tokensOnTable: 10,
			},
			{
				id: 1, isParticipating: true, hasActed: false, hand: [[CardColor.DIAMONDS, CardValue.QUEEN], [CardColor.HEARTS, CardValue.QUEEN]],
				bankroll: 0, tokensOnTable: 20,
			},
			{
				id: 2, isParticipating: true, hasActed: false, hand: [[CardColor.DIAMONDS, CardValue.QUEEN], [CardColor.HEARTS, CardValue.QUEEN]],
				bankroll: 0, tokensOnTable: 40,
			}
		];
		const pots: IPot[] = [
			{ potCap: 10, forPlayers: [0, 1, 2], amount: 30, },
			{ potCap: 10, forPlayers: [1, 2], amount: 20, },
			{ potCap: 20, forPlayers: [2], amount: 20, },
			{ potCap: undefined, forPlayers: [], amount: 0, },
		];

		expect(calculatePots(players)).toStrictEqual(pots);
	});

	it('should handle descending all ins', () => {
		const players: IPlayer[] = [
			{
				id: 0, isParticipating: true, hasActed: false, hand: [[CardColor.DIAMONDS, CardValue.KING], [CardColor.HEARTS, CardValue.KING]],
				bankroll: 0, tokensOnTable: 500,
			},
			{
				id: 1, isParticipating: true, hasActed: false, hand: [[CardColor.DIAMONDS, CardValue.QUEEN], [CardColor.HEARTS, CardValue.QUEEN]],
				bankroll: 0, tokensOnTable: 250,
			},
			{
				id: 2, isParticipating: true, hasActed: false, hand: [[CardColor.DIAMONDS, CardValue.QUEEN], [CardColor.HEARTS, CardValue.QUEEN]],
				bankroll: 0, tokensOnTable: 100,
			}
		];
		const pots: IPot[] = [
			{ potCap: 100, forPlayers: [0, 1, 2], amount: 300, },
			{ potCap: 150, forPlayers: [0, 1], amount: 300, },
			{ potCap: 250, forPlayers: [0], amount: 250, },
			{ potCap: undefined, forPlayers: [], amount: 0, },
		];

		expect(calculatePots(players)).toStrictEqual(pots);
	});

	it('should handle chaotic all ins', () => {
		const players: IPlayer[] = [
			{
				id: 0, isParticipating: true, hasActed: false, hand: [[CardColor.DIAMONDS, CardValue.KING], [CardColor.HEARTS, CardValue.KING]],
				bankroll: 0, tokensOnTable: 40,
			},
			{
				id: 1, isParticipating: true, hasActed: false, hand: [[CardColor.DIAMONDS, CardValue.QUEEN], [CardColor.HEARTS, CardValue.QUEEN]],
				bankroll: 0, tokensOnTable: 20,
			},
			{
				id: 2, isParticipating: true, hasActed: false, hand: [[CardColor.DIAMONDS, CardValue.QUEEN], [CardColor.HEARTS, CardValue.QUEEN]],
				bankroll: 500, tokensOnTable: 50,
			},
			{
				id: 3, isParticipating: true, hasActed: false, hand: [[CardColor.DIAMONDS, CardValue.QUEEN], [CardColor.HEARTS, CardValue.QUEEN]],
				bankroll: 0, tokensOnTable: 30,
			}
		];
		const pots: IPot[] = [
			{ potCap: 20, forPlayers: [0, 1, 2, 3], amount: 80, },
			{ potCap: 10, forPlayers: [0, 2, 3], amount: 30, },
			{ potCap: 10, forPlayers: [0, 2], amount: 20, },
			{ potCap: undefined, forPlayers: [2], amount: 10 }
		];

		expect(calculatePots(players)).toStrictEqual(pots);
	});

});