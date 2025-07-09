import { BattleDisplayEvent } from "../../Display/BattleDisplayEvent";
import { registerSkillProcess } from "../../Processor/BattleIoc";
import { BattleSkillTimer } from "../Duration/BattleSkillTimer";
import { BattleBaseSkillProcess } from "./BattleBaseSkillProcess";

@registerSkillProcess("base/SkillForeswing")
export class BattleSkillForeswing extends BattleBaseSkillProcess {
    immediate: boolean;

    timer: BattleSkillTimer;

    init(): void {
        // const tbl = this.nodeConfig.graph.tbl;
        // console.log(`${this.ctx.object.uid}前摇`);
        // const img = this.ctx.object.getImg();
        const animation = this.nodeConfig.getProperties("animation");
        // // todo 调整动画速度
        // this.ctx.object.fsmManager.animationInfo.name = animation;
        this.ctx.data.pushDisplayEvent(
            new BattleDisplayEvent("switchAnimation", { obj: this.ctx.object, animation, loop: true })
        );
        // 设置动画状态
        this.ctx.object.fsmManager.setAnimationInfo({
            name: animation,
            loop: true,
        });
        // const spineTbl = GTable.getList("SpineAttackAnimationInfoTbl").find(
        //     (t) => t.spine === img && t.animation === animation
        // );
        // const frame = this.skillCategory === "main" ? spineTbl.keyFrame[0] - 30 : spineTbl.keyFrame[0];
        // const duration = (frame * 1000) / spineTbl.animationSpeed / 30 - 1;
        // if (duration === 0) {
        //     this.immediate = true;
        // } else {
        //     this.immediate = false;
        //     this.timer = new BattleSkillTimer(duration);
        // }
        this.immediate = this.ctx.skill.spineTbl.keyFrame[0] === 0;
    }
    start(): void {
        if (this.skillCategory === "main") {
            this.ctx.data.pushDisplayEvent(new BattleDisplayEvent("showMainSkill", { obj: this.ctx.object }));
        }
    }
    /** 执行一帧 */
    tick(): void {
        // if (this.skillCategory === "normalAttack") {
        //     const s = this.ctx.object.propertyManager.finalProperty.normalAttackSpeed * 0.0001;
        //     if (this.timer) this.timer.tick(s);
        //     // console.log(this.timer);
        //     // console.log(this.ctx.object.uid, "普攻前摇中,进度：", this.timer.getProgress());
        // } else {
        //     if (this.timer) this.timer.tick(1);
        // }
    }

    isEnd(): boolean {
        if (this.immediate) return true;
        const skill = this.ctx.skill;
        return (
            skill.skillTimer.framePass >=
            (this.skillCategory === "main" ? skill.spineTbl.keyFrame[0] * 2 - 60 : skill.spineTbl.keyFrame[0] * 2)
        );
    }
}
