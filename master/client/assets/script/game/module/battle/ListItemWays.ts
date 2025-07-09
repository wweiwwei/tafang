import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemWays")
@ccclass
export default class ListItemWays extends UIListItem {
    @autowired(UILabel) label: UILabel = null;
    @autowired(UIImage) image: UIImage = null;
    @autowired(UIButton) btn: UIButton = null;
    state: {
        img: string;
        label: string;
        cb: () => void;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.image.imgName = this.state.img;
        this.label.setText([GLang.code.ui[this.state.label]]);
        this.btn.onClick = this.state.cb;
    }
}
