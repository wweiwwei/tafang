import { BattleSkillTemplateDamageBuilder } from "../Builder/Template/BattleSkillTemplateDamageBuilder";
import { BattleDisplayEvent } from "../../Display/BattleDisplayEvent";
import { BattleDamage } from "../../Entity/BattleDamage";
import { BattleBattleStageContext } from "../../Processor/BattleBattleStageContext";
import { BattleSkillBaseTemplate } from "./BattleSkillBaseTemplate";
import { BattleTriggerEvent } from "../../Event/BattleTriggerEvent";

export class BattleSkillTemplateDamage extends BattleSkillBaseTemplate {
    hpHurtTotal: number = 0;
    damageTotal: number = 0;
    private handleCb: Function;
    private targetFrame: number;
    process(ctx: BattleBattleStageContext, e: BattleTriggerEvent): boolean {
        this.handleCb = () => {
            this.handleDamage(ctx, e);
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

    handleDamage(ctx: BattleBattleStageContext, e: BattleTriggerEvent) {
        const targetList = this.getTarget(ctx, e);
        const b = this.builder as BattleSkillTemplateDamageBuilder;
        const exempt: any = b._exempt ? b._exempt.build() : {};
        const damageText = b._damageText;
        const res = targetList
            .filter((o) => this.isHappen(ctx) && this.checkCondition(ctx, o, e))
            .map((o, i) => {
                const p = ctx.object.propertyManager.finalProperty;
                const baseValue = ctx.skill.evalValue(b._value, "final", o.propertyManager.finalProperty, this.pre, e);
                const d = BattleDamage.createDamage(p, o, ctx, baseValue, b._tag, exempt, false);
                d.damageText = damageText;
                d.withoutEvent = b._withoutEvent;
                o.propertyManager.handleDamage(d);
                this.damageTotal += d.value;
                this.hpHurtTotal += d.hpHurt;
                if (d.isHit) {
                    if (d.tag.includes("normalAttack")) {
                        // ctx.object.propertyManager.normalAttackEnergyRecover();
                        // 击晕处理
                        if (d.isStun) {
                            o.stateManager.handleNormalAttackStun();
                        }
                        // 吸血处理
                        if (d.finalLifeSteal > 0) {
                            ctx.object.propertyManager.handleLifeSteal(d);
                        }
                        // 连击处理
                        if (d.isCombo) {
                            const d2 = BattleDamage.createDamage(p, o, ctx, baseValue, b._tag, exempt, false);
                            d2.damageText = damageText;
                            d2.withoutEvent = b._withoutEvent;
                            o.propertyManager.handleDamage(d2);
                            this.damageTotal += d2.value;
                            this.hpHurtTotal += d2.hpHurt;
                            if (d2.isHit) {
                                // 击晕处理
                                if (d2.isStun) {
                                    o.stateManager.handleNormalAttackStun();
                                }
                                // 吸血处理
                                if (d2.finalLifeSteal > 0) {
                                    ctx.object.propertyManager.handleLifeSteal(d2);
                                }
                                // 连击不再处理连击，显示连击样式
                                d2.showCombo = true;
                            }
                        }
                    }
                    // ctx.data.emitEvent({
                    //     match: d.source,
                    //     source: d.source,
                    //     target: d.target,
                    //     kind: "afterNormalAttack",
                    //     damage: d,
                    // });
                }
                return { o, d };
            });
        res.forEach(({ o, d }) => {
            if (d.isHit) {
                this.afterHit(ctx, e, o);
            }
        });
        res.forEach(({ o, d }) => {
            if (d.isKill) {
                this.afterKill(ctx, e, o);
            }
        });
    }
}
