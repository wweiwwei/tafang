import EventBus from "../../../framework/event/EventBus";
import EventName from "../../event/EventName";
import Survivor from "../Survivor";
import { SurvivorStateType } from "../SurvivorStateInfo";
import { BaseSurvivorFSM } from "./BaseSurvivorFSM";

export class SurvivorSleepFSM extends BaseSurvivorFSM {
    constructor(public ctx: Survivor) {
        super();
        Reflect.defineProperty(this, "ctx", { enumerable: false });
    }

    action: "next" | "move" | "sleep" = "next";
    /** 随机到达点 */
    targetPoint: number[] = null;
    state: SurvivorStateType = "sleep";
    sleepProgress: number = 0;
    tick() {
        if (this.action === "next") {
            const id = this.ctx.info.dormId;
            this.targetPoint = this.getRandomReachPoint(id);
            this.action = "move";
        } else if (this.action === "move") {
            const id = this.ctx.info.dormId;
            this.moveToBuilding(id, this.targetPoint, false);
            if (this.isReachTargetPoint(this.targetPoint)) {
                this.action = "sleep";
                this.ctx.animation = "idle";
            }
        } else if (this.action === "sleep") {
            this.sleepProgress += 1000 / 60 / GConfig.survivorTick.sleepTime;
            if (this.sleepProgress >= 1) {
                this.sleepProgress = 0;
                EventBus.emit(EventName.showSleep, this.ctx.info.uniqueId);
            }
        }
    }

    getTargetBuildingId(): number {
        return this.ctx.info.dormId;
    }

    getBubbleState(): { state: string; progress: number } {
        if (this.action === "sleep") {
            return { state: "sleep", progress: this.sleepProgress };
        } else {
            const state = this.getDefautBubbleState();
            return { state, progress: 1 };
        }
    }
}
