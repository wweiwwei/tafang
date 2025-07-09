import SurvivorStateInfo, { SurvivorStateType } from "./SurvivorStateInfo";
import { BaseSurvivorFSM } from "./survivorFSM/BaseSurvivorFSM";
import { SurvivorDeadFSM } from "./survivorFSM/SurvivorDeadFSM";
import { SurvivorEatFSM } from "./survivorFSM/SurvivorEatFSM";
import { SurvivorFollowFSM } from "./survivorFSM/SurvivorFollowFSM";
import { SurvivorHealFSM } from "./survivorFSM/SurvivorHealFSM";
import { SurvivorIdleFSM } from "./survivorFSM/SurvivorIdleFSM";
import { SurvivorSleepFSM } from "./survivorFSM/SurvivorSleepFSM";
import { SurvivorWorkFSM } from "./survivorFSM/SurvivorWorkFSM";

export default class Survivor {
    /** 生存者动画 */
    animation: "idle" | "walk" | "run" = "idle";
    /** 生存者朝向 */
    direction: "left" | "right" = "right";
    /** 所在图层，1默认图层:背景前，2背景后 */
    layer: number = 1;
    /** 生存者的状态机 */
    fsm: BaseSurvivorFSM;
    /** 是否显示 */
    show: boolean = true;
    /** 路径信息 */
    pathInfo: {
        nextArea: number;
        pathPoint: number[][];
        tunnelType: number;
        currentIndex: number;
    } = null;
    /** 体质系数 */
    physique: number;

    constructor(
        public info: SurvivorStateInfo,
        /** 生存者位置 */
        public position: number[],
        /** 生存者所在区域 */
        public area: number
    ) {
        this.fsm = new SurvivorIdleFSM(this);
        this.checkStateChange();
    }

    /** 计算体质偏差值 */
    physiqueCal(base: number) {
        return Math.floor(base * Math.floor(this.physique * 10) * 0.1);
    }

    /** 是否处于生病状态 */
    isSick(): boolean {
        return this.info.illness >= this.physiqueCal(GConfig.survivorSettle.illnessSafe);
    }

    /** 是否处于死亡状态 */
    isDead(): boolean {
        return this.info.satiety <= 0 || this.info.illness >= this.physiqueCal(GConfig.survivorSettle.illnessMax);
    }

    /** 是否处饥饿状态 */
    isHungry(): boolean {
        return this.info.satiety <= GConfig.survivorSettle.satietySafe;
    }

    /** 是否处于疲劳状态 */
    isFatigue(): boolean {
        return this.info.fatigue >= this.physiqueCal(GConfig.survivorSettle.fatigueSafe);
    }

    tick() {
        this.layer = 1;
        this.fsm.tick();
    }

    changeInfo(info: SurvivorStateInfo) {
        if (this.info.state === "dead" && info.state !== "dead") {
            GTip.showTip([GLang.code.ui.new_survivor_arrive]);
        }
        this.info = info;
        this.checkStateChange();
    }

    followTo(fromId: number, toId: number) {
        const tbl = GTable.getById("FacilityTbl", fromId);
        const posTbl = GTable.getById("FacilityPositionTbl", tbl.posId);
        this.position = this.fsm.getFixReachPoint(fromId);
        this.area = posTbl.area;
        this.pathInfo = null;
        this.fsm = new SurvivorFollowFSM(this);
        (this.fsm as SurvivorFollowFSM).setRambleId(toId);
    }

    /** 检查状态变化 */
    checkStateChange() {
        if (this.fsm instanceof SurvivorFollowFSM) {
            if (!this.fsm.complete) return;
        }
        if (this.info.state !== this.fsm.state) {
            switch (this.info.state) {
                case "dead": {
                    this.fsm = new SurvivorDeadFSM(this);
                    return;
                }
                case "heal": {
                    this.fsm = new SurvivorHealFSM(this);
                    return;
                }
                case "sleep": {
                    this.fsm = new SurvivorSleepFSM(this);
                    return;
                }
                case "eat": {
                    this.fsm = new SurvivorEatFSM(this);
                    return;
                }
                case "work": {
                    this.fsm = new SurvivorWorkFSM(this);
                    return;
                }
                case "idle": {
                    this.fsm = new SurvivorIdleFSM(this);
                    return;
                }
            }
        }
    }
    getAnimationName(): "walk" | "idle" | "run" {
        return this.animation;
    }

    getDirection(): "left" | "right" {
        return this.direction;
    }

    /** 是否存活 */
    isALive() {
        return this.fsm.state !== "dead";
    }
}
