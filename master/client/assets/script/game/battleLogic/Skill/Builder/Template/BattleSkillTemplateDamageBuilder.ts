import { BattleSkillTemplateDamage } from "../../Template/BattleSkillTemplateDamage";
import { BattleBulletBuilder } from "../Damage/BattleBulletBuilder";
import { BattleDamageExemptBuilder } from "../Damage/BattleDamageExemptBuilder";
import { BattleSkillBaseTemplateBuilder } from "./BattleSkillBaseTemplateBuilder";
/** 伤害模板，需要设置伤害数值 */
export class BattleSkillTemplateDamageBuilder extends BattleSkillBaseTemplateBuilder {
    _value: number | string;
    _withoutEvent: boolean = false;
    _tag = [];
    _exempt: BattleDamageExemptBuilder;
    _damageText: string;
    /** 设置伤害数值 */
    value(v: number | string): this {
        this._value = v;
        return this;
    }
    /** 设置伤害数值 */
    withoutEvent(): this {
        this._withoutEvent = true;
        return this;
    }
    /** 设置伤害tag */
    tag(t: string): this {
        this._tag.push(t);
        return this;
    }

    build(): BattleSkillTemplateDamage {
        if (!this._value) {
            throw new Error("BattleSkillTemplateDamageBuilder: value is required");
        }
        return new BattleSkillTemplateDamage(this);
    }
    /** 设置伤害豁免规则 */
    exempt(e: BattleDamageExemptBuilder): this {
        this._exempt = e;
        return this;
    }
    /** 设置伤害文本的样式，目前唯一有效的值只有lifeRemove，可以显示出生命移除的字样 */
    damageText(text: string): this {
        this._damageText = text;
        return this;
    }
}
