import { BattleTriggerEvent } from "../../Event/BattleTriggerEvent";
import { BattleBattleStageContext } from "../../Processor/BattleBattleStageContext";
import { BattleSkillTemplateExplosionBuilder } from "../Builder/Template/BattleSkillTemplateExplosionBuilder";
import { BattleTargetSearch } from "../Target/BattleTargetSearch";
import { BattleSkillBaseTemplate } from "./BattleSkillBaseTemplate";

export class BattleSkillTemplateExplosion extends BattleSkillBaseTemplate {
    private handleCb: Function;
    private targetFrame: number;
    protected process(ctx: BattleBattleStageContext, e: BattleTriggerEvent): boolean {
        this.handleCb = () => {
            this.handleExplosion(ctx, e);
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

    handleExplosion(ctx: BattleBattleStageContext, e: BattleTriggerEvent) {
        const targetList = this.getTarget(ctx, e);
        const b = this.builder as BattleSkillTemplateExplosionBuilder;
        const mode = b._targetMode;
        const baseSearchTarget = (() => {
            if (mode === "all") {
                return BattleTargetSearch.searchBaseTarget("selfTeam", ctx, e).concat(
                    BattleTargetSearch.searchBaseTarget("enemyTeam", ctx, e)
                );
            } else {
                return BattleTargetSearch.searchBaseTarget(mode, ctx, e);
            }
        })();
        const range = ctx.skill.evalValue(b._range, "final");
        targetList.forEach((t) => {
            const allTarget = baseSearchTarget.filter((o) => o.distance(t) <= range);
            allTarget.forEach((o) => {
                this.afterHit(ctx, e, o);
            });
        });
    }
}
