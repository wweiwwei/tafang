import { BattleSkill } from "../../../Skill/BattleSkill";
import { BattleBaseFSM } from "./BattleBaseFSM";
import { BattleSkillFSM } from "./BattleSkillFSM";

/** 塔防模式防御塔的等待状态机 */
export class BattleTDTowerWaitFSM extends BattleBaseFSM {
    startState(): void {
        // 设置动画状态
        this.fsmManager.viewModel.changeAnimation("idle");
        this.fsmManager.viewModel.loop = true;
    }
    endState(): void {}
    tick(): void {
        this.checkNext();
    }
    checkNext() {
        const skill = this.ctx.object.skillManager.nextLaunchAndReachableSkill();
        if (skill) {
            this.checkSkill(skill);
        }
    }
    checkSkill(skill: BattleSkill) {
        if (skill.isPosCanLaunch()) {
            // 如果可以释放技能，角色切换到技能状态。
            this.ctx.object.skillManager.setCurrentSkill(skill);
            this.fsmManager.switchState(new BattleSkillFSM(this.ctx, this.fsmManager));
        }
    }
}
