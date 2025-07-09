import { autowired, registerClass } from "../../../framework/Decorator";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
import WindowPropPropertyDetails from "../mainscene/WindowPropPropertyDetails";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemPropertyTipsItem2")
@ccclass
export default class ListItemPropertyTipsItem2 extends UIListItem {
    /** */
    @autowired(UILabel) nameLab: UILabel = null;
    /** */
    @autowired(UILabel) num: UILabel = null;

    state: { name: string; num: string; isClick?: boolean };
    setState(state: this["state"]): void {
        this.state = state;
        this.nameLab.setText([state.name], ["_rs:"]);
        this.num.setText(["_rs" + state.num]);
    }
}
