import { BattleDamage } from "../../../Entity/BattleDamage";
import { registerState } from "../../../Processor/BattleIoc";
import { BattleBaseState } from "../BattleBaseState";

@registerState("poison")
export class BattleStatePoison extends BattleBaseState {
    init(): void {}
    private nextEffect: number = 0;
    addMode: "layer" | "independent" | "last" = "layer";
    stateEffectType: "abnormal" | "shield" | "dot" | "special" = "dot";

    start(): void {
        this.nextEffect = this.ctx.data.frame + 60;
    }
    effect() {
        const p = this.ctx.object.propertyManager.finalProperty;
        const d = BattleDamage.createDamage(
            p,
            this.target,
            this.ctx,
            this.valueCache * this.layer,
            ["poison", "skill3"],
            BattleDamage.dotExempt,
            false
        );
        this.target.propertyManager.handleDamage(d);
    }

    end(): void {}
    tick(): void {
        if (this.ctx.data.frame >= this.nextEffect) {
            this.nextEffect += 60;
            this.effect();
        }
    }
}
