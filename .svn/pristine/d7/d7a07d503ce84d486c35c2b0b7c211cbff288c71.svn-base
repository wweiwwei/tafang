import { autowired, registerClass } from "../../../framework/Decorator";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
import { CardPoolMenuType } from "./WindowCardPool";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemEquipProperty")
@ccclass
export default class ListItemEquipProperty extends UIListItem {
    @autowired(UILabel) property: UILabel = null;
    /**数值 */
    @autowired(UILabel) value: UILabel = null;
    @autowired(UILabel) plus: UILabel = null;

    state: {
        value: number | string;
        property: string;
        plus: number | string;
        next?: boolean;
    };
    setState(state: this["state"]): void {
        this.state = state;
        if (this.state.next) {
            this.value.node.color = this.plus.node.color;
            this.property.node.color = this.plus.node.color;
        } else {
            this.value.node.color = cc.color().fromHEX("#544037");
            this.property.node.color = cc.color().fromHEX("#544037");
        }
        this.value.setText(["_rs" + this.state.value]);
        this.property.setText([GIndex.battle.propertyText(this.state.property)], ["_rs"]);
        this.plus.node.active = !(this.state.plus == 0 || this.state.plus == "0%");
        this.plus.setText(["_rs+" + this.state.plus]);
    }
}
