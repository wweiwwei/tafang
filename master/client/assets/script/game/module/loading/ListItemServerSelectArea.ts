import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemServerSelectArea")
@ccclass
export default class ListItemServerSelectArea extends UIListItem {
    @autowired(UIButton) btn: UIButton = null;
    @autowired(UILabel) label: UILabel = null;
    @autowired(UIImage) bg: UIImage = null;
    state: {
        text: string;
        cb: Function;
        checked: boolean;
    };

    setState(state: this["state"]) {
        this.state = state;
        this.label.setText(["_rs" + state.text]);
        this.bg.imgName = state.checked ? "server_select_bg_area" : "server_select_bg_area2";
        this.btn.onClick = () => {
            this.state.cb();
        };
    }
}
