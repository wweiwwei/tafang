import { autowired, message, registerClass } from "../../../framework/Decorator";
import ResourceLoader from "../../../framework/ResourceLoader";
import UIListItem from "../../../framework/ui/UIListItem";
import UISpine from "../../../framework/ui/UISpine";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemEquipmentScenePlayer")
@ccclass
export default class ListItemEquipmentScenePlayer extends UIListItem {
    @autowired(UISpine) spine: UISpine = null;
    state: {};
    setState(state: this["state"]): void {
        this.state = state;
        const { x, y } = GModel.equipmentScene.data.player.pos;
        this.node.setPosition(cc.v2(x, y));
    }

    protected onInited(): void {
        this.spine.setSpine("Role_primitiveman", "01main", "idle");
    }

    private action = "idle";

    async attack() {
        if (this.action === "attack") return;
        const direction = GModel.equipmentScene.data.player.direction;
        if (direction.x > 0) {
            this.turnRight();
        } else {
            this.turnLeft();
        }
        this.action = "attack";
        this.spine.changeAnimation("attack", false);
        this.spine.setCompleteListener(() => {
            this.idle();
        });
    }

    walk() {
        if (this.action === "walk") return;
        this.action = "walk";
        this.spine.setCompleteListener(null);
        this.spine.changeAnimation("run", true);
    }

    idle() {
        if (this.action === "idle") return;
        this.action = "idle";
        this.spine.setCompleteListener(null);
        this.spine.changeAnimation("idle", true);
    }

    tick() {
        const data = GModel.equipmentScene.data.player;
        if (data.mode === "idle") {
            this.idle();
        } else if (data.mode === "attack") {
            this.attack();
        } else if (data.mode === "move") {
            this.walk();
        }
        this.node.position = cc.v3(data.pos.x, data.pos.y);
        if (data.direction.x > 0) {
            this.turnRight();
        } else {
            this.turnLeft();
        }
        this.node.zIndex = -data.pos.y;
    }

    private turnRight() {
        this.spine.node.scaleX = Math.abs(this.spine.node.scaleX);
    }

    private turnLeft() {
        this.spine.node.scaleX = -Math.abs(this.spine.node.scaleX);
    }
}
