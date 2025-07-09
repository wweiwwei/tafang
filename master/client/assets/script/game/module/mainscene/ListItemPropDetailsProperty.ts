import { autowired, registerClass } from "../../../framework/Decorator";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemPropDetailsProperty")
@ccclass
export default class ListItemPropDetailsProperty extends UIListItem {
    @autowired(UILabel) propertyLab: UILabel = null;
    @autowired(UILabel) des: UILabel = null;
    state: {
        text1: string;
        text2: string;
        text3: string;
        des?: string;
    };
    setState(state: this["state"]): void {
        this.state = state;
        // console.log("state =", state);
        if (state) this.propertyLab.setText([this.state.text1], [this.state.text2], [this.state.text3]);
        else {
            this.propertyLab.setText([]);
        }
        if (state.des) {
            this.des.node.active = true;
            this.des.setText([state.des]);
        } else this.des.node.active = false;
    }
}
