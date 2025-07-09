import EventBus from "../../framework/event/EventBus";
import Equipment, { EquipmentWrapper } from "../entity/Equipment";
import Hero from "../entity/Hero";
import EventName from "../event/EventName";
import WindowCommonConfirm from "../module/common/WindowCommonConfirm";

export default class HeroModel {
    /** 合成英雄 */
    composeHero(id: number) {
        return GApi.hero.composeHero({ id });
    }
    /** 英雄升级 */
    async upgradeHeroLevel(uniqueId: number, count: number) {
        await GApi.hero.upgradeHeroLevel({ uniqueId, count });
        this.checkReset(uniqueId);
    }
    /**升级上阵英雄 */
    upgradeAllHero() {
        GApi.hero.upgradeAllHero();
        EventBus.emit(EventName.resetBattle);
    }
    /** 英雄升阶 */
    async upgradeHeroRank(uniqueId: number) {
        await GApi.hero.upgradeHeroRank({ uniqueId });
        this.checkReset(uniqueId);
    }
    /** 英雄升星 */
    async upgradeHeroStar(uniqueId: number) {
        await GApi.hero.upgradeHeroStar({ uniqueId });
        this.checkReset(uniqueId);
    }
    /** 获取所有英雄 */
    getAllHero(): Hero[] {
        return Object.keys(GState.data.hero).map((k) => GState.data.hero[k]);
    }
    /** 从uniqueId获取英雄 */
    getHeroByUniqueId(uniqueId: number) {
        return GState.data.hero[uniqueId];
    }
    /** 批量英雄合成 */
    batchComposeHero() {
        return GApi.hero.batchComposeHero();
    }
    /** 获取编队 */
    getFormation(): number[] {
        return (GState.data.formation["default"] || [-1, -1, -1, -1, -1]).map((e) => e);
    }
    /** 设置编队 */
    async setFormation(formation: number[]) {
        const origin = this.getFormation();
        let canChange = false;
        for (let i = 0; i < origin.length; i++) {
            if (origin[i] !== -1 && formation[i] !== -1 && origin[i] !== formation[i]) {
                canChange = true;
                break;
            }
        }
        let change = false;
        if (canChange) {
            change = await GWindow.open(WindowCommonConfirm, {
                tip: [GLang.code.ui.hero_change_level],
            });
        }
        await GApi.hero.setFormation2({ key: "default", formation: formation.slice(0, 5), change });
        EventBus.emit(EventName.resetBattle);
    }

    /** 获取全部装备 */
    getAllEquipment(): Equipment[] {
        return Object.keys(GState.data.equipment).map((k) => GState.data.equipment[k]);
    }
    /** 获取空闲装备 */
    getIdleEquipment(): EquipmentWrapper[] {
        return this.getAllEquipment()
            .map((v) => v.getEquipmentWrapperList())
            .reduce((acc, cur) => acc.concat(cur), [])
            .filter((t) => t.heroUniqueId === -1);
    }

    /** 通过id获取装备 */
    getEquipmentById(id: number): Equipment {
        return GState.data.equipment[id];
    }

    /** 设置英雄装备 */
    async setHeroEquipment(uniqueId: number, equipment: { id: number; level: number; rank: number }[]) {
        await GApi.hero.setHeroEquipment({ uniqueId, equipment });
        this.checkReset(uniqueId);
    }

    /** 消耗其他装备，升级装备 */
    upgradeEquipmentLevel(id: number, level: number, rank: number, count: number) {
        return GApi.hero.upgradeEquipmentLevel({ id, level, rank, count });
    }

    /**
     * 替换英雄装备
     * @param uniqueId 英雄唯一id
     * @param part 装备位置
     * @param equipment 装备
     * @param fromHero 装备来源英雄，如果是空闲装备填-1
     * */
    async replaceEquipment(
        uniqueId: number,
        part: number,
        equipment: { id: number; level: number; rank: number },
        fromHero: number
    ) {
        let origin = GModel.hero.getHeroByUniqueId(uniqueId);
        let change = false;
        if (equipment !== null && origin.equipment[part] !== null) {
            change = await GWindow.open(WindowCommonConfirm, {
                tip: [GLang.code.ui.hero_change_level],
            });
        }
        await GApi.hero.replaceEquipment2({ uniqueId, part, equipment, fromHero, change });
        let count = GModel.hero.getHeroByUniqueId(uniqueId).getBattlePoint() - origin.getBattlePoint();
        GTip.showPower([[GLang.code.ui.hero_power], ["_rs" + (count > 0 ? "+" + count.toString() : count)]]);
        this.checkReset(uniqueId);
        if (fromHero > 0) this.checkReset(fromHero);
    }

    /** 升级英雄装备 */
    async upgradeHeroEquipmentLevel(uniqueId: number, part: number, count: number) {
        await GApi.hero.upgradeHeroEquipmentLevel({ uniqueId, part, count });
        this.checkReset(uniqueId);
    }
    /** 升级英雄全部装备 */
    async upgradeAllEquipmentLevel(uniqueId: number) {
        await GApi.hero.upgradeAllEquipmentLevel({ uniqueId });
        this.checkReset(uniqueId);
    }

    /** 升级装备阶数 */
    upgradeEquipmentRank(id: number, level: number, rank: number) {
        return GApi.hero.upgradeEquipmentRank({ id, level, rank });
    }

    /** 升级英雄装备阶数 */
    async upgradeHeroEquipmentRank(uniqueId: number, part: number) {
        await GApi.hero.upgradeHeroEquipmentRank({ uniqueId, part });
        this.checkReset(uniqueId);
    }

    /** 检查是否需要重置战斗 */
    private checkReset(uniqueId: number) {
        if (this.getFormation().includes(uniqueId)) {
            EventBus.emit(EventName.resetBattle);
        }
    }
    /**是否可上阵 */
    canFormate(): boolean {
        return GModel.hero
            .getAllHero()
            .filter((h) => !h.isFormated())
            .some((h) => h.canFormat());
    }
    /**批量升级英雄装备 */
    // upgradeHeroAllEquipmentLevel(uniqueId: number, count: number) {
    //     return GApi.hero.upgradeHeroAllEquipmentLevel({ uniqueId, count });
    // }
}
