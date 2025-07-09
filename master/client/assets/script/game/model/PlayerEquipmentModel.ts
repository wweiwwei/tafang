import EventBus from "../../framework/event/EventBus";
import BattleFactory from "../battleLogic/Utils/BattleFactory";
import { EnumHeroProperty } from "../config/GEnum";
import Item from "../entity/Item";
import { PlayerEquipment } from "../entity/PlayerEquipment";
import { PlayerEquipmentPlace } from "../entity/PlayerEquipmentPlace";
import EventName from "../event/EventName";

export default class PlayerEquipmentModel {
    /** 主角装备 */
    equipment(): (PlayerEquipment | null)[] {
        return GState.data.playerEquipment.map((uid) => GState.data.playerEquipmentStorage[uid] || null);
    }
    /** 临时装备 */
    temp(): PlayerEquipment[] {
        return GState.data.tempEquipment.map((uid) => GState.data.playerEquipmentStorage[uid]);
    }
    /**
     * 替换装备
     * tempIndex:临时装备index
     * sell:是否自动出售替换下来的装备
     * */
    async replace(tempIndex: number, sell: boolean, part: number) {
        sell = sell || false;
        const temp = this.temp()[tempIndex];
        const origin = this.equipment()[part];
        if (temp == null || origin == null) {
            const originFormation = GModel.defendTower.getTowerFormation();
            const before = GModel.battle.getBattlePoint();
            const res = await GApi.playerEquipment.replace({ tempIndex, sell });
            const after = GModel.battle.getBattlePoint();
            const finalFormation = GModel.defendTower.getTowerFormation();
            if (originFormation !== finalFormation) {
                // 塔被自动上阵了
                const changeIndex = originFormation.findIndex((uid, i) => uid !== finalFormation[i]);
                if (changeIndex >= 0) EventBus.emit(EventName.changeTower, changeIndex);
            }
            EventBus.emit(EventName.replacePlayerEquipment, temp, origin, sell, res);
            GTip.showBattlePointChange(before, after, [], [], false);
            return res;
        } else {
            // const beforeProperty = JSON.parse(JSON.stringify(origin.property().base));
            // const afterProperty = JSON.parse(JSON.stringify(temp.property().base));
            const before = GModel.battle.getBattlePoint();
            const res = await GApi.playerEquipment.replace({ tempIndex, sell });
            const after = GModel.battle.getBattlePoint();
            EventBus.emit(EventName.replacePlayerEquipment, temp, origin, sell, res);
            GTip.showBattlePointChange(before, after, [], [], false);
            return res;
        }
    }
    /**
     * 出售临时装备
     * tempIndex:临时装备index
     * */
    async sell(tempIndex: number) {
        const temp = this.temp()[tempIndex];
        const res = await GApi.playerEquipment.sell({ tempIndex });
        EventBus.emit(EventName.sellPlayerEquipment, temp, res);
        return res;
    }

    /** 出售所有临时装备 */
    async sellAll(): Promise<{
        /** 分解出来的物品和其他奖励物品 */
        reward: Item[];
        /** 分解得到的经验值 */
        exp: number;
    }> {
        const res = await GApi.playerEquipment.sellAll();
        EventBus.emit(EventName.sellAllPlayerEquipment, res);
        return res;
    }

    /**塔位数据 */
    getTowerPlace(): PlayerEquipmentPlace[] {
        return Object.keys(GState.data.playerEquipmentPlace).map((key) => GState.data.playerEquipmentPlace[key]);
    }

    /**塔位强化 */
    async strengthenTower(index: number) {
        const origin = GModel.battle.getBattlePoint();
        await GApi.playerEquipment.strengthenTower({ index });
        const after = GModel.battle.getBattlePoint();
        GTip.showBattlePointChange(origin, after, [], [], false);
    }

    /**塔位强化 */
    strengthenAllTower() {
        return this.strengthenTower(this.getNextIndex());
    }

    /**塔位洗练 */
    async washTower(index: number) {
        const origin = GModel.battle.getBattlePoint();
        await GApi.playerEquipment.towerWash({ index });
        const after = GModel.battle.getBattlePoint();
        GTip.showBattlePointChange(origin, after, [], [], false);
    }

