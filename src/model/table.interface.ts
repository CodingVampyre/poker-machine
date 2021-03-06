import { IBoard } from "./board.interface";
import { ICard } from "./card.interface";
import { IPlayer } from "./player.interface";
import { IPot } from "./pot.interface";

export interface ITable {
    players: IPlayer[];
    pots: IPot[];
    stack: ICard[];
    board: IBoard;
    currentActingPlayer: number;
    minimumCallToStayIn: number;
    dealingPlayer: number;
    blindAmount: number;
}
