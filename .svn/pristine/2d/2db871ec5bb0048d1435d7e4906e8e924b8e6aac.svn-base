import { registerSkillTrigger } from "../../Processor/BattleIoc";
import { BattleSkillBaseCondition } from "./BattleSkillBaseCondition";

@registerSkillTrigger("condition/Check")
export class BattleSkillCheck extends BattleSkillBaseCondition {
    private condition: string;
    init(): void {
        this.condition = this.nodeConfig.getProperties("condition");
    }

    ok(): boolean {
        return this.ctx.skill.evalCondition(this.condition, "final");
    }
}
