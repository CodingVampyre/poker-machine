import {Card, CardColor, CardValue} from "../model/card.interface";
import {Hand, IHandValidationResult} from "./hand-validation-result.interface";

export class HandValidator {

    /**
     * takes a list of cards, usually 7, and validates it
     * @param hand
     * @param board
     * @returns
     */
    public static validateHand(hand: [Card, Card], board: Card[]): IHandValidationResult {
        // select the high card
        const highCard = HandValidator.selectHighCard(hand);
        const cards = hand.concat(board);

        HandValidator.orderByValue(cards);

        // check from top to bottom, royal flush first
        const royalFlush = HandValidator.hasRoyalFlush(cards);
        if (royalFlush !== undefined) { return { result: royalFlush, highCard: highCard, hand: Hand.ROYAL_FLUSH } }

        // check for straight flush
        const straightFlush = HandValidator.hasStraightFlush(cards);
        if (straightFlush !== undefined) { return { result: straightFlush, highCard: highCard, hand: Hand.STRAIGHT_FLUSH } }

        // check for quad
        const quad = HandValidator.hasQuads(cards);
        if (quad !== undefined) { return { result: quad, highCard: highCard, hand: Hand.QUAD, } }

        // check for full house
        const fullHouse = HandValidator.hasFullHouse(cards);
        if (fullHouse !== undefined) { return { result: fullHouse, highCard: highCard, hand: Hand.FULL_HOUSE, } }

        // check for flush
        const flush = HandValidator.hasFlush(cards);
        if (flush !== undefined) { return { result: flush, highCard: highCard, hand: Hand.FLUSH, } }

        // check straight
        const straight = HandValidator.hasStraight(cards);
        if (straight !== undefined) { return { result: straight[0], highCard: highCard, hand: Hand.STRAIGHT, } }

        // check three of a kind
        const triplet = HandValidator.hasTriplet(cards);
        if (triplet !== undefined) { return { result: triplet, highCard: highCard, hand: Hand.THREE_OF_A_KIND, } }

        // check three of a kind
        const twoPairs = HandValidator.hasTwoPairs(cards);
        if (twoPairs !== undefined) { return { result: twoPairs, highCard: highCard, hand: Hand.TWO_PAIRS, } }

        // check one pair
        const onePair = HandValidator.hasPair(cards);
        if (onePair !== undefined) { return { result: onePair, highCard: highCard, hand: Hand.ONE_PAIR, } }

        // return the highest card
        return { result: [highCard], highCard: highCard, hand: Hand.HIGH_CARD };
    }

