import { registerSkillTrigger } from "../../Processor/BattleIoc";
import { BattleSkillBaseCondition } from "./BattleSkillBaseCondition";

@registerSkillTrigger("condition/Or")
export class BattleSkillOr extends BattleSkillBaseCondition {
    private id1: number;
    private id2: number;

    init(): void {
        this.id1 = this.nodeConfig.getInput("condition1").id;
        this.id2 = this.nodeConfig.getInput("condition2").id;
    }

    ok() {
        const e1 = this.ctx.skill.triggerManager.triggerMap[this.id1];
        const e2 = this.ctx.skill.triggerManager.triggerMap[this.id2];
        return e1.ok() || e2.ok();
    }
}
