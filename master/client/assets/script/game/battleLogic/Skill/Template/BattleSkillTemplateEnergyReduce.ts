import { BattleSkillTemplateDamageBuilder } from "../Builder/Template/BattleSkillTemplateDamageBuilder";
import { BattleDisplayEvent } from "../../Display/BattleDisplayEvent";
import { BattleDamage } from "../../Entity/BattleDamage";
import { BattleBattleStageContext } from "../../Processor/BattleBattleStageContext";
import { BattleSkillBaseTemplate } from "./BattleSkillBaseTemplate";
import { BattleSkillTemplateEnergyReduceBuilder } from "../Builder/Template/BattleSkillTemplateEnergyReduceBuilder";
import { BattleEnergyReduce } from "../../Entity/BattleEnergyReduce";
import { BattleTriggerEvent } from "../../Event/BattleTriggerEvent";

export class BattleSkillTemplateEnergyReduce extends BattleSkillBaseTemplate {
    process(ctx: BattleBattleStageContext, e: BattleTriggerEvent): void {
        const targetList = this.getTarget(ctx, e);
        const b = this.builder as BattleSkillTemplateEnergyReduceBuilder;
        let parallel = b._parallel;
        if (parallel) {
            const res = targetList
                .filter((o) => this.isHappen(ctx) && this.checkCondition(ctx, o, e))
                .map((o, i) => {
                    const p = ctx.object.propertyManager.finalProperty;
                    const baseValue = ctx.skill.evalValue(
                        b._value,
                        "final",
                        o.propertyManager.finalProperty,
                        this.pre,
                        e
                    );
                    const r = BattleEnergyReduce.createEnergyReduce(ctx.object, o, baseValue, p);
                    let effect = this.buildEffect(ctx.object, o, i, parallel);
                    let display = effect.concat(o.propertyManager.handleEnergyReduce(r));
                    return { display, o, r };
                });
            const parallelDisplay = res.map((x) => x.display);
            ctx.data.pushDisplayEvent(new BattleDisplayEvent("parallel", { parallelDisplay }));
            res.forEach(({ o, r }) => {
                this.afterHit(ctx, e, o);
            });
        } else {
            targetList.forEach((o, i) => {
                if (!this.isHappen(ctx) || !this.checkCondition(ctx, o, e)) return;
                const p = ctx.object.propertyManager.finalProperty;
                const baseValue = ctx.skill.evalValue(b._value, "final", o.propertyManager.finalProperty, this.pre, e);
                const r = BattleEnergyReduce.createEnergyReduce(ctx.object, o, baseValue, p);
                let effect = this.buildEffect(ctx.object, o, i, parallel);
                let display = effect.concat(o.propertyManager.handleEnergyReduce(r));
                ctx.data.pushDisplayEvent(new BattleDisplayEvent("parallel", { parallelDisplay: [display] }));
                this.afterHit(ctx, e, o);
            });
        }
    }
}
