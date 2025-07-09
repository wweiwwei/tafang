import { BattleDisplayEvent } from "../../Display/BattleDisplayEvent";
import { BattleBattleStageContext } from "../../Processor/BattleBattleStageContext";
import { BattleSkillBaseTemplate } from "./BattleSkillBaseTemplate";
import { BattleSkillTemplateAddBuffBuilder } from "../Builder/Template/BattleSkillTemplateAddBuffBuilder";
import { BattleTriggerEvent } from "../../Event/BattleTriggerEvent";

export class BattleSkillTemplateAddBuff extends BattleSkillBaseTemplate {
    private handleCb: Function;
    private targetFrame: number;
    process(ctx: BattleBattleStageContext, e: BattleTriggerEvent): boolean {
        this.handleCb = () => {
            this.handleAddBuff(ctx, e);
        };
        if (this.builder._delay === 0) {
            this.handleCb();
            return true;
        } else {
            this.targetFrame = ctx.data.frame + this.builder._delay / GConstant.battle.logicTick;
            return false;
        }
    }

    handleAddBuff(ctx: BattleBattleStageContext, e: BattleTriggerEvent) {
        const targetList = this.getTarget(ctx, e);
        const b = this.builder as BattleSkillTemplateAddBuffBuilder;
        const res = targetList.map((o, i) => {
            o.buffManager.addBuff(ctx, b);
            return { o };
        });
        res.forEach(({ o }) => {
            this.afterHit(ctx, e, o);
        });
    }
}
