import { Bundles as BundlesNormal } from "./table1.data";
import { Bundles as BundlesAllIn } from './table2.data';
import { Bundles as BundlesAllIn2 } from "./table3.data";
import { BlackBox } from "../../blackbox.class";

describe('simulations', () => {
    it.each(BundlesNormal)('should simulate a complete game (Step %#)', (current) => {
        expect(BlackBox.calculateNextState(current.action, current.tableBefore)).toStrictEqual(current.tableAfter);
    });

    it.each(BundlesAllIn)('should simulate all in situation (Step %#)', (current) => {
        expect(BlackBox.calculateNextState(current.action, current.tableBefore)).toStrictEqual(current.tableAfter);
    });

    it.each(BundlesAllIn2)('should simulate special all in cases (Step %#)', (current) => {
        expect(BlackBox.calculateNextState(current.action, current.tableBefore)).toStrictEqual(current.tableAfter);
    });
});
