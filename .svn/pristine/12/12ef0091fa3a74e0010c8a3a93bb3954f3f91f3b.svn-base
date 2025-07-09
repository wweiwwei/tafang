import { BattleSkillBaseTemplate } from "../../Template/BattleSkillBaseTemplate";
import { BattleSkillTemplateEnergyReduce } from "../../Template/BattleSkillTemplateEnergyReduce";
import { BattleSkillBaseTemplateBuilder } from "./BattleSkillBaseTemplateBuilder";

export class BattleSkillTemplateEnergyReduceBuilder extends BattleSkillBaseTemplateBuilder {
    build(): BattleSkillBaseTemplate {
        if (!this._value) {
            throw new Error("BattleSkillTemplateEnergyReduceBuilder: value is required");
        }
        return new BattleSkillTemplateEnergyReduce(this);
    }
    _value: number | string;
    /** 设置能量削减数值 */
    value(v: number | string): this {
        this._value = v;
        return this;
    }
}
