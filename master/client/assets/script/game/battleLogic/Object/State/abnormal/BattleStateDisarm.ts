import { registerState } from "../../../Processor/BattleIoc";
import { BattleBaseState } from "../BattleBaseState";

@registerState("disarm")
export class BattleStateDisarm extends BattleBaseState {
    init(): void {}
    addMode: "layer" | "independent" | "last" = "last";
    stateEffectType: "abnormal" | "shield" | "dot" | "special" = "abnormal";

    start(): void {}
    end(): void {}
}
