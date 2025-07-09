import { autowired, registerClass } from "../../../framework/Decorator";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
import UIWindow from "../../../framework/ui/UIWindow";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemClearAd")
@ccclass
export default class ListItemClearAd extends UIListItem {
    @autowired(UIImage) itemImg: UIImage = null;
    @autowired(UILabel) label1: UILabel = null;
    @autowired(UILabel) label2: UILabel = null;
    state: {
        imgName: string;
        text1: string;
        text2: string;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.label1.setText([this.state.text1]);
        this.label2.setText([this.state.text2]);
        this.itemImg.imgName = this.state.imgName;
    }
}
