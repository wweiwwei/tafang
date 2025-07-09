import EventBus from "../../framework/event/EventBus";
import { Pet } from "../entity/Pet";
import EventName from "../event/EventName";

export default class PetModel {
    getFormation(key: number): number[] {
        return GState.data.petFormation[key];
    }
    /** 设置方案 */
    async setFormation(key: number, formation: number[]): Promise<void> {
        await GApi.playerPet.setFormation({ key, formation });
        EventBus.emit(EventName.resetBattle);
    }
    /** 切换方案 */
    async changeFormation(key: number): Promise<void> {
        await GApi.playerPet.changeFormation({ key });
        EventBus.emit(EventName.resetBattle);
    }
    /** 升级技能 */
    async upgradePet(id: number): Promise<void> {
        await GApi.playerPet.upgradePet({ id });
        EventBus.emit(EventName.resetBattle);
    }
    /** 升级全部技能 */
    async upgradeAllPet(): Promise<void> {
        await GApi.playerPet.upgradeAllPet();
        EventBus.emit(EventName.resetBattle);
    }
    /**获得技能列表 */
    getPets(): Pet[] {
        return Object.keys(GState.data.playerPet).map((id) => {
            return GState.data.playerPet[id];
        });
    }
    /**根据id获取 */
    getPetById(id: number): Pet {
        return GState.data.playerPet[id];
    }
    /**获取属性字段 */
    getProperty(): string[][] {
        return;
    }
}
