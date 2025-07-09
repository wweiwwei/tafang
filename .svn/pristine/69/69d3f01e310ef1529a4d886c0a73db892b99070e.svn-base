import { BattleDamage } from "../../../Entity/BattleDamage";
import { registerState } from "../../../Processor/BattleIoc";
import { BattleBaseState } from "../BattleBaseState";

@registerState("normalAttackShield")
export class BattleStateNormalAttackShield extends BattleBaseState {
    init(): void {}
    addMode: "layer" | "independent" | "last" = "last";
    stateEffectType: "abnormal" | "shield" | "dot" | "special" = "shield";

    shiledRemain = 0;
    start(): void {
        this.shiledRemain = this.valueCache;
    }
    handleDamage(d: BattleDamage) {
        if (!d.tag.includes("normalAttack")) return;
        d.hpHurt = 0;
        this.shiledRemain--;
        if (this.shiledRemain <= 0) {
            this.finishFunc();
        }
    }

    end(): void {}
}
