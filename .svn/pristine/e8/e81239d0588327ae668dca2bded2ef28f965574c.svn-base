export default class warOrder {
    id: number;
    /**  是否购买 */
    hasBuy: boolean;
    /** 已获取的免费奖励 */
    freeHasGet: number[];
    /** 已获取的付费奖励 */
    hasGet: number[];
    /** 进度 */
    progress: number;

    getTbl() {
        return GTable.getById("WarOrderTbl", this.id);
    }

    /**获取奖励表 */
    getRewardTbl() {
        return GTable.getList("WarOrderRewardTbl").filter((t) => t.warOrderId === this.id);
    }

    /**是否可领取奖励  */
    canAllGet(rewardId: number) {
        let tbl = this.getRewardTbl().find((t) => t.id === rewardId);
        if (tbl) {
            return (
                this.progress >= tbl.require &&
                ((tbl.warOrderId !== 10001 && this.hasBuy && !this.hasGet.includes(rewardId)) ||
                    (!this.freeHasGet.includes(rewardId) && tbl.warOrderId == 10001))
            );
        } else {
            return false;
        }
    }
}
