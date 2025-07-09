import EventBus from "../../framework/event/EventBus";
import { PlayerSkill } from "../entity/PlayerSkill";
import EventName from "../event/EventName";

export default class PlayerSkillModel {
    /**获取方案 */
    getFormation(key: number): number[] {
        return GState.data.skillFormation[key];
    }
    /** 设置方案 */
    async setFormation(key: number, formation: number[]): Promise<void> {
        await GApi.playerSkill.setFormation({ key, formation });
        EventBus.emit(EventName.resetBattle);
    }
    /** 切换方案 */
    async changeFormation(key: number): Promise<void> {
        await GApi.playerSkill.changeFormation({ key });
        EventBus.emit(EventName.resetBattle);
    }
    /** 升级技能 */
    async upgradeSkill(id: number): Promise<void> {
        await GApi.playerSkill.upgradeSkill({ id });
        EventBus.emit(EventName.resetBattle);
    }
    /** 升级全部技能 */
    async upgradeAllSkill(): Promise<void> {
        if (this.getSkills().some((s) => s.canUpgrade())) {
            await GApi.playerSkill.upgradeAllSkill();
            EventBus.emit(EventName.resetBattle);
        } else {
            GTip.showTip([GLang.code.ui.no_skills]);
        }
    }
    /**获得技能列表 */
    getSkills(): PlayerSkill[] {
        return Object.keys(GState.data.playerSkill).map((id) => {
            return GState.data.playerSkill[id];
        });
    }
    /**根据id获取 */
    getSkillById(id: number): PlayerSkill {
        return GState.data.playerSkill[id];
    }
    /**获取属性字段 */
    getProperty(): string[][] {
        return;
    }
}
