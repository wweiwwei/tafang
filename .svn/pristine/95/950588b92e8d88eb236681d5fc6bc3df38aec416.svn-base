import { autowired, registerClass } from "../../../../framework/Decorator";
import UIButton from "../../../../framework/ui/UIButton";
import UIImage from "../../../../framework/ui/UIImage";
import UILabel from "../../../../framework/ui/UILabel";
import UIList from "../../../../framework/ui/UIList";
import UIListItem from "../../../../framework/ui/UIListItem";
import Item from "../../../entity/Item";
import ListItemItem from "../../common/ListItemItem";
import ListItemCost from "../../hero/ListItemCost";
const { ccclass, property } = cc._decorator;
@registerClass("ListItemBuySkill")
@ccclass
export default class ListItemBuySkill extends UIListItem {
    @autowired(UIImage) img: UIImage = null;
    // @autowired(UIImage) costImg: UIImage = null;
    @autowired(UIButton) buyItem: UIButton = null;
    @autowired(UIList) cost: UIList<ListItemCost> = null;
    @autowired(UILabel) nameLab: UILabel = null;

    state: {
        /** 消耗物品 */
        item: Item;
        index: number;
        cb: Function;
        require: number;
        storage: number;
        text: string[];
        img: string;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.node.name = this.state.index.toString();
        this.cost.setState([{ item: state.item, require: state.require, storage: state.storage }]);
        this.buyItem.bg.imgName =
            this.state.storage < this.state.require ? "battle_buySkillItembg2" : "battle_buySkillItembg";
        this.buyItem.onClick = () => {
            if (this.state.storage < this.state.require) {
                let tbl = GTable.getById("ItemTbl", state.index > 1 ? 10015 : 10014);
                GTip.showTip([tbl.name], ["_rs" + "物品物品不足！"]);
                return;
            }
            this.state.cb();
        };
        let text = "";
        if (state.index == 0) {
            text = GLang.code.ui.rogue_buy_equipment1_desc;
        } else if (state.index == 1) {
            text = GLang.code.ui.rogue_buy_equipment2_desc;
        } else {
            text = GLang.code.ui.rogue_buy_rare_desc;
        }
        let buyText = text;
        this.buyItem.text.setText([buyText]);
        this.nameLab.setText(this.state.text);
        this.img.imgName = state.img;
    }
}
