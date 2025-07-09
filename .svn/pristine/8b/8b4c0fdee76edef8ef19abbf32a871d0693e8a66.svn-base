import { registerSkillProcess } from "../../Processor/BattleIoc";
import { BattleSkillTimer } from "../Duration/BattleSkillTimer";
import { BattleBaseSkillProcess } from "./BattleBaseSkillProcess";

@registerSkillProcess("base/SkillBackswing")
export class BattleSkillBackswing extends BattleBaseSkillProcess {
    immediate: boolean;
    start(): void {}
    // timer: BattleSkillTimer;

    init(): void {
        // const tbl = this.nodeConfig.graph.tbl;
        // console.log(`${this.ctx.object.uid}后摇`);
        // const img = this.ctx.object.getImg();
        // const animation = this.nodeConfig.getProperties("animation");
        // const spineTbl = GTable.getList("SpineAttackAnimationInfoTbl").find(
        //     (t) => t.spine === img && t.animation === animation
        // );
        // const frame =
        //     this.skillCategory === "main"
        //         ? spineTbl.total - spineTbl.keyFrame[spineTbl.keyFrame.length - 1] - 30
        //         : spineTbl.total - spineTbl.keyFrame[spineTbl.keyFrame.length - 1];
        // const duration = (frame * 1000) / spineTbl.animationSpeed / 30 - 1;
        // if (duration === 0) {
        //     this.immediate = true;
        // } else {
        //     this.immediate = false;
        //     this.timer = new BattleSkillTimer(duration);
        // }
        this.immediate = this.ctx.skill.skillTimer.isEnd();
    }

    tick(): void {
        // if (this.skillCategory === "normalAttack") {
        //     const s = this.ctx.object.propertyManager.finalProperty.normalAttackSpeed * 0.0001;
        //     if (this.timer) this.timer.tick(s);
        //     // console.log(this.ctx.object.uid, "普攻后摇中,进度：", this.timer.getProgress());
        // } else {
        //     if (this.timer) this.timer.tick(1);
        // }
    }

    isEnd(): boolean {
        if (this.immediate) return true;
        return this.ctx.skill.skillTimer.isEnd();
    }
}
