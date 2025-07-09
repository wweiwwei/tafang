import { GameDate } from "../../../framework/date/GameDate";
import EventBus from "../../../framework/event/EventBus";
import EventName from "../../event/EventName";
import Survivor from "../Survivor";
import { SurvivorStateType } from "../SurvivorStateInfo";
import { BaseSurvivorFSM } from "./BaseSurvivorFSM";

export class SurvivorEatFSM extends BaseSurvivorFSM {
    constructor(public ctx: Survivor) {
        super();
        Reflect.defineProperty(this, "ctx", { enumerable: false });
    }

    action: "next" | "move" | "randomMove" | "eat" | "ramble" = "next";
    /** 随机到达点 */
    targetPoint: number[] = null;
    state: SurvivorStateType = "eat";
    eatProgress: number = 0;
    rambleId = -1;
    leftStamp = 0;
    tick() {
        if (this.action === "next") {
            const id = GConstant.build.ID_BUILD_CANTEEN;
            this.targetPoint = this.getRandomReachPoint(id);
            this.action = "move";
        } else if (this.action === "move") {
            if (GModel.survivor.survivorEatList().includes(this.ctx.info.uniqueId)) {
                // 有饭吃
                const id = GConstant.build.ID_BUILD_CANTEEN;
                this.moveToBuilding(id, this.targetPoint, false);
                if (this.isReachTargetPoint(this.targetPoint)) {
                    this.action = "eat";
                    this.ctx.animation = "idle";
                }
            } else {
                // 没饭吃
                this.eatProgress = 0;
                this.rambleId = this.randomTargetBuildingId();
                this.targetPoint = this.getRandomReachPoint(this.rambleId);
                this.action = "randomMove";
            }
        } else if (this.action === "eat") {
            if (GModel.survivor.survivorEatList().includes(this.ctx.info.uniqueId)) {
                // 有饭吃
                this.eatProgress += 1000 / 60 / GConfig.survivorTick.eatTime;
                if (this.eatProgress >= 1) {
                    EventBus.emit(EventName.showEat, this.ctx.info.uniqueId);
                    GModel.survivor.eatComplete();
                    this.eatProgress = 0;
                    this.rambleId = this.randomTargetBuildingId();
                    this.targetPoint = this.getRandomReachPoint(this.rambleId);
                    this.action = "randomMove";
                }
            } else {
                // 没饭吃
                this.eatProgress = 0;
                this.rambleId = this.randomTargetBuildingId();
                this.targetPoint = this.getRandomReachPoint(this.rambleId);
                this.action = "randomMove";
            }
        } else if (this.action === "randomMove") {
            const id = this.rambleId;
            this.moveToBuilding(id, this.targetPoint, false);
            if (this.isReachTargetPoint(this.targetPoint)) {
                const now = GameDate.nowUpdated();
                this.action = "ramble";
                const [minTime, maxTime] = GConfig.survivorTick.idleStayTime;
                this.leftStamp = Math.round(now + Math.random() * (maxTime - minTime) + minTime);
            }
        } else if (this.action === "ramble") {
            this.moveInsideBuilding(this.rambleId);
        }
    }

    getTargetBuildingId(): number {
        if (this.rambleId > 0) return this.rambleId;
        return GConstant.build.ID_BUILD_CANTEEN;
    }
    getBubbleState(): { state: string; progress: number } {
        if (this.action === "eat") {
            return { state: "eat", progress: this.eatProgress };
        } else {
            const state = this.getDefautBubbleState();
            return { state, progress: 1 };
        }
    }
}
