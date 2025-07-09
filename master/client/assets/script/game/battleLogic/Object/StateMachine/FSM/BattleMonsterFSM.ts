import { BattleDisplayEvent } from "../../../Display/BattleDisplayEvent";
import { BattleSkill } from "../../../Skill/BattleSkill";
import { BattleBaseFSM } from "./BattleBaseFSM";
import { BattleMoveFSM } from "./BattleMoveFSM";
import { BattleSkillFSM } from "./BattleSkillFSM";

/** 塔防模式怪物的走路状态机 */
export class BattleMonsterFSM extends BattleBaseFSM {
    endState(): void {}
    startState(): void {
        // 设置动画状态
        this.fsmManager.viewModel.changeAnimation(GConstant.battle.animationType.run);
        this.fsmManager.viewModel.loop = true;
        this.mapProgress = this.ctx.data.mapInfo.getInitProgress();
    }

    private mapProgress: number;

    tick(): void {
        const len = this.ctx.data.mapInfo.getMapLength();
        const speed = this.ctx.object.propertyManager.finalProperty.moveSpeed;
        const tickSpeed = speed / (len * GConstant.battle.logicTickRate);
        this.mapProgress += tickSpeed;
        const { pos, direction } = this.ctx.data.mapInfo.getPointByMapPos(this.mapProgress);
        this.ctx.object.fsmManager.viewModel.direction = direction;
        this.ctx.object.position = [pos.x, pos.y];
    }
}
