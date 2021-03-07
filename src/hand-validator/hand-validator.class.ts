import { Card, CardColor, CardValue } from "../model/card.interface";
import { IHandValidationResult } from "./hand-validation-result.interface";

export class HandValidator {

    /**
     * takes a list of cards, usually 7, and validates it
     * @param hand 
     * @returns 
     */
    public static validateHand(hand: Card[], board: Card[]): IHandValidationResult | undefined {
        return;
    }

    /**
     * 
     * @param hand returns the highest card a placer owns
     * @returns 
     */
    public static calculateHighCard(hand: [Card, Card]): Card {
        const [cardA, cardB] = hand;
        return cardA[1] >= cardB[1] ? cardA : cardB;
    }

    /**
     * returns a pair, if there is one
     * @param hand 
     */
    public static hasPair(cards: Card[]): [Card, Card] | undefined {
        // for all cards except for the last once since there is no follow up card
        HandValidator.orderByValue(cards);
        for (let i = 0; i < cards.length - 1; i++) {
            const cardA = cards[i];
            const cardB = cards[i + 1];
            if (cardA[1] === cardB[1]) { return [cardA, cardB]; }
        }
    }

    /**
     * checks for two pairs
     * @param cards 
     * @returns borth pairs as a tuble of two cards
     */
    public static hasTwoPairs(cards: Card[]): [[Card, Card], [Card, Card]] | undefined {
        HandValidator.orderByValue(cards);
        // check first pair
        const firstPair = HandValidator.hasPair(cards);
        if (firstPair === undefined) { return undefined }
        // remove first pair to check for a second one
        const remainingCards = HandValidator.removeCardsFromList(cards, firstPair[0], firstPair[1]);
        // fetch second pair
        const secondPair = HandValidator.hasPair(remainingCards);
        // if there is one, there are two, so, two pairs!
        if (secondPair === undefined) { return undefined; }
        return [firstPair, secondPair];
    }

    /**
     * checks for triplets
     * @param cards 
     * @returns a tuble of three cards
     */
    public static hasTriplet(cards: Card[]): [Card, Card, Card] | undefined {
        HandValidator.orderByValue(cards);
        // check until prelast card
        for (let i = 0; i < cards.length - 2; i++) {
            // next and next next card should match with current
            if (cards[i][1] === cards[i + 1][1] && cards[i][1] === cards[i + 2][1]) {
                return [cards[i], cards[i + 1], cards[i + 2]];
            }
        }
        return undefined;
    }

    /**
     * checks for straight
     * @param cards 
     * @returns 
     */
    public static hasStraight(cards: Card[]): Card[] | undefined {
        if (cards.length < 5) { return undefined; }
        HandValidator.orderByValue(cards, 'desc');
        // loop in such a way there are always four cards to the left of current card
        for (let i = 0; i < cards.length - 5; i++) {
            // create subset of five cards
            const subset = cards.slice(i, i + 5);
            // check if that set is a striaght and return if so
            const isStraight = HandValidator.isStraight(subset);
            if (isStraight) { return subset; }
        }
        return undefined;
    }

    public static hasFlush(cards: Card[]): Card[] | undefined {
        return undefined;
    }

    // ***********
    // * HELPERS *
    // ***********

    /**
     * orders a hand by value and ignores colors
     * @param hand 
     * @returns 
     */
    public static orderByValue(cards: Card[], mode: 'asc' | 'desc' = 'asc') {
        if (mode === 'asc') {
            cards.sort((cardA, cardB) => {
                if (cardA[1] < cardB[1]) { return -1; }
                if (cardA[1] > cardB[1]) { return 1; }
                return 0;
            });
        } else {
            cards.sort((cardA, cardB) => {
                if (cardA[1] > cardB[1]) { return -1; }
                if (cardA[1] < cardB[1]) { return 1; }
                return 0;
            });
        }
    }

    /**
     * returns tthe card list without the cards that should be removed
     * @param cards 
     * @param cardsToRemove 
     * @returns 
     */
    public static removeCardsFromList(cards: Card[], ...cardsToRemove: Card[]): Card[] {
        return cards.filter(card => {
            for (const cardToRemove of cardsToRemove) {
                if (
                    card[0] === cardToRemove[0] &&
                    card[1] === cardToRemove[1]
                ) { return false; }
            }
            return true;
        });
    }

    /**
     * checks if a set of five cards is a straight
     * @param cards 
     * @returns 
     */
    private static isStraight(cards: Card[]): boolean {
        if (cards.length !== 5) { return false; }
        // each following card must have a value higher then the one before
        let lastValue = cards[0][1];
        for (let i = 1; i < cards.length; i++) {
            if (cards[i][1] === lastValue - 1) { lastValue = cards[i][1]; }
            else { return false; }
        }
        return true;
    }

    /**
     * counts a specific color in a set of cards
     * @param cards 
     * @param colorToCount 
     * @returns 
     */
    private static countColors(cards: Card[], colorToCount: CardColor): number {
        let count = 0;
        for (const card of cards) {
            if (card[0] === colorToCount) { count++; }
        }
        return count;
    }

}