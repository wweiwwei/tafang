import { BattleTriggerEvent } from "../../../Event/BattleTriggerEvent";
import { BattleSkill } from "../../BattleSkill";
import { BattleTargetSearch } from "../../Target/BattleTargetSearch";
import { BattleTargetBuilder } from "../Target/BattleTargetBuilder";
import { IBattleSkillTrigger } from "./IBattleSkillTrigger";

export class BattleTriggerAfterEvent implements IBattleSkillTrigger {
    constructor(public t: BattleTargetBuilder, public eventName: string) {
        this.targetSearch = t.build();
    }
    init(skill: BattleSkill): void {}
    reset(skill: BattleSkill): void {}
    tick(skill: BattleSkill): boolean {
        return false;
    }

    private targetSearch: BattleTargetSearch;
    onAttack(skill: BattleSkill): boolean {
        return false;
    }
    onPassive(skill: BattleSkill): boolean {
        return false;
    }
    onEvent(skill: BattleSkill, e: BattleTriggerEvent): boolean {
        if (e.kind !== this.eventName) return false;
        const list = this.targetSearch.searchTarget(skill.ctx, e);
        return list.includes(e.match);
    }
    onOrder(skill: BattleSkill): boolean {
        return false;
    }
    kind: "main" | "normalAttack" | "passive" | "event" = "event";
}
