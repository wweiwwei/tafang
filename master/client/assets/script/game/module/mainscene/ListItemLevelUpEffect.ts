import { autowired, registerClass } from "../../../framework/Decorator";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
import UIWindow from "../../../framework/ui/UIWindow";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemLevelUpEffect")
@ccclass
export default class ListItemLevelUpEffect extends UIListItem {
    state: {};
    setState(state: this["state"]): void {
        this.node.getComponent(cc.Animation).play();
        this.node.getComponent(cc.Animation).on("stop", () => {
            this.recycle();
        });
    }
}
