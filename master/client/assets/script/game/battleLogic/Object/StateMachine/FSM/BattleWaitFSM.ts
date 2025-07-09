import { BattleDisplayEvent } from "../../../Display/BattleDisplayEvent";
import { BattleSkill } from "../../../Skill/BattleSkill";
import { BattleBaseFSM } from "./BattleBaseFSM";
import { BattleMoveFSM } from "./BattleMoveFSM";
import { BattleSkillFSM } from "./BattleSkillFSM";

/** 等待的状态机，最基础的状态 */
export class BattleWaitFSM extends BattleBaseFSM {
    endState(): void {}
    tick(): void {
        this.checkNext();
    }
    startState(): void {
        // 设置动画状态
        this.fsmManager.viewModel.changeAnimation("idle");
        this.fsmManager.viewModel.loop = true;
        this.checkNext();
    }

    checkNext() {
        const skill = this.ctx.object.skillManager.nextLaunchSkill();
        if (skill) {
            this.checkSkill(skill);
        } else {
            this.checkNormalAttack();
        }
    }

    checkSkill(skill: BattleSkill) {
        // 没有任何目标，转到普攻逻辑
        if (skill.searchTargetIgnoreRange().length === 0) {
            this.checkNormalAttack();
            return;
        }
        if (skill.isPosCanLaunch()) {
            // 如果可以释放技能，角色切换到技能状态。
            this.ctx.object.skillManager.setCurrentSkill(skill);
            this.fsmManager.switchState(new BattleSkillFSM(this.ctx, this.fsmManager));
        } else {
            // 如果可以释放技能，但不在技能范围内，则角色向目标移动，直到进入技能释放范围。
            this.move();
        }
    }

    checkNormalAttack() {
        if (this.ctx.object.skillManager.getNormalAttack().searchTargetIgnoreRange().length === 0) {
            return;
        } else {
            const normalAttack = this.ctx.object.skillManager.getNormalAttack();
            if (normalAttack.isPosCanLaunch()) {
                // 如果不能释放技能，普攻目标在普攻攻击范围内，角色会停留在等待状态。
            } else {
                // 如果不能释放技能，且普攻目标在普攻攻击范围外，角色会向普攻目标移动。
                this.move();
            }
        }
    }

    move() {
        // 车上角色和空军都不能移动
        // if (this.ctx.object.heroIndex > 1) return;
        this.fsmManager.switchState(new BattleMoveFSM(this.ctx, this.fsmManager));
        // const abState = this.ctx.object.stateManager.getAbnormalState();
        // if (abState.includes("stupor")) {
        //     // 眩晕
        //     this.fsmManager.switchState(new BattleWaitStuporChildFSM(this.ctx, this.fsmManager, this.parent));
        // } else if (abState.includes("fear")) {
        //     // 恐惧
        //     this.fsmManager.switchState(new BattleWaitFearChildFSM(this.ctx, this.fsmManager, this.parent));
        // } else {
        //     // 向目标前进
        //     this.fsmManager.switchState(new BattleWaitMoveChildFSM(this.ctx, this.fsmManager, this.parent));
        // }
    }
}
