export function shuffle(elements: unknown[], rng?: (seed: unknown) => number) {
    // shuffle every card
    let remainingElements = elements.length;
    while (remainingElements > 0) {
        // select a random card
        let cardToShuffleIndex = Math.floor(Math.random() * remainingElements--);
        const t = elements[remainingElements];
        elements[remainingElements] = elements[cardToShuffleIndex];
        elements[cardToShuffleIndex] = t;
    }
}
