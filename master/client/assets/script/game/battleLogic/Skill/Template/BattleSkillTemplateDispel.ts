import { BattleDisplayEvent } from "../../Display/BattleDisplayEvent";
import { BattleTriggerEvent } from "../../Event/BattleTriggerEvent";
import { BattleBattleStageContext } from "../../Processor/BattleBattleStageContext";
import { BattleSkillTemplateDispelBuilder } from "../Builder/Template/BattleSkillTemplateDispelBuilder";
import { BattleSkillBaseTemplate } from "./BattleSkillBaseTemplate";

export class BattleSkillTemplateDispel extends BattleSkillBaseTemplate {
    process(ctx: BattleBattleStageContext, e: BattleTriggerEvent): void {
        const targetList = this.getTarget(ctx, e);
        const b = this.builder as BattleSkillTemplateDispelBuilder;
        let parallel = b._parallel;
        if (parallel) {
            const res = targetList
                .filter((o) => this.isHappen(ctx) && this.checkCondition(ctx, o, e))
                .map((o, i) => {
                    o.dispel(b._mode);
                    let effect = this.buildEffect(ctx.object, o, i, parallel);
                    return { display: effect, o };
                });
            const parallelDisplay = res.map((x) => x.display);
            ctx.data.pushDisplayEvent(new BattleDisplayEvent("parallel", { parallelDisplay }));
            res.forEach(({ o }) => {
                this.afterHit(ctx, e, o);
            });
        } else {
            targetList.forEach((o, i) => {
                if (!this.isHappen(ctx) || !this.checkCondition(ctx, o, e)) return;
                o.dispel(b._mode);
                let effect = this.buildEffect(ctx.object, o, i, parallel);
                ctx.data.pushDisplayEvent(new BattleDisplayEvent("parallel", { parallelDisplay: [effect] }));
                this.afterHit(ctx, e, o);
            });
        }
    }
}
