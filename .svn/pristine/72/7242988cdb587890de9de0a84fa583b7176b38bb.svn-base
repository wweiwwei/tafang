import { CardInfo } from "../entity/CardInfo";
import { CardPool } from "../entity/CardPool";
import Item from "../entity/Item";

export class CardPoolModel {
    /** 获取卡池信息 */
    getCardPoolById(id: number): CardPool {
        return GState.data.cardPool[id];
    }

    /** 抽卡 */
    async drawCard(id: number, count: number): Promise<CardInfo[]> {
        const res = await GApi.cardPool.drawCard({ id, count });
        GUtils.array.shuffle(res);
        return res;
    }

    /** 设置心愿单 */
    setWishList(id: number, wishList1: number[], wishList2: number[]): Promise<void> {
        return GApi.cardPool.setWishList({ id, wishList1, wishList2 });
    }

    /** 获取积分奖励 */
    obtainPointReward(id: number): Promise<Item[]> {
        return GApi.cardPool.obtainPointReward({ id });
    }
}
