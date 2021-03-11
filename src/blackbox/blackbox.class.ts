import { ITable } from "../model/table.interface";
import {IPlayerAction} from "../model/player-action.interface";

export class BlackBox {

    public static calculateNextState(action: IPlayerAction, table: ITable): ITable {
        return table;
    }

}