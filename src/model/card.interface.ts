export enum CardColor { SPADES = '♤', HEARTS = '♡', DIAMONDS = '♢', CLUBS = '♧' };
export enum CardValue { TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE, TEN, JACK, QUEEN, KING, ACE }
export type Card = [CardColor, CardValue];
