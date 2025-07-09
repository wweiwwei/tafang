import { BattleEvent, BattleEventDataMap } from "../../Event/BattleEvent";
import { registerDuration } from "../../Processor/BattleIoc";
import { BattleSkillBaseDuration } from "./BattleSkillBaseDuration";

@registerDuration("duration/DurationEvent")
export class BattleSkillDurationEvent extends BattleSkillBaseDuration {
    private event: string;
    private tag: string[];
    happendCount = 0;
    countRequire = 1;

    init(): void {
        this.event = this.nodeConfig.getProperties("event");
        this.tag = this.nodeConfig.getProperties("tag").split("|");
        this.countRequire = this.ctx.skill.evalValue(this.nodeConfig.getProperties("count"), "final");
        this.ctx.data.eventBus.on(this.ctx.object.uid, this.event as keyof BattleEventDataMap, this);
    }

    handleEvent(e: BattleEvent) {
        if (e.target !== this.ctx.object.uid) return;
        if (this.tag.length > 0 && !this.tag.some((t) => e.tag.includes(t))) return;
        this.happendCount++;
        if (this.happendCount >= this.countRequire) {
            this.finish();
            this.ctx.data.eventBus.off(this.ctx.object.uid, this.event as keyof BattleEventDataMap, this);
        }
    }

    remove() {
        this.ctx.data.eventBus.off(this.ctx.object.uid, this.event as keyof BattleEventDataMap, this);
    }
}
