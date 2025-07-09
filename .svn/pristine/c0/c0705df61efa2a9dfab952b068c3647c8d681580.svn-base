import Item from "./Item";

export class CardPool {
    /** id */
    id: number;

    /** 总计抽卡 */
    total: number;

    /** 今日抽卡 */
    today: number;

    /** 保底计数 */
    guarantee: number;

    /** 心愿单1，id为-1时代表未选择心愿 */
    wishList1: { id: number; hasGet: boolean }[];

    /** 心愿单2，id为-1时代表未选择心愿 */
    wishList2: { id: number; hasGet: boolean }[];

    /** 积分任务id */
    pointMissionId: number;

    /** 积分任务进度 */
    point: number;

    getTbl() {
        return GTable.getById("CardPoolTbl", this.id);
    }

    /** 积分奖励 */
    getPointMissionReward(): Item {
        const tbl = GTable.getById("CardPoolPointRewardTbl", this.pointMissionId);
        return new Item(tbl.reward[0], tbl.reward[1]);
    }

    /** 积分需要 */
    pointRequire(): number {
        const tbl = GTable.getById("CardPoolPointRewardTbl", this.pointMissionId);
        return tbl.point;
    }

    /** 单抽价格 */
    singlePrice(): Item {
        return new Item(this.getTbl().singlePrice[0], this.getTbl().singlePrice[1]);
    }

    /** 十连价格 */
    tenPrice(): Item {
        return new Item(this.getTbl().tenPrice[0], this.getTbl().tenPrice[1]);
    }

    /** 单抽价格替代 */
    singlePriceReplace(): Item | null {
        if (this.getTbl().singlePriceReplace.length === 0) return null;
        return new Item(this.getTbl().singlePriceReplace[0], this.getTbl().singlePriceReplace[1]);
    }

    /** 十连价格替代 */
    tenPriceReplace(): Item | null {
        if (this.getTbl().tenPriceReplace.length === 0) return null;
        return new Item(this.getTbl().tenPriceReplace[0], this.getTbl().tenPriceReplace[1]);
    }
}
