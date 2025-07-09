import { BattleBattleStageObject } from "../../Object/BattleStage/BattleBattleStageObject";
import { BattleBattleStageContext } from "../../Processor/BattleBattleStageContext";
import { BattleSkillConfigNode, BattleSkillNodeType } from "../BattleSkillConfigGraph";

export class BattleSkillTargetSelectManager {
    constructor(public ctx: BattleBattleStageContext, public nodeId: number) {
        const config = this.nodeConfig;
        if (config.type === BattleSkillNodeType.BaseTarget) {
        } else if (config.type === BattleSkillNodeType.TargetSelectGroup) {
        } else {
            throw new Error(`未知目标选择类型${this.nodeKey}`);
        }
    }

    get nodeConfig() {
        const graph = this.ctx.skill.graph;
        return graph.getNodeById(this.nodeId);
    }

    get nodeKey(): string {
        return `${this.ctx.skill.id}_${this.nodeId}`;
    }

    /** 索敌结果缓存 */
    targetCache: number[];

    isReachable() {
        const range = this.range();
        return this.getSearchTarget().some((o) => o.distance(this.ctx.object) <= range);
    }

    range() {
        if (this.ctx.skill.skillCategory === "normalAttack") {
            const range = Math.round(this.ctx.object.propertyManager.finalProperty.normalAttackRange);
            return range;
        } else {
            const range = Math.round(this.ctx.object.propertyManager.finalProperty.skillRange);
            return range;
        }
    }

    // 下一个需要移动的位置
    // nextPosToMove(): number[] | null {
    //     // todo 获取下一个需要移动的位置
    //     const target = this.getTarget()
    //     if (this.ctx.skill.isNormalAttack) {
    //         const range = Math.round(this.ctx.object.propertyManager.finalProperty.normalAttackRange * 0.0001)
    //         const desPos = this.ctx.data.battleMap.getAttackPos(this.ctx.object.position, target[0].position, range)
    //         const res = this.ctx.data.battleMap.findPath(this.ctx.object.position, desPos)
    //         return res
    //     } else {
    //         // todo 矩形区域
    //     }
    // }

    initTarget() {
        if (this.targetCache) return;
        this.targetCache = this.getTarget().map((t) => t.uid);
    }

    clearTarget() {
        this.targetCache = null;
    }

    /** 获取索敌目标 */
    getSearchTarget() {
        const config = this.nodeConfig;
        if (config.type === BattleSkillNodeType.BaseTarget) {
            const key = config.getProperties("baseTarget");
            return this.findBaseTarget(key);
        } else if (config.type === BattleSkillNodeType.TargetSelectGroup) {
            const baseTarget = config.getInput("baseTarget");
            let res = this.findBaseTarget(baseTarget.getProperties("baseTarget"));
            for (let i = 1; i <= 5; i++) {
                const p = config.getInput("process" + i);
                if (p) {
                    res = this.process(res, this.ctx, p);
                } else {
                    break;
                }
            }
            return res;
        } else {
            throw new Error(`未知目标选择类型${this.nodeKey}`);
        }
    }

    /** 获取攻击目标 */
    getTarget() {
        if (this.targetCache) {
            const obj = this.ctx.skill.targetSelectManager.targetCache.map((uid) => this.ctx.data.getObjectByUid(uid));
            return obj.filter((o) => o);
        }
        return this.getSearchTarget().filter((o) => {
            return o.distance(this.ctx.object) <= this.range();
        });
    }

