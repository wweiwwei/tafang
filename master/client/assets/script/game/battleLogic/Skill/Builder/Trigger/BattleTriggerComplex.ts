import { BattleTriggerEvent } from "../../../Event/BattleTriggerEvent";
import { BattleSkill } from "../../BattleSkill";
import { IBattleSkillTrigger } from "./IBattleSkillTrigger";

export class BattleTriggerComplex implements IBattleSkillTrigger {
    constructor(public list: IBattleSkillTrigger[]) {}
    reset(skill: BattleSkill): void {}
    tick(skill: BattleSkill): boolean {
        return false;
    }
    init(skill: BattleSkill): void {}
    onAttack(skill: BattleSkill): boolean {
        return this.list.some((trigger) => trigger.onAttack(skill));
    }
    onPassive(skill: BattleSkill): boolean {
        return this.list.some((trigger) => trigger.onPassive(skill));
    }
    onEvent(skill: BattleSkill, e: BattleTriggerEvent): boolean {
        return this.list.some((trigger) => trigger.onEvent(skill, e));
    }
    onOrder(skill: BattleSkill): boolean {
        return this.list.some((trigger) => trigger.onOrder(skill));
    }
    kind: "main" | "normalAttack" | "passive" | "event" = "event";
}
