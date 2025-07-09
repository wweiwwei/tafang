import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemGMServerSelect")
@ccclass
export default class ListItemGMServerSelect extends UIListItem {
    @autowired(UIButton)
    btn: UIButton = null;

    state: {
        serverName: string;
        cb: Function;
    };

    setState(state: this["state"]) {
        this.state = state;
        this.btn.text.setText(["_rs" + state.serverName]);
        this.btn.onClick = () => {
            this.state.cb();
        };
    }
}
