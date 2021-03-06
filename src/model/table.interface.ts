import { IBoard } from "./board.interface";
import { IPlayer } from "./player.interface";
import { IPot } from "./pot.interface";

export interface ITable {
    players: IPlayer[];
    pots: IPot[];
    board: IBoard;
    currentActingPlayer: number;
    minimumCallToStayIn: number;
    dealingPlayer: number;
    blindAmount: number;
}
