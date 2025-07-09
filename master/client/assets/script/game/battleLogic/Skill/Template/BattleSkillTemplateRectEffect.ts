import { BattleDisplayEvent } from "../../Display/BattleDisplayEvent";
import { BattleTriggerEvent } from "../../Event/BattleTriggerEvent";
import { BattleRect } from "../../Map/BattleRect";
import { BattleVec } from "../../Map/BattleVec";
import { BattleBattleStageObject } from "../../Object/BattleStage/BattleBattleStageObject";
import { BattleEffect } from "../../Object/Effect/BattleEffect";
import { BattleBattleStageContext } from "../../Processor/BattleBattleStageContext";
import { BattleSkillTemplateRectEffectBuilder } from "../Builder/Template/BattleSkillTemplateRectEffectBuilder";
import { BattleTargetSearch } from "../Target/BattleTargetSearch";
import { BattleSkillBaseTemplate } from "./BattleSkillBaseTemplate";

export class BattleSkillTemplateRectEffect extends BattleSkillBaseTemplate {
    private handleCb: Function;
    private targetFrame: number;
    protected process(ctx: BattleBattleStageContext, e: BattleTriggerEvent): boolean {
        this.lockDirection(ctx, e);
        this.handleDirection(ctx, e);
        this.initEffect(ctx, e);
        this.handleCb = () => {
            this.handleRectEffect(ctx, e);
        };
        this.targetFrame = ctx.data.frame + this.builder._delay / GConstant.battle.logicTick;
        return false;
    }

    private hasLaunch = 0;
    private angle = 0;
    private effectWithControl: BattleEffect;
    private targetBeginPos = { x: 1, y: 0 };

    lockDirection(ctx: BattleBattleStageContext, e: BattleTriggerEvent) {
        const targetList = this.getTarget(ctx, e);
        if (targetList.length === 0) return;
        const t = targetList[0];
        const [x, y] = t.position;
        this.targetBeginPos = { x, y };
        const selfPos = ctx.object.position;
        this.angle = (Math.atan2(y - selfPos[1], x - selfPos[0]) * 180) / Math.PI;
    }

    initEffect(ctx: BattleBattleStageContext, e: BattleTriggerEvent) {
        const b = this.builder as BattleSkillTemplateRectEffectBuilder;
        if (b._effectWithControl[0]) {
            this.effectWithControl = new BattleEffect();
            this.effectWithControl.effectName = b._effectWithControl[0]._effectName;
            this.effectWithControl.effectAnimation = b._effectWithControl[0]._effectAnimation;
            this.effectWithControl.loop = false;
            this.effectWithControl.scaleX = 1;
            this.effectWithControl.scaleY = 1;
            this.syncEffect(ctx, e);
            ctx.data.pushDisplayEvent(
                new BattleDisplayEvent("addEffectWithControl", {
                    effect: this.effectWithControl,
                })
            );
        }
    }

    syncEffect(ctx: BattleBattleStageContext, e: BattleTriggerEvent) {
        if (this.effectWithControl) {
            const b = this.builder as BattleSkillTemplateRectEffectBuilder;
            const [x, y] = ctx.object.position;
            const direction = ctx.object.fsmManager.viewModel.direction.x;
            this.effectWithControl.position = {
                x: direction > 0 ? x + b._effectWithControl[0]._offset[0] : x - b._effectWithControl[0]._offset[0],
                y: y + b._effectWithControl[0]._offset[1],
            };
            this.effectWithControl.angle = this.angle;
        }
    }

    tick(ctx: BattleBattleStageContext): boolean {
        if (ctx.data.frame >= this.targetFrame) {
            const b = this.builder as BattleSkillTemplateRectEffectBuilder;
            this.handleCb();
            return this.hasLaunch >= Number(b._count);
        } else {
            return false;
        }
    }

    handleDirection(ctx: BattleBattleStageContext, e: BattleTriggerEvent) {
        const targetList = this.getTarget(ctx, e);
        if (targetList.length === 0) return;
        const t = targetList[0];
        const selfX = ctx.object.position[0];
        const targetX = t.position[0];
        if (selfX < targetX) {
            ctx.object.fsmManager.turnRight();
        } else {
            ctx.object.fsmManager.turnLeft();
        }
    }

    handleRectEffect(ctx: BattleBattleStageContext, e: BattleTriggerEvent) {
        const targetList = this.getTarget(ctx, e);
        const b = this.builder as BattleSkillTemplateRectEffectBuilder;
        this.hasLaunch++;
        this.targetFrame = ctx.data.frame + Number(b._interval) / GConstant.battle.logicTick;
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
        this.hitCheckNormal(ctx, e, targetList, baseSearchTarget);
    }

    /** 任意角度 */
    private hitCheckNormal(
        ctx: BattleBattleStageContext,
        e: BattleTriggerEvent,
        targetList: BattleBattleStageObject[],
        baseSearchTarget: BattleBattleStageObject[]
    ) {
        const b = this.builder as BattleSkillTemplateRectEffectBuilder;
        const width = b._width;
        // 垂线距离取矩形高的一半
        const height = b._height * 0.5;
        const pa = { x: ctx.object.position[0], y: ctx.object.position[1] };
        const pb = this.targetBeginPos;
        const allTarget = baseSearchTarget.filter((o) => {
            const pc = { x: o.position[0], y: o.position[1] };
            // 垂线距离
            const [distance, inter] = BattleVec.calculateDistanceToLine(pa, pb, pc);
            const offset = { x: inter.x - pa.x, y: inter.y - pa.y };
            // 到垂线交点的距离
            const distance2 = Math.sqrt(offset.x * offset.x + offset.y * offset.y);
            // 方向判定
            const offset2 = { x: pc.x - pa.x, y: pc.y - pa.y };
            const offset3 = { x: pb.x - pa.x, y: pb.y - pa.y };
            const dot = offset2.x * offset3.x + offset2.y * offset3.y;
            return dot > 0 && height >= distance && width >= distance2;
        });
        allTarget.forEach((o) => {
            this.afterHit(ctx, e, o);
        });
    }
    /** 仅水平方向 */
    private hitCheckOnlyHorizon(
        ctx: BattleBattleStageContext,
        e: BattleTriggerEvent,
        targetList: BattleBattleStageObject[],
        baseSearchTarget: BattleBattleStageObject[]
    ) {
        const b = this.builder as BattleSkillTemplateRectEffectBuilder;
        const width = b._width;
        const height = b._height;
        const selfPos = ctx.object.position;
        const direction = ctx.object.fsmManager.viewModel.direction.x;
        let x = 0;
        let y = 0;
        if (direction > 0) {
            // 向右
            x = selfPos[0];
            y = selfPos[1] - height / 2;
        } else {
            // 向左
            x = selfPos[0] - width;
            y = selfPos[1] - height / 2;
        }
        const rect = new BattleRect(x, y, width, height);
        const allTarget = baseSearchTarget.filter((o) => rect.isInRect(o.position[0], o.position[1]));
        allTarget.forEach((o) => {
            this.afterHit(ctx, e, o);
        });
    }
}
