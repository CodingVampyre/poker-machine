import { Card } from "./card.interface";

export interface IPlayer {
    name: string;
    bankroll: number;
    hand: Card[];
}
