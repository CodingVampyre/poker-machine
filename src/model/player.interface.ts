import { ICard } from "./card.interface";

export interface IPlayer {
    bankroll: number;
    hand: ICard[];
}
