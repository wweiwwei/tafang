import { autowired, registerClass } from "../../../framework/Decorator";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemPropertyItem")
@ccclass
export default class ListItemPropertyItem extends UIListItem {
    @autowired(UILabel) property: UILabel = null;
    @autowired(UILabel) value: UILabel = null;
    @autowired(UIImage) bg: UIImage = null;
    state: { property: string; value: number | string; index: number; page?: number }; // page:0-图鉴
    setState(state: this["state"]): void {
        this.state = state;
        this.property.setText([GIndex.battle.propertyText(this.state.property)]);
        if (this.state.page === 0) {
            this.value.setText(["_rs" + this.state.value]);
        } else {
            this.value.setText([
                "_rs" + (this.state.index > 3 ? Number(this.state.value) / 100 + "%" : this.state.value),
            ]);
        }
        this.state.index % 2 === 0 && (this.bg.node.active = false);
    }
}