    findBaseTarget(key: string): BattleBattleStageObject[] {
        // todo 存活检查
        switch (key) {
            case "self":
                return [this.ctx.object];
            case "selfTeam": {
                const res: BattleBattleStageObject[] = [];
                if (this.ctx.object.teamSide === 0) {
                    this.ctx.data.attackTeam.forEach((h) => res.push(h));
                } else {
                    this.ctx.data.defendTeam.forEach((h) => res.push(h));
                }
                return res;
            }
            case "selfTeamExcludeSelf": {
                const res: BattleBattleStageObject[] = [];
                if (this.ctx.object.teamSide === 0) {
                    this.ctx.data.attackTeam.forEach((h) => {
                        if (h !== this.ctx.object) res.push(h);
                    });
                } else {
                    this.ctx.data.defendTeam.forEach((h) => {
                        if (h !== this.ctx.object) res.push(h);
                    });
                }
                return res;
            }
            case "enemyTeam": {
                const res: BattleBattleStageObject[] = [];
                if (this.ctx.object.teamSide === 0) {
                    this.ctx.data.defendTeam.forEach((h) => res.push(h));
                } else {
                    this.ctx.data.attackTeam.forEach((h) => res.push(h));
                }
                return res;
            }
            case "target": {
                const obj = this.ctx.skill.targetSelectManager.targetCache.map((uid) =>
                    this.ctx.data.getObjectByUid(uid)
                );
                return obj.filter((o) => o);
            }
            case "launcher":
                return [this.ctx.object];
            case "attacker": {
                const obj = this.ctx.data.getObjectByUid(this.ctx.object.attacker);
                if (obj) return [obj];
                return [];
            }
            case "lockNearest": {
                const obj = this.ctx.data.getObjectByUid(this.ctx.object.lockNearest);
                if (obj) return [obj];
                const enemyTeam = this.findBaseTarget("enemyTeam");
                const res = BattleTargetSelectProcess.minBy(enemyTeam, this.ctx, "target.distance(self)");
                if (res.length > 0) this.ctx.object.lockNearest = res[0].uid;
                return res;
            }
            case "lockFarthest": {
                const obj = this.ctx.data.getObjectByUid(this.ctx.object.lockFarthest);
                if (obj) return [obj];
                const enemyTeam = this.findBaseTarget("enemyTeam");
                const res = BattleTargetSelectProcess.maxBy(enemyTeam, this.ctx, "target.distance(self)");
                if (res.length > 0) this.ctx.object.lockFarthest = res[0].uid;
                return res;
            }
            case "targetPriority": {
                // todo 优先级逻辑
                const priorityList =
                    this.ctx.data.ctx.mode === "pve"
                        ? this.ctx.skill.graph.tbl.targetPriority
                        : this.ctx.skill.graph.tbl.pvpTargetPriority;
                let res: BattleBattleStageObject[] = [];
                const range = this.ctx.skill.skillRange();
                const enemyTeam = this.findBaseTarget("enemyTeam");
                for (let i = 0; i < priorityList.length; i++) {
                    const p = priorityList[i];
                    switch (p) {
                        case "1":
                        case "2": {
                            const index = Number(p);
                            res = enemyTeam.filter((o) => o.heroIndex === index);
                            break;
                        }
                        case "3": {
                            const base = enemyTeam.filter((o) => o.heroIndex > 2 && o.heroIndex < 8);
                            res = BattleTargetSelectProcess.minBy(base, this.ctx, "target.distance(self)");
                            break;
                        }
                        case "4": {
                            const base = enemyTeam.filter((o) => o.heroIndex > 2 && o.heroIndex < 8);
                            res = BattleTargetSelectProcess.maxBy(base, this.ctx, "target.distance(self)");
                            break;
                        }
                        // case "a":
                        // case "b":
                        // case "c":
                        // case "d":
                        // case "e":
                        // case "f": {
                        //     const indexMap = {
                        //         a: [2, 3],
                        //         b: [4, 5],
                        //         c: [3, 5],
                        //         d: [2, 4],
                        //         e: [2, 3, 4, 5],
                        //         f: [0, 1, 2, 3, 4, 5],
                        //     };
                        //     const indexList = indexMap[p];
                        //     res = enemyTeam.filter((o) => indexList.includes(o.heroIndex));
                        //     if (res.length > 0) res = BattleTargetSelectProcess.randomTake(res, this.ctx, 1);
                        //     break;
                        // }
                        case "r":
                        case "s": {
                            const base: BattleBattleStageObject[] = enemyTeam.filter((o) => {
                                return o.getMonsterMoveType() === (p === "r" ? 1 : 2);
                            });
                            res = BattleTargetSelectProcess.minBy(base, this.ctx, "target.distance(self)");
                            // .filter(
                            //     (o) => {
                            //         return o.distance(this.ctx.object) < range;
                            //     }
                            // );
                            break;
                        }
                    }
                    if (res.length > 0) break;
                }
                return res;
            }
            case "selfCar": {
                const res: BattleBattleStageObject[] = [];
                if (this.ctx.object.teamSide === 0) {
                    this.ctx.data.attackTeam.forEach((h) => {
                        if (h.heroIndex === 9) res.push(h);
                    });
                } else {
                    this.ctx.data.defendTeam.forEach((h) => {
                        if (h.heroIndex === 9) res.push(h);
                    });
                }
                return res;
            }
            case "enemyCar": {
                const res: BattleBattleStageObject[] = [];
                if (this.ctx.object.teamSide === 0) {
                    this.ctx.data.attackTeam.forEach((h) => {
                        if (h.heroIndex === 9) res.push(h);
                    });
                } else {
                    this.ctx.data.defendTeam.forEach((h) => {
                        if (h.heroIndex === 9) res.push(h);
                    });
                }
                return res;
            }
            case "selfTeamExcludeCar": {
                const res: BattleBattleStageObject[] = [];
                if (this.ctx.object.teamSide === 0) {
                    this.ctx.data.attackTeam.forEach((h) => {
                        if (h.heroIndex !== 9) res.push(h);
                    });
                } else {
                    this.ctx.data.defendTeam.forEach((h) => {
                        if (h.heroIndex !== 9) res.push(h);
                    });
                }
                return res;
            }
            case "enemyTeamExcludeCar": {
                const res: BattleBattleStageObject[] = [];
                if (this.ctx.object.teamSide === 0) {
                    this.ctx.data.attackTeam.forEach((h) => {
                        if (h.heroIndex !== 9) res.push(h);
                    });
                } else {
                    this.ctx.data.defendTeam.forEach((h) => {
                        if (h.heroIndex !== 9) res.push(h);
                    });
                }
                return res;
            }
            default: {
                throw new Error(`未知基础目标 ${this.nodeKey}`);
            }
        }
    }

