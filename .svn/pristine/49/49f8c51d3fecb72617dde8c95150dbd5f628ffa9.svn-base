import { autowired, registerClass } from "../../../framework/Decorator";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemCareer1")
@ccclass
export default class ListItemCareer1 extends UIListItem {
    @autowired(UILabel) property: UILabel = null;
    @autowired(UILabel) oldval: UILabel = null;
    @autowired(UILabel) newval: UILabel = null;
    state: { property: string; oldval: number | string; newval: number | string };
    setState(state: this["state"]): void {
        this.state = state;
        this.property.setText([this.state.property]);
        this.oldval.setText(["_rs" + this.state.oldval]);
        this.newval.setText(["_rs" + this.state.newval]);
    }
}
