import { BattleDamage } from "../../../Entity/BattleDamage";
import { registerState } from "../../../Processor/BattleIoc";
import { BattleBaseState } from "../BattleBaseState";

@registerState("multiLayerDefendShield")
export class BattleStateMultiLayerDefendShield extends BattleBaseState {
    init(): void {}
    addMode: "layer" | "independent" | "last" = "last";
    stateEffectType: "abnormal" | "shield" | "dot" | "special" = "shield";

    shiledRemain = 0;
    start(): void {
        this.shiledRemain = this.maxLayer;
    }
    handleDamage(d: BattleDamage) {
        d.value *= (10000 - this.valueCache * this.layer) * 0.0001;
        this.shiledRemain--;
        if (this.shiledRemain <= 0) {
            this.finishFunc();
        }
    }

    end(): void {}
}
