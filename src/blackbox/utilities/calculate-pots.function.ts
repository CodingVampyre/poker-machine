import {ITable} from "../../model/table.interface";
import {IPlayer} from "../../model/player.interface";
import {IPot} from "../../model/pot.interface";

/**
 * calculates the pots in an all in situation
 * @param table
 */
export function calculatePots(table: ITable): IPot[] {
	table.pots = [];
	// sort players to tokens on table
	const sortedAllInPlayers = table.players
		.slice() // make a copy
		.filter(player => player.bankroll === 0) // only players that are all in
		.sort(sortByTokensOnTable); // smallest token count first
	const sortedNormalPlayers = table.players
		.slice()
		.filter(player => player.bankroll > 0)
		.sort(sortByTokensOnTable); // TODO do I have to sort?

	// for each player check if he is all in, fill and side pot
	for (const [index, player] of sortedAllInPlayers.entries()) {

		// Fill all pots with cap
		for (const pot of table.pots) {
			if (pot.potCap !== undefined) {
				const amount = pot.potCap - player.tokensOnTable;
				pot.amount += amount;
				player.tokensOnTable -= amount;
			}
		}

		// And Create
		if (player.tokensOnTable > 0) {
			const remainingAmount = player.tokensOnTable;
			table.pots.push({
				potCap: remainingAmount,
				amount: remainingAmount,
				forPlayers: sortedAllInPlayers
					.filter((player, allIndex) => allIndex >= index)
					.map((_, index) => index)
					.concat(sortedNormalPlayers.map((_, index) => index))
			});
		}

	}

	return table.pots;
}

function sortByTokensOnTable(a: IPlayer, b: IPlayer) {
	if (a.tokensOnTable > b.tokensOnTable) { return 1; }
	if (a.tokensOnTable < b.tokensOnTable) { return 0; }
	return 0;
}