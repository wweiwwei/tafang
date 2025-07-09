import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIListItem from "../../../framework/ui/UIListItem";
import UISpine from "../../../framework/ui/UISpine";
import EventName from "../../event/EventName";
const { ccclass, property } = cc._decorator;

@registerClass("ListItemBattlePortal")
@ccclass
export default class ListItemBattlePortal extends UIListItem {
    @autowired(sp.Skeleton) spine: sp.Skeleton = null;

    state: {
        position: { x: number; y: number };
    };
    setState(state: this["state"]): void {
        this.node.active = true;
        this.resetTimer();
        this.state = state;
        this.node.position = cc.v3(this.state.position.x, this.state.position.y);
        this.spine.setCompleteListener(() => {
            this.spine.setAnimation(0, "idle", true);
            this.spine.setCompleteListener(null);
        });
        this.node.zIndex = -this.state.position.y;
    }

    reActive(position: { x: number; y: number }) {
        if (!this.node.active) {
            this.spine.setAnimation(0, "enter", false);
            this.spine.setCompleteListener(() => {
                this.spine.setAnimation(0, "idle", true);
                this.spine.setCompleteListener(null);
            });
        }
        this.node.position = cc.v3(position.x, position.y);
        this.node.active = true;
        this.resetTimer();
    }

    private time = 0;

    resetTimer() {
        this.time = 0;
    }

    update(dt: number) {
        if (!GModel.battle.isPauseBattle()) {
            this.time += dt;
            if (this.time > 2) {
                this.node.active = false;
            }
        }
    }
}
