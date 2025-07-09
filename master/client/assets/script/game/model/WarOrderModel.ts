import warOrder from "../entity/WarOrder";

export default class WarOrderModel {
    /**领取奖励 */
    obtain(rewardId: number, free: boolean) {
        return GApi.warOrder.obtain({ rewardId, free });
    }

    /**战令列表 */
    warOrderList(): warOrder[] {
        return Object.keys(GState.data.warOrder).map((key) => GState.data.warOrder[key]);
    }

    /**获取战令 */
    getWarOrderById(id: number) {
        return GState.data.warOrder[id];
    }
}
