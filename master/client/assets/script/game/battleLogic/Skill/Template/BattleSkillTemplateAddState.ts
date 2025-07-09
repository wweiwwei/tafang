import { BattleDisplayEvent } from "../../Display/BattleDisplayEvent";
import { BattleBattleStageContext } from "../../Processor/BattleBattleStageContext";
import { BattleSkillBaseTemplate } from "./BattleSkillBaseTemplate";
import { BattleSkillTemplateAddStateBuilder } from "../Builder/Template/BattleSkillTemplateAddStateBuilder";
import { BattleTriggerEvent } from "../../Event/BattleTriggerEvent";

export class BattleSkillTemplateAddState extends BattleSkillBaseTemplate {
    private handleCb: Function;
    private targetFrame: number;
    process(ctx: BattleBattleStageContext, e: BattleTriggerEvent): boolean {
        this.handleCb = () => {
            this.handleAddState(ctx, e);
        };
        if (this.builder._delay === 0) {
            this.handleCb();
            return true;
        } else {
            this.targetFrame = ctx.data.frame + this.builder._delay / GConstant.battle.logicTick;
            return false;
        }
    }

    handleAddState(ctx: BattleBattleStageContext, e: BattleTriggerEvent) {
        const targetList = this.getTarget(ctx, e);
        const b = this.builder as BattleSkillTemplateAddStateBuilder;
        const res = targetList.map((o, i) => {
            o.stateManager.addState(ctx, b);
            return { o };
        });
        res.forEach(({ o }) => {
            this.afterHit(ctx, e, o);
        });
    }
}
