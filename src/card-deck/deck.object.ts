import {Card, CardColor, CardValue} from "../model/card.interface";

/** An ordered deck of cards, ready to shuffle */
const deck: Card[] = [
    [CardColor.CLUBS, CardValue.TWO],
    [CardColor.CLUBS, CardValue.THREE],
    [CardColor.CLUBS, CardValue.FOUR],
    [CardColor.CLUBS, CardValue.FIVE],
    [CardColor.CLUBS, CardValue.SIX],
    [CardColor.CLUBS, CardValue.SEVEN],
    [CardColor.CLUBS, CardValue.EIGHT],
    [CardColor.CLUBS, CardValue.NINE],
    [CardColor.CLUBS, CardValue.TEN],
    [CardColor.CLUBS, CardValue.JACK],
    [CardColor.CLUBS, CardValue.QUEEN],
    [CardColor.CLUBS, CardValue.KING],
    [CardColor.CLUBS, CardValue.ACE],

    [CardColor.DIAMONDS, CardValue.TWO],
    [CardColor.DIAMONDS, CardValue.THREE],
    [CardColor.DIAMONDS, CardValue.FOUR],
    [CardColor.DIAMONDS, CardValue.FIVE],
    [CardColor.DIAMONDS, CardValue.SIX],
    [CardColor.DIAMONDS, CardValue.SEVEN],
    [CardColor.DIAMONDS, CardValue.EIGHT],
    [CardColor.DIAMONDS, CardValue.NINE],
    [CardColor.DIAMONDS, CardValue.TEN],
    [CardColor.DIAMONDS, CardValue.JACK],
    [CardColor.DIAMONDS, CardValue.QUEEN],
    [CardColor.DIAMONDS, CardValue.KING],
    [CardColor.DIAMONDS, CardValue.ACE],

    [CardColor.HEARTS, CardValue.TWO],
    [CardColor.HEARTS, CardValue.THREE],
    [CardColor.HEARTS, CardValue.FOUR],
    [CardColor.HEARTS, CardValue.FIVE],
    [CardColor.HEARTS, CardValue.SIX],
    [CardColor.HEARTS, CardValue.SEVEN],
    [CardColor.HEARTS, CardValue.EIGHT],
    [CardColor.HEARTS, CardValue.NINE],
    [CardColor.HEARTS, CardValue.TEN],
    [CardColor.HEARTS, CardValue.JACK],
    [CardColor.HEARTS, CardValue.QUEEN],
    [CardColor.HEARTS, CardValue.KING],
    [CardColor.HEARTS, CardValue.ACE],

    [CardColor.SPADES, CardValue.TWO],
    [CardColor.SPADES, CardValue.THREE],
    [CardColor.SPADES, CardValue.FOUR],
    [CardColor.SPADES, CardValue.FIVE],
    [CardColor.SPADES, CardValue.SIX],
    [CardColor.SPADES, CardValue.SEVEN],
    [CardColor.SPADES, CardValue.EIGHT],
    [CardColor.SPADES, CardValue.NINE],
    [CardColor.SPADES, CardValue.TEN],
    [CardColor.SPADES, CardValue.JACK],
    [CardColor.SPADES, CardValue.QUEEN],
    [CardColor.SPADES, CardValue.KING],
    [CardColor.SPADES, CardValue.ACE],
];

/**
 * creates a shallow copy
 */
export function createDeck(): Card[] {
    return deck.slice();
}
