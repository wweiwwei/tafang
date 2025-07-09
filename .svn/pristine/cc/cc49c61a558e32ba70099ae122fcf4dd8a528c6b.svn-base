import { BattleDisplayEvent } from "../../Display/BattleDisplayEvent";
import { BattleHeal } from "../../Entity/BattleHeal";
import { BattleTriggerEvent } from "../../Event/BattleTriggerEvent";
import { BattleBattleStageContext } from "../../Processor/BattleBattleStageContext";
import { BattleSkillTemplateReviveBuilder } from "../Builder/Template/BattleSkillTemplateReviveBuilder";
import { BattleSkillBaseTemplate } from "./BattleSkillBaseTemplate";

export class BattleSkillTemplateRevive extends BattleSkillBaseTemplate {
    process(ctx: BattleBattleStageContext, e: BattleTriggerEvent): boolean {
        const targetList = this.getTarget(ctx, e);
        const b = this.builder as BattleSkillTemplateReviveBuilder;
        let parallel = b._parallel;
        if (parallel) {
            const res = targetList
                .filter((o) => this.isHappen(ctx) && this.checkCondition(ctx, o, e))
                .map((o, i) => {
                    o.revive();
                    const p = ctx.object.propertyManager.finalProperty;
                    const baseValue = ctx.skill.evalValue(
                        b._value,
                        "final",
                        o.propertyManager.finalProperty,
                        this.pre,
                        e
                    );
                    const h = BattleHeal.createHeal(ctx.object, o, baseValue, p);
                    let effect = this.buildEffect(ctx.object, o, i, parallel);
                    let display = effect.concat(o.propertyManager.handleHeal(h));
                    return { display, o };
                });
            const parallelDisplay = res.map((x) => x.display);
            ctx.data.pushDisplayEvent(new BattleDisplayEvent("parallel", { parallelDisplay }));
            res.forEach(({ o }) => {
                this.afterHit(ctx, e, o);
            });
        } else {
            targetList.forEach((o, i) => {
                if (!this.isHappen(ctx) || !this.checkCondition(ctx, o, e)) return;
                o.revive();
                const p = ctx.object.propertyManager.finalProperty;
                const baseValue = ctx.skill.evalValue(b._value, "final", o.propertyManager.finalProperty, this.pre, e);
                const h = BattleHeal.createHeal(ctx.object, o, baseValue, p);
                let effect = this.buildEffect(ctx.object, o, i, parallel);
                let display = effect.concat(o.propertyManager.handleHeal(h));
                ctx.data.pushDisplayEvent(new BattleDisplayEvent("parallel", { parallelDisplay: [display] }));
                this.afterHit(ctx, e, o);
            });
        }
    }
}
