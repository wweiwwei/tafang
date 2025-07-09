import { registerDuration } from "../../Processor/BattleIoc";
import { BattleSkillBaseDuration } from "./BattleSkillBaseDuration";

@registerDuration("duration/DurationFix")
export class BattleSkillDurationFix extends BattleSkillBaseDuration {
    init(): void {
        const duration = this.nodeConfig.getProperties("duration");
        const ms = this.ctx.skill.evalValue(duration, "final");
        this.ctx.data.scheduler.scheduleOnce(ms, this.finish, this);
    }

    remove(): void {
        this.ctx.data.scheduler.unschedule(this);
    }
}
