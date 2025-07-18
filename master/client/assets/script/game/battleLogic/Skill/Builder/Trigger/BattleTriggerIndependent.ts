import { BattleTriggerEvent } from "../../../Event/BattleTriggerEvent";
import { BattleSkill } from "../../BattleSkill";
import { BattleSkillTimer } from "../../Duration/BattleSkillTimer";
import { IBattleSkillTrigger } from "./IBattleSkillTrigger";

export class BattleTriggerIndependent implements IBattleSkillTrigger {
    lastLaunch: number = 0;
    private interval: number = 10000;

    getInterval() {
        return Math.round(this.interval * (1 + this.slow * 0.0001));
    }

    constructor(public coldDown: number | string) {}
    onOrder(skill: BattleSkill): boolean {
        return false;
    }
    reset(skill: BattleSkill): void {
        this.lastLaunch = skill.ctx.data.frame;
        const coldDownTime = skill.evalValue(this.coldDown, "base");
        const p = skill.ctx.object.propertyManager.finalProperty;
        const coldDownRate = 1 - p.skillColdDown * 0.0001;
        this.interval = Math.round(
            (coldDownTime / GConstant.battle.logicTick) * (coldDownRate < 0.2 ? 0.2 : coldDownRate)
        );
    }
    tick(skill: BattleSkill): boolean {
        return false;
        // const frame = skill.ctx.data.frame;
        // return frame - this.lastLaunch > this.interval;
    }
    private slow = 0;
    tickIndependent(skill: BattleSkill, slow: number): boolean {
        const frame = skill.ctx.data.frame;
        this.slow = slow;
        return frame - this.lastLaunch > this.getInterval();
    }
    init(skill: BattleSkill): void {
        this.reset(skill);
        this.lastLaunch = -999999;
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
        return false;
    }
    kind: "main" | "normalAttack" | "passive" | "event" | "independent" = "independent";
}
