import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemDailyChest")
@ccclass
export default class ListItemDailyChest extends UIListItem {
    @autowired(UIButton) chestBtn: UIButton = null;
    state: {
        isGray: boolean;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.chestBtn.setGrey(this.state.isGray);
    }
}
