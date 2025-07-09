import { registerSkillProcess } from "../../Processor/BattleIoc";
import { BattleBaseSkillProcess } from "./BattleBaseSkillProcess";

@registerSkillProcess("base/SkillKeyFrameLoop")
export class BattleSkillKeyFrameLoop extends BattleBaseSkillProcess {
    immediate: boolean;
    tick(): void {}
    init(): void {
        const spineTbl = this.ctx.skill.spineTbl;
        const frame = spineTbl.keyFrame[this.ctx.skill.getLoopCount(this.nodeId)];
        if (frame) {
            if (this.ctx.skill.skillTimer.framePass >= frame * 2) {
                this.immediate = true;
            } else {
                this.immediate = false;
            }
        } else {
            this.immediate = true;
        }
    }
    start(): void {
        this.ctx.skill.addLoopCount(this.nodeId);
    }

    nextProcess(): BattleBaseSkillProcess | null {
        const count = this.ctx.skill.spineTbl.keyFrame.length;
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

    isEnd(): boolean {
        if (this.immediate) return true;
        const skill = this.ctx.skill;
        let frame = skill.spineTbl.keyFrame[skill.getLoopCount(this.nodeId) - 1];
        if (!frame) return true;
        frame = this.skillCategory === "main" ? frame * 2 - 60 : frame * 2;
        return skill.skillTimer.framePass >= frame;
    }
}
