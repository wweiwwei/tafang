import { autowired, registerClass } from "../../../framework/Decorator";
import UIImage from "../../../framework/ui/UIImage";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemStarItem")
@ccclass
export default class ListItemStarItem extends UIListItem {
    /**星星 */
    @autowired(UIImage) star: UIImage = null;
    state: {
        level: number;
        status: number; //0-列表，1-详情
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.star.imgName = GConstant.starimg[this.state.level];
        if (this.state.status === 1) {
            this.star.sizeMode = cc.Sprite.SizeMode.TRIMMED;
        } else {
            this.node.active = this.state.level !== 0;
        }
    }
}
