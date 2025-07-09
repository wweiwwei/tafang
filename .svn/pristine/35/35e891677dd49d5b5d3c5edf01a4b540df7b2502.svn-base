import BattleFactory from "../battleLogic/Utils/BattleFactory";

export class SpriteCardPool {
    id: number;
    /** 总计抽卡数 */
    total: number;
    /** 今日抽卡数 */
    today: number;
    /** 保底信息 */
    guarantee: number;
    /** 今日已经进行的广告抽卡 */
    video: number;

    /** 获取卡池表格 */
    getTbl() {
        return GTable.getById("MountPoolTbl", this.id);
    }

    /** 获取今日剩余广告次数 */
    getTodayVideoRemain() {
        const tbl = this.getTbl();
        return tbl.video - this.video;
    }
}
