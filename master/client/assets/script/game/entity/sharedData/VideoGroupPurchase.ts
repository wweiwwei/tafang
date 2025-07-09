export class VideoGroupPurchase {
    /** 团购唯一id */
    uniqueId: number;
    /** 团购奖励id */
    rewardId: number;
    /** 团购开始时间 */
    beginTime: number;
    /** 团购结束时间 */
    endTime: number;
    /** 团购参与玩家id */
    roleIdList: number[];
    /** 发起者 */
    launcher: number;
}
