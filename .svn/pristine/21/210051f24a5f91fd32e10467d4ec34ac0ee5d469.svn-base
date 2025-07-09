import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
import Item from "../../entity/Item";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemCostItem")
@ccclass
export default class ListItemCostItem extends UIListItem {
    @autowired(UIButton) item: UIButton = null;
    @autowired(UIImage) bg: UIImage = null;
    /**物品图片 */
    @autowired(UIImage) image: UIImage = null;
    /**需要消耗的数量 */
    @autowired(UILabel) cost: UILabel = null;

    state: {
        item: Item;
        /**0-英雄升级，1-宝箱道具，2-建筑升级 */
        status: number;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.item.interactable = false;
        this.image.imgName = Item.getImg(this.state.item);
        let storage = GModel.knapsack.getStorageById(this.state.item.id);
        if (this.state.status == 0) {
            this.cost.setText(["_rs" + storage + "/" + this.state.item.count]);
        } else if (this.state.status == 1) {
            this.cost.node.active = false;
            this.bg.imgName = "";
        } else {
            this.bg.imgName = "";
            this.cost.setText(["_rs" + storage + "/" + this.state.item.count]);
        }
    }
}
