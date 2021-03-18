import { Bundles } from "./table1.data";
import {BlackBox} from "../../blackbox.class";

it.each(Bundles)('should simulate a complete game (Step %#)', (current) => {
    expect(BlackBox.calculateNextState(current.action, current.tableBefore)).toStrictEqual(current.tableAfter);
});

it('should test that one', () => {
    const current = Bundles[11];
    expect(BlackBox.calculateNextState(current.action, current.tableBefore)).toStrictEqual(current.tableAfter);
})