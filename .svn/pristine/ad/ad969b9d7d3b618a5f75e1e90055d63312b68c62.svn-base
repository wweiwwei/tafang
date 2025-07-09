import { BattleDisplayEvent } from "../../Display/BattleDisplayEvent";
import { BattleBattleStageContext } from "../../Processor/BattleBattleStageContext";
import { BattleSkillBaseTemplate } from "./BattleSkillBaseTemplate";
import { BattleHeal } from "../../Entity/BattleHeal";
import { BattleSkillTemplateLifeRecoverBuilder } from "../Builder/Template/BattleSkillTemplateLifeRecoverBuilder";
import { BattleTriggerEvent } from "../../Event/BattleTriggerEvent";

export class BattleSkillTemplateLifeRecover extends BattleSkillBaseTemplate {
    private handleCb: Function;
    private targetFrame: number;
    process(ctx: BattleBattleStageContext, e: BattleTriggerEvent): boolean {
        this.handleCb = () => {
            this.handleRecover(ctx, e);
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

    handleRecover(ctx: BattleBattleStageContext, e: BattleTriggerEvent) {
        const targetList = this.getTarget(ctx, e);
        const b = this.builder as BattleSkillTemplateLifeRecoverBuilder;
        targetList
            .filter((o) => this.isHappen(ctx) && this.checkCondition(ctx, o, e))
            .forEach((o, i) => {
                const p = ctx.object.propertyManager.finalProperty;
                const baseValue = ctx.skill.evalValue(b._value, "final", o.propertyManager.finalProperty, this.pre, e);
                const h = BattleHeal.createHeal(ctx.object, o, baseValue, p);
                o.propertyManager.handleHeal(h);
                this.afterHit(ctx, e, o);
            });
    }
}
