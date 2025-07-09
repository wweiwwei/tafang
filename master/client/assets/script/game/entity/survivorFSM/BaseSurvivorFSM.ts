import { BattleVec } from "../../battleLogic/Map/BattleVec";
import Survivor from "../Survivor";
import { SurvivorStateType } from "../SurvivorStateInfo";

export abstract class BaseSurvivorFSM {
    /** 上下文 */
    abstract ctx: Survivor;
    /** 状态 */
    abstract state: SurvivorStateType;
    /** 动作 */
    abstract action: string;
    /** 每帧更新 */
    abstract tick(): void;
    /** 获取当前目标建筑id */
    abstract getTargetBuildingId(): number;
    /** 获取气泡状态 */
    abstract getBubbleState(): { state: string; progress: number };

    getDefautBubbleState() {
        if (this.ctx.isSick()) {
            return "sick";
        }
        if (this.ctx.isHungry()) {
            return "hungry";
        }
        if (this.ctx.isFatigue()) {
            return "fatigue";
        }
        return "";
    }

    isReachTargetPoint(p: number[]) {
        return Math.abs(this.ctx.position[0] - p[0]) < 3 && Math.abs(this.ctx.position[1] - p[1]) < 3;
    }

    getRandomReachPoint(facilityId: number): number[] {
        const info = GModel.facility.getPositionInfo(facilityId);
        const rect = info.rect;
        const width = rect.width;
        const pos = info.pos;
        const res = [pos[0] + (Math.random() - 0.5) * GConfig.survivorTick.reachRange * width, pos[1]];
        return res;
    }

    getFixReachPoint(facilityId: number): number[] {
        const info = GModel.facility.getPositionInfo(facilityId);
        const rect = info.rect;
        const width = rect.width;
        const pos = info.pos;
        const res = [pos[0], pos[1]];
        return res;
    }

    /** 移动，返回是否到达 */
    moveTo(p: number[], speed: number): boolean {
        const pos = p;
        const direction = BattleVec.normalize(BattleVec.sub(pos, this.ctx.position));
        if (direction[0] > 0) {
            this.ctx.direction = "right";
        } else if (direction[0] < 0) {
            this.ctx.direction = "left";
        }
        const distance = BattleVec.distance(pos, this.ctx.position);
        if (distance <= speed) {
            this.ctx.position = pos.map((v) => v);
            return true;
        } else {
            this.ctx.position = BattleVec.add(this.ctx.position, BattleVec.mul(direction, speed));
            return false;
        }
    }

    /** 顺着路走，优先级最高 */
    alongPath(speed: number) {
        // console.log("alongPath", this.info.uniqueId);
        if (this.ctx.pathInfo.currentIndex === 0) {
            this.ctx.show = true;
        } else {
            this.ctx.show = this.ctx.pathInfo.tunnelType === 1;
        }
        const p = this.ctx.pathInfo.pathPoint[this.ctx.pathInfo.currentIndex];
        const isReached = this.moveTo(p, speed);
        if (isReached) {
            this.ctx.pathInfo.currentIndex++;
            if (this.ctx.pathInfo.currentIndex >= this.ctx.pathInfo.pathPoint.length) {
                this.ctx.area = this.ctx.pathInfo.nextArea;
                this.ctx.pathInfo = null;
                this.ctx.show = true;
            }
        }
    }

    /** 移动到特定建筑 */
    moveToBuilding(facilityId: number, reachPoint: number[], isRun: boolean) {
        this.ctx.animation = isRun ? "run" : "walk";
        const speed = isRun ? GConfig.survivorTick.speedRun : GConfig.survivorTick.speedMove;
        if (this.ctx.pathInfo) {
            this.alongPath(speed);
            return;
        }
        const tbl = GTable.getById("FacilityTbl", facilityId);
        const posTbl = GTable.getById("FacilityPositionTbl", tbl.posId);
        const targetArea = posTbl.area;
        if (targetArea !== this.ctx.area) {
            // 跨区域移动
            if (!this.ctx.pathInfo) {
                const nextArea = GIndex.scene.nextArea(this.ctx.area, targetArea);
                this.ctx.pathInfo = { ...nextArea, currentIndex: 0 };
            }
            this.alongPath(speed);
        } else {
            // 本区域移动
            this.moveTo(reachPoint, speed);
        }
    }

    /** 随机目标建筑id */
    randomTargetBuildingId() {
        const fList = GModel.facility.getAllFacility().filter((f) => f.unlock);
        const f = fList[Math.floor(Math.random() * fList.length)];
        return f.id;
    }

    /** 建筑内移动 */
    moveInsideBuilding(facilityId: number) {
        this.ctx.animation = "idle";
    }
}
