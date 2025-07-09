import BattleSceneControl, { ISceneControlState } from "../BattleSceneControl";
import { BattleSceneChangeScaleState } from "./BattleSceneChangeScaleState";
import { BattleSceneIdleState } from "./BattleSceneIdleState";

export class BattleSceneMoveCameraState implements ISceneControlState {
    constructor(public ctx: BattleSceneControl) {}

    onTouchStart(event: cc.Event.EventTouch): void {
        this.ctx.changeState(new BattleSceneChangeScaleState(this.ctx));
    }
    onTouchMove(event: cc.Event.EventTouch): void {
        if (this.ctx.curTbl.allowMove === 0) return;
        if (GWindow.sceneEventBlock) return;
        const delta = event.getDelta();
        const camera = this.ctx.getCamera();
        const scale = camera.zoomRatio;
        camera.node.position = camera.node.position.sub(cc.v3(delta.x / scale, delta.y / scale));
        this.ctx.checkEdge();
    }
    onTouchEnd(event: cc.Event.EventTouch): void {
        const start = event.getStartLocation();
        const end = event.getLocation();
        const offset = end.sub(start).mag();
        if (offset < 20) {
            // 判断移动幅度是否攻击
            const api = GBattleApiManager.getBattleStageApi(this.ctx.ctx.battleSceneIndex);
            if (api) {
                api.playerAttack();
            }
        }
        this.ctx.changeState(new BattleSceneIdleState(this.ctx));
    }
}
