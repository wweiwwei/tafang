import { BattleSkillBaseTemplate } from "../../Template/BattleSkillBaseTemplate";
import { BattleSkillTemplateEnergyRecover } from "../../Template/BattleSkillTemplateEnergyRecover";
import { BattleSkillBaseTemplateBuilder } from "./BattleSkillBaseTemplateBuilder";
/** 能量传递，如果传递者保有量低于设置值，则传递保有值 */
export class BattleSkillTemplateEnergyTranslateBuilder extends BattleSkillBaseTemplateBuilder {
    build(): BattleSkillBaseTemplate {
        if (!this._value) {
            throw new Error("BattleSkillTemplateEnergyTranslateBuilder: value is required");
        }
        return new BattleSkillTemplateEnergyRecover(this);
    }
    _value: number | string;
    /** 设置生命恢复数值 */
    value(v: number | string): this {
        this._value = v;
        return this;
    }
}
