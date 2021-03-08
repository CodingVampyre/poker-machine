import {HandValidator} from "./hand-validator.class";
import {Card, CardColor, CardValue} from "../model/card.interface";

describe('detect pairs', () => {

	it('should detect pairs (mid case)', () => {
		const cards: Card[] = [
			[CardColor.CLUBS, CardValue.EIGHT],
			[CardColor.HEARTS, CardValue.SEVEN],
			[CardColor.HEARTS, CardValue.EIGHT],
			[CardColor.CLUBS, CardValue.JACK],
			[CardColor.DIAMONDS, CardValue.TWO],
			[CardColor.SPADES, CardValue.FOUR],
			[CardColor.SPADES, CardValue.QUEEN],
		]
		const result = HandValidator.hasPair(cards);
		expect(result).toBeDefined();
		expect(result).toStrictEqual([
			[CardColor.CLUBS, CardValue.EIGHT],
			[CardColor.HEARTS, CardValue.EIGHT],
		])
	});

	it('should detect pairs (bad case)', () => {
		const cards: Card[] = [
			[CardColor.HEARTS, CardValue.EIGHT],
			[CardColor.HEARTS, CardValue.SEVEN],
			[CardColor.CLUBS, CardValue.JACK],
			[CardColor.DIAMONDS, CardValue.TWO],
			[CardColor.SPADES, CardValue.FOUR],
			[CardColor.SPADES, CardValue.QUEEN],
			[CardColor.CLUBS, CardValue.EIGHT],
		]
		const result = HandValidator.hasPair(cards);
		expect(result).toBeDefined();
		expect(result).toStrictEqual([
			[CardColor.HEARTS, CardValue.EIGHT],
			[CardColor.CLUBS, CardValue.EIGHT],
		])
	});

	it('should not detect non pairs if theere are nonee', () => {
		const cards: Card[] = [
			[CardColor.HEARTS, CardValue.EIGHT],
			[CardColor.HEARTS, CardValue.SEVEN],
			[CardColor.CLUBS, CardValue.JACK],
			[CardColor.DIAMONDS, CardValue.TWO],
			[CardColor.SPADES, CardValue.FOUR],
			[CardColor.SPADES, CardValue.QUEEN],
			[CardColor.CLUBS, CardValue.ACE],
		]
		const result = HandValidator.hasPair(cards);
		expect(result).toBeUndefined();
	});

});