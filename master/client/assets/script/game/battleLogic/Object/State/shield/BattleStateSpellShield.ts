import { BattleDamage } from "../../../Entity/BattleDamage";
import { registerState } from "../../../Processor/BattleIoc";
import { BattleBaseState } from "../BattleBaseState";

@registerState("spellShield")
export class BattleStateSpellShield extends BattleBaseState {
    init(): void {}
    addMode: "layer" | "independent" | "last" = "last";
    stateEffectType: "abnormal" | "shield" | "dot" | "special" = "shield";

    shiledRemain = 0;
    start(): void {
        this.shiledRemain = this.valueCache;
    }

    handleDamage(d: BattleDamage) {
        if (!d.tag.includes("spell")) return;
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
