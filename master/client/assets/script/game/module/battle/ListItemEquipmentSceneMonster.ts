import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIListItem from "../../../framework/ui/UIListItem";
import UISpine from "../../../framework/ui/UISpine";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemEquipmentSceneMonster")
@ccclass
export default class ListItemEquipmentSceneMonster extends UIListItem {
    static _poolSize: number = 8;

    @autowired(UISpine) spine: UISpine = null;
    @autowired(cc.ProgressBar) lifeBar: cc.ProgressBar = null;
    @autowired(cc.Node) barContainer: cc.Node = null;
    @autowired(cc.Node) shadow: cc.Node = null;

    state: {
        uniqueId: number;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.initMonster();
    }
    private hasInit = false;
    initMonster() {
        this.hasInit = true;
        const data = GModel.equipmentScene.data.getMonster(this.state.uniqueId);
        this.spine.setSpine(data.info.img, "default", "walk");
        this.node.scale = data.tbl.scale;
        this.refreshLife(data.info.life, data.tbl.life);
        this.tick();
    }

    /** 刷新位置 */
    tick() {
        if (!this.hasInit) return;
        const data = GModel.equipmentScene.data.getMonster(this.state.uniqueId);
        if (!data) return;
        if (data.direction.x > 0) {
            this.turnRight();
        } else {
            this.turnLeft();
        }
        this.node.setPosition(data.pos.x, data.pos.y);
        this.refreshLife(data.info.life, data.tbl.life);
        this.node.zIndex = -data.pos.y;
    }
    private turnRight() {
        this.spine.node.scaleX = Math.abs(this.spine.node.scaleX);
    }

    private turnLeft() {
        this.spine.node.scaleX = -Math.abs(this.spine.node.scaleX);
    }
    /** 受击 */
    hit() {}

    die() {
        this.recycle();
    }

    refreshLife(life: number, maxLife: number) {
        this.lifeBar.progress = life / maxLife;
    }

    protected onRecycle(): void {
        this.hasInit = false;
    }
}
