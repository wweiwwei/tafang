import { autowired, registerClass } from "../../../framework/Decorator";
import UIListItem from "../../../framework/ui/UIListItem";
import UISpine from "../../../framework/ui/UISpine";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemUIMonster")
@ccclass
export default class ListItemUIMonster extends UIListItem {
    @autowired(UISpine) roleAnimation: UISpine = null;

    state: {
        id: number;
        scale: number;
    };

    setState(state: this["state"]): void {
        this.state = state;
        const tbl = GTable.getById("MonsterTbl", this.state.id);
        this.roleAnimation.setSpine(tbl.img, "default", "idle");
        this.setScale(this.state.scale);
        this.setPosition(0, 0);
    }

    setScale(scale: number) {
        this.roleAnimation.node.scale = scale;
    }

    setPosition(x: number, y: number) {
        this.roleAnimation.node.setPosition(x, y);
    }

    onInjected() {
        this.playIdle();
    }

    playIdle() {
        if (this.roleAnimation.animation === "idle") {
            return;
        }
        this.roleAnimation.changeAnimation("idle", true);
    }

    playWalk() {
        if (this.roleAnimation.animation === "walk") {
            return;
        }
        this.roleAnimation.changeAnimation("walk", true);
    }

    turnLeft() {
        if (this.roleAnimation.node.scaleX > 0) {
            this.roleAnimation.node.scaleX = -this.roleAnimation.node.scaleX;
        }
    }

    turnRight() {
        if (this.roleAnimation.node.scaleX < 0) {
            this.roleAnimation.node.scaleX = -this.roleAnimation.node.scaleX;
        }
    }
}
