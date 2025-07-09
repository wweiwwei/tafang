import { GameDate } from "../../framework/date/GameDate";
import Item from "./Item";

export default class AfkData {
    /** 起始时间戳 */
    beginStamp: number;

    /** 最后更新时间戳 */
    lastRefreshStamp: number;

    /** 挂机奖励 */
    reward: Item[];

    // /** 经验值 */
    // exp: number;

    // /** 声望 */
    // reputation: number;

    /** 获取已经挂机的时间 */
    getAfkTime() {
        const now = GameDate.nowUpdated();
        const time = now - this.beginStamp;
        if (time > GConfig.stage.battleMaxAfkTime * GameDate.OneMinute)
            return GConfig.stage.battleMaxAfkTime * GameDate.OneMinute;
        return time;
    }

    getReward() {
        let tempReward: Item[] = JSON.parse(JSON.stringify(this.reward));
        let produce = GUtils.array.objectToArray(GModel.stage.getStageAfkMapProduce());
        produce.map((p) =>
            tempReward.some((r) => p.id === r.id)
                ? (tempReward.find((r) => r.id === p.id).count += p.count)
                : tempReward.push(p)
        );
        return tempReward;
    }
}
