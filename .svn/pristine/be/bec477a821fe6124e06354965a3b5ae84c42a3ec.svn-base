import { autowired, registerClass } from "../../../framework/Decorator";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
const { ccclass, property } = cc._decorator;
@registerClass("ListItemRogueGift")
@ccclass
export default class ListItemRogueGift extends UIListItem {
    /** */
    @autowired(UILabel) name1: UILabel = null;
    @autowired(UIImage) img: UIImage = null;

    state: { img: string; name: string };
    setState(state: this["state"]): void {
        this.name1.setText([state.name]);
        this.img.imgName = state.img;
    }
}
