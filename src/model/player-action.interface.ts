export enum Action { FOLD, CHECK, CALL, RAISE, ALL_IN }

export interface IPlayerAction {
    player: number;
    action: Action;
    raiseAmount?: number;
}
