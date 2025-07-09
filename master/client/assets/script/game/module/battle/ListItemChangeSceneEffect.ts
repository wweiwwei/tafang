import { autowired, registerClass } from "../../../framework/Decorator";
import UIListItem from "../../../framework/ui/UIListItem";
const { ccclass, property } = cc._decorator;

@registerClass("ListItemChangeSceneEffect")
@ccclass
export default class ListItemChangeSceneEffect extends UIListItem {
    static _poolSize: number = 1;

    @autowired(sp.Skeleton) boss: sp.Skeleton = null;
    @autowired(cc.Node) trans: cc.Node = null;
    state: {
        kind: "boss" | "trans" | "enemy";
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.node.zIndex = -10;
        this.boss.node.active = false;
        this.trans.active = false;
        if (this.state.kind === "boss") {
            this.boss.node.active = true;
            this.boss.setAnimation(0, "Boss_coming", false);
            this.boss.setCompleteListener(() => {
                this.recycle();
            });
        } else if (this.state.kind === "enemy") {
            this.boss.node.active = true;
            this.boss.setAnimation(0, "Enemies_coming", false);
            this.boss.setCompleteListener(() => {
                this.recycle();
            });
        } else {
            this.trans.active = true;
            this.trans.opacity = 255;
            this.scheduleOnce(() => {
                cc.tween(this.trans)
                    .to(0.3, { opacity: 0 }, { easing: "sineInOut" })
                    .call(() => {
                        this.recycle();
                    })
                    .start();
            }, 0.5);
        }
    }
}
