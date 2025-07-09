import { registerState } from "../../../Processor/BattleIoc";
import { BattleBaseState } from "../BattleBaseState";

@registerState("sneer")
export class BattleStateSneer extends BattleBaseState {
    init(): void {}
    addMode: "layer" | "independent" | "last" = "last";
    stateEffectType: "abnormal" | "shield" | "dot" | "special" = "abnormal";

    start(): void {}
    end(): void {}
}
