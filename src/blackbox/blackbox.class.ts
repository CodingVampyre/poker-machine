import { ITable } from "../model/table.interface";

export class BlackBox {

    public static calculateNextState(action: IPlayerAction, table: ITable): ITable {
        return table;
    }

}