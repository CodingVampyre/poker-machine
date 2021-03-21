import { Card } from "./card.interface";

// A player participating in a game of poker
export interface IPlayer {
    // name of the player, mostly debug purposes for the blackbox
    id: string;
    // amount of tokes a player owns
    bankroll: number;
    // amount of money that player put out for each pot. this should be as long as the pot length itself
    tokensOnTable: number;
    // the two cards
    hand: [Card, Card];
    // when a player folds, he is no longer participating and will not win that round
    isParticipating: boolean;
    // if he is in the game, he should have a chance to act
    hasActed: boolean;
}
