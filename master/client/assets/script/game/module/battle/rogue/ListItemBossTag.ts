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
@registerClass("ListItemBossTag")
@ccclass
export default class ListItemBossTag extends UIListItem {
    @autowired(UILabel) nameLab: UILabel = null;

    state: {
        text: string[];
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.nameLab.setText(this.state.text);
    }
}
