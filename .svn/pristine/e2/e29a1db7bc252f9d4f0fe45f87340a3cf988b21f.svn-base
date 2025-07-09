import { registerSkillProcess } from "../../Processor/BattleIoc";
import { BattleBaseSkillProcess } from "./BattleBaseSkillProcess";

@registerSkillProcess("base/SkillKeyFrameMatch")
export class BattleSkillKeyFrameMatch extends BattleBaseSkillProcess {
    immediate: boolean;
    tick(): void {}
    init(): void {
        const spineTbl = this.ctx.skill.spineTbl;
        const index = Number(this.nodeConfig.getProperties("index"));
        const frame = spineTbl.keyFrame[index];
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
    start(): void {}

    isEnd(): boolean {
        if (this.immediate) return true;
        const skill = this.ctx.skill;
        const index = Number(this.nodeConfig.getProperties("index"));
        let frame = skill.spineTbl.keyFrame[index];
        if (!frame) return true;
        frame = this.skillCategory === "main" ? frame * 2 - 60 : frame * 2;
        return skill.skillTimer.framePass >= frame;
    }
}
