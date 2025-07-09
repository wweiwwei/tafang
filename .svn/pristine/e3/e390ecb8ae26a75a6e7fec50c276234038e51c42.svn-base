import { BattleSkillBaseTemplate } from "../../Template/BattleSkillBaseTemplate";
import { BattleSkillTemplateLifeRecover } from "../../Template/BattleSkillTemplateLifeRecover";
import { BattleSkillBaseTemplateBuilder } from "./BattleSkillBaseTemplateBuilder";
/** 生命恢复，需要设置恢复数值 */
export class BattleSkillTemplateLifeRecoverBuilder extends BattleSkillBaseTemplateBuilder {
    build(): BattleSkillBaseTemplate {
        if (!this._value) {
            throw new Error("BattleSkillTemplateLifeRecoverBuilder: value is required");
        }
        return new BattleSkillTemplateLifeRecover(this);
    }
    _value: number | string;
    /** 设置生命恢复数值 */
    value(v: number | string): this {
        this._value = v;
        return this;
    }
}
