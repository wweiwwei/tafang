import EventBus from "../../../framework/event/EventBus";
import EventName from "../../event/EventName";
import Survivor from "../Survivor";
import { SurvivorStateType } from "../SurvivorStateInfo";
import { BaseSurvivorFSM } from "./BaseSurvivorFSM";

export class SurvivorWorkFSM extends BaseSurvivorFSM {
    constructor(public ctx: Survivor) {
        super();
        Reflect.defineProperty(this, "ctx", { enumerable: false });
    }
    action: "next" | "move" | "work" | "sleep" = "next";
    /** 随机到达点 */
    targetPoint: number[] = null;
    state: SurvivorStateType = "work";
    workProgress: number = 0;

    randomAction() {
        const r = Math.random();
        if (r < GConfig.survivorTick.workSleep) {
            this.action = "sleep";
        } else {
            this.workProgress = 0;
            this.action = "work";
        }
        this.ctx.animation = "idle";
    }
    tick() {
        if (this.action === "next") {
            const id = this.ctx.info.buildId;
            this.targetPoint = this.getRandomReachPoint(id);
            this.action = "move";
        } else if (this.action === "move") {
            const id = this.ctx.info.buildId;
            this.moveToBuilding(id, this.targetPoint, false);
            if (this.isReachTargetPoint(this.targetPoint)) {
                this.randomAction();
            }
        } else if (this.action === "work") {
            this.workProgress += 1000 / 60 / GConfig.survivorTick.workTime;
            if (this.workProgress >= 1) {
                EventBus.emit(EventName.showProduce, this.ctx.info.uniqueId);
                this.randomAction();
            }
        } else if (this.action === "sleep") {
        }
    }
    getTargetBuildingId(): number {
        return this.ctx.info.buildId;
    }

    getBubbleState() {
        if (this.action === "sleep") {
            return { state: "sleep", progress: 1 };
        } else if (this.action === "work") {
            return { state: "work", progress: this.workProgress };
        } else {
            const state = this.getDefautBubbleState();
            return { state, progress: 1 };
        }
    }
}
