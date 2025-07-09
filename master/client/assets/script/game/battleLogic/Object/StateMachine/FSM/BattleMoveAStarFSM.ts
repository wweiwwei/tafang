import { BattleDisplayEvent } from "../../../Display/BattleDisplayEvent";
import { BattleVec } from "../../../Map/BattleVec";
import { BattleUtils } from "../../../Utils/BattleUtils";
import { BattleBaseFSM } from "./BattleBaseFSM";

/** 移动状态机 */
export class BattleMoveAStarFSM extends BattleBaseFSM {
    // // 寻路信息缓存
    // private pathPlaningInfo: {
    //     // 技能范围
    //     skillRange: number;
    //     // 目标uid
    //     targetUid: number;
    // };
    private aStarCache: { x: number; y: number }[];
    private currentAstarIndex = 0;
    private direction: { x: number; y: number } = { x: 1, y: 0 };
    private targetUid: number = -1;
    private skillRange = 0;

    private targetPosGridCache: { x: number; y: number };
    startState(): void {
        let skill = this.ctx.object.skillManager.nextLaunchSkill();
        if (!skill) skill = this.ctx.object.skillManager.getNormalAttack();
        this.skillRange = skill.getRange();
        let targetObject = skill.getNearestTargetIgnoreRange();
        // 没有目标
        if (!targetObject) this.fsmManager.toBaseFSM();
        this.targetUid = targetObject.uid;
        // 自身位置
        const selfPosition = this.ctx.object.position;
        // 目标位置
        const targetPosition = this.ctx.data.getObjectByUid(this.targetUid).position;
        const animation = GConstant.battle.animationType.run;
        this.ctx.object.fsmManager.viewModel.changeAnimation(animation);
        this.findPath(selfPosition, targetPosition);
        // 设置动画状态
        this.fsmManager.viewModel.changeAnimation("run");
        this.fsmManager.viewModel.loop = true;
    }

    private findPath(selfPosition: number[], targetPosition: number[]) {
        const blockBeginPos = BattleUtils.map.gamePosToGridPos(
            { x: selfPosition[0], y: selfPosition[1] },
            this.ctx.data.mapInfo.gridSize,
            this.ctx.data.mapInfo.gridCount
        );
        const blockTargetPos = BattleUtils.map.gamePosToGridPos(
            { x: targetPosition[0], y: targetPosition[1] },
            this.ctx.data.mapInfo.gridSize,
            this.ctx.data.mapInfo.gridCount
        );
        const beginFinal = { x: Math.round(blockBeginPos.x), y: Math.round(blockBeginPos.y) };
        const targetFinal = { x: Math.round(blockTargetPos.x), y: Math.round(blockTargetPos.y) };
        this.targetPosGridCache = targetFinal;
        this.aStarCache = BattleUtils.getAStarPath(this.ctx.data.mapInfo.roadData, beginFinal, targetFinal).map((p) =>
            BattleUtils.map.gridPosToGamePos(p, this.ctx.data.mapInfo.gridSize, this.ctx.data.mapInfo.gridCount)
        );
        this.currentAstarIndex = 0;
        this.setDirection();
    }

    private setDirection() {
        const pathNode = this.aStarCache[this.currentAstarIndex];
        if (!pathNode) return;
        const selfPosition = this.ctx.object.position;
        const [x, y] = selfPosition;
        this.direction = { x: pathNode.x - x, y: pathNode.y - y };
        const len = Math.sqrt(this.direction.x * this.direction.x + this.direction.y * this.direction.y);
        this.direction.x /= len;
        this.direction.y /= len;
        this.ctx.object.fsmManager.viewModel.direction = {
            x: this.direction.x,
            y: this.direction.y,
        };
    }

    private moveTick(selfPosition: number[], targetPosition: number[]) {
        const blockTargetPos = BattleUtils.map.gamePosToGridPos(
            { x: targetPosition[0], y: targetPosition[1] },
            this.ctx.data.mapInfo.gridSize,
            this.ctx.data.mapInfo.gridCount
        );
        const targetFinal = { x: Math.round(blockTargetPos.x), y: Math.round(blockTargetPos.y) };
        if (targetFinal.x !== this.targetPosGridCache.x || targetFinal.y !== this.targetPosGridCache.y) {
            // 敌方位置变化重新寻路
            this.findPath(selfPosition, targetPosition);
        }
        if (this.currentAstarIndex > this.aStarCache.length - 1) {
            // 到达
            return;
        }
        let [x, y] = selfPosition;
        const pathNode = this.aStarCache[this.currentAstarIndex];
        const moveDistance = this.ctx.object.propertyManager.tickSpeed;
        x += this.direction.x * moveDistance;
        y += this.direction.y * moveDistance;
        const distance = { x: x - pathNode.x, y: y - pathNode.y };
        if (distance.x * distance.x + distance.y * distance.y < 100) {
            this.currentAstarIndex++;
            this.setDirection();
        }
        this.ctx.object.position = [x, y];
    }

    tick(): void {
        // 自身位置
        const selfPosition = this.ctx.object.position;
        const target = this.ctx.data.getObjectByUid(this.targetUid);
        if (!target) {
            // 目标消失，重新索敌
            this.fsmManager.toBaseFSM();
            return;
        }
        // 目标位置
        const targetPosition = target.position;
        // 距离
        const distance = BattleVec.distance(selfPosition, targetPosition);
        if (distance <= this.skillRange) {
            // 到达攻击范围内，移动状态结束
            this.fsmManager.toBaseFSM();
        } else {
            this.moveTick(selfPosition, targetPosition);
        }
    }

    endState(): void {}
}
