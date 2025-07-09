import { autowired, registerClass } from "../../../framework/Decorator";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemProperty")
@ccclass
export default class ListItemProperty extends UIListItem {
    @autowired(UILabel) label: UILabel = null;
    state: { property: string[][]; color: cc.Color };
    setState(state: this["state"]): void {
        this.state = state;
        this.label.setText(...this.state.property);
        this.label.node.color = this.state.color;
    }
}
