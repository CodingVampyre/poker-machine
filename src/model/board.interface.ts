import { Card } from "./card.interface";

export interface IBoard {
    flop: {
        cards:Card[];
        revealed: boolean;
    };
    turn: {
        card: Card;
        revealed: boolean;
    };
    river: {
        card: Card;
        revealed: boolean;
    };
}
