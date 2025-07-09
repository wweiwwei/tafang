import { BattleEnergyReduce } from "../../../Entity/BattleEnergyReduce";
import { registerState } from "../../../Processor/BattleIoc";
import { BattleBaseState } from "../BattleBaseState";

@registerState("energyLeak")
export class BattleStateEnergyLeak extends BattleBaseState {
    init(): void {}
    addMode: "layer" | "independent" | "last" = "last";
    stateEffectType: "abnormal" | "shield" | "dot" | "special" = "dot";

    start(): void {
        this.ctx.data.scheduler.schedule(this.interval, this.effect, this);
    }
    effect() {
        const p = this.ctx.object.propertyManager.finalProperty;
        const h = BattleEnergyReduce.createEnergyReduce(this.ctx.object, this.target, this.valueCache * this.layer, p);
        this.target.propertyManager.handleEnergyReduce(h);
    }
    end(): void {
        this.ctx.data.scheduler.unschedule(this);
    }
}
