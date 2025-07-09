import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
import Item from "../../entity/Item";
import WindowItemDescription from "../common/WindowItemDescription";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemCost")
@ccclass
export default class ListItemCost extends UIListItem {
    static _poolSize: number = 20;
    /**材料消耗物品1 */
    @autowired(UIButton) costItem: UIButton = null;
    /**拥有材料消耗物品数量1 */
    @autowired(UILabel) storage: UILabel = null;
    /**材料消耗物品数量1 */
    @autowired(UILabel) require: UILabel = null;

    state: {
        item: Item;
        require: number;
        storage: number;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.costItem.bg.imgName = Item.getImg(this.state.item);
        this.costItem.setEnable(false);
        this.costItem.onClick = () => {
            // GWindow.open(WindowItemDescription, { item: this.state.item });
        };
        this.storage.setText(["_rs" + GUtils.ui.getNumberString(this.state.storage, 1)]);
        this.storage.node.color =
            this.state.storage >= this.state.require ? GConstant.costLabelColor.white : GConstant.costLabelColor.red;
        this.require.setText(["_rs/" + GUtils.ui.getNumberString(this.state.require, 1)]);
    }
}
