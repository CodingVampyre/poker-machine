import { Card, CardValue } from "../model/card.interface";
import { IHandValidationResult } from "./hand-validation-result.interface";

export class HandValidator {

    /**
     * takes a list of cards, usually 7, and validates it
     * @param hand 
     * @returns 
     */
    public static validateHand(hand: Card[]): IHandValidationResult | undefined {
        return;
    }

    /**
     * 
     * @param hand returns the highest card a placer owns
     * @returns 
     */
    public static calculateHighCard(hand: Card[]): Card {
        HandValidator.orderByValue(hand);
        return hand[hand.length - 1];
    }

    /**
     * returns a pair, if there is one
     * @param hand 
     */
    public static hasPair(hand: Card[]): [Card, Card] | undefined {
        // for all cards except for the last once since there is no follow up card
        HandValidator.orderByValue(hand);
        for (let i = 0; i < hand.length - 1; i++) {
            const cardA = hand[i];
            const cardB = hand[i+1];
            if (cardA[1] === cardB[1]) { return [cardA, cardB]; }
        }
    }

    /**
     * orders a hand by value and ignores colors
     * @param hand 
     * @returns 
     */
    public static orderByValue(hand: Card[]) {
        hand.sort((cardA, cardB) => {
            if (cardA[1] < cardB[1]) { return -1; }
            if (cardA[1] > cardB[1]) { return 1; }
            return 0;
        });
    }

}