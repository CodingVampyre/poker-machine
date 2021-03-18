import { Bundles } from "./table1.data";
import { Bundles as BundlesAllIn } from './table2.data';
import { BlackBox } from "../../blackbox.class";

it.each(Bundles)('should simulate a complete game (Step %#)', (current) => {
    expect(BlackBox.calculateNextState(current.action, current.tableBefore)).toStrictEqual(current.tableAfter);
});

it.each(BundlesAllIn)('should simulate all in situation (Step %#)', (current) => {
    expect(BlackBox.calculateNextState(current.action, current.tableBefore)).toStrictEqual(current.tableAfter);
});
