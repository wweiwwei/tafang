import { autowired, registerClass } from "../../../framework/Decorator";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemImproveItem")
@ccclass
export default class ListItemImproveItem extends UIListItem {
    @autowired(UILabel) power: UILabel = null;
    state: {
        property: string;
        value: number | string;
        wear: boolean;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.power.setText(
            [GIndex.battle.propertyText(this.state.property)],
            ["_rs" + ":" + (this.state.wear ? "+" : "-") + this.state.value]
        );
        this.power.node.color = GConstant.qualityColor[this.state.wear ? 0 : 4];
    }
}
