export enum Action {
    FOLD, RAISE, CALL_CHECK
}

export interface IPlayerAction {
    player: number;
    action: Action;
}
