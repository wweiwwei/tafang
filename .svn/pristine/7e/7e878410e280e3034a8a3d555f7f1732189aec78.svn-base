import { GameDate } from "../../../framework/date/GameDate";
import Survivor from "../Survivor";
import { SurvivorStateType } from "../SurvivorStateInfo";
import { BaseSurvivorFSM } from "./BaseSurvivorFSM";

export class SurvivorIdleFSM extends BaseSurvivorFSM {
    constructor(public ctx: Survivor) {
        super();
        Reflect.defineProperty(this, "ctx", { enumerable: false });
    }
    state: SurvivorStateType = "idle";

    action: "next" | "move" | "ramble" = "next";
    rambleId = -1;
    leftStamp = 0;
    /** 随机到达点 */
    targetPoint: number[] = null;

    tick() {
        if (this.action === "next") {
            this.rambleId = this.randomTargetBuildingId();
            this.targetPoint = this.getRandomReachPoint(this.rambleId);
            this.action = "move";
        } else if (this.action === "move") {
            const id = this.rambleId;
            this.moveToBuilding(id, this.targetPoint, false);
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

    getTargetBuildingId(): number {
        return this.rambleId;
    }
    getBubbleState() {
        const state = this.getDefautBubbleState();
        return { state, progress: 1 };
    }
}
