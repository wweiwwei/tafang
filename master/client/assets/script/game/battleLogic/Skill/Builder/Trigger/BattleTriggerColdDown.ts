import { BattleTriggerEvent } from "../../../Event/BattleTriggerEvent";
import { BattleSkill } from "../../BattleSkill";
import { IBattleSkillTrigger } from "./IBattleSkillTrigger";

export class BattleTriggerColdDown implements IBattleSkillTrigger {
    lastLaunch: number = 0;
    interval: number = 10000;

    constructor(public coldDown: number | string) {}
    reset(skill: BattleSkill): void {
        this.lastLaunch = skill.ctx.data.frame;
        const coldDownTime = skill.evalValue(this.coldDown, "base");
        const p = skill.ctx.object.propertyManager.finalProperty;
        this.interval = Math.round((coldDownTime / GConstant.battle.logicTick) * (1 - p.skillColdDown * 0.0001));
    }
    tick(skill: BattleSkill): boolean {
        return false;
    }
    init(skill: BattleSkill): void {
        this.reset(skill);
        // this.lastLaunch = skill.ctx.data.frame;
        // const coldDownTime = skill.evalValue(this.coldDown, "base");
        // this.interval = Math.round(coldDownTime / GConstant.battle.logicTick);
    }
    onPassive(skill: BattleSkill): boolean {
        return false;
    }
    onEvent(skill: BattleSkill, e: BattleTriggerEvent): boolean {
        return false;
    }
    onAttack(skill: BattleSkill): boolean {
        const frame = skill.ctx.data.frame;
        return frame - this.lastLaunch > this.interval;
    }
    onOrder(skill: BattleSkill): boolean {
        return false;
    }
    kind: "main" | "normalAttack" | "passive" | "event" | "independent" | "coldDown" = "coldDown";
}
