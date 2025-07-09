import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
import WindowPropPropertyDetails from "../mainscene/WindowPropPropertyDetails";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemPropertyTipsItem")
@ccclass
export default class ListItemPropertyTipsItem extends UIListItem {
    /** */
    @autowired(UILabel) nameLab: UILabel = null;
    /** */
    @autowired(UILabel) num: UILabel = null;

    state: { name: string; num: string; key?: string; isClick?: boolean };
    setState(state: this["state"]): void {
        this.state = state;
        let btn = this.node.getComponent(UIButton);
        btn.setTransition(state.isClick);
        btn.setEnable(state.isClick);
        btn.onClick = () => {
            GWindow.open(WindowPropPropertyDetails, { pos: this.node.position, key: state.key });
        };
        this.nameLab.setText([state.name], ["_rs:"]);
        this.num.setText(["_rs" + state.num]);
    }
}
