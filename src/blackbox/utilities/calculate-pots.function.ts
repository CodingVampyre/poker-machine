import {ITable} from "../../model/table.interface";
import {IPlayer} from "../../model/player.interface";
import {IPot} from "../../model/pot.interface";

/**
 * calculates the pots in an all in situation
 * @param players
 */
export function calculatePots(players: IPlayer[]): IPot[] {
	const pots: IPot[] = [];
	// sort players to tokens on table
	const sortedAllInPlayers = players
		.slice() // make a copy
		.filter(player => player.bankroll === 0) // only players that are all in
		.sort(sortByTokensOnTable); // smallest token count first
	const sortedNormalPlayers = players
		.slice()
		.filter(player => player.bankroll > 0); // every other player

	// for each player check if he is all in, fill and side pot
	for (const [index, player] of sortedAllInPlayers.entries()) {

		// Fill all pots with cap
		for (const pot of pots) {
			if (pot.potCap !== undefined) {
				const amount = pot.potCap;
				pot.amount += amount;
				player.tokensOnTable -= amount;
			}
		}

		// And Create
		if (player.tokensOnTable > 0) {
			const remainingAmount = player.tokensOnTable;
			pots.push({
				potCap: remainingAmount,
				amount: remainingAmount,
				forPlayers: sortedAllInPlayers
					.filter((player, allIndex) => allIndex >= index)
					.map((_) => _.id)
					.concat(sortedNormalPlayers.map((_, index) => index))
			});
		}

	}

	// Fill pots for players that are not all in
	for (const player of sortedNormalPlayers) {
		for (const pot of pots) {
			if (pot.potCap !== undefined) { // pot has a cap
				// And if player has enough tokens to fill pot
				const amount = Math.min(pot.potCap, player.tokensOnTable);
				pot.amount += amount;
				player.tokensOnTable -= amount;
				// if player is out of money, cap!
				if (player.tokensOnTable === 0) { break; }
			} else { // player has more money then side pots need
				const amount = player.tokensOnTable;
				pot.amount += amount;
				player.tokensOnTable -= pot.amount;
			}
		}
	}

	return pots;
}

function sortByTokensOnTable(a: IPlayer, b: IPlayer) {
	if (a.tokensOnTable > b.tokensOnTable) { return 1; }
	if (a.tokensOnTable < b.tokensOnTable) { return 0; }
	return 0;
}