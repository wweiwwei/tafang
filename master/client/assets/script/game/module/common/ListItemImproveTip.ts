import { autowired, registerClass } from "../../../framework/Decorator";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import ListItemImproveItem from "./ListItemImproveItem";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemImproveTip")
@ccclass
export default class ListItemImproveTip extends UIListItem {
    static _poolSize: number = 10;

    /** 提示文本 */
    @autowired(UIList) improval: UIList<ListItemImproveItem> = null;
    state: {
        list: { property: string; value: number | string }[];
        wear: boolean;
    };
    setState(state: this["state"]): void {
        this.state = state;
        let arr = this.state.list.map((t) => {
            return { property: t.property, value: t.value, wear: this.state.wear };
        });
        this.improval.setState(arr);
        this.node.setPosition(0, 300);
        cc.tween(this.node)
            .parallel(
                cc
                    .tween()
                    .to(0.2, { opacity: 255 })
                    .delay(0.6)
                    .to(0.2, { opacity: 0 })
                    .call(() => {
                        this.recycle();
                    }),
                cc.tween().by(0.2, { y: 120 })
            )
            .start();
    }
}
