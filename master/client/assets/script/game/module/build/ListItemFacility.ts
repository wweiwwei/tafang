import { autowired, message, registerClass } from "../../../framework/Decorator";
import ResourceLoader from "../../../framework/ResourceLoader";
import UIImage from "../../../framework/ui/UIImage";
import UIListItem from "../../../framework/ui/UIListItem";
import EventName from "../../event/EventName";
const { ccclass, property } = cc._decorator;

@registerClass("ListItemFacility")
@ccclass
export default class ListItemFacility extends UIListItem {
    state: {
        id: number; // 建筑id
        buildPos?: cc.Vec2; //建筑坐标
        buildFloor?: number; //建筑所在楼层
    };

    setState(state: this["state"]): void {
        this.state = state;
    }

    private hasInit = false;
    buildingNode: cc.Node = null;
    lockNode: cc.Node = null;
    unlockableNode: cc.Node = null;

    async initFacility() {
        const tbl = GTable.getById("FacilityTbl", this.state.id);
        const posTbl = GTable.getById("FacilityPositionTbl", tbl.posId);
        this.node.zIndex = posTbl.zIndex;
        this.node.setPosition(posTbl.position[0], posTbl.position[1]);
        const prefab = await ResourceLoader.loadPrefab(tbl.prefab);
        const node = cc.instantiate(prefab);
        this.buildingNode = node;
        this.node.addChild(node);
        this.hasInit = true;
        this.lockNode = this.buildingNode.getChildByName("lock");
        this.unlockableNode = this.buildingNode.getChildByName("unlockable");
        this.refresh();
        const container = this.node.parent;
        GModel.facility.setPositionInfo(
            this.state.id,
            null,
            null,
            this.getObstacleRect().map((r) => GUtils.ui.transformRect(r, container))
        );
    }

    getState(): this["state"] {
        return this.state;
    }

    private getObstacleRect(): cc.Rect[] {
        return this.buildingNode.children
            .map((n) => n.getComponent(cc.BoxCollider))
            .filter((c) => c)
            .map((c) => {
                const size = c.size;
                const pos = c.node.convertToWorldSpaceAR(c.offset);
                const r = new cc.Rect(pos.x - size.width / 2, pos.y - size.height / 2, size.width, size.height);
                return r;
            });
    }

    @message([EventName.stateKey.facility])
    refresh() {
        if (this.hasInit && this.lockNode) {
            this.lockNode.active = !GModel.facility.getFacilityById(this.state.id).unlock;
        }
        if (this.hasInit && this.unlockableNode) {
            const f = GModel.facility.getFacilityById(this.state.id);
            this.unlockableNode.active = !f.unlock && f.isFacilityUnlockable(false);
        }
    }
}
