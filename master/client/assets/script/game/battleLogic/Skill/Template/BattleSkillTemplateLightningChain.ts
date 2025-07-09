import { BattleDisplayEvent } from "../../Display/BattleDisplayEvent";
import { BattleTriggerEvent } from "../../Event/BattleTriggerEvent";
import { BattleVec } from "../../Map/BattleVec";
import { BattleBattleStageObject } from "../../Object/BattleStage/BattleBattleStageObject";
import { BattleBattleStageContext } from "../../Processor/BattleBattleStageContext";
import { BattleSkillTemplateLightningChainBuilder } from "../Builder/Template/BattleSkillTemplateLightningChainBuilder";
import { BattleTargetSearch } from "../Target/BattleTargetSearch";
import { BattleSkillBaseTemplate } from "./BattleSkillBaseTemplate";

export class BattleSkillTemplateLightningChain extends BattleSkillBaseTemplate {
    private handleCb: Function;
    private targetFrame: number;
    protected process(ctx: BattleBattleStageContext, e: BattleTriggerEvent): boolean {
        this.handleCb = () => {
            this.handleLightningChain(ctx, e);
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

    handleLightningChain(ctx: BattleBattleStageContext, e: BattleTriggerEvent) {
        const targetList = this.getTarget(ctx, e);
        const b = this.builder as BattleSkillTemplateLightningChainBuilder;
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
        const bounce = ctx.skill.evalValue(b._bounce, "final");
        targetList.forEach((t) => {
            // 闪电链跳转逻辑
            const hasSelect = [ctx.object];
            let last: BattleBattleStageObject = ctx.object;
            let first = true;
            while (true) {
                // 数量满了
                let o: BattleBattleStageObject;
                if (first) {
                    o = t;
                    first = false;
                } else {
                    if (hasSelect.length >= bounce + 2) break;
                    const inRange = baseSearchTarget.filter(
                        (o) => o.distance(last) < (first ? ctx.skill.getRange() : 300) && !hasSelect.includes(o)
                    );
                    first = false;
                    // 找不到目标
                    if (inRange.length === 0) break;
                    o = ctx.data.sr.rdArrayElement(inRange, 1)[0];
                }
                const distance = last.distance(o);
                const sub = BattleVec.sub(last.position, o.position);
                const angle = this.getAngle(sub) + 90;
                ctx.data.pushDisplayEvent(
                    new BattleDisplayEvent("showEffect", {
                        effectName: "Skill_Lightningchain",
                        effectAnimation: "attack",
                        offset: sub,
                        parentType: "target",
                        obj: o,
                        scale: 1,
                        option: {
                            scaleX: 1,
                            scaleY: distance / 250,
                            angle,
                        },
                    })
                );
                this.afterHit(ctx, e, o);
                hasSelect.push(o);
                last = o;
            }
            // let copyTarget = baseSearchTarget.map((e) => e);
            // copyTarget = copyTarget.filter((e) => e !== t);
            // const allTarget = ctx.data.sr.rdArrayElement(copyTarget, Math.min(bounce, copyTarget.length));
            // allTarget.unshift(t);
            // allTarget.forEach((o, i) => {
            //     const last = i === 0 ? ctx.object : allTarget[i - 1];
            //     const distance = last.distance(o);
            //     const sub = BattleVec.sub(last.position, o.position);
            //     const angle = this.getAngle(sub) + 90;
            //     ctx.data.pushDisplayEvent(
            //         new BattleDisplayEvent("showEffect", {
            //             effectName: "Skill_Lightningchain",
            //             effectAnimation: "attack",
            //             offset: sub,
            //             parentType: "target",
            //             obj: o,
            //             scale: 1,
            //             option: {
            //                 scaleX: 1,
            //                 scaleY: distance / 250,
            //                 angle,
            //             },
            //         })
            //     );
            //     this.afterHit(ctx, e, o);
            // });
        });
    }

    getAngle(direction: number[]) {
        return (Math.atan2(direction[1], direction[0]) * 180) / Math.PI;
    }
}
