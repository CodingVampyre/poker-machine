import { Card, CardValue } from "../model/card.interface";
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
            const cardB = cards[i+1];
            if (cardA[1] === cardB[1]) { return [cardA, cardB]; }
        }
    }

    // ***********
    // * HELPERS *
    // ***********

    /**
     * orders a hand by value and ignores colors
     * @param hand 
     * @returns 
     */
    public static orderByValue(cards: Card[]) {
        cards.sort((cardA, cardB) => {
            if (cardA[1] < cardB[1]) { return -1; }
            if (cardA[1] > cardB[1]) { return 1; }
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

}