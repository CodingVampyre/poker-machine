/**
 * takes any array and shuffles it randomly
 * @param elements the array to shuffle
 * @param rng a random number generator that may be used if implementing an individual rng
 */
export function shuffle(elements: unknown[], rng?: () => number) {
    // shuffle every card
    let remainingElements = elements.length;
    while (remainingElements > 0) {
        // select a random card
        let cardToShuffleIndex = Math.floor((rng ? rng() : Math.random()) * remainingElements--);
        const t = elements[remainingElements];
        elements[remainingElements] = elements[cardToShuffleIndex];
        elements[cardToShuffleIndex] = t;
    }
}
