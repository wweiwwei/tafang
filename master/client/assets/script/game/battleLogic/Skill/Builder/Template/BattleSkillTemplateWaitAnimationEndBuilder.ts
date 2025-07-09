import { BattleSkillBaseTemplate } from "../../Template/BattleSkillBaseTemplate";
import { BattleSkillTemplateWaitAnimationEnd } from "../../Template/BattleSkillTemplateWaitAnimationEnd";
import { BattleSkillBaseTemplateBuilder } from "./BattleSkillBaseTemplateBuilder";
/** 等待动画播放结束 */
export class BattleSkillTemplateWaitAnimationEndBuilder extends BattleSkillBaseTemplateBuilder {
    build(): BattleSkillBaseTemplate {
        return new BattleSkillTemplateWaitAnimationEnd(this);
    }
}
