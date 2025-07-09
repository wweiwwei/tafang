import Item from "../entity/Item";
import Mission from "../entity/Mission";
import WindowComfirmBuy from "../module/common/WindowComfirmBuy";

export default class BanquetModel {
    /**获取可见任务 */
    getMissionList(day: number): Mission[] {
        let data = GState.data.banquetMission;
        const list: Mission[] = Object.keys(data).map((k) => {
            return data[k];
        });
        return list.filter((m) => GTable.getById("BanquetMissionTbl", m.id).day === day);
    }
    /**获取等级奖励 */
    getLevelReward(id: number): Promise<Item[]> {
        return GApi.banquet.obtainLevelReward({ id });
    }
    /**购买礼包 */
    buyPack(id: number): Promise<Item[]> {
        return GApi.banquet.buyPack({ id });
    }
    /**购买商店物品，传banquetShop表id  */
    async buyItem(id: number, item: Item): Promise<Item[]> {
        let data = await GWindow.open(WindowComfirmBuy, { item, id, status: 1 });
        return GApi.banquet.buyShopItem({ tid: id, count: data.count });
    }
    /**使用活动物品兑换积分，需前端计算消耗的物品数量 */
    exchangePoint(id: number, count: number): Promise<Item[]> {
        return GApi.banquet.exchangePoint({ id, count });
    }
    /**获取任务奖励 */
    obtainMissionReward(id: number): Promise<Item[]> {
        return GApi.banquet.obtainMissionReward({ id });
    }
    /**团购购买 */
    buyGroup(id: number): Promise<Item[]> {
        return GApi.banquet.buyGroup({ id });
    }
}
