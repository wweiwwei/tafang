import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemRoleMenu")
@ccclass()
export default class ListItemRoleMenu extends UIListItem {
    @autowired(UIImage) icon: UIImage = null;
    @autowired(UILabel) label: UILabel = null;
    @autowired(UIImage) unlock: UIImage = null;

    state: {
        text: string;
        iconName: string;
        isUnlock: boolean;
    };
    setState(state: this["state"]): void {
        this.icon.imgName = state.iconName;
        this.label.setText([state.text]);
        this.unlock.node.active = state.isUnlock;
    }
}
