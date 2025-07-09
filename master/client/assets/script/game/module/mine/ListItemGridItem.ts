import { autowired, registerClass } from "../../../framework/Decorator";
import UIImage from "../../../framework/ui/UIImage";
import UIListItem from "../../../framework/ui/UIListItem";
import { MineBrick } from "../../entity/MineBrick";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemGridItem")
@ccclass
export default class ListItemGridItem extends UIListItem {
    @autowired(UIImage) chosen: UIImage = null;
    @autowired(cc.Node) boomAni: cc.Node = null;
    state: { brick: MineBrick; chosen: boolean; canUse: boolean; x: number; y: number };
    setState(state: this["state"]): void {
        this.state = state;
        this.chosen.node.active = this.state.chosen;
        this.chosen.node.color = this.state.canUse ? GConstant.costLabelColor.green : GConstant.costLabelColor.red;
    }

    playBoom() {
        this.boomAni.active = true;
        let ani = this.boomAni.getChildByName("content").getComponent(cc.Animation);
        ani.play();
        ani.on("stop", () => {
            this.boomAni.active = false;
        });
    }
}
