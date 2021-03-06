import { IBoard } from "./board.interface";
import { IPlayer } from "./player.interface";
import { IPot } from "./pot.interface";
import { Action } from "./player-action.interface";

export enum TableMessage {
    NEW_GAME, // the game just has started, initial state
    NEW_ROUND, // a new round has started, initial state
    GO_TROUGH_FINISHED, // can now reveal flop, turn, river or end round
    NEW_GO_THROUGH, // an exchange of betting, folding and calling/checking, gts: pre-flop, flop, turn, river
    FLOP_REVEALED, // the flop was just uncovered
    TURN_REVEALED, // the turn was just uncovered
    RIVER_REVEALED, // the river was just uncovered
    PLAYER_ACTION_DENIED, // an action a player provided was not possible
    PLAYER_FOLDED, // player folded
    PLAYER_CHECKED, // player checked
    PLAYER_CALLED, // player called
    PLAYER_RAISED, // player raised
    PLAYER_ALL_IN,
    ROUND_FINISHED, // a round has been finished, Reset Table and pass dealer chip on
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
    currentActingPlayer: {
        // position in player list to check which player may act
        index: number;
        // a list of possible actions, UI reasons
        possibleActions: Action[],
        // for ui reasons, this will be calculated beforehand, only visible if call is possible
        tokensRequiredToCall?: number,
    };
    // The dealer, next person is big blind, next person is small blind
    dealingPlayer: number;
    // how big the big blind is. Small blind is always half
    blindAmount: number;
    // messages to help with gameplay
    messages: TableMessage[];
}
