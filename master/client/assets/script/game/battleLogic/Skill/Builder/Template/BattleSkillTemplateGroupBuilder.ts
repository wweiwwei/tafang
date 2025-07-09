import { BattleSkillBaseTemplate } from "../../Template/BattleSkillBaseTemplate";
import { BattleSkillTemplateGroup } from "../../Template/BattleSkillTemplateGroup";
import { BattleSkillBaseTemplateBuilder } from "./BattleSkillBaseTemplateBuilder";
/** 将多个技能模板打包成一组，以便实现多个模板同时根据条件或者概率触发 */
export class BattleSkillTemplateGroupBuilder extends BattleSkillBaseTemplateBuilder {
    build(): BattleSkillBaseTemplate {
        return new BattleSkillTemplateGroup(this);
    }

    _template: BattleSkillBaseTemplateBuilder[];
    /** 增加模板 */
    add(t: BattleSkillBaseTemplateBuilder): this {
        this._template.push(t);
        return this;
    }
}
