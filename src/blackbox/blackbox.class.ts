import {ITable, TableMessage} from "../model/table.interface";
import {Action, IPlayerAction} from "../model/player-action.interface";
import {IPlayer} from "../model/player.interface";
import {IPot} from "../model/pot.interface";
import {ValidationPhase} from "./phases/validation-phase.class";
import {IPhase} from "./phase.interface";
import {ActionPhase} from "./phases/action-phase.class";
import {GoThroughCheckPhase} from "./phases/go-through-check-phase.class";
import {NextPlayerCalculationPhase} from "./phases/next-player-calculation-phase.class";

export class BlackBox {

    private static phases: IPhase[] = [
        new ValidationPhase(),
        new ActionPhase(),
        new GoThroughCheckPhase(),
        new NextPlayerCalculationPhase(),
    ]

    /**
     * calculates the next state of a tablr
     * @param action
     * @param table
     */
    public static calculateNextState(action: IPlayerAction, table: ITable): ITable | undefined {

        // execute phases
        let currentStateTable: ITable | undefined = table;
        for (const phase of BlackBox.phases) {
            currentStateTable = phase.execute(table, action);
            if (currentStateTable === undefined) { return undefined; }
        }

        // return
        return currentStateTable;
    }

}