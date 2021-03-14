import { Bundles } from "./table1.data";
import {BlackBox} from "../../blackbox.class";

it('should test the first game', () => {
    const [
        first,
        second,
        third,
        fourth,
    ] = Bundles;

    expect(BlackBox.calculateNextState(first.action, first.tableBefore)).toStrictEqual(first.tableAfter);
    expect(BlackBox.calculateNextState(second.action, second.tableBefore)).toStrictEqual(second.tableAfter);
    expect(BlackBox.calculateNextState(third.action, third.tableBefore)).toStrictEqual(third.tableAfter);
    expect(BlackBox.calculateNextState(fourth.action, fourth.tableBefore)).toStrictEqual(fourth.tableAfter);
});
