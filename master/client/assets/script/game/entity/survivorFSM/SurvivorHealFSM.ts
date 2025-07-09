import EventBus from "../../../framework/event/EventBus";
import EventName from "../../event/EventName";
import Survivor from "../Survivor";
import { SurvivorStateType } from "../SurvivorStateInfo";
import { BaseSurvivorFSM } from "./BaseSurvivorFSM";

export class SurvivorHealFSM extends BaseSurvivorFSM {
    constructor(public ctx: Survivor) {
        super();
        Reflect.defineProperty(this, "ctx", { enumerable: false });
    }

    action: "next" | "move" | "heal" = "next";
    /** 随机到达点 */
    targetPoint: number[] = null;
    state: SurvivorStateType = "heal";
    healProgress: number = 0;
    tick() {
        if (this.action === "next") {
            const id = GConstant.build.ID_BUILD_HOSPITAL;
            this.targetPoint = this.getRandomReachPoint(id);
            this.action = "move";
        } else if (this.action === "move") {
            const id = GConstant.build.ID_BUILD_HOSPITAL;
            this.moveToBuilding(id, this.targetPoint, false);
            if (this.isReachTargetPoint(this.targetPoint)) {
                this.action = "heal";
                this.ctx.animation = "idle";
            }
        } else if (this.action === "heal") {
            this.healProgress += 1000 / 60 / GConfig.survivorTick.healTime;
            if (this.healProgress >= 1) {
                this.healProgress = 0;
                EventBus.emit(EventName.showHeal, this.ctx.info.uniqueId);
            }
        }
    }

    getTargetBuildingId(): number {
        return GConstant.build.ID_BUILD_HOSPITAL;
    }
    getBubbleState(): { state: string; progress: number } {
        if (this.action === "heal") {
            return { state: "heal", progress: this.healProgress };
        } else {
            return { state: this.getDefautBubbleState(), progress: 1 };
        }
    }
}
