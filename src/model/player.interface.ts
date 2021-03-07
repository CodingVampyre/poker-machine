import { Card } from "./card.interface";

// A player participating in a game of poker
export interface IPlayer {
    // name of the player, mostly debug purposes for the blackbox
    name: string;
    // amount of tokes a player owns
    bankroll: number;
    // amount of money that player put out.
    tokensOnTable: number;
    // the two cards
    hand: [Card, Card];
}
