import { BattleTriggerEvent } from "../../../Event/BattleTriggerEvent";
import { BattleSkill } from "../../BattleSkill";
import { IBattleSkillTrigger } from "./IBattleSkillTrigger";

export class BattleTriggerPassive implements IBattleSkillTrigger {
    reset(skill: BattleSkill): void {}
    tick(skill: BattleSkill): boolean {
        return false;
    }
    init(skill: BattleSkill): void {}
    onPassive(skill: BattleSkill): boolean {
        return true;
    }
    onEvent(skill: BattleSkill, e: BattleTriggerEvent): boolean {
        return false;
    }
    onAttack(skill: BattleSkill): boolean {
        return false;
    }
    onOrder(skill: BattleSkill): boolean {
        return false;
    }
    kind: "main" | "normalAttack" | "passive" | "event" = "passive";
}
