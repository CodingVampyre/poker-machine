import {Card, CardColor, CardValue} from "../model/card.interface";
import {HandValidator} from "./hand-validator.class";
import {Hand} from "./hand-validation-result.interface";

it('should evaluate high cards', () => {
	const hand: [Card, Card] = [[CardColor.HEARTS, CardValue.SEVEN], [CardColor.HEARTS, CardValue.TWO]];
	const board: Card[] = [
		[CardColor.HEARTS, CardValue.FOUR],
		[CardColor.SPADES, CardValue.SIX],
		[CardColor.DIAMONDS, CardValue.QUEEN],
		[CardColor.DIAMONDS, CardValue.ACE],
		[CardColor.SPADES, CardValue.THREE],
	];
	const result = HandValidator.validateHand(hand, board);
	expect(result).toStrictEqual({
		hand: Hand.HIGH_CARD,
		highCard: [CardColor.HEARTS, CardValue.SEVEN],
		result: [[CardColor.HEARTS, CardValue.SEVEN]],
	});
});

it('should evaluate pairs', () => {
	const hand: [Card, Card] = [[CardColor.HEARTS, CardValue.SEVEN], [CardColor.HEARTS, CardValue.TWO]];
	const board: Card[] = [
		[CardColor.HEARTS, CardValue.FOUR],
		[CardColor.SPADES, CardValue.SIX],
		[CardColor.DIAMONDS, CardValue.QUEEN],
		[CardColor.DIAMONDS, CardValue.SEVEN],
		[CardColor.SPADES, CardValue.THREE],
	];
	const result = HandValidator.validateHand(hand, board);
	expect(result).toStrictEqual({
		hand: Hand.ONE_PAIR,
		highCard: [CardColor.HEARTS, CardValue.SEVEN],
		result: [[CardColor.HEARTS, CardValue.SEVEN], [CardColor.DIAMONDS, CardValue.SEVEN],],
	});
});

it('should evaluate two pairs', () => {
	const hand: [Card, Card] = [[CardColor.HEARTS, CardValue.SEVEN], [CardColor.HEARTS, CardValue.TWO]];
	const board: Card[] = [
		[CardColor.HEARTS, CardValue.FOUR],
		[CardColor.SPADES, CardValue.SIX],
		[CardColor.DIAMONDS, CardValue.TWO],
		[CardColor.DIAMONDS, CardValue.SEVEN],
		[CardColor.SPADES, CardValue.THREE],
	];
	const result = HandValidator.validateHand(hand, board);
	expect(result).toStrictEqual({
		hand: Hand.TWO_PAIRS,
		highCard: [CardColor.HEARTS, CardValue.SEVEN],
		result: [
			[CardColor.HEARTS, CardValue.SEVEN],
			[CardColor.DIAMONDS, CardValue.SEVEN],
			[CardColor.HEARTS, CardValue.TWO],
			[CardColor.DIAMONDS, CardValue.TWO],
		],
	});
});

it('should evaluate triplets', () => {
	const hand: [Card, Card] = [[CardColor.HEARTS, CardValue.SEVEN], [CardColor.HEARTS, CardValue.TWO]];
	const board: Card[] = [
		[CardColor.HEARTS, CardValue.FOUR],
		[CardColor.SPADES, CardValue.SIX],
		[CardColor.SPADES, CardValue.SEVEN],
		[CardColor.DIAMONDS, CardValue.EIGHT],
		[CardColor.DIAMONDS, CardValue.SEVEN],
	];
	const result = HandValidator.validateHand(hand, board);
	expect(result).toStrictEqual({
		hand: Hand.THREE_OF_A_KIND,
		highCard: [CardColor.HEARTS, CardValue.SEVEN],
		result: [
			[CardColor.HEARTS, CardValue.SEVEN],
			[CardColor.SPADES, CardValue.SEVEN],
			[CardColor.DIAMONDS, CardValue.SEVEN],
		],
	});
});

it('should have a straight', () => {
	const hand: [Card, Card] = [[CardColor.HEARTS, CardValue.SEVEN], [CardColor.HEARTS, CardValue.FIVE]];
	const board: Card[] = [
		[CardColor.SPADES, CardValue.SIX],
		[CardColor.HEARTS, CardValue.FOUR],
		[CardColor.SPADES, CardValue.NINE],
		[CardColor.DIAMONDS, CardValue.EIGHT],
		[CardColor.DIAMONDS, CardValue.SEVEN],
	];
	const result = HandValidator.validateHand(hand, board);
	expect(result).toStrictEqual({
		hand: Hand.STRAIGHT,
		highCard: [CardColor.HEARTS, CardValue.SEVEN],
		result: [
			[CardColor.SPADES, CardValue.NINE],
			[CardColor.DIAMONDS, CardValue.EIGHT],
			[CardColor.HEARTS, CardValue.SEVEN],
			[CardColor.SPADES, CardValue.SIX],
			[CardColor.HEARTS, CardValue.FIVE],
		],
	});
});

it('should have a flush', () => {
	const hand: [Card, Card] = [[CardColor.HEARTS, CardValue.SEVEN], [CardColor.HEARTS, CardValue.FIVE]];
	const board: Card[] = [
		[CardColor.HEARTS, CardValue.SIX],
		[CardColor.HEARTS, CardValue.QUEEN],
		[CardColor.HEARTS, CardValue.NINE],
		[CardColor.DIAMONDS, CardValue.EIGHT],
		[CardColor.DIAMONDS, CardValue.SEVEN],
	];
	const result = HandValidator.validateHand(hand, board);
	expect(result).toStrictEqual({
		hand: Hand.FLUSH,
		highCard: [CardColor.HEARTS, CardValue.SEVEN],
		result: [
			[CardColor.HEARTS, CardValue.QUEEN],
			[CardColor.HEARTS, CardValue.NINE],
			[CardColor.HEARTS, CardValue.SEVEN],
			[CardColor.HEARTS, CardValue.SIX],
			[CardColor.HEARTS, CardValue.FIVE],
		],
	});
});

