import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemEquipmentSceneBullet")
@ccclass
export default class ListItemEquipmentSceneBullet extends UIListItem {
    static _poolSize: number = 1;

    @autowired(cc.Node) item: cc.Node = null;

    state: {
        targetUniqueId: number;
    };

    private hasInit = false;
    private pos: number[] = [];

    setState(state: this["state"]): void {
        this.state = state;
        this.initBullet();
    }

    initBullet() {
        this.hasInit = true;
        this.item.angle = 0;
        this.item.scale = GConstant.equipmentScene.bulletScale;
        this.pos = [GConstant.equipmentScene.playerPos.x, GConstant.equipmentScene.playerPos.y];
        this.refreshPos();
    }
    /** 刷新位置，返回是否命中 */
    refreshPos(): boolean {
        if (!this.hasInit) return false;
        const target = GModel.equipmentScene.getEquipmentMonsterWithPosition(this.state.targetUniqueId);
        const { x, y } = target.pos;
        const current = cc.v3(this.pos[0], this.pos[1]);
        const direction = cc.v3(x, y).sub(current);
        this.node.position = current.add(direction.normalize().mul(GConstant.equipmentScene.bulletSpeed));
        this.pos = [this.node.position.x, this.node.position.y];
        this.item.angle += GConstant.equipmentScene.bulletRotateSpeed;
        return direction.mag() < GConstant.equipmentScene.bulletHitDistance;
    }

    protected onRecycle(): void {
        this.hasInit = false;
    }
}
