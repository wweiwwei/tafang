import { BattleDisplayEvent } from "../../Display/BattleDisplayEvent";
import { BattleTriggerEvent } from "../../Event/BattleTriggerEvent";
import { BattleBattleStageContext } from "../../Processor/BattleBattleStageContext";
import { BattleSkillTemplateAuraBuilder } from "../Builder/Template/BattleSkillTemplateAuraBuilder";
import { BattleSkillTemplateDispelBuilder } from "../Builder/Template/BattleSkillTemplateDispelBuilder";
import { BattleSkillBaseTemplate } from "./BattleSkillBaseTemplate";

export class BattleSkillTemplateGroup extends BattleSkillBaseTemplate {
    process(ctx: BattleBattleStageContext, e: BattleTriggerEvent): void {
        // todo
        // const targetList = this.getTarget(ctx, e);
        // const b = this.builder as BattleSkillTemplateAuraBuilder;
        // let parallel = b._parallel;
        // if (parallel) {
        //     const res = targetList.map((o, i) => {
        //         o.dispel(b._mode);
        //         let effect = this.buildEffect(ctx.object, o, i, parallel);
        //         return { display: effect, o };
        //     });
        //     const parallelDisplay = res.map((x) => x.display);
        //     ctx.data.pushDisplayEvent(new BattleDisplayEvent("parallel", { parallelDisplay }));
        //     res.forEach(({ o }) => {
        //         this.afterHit(ctx, e, o, autoNext);
        //     });
        // } else {
        //     targetList.forEach((o, i) => {
        //         o.dispel(b._mode);
        //         let effect = this.buildEffect(ctx.object, o, i, parallel);
        //         ctx.data.pushDisplayEvent(new BattleDisplayEvent("parallel", { parallelDisplay: [effect] }));
        //         this.afterHit(ctx, e, o, autoNext);
        //     });
        // }
        // if (autoNext) {
        //     this.processNext(ctx, e, autoNext);
        // }
    }
}
