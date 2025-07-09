import { BattleBaseFSM } from "./BattleBaseFSM";

/** 塔防模式怪物和平模式的状态机 */
export class BattleTDMonsterPeaceFSM extends BattleBaseFSM {
    private targetPos: { x: number; y: number };
    private direction: { x: number; y: number } = { x: 1, y: 0 };
    startState(): void {
        // 设置动画状态
        this.fsmManager.viewModel.changeAnimation("run");
        this.fsmManager.viewModel.loop = true;
        this.randomTargetPos();
    }
    endState(): void {}
    tick(): void {
        const selfPosition = this.ctx.object.position;
        let [x, y] = selfPosition;
        const moveDistance = this.ctx.object.propertyManager.tickSpeed;
        x += this.direction.x * moveDistance;
        y += this.direction.y * moveDistance;
        this.ctx.object.position = [x, y];
        if (Math.abs(x - this.targetPos.x) < 10 && Math.abs(y - this.targetPos.y) < 10) {
            this.randomTargetPos();
        } else if (x * x + y * y < BattleTDMonsterPeaceFSM.distanceSquare) {
            this.moveAway();
        }
    }

    static distanceSquare = 300 * 300;

    randomTargetPos() {
        const angle = Math.random() * 100;
        const targetPos = {
            x: Math.cos(angle) * 500,
            y: Math.sin(angle) * 500,
        };
        this.targetPos = targetPos;
        const selfPosition = this.ctx.object.position;
        const [x, y] = selfPosition;
        this.direction = { x: targetPos.x - x, y: targetPos.y - y };
        const len = Math.sqrt(this.direction.x * this.direction.x + this.direction.y * this.direction.y);
        this.direction.x /= len;
        this.direction.y /= len;
        this.ctx.object.fsmManager.viewModel.direction = {
            x: this.direction.x,
            y: this.direction.y,
        };
    }

    moveAway() {
        const selfPosition = this.ctx.object.position;
        const targetPos = {
            x: selfPosition[0] * 1.5,
            y: selfPosition[1] * 1.5,
        };
        this.targetPos = targetPos;
        const [x, y] = selfPosition;
        this.direction = { x: targetPos.x - x, y: targetPos.y - y };
        const len = Math.sqrt(this.direction.x * this.direction.x + this.direction.y * this.direction.y);
        this.direction.x /= len;
        this.direction.y /= len;
        this.ctx.object.fsmManager.viewModel.direction = {
            x: this.direction.x,
            y: this.direction.y,
        };
    }
}
