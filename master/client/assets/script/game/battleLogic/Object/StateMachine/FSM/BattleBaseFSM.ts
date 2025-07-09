import { BattleBattleStageContext } from "../../../Processor/BattleBattleStageContext";
import { BattleFSMManager } from "../BattleFSMManager";

export abstract class BattleBaseFSM {
    constructor(public ctx: BattleBattleStageContext, public fsmManager: BattleFSMManager) {}

    abstract startState(): void;

    abstract endState(): void;

    abstract tick(): void;
}
