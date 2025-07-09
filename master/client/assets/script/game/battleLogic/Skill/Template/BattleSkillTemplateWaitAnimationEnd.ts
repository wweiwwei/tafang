import { BattleTriggerEvent } from "../../Event/BattleTriggerEvent";
import { BattleBattleStageContext } from "../../Processor/BattleBattleStageContext";
import { BattleSkillBaseTemplate } from "./BattleSkillBaseTemplate";

export class BattleSkillTemplateWaitAnimationEnd extends BattleSkillBaseTemplate {
    private targetFrame: number;
    protected process(ctx: BattleBattleStageContext, e: BattleTriggerEvent): boolean {
        const img = ctx.object.getImg();
        const animation = ctx.skill.builder.animation;
        const tbl = GTable.getList("SpineAttackAnimationInfoTbl").find(
            (t) => t.spine === img && t.animation === animation
        );
        this.targetFrame = tbl.total * 2;
        return ctx.skill.launchAccTime >= this.targetFrame;
    }

    tick(ctx: BattleBattleStageContext): boolean {
        return ctx.skill.launchAccTime >= this.targetFrame;
    }
}
