import { IBoard } from "./board.interface";
import { IPlayer } from "./player.interface";
import { IPot } from "./pot.interface";

// A table is the current state of a poker game.
// It determines which player currently may act and what cards and bets are placed.
export interface ITable {
    // A list of players participating in a game
    players: IPlayer[];
    // a list of pots, usually only one, but side pots are allowed
    pots: IPot[];
    // flop, turn and river
    board: IBoard;
    // index of the players array. 
    currentActingPlayer: number;
    // The deadler, next person is big blind, next person is small blind
    dealingPlayer: number;
    // how big the big blind is. Small blind is always half
    blindAmount: number;
}
