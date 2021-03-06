import { Card } from "./card.interface";

export interface IPlayer {
    name: string;
    bankroll: number;
    tokensOnTable: number;
    hand: Card[];
}
