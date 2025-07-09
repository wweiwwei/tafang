import { BattleSkillBaseTemplate } from "../../Template/BattleSkillBaseTemplate";
import { BattleSkillTemplateRevive } from "../../Template/BattleSkillTemplateRevive";
import { BattleSkillBaseTemplateBuilder } from "./BattleSkillBaseTemplateBuilder";
/** 矩形效果，范围默认是角色身前 */
export class BattleSkillTemplateReviveBuilder extends BattleSkillBaseTemplateBuilder {
    build(): BattleSkillBaseTemplate {
        if (!this._value) {
            throw new Error("BattleSkillTemplateReviveBuilder: value is required");
        }
        return new BattleSkillTemplateRevive(this);
    }
    _value: number | string;
    /** 复活时有多少生命值 */
    value(v: number | string): this {
        this._value = v;
        return this;
    }
}
