import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
import UIWindow from "../../../framework/ui/UIWindow";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemAttributePopItem")
@ccclass
export default class ListItemAttributePopItem extends UIListItem {
    @autowired(UIButton) click: UIButton = null;
    state: {
        text: string;
        cb: Function;
        name: string;
        color?: cc.Color;
    };
    setState(state: this["state"]): void {
        this.state = state;

        if (state.color) this.click.text.node.color = state.color;

        this.click.setTransition(false);
        this.click.onClick = () => {
            this.state.cb(this.state.name);
        };
        this.click.text.setText([state.text]);
    }
}
