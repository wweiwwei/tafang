import { BattleTriggerEvent } from "../../Event/BattleTriggerEvent";
import { BattleBattleStageContext } from "../../Processor/BattleBattleStageContext";
import { BattleSkillTemplateWaitKeyFrameBuilder } from "../Builder/Template/BattleSkillTemplateWaitKeyFrameBuilder";
import { BattleSkillBaseTemplate } from "./BattleSkillBaseTemplate";

export class BattleSkillTemplateWaitKeyFrame extends BattleSkillBaseTemplate {
    private targetFrame: number;
    protected process(ctx: BattleBattleStageContext, e: BattleTriggerEvent): boolean {
        const b = this.builder as BattleSkillTemplateWaitKeyFrameBuilder;
        const index = b._index;
        const img = ctx.object.getImg();
        const animation = ctx.skill.builder.animation;
        const tbl = GTable.getList("SpineAttackAnimationInfoTbl").find(
            (t) => t.spine === img && t.animation === animation
        );
        this.targetFrame = tbl.keyFrame[index] * 2;
        return ctx.skill.launchAccTime >= this.targetFrame;
    }

    tick(ctx: BattleBattleStageContext): boolean {
        return ctx.skill.launchAccTime >= this.targetFrame;
    }
}
