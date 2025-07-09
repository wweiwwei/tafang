import { BattleSkillBaseTemplate } from "../../Template/BattleSkillBaseTemplate";
import { BattleSkillTemplateHookDamage } from "../../Template/BattleSkillTemplateHookDamage";
import { BattleSkillBaseTemplateBuilder } from "./BattleSkillBaseTemplateBuilder";
/** 未实装，伤害流程定制，可以根据逻辑对伤害进行修正 */
export class BattleSkillTemplateHookDamageBuilder extends BattleSkillBaseTemplateBuilder {
    build(): BattleSkillBaseTemplate {
        return new BattleSkillTemplateHookDamage(this);
    }
    _mode: "all" | "onlyAttack" | "onlyDefend" = "all";
    /** 只在攻击时生效 */
    onlyAttack(): this {
        this._mode = "onlyAttack";
        return this;
    }
    /** 只在防守时生效 */
    onlyDefend(): this {
        this._mode = "onlyDefend";
        return this;
    }
    _checkState: {
        target: "source" | "target";
        state: string;
    };

    /** 检测状态，可以选择检测伤害源头或者伤害目标，只有状态存在才会触发效果 */
    checkState(target: "source" | "target", state: string): this {
        this._checkState = { target, state };
        return this;
    }
    _hookCreate: {
        property: "baseValue" | "damage" | "critical" | "critDamage";
        value: string;
    };
    /** 伤害创建时的数值修正，可以修正基础攻击数值，增伤，暴击率，暴击伤害等数值 */
    hookDamageCreate(property: "baseValue" | "damage" | "critical" | "critDamage", value: string): this {
        this._hookCreate = { property, value };
        return this;
    }
    _hookDamageHandle: {
        property: "value" | "hpHurt";
        value: string;
    };
    /** 伤害结算时的数值修正，可以修正最终伤害值，生命值损伤等 */
    hookDamageHandle(property: "value" | "hpHurt", value: string): this {
        this._hookDamageHandle = { property, value };
        return this;
    }
}
