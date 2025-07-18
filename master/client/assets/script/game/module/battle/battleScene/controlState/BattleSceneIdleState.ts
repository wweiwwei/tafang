import ResourceLoader from "../../../../../framework/ResourceLoader";
import { BattleRect } from "../../../../battleLogic/Map/BattleRect";
import ListItemBattleTempMoveObject from "../../ListItemBattleTempMoveObject";
import BattleSceneControl, { ISceneControlState } from "../BattleSceneControl";
import { BattleSceneMoveCameraState } from "./BattleSceneMoveCameraState";
import { BattleSceneMoveTowerState } from "./BattleSceneMoveTowerState";

export class BattleSceneIdleState implements ISceneControlState {
    constructor(public ctx: BattleSceneControl) {}

    onTouchStart(event: cc.Event.EventTouch): void {
        // const processor = this.ctx.ctx._windowParam.processor;
        // if (processor && (processor.battleKind === "normal" || processor.battleKind === "boss")) {
        //     // 主场景，可以切换到更换防御塔和移动镜头模式
        //     const screenPos = event.getLocation();
        //     const [index, relatePos] = this.ctx.posToIndex(screenPos);
        //     if (index >= 0) {
        //         if (GModel.defendTower.getTowerFormation()[index] >= 0) {
        //             const tempTower = ResourceLoader.getNodeSyncWithPreload(ListItemBattleTempMoveObject);
        //             tempTower.node.parent = this.ctx.ctx.effectContainer;
        //             tempTower.node.setPosition(relatePos);
        //             tempTower.setState({
        //                 index,
        //             });
        //             this.ctx.changeState(new BattleSceneMoveTowerState(this.ctx, index, tempTower));
        //         } else {
        //             const unlock = GModel.defendTower.isTowerPlaceUnlock(index, true);
        //             if (unlock) {
        //                 GTip.showTip([GLang.code.ui.drag_tower_here]);
        //             }
        //         }
        //     } else {
        //         this.ctx.changeState(new BattleSceneMoveCameraState(this.ctx));
        //     }
        // } else {
        //     // 非主场景，只能移动

        // }
        this.ctx.changeState(new BattleSceneMoveCameraState(this.ctx));
    }
    onTouchMove(event: cc.Event.EventTouch): void {}
    onTouchEnd(event: cc.Event.EventTouch): void {}
}
