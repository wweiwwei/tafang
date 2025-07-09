import Survivor from "../Survivor";
import { SurvivorStateType } from "../SurvivorStateInfo";
import { BaseSurvivorFSM } from "./BaseSurvivorFSM";

export class SurvivorDeadFSM extends BaseSurvivorFSM {
    state: SurvivorStateType = "dead";
    action = "";

    constructor(public ctx: Survivor) {
        super();
        Reflect.defineProperty(this, "ctx", { enumerable: false });
        this.ctx.show = false;
    }
    getBubbleState(): { state: string; progress: number } {
        return { state: "", progress: 0 };
    }
    tick() {}
    getTargetBuildingId(): number {
        return -1;
    }
}
