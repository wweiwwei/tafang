import { GameDate } from "../../../framework/date/GameDate";
import EventBus from "../../../framework/event/EventBus";
import EventName from "../../event/EventName";
import Survivor from "../Survivor";
import { SurvivorStateType } from "../SurvivorStateInfo";
import { BaseSurvivorFSM } from "./BaseSurvivorFSM";

export class SurvivorFollowFSM extends BaseSurvivorFSM {
    constructor(public ctx: Survivor) {
        super();
        Reflect.defineProperty(this, "ctx", { enumerable: false });
    }
    state: SurvivorStateType = "follow";

    action: "move" = "move";
    rambleId = -1;
    leftStamp = 0;
    /** 随机到达点 */
    targetPoint: number[] = null;
    complete = false;

    setRambleId(id: number) {
        this.rambleId = id;
        this.targetPoint = this.getFixReachPoint(this.rambleId);
    }
    tick() {
        const id = this.rambleId;
        this.moveToBuilding(id, this.targetPoint, true);
        EventBus.emit(EventName.followSurvivor, this.ctx.info.uniqueId);
        if (this.isReachTargetPoint(this.targetPoint)) {
            const now = GameDate.nowUpdated();
            const [minTime, maxTime] = GConfig.survivorTick.idleStayTime;
            this.leftStamp = Math.round(now + Math.random() * (maxTime - minTime) + minTime);
            this.complete = true;
            this.ctx.animation = "idle";
            GModel.guide.endFollow();
            this.ctx.checkStateChange();
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
