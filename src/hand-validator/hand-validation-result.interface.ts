import { Card } from "../model/card.interface";

export enum Hand {
    HIGH_CARD, 
    ONE_PAIR, 
    TWO_PAIRS, 
    THREE_OF_A_KIND, 
    STRAIGHT, 
    FLUSH, 
    FULL_HOUSE, 
    QUAD, 
    STRAIGHT_FLUSH, 
    ROYAL_FLUSH
}

export interface IHandValidationResult {
    hand: Hand;
    highCard: Card;
}
