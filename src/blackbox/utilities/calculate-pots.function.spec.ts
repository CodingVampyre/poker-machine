import {IPlayer} from "../../model/player.interface";
import {IPot} from "../../model/pot.interface";
import {calculatePots} from "./calculate-pots.function";
import {CardColor, CardValue} from "../../model/card.interface";

describe('calculate all in pots', () => {

	it('should handle ascending all ins', () => {
		const players: IPlayer[] = [
			{
				id: 'A', isParticipating: true, hasActed: false, hand: [[CardColor.DIAMONDS, CardValue.KING], [CardColor.HEARTS, CardValue.KING]],
				bankroll: 0, tokensOnTable: 10,
			},
			{
				id: 'B', isParticipating: true, hasActed: false, hand: [[CardColor.DIAMONDS, CardValue.QUEEN], [CardColor.HEARTS, CardValue.QUEEN]],
				bankroll: 0, tokensOnTable: 20,
			},
			{
				id: 'B', isParticipating: true, hasActed: false, hand: [[CardColor.DIAMONDS, CardValue.QUEEN], [CardColor.HEARTS, CardValue.QUEEN]],
				bankroll: 0, tokensOnTable: 40,
			}
		];
		const pots: IPot[] = [
			{ potCap: 10, forPlayers: [0, 1, 2], amount: 30, },
			{ potCap: 10, forPlayers: [1, 2], amount: 20, },
			{ potCap: 20, forPlayers: [1], amount: 20, }
		];

		expect(calculatePots(players)).toStrictEqual(pots);
	});

});