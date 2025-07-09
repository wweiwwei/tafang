import { autowired, registerClass } from "../../../framework/Decorator";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
import Item from "../../entity/Item";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemReward")
@ccclass
export default class ListItemReward extends UIListItem {
    static _poolSize: number = 10;
    /** 提示文本 */
    @autowired(UILabel) tip: UILabel = null;
    @autowired(UIImage) img: UIImage = null;
    state: { img: string; text: string[][] };
    setState(state: this["state"]): void {
        this.state = state;
        this.tip.setText(...this.state.text);
        this.img.imgName = this.state.img;
        this.node.setPosition(0, 300);
    }

    doTween() {
        return new Promise<void>((resolve, reject) => {
            cc.tween(this.node)
                .parallel(
                    cc
                        .tween()
                        .to(0.2, { opacity: 255 })
                        .delay(0.6)
                        .to(0.2, { opacity: 0 })
                        .call(() => {
                            resolve();
                            // this.recycle();
                        }),
                    cc.tween().by(0.2, { y: 120 })
                )
                .start();
        });
    }
}
