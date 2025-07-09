import { BattleDamage } from "../../../Entity/BattleDamage";
import { registerState } from "../../../Processor/BattleIoc";
import { BattleBaseState } from "../BattleBaseState";

@registerState("defendShield")
export class BattleStateDefendShield extends BattleBaseState {
    init(): void {}
    addMode: "layer" | "independent" | "last" = "last";
    stateEffectType: "abnormal" | "shield" | "dot" | "special" = "shield";

    start(): void {}

    handleDamage(d: BattleDamage) {
        d.value *= (10000 - this.valueCache) * 0.0001;
    }

    end(): void {}
}
