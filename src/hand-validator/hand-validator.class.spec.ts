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

describe('detect two pairs', () => {

	it('should detect two pairs (bad case)', () => {
		const cards: Card[] = [
			[CardColor.HEARTS, CardValue.EIGHT],
			[CardColor.HEARTS, CardValue.SEVEN],
			[CardColor.CLUBS, CardValue.JACK],
			[CardColor.DIAMONDS, CardValue.TWO],
			[CardColor.SPADES, CardValue.JACK],
			[CardColor.SPADES, CardValue.QUEEN],
			[CardColor.CLUBS, CardValue.EIGHT],
		]
		const result = HandValidator.hasTwoPairs(cards);
		expect(result).toBeDefined();
		expect(result).toStrictEqual([
			[CardColor.HEARTS, CardValue.EIGHT],
			[CardColor.CLUBS, CardValue.EIGHT],
			[CardColor.CLUBS, CardValue.JACK],
			[CardColor.SPADES, CardValue.JACK],
		])
	});

	it('should not detect two pairs if there are none', () => {
		const cards: Card[] = [
			[CardColor.HEARTS, CardValue.EIGHT],
			[CardColor.HEARTS, CardValue.SEVEN],
			[CardColor.CLUBS, CardValue.JACK],
			[CardColor.DIAMONDS, CardValue.TWO],
			[CardColor.SPADES, CardValue.JACK],
			[CardColor.SPADES, CardValue.QUEEN],
			[CardColor.CLUBS, CardValue.ACE],
		]
		const result = HandValidator.hasTwoPairs(cards);
		expect(result).toBeUndefined();
	});

});

describe('detect triplets', () => {

	it('should detect two pairs (bad case)', () => {
		const cards: Card[] = [
			[CardColor.HEARTS, CardValue.EIGHT],
			[CardColor.HEARTS, CardValue.SEVEN],
			[CardColor.CLUBS, CardValue.JACK],
			[CardColor.DIAMONDS, CardValue.TWO],
			[CardColor.SPADES, CardValue.JACK],
			[CardColor.SPADES, CardValue.EIGHT],
			[CardColor.CLUBS, CardValue.EIGHT],
		]
		const result = HandValidator.hasTriplet(cards);
		expect(result).toBeDefined();
		expect(result).toStrictEqual([
			[CardColor.HEARTS, CardValue.EIGHT],
			[CardColor.SPADES, CardValue.EIGHT],
			[CardColor.CLUBS, CardValue.EIGHT],
		])
	});

	it('should not detect two pairs if there are none', () => {
		const cards: Card[] = [
			[CardColor.HEARTS, CardValue.EIGHT],
			[CardColor.HEARTS, CardValue.SEVEN],
			[CardColor.CLUBS, CardValue.JACK],
			[CardColor.DIAMONDS, CardValue.TWO],
			[CardColor.SPADES, CardValue.JACK],
			[CardColor.SPADES, CardValue.QUEEN],
			[CardColor.CLUBS, CardValue.ACE],
		]
		const result = HandValidator.hasTriplet(cards);
		expect(result).toBeUndefined();
	});

});

describe('straight', () => {

	it('should detect straight (good case)', () => {
		const cards: Card[] = [
			[CardColor.HEARTS, CardValue.SEVEN],
			[CardColor.HEARTS, CardValue.EIGHT],
			[CardColor.CLUBS, CardValue.NINE],
			[CardColor.DIAMONDS, CardValue.TEN],
			[CardColor.SPADES, CardValue.JACK],
			[CardColor.SPADES, CardValue.EIGHT],
			[CardColor.CLUBS, CardValue.THREE],
		]
		const result = HandValidator.hasStraight(cards);
		expect(result).toBeDefined();
		expect(result).toStrictEqual([
			[CardColor.SPADES, CardValue.JACK],
			[CardColor.DIAMONDS, CardValue.TEN],
			[CardColor.CLUBS, CardValue.NINE],
			[CardColor.HEARTS, CardValue.EIGHT],
			[CardColor.HEARTS, CardValue.SEVEN],
		])
	});

	it('should detect straight (mid case)', () => {
		const cards: Card[] = [
			[CardColor.SPADES, CardValue.SIX],
			[CardColor.CLUBS, CardValue.FOUR],
			[CardColor.HEARTS, CardValue.TWO],
			[CardColor.SPADES, CardValue.FIVE],
			[CardColor.HEARTS, CardValue.THREE],
			[CardColor.CLUBS, CardValue.THREE],
			[CardColor.DIAMONDS, CardValue.FIVE],
		]
		const result = HandValidator.hasStraight(cards);
		expect(result).toBeDefined();
		expect(result).toStrictEqual([
			[CardColor.SPADES, CardValue.SIX],
			[CardColor.DIAMONDS, CardValue.FIVE],
			[CardColor.CLUBS, CardValue.FOUR],
			[CardColor.HEARTS, CardValue.THREE],
			[CardColor.HEARTS, CardValue.TWO],
		])
	});

});
