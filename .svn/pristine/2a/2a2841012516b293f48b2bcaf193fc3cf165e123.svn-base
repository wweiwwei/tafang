import { registerState } from "../../../Processor/BattleIoc";
import { BattleBaseState } from "../BattleBaseState";

@registerState("repulse")
export class BattleStateRepulse extends BattleBaseState {
    init(): void {}
    addMode: "layer" | "independent" | "last" = "last";
    stateEffectType: "abnormal" | "shield" | "dot" | "special" = "abnormal";

    private direction = 1;
    start(): void {
        const originPos = this.ctx.object.position;
        const targetPos = this.target.position;
        this.direction = targetPos[0] > originPos[0] ? 1 : -1;
        this.ctx.data.scheduler.on(this);
    }
    end(): void {
        this.ctx.data.scheduler.off(this);
    }

    tick() {
        const distance = this.valueCache / 60;
        this.target.position[0] += distance * this.direction;
    }
}
