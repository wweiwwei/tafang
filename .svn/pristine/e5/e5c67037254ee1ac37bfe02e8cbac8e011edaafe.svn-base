import { registerSkillProcess } from "../../Processor/BattleIoc";
import { BattleBaseSkillProcess } from "./BattleBaseSkillProcess";

@registerSkillProcess("base/SkillLoop")
export class BattleSkillLoop extends BattleBaseSkillProcess {
    immediate: boolean = true;
    tick(): void {}
    init(): void {}
    start(): void {
        this.ctx.skill.addLoopCount(this.nodeId);
    }

    nextProcess(): BattleBaseSkillProcess | null {
        const count = this.nodeConfig.getProperties("count");
        const hasLoop = this.ctx.skill.getLoopCount(this.nodeId);
        // console.log("hasLoop", hasLoop, count);
        if (hasLoop > count) {
            return super.nextProcess();
        } else {
            const loop = this.nodeConfig.getInput("loop");
            let p = this.buildProcess(loop);
            while (p.prevProcess()) {
                p = p.prevProcess();
            }
            return p;
        }
    }
}
