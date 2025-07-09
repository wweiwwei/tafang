import { BattleVec } from "../../Map/BattleVec";
import { BattleBullet, IBattleBulletAgent } from "./BattleBullet";

export class BattleBulletAgentBezier implements IBattleBulletAgent {
    getCollide(): number[] {
        return null;
    }
    topPosition: number[];
    init(ctx: BattleBullet): void {
        const target = ctx.ctx.data.getObjectByUid(ctx.targetUid);
        if (target) {
            const pos = target.position.map((e) => e);
            pos[1] += GConstant.battle.effect.bulletOffset[1];
            ctx.cachePosition = pos;
            this.topPosition = [(ctx.beginPosition[0] + pos[0]) / 2, pos[1] + Number(ctx.builder._curveParam)];
            ctx.estimateFrame = Math.ceil(
                BattleVec.distance(ctx.beginPosition, pos) /
                    (Number(ctx.builder._speed) * GConstant.battle.logicTickSecond)
            );
            const nextPosition = BattleVec.bezier(
                ctx.beginPosition,
                this.topPosition,
                pos,
                (ctx.hasRunFrame + 1) / ctx.estimateFrame
            );
            ctx.direction = BattleVec.normalize(BattleVec.sub(nextPosition, ctx.position));
        }
    }
    update(ctx: BattleBullet): void {
        const target = ctx.ctx.data.getObjectByUid(ctx.targetUid);
        let targetPosition: number[] = null;
        if (!target) {
            targetPosition = ctx.cachePosition;
        } else {
            const pos = target.position.map((e) => e);
            const [x, y] = GConstant.battle.effect.bulletOffset;
            pos[0] += x;
            pos[1] += y;
            targetPosition = pos;
            ctx.cachePosition = pos;
        }
        ctx.position = BattleVec.bezier(
            ctx.beginPosition,
            this.topPosition,
            targetPosition,
            ctx.hasRunFrame / ctx.estimateFrame
        );
        const nextPos = BattleVec.bezier(
            ctx.beginPosition,
            this.topPosition,
            targetPosition,
            (ctx.hasRunFrame + 1) / ctx.estimateFrame
        );
        ctx.direction = BattleVec.normalize(BattleVec.sub(nextPos, ctx.position));
        if (ctx.estimateFrame === ctx.hasRunFrame) {
            ctx.hit();
        }
    }
}
