import { autowired, registerClass } from "../../../framework/Decorator";
import UIListItem from "../../../framework/ui/UIListItem";
import UISpine from "../../../framework/ui/UISpine";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemMinePlayer")
@ccclass
export default class ListItemMinePlayer extends UIListItem {
    @autowired(UISpine) role: UISpine = null;
    state: {
        pos: cc.Vec2;
    };
    private quick = false;
    setState(state: this["state"]): void {
        this.state = state;
        this.role.setSpine("Work_bear", "default", "idle");
        this.setPlayerPos(state.pos.x, state.pos.y, 0);
    }

    /** 前往 */
    setPlayerPos(x: number, floor: number, time: number = 0.2) {
        this.quick && (time = 0);
        let pos = new cc.Vec2();
        pos.x = x * this.node.width + 50;
        const baseY = GModel.mine.getCurrentFloor() - 5;
        const y = floor - baseY;
        if (y >= 0) {
            // pos.y = (floor - baseY) * this.node.height + 150;
            pos.y = (GModel.mine.getCurrentFloor() - floor) * this.node.height + 50;
        }
        console.log("hxz_角色前往", pos, x, floor);
        if (time === 0) {
            this.node.setPosition(pos);
        } else {
            return new Promise((resolve, reject) => {
                cc.tween(this.node).to(time, { x: pos.x, y: pos.y }).call(resolve).start();
            });
        }
    }

    /**改变方向 */
    changeDirection(direction: "left" | "right") {
        if (direction == "left") this.node.scaleX = 1;
        if (direction == "right") this.node.scaleX = -1;
    }

    /**播放静止动画 */
    private playStillness() {}

    /** 快速模式 */
    setQuick(b: boolean) {
        this.quick = b;
        this.role.timeScale = b ? 3 : 2;
    }

    /** 闲置 */
    playIdle() {
        this.role.changeAnimation("idle", true);
    }

    /** 击打砖块 */
    playHit() {
        this.role.changeAnimation("work", false);
        this.role.timeScale = this.quick ? 4 : 3;
        // 击打后切回空闲状态
        this.role.setCompleteListener(() => {
            this.playIdle();
            this.role.timeScale = this.quick ? 3 : 2;
        });
    }
}
