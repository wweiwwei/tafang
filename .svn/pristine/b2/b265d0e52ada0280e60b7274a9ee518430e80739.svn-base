import { registerSkillProcess } from "../../Processor/BattleIoc";
import { BattleBaseSkillProcess } from "./BattleBaseSkillProcess";

@registerSkillProcess("base/SkillConditionBranch")
export class BattleSkillConditionBranch extends BattleBaseSkillProcess {
    tick(): void {}
    immediate: boolean = true;
    init(): void {}
    start(): void {}
    nextProcess(): BattleBaseSkillProcess | null {
        const condition = this.nodeConfig.getProperties("condition");
        const ok = this.ctx.skill.evalCondition(condition, "final");
        if (ok) {
            const next = this.nodeConfig.getOutput("ok");
            if (next.length === 0) return null;
            return this.buildProcess(next[0]);
        } else {
            const next = this.nodeConfig.getOutput("fail");
            if (next.length === 0) return null;
            return this.buildProcess(next[0]);
        }
    }
}
