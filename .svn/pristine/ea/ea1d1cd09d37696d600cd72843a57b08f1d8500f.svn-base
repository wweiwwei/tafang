import { autowired, registerClass } from "../../../framework/Decorator";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemWeakGuide")
@ccclass
export default class ListItemWeakGuide extends UIListItem {
    /** 提示文本 */
    @autowired(cc.Node) hand: cc.Node = null;
    @autowired(cc.Node) handImg: cc.Node = null;
    state: { pos: cc.Vec2 };
    setState(state: this["state"]): void {
        this.state = state;
        cc.tween(this.handImg)
            .repeatForever(
                cc
                    .tween(this.handImg)
                    .to(0.5, { x: -10 }, { easing: "sineOut" })
                    .to(0.5, { x: 10 }, { easing: "sineOut" })
            )
            .start();
        this.hand.setPosition(this.state.pos);
    }
}
