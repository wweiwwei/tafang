import { BattleTargetBuilder } from "../Builder/Target/BattleTargetBuilder";
import { BattleBattleStageObject } from "../../Object/BattleStage/BattleBattleStageObject";
import { BattleBattleStageContext } from "../../Processor/BattleBattleStageContext";
import { BattleTriggerEvent } from "../../Event/BattleTriggerEvent";

export class BattleTargetSearch {
    constructor(private baseTarget: string, private _processList: { kind: string; param: any[] }[]) {}

    searchTarget(ctx: BattleBattleStageContext, e: BattleTriggerEvent) {
        const baseTarget = this._baseTarget(ctx, e);
        return this._processTarget(ctx, e, baseTarget);
    }

    static searchBaseTarget(
        baseTarget: string,
        ctx: BattleBattleStageContext,
        e: BattleTriggerEvent
    ): BattleBattleStageObject[] {
        let res: BattleBattleStageObject[] = [];
        switch (baseTarget) {
            case "triggerEventSource": {
                res = [e.source];
                break;
            }
            case "triggerEventTarget": {
                res = [e.target];
                break;
            }
            case "self": {
                res = [ctx.object];
                break;
            }
            case "selfTeam": {
                if (ctx.object.teamSide === 0) {
                    ctx.data.attackTeam.forEach((v) => {
                        res.push(v);
                    });
                } else {
                    ctx.data.defendTeam.forEach((v) => {
                        res.push(v);
                    });
                }
                break;
            }
            case "enemyTeam": {
                if (ctx.object.teamSide === 0) {
                    ctx.data.defendTeam.forEach((v) => {
                        res.push(v);
                    });
                } else {
                    ctx.data.attackTeam.forEach((v) => {
                        res.push(v);
                    });
                }
                break;
            }
            case "selfTeamExcludeSelf": {
                if (ctx.object.teamSide === 0) {
                    ctx.data.attackTeam.forEach((v) => {
                        if (v !== ctx.object) res.push(v);
                    });
                } else {
                    ctx.data.defendTeam.forEach((v) => {
                        if (v !== ctx.object) res.push(v);
                    });
                }
                break;
            }
            case "enemyWall": {
                if (ctx.object.teamSide === 0) {
                    ctx.data.defendTeam.forEach((v) => {
                        if (v.objectType === GConstant.battle.battleObjectType.wall) res.push(v);
                    });
                } else {
                    ctx.data.attackTeam.forEach((v) => {
                        if (v.objectType === GConstant.battle.battleObjectType.wall) res.push(v);
                    });
                }
                break;
            }
            case "selfWall": {
                if (ctx.object.teamSide === 0) {
                    ctx.data.attackTeam.forEach((v) => {
                        if (v.objectType === GConstant.battle.battleObjectType.wall) res.push(v);
                    });
                } else {
                    ctx.data.defendTeam.forEach((v) => {
                        if (v.objectType === GConstant.battle.battleObjectType.wall) res.push(v);
                    });
                }
                break;
            }
            // case "selfTeamDead": {
            //     if (ctx.object.teamSide === 0) {
            //         res = ctx.object.ctx.data.attackTeam.filter((x) => x && !x.isAlive);
            //     } else {
            //         res = ctx.object.ctx.data.defendTeam.filter((x) => x && !x.isAlive);
            //     }
            //     break;
            // }
        }
        return res;
    }

    private _baseTarget(ctx: BattleBattleStageContext, e: BattleTriggerEvent): BattleBattleStageObject[] {
        return BattleTargetSearch.searchBaseTarget(this.baseTarget, ctx, e);
    }

    private _processTarget(
        ctx: BattleBattleStageContext,
        e: BattleTriggerEvent,
        baseTarget: BattleBattleStageObject[]
    ): BattleBattleStageObject[] {
        let res = baseTarget;
        this._processList.forEach((p) => {
            res = this[p.kind](ctx, e, baseTarget, p.param);
        });
        return res;
    }

    private ascBy(
        ctx: BattleBattleStageContext,
        e: BattleTriggerEvent,
        baseTarget: BattleBattleStageObject[],
        param: any[]
    ): BattleBattleStageObject[] {
        const p = param[0];
        baseTarget.sort((a, b) => {
            const ap = ctx.object.propertyManager.finalProperty[p];
            const bp = ctx.object.propertyManager.finalProperty[p];
            return ap - bp;
        });
        return baseTarget;
    }
    private descBy(
        ctx: BattleBattleStageContext,
        e: BattleTriggerEvent,
        baseTarget: BattleBattleStageObject[],
        param: any[]
    ): BattleBattleStageObject[] {
        const p = param[0];
        baseTarget.sort((a, b) => {
            const ap = ctx.object.propertyManager.finalProperty[p];
            const bp = ctx.object.propertyManager.finalProperty[p];
            return bp - ap;
        });
        return baseTarget;
    }
    private random(
        ctx: BattleBattleStageContext,
        e: BattleTriggerEvent,
        baseTarget: BattleBattleStageObject[],
        param: any[]
    ): BattleBattleStageObject[] {
        const count = ctx.skill.evalValue(param[0], "final");
        return ctx.data.sr.rdArrayElement(baseTarget, count);
    }

    private concat(
        ctx: BattleBattleStageContext,
        e: BattleTriggerEvent,
        baseTarget: BattleBattleStageObject[],
        param: any[]
    ): BattleBattleStageObject[] {
        const builder: BattleTargetBuilder = param[0];
        const s = builder.build();
        const res = s.searchTarget(ctx, e);
        const set = new Set(res.concat(baseTarget));
        return Array.from(set);
    }

