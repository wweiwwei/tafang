import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemBtn")
@ccclass
export default class ListItemBtn extends UIListItem {
    @autowired(UIImage) img: UIImage = null;
    @autowired(UILabel) label: UILabel = null;
    @autowired(UIImage) exclamation: UIImage = null;
    @autowired(UIButton) btn: UIButton = null;
    state: { img: string; label: string; id: number; cb: () => void; show: boolean };
    setState(state: this["state"]): void {
        this.state = state;
        this.btn.onClick = this.state.cb;
        this.img.imgName = this.state.img;
        this.label.setText([this.state.label]);
        this.exclamation.node.active = this.state.show;
    }
}
