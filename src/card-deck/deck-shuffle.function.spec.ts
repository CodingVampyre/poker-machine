import {Card, CardColor, CardValue} from "../model/card.interface";
import {shuffle} from "./deck-shuffle.function";

it('should shuffle numbers', () => {
   const numbers = [0, 1, 2, 3, 4];
   shuffle(numbers);
   console.debug(numbers);
});

it('should shuffle cards', () => {
    const miniDeck: Card[] = [
        [CardColor.HEARTS, CardValue.TWO],
        [CardColor.HEARTS, CardValue.THREE],
        [CardColor.HEARTS, CardValue.FOUR],
        [CardColor.HEARTS, CardValue.FIVE],
        [CardColor.HEARTS, CardValue.SIX],
    ];

    shuffle(miniDeck);
    console.log(miniDeck);
})