import { autowired, registerClass } from "../../../framework/Decorator";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
import Item from "../../entity/Item";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemResource")
@ccclass
export default class ListItemResource extends UIListItem {
    @autowired(UIImage) resource: UIImage = null;
    @autowired(UILabel) storage: UILabel = null;
    @autowired(UILabel) produce: UILabel = null;
    @autowired(UILabel) cost: UILabel = null;
    state: { itemId: number; storage: number; produce: number; cost: number };
    setState(state: this["state"]): void {
        this.state = state;
        this.resource.imgName = Item.getImg(new Item(this.state.itemId, this.state.storage));
        this.storage.setText(["_rs" + GUtils.ui.getNumberString(this.state.storage, 2)]);
        this.produce.setText(["_rs+" + GUtils.ui.getNumberString(this.state.produce, 0)]);
        this.cost.setText(["_rs-" + GUtils.ui.getNumberString(this.state.cost, 0)]);
    }
}
