import { BattleSkill } from "../../../Skill/BattleSkill";
import { BattleBaseFSM } from "./BattleBaseFSM";
import { BattleSkillFSM } from "./BattleSkillFSM";

/** 塔防模式主角的等待状态机 */
export class BattleTDPlayerWaitFSM extends BattleBaseFSM {
    startState(): void {
        // 设置动画状态
        this.fsmManager.viewModel.changeAnimation("idle");
        this.fsmManager.viewModel.loop = true;
        this.ctx.data.hasAttackOrder = false;
    }
    endState(): void {}
    tick(): void {
        let hasOrder = false;
        if (this.ctx.data.ctx.auto) {
            hasOrder = true;
        } else {
            if (this.ctx.data.hasAttackOrder) {
                hasOrder = true;
                this.ctx.data.hasAttackOrder = false;
            }
        }
        const skill = this.ctx.object.skillManager.nextLaunchSkill();
        if (skill) {
            if (skill.isPosCanLaunch() && hasOrder) {
                // 如果可以释放技能，角色切换到技能状态。
                this.ctx.object.skillManager.setCurrentSkill(skill);
                this.fsmManager.switchState(new BattleSkillFSM(this.ctx, this.fsmManager));
            }
        }
    }
}
