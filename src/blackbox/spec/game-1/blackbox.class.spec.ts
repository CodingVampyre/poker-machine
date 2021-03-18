import { Bundles } from "./table1.data";
import { BlackBox } from "../../blackbox.class";

it.each(Bundles)('should simulate a complete game (Step %#)', (current) => {
    expect(BlackBox.calculateNextState(current.action, current.tableBefore)).toStrictEqual(current.tableAfter);
});
