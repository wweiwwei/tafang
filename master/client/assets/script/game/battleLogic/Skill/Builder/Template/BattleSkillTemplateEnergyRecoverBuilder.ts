import { BattleSkillBaseTemplate } from "../../Template/BattleSkillBaseTemplate";
import { BattleSkillTemplateEnergyRecover } from "../../Template/BattleSkillTemplateEnergyRecover";
import { BattleSkillBaseTemplateBuilder } from "./BattleSkillBaseTemplateBuilder";
/** 能量恢复，需要设置恢复数值 */
export class BattleSkillTemplateEnergyRecoverBuilder extends BattleSkillBaseTemplateBuilder {
    build(): BattleSkillBaseTemplate {
        if (!this._value) {
            throw new Error("BattleSkillTemplateEnergyRecoverBuilder: value is required");
        }
        return new BattleSkillTemplateEnergyRecover(this);
    }
    _value: number | string;
    /** 设置能量恢复数值 */
    value(v: number | string): this {
        this._value = v;
        return this;
    }
}
