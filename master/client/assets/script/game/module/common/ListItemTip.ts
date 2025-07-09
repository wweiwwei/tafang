import { autowired, registerClass } from "../../../framework/Decorator";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemTip")
@ccclass
export default class ListItemTip extends UIListItem {
    static _poolSize: number = 10;

    /** 提示文本 */
    @autowired(UILabel) tip: UILabel = null;
    state: {
        text: string[][];
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.tip.setText(...this.state.text);
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
