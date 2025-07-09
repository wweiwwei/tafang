import { BattleSkillBaseTemplateBuilder } from "../Builder/Template/BattleSkillBaseTemplateBuilder";
import { BattleDisplayEvent } from "../../Display/BattleDisplayEvent";
import { BattleBattleStageObject } from "../../Object/BattleStage/BattleBattleStageObject";
import { BattleBattleStageContext } from "../../Processor/BattleBattleStageContext";
import { BattleTriggerEvent } from "../../Event/BattleTriggerEvent";

export abstract class BattleSkillBaseTemplate {
    /** 上一流程 */
    pre: BattleSkillBaseTemplate = null;
    /** 原始缓存目标 */
    protected originCache: BattleBattleStageObject[] = [];
    protected targetCache: BattleBattleStageObject[] = [];
    constructor(public builder: BattleSkillBaseTemplateBuilder) {}
    launch(ctx: BattleBattleStageContext, e: BattleTriggerEvent, targetCache: BattleBattleStageObject[] = []): boolean {
        this.targetCache = targetCache;
        this.originCache = targetCache;
        const targetList = this.getTarget(ctx, e);
        this.buildEffect(ctx, targetList);
        return this.process(ctx, e);
        // while (
        //     this.builder._conditionRepeat &&
        //     AstUtil.eval(this.builder._conditionRepeat, [
        //         {
        //             ctx: ctx,
        //             targetList: this.targetCache,
        //         },
        //     ])
        // ) {
        //     this.process(ctx, e);
        // }
        // this.processNext(ctx, e);
    }

    protected abstract process(ctx: BattleBattleStageContext, e: BattleTriggerEvent): boolean;

    /** 无视距离获取目标 */
    getTargetIgnoreRange(ctx: BattleBattleStageContext, e: BattleTriggerEvent) {
        if (this.builder.target) {
            const s = this.builder.target.build();
            const list = s.searchTarget(ctx, e);
            this.targetCache = list;
            return list;
        } else {
            return this.targetCache;
        }
    }
    /** 获取目标 */
    getTarget(ctx: BattleBattleStageContext, e: BattleTriggerEvent): BattleBattleStageObject[] {
        if (this.builder.target) {
            const s = this.builder.target.build();
            const list = s.searchTarget(ctx, e);
            this.targetCache = list;
            return list;
        } else {
            return this.targetCache || [];
        }
    }

    protected afterHit(ctx: BattleBattleStageContext, e: BattleTriggerEvent, o: BattleBattleStageObject) {
        if (this.builder.afterHit && ctx.data.sr.isHappen(this.builder.afterHitProbability)) {
            const t = this.builder.afterHit.build();
            t.launch(ctx, e, [o]);
        }
    }
    protected afterKill(ctx: BattleBattleStageContext, e: BattleTriggerEvent, o: BattleBattleStageObject) {
        if (this.builder.afterKill && ctx.data.sr.isHappen(this.builder.afterKillProbability)) {
            const t = this.builder.afterKill.build();
            t.launch(ctx, e, [o]);
        }
    }
    private processNext(ctx: BattleBattleStageContext, e: BattleTriggerEvent) {
        if (this.builder.next) {
            const t = this.builder.next.build();
            t.launch(ctx, e, this.targetCache);
        }
    }

    protected isHappen(ctx: BattleBattleStageContext) {
        if (this.builder._triggerProbability) {
            const p = ctx.skill.evalValue(this.builder._triggerProbability, "final", null, this.pre);
            return p > ctx.data.sr.next();
        } else {
            return true;
        }
    }

    protected checkCondition(
        ctx: BattleBattleStageContext,
        target: BattleBattleStageObject,
        triggerEvent: BattleTriggerEvent
    ) {
        if (this.builder._triggerCondition) {
            const ok = ctx.skill.evalCondition(
                this.builder._triggerCondition,
                "final",
                target.propertyManager.finalProperty,
                this.pre,
                triggerEvent
            );
            return ok;
        } else {
            return true;
        }
    }

    protected buildEffect(ctx: BattleBattleStageContext, targetList: BattleBattleStageObject[]) {
        const obj = ctx.object;
        return this.builder._effect.map((e) => {
            targetList.forEach((target) => {
                let option: {
                    scaleX: number;
                    scaleY: number;
                    angle: number;
                };
                if (e._withDirection) {
                    const [x, y] = target.position;
                    const selfPos = ctx.object.position;
                    const angle = (Math.atan2(y - selfPos[1], x - selfPos[0]) * 180) / Math.PI - 90;
                    option = {
                        scaleX: 1,
                        scaleY: 1,
                        angle,
                    };
                }
                const effect = new BattleDisplayEvent("showEffect", {
                    effectName: e._effectName,
                    effectAnimation: e._effectAnimation,
                    offset: e._offset,
                    parentType: e._positionType === "scene" ? "scene" : "target",
                    obj: e._positionType === "self" ? obj : target,
                    scale: e._scale,
                    option,
                });
                ctx.data.pushDisplayEvent(effect);
            });
        });
    }

    tick(ctx: BattleBattleStageContext): boolean {
        return true;
    }
}
