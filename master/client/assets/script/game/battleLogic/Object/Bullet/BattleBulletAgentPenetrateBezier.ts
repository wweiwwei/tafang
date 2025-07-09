import { BattleDisplayEvent } from "../../Display/BattleDisplayEvent";
import { BattleVec } from "../../Map/BattleVec";
import { BattleTargetSearch } from "../../Skill/Target/BattleTargetSearch";
import { BattleBullet, IBattleBulletAgent } from "./BattleBullet";

export class BattleBulletAgentPenetrateBezier implements IBattleBulletAgent {
    getCollide(): number[] {
        return null;
    }
    /** 已经穿透的敌人uid */
    penetrateList: number[] = [];
    init(ctx: BattleBullet): void {
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
        ctx.position = BattleVec.add(
            ctx.position,
            BattleVec.mul(ctx.direction, ctx.speed * GConstant.battle.logicTickSecond)
        );
        const enemyList = BattleTargetSearch.searchBaseTarget("selfTeam", ctx.ctx, null);
        enemyList
            .filter((e) => {
                if (this.penetrateList.includes(e.uid)) return false;
                const [left, right, top, bottom] = ctx.penetrateInfo.rect;
                if (e.position[0] < ctx.position[0] - left || e.position[0] > ctx.position[0] + right) return false;
                if (e.position[1] < ctx.position[1] - bottom || e.position[1] > ctx.position[1] + top) return false;
                return true;
            })
            .forEach((e) => {
                this.penetrateList.push(e.uid);
                ctx.hitCallBack(e.uid);
            });
        const hasMove = BattleVec.len(BattleVec.sub(ctx.position, ctx.beginPosition));
        if (hasMove >= ctx.penetrateInfo.maxDistance) {
            ctx.ctx.data.bulletMap.delete(ctx.uid);
            ctx.ctx.data.pushDisplayEvent(new BattleDisplayEvent("removeBullet", { bullet: ctx }));
        }
    }
}
