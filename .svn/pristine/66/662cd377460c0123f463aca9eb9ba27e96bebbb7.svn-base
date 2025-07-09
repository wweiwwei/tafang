import { BattleSkillBaseTemplate } from "../../Template/BattleSkillBaseTemplate";
import { BattleSkillTemplateAura } from "../../Template/BattleSkillTemplateAura";
import { BattleSkillBaseTemplateBuilder } from "./BattleSkillBaseTemplateBuilder";
/** 未实装，光环 */
export class BattleSkillTemplateAuraBuilder extends BattleSkillBaseTemplateBuilder {
    build(): BattleSkillBaseTemplate {
        if (!this._value || !this._kind) {
            throw new Error("BattleSkillTemplateAuraBuilder: value and kind is required");
        }
        return new BattleSkillTemplateAura(this);
    }
    _value: number | string;
    /** 设置buff的数值 */
    value(v: number | string): this {
        this._value = v;
        return this;
    }
    _kind: string;
    /** 设置buff类型 */
    kind(s: string): this {
        this._kind = s;
        return this;
    }
    _forEnemy: boolean = false;
    /** 光环目标针对敌方，没有设置默认针对己方 */
    forEnemy(): this {
        this._forEnemy = true;
        return this;
    }
}
