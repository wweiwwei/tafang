import { GameDate } from "../../framework/date/GameDate";
import Item from "./Item";

export default class GiftPack {
    id: number;
    endTime: number;
    hasShow: number;
    hasBuy: boolean;
    packageId: number;

    /**获取礼包表 */
    getPackTbl() {
        return GTable.getById("GiftPackTbl", this.packageId);
    }
    /**获取规则表 */
    getRuleTbl() {
        return GTable.getById("PackRuleTbl", this.id);
    }
    /**剩余时间 */
    remainTime(): number {
        return this.endTime === 0 ? this.endTime : this.endTime - GameDate.nowUpdated();
    }
    /**是否能展示 */
    canShow(): boolean {
        if (this.getRuleTbl().limit == -1) {
            return true;
        } else {
            return this.hasShow <= this.getRuleTbl().limit;
        }
    }
    /**获取奖励 */
    getReward(): Item[] {
        return Item.fromItemArray(this.getPackTbl().reward);
    }
}
