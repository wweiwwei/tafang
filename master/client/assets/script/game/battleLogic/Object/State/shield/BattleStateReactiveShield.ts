import { BattleDamage } from "../../../Entity/BattleDamage";
import { registerState } from "../../../Processor/BattleIoc";
import { BattleBaseState } from "../BattleBaseState";

@registerState("reactiveShield")
export class BattleStateReactiveShield extends BattleBaseState {
    init(): void {}
    addMode: "layer" | "independent" | "last" = "last";
    stateEffectType: "abnormal" | "shield" | "dot" | "special" = "shield";

    start(): void {}

    handleDamage(d: BattleDamage) {
        // todo 触发流程
    }

    end(): void {}
}
