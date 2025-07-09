import { autowired, registerClass } from "../../../framework/Decorator";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
const { ccclass, property } = cc._decorator;

@registerClass("ListItemEquipmentDispearText")
@ccclass
export default class ListItemEquipmentDispearText extends UIListItem {
    static _poolSize: number = 12;

    @autowired(UILabel) text: UILabel = null;

    static color = [cc.color(253, 241, 38), cc.color(177, 234, 40)];
    state: {
        position: { x: number; y: number };
        text: string[];
        colorIndex: number;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.node.position = cc.v3(this.state.position.x, this.state.position.y);
        this.text.node.color = ListItemEquipmentDispearText.color[this.state.colorIndex];
        this.text.setText(this.state.text);
        this.doTween();
    }

    doTween() {
        cc.tween(this.node)
            .by(0.5, { y: 100 }, { easing: "sineOut" })
            .call(() => {
                this.recycle();
            })
            .start();
    }
}
