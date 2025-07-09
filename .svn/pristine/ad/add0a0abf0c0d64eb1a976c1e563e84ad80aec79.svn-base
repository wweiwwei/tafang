import { autowired, registerClass } from "../../../framework/Decorator";
import { GameDate } from "../../../framework/date/GameDate";
import UIListItem from "../../../framework/ui/UIListItem";
import UISpine from "../../../framework/ui/UISpine";
import { BattleVec } from "../../battleLogic/Map/BattleVec";
const { ccclass, property } = cc._decorator;

@registerClass("ListItemSceneHero")
@ccclass
export default class ListItemSceneHero extends UIListItem {
    static _poolSize: number = 1;
    @autowired(UISpine) roleAnimation: UISpine = null;

    state: {
        uniqueId: number;
    };

    setState(state: this["state"]): void {
        this.state = state;
        const hero = GModel.hero.getHeroByUniqueId(this.state.uniqueId);
        this.roleAnimation.setSpine(hero.getImg(), "default", "idle");
        this.hero = new SceneHero(this.state.uniqueId);
        const tbl = GTable.getList("SpineInfoTbl").find((t) => t.spine === hero.getImg());
        this.setScale(tbl.sceneScale);
        this.setPosition(0, 0);
        this.syncState();
    }

    setScale(scale: number) {
        this.roleAnimation.node.scale = scale;
    }

    setPosition(x: number, y: number) {
        this.roleAnimation.node.setPosition(x, y);
    }

    hero: SceneHero;

    tick() {
        this.hero.tick();
        this.syncState();
    }

    syncState() {
        this.node.setPosition(this.hero.position[0], this.hero.position[1]);
        this.hero.animation === "walk" ? this.playWalk() : this.playIdle();
        this.hero.direction === "left" ? this.turnLeft() : this.turnRight();
        this.node.active = this.hero.show;
    }

    onInjected() {
        this.playIdle();
    }

    playIdle() {
        if (this.roleAnimation.animation === "idle") {
            return;
        }
        this.roleAnimation.changeAnimation("idle", true);
    }

    playWalk() {
        if (this.roleAnimation.animation === "walk") {
            return;
        }
        this.roleAnimation.changeAnimation("walk", true);
    }

    turnLeft() {
        if (this.roleAnimation.node.scaleX > 0) {
            this.roleAnimation.node.scaleX = -this.roleAnimation.node.scaleX;
        }
    }

    turnRight() {
        if (this.roleAnimation.node.scaleX < 0) {
            this.roleAnimation.node.scaleX = -this.roleAnimation.node.scaleX;
        }
    }
}

class SceneHero {
    action: "next" | "move" | "ramble" = "next";
    rambleId = -1;
    leftStamp = 0;
    /** 随机到达点 */
    targetPoint: number[] = null;
    /** 路径信息 */
    pathInfo: {
        nextArea: number;
        pathPoint: number[][];
        tunnelType: number;
        currentIndex: number;
    } = null;

    /** 生存者动画 */
    animation: "idle" | "walk" = "idle";
    /** 生存者朝向 */
    direction: "left" | "right" = "right";
    /** 生存者位置 */
    position: number[];
    /** 生存者所在区域 */
    area: number;
    /** 是否显示 */
    show: boolean = true;

    constructor(unqiueId: number) {
        const f = GModel.facility.getAllFacility().find((f) => f.hero === unqiueId);
        const pos = GModel.facility.getPositionInfo(f.id).pos;
        const posTbl = GTable.getById("FacilityPositionTbl", f.getTbl().posId);
        this.position = [pos[0], pos[1]];
        this.area = posTbl.area;
    }
    getRandomReachPoint(facilityId: number): number[] {
        const info = GModel.facility.getPositionInfo(facilityId);
        const rect = info.rect;
        const width = rect.width;
        const pos = info.pos;
        const res = [pos[0] + (Math.random() - 0.5) * GConfig.survivorTick.reachRange * width, pos[1]];
        return res;
    }

    /** 随机目标建筑id */
    randomTargetBuildingId() {
        const fList = GModel.facility.getAllFacility().filter((f) => f.unlock);
        const f = fList[Math.floor(Math.random() * fList.length)];
        return f.id;
    }

    /** 移动到特定建筑 */
    moveToBuilding(facilityId: number, reachPoint: number[]) {
        if (this.pathInfo) {
            this.alongPath();
            return;
        }
        const tbl = GTable.getById("FacilityTbl", facilityId);
        const posTbl = GTable.getById("FacilityPositionTbl", tbl.posId);
        const targetArea = posTbl.area;
        if (targetArea !== this.area) {
            // 跨区域移动
            if (!this.pathInfo) {
                const nextArea = GIndex.scene.nextArea(this.area, targetArea);
                this.pathInfo = { ...nextArea, currentIndex: 0 };
            }
            this.alongPath();
        } else {
            // 本区域移动
            this.moveTo(reachPoint, GConfig.survivorTick.speedMove);
        }
    }

    isReachTargetPoint(p: number[]) {
        return Math.abs(this.position[0] - p[0]) < 3 && Math.abs(this.position[1] - p[1]) < 3;
    }

    tick() {
        if (this.action === "next") {
            this.rambleId = this.randomTargetBuildingId();
            this.targetPoint = this.getRandomReachPoint(this.rambleId);
            this.action = "move";
        } else if (this.action === "move") {
            const id = this.rambleId;
            this.moveToBuilding(id, this.targetPoint);
            if (this.isReachTargetPoint(this.targetPoint)) {
                const now = GameDate.nowUpdated();
                this.action = "ramble";
                const [minTime, maxTime] = GConfig.survivorTick.idleStayTime;
                this.leftStamp = Math.round(now + Math.random() * (maxTime - minTime) + minTime);
            }
        } else if (this.action === "ramble") {
            const now = GameDate.nowUpdated();
            const id = this.rambleId;
            this.moveInsideBuilding(id);
            if (now > this.leftStamp) {
                this.action = "next";
            }
        }
    }

    /** 移动，返回是否到达 */
    moveTo(p: number[], speed: number): boolean {
        const pos = p;
        const direction = BattleVec.normalize(BattleVec.sub(pos, this.position));
        if (direction[0] > 0) {
            this.direction = "right";
        } else if (direction[0] < 0) {
            this.direction = "left";
        }
        this.animation = "walk";
        const distance = BattleVec.distance(pos, this.position);
        if (distance <= speed) {
            this.position = pos.map((v) => v);
            return true;
        } else {
            this.position = BattleVec.add(this.position, BattleVec.mul(direction, speed));
            return false;
        }
    }

    /** 顺着路走，优先级最高 */
    alongPath() {
        // console.log("alongPath", this.info.uniqueId);
        if (this.pathInfo.currentIndex === 0) {
            this.show = true;
        } else {
            this.show = this.pathInfo.tunnelType === 1;
        }
        const p = this.pathInfo.pathPoint[this.pathInfo.currentIndex];
        const isReached = this.moveTo(p, GConfig.survivorTick.speedMove);
        if (isReached) {
            this.pathInfo.currentIndex++;
            if (this.pathInfo.currentIndex >= this.pathInfo.pathPoint.length) {
                this.area = this.pathInfo.nextArea;
                this.pathInfo = null;
                this.show = true;
            }
        }
    }

    /** 建筑内移动 */
    moveInsideBuilding(facilityId: number) {
        this.animation = "idle";
    }
}
