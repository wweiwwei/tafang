import EventBus from "../../framework/event/EventBus";
import { EquipmentMonster } from "../entity/EquipmentMonster";
import EventName from "../event/EventName";
import EquipmentSceneData from "../module/battle/equipmentScene/EquipmentSceneData";

export default class EquipmentSceneModel {
    init() {
        // this.data = new EquipmentSceneData(GConstant.equipmentScene.mapName);
        // EventBus.on(EventName.stateKey.equipmentMonster, this.onMonsterRefresh, this);
    }

    onMonsterRefresh() {
        this.data.checkMonster();
        EventBus.emit(EventName.equipmentSceneMonsterRefresh);
    }

    data: EquipmentSceneData;

    /** 获取所有的装备怪 */
    allEquipmentMonster(): EquipmentMonster[] {
        return Object.keys(GState.data.equipmentMonster).map((k) => GState.data.equipmentMonster[k]);
    }

    /** 当前目标 */
    currentTargetMonster(): number {
        return Number(Object.keys(GState.data.equipmentMonster)[0]);
    }
    /** 是否可以使用全体攻击模式 */
    isCanUseAllAttackMode(): boolean {
        const remainStorage = GModel.knapsack.getStorageById(GIndex.id.turntableStorageId);
        const allLife = GUtils.array.sumBy(this.allEquipmentMonster(), (x) => x.life);
        return remainStorage >= allLife;
    }
    allMonsterUniqueId() {
        return Object.keys(GState.data.equipmentMonster).map((k) => Number(k));
    }
}
