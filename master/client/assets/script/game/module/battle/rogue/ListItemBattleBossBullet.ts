import { autowired, registerClass } from "../../../../framework/Decorator";
import UIListItem from "../../../../framework/ui/UIListItem";
import UISpine from "../../../../framework/ui/UISpine";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemBattleBossBullet")
@ccclass
export default class ListItemBattleBossBullet extends UIListItem {
    @autowired(UISpine) spine: UISpine = null;

    state: {
        img: string;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.initBullet();
        this.setAnimationSpeed(1);
    }
    setAnimationSpeed(ts: number) {
        this.spine.timeScale = ts * GModel.battle.getBattleSpeed();
    }

    initBullet() {
        this.spine.setSpine(this.state.img, "default", "general_tail");
    }

    playEnd() {
        this.spine.changeAnimation("skillattack", false);
        this.spine.setCompleteListener(() => {
            this.spine.setCompleteListener(null);
            this.recycle();
        });
    }
}
