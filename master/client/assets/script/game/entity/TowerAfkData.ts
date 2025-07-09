import { GameDate } from "../../framework/date/GameDate";
import Item from "./Item";

export default class TowerAfkData {
    /** 起始时间戳 */
    beginStamp: number;

    /** 最后更新时间戳 */
    lastRefreshStamp: number;

    /** 挂机奖励 */
    reward: Item[];

    /** 获取已经挂机的时间 */
    getAfkTime() {
        const now = GameDate.nowUpdated();
        const time = now - this.beginStamp;
        return GUtils.date.formatRemainTime(time, "hh:mm:ss");
    }
}