    /**
     * returns a pair, if there is one
     * @param hand 
     */
    public static hasPair(cards: Card[]): [Card, Card] | undefined {
        if (cards.length < 2) { return undefined; }
        // for all cards except for the last once since there is no follow up card
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
    public static hasTwoPairs(cards: Card[]): Card[] | undefined {
        // check first pair
        const firstPair = HandValidator.hasPair(cards);
        if (firstPair === undefined) { return undefined }
        // remove first pair to check for a second one
        const remainingCards = HandValidator.removeCardsFromList(cards, firstPair[0], firstPair[1]);
        // fetch second pair
        const secondPair = HandValidator.hasPair(remainingCards);
        // if there is one, there are two, so, two pairs!
        if (secondPair === undefined) { return undefined; }
        return firstPair.concat(secondPair);
    }

    /**
     * checks for triplets
     * @param cards 
     * @returns a tuble of three cards
     */
    public static hasTriplet(cards: Card[]): [Card, Card, Card] | undefined {
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
    public static hasStraight(cards: Card[]): Card[][] | undefined {
        // order descending to find the highest straight
        const cardsWithoutDuplicates = HandValidator.removeDuplicateValues(cards);
        const straights = [];
        if (cardsWithoutDuplicates.length < 5) { return undefined; }
        // loop in such a way there are always four cards to the left of current card
        for (let i = 0; i <= cardsWithoutDuplicates.length - 5; i++) {
            // create subset of five cards
            const subset = cardsWithoutDuplicates.slice(i, i + 5);
            // check if that set is a straight and return if so
            const isStraight = HandValidator.isStraight(subset);
            if (isStraight) { straights.push(subset); }
        }
        return straights.length > 0 ? straights : undefined;
    }

    /**
     * checks for a flush and returns all card of said flush
     * @param cards 
     * @returns 
     */
    public static hasFlush(cards: Card[]): Card[] | undefined {
        for (const color of [CardColor.CLUBS, CardColor.DIAMONDS, CardColor.HEARTS, CardColor.SPADES]) {
            const cardsOfColor = HandValidator.retrieveCardsOfColor(cards, color);
            if (cardsOfColor.length >= 5) {
                // return the five highest cards so the highest flush can win
                return cardsOfColor.slice(0, 5);
            }
        }
        return undefined;
    }

    /**
     * checks if a set of cards is a full house
     * @param cards 
     * @returns 
     */
    public static hasFullHouse(cards: Card[]): Card[] | undefined {
        // check a triplet
        const triplet = HandValidator.hasTriplet(cards);
        if (triplet === undefined) { return undefined }
        // remove triplet
        const removedTripletCards = HandValidator.removeCardsFromList(cards, ...triplet);
        // check remaining for a pair
        const pair = HandValidator.hasPair(removedTripletCards);
        if (pair === undefined) { return undefined; }
        return triplet.concat(pair);
    }

    /**
     * checks for a quad, four cards of the same color
     * @param cards 
     * @returns 
     */
    public static hasQuads(cards: Card[]): [Card, Card, Card, Card] | undefined {
        if (cards.length < 4) { return undefined; }
        for (let i = 0; i <= cards.length - 4; i++) {
            if (
                cards[i][1] === cards[i + 1][1] &&
                cards[i][1] === cards[i + 2][1] &&
                cards[i][1] === cards[i + 3][1]
            ) {
                return [cards[i], cards[i + 1], cards[i + 2], cards[i + 3]]
            }
        }
        return undefined;
    }

    /**
     * check if a set of cards contains a straight flush
     * @param cards 
     * @returns 
     */
    public static hasStraightFlush(cards: Card[]): Card[] | undefined {
        // check for a straight
        for (const color of [CardColor.DIAMONDS, CardColor.SPADES, CardColor.HEARTS, CardColor.CLUBS]) {
            const cardsOfColor = HandValidator.retrieveCardsOfColor(cards, color);
            if (cardsOfColor.length >= 5) {
                const straight = HandValidator.hasStraight(cardsOfColor);
                if (straight) { return straight[0]; }
            }
        }
        return undefined;
    }

    /**
     * checks a set of cards for a royal flush
     * Royal flush is a straight flush 
     * @param cards 
     * @returns 
     */
    public static hasRoyalFlush(cards: Card[]): Card[] | undefined {
        const straightFlush = HandValidator.hasStraightFlush(cards);
        if (straightFlush === undefined) { return undefined; }
        if (straightFlush[0][1] === CardValue.ACE) {
            return straightFlush;
        }
        return undefined;
    }

    // ***********
    // * HELPERS *
    // ***********

    /**
     * orders a hand by value and ignores colors
     * @returns
     * @param cards
     * @param mode
     */
    public static orderByValue(cards: Card[]) {
        cards.sort((cardA, cardB) => {
            if (cardA[1] > cardB[1]) { return -1; }
            if (cardA[1] < cardB[1]) { return 1; }
            return 0;
        });
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
     *
     * @param cards
     * @param colorToRetrieve
     * @private
     */
    private static retrieveCardsOfColor(cards: Card[], colorToRetrieve: CardColor): Card[] {
        return cards.filter(card => card[0] === colorToRetrieve);
    }

    /**
     * returns the high card out of a hand
     * @param hand
     * @private
     */
    private static selectHighCard(hand: [Card, Card]): Card {
        return hand[0][1] >= hand[1][1] ? hand[0] : hand[1];
    }

    /**
     * 
     * @param cards 
     * @returns 
     */
    private static removeDuplicateValues(cards: Card[]): Card[] {
        return cards.filter(
            (card, index, array) => 
            index === 0 ||
            card[1] !== array[index - 1][1]
        );
    }

}
