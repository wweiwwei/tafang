import { BattleTriggerEvent } from "../../Event/BattleTriggerEvent";
import { BattleBattleStageContext } from "../../Processor/BattleBattleStageContext";
import { BattleSkillTemplateKeyFrameLoopBuilder } from "../Builder/Template/BattleSkillTemplateKeyFrameLoopBuilder";
import { BattleSkillBaseTemplate } from "./BattleSkillBaseTemplate";

export class BattleSkillTemplateKeyFrameLoop extends BattleSkillBaseTemplate {
    private _handleFrame = 0;
    private targetFrameList: number[] = [];
    private curTemplate: BattleSkillBaseTemplate = null;
    protected process(ctx: BattleBattleStageContext, e: BattleTriggerEvent): boolean {
        const img = ctx.object.getImg();
        const animation = ctx.skill.builder.animation;
        const tbl = GTable.getList("SpineAttackAnimationInfoTbl").find(
            (t) => t.spine === img && t.animation === animation
        );
        this.targetFrameList = tbl.keyFrame.map((k) => k * 2);
        return false;
    }

    tick(ctx: BattleBattleStageContext): boolean {
        if (this._handleFrame >= this.targetFrameList.length) return true;
        const b = this.builder as BattleSkillTemplateKeyFrameLoopBuilder;
        if (ctx.skill.launchAccTime >= this.targetFrameList[this._handleFrame]) {
            if (this.curTemplate == null) {
                this.curTemplate = b.loop.build();
                const isEnd = this.curTemplate.launch(ctx, null);
                if (isEnd) {
                    this.curTemplate = null;
                    this._handleFrame++;
                }
            } else {
                const isEnd = this.curTemplate.tick(ctx);
                if (isEnd) {
                    this.curTemplate = null;
                    this._handleFrame++;
                }
            }
        }
        return false;
    }
}
