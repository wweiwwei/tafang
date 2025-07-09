import BattleSceneControl, { ISceneControlState } from "../BattleSceneControl";
import { BattleSceneIdleState } from "./BattleSceneIdleState";
import { BattleSceneMoveCameraState } from "./BattleSceneMoveCameraState";

export class BattleSceneChangeScaleState implements ISceneControlState {
    constructor(public ctx: BattleSceneControl) {}

    onTouchStart(event: cc.Event.EventTouch): void {}
    onTouchMove(event: cc.Event.EventTouch): void {
        if (this.ctx.touchPointBegin.length === 2) {
            // 只有两指有缩放效果
            const other = this.ctx.touchPointBegin.find((p) => p.id !== event.getID());
            if (other) {
                const offset = event.getLocation().sub(other.pos);
                const delta = event.getDelta();
                const len = delta.mag();
                const direction = offset.dot(delta);
                let scale = 1 + (direction / Math.abs(direction)) * len * 0.005;
                // todo 两指缩放取消
                // GCamera.battleCamera.zoomRatio *= scale;
                // if (GCamera.battleCamera.zoomRatio < this.ctx.minScale) {
                //     GCamera.battleCamera.zoomRatio = this.ctx.minScale;
                // } else if (GCamera.battleCamera.zoomRatio > this.ctx.maxScale) {
                //     GCamera.battleCamera.zoomRatio = this.ctx.maxScale;
                // }
                this.ctx.checkEdge();
            }
        }
    }
    onTouchEnd(event: cc.Event.EventTouch): void {
        if (this.ctx.touchPointBegin.length === 1) {
            this.ctx.changeState(new BattleSceneMoveCameraState(this.ctx));
        } else if (this.ctx.touchPointBegin.length === 0) {
            // 应该不会进入这个分支
            this.ctx.changeState(new BattleSceneIdleState(this.ctx));
        }
    }
}
