import { BattleSkillBaseTemplate } from "../../Template/BattleSkillBaseTemplate";
import { BattleSkillTemplateWaitKeyFrame } from "../../Template/BattleSkillTemplateWaitKeyFrame";
import { BattleSkillBaseTemplateBuilder } from "./BattleSkillBaseTemplateBuilder";
/** 等待下一个关键帧 */
export class BattleSkillTemplateWaitKeyFrameBuilder extends BattleSkillBaseTemplateBuilder {
    build(): BattleSkillBaseTemplate {
        if (this._index === undefined) {
            throw new Error("BattleSkillTemplateWaitKeyFrameBuilder: index is required");
        }
        return new BattleSkillTemplateWaitKeyFrame(this);
    }
    _index: number;
    /** 复活时有多少生命值 */
    index(v: number): this {
        this._index = v;
        return this;
    }
}
