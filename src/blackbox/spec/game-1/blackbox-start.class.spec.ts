import {after, before} from "./table1.data";
import {BlackBox} from "../../blackbox.class";
import {Action} from "../../../model/player-action.interface";

describe('simulating a four player game', () => {
    it('first action: small blind calls (4 Players)', () => {
        const tableAfter = BlackBox.calculateNextState({
            player: 1,
            action: Action.CALL_CHECK,
        }, before);
        expect(tableAfter).toStrictEqual(after);
    });

    it('first action: small blind folds (4 Players)', () => {

    });

    it('first action: small blind raises (4 Players)', () => {

    });
});
