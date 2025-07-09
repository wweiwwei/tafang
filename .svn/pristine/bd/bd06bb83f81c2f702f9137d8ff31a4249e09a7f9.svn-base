import { BattleBaseFSM } from "./BattleBaseFSM";

/** 技能流程的状态机 */
export class BattleSkillFSM extends BattleBaseFSM {
    tick(): void {
        if (this.ctx.object.skillManager.getCurSkill().tick()) {
            this.fsmManager.toBaseFSM();
        }
    }

    startState(): void {
        if (this.ctx.object.skillManager.getCurSkill().start()) {
            this.fsmManager.toBaseFSM();
        }
    }

    endState(): void {
        this.ctx.object.skillManager.endCurSkill();
    }
}
