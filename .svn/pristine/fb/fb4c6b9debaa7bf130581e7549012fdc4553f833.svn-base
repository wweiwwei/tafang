import { autowired, registerClass } from "../../../framework/Decorator";
import UIImage from "../../../framework/ui/UIImage";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemManorGrid")
@ccclass
export default class ListItemManorGrid extends UIListItem {
    @autowired(UIImage) bg: UIImage = null;
    state: { color: number };
    setState(state: this["state"]): void {
        this.state = state;
        this.setColor();
    }
    setColor() {
        this.bg.node.active = true;
        switch (this.state.color) {
            case 0:
                this.bg.node.color = GConstant.gridColor.normal;
                break;
            case 1:
                this.bg.node.color = GConstant.gridColor.green;
                break;
            case 2:
                this.bg.node.color = GConstant.gridColor.red;
                break;
            default:
                break;
        }
    }
}
