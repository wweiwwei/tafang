import { autowired, registerClass } from "../../../framework/Decorator";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemUpgradeTip")
@ccclass
export default class ListItemUpgradeTip extends UIListItem {
    static _poolSize: number = 10;

    /** 提示文本 */
    @autowired(UILabel) label1: UILabel = null;
    @autowired(UILabel) label2: UILabel = null;
    state: {
        text: string[][];
        text2: string[][];
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.label1.node.active = false;
        this.label2.node.active = false;
        if (this.state.text.length > 1) {
            this.label1.node.active = true;
            this.label1.setText(...this.state.text);
        }
        if (this.state.text2.length > 0) {
            this.label2.node.active = true;
            this.label2.setText(...this.state.text2);
        }
        this.node.setPosition(0, 100);
        cc.tween(this.node)
            .parallel(
                cc
                    .tween()
                    .to(0.2, { opacity: 255 })
                    .delay(1)
                    .to(0.2, { opacity: 0 })
                    .call(() => {
                        this.recycle();
                    }),
                cc.tween().by(0.2, { y: 120 })
            )
            .start();
    }
}
