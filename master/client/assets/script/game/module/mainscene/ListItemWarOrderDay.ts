import { autowired, registerClass } from "../../../framework/Decorator";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemWarOrderDay")
@ccclass
export default class ListItemWarOrderDay extends UIListItem {
    @autowired(UILabel) day: UILabel = null;
    state: {
        isGray: boolean;
        day: number;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.day.setText(["_rs" + this.state.day]);
        if (this.state.isGray) {
            GUtils.ui.setAllChildSpGray(this.node);
        } else {
            GUtils.ui.setAllChildSpNormal(this.node);
        }
    }
}
