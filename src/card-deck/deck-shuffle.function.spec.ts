import {Card, CardColor, CardValue} from "../model/card.interface";
import {shuffle} from "./deck-shuffle.function";
import {createDeck} from "./create-deck.function";

it('should shuffle numbers', () => {
   const numbers = [0, 1, 2, 3, 4];

   let index = 0;
   const noRng = () => {
       const random = [0.8, 0.1, 0.7, 0.9, 0.5];
       const number = random[index];
       index = (index+1) % random.length;
       return number;
   };
   shuffle(numbers, noRng);

   expect(numbers).toStrictEqual([3, 1, 2, 0, 4]);
});

it('should shuffle cards', () => {
    const miniDeck: Card[] = [
        [CardColor.HEARTS, CardValue.TWO],
        [CardColor.HEARTS, CardValue.THREE],
        [CardColor.HEARTS, CardValue.FOUR],
        [CardColor.HEARTS, CardValue.FIVE],
        [CardColor.HEARTS, CardValue.SIX],
    ];

    let index = 0;
    const noRng = () => {
        const random = [0.8, 0.1, 0.7, 0.9, 0.5];
        const number = random[index];
        index = (index+1) % random.length;
        return number;
    };
    shuffle(miniDeck, noRng);
    expect(miniDeck).toStrictEqual([
        [CardColor.HEARTS, CardValue.FIVE],
        [CardColor.HEARTS, CardValue.THREE],
        [CardColor.HEARTS, CardValue.FOUR],
        [CardColor.HEARTS, CardValue.TWO],
        [CardColor.HEARTS, CardValue.SIX],
    ]);
});

it('should shuffle randomly', () => {
    const deck = createDeck();
    expect(() => shuffle(deck)).not.toThrow();
});
