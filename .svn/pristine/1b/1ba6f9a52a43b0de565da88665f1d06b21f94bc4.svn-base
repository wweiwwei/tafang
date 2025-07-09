import { BattleDamage } from "../../../Entity/BattleDamage";
import { registerState } from "../../../Processor/BattleIoc";
import { BattleBaseState } from "../BattleBaseState";

@registerState("burn")
export class BattleStateBurn extends BattleBaseState {
    init(): void {}
    addMode: "layer" | "independent" | "last" = "layer";
    stateEffectType: "abnormal" | "shield" | "dot" | "special" = "dot";

    start(): void {
        this.ctx.data.scheduler.schedule(this.interval, this.effect, this);
    }
    effect() {
        const p = this.ctx.object.propertyManager.finalProperty;
        const d = BattleDamage.createDamage(
            p,
            this.target,
            this.ctx,
            this.valueCache * this.layer,
            this.tag,
            BattleDamage.dotExempt,
            false
        );
        this.target.propertyManager.handleDamage(d);
    }
    end(): void {
        this.ctx.data.scheduler.unschedule(this);
    }
}
