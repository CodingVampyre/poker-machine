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

})