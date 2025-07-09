import { autowired, registerClass } from "../../../framework/Decorator";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemGuideFinger")
@ccclass
export default class ListItemGuideFinger extends UIListItem {
    static _poolSize: number = 1;
    @autowired(cc.Node) handImg: cc.Node = null;
    state: { pos: cc.Vec3 };
    setState(state: this["state"]): void {
        this.state = state;
        this.node.setPosition(this.state.pos);
        cc.tween(this.handImg)
            .repeatForever(
                cc
                    .tween(this.handImg)
                    .to(0.5, { x: -10 }, { easing: "sineOut" })
                    .to(0.5, { x: 10 }, { easing: "sineOut" })
            )
            .start();
    }

    onRecycle(): void {
        this.handImg.stopAllActions();
    }
}
