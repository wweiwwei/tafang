import { autowired, registerClass } from "../../../framework/Decorator";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
import UIWindow from "../../../framework/ui/UIWindow";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemSelectProp")
@ccclass
export default class ListItemSelectProp extends UIListItem {
    @autowired(UILabel) left: UILabel = null;
    @autowired(UILabel) right: UILabel = null;
    /**状态显示 */
    @autowired(UIImage) icon: UIImage = null;
    /**属性描述 */
    @autowired(UILabel) tips: UILabel = null;

    state: {
        left: string;
        right: string;
        iconStr?: string;
        tips?: string;
    };
    setState(state: this["state"]): void {
        this.state = state;

        this.left.setText([this.state.left]);
        this.right.setText([this.state.right]);
        state.iconStr ? (this.icon.imgName = state.iconStr) : (this.icon.imgName = "");
        state.tips ? this.tips.setText([state.tips]) : this.tips.setText([]);
        this.tips.node.active = state.tips !== null && state.tips !== undefined;
    }
}