    /**洗练词条锁定 */
    lockProperty(index: number, number: number) {
        return GApi.playerEquipment.lockProperty({ index, number });
    }

    /**获取下一个升级的索引 */
    getNextIndex() {
        const list = this.getTowerPlace();
        const curr = GUtils.array.minBy(list, (place) => place.level);
        return curr.index;
    }

    /**洗练是否最大等级 */
    isMaxWashLevel() {
        return GState.data.towerWashData.washLevel >= GTable.getList("TowerWashRareTbl").length;
    }
    /** 激活塔位加成 */
    activateTowerPlace() {
        return GApi.playerEquipment.activateTowerPlace();
    }

    /**属性显示 */
    towerProperty(part: number): {
        property: string;
        value: number | string;
    }[] {
        const e = this.equipment()[part];
        // const place = this.getTowerPlace()[part];
        // const list = e
        //     .property()
        //     .base.concat(e.property().stat)
        //     .map((p) => {
        //         const base = place.property().base.find((t) => t.property === p.property);
        //         console.log(p.value);
        //         console.log(base);

        //         return {
        //             property: p.property,
        //             value: p.value + (base ? base.value : 0),
        //             placeValue: base ? base.value : 0,
        //         };
        //     });
        // const tbl = GTable.getList("DefendTowerTbl").find((t) => t.part === part);
        // const list2 = [
        //     { property: "normalAttackInterval", value: tbl.normalAttackInterval, placeValue: 0 },
        //     { property: "normalAttackRange", value: tbl.normalAttackRange, placeValue: 0 },
        // ];
        // const map = new Map<string, { property: string; value: number; placeValue: number }>();
        // list.concat(list2).forEach((p) => {
        //     if (map.has(p.property)) {
        //         const obj = map[p.property];
        //         map.set(p.property, {
        //             property: p.property,
        //             value: obj.value + p.value + obj.placeValue + p.placeValue,
        //             placeValue: obj.placeValue + p.placeValue,
        //         });
        //     } else {
        //         map.set(p.property, { property: p.property, value: p.value + p.placeValue, placeValue: p.placeValue });
        //     }
        // });
        // return GUtils.map
        //     .mapToArray(map, (p) => p)
        //     .map((p) => {
        //         return {
        //             property: p.property,
        //             value: GIndex.battle.propertyShowMethod[p.property](p.value),
        //             placeValue: GIndex.battle.propertyShowMethod[p.property](p.placeValue),
        //         };
        //     })
        //     .concat({
        //         property: "extend",
        //         value: GUtils.ui.getFixed(Number(e.tbl().damage) * 100, 2) + "%",
        //         placeValue: "",
        //     });
        const property: EnumHeroProperty[] = ["attack", "armor", "maxHp", "normalAttackInterval", "normalAttackRange"];
        const playerInfo = BattleFactory.getPlayerBattleInfo(GState.data);
        const towerId = GTable.getList("DefendTowerTbl").find((t) => t.part === part).id;
        let result: { property: string; value: number | string }[] = property.map((p) => {
            return {
                property: p,
                value: BattleFactory.getTowerProperty(p, towerId, playerInfo),
            };
        });
        let stat = e.propertyString().stat.map((p) => {
            return { property: p.property, value: p.value };
        });
        result.push({
            property: "extend",
            value: GUtils.ui.getFixed(Number(e.tbl().damage) * 100, 2) + "%",
        });
        return result.concat(stat);
    }

    canUpgradeTower() {
        return this.getTowerPlace().some(
            (p) => !p.isMaxLevel() && GModel.knapsack.checkStorage(p.upgradeCost(), false)
        );
    }

    canWash() {
        let count = GConfig.equipment.washCost[1];
        let cost = new Item(GConfig.equipment.washCost[0], count);
        let storage = GModel.knapsack.getStorageById(cost.id);
        return this.getTowerPlace().some((p) => storage >= count * (p.stat.filter((s) => s.locked).length + 1));
    }
}
