import { IBoard } from "./board.interface";
import { IPlayer } from "./player.interface";
import { IPot } from "./pot.interface";

export enum TableMessage {
    NEW_GAME, // the game just has started, initial state
    NEW_ROUND, // a new round has started, initial state
    NEW_GO_THROUGH, // an exchange of betting, folding and calling/checking, gts: pre-flop, flop, turn, river
    GO_TROUGH_FINISHED, // can now reveal flop, turn, river or end round
    ROUND_FINISHED, // a round has been finished, can now open flop, turn or river
    GAME_FINISHED, // last player standing or winning condition fulfilled
}

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
    // messages to help with gameplay
    messages: TableMessage[];
}
