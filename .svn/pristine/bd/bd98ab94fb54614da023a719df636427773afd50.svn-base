import { registerSkillProcess } from "../../Processor/BattleIoc";
import { BattleBaseSkillProcess } from "./BattleBaseSkillProcess";

@registerSkillProcess("base/SkillConditionBranchEnd")
export class BattleSkillConditionBranchEnd extends BattleBaseSkillProcess {
    tick(): void {}
    immediate: boolean = true;
    init(): void {}
    start(): void {}
    prevProcess(): BattleBaseSkillProcess | null {
        const prev = this.nodeConfig.getInput("prev1");
        if (prev) {
            return this.buildProcess(prev);
        } else {
            return null;
        }
    }
}
