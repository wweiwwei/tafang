import { BattleDisplayEvent } from "../../../Display/BattleDisplayEvent";
import { BattleVec } from "../../../Map/BattleVec";
import { BattleBaseFSM } from "./BattleBaseFSM";

/** 移动状态机 */
export class BattleMoveMonsterInfiniteModeFSM extends BattleBaseFSM {
    // 寻路信息缓存
    private pathPlaningInfo: {
        // 技能范围
        skillRange: number;
        // 目标uid
        targetUid: number;
    };
    private direction: { x: number; y: number } = { x: 1, y: 0 };
    startState(): void {
        let skill = this.ctx.object.skillManager.nextLaunchSkill();
        if (!skill) skill = this.ctx.object.skillManager.getNormalAttack();
        const skillRange = skill.getRange();
        let targetObject = skill.getNearestTargetIgnoreRange();
        if (targetObject) {
            const targetUid = targetObject.uid;
            this.pathPlaningInfo = { skillRange, targetUid };
            const animation = GConstant.battle.animationType.run;
            // 设置动画状态
            this.setDirection();
            this.fsmManager.viewModel.changeAnimation(animation);
            this.fsmManager.viewModel.loop = true;
            this.ctx.data.pushDisplayEvent(
                new BattleDisplayEvent("switchAnimation", {
                    obj: this.ctx.object,
                    animation,
                    loop: true,
                })
            );
        } else {
            this.fsmManager.toBaseFSM();
        }
    }
    private setDirection() {
        // 自身位置
        const selfPosition = this.ctx.object.position;
        const target = this.ctx.data.getObjectByUid(this.pathPlaningInfo.targetUid);
        if (!target) {
            // 目标消失，重新索敌
            this.fsmManager.toBaseFSM();
            return;
        }
        const targetPos = target.position;
        const [x, y] = selfPosition;
        this.direction =
            x < -500 || x > 500 ? { x: targetPos[0] - x, y: targetPos[1] - y } : { x: 0, y: targetPos[1] - y };
        const len = Math.sqrt(this.direction.x * this.direction.x + this.direction.y * this.direction.y);
        this.direction.x /= len;
        this.direction.y /= len;
        this.ctx.object.fsmManager.viewModel.direction = {
            x: this.direction.x,
            y: this.direction.y,
        };
    }

    tick(): void {
        // 自身位置
        const selfPosition = this.ctx.object.position;
        const target = this.ctx.data.getObjectByUid(this.pathPlaningInfo.targetUid);
        if (!target) {
            // 目标消失，重新索敌
            this.fsmManager.toBaseFSM();
            return;
        }
        const targetPosition = target.position;
        this.setDirection();
        // 距离，按照y轴距离计算
        const distance = Math.abs(selfPosition[1] - targetPosition[1]);
        if (distance <= this.pathPlaningInfo.skillRange) {
            // console.log("到达了");
            // 到达攻击范围内，移动状态结束
            this.fsmManager.toBaseFSM();
        } else {
            // 未到达，继续移动
            // 一帧的移动量
            let [x, y] = selfPosition;
            const moveDistance = this.ctx.object.propertyManager.tickSpeed;
            x += this.direction.x * moveDistance;
            y += this.direction.y * moveDistance;
            this.ctx.object.position = [x, y];
            // if (this.fsmManager.animationInfo.name !== GConstant.battle.animationType.run) {
            //     this.fsmManager.setAnimationInfo({
            //         name: GConstant.battle.animationType.run,
            //         direction: targetPosition[0] > selfPosition[0] ? 1 : -1,
            //         loop: true,
            //     });
            //     this.ctx.data.pushDisplayEvent(
            //         new BattleDisplayEvent("switchAnimation", {
            //             obj: this.ctx.object,
            //             animation: GConstant.battle.animationType.run,
            //             loop: true,
            //         })
            //     );
            // }
        }
    }

    endState(): void {}
}
