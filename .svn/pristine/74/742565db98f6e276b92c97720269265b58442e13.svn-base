import EventBus from "../../../../../framework/event/EventBus";
import EventName from "../../../../event/EventName";
import ListItemBattleTempMoveObject from "../../ListItemBattleTempMoveObject";
import BattleSceneControl, { ISceneControlState } from "../BattleSceneControl";
import { BattleSceneChangeScaleState } from "./BattleSceneChangeScaleState";
import { BattleSceneIdleState } from "./BattleSceneIdleState";

export class BattleSceneMoveTowerState implements ISceneControlState {
    constructor(
        public ctx: BattleSceneControl,
        private originIndex: number,
        private tempTower: ListItemBattleTempMoveObject
    ) {
        EventBus.emit(EventName.showTowerRange, originIndex);
    }

    private clearTemp() {
        if (this.tempTower) {
            this.tempTower.recycle();
        }
        EventBus.emit(EventName.HideTowerRange);
        this.tempTower = null;
    }

    onTouchStart(event: cc.Event.EventTouch): void {
        this.clearTemp();
        this.ctx.changeState(new BattleSceneChangeScaleState(this.ctx));
    }
    onTouchMove(event: cc.Event.EventTouch): void {
        const delta = event.getDelta();
        const camera = this.ctx.getCamera();
        const scale = camera.zoomRatio;
        this.tempTower.node.position = this.tempTower.node.position.add(cc.v3(delta.x / scale, delta.y / scale));
    }
    onTouchEnd(event: cc.Event.EventTouch): void {
        const screenPos = event.getLocation();
        const [index, relatePos] = this.ctx.posToIndex(screenPos);
        if (index >= 0 && this.originIndex >= 0 && index !== this.originIndex) {
            GModel.defendTower.changeTowerPosition(this.originIndex, index);
        }
        this.clearTemp();
        this.ctx.changeState(new BattleSceneIdleState(this.ctx));
    }
}
