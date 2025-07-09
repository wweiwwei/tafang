import { autowired, registerClass } from "../../../framework/Decorator";
import UIImage from "../../../framework/ui/UIImage";
import UIListItem from "../../../framework/ui/UIListItem";
import Item from "../../entity/Item";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemMapItems")
@ccclass
export default class ListItemMapItems extends UIListItem {
    static _poolSize: number = 20;
    /**小物体 */
    @autowired(UIImage) image: UIImage = null;

    state: {
        item: Item;
        position: { x: number; y: number };
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.image.imgName = Item.getImg(this.state.item);
        let { x, y } = this.state.position;
        this.image.node.setPosition(x, y);
        this.image.node.scaleX = Math.round(x % 2) === 0 ? -1 : 1;
    }
}
