// amount of tokens placed by all players
export interface IPot {
    // if there are side pots, only participating players can get that pot
    forPlayers?: number[];
    // sum of all bets the players made
    amount: number;
}
