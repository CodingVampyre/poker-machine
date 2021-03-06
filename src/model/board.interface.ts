import { ICard } from "./card.interface";

export interface IBoard {
    flop: ICard[];
    turn: ICard;
    river: ICard;
}