    private filter(
        ctx: BattleBattleStageContext,
        e: BattleTriggerEvent,
        baseTarget: BattleBattleStageObject[],
        param: any[]
    ): BattleBattleStageObject[] {
        const res = baseTarget.filter((x) =>
            ctx.skill.evalCondition(param[0], "final", x.propertyManager.finalProperty)
        );
        return res;
    }
    private take(
        ctx: BattleBattleStageContext,
        e: BattleTriggerEvent,
        baseTarget: BattleBattleStageObject[],
        param: any[]
    ): BattleBattleStageObject[] {
        const count = ctx.skill.evalValue(param[0], "final");
        return baseTarget.slice(0, count);
    }

    private nearestLock(
        ctx: BattleBattleStageContext,
        e: BattleTriggerEvent,
        baseTarget: BattleBattleStageObject[],
        param: any[]
    ): BattleBattleStageObject[] {
        const old = baseTarget.find((o) => o.uid === ctx.object.lockNearest);
        if (old) {
            return [old];
        }
        if (baseTarget.length === 0) {
            ctx.object.lockNearest = -1;
            return baseTarget;
        }
        const near = GUtils.array.chain(baseTarget).minBy((o) => ctx.object.distance(o));
        ctx.object.lockNearest = near.uid;
        return [near];
    }

    private near(
        ctx: BattleBattleStageContext,
        e: BattleTriggerEvent,
        baseTarget: BattleBattleStageObject[],
        param: any[]
    ): BattleBattleStageObject[] {
        const count = ctx.skill.evalValue(param[0], "final");
        baseTarget.sort((a, b) => {
            const ap = ctx.object.distance(a);
            const bp = ctx.object.distance(b);
            return ap - bp;
        });
        return baseTarget.slice(0, count);
    }

    private range(
        ctx: BattleBattleStageContext,
        e: BattleTriggerEvent,
        baseTarget: BattleBattleStageObject[],
        param: any[]
    ): BattleBattleStageObject[] {
        const range = ctx.skill.evalValue(param[0], "final");
        return baseTarget.filter((o) => ctx.object.distance(o) < range);
    }

    private skillRange(
        ctx: BattleBattleStageContext,
        e: BattleTriggerEvent,
        baseTarget: BattleBattleStageObject[],
        param: any[]
    ): BattleBattleStageObject[] {
        const range = ctx.skill.getRange();
        return baseTarget.filter((o) => ctx.object.distance(o) < range);
    }

    private centerRect(
        ctx: BattleBattleStageContext,
        e: BattleTriggerEvent,
        baseTarget: BattleBattleStageObject[],
        param: any[]
    ): BattleBattleStageObject[] {
        const [width, height] = param;
        const [x, y] = ctx.object.position;
        const top = y + height / 2;
        const bottom = y - height / 2;
        const left = x - width / 2;
        const right = x + width / 2;
        return baseTarget.filter((o) => {
            const [ox, oy] = o.position;
            return ox < right && ox > left && oy < top && oy > bottom;
        });
    }

    private nearAndEquipmentFirst(
        ctx: BattleBattleStageContext,
        e: BattleTriggerEvent,
        baseTarget: BattleBattleStageObject[],
        param: any[]
    ): BattleBattleStageObject[] {
        const count = ctx.skill.evalValue(param[0], "final");
        const equipment: BattleBattleStageObject[] = [];
        const notEquipment: BattleBattleStageObject[] = [];
        baseTarget.forEach((o) => {
            const isEqup = o.extraInfo && o.extraInfo.equipmentMonsterUniqueId >= 0;
            if (isEqup) {
                equipment.push(o);
            } else {
                notEquipment.push(o);
            }
        });
        equipment.sort((a, b) => {
            const ap = ctx.object.distance(a);
            const bp = ctx.object.distance(b);
            return ap - bp;
        });
        notEquipment.sort((a, b) => {
            const ap = ctx.object.distance(a);
            const bp = ctx.object.distance(b);
            return ap - bp;
        });
        return equipment.concat(notEquipment).slice(0, count);
    }

    private nearBottom(
        ctx: BattleBattleStageContext,
        e: BattleTriggerEvent,
        baseTarget: BattleBattleStageObject[],
        param: any[]
    ): BattleBattleStageObject[] {
        const count = ctx.skill.evalValue(param[0], "final");
        baseTarget.sort((a, b) => a.position[1] - b.position[1]);
        return baseTarget.slice(0, count);
    }

    private onlyPlayer(
        ctx: BattleBattleStageContext,
        e: BattleTriggerEvent,
        baseTarget: BattleBattleStageObject[],
        param: any[]
    ): BattleBattleStageObject[] {
        return baseTarget.filter((o) => o.objectType === GConstant.battle.battleObjectType.hero);
    }

    private excludeBoss(
        ctx: BattleBattleStageContext,
        e: BattleTriggerEvent,
        baseTarget: BattleBattleStageObject[],
        param: any[]
    ): BattleBattleStageObject[] {
        return baseTarget.filter((o) => !o.propertyManager.heroTag.includes("boss"));
    }

    private excludeBossOrElite(
        ctx: BattleBattleStageContext,
        e: BattleTriggerEvent,
        baseTarget: BattleBattleStageObject[],
        param: any[]
    ): BattleBattleStageObject[] {
        return baseTarget.filter(
            (o) => !o.propertyManager.heroTag.includes("boss") && !o.propertyManager.heroTag.includes("elite")
        );
    }
}
