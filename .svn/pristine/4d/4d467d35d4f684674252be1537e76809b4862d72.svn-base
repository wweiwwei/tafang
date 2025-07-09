import { autowired, registerClass } from "../../../framework/Decorator";
import UIImage from "../../../framework/ui/UIImage";
import UIListItem from "../../../framework/ui/UIListItem";
import Item from "../../entity/Item";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemDropItems")
@ccclass
export default class ListItemDropItems extends UIListItem {
    static _poolSize: number = 20;
    /**小物体 */
    @autowired(UIImage) image: UIImage = null;
    state: {
        beginWorldPosition: cc.Vec2;
        targetWorldPosition: cc.Vec2;
        id: number;
        time: number;
        count: number;
        scale: number;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.scheduleOnce(() => {
            GTip.showBattleSceneFlyReward({
                beginWorldPosition: this.state.beginWorldPosition,
                targetWorldPosition: this.state.targetWorldPosition,
                id: this.state.id,
                time: 1,
                scale: 1,
                count: 1,
            });
            this.recycle();
        }, this.state.time);
        this.image.imgName = GTable.getById("ItemTbl", this.state.id).img;
    }
    play() {
        this.image.getComponent(cc.Animation).play();
    }

    protected onRecycle(): void {
        this.unscheduleAllCallbacks();
    }
}
