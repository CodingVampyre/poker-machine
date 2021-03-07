import { Card } from "./card.interface";

// The middle of a poker table
export interface IBoard {
    // first three cards to be uncovered
    flop: {
        // first three cards to be uncovered
        cards: [Card, Card, Card];
        // is the card visible to players
        revealed: boolean;
    };
    // Fourth card to be uncovered
    turn: {
        // Fourth card to be uncovered
        card: Card;
        // is the card visible to players
        revealed: boolean;
    };
    // Fifth card to be uncovered
    river: {
        // Fifth card to be uncovered
        card: Card;
        // is the card visible to players
        revealed: boolean;
    };
}
