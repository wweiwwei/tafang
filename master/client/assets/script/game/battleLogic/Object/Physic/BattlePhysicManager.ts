import { BattleBattleStageContext } from "../../Processor/BattleBattleStageContext";
import { BattleForce } from "./BattleForce";

export class BattlePhysicManager {
    constructor(public ctx: BattleBattleStageContext) {}

    private force: BattleForce[] = [];
    addForce(force: BattleForce) {
        this.force.push(force);
    }

    tick() {
        if (this.force.length === 0) return;
        this.force.forEach((f) => {
            const offset = f.tick();
            this.ctx.object.position[0] += offset[0];
            this.ctx.object.position[1] += offset[1];
        });
        this.force = this.force.filter((f) => !f.needRemove());
    }
}
