import { autowired, registerClass } from "../../../framework/Decorator";
import UIImage from "../../../framework/ui/UIImage";
import UIListItem from "../../../framework/ui/UIListItem";
import Item from "../../entity/Item";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemFlyItems")
@ccclass
export default class ListItemFlyItems extends UIListItem {
    static _poolSize: number = 20;
    /**小物体 */
    @autowired(UIImage) image: UIImage = null;
    private timer = 0;
    state: {
        item: Item;
        p0: cc.Vec2;
        p1: cc.Vec2;
        p2: cc.Vec2;
        /** 毫秒 */
        time?: number;
        scale?: number;
        /**单个图片飞行，传入图片名字 */
        imgFly?: string;
    };
    setState(state: this["state"]): void {
        this.state = state;
        if (!this.state.time) this.state.time = 1;
        if (!this.state.scale) this.state.scale = 1;
        this.node.scale = this.state.scale;
        // console.log(this.node.scale);

        this.image.imgName = this.state.imgFly || Item.getImg(this.state.item);
        this.scheduleOnce(() => {
            this.recycle();
        }, this.state.time);
    }
    protected update(dt: number): void {
        if (this.state) {
            this.timer += dt / this.state.time;
            if (this.timer > 1) this.timer = 1;
            this.node.setPosition(
                GUtils.ui.bezierCurve(this.state.p0, this.state.p1, this.state.p2, (this.timer * this.timer) / 1)
            );
        }
    }

    protected onRecycle(): void {
        this.unscheduleAllCallbacks();
    }
}
