import { autowired, registerClass } from "../../../framework/Decorator";
import UIListItem from "../../../framework/ui/UIListItem";
import UISpine from "../../../framework/ui/UISpine";
const { ccclass, property } = cc._decorator;

@registerClass("ListItemBattleTowerEmpty")
@ccclass
export default class ListItemBattleTowerEmpty extends UIListItem {
    @autowired(cc.Node) lock: cc.Node = null;
    @autowired(cc.Node) empty: cc.Node = null;

    protected onInjected(): void {}
    state: {
        index: number;
        peace: boolean;
    };
    setState(state: this["state"]): void {
        this.state = state;
        const { x, y } = GModel.defendTower.getDefaultSceneTowerPos()[this.state.index];
        this.node.x = x;
        this.node.y = y;
        this.refresh();
    }

    refresh() {
        const formation = GModel.defendTower.getTowerFormation();
        if (!this.state.peace || formation[this.state.index] >= 0) {
            this.lock.active = false;
            this.empty.active = false;
        } else {
            const unlock = GModel.defendTower.isTowerPlaceUnlock(this.state.index);
            this.lock.active = !unlock;
            this.empty.active = unlock;
        }
    }
}
