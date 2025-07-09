import { BattleBaseFSM } from "./BattleBaseFSM";
import { BattleSkillFSM } from "./BattleSkillFSM";
import { BattleTDMonsterMoveFSM } from "./BattleTDMonsterMoveFSM";

/** 塔防模式怪物的等待状态机 */
export class BattleTDMonsterWaitFSM extends BattleBaseFSM {
    endState(): void {}
    tick(): void {
        if (this.ctx.object.position[1] > GConstant.battle.monsterReachPoint) {
            this.fsmManager.switchState(new BattleTDMonsterMoveFSM(this.ctx, this.fsmManager));
        } else {
            const skill = this.ctx.object.skillManager.nextLaunchSkill();
            if (skill) {
                this.ctx.object.skillManager.setCurrentSkill(skill);
                this.fsmManager.switchState(new BattleSkillFSM(this.ctx, this.fsmManager));
            }
        }
    }
    startState(): void {
        // 设置动画状态
        this.fsmManager.viewModel.changeAnimation("idle");
        this.fsmManager.viewModel.loop = true;
    }
}
