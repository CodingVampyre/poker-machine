enum CardColor { CLUBS, DIAMONDS, HEARTS, SPADES };
enum CardValue { TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE, TEN, JACK, QUEEN, KING, ACE }

export interface ICard {
    color: CardColor;
    value: CardValue;
}
