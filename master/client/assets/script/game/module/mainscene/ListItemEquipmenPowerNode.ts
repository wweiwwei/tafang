import { autowired, registerClass } from "../../../framework/Decorator";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemEquipmenPowerNode")
@ccclass
export default class ListItemEquipmenPowerNode extends UIListItem {
    @autowired(UILabel) label1: UILabel = null;
    @autowired(UILabel) label2: UILabel = null;
    @autowired(UIImage) icon: UIImage = null;
    state: {
        property: string;
        before: number;
        after: number;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.icon.node.active = this.state.after !== this.state.before;
        if (this.state.after > this.state.before) {
            this.icon.imgName = "new_common_up";
        }
        if (this.state.after < this.state.before) {
            this.icon.imgName = "new_common_down";
        }

        this.label1.setText([GIndex.battle.propertyText(this.state.property)]);
        this.label2.setText(["_rs" + GIndex.battle.propertyShowMethod(this.state.property)(state.after)]);
    }
}
