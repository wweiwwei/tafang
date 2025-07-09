import { BattleVec } from "../../Map/BattleVec";
import { BattleBullet, IBattleBulletAgent } from "./BattleBullet";

export class BattleBulletAgentLine implements IBattleBulletAgent {
    getCollide(): number[] {
        return null;
    }
    init(ctx: BattleBullet): void {
        const target = ctx.ctx.data.getObjectByUid(ctx.targetUid);
        if (target) {
            const pos = target.position.map((e) => e);
            pos[1] += GConstant.battle.effect.bulletOffset[1];
            ctx.cachePosition = pos;
            ctx.estimateFrame = Math.ceil(
                BattleVec.distance(ctx.beginPosition, pos) /
                    (Number(ctx.builder._speed) * GConstant.battle.logicTickSecond)
            );
            ctx.direction = BattleVec.normalize(BattleVec.sub(pos, ctx.position));
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
        const distance = BattleVec.distance(ctx.position, targetPosition);
        if (distance < Number(ctx.builder._speed) * GConstant.battle.logicTickSecond) {
            ctx.position = targetPosition.map((e) => e);
            ctx.hit();
        } else {
            ctx.position = BattleVec.add(
                ctx.position,
                BattleVec.mul(ctx.direction, Number(ctx.builder._speed) * GConstant.battle.logicTickSecond)
            );
            ctx.direction = BattleVec.normalize(BattleVec.sub(targetPosition, ctx.position));
        }
    }
}
