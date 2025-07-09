import { autowired, registerClass } from "../../../framework/Decorator";
import UIImage from "../../../framework/ui/UIImage";
import UIListItem from "../../../framework/ui/UIListItem";
const { ccclass, property } = cc._decorator;
@registerClass("ListItemT")
@ccclass
export default class ListItemT extends UIListItem {
    /** */
    @autowired(UIImage) img: UIImage = null;

    state: {};
    setState(state: this["state"]): void {}
}
