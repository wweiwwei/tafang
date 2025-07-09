import { autowired, registerClass } from "../../../framework/Decorator";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemGuideLight")
@ccclass
export default class ListItemGuideLight extends UIListItem {
    static _poolSize: number = 3;
    state: { pos: cc.Vec3 };
    setState(state: this["state"]): void {
        this.state = state;
        this.node.setPosition(this.state.pos);
        this.scheduleOnce(() => {
            this.recycle();
        }, 1.7);
    }
}
