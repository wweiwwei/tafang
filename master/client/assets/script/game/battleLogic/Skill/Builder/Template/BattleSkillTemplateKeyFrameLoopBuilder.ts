import { BattleSkillBaseTemplate } from "../../Template/BattleSkillBaseTemplate";
import { BattleSkillTemplateKeyFrameLoop } from "../../Template/BattleSkillTemplateKeyFrameLoop";
import { BattleSkillBaseTemplateBuilder } from "./BattleSkillBaseTemplateBuilder";
/** 每个关键帧触发一次模板 */
export class BattleSkillTemplateKeyFrameLoopBuilder extends BattleSkillBaseTemplateBuilder {
    build(): BattleSkillBaseTemplate {
        return new BattleSkillTemplateKeyFrameLoop(this);
    }
    /** 每一次到关键帧需要触发的模板 */
    loop: BattleSkillBaseTemplateBuilder;
}
