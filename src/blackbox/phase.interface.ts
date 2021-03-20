import {ITable} from "../model/table.interface";
import {IPlayerAction} from "../model/player-action.interface";

/**  */
export interface IPhase {
    execute: (table: ITable, action: IPlayerAction) => ITable | undefined;
}