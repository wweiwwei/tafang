import { autowired, registerClass } from "../../../framework/Decorator";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
import Item from "../../entity/Item";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemTurntableItem")
@ccclass
export default class ListItemTurntableItem extends UIListItem {
    static _poolSize: number = 16;
    @autowired(UIImage) bg: UIImage = null;
    @autowired(UIImage) reward: UIImage = null;
    @autowired(UILabel) count: UILabel = null;
    state: { item: Item };
    setState(state: this["state"]): void {
        this.state = state;
        this.reward.imgName = Item.getImg(this.state.item);
        this.count.setText(["_rsx" + this.state.item.count]);
    }
    playChosen() {
        this.node.getChildByName("content").getComponent(cc.Animation).play();
    }
    playChosing() {
        this.node.getChildByName("content").getChildByName("Chosing_Effect").getComponent(cc.Animation).play();
    }
}
