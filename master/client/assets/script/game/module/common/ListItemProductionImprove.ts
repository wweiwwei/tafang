import { autowired, registerClass } from "../../../framework/Decorator";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
import Item from "../../entity/Item";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemProductionImprove")
@ccclass
export default class ListItemProductionImprove extends UIListItem {
    static _poolSize: number = 10;
    /** 提示文本 */
    @autowired(UILabel) newval: UILabel = null;
    @autowired(UILabel) oldval: UILabel = null;
    @autowired(UILabel) tip: UILabel = null;
    @autowired(UIImage) img: UIImage = null;
    state: { img: string; text: string[][]; newval: number; oldval: number };
    setState(state: this["state"]): void {
        this.state = state;
        this.tip.setText(...this.state.text);
        this.oldval.setText(["_rs" + GUtils.ui.getFixed(this.state.oldval, 1)]);
        this.newval.setText(["_rs" + GUtils.ui.getFixed(this.state.newval, 1)]);
        this.img.imgName = this.state.img;
        this.node.setPosition(0, 0);
        cc.tween(this.node)
            .parallel(
                cc
                    .tween()
                    .to(0.2, { opacity: 255 })
                    .delay(0.6)
                    .to(0.2, { opacity: 0 })
                    .call(() => {
                        // resolve();
                        this.recycle();
                    }),
                cc.tween().by(0.2, { y: 90 })
            )
            .start();
    }
}
