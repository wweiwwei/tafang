import { autowired, registerClass } from "../../../framework/Decorator";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
import UIWindow from "../../../framework/ui/UIWindow";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemPvpSwitchBoss")
@ccclass
export default class ListItemPvpSwitchBoss extends UIListItem {
    @autowired(UIImage) img: UIImage = null;
    @autowired(UILabel) nameLab: UILabel = null;
    @autowired(UIImage) tagHigh: UIImage = null;
    state: {
        imgStr: string;
        nameStr: string;
        isHigh: boolean;
    };

    setState(state: this["state"]): void {
        this.state = state;

        this.img.imgName = state.imgStr;
        this.nameLab.string = state.nameStr;
        this.tagHigh.node.active = state.isHigh;
    }
}
