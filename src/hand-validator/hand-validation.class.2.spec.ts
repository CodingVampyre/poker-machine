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