    private process(
        base: BattleBattleStageObject[],
        selectContext: BattleBattleStageContext,
        node: BattleSkillConfigNode
    ): BattleBattleStageObject[] {
        switch (node.type) {
            case BattleSkillNodeType.Asc: {
                const key = node.getProperties("heroProperty");
                return BattleTargetSelectProcess.asc(base, selectContext, key);
            }
            case BattleSkillNodeType.Desc: {
                const key = node.getProperties("heroProperty");
                return BattleTargetSelectProcess.desc(base, selectContext, key);
            }
            case BattleSkillNodeType.Filter: {
                const key = node.getProperties("condition");
                return BattleTargetSelectProcess.filter(base, selectContext, key);
            }
            case BattleSkillNodeType.MaxBy: {
                const key = node.getProperties("heroProperty");
                return BattleTargetSelectProcess.maxBy(base, selectContext, key);
            }
            case BattleSkillNodeType.MinBy: {
                const key = node.getProperties("heroProperty");
                return BattleTargetSelectProcess.minBy(base, selectContext, key);
            }
            case BattleSkillNodeType.RandomTake: {
                const count = node.getProperties("count");
                return BattleTargetSelectProcess.randomTake(base, selectContext, count);
            }
            case BattleSkillNodeType.Slice: {
                const count = node.getProperties("count");
                return BattleTargetSelectProcess.slice(base, selectContext, count);
            }
            case BattleSkillNodeType.Take: {
                const count = node.getProperties("count");
                return BattleTargetSelectProcess.take(base, selectContext, count);
            }
            case BattleSkillNodeType.RectArea: {
                // todo 矩形区域参数提取
                return BattleTargetSelectProcess.reactArea(base, selectContext);
            }
            default: {
                throw new Error(`未知目标选取逻辑 ${this.nodeKey}`);
            }
        }
    }
}

class BattleTargetSelectProcess {
    static asc(
        base: BattleBattleStageObject[],
        selectContext: BattleBattleStageContext,
        key: string
    ): BattleBattleStageObject[] {
        return base.sort(
            (a, b) =>
                selectContext.skill.evalValue(key, "final", a.propertyManager.finalProperty) -
                selectContext.skill.evalValue(key, "final", b.propertyManager.finalProperty)
        );
    }

    static desc(
        base: BattleBattleStageObject[],
        selectContext: BattleBattleStageContext,
        key: string
    ): BattleBattleStageObject[] {
        return base.sort(
            (a, b) =>
                selectContext.skill.evalValue(key, "final", b.propertyManager.finalProperty) -
                selectContext.skill.evalValue(key, "final", a.propertyManager.finalProperty)
        );
    }

    static filter(
        base: BattleBattleStageObject[],
        selectContext: BattleBattleStageContext,
        key: string
    ): BattleBattleStageObject[] {
        return base.filter((o) => selectContext.skill.evalCondition(key, "final", o.propertyManager.finalProperty));
    }

    static maxBy(
        base: BattleBattleStageObject[],
        selectContext: BattleBattleStageContext,
        key: string
    ): BattleBattleStageObject[] {
        return this.desc(base, selectContext, key).slice(0, 1);
    }

    static minBy(
        base: BattleBattleStageObject[],
        selectContext: BattleBattleStageContext,
        key: string
    ): BattleBattleStageObject[] {
        return this.asc(base, selectContext, key).slice(0, 1);
    }

    static randomTake(
        base: BattleBattleStageObject[],
        selectContext: BattleBattleStageContext,
        count: number
    ): BattleBattleStageObject[] {
        if (count >= base.length) return base;
        const res = selectContext.data.sr.rdArrayElement(base, count);
        return res;
    }

    static slice(
        base: BattleBattleStageObject[],
        selectContext: BattleBattleStageContext,
        count: number
    ): BattleBattleStageObject[] {
        return base.slice(count);
    }

    static take(
        base: BattleBattleStageObject[],
        selectContext: BattleBattleStageContext,
        count: number
    ): BattleBattleStageObject[] {
        return base.slice(0, count);
    }

    static reactArea(
        base: BattleBattleStageObject[],
        selectContext: BattleBattleStageContext
    ): BattleBattleStageObject[] {
        // todo 实现矩形区域效果
        return base;
    }
}