describe('full house', () => {
	it('should have a full house', () => {
		const hand: [Card, Card] = [[CardColor.DIAMONDS, CardValue.QUEEN], [CardColor.HEARTS, CardValue.FIVE]];
		const board: Card[] = [
			[CardColor.DIAMONDS, CardValue.FIVE],
			[CardColor.HEARTS, CardValue.QUEEN],
			[CardColor.CLUBS, CardValue.QUEEN],
			[CardColor.DIAMONDS, CardValue.EIGHT],
			[CardColor.DIAMONDS, CardValue.SEVEN],
		];
		const result = HandValidator.validateHand(hand, board);
		expect(result).toStrictEqual({
			hand: Hand.FULL_HOUSE,
			highCard: [CardColor.DIAMONDS, CardValue.QUEEN],
			result: [
				[CardColor.DIAMONDS, CardValue.QUEEN],
				[CardColor.HEARTS, CardValue.QUEEN],
				[CardColor.CLUBS, CardValue.QUEEN],
				[CardColor.HEARTS, CardValue.FIVE],
				[CardColor.DIAMONDS, CardValue.FIVE],
			],
		});
	});

	it('should have a full house for two triplets', () => {
		const hand: [Card, Card] = [[CardColor.DIAMONDS, CardValue.QUEEN], [CardColor.HEARTS, CardValue.FIVE]];
		const board: Card[] = [
			[CardColor.DIAMONDS, CardValue.FIVE],
			[CardColor.HEARTS, CardValue.QUEEN],
			[CardColor.CLUBS, CardValue.QUEEN],
			[CardColor.DIAMONDS, CardValue.EIGHT],
			[CardColor.CLUBS, CardValue.FIVE],
		];
		const result = HandValidator.validateHand(hand, board);
		expect(result).toStrictEqual({
			hand: Hand.FULL_HOUSE,
			highCard: [CardColor.DIAMONDS, CardValue.QUEEN],
			result: [
				[CardColor.DIAMONDS, CardValue.QUEEN],
				[CardColor.HEARTS, CardValue.QUEEN],
				[CardColor.CLUBS, CardValue.QUEEN],
				[CardColor.HEARTS, CardValue.FIVE],
				[CardColor.DIAMONDS, CardValue.FIVE],
			],
		});
	});
});

it('should have quads ', () => {
	const hand: [Card, Card] = [[CardColor.DIAMONDS, CardValue.SIX], [CardColor.DIAMONDS, CardValue.ACE]];
	const board: Card[] = [
		[CardColor.SPADES, CardValue.SIX],
		[CardColor.HEARTS, CardValue.SIX],
		[CardColor.DIAMONDS, CardValue.THREE],
		[CardColor.CLUBS, CardValue.SIX],
		[CardColor.DIAMONDS, CardValue.FIVE],
	];
	const result = HandValidator.validateHand(hand, board);
	expect(result).toStrictEqual({
		hand: Hand.QUAD,
		highCard: [CardColor.DIAMONDS, CardValue.ACE],
		result: [
			[CardColor.DIAMONDS, CardValue.SIX],
			[CardColor.SPADES, CardValue.SIX],
			[CardColor.HEARTS, CardValue.SIX],
			[CardColor.CLUBS, CardValue.SIX],
		],
	});
});

it('should have straight flush', () => {
	const hand: [Card, Card] = [[CardColor.SPADES, CardValue.EIGHT], [CardColor.SPADES, CardValue.TEN]];
	const board: Card[] = [
		[CardColor.SPADES, CardValue.SEVEN],
		[CardColor.SPADES, CardValue.NINE],
		[CardColor.DIAMONDS, CardValue.SEVEN],
		[CardColor.CLUBS, CardValue.SEVEN],
		[CardColor.SPADES, CardValue.JACK],
	];
	const result = HandValidator.validateHand(hand, board);
	expect(result).toStrictEqual({
		hand: Hand.STRAIGHT_FLUSH,
		highCard: [CardColor.SPADES, CardValue.TEN],
		result: [
			[CardColor.SPADES, CardValue.JACK],
			[CardColor.SPADES, CardValue.TEN],
			[CardColor.SPADES, CardValue.NINE],
			[CardColor.SPADES, CardValue.EIGHT],
			[CardColor.SPADES, CardValue.SEVEN],
		],
	});
});

it('should have royal flush', () => {
	const hand: [Card, Card] = [[CardColor.DIAMONDS, CardValue.JACK], [CardColor.DIAMONDS, CardValue.ACE]];
	const board: Card[] = [
		[CardColor.DIAMONDS, CardValue.TEN],
		[CardColor.HEARTS, CardValue.JACK],
		[CardColor.DIAMONDS, CardValue.QUEEN],
		[CardColor.DIAMONDS, CardValue.KING],
		[CardColor.SPADES, CardValue.EIGHT],
	];
	const result = HandValidator.validateHand(hand, board);
	expect(result).toStrictEqual({
		hand: Hand.ROYAL_FLUSH,
		highCard: [CardColor.DIAMONDS, CardValue.ACE],
		result: [
			[CardColor.DIAMONDS, CardValue.ACE],
			[CardColor.DIAMONDS, CardValue.KING],
			[CardColor.DIAMONDS, CardValue.QUEEN],
			[CardColor.DIAMONDS, CardValue.JACK],
			[CardColor.DIAMONDS, CardValue.TEN],
		],
	});
});
