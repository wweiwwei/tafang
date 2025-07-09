import { BattleDisplayEvent } from "../../Display/BattleDisplayEvent";
import { BattleTriggerEvent } from "../../Event/BattleTriggerEvent";
import { BattleRect } from "../../Map/BattleRect";
import { BattleVec } from "../../Map/BattleVec";
import { BattleBattleStageObject } from "../../Object/BattleStage/BattleBattleStageObject";
import { BattleEffect } from "../../Object/Effect/BattleEffect";
import { BattleForce } from "../../Object/Physic/BattleForce";
import { BattleBattleStageContext } from "../../Processor/BattleBattleStageContext";
import { BattleSkillTemplateRectEffectBuilder } from "../Builder/Template/BattleSkillTemplateRectEffectBuilder";
import { BattleSkillTemplateRepulseBuilder } from "../Builder/Template/BattleSkillTemplateRepulseBuilder";
import { BattleTargetSearch } from "../Target/BattleTargetSearch";
import { BattleSkillBaseTemplate } from "./BattleSkillBaseTemplate";

export class BattleSkillTemplateRepulse extends BattleSkillBaseTemplate {
    private handleCb: Function;
    private targetFrame: number;
    process(ctx: BattleBattleStageContext, e: BattleTriggerEvent): boolean {
        this.handleCb = () => {
            this.handleRepulse(ctx, e);
        };
        if (this.builder._delay === 0) {
            this.handleCb();
            return true;
        } else {
            this.targetFrame = ctx.data.frame + this.builder._delay / GConstant.battle.logicTick;
            return false;
        }
    }

    tick(ctx: BattleBattleStageContext): boolean {
        if (ctx.data.frame >= this.targetFrame) {
            this.handleCb();
            return true;
        } else {
            return false;
        }
    }
    handleRepulse(ctx: BattleBattleStageContext, e: BattleTriggerEvent) {
        const targetList = this.getTarget(ctx, e);
        const b = this.builder as BattleSkillTemplateRepulseBuilder;
        targetList.forEach((o) => {
            const direction = BattleVec.normalize(BattleVec.sub(o.position, ctx.object.position));
            const f = new BattleForce(
                direction,
                ctx.skill.evalValue(b._distance, "final", o.propertyManager.finalProperty, this.pre, e)
            );
            o.physicManager.addForce(f);
        });
    }
}
