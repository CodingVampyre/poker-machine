// amount of tokens placed by all players
export interface IPot {
    // if there are side pots, only participating players can get that pot
    forPlayers?: number[];
    // sum of all bets the players made
    amount: number;
    // when a player goes all in, the current pot will have his all in value as cap
    // everything above that gets added to a new side pot!
    potCap?: number;
}
