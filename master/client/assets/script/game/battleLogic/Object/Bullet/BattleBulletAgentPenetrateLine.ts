import { BattleDisplayEvent } from "../../Display/BattleDisplayEvent";
import { BattleVec } from "../../Map/BattleVec";
import { BattleTargetSearch } from "../../Skill/Target/BattleTargetSearch";
import { BattleBullet, IBattleBulletAgent } from "./BattleBullet";

export class BattleBulletAgentPenetrateLine implements IBattleBulletAgent {
    getCollide(ctx: BattleBullet): number[] {
        return ctx.builder._penetrateRect;
    }
    /** 已经穿透的敌人uid和对应的下一攻击帧 */
    penetrateMap: Map<number, number> = new Map();
    endFrame = 0;
    rangeSquare = 0;
    interval = 60;
    init(ctx: BattleBullet): void {
        this.interval = Math.round(Number(ctx.builder._penetrateInterval) / GConstant.battle.logicTick);
        this.endFrame = Math.round(
            ctx.ctx.data.frame + Number(ctx.builder._penetrateDuration) / GConstant.battle.logicTick
        );
        this.rangeSquare = Number(ctx.builder._penetrateRadius) ** 2;
        const target = ctx.ctx.data.getObjectByUid(ctx.targetUid);
        if (target) {
            const pos = target.position.map((e) => e);
            pos[1] += GConstant.battle.effect.bulletOffset[1];
            ctx.cachePosition = pos;
            ctx.direction = BattleVec.normalize(BattleVec.sub(pos, ctx.position));
        }
        ctx.direction = BattleVec.normalize(ctx.direction);
    }
    update(ctx: BattleBullet): void {
        const frame = ctx.ctx.data.frame;
        const nextHitFrame = ctx.ctx.data.frame + this.interval;
        ctx.position = BattleVec.add(
            ctx.position,
            BattleVec.mul(ctx.direction, Number(ctx.builder._speed) * GConstant.battle.logicTickSecond)
        );
        const enemyList = BattleTargetSearch.searchBaseTarget("enemyTeam", ctx.ctx, null);
        const [x, y] = ctx.position;
        enemyList
            .filter((e) => {
                if (this.penetrateMap.get(e.uid) > frame) return false;
                if (ctx.builder._penetrateRect) {
                    const [left, right, top, bottom] = ctx.builder._penetrateRect;
                    // console.log(ctx.builder._penetrateRect);
                    if (e.position[0] < ctx.position[0] - left || e.position[0] > ctx.position[0] + right) return false;
                    if (e.position[1] < ctx.position[1] - bottom || e.position[1] > ctx.position[1] + top) return false;
                    return true;
                } else {
                    const offsetX = e.position[0] - x;
                    const offsetY = e.position[1] - y;
                    const distanceSquare = offsetX * offsetX + offsetY * offsetY;
                    return distanceSquare < this.rangeSquare;
                }
            })
            .forEach((e) => {
                this.penetrateMap.set(e.uid, nextHitFrame);
                ctx.hitCallBack(e.uid);
            });
        // const hasMove = BattleVec.len(BattleVec.sub(ctx.position, ctx.beginPositionpdw));
        // if (hasMove >= ctx.penetrateInfo.maxDistance) {
        //     ctx.ctx.data.bulletMap.delete(ctx.uid);
        //     ctx.ctx.data.pushDisplayEvent(new BattleDisplayEvent("removeBullet", { bullet: ctx }));
        // }
        if (ctx.ctx.data.frame >= this.endFrame) {
            ctx.ctx.data.bulletMap.delete(ctx.uid);
            ctx.ctx.data.pushDisplayEvent(new BattleDisplayEvent("removeBullet", { bullet: ctx }));
        }
    }
}
