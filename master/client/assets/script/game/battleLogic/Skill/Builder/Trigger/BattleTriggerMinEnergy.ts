import { BattleTriggerEvent } from "../../../Event/BattleTriggerEvent";
import { BattleSkill } from "../../BattleSkill";
import { IBattleSkillTrigger } from "./IBattleSkillTrigger";

export class BattleTriggerMinEnergy implements IBattleSkillTrigger {
    constructor(public count: number | string) {}
    tick(skill: BattleSkill): boolean {
        return false;
    }
    init(skill: BattleSkill): void {}
    reset(skill: BattleSkill): void {
        // todo 怒气归零
    }
    onPassive(skill: BattleSkill): boolean {
        return false;
    }
    onEvent(skill: BattleSkill, e: BattleTriggerEvent): boolean {
        return false;
    }
    onAttack(skill: BattleSkill): boolean {
        return skill.ctx.object.propertyManager.energy >= skill.evalValue(this.count, "final");
    }
    onOrder(skill: BattleSkill): boolean {
        return false;
    }
    kind: "main" | "normalAttack" | "passive" | "event" = "main";
}
