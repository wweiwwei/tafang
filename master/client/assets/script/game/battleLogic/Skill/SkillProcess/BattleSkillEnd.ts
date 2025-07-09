import { registerSkillProcess } from "../../Processor/BattleIoc";
import { BattleBaseSkillProcess } from "./BattleBaseSkillProcess";

@registerSkillProcess("base/SkillEnd")
export class BattleSkillEnd extends BattleBaseSkillProcess {
    tick(): void {}
    immediate: boolean = true;
    init(): void {}
    start(): void {
        this.ctx.skill.targetSelectManager.clearTarget();
        this.ctx.data.eventBus.emit({ eventType: "skillEnd", target: this.ctx.object.uid, tag: [], data: {} });
    }

    /** 下一流程 */
    nextProcess(): BattleBaseSkillProcess | null {
        return null;
    }
}
