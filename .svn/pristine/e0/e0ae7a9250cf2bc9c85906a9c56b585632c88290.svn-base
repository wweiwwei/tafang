import { autowired, registerClass } from "../../../framework/Decorator";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemPower")
@ccclass
export default class ListItemPower extends UIListItem {
    static _poolSize: number = 10;

    /** 提示文本 */
    @autowired(UILabel) power: UILabel = null;
    state: {
        text: string[][];
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.power.setText(this.state.text[0], this.state.text[1]);
        this.power.node.color =
            this.state.text[1][0].indexOf("-") !== -1 ? GConstant.costLabelColor.red : GConstant.costLabelColor.green;
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
