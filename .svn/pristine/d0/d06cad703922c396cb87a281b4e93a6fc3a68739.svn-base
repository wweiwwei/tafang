import { BattleDamage } from "../../Entity/BattleDamage";
import { BattleBattleStageContext } from "../../Processor/BattleBattleStageContext";
import { BattleSkillTemplateHookDamageBuilder } from "../../Skill/Builder/Template/BattleSkillTemplateHookDamageBuilder";

export class BattleDamageHook {
    constructor(public ctx: BattleBattleStageContext, public builder: BattleSkillTemplateHookDamageBuilder) {}

    createHandle(d: BattleDamage) {
        if (!this.builder._hookCreate) return;
        if (!this.checkMode(d)) return;
        if (!this.checkState(d)) return;
        const value = AstUtil.eval(this.builder._hookCreate.value, [d]);
        d[this.builder._hookCreate.property] = value;
    }

    settleHandle(d: BattleDamage) {
        if (!this.builder._hookDamageHandle) return;
        if (!this.checkMode(d)) return;
        if (!this.checkState(d)) return;
        const value = AstUtil.eval(this.builder._hookDamageHandle.value, [d]);
        d[this.builder._hookDamageHandle.property] = value;
    }

    private checkMode(d: BattleDamage): boolean {
        if (this.builder._mode === "all") return true;
        if (this.builder._mode === "onlyAttack" && d.source === this.ctx.object) return true;
        if (this.builder._mode === "onlyDefend" && d.target === this.ctx.object) return true;
        return false;
    }

    private checkState(d: BattleDamage): boolean {
        if (!this.builder._checkState) return true;
        const obj = this.builder._checkState.target === "source" ? d.source : d.target;
        return obj.checkState(this.builder._checkState.state);
    }
}
