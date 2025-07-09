import { BattleDamage } from "../../../Entity/BattleDamage";
import { registerState } from "../../../Processor/BattleIoc";
import { BattleBaseState } from "../BattleBaseState";

@registerState("lifeShield")
export class BattleStateLifeShield extends BattleBaseState {
    init(): void {}
    addMode: "layer" | "independent" | "last" = "last";
    stateEffectType: "abnormal" | "shield" | "dot" | "special" = "shield";

    maxShield = 0;
    shiledRemain = 0;
    start(): void {
        this.maxShield = this.valueCache;
        this.shiledRemain = this.valueCache;
    }

    handleDamage(d: BattleDamage) {
        if (d.hpHurt < this.shiledRemain) {
            this.shiledRemain -= d.hpHurt;
            d.hpHurt = 0;
        } else {
            this.shiledRemain = 0;
            d.hpHurt -= this.shiledRemain;
            this.finishFunc();
        }
    }

    end(): void {}
}
