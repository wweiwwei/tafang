import { BattleEvent } from "../../Event/BattleEvent";
import { registerDuration } from "../../Processor/BattleIoc";
import { BattleSkillBaseDuration } from "./BattleSkillBaseDuration";

@registerDuration("duration/DurationSkillEnd")
export class BattleSkillDurationSkillEnd extends BattleSkillBaseDuration {
    init(): void {
        this.ctx.data.eventBus.onOnce(this.ctx.object.uid, "skillEnd", this);
    }

    handleEvent(e: BattleEvent) {
        this.finish();
    }

    remove() {
        this.ctx.data.eventBus.off(this.ctx.object.uid, "skillEnd", this);
    }
}
