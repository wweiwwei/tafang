import { FriendInfo } from "../entity/FriendInfo";
import { VideoGroupPurchase } from "../entity/sharedData/VideoGroupPurchase";

export default class VideoGroupPurchaseModel {
    /** 本次发起的团购id */
    launchRewardId() {
        return GState.data.videoGroupPurchaseData.rewardId;
    }
    /** 视频次数 */
    videoCount() {
        return GState.data.videoGroupPurchaseData.videoCount;
    }
    /** 今日剩余发起团购次数 */
    todayRemainLaunch() {
        return GConfig.videoGroupPurchase.launchDailyLimit - GState.data.videoGroupPurchaseData.todayLaunch;
    }
    /** 今日剩余加入团购次数 */
    todayRemainJoin() {
        return GConfig.videoGroupPurchase.dailyLimit - GState.data.videoGroupPurchaseData.todayJoin;
    }
    /** 看完视频上报 */
    reportVideo(): Promise<void> {
        return GApi.playerVideoGroupPurchase.reportVideo();
    }
    /** 发起团购 */
    launchGroupPurchase(): Promise<void> {
        return GApi.playerVideoGroupPurchase.launchGroupPurchase();
    }
    /** 是否可以加入此团购 */
    private isCanJoinGroupPurchase(uniqueId: number): Promise<boolean> {
        return GApi.playerVideoGroupPurchase.isCanJoinGroupPurchase({ uniqueId });
    }
    /** 加入团购 */
    async joinGroupPurchase(uniqueId: number): Promise<void> {
        const canJoin = await this.isCanJoinGroupPurchase(uniqueId);
        if (canJoin) {
            await GSDK.showVideo("group_purchase");
            await GApi.playerVideoGroupPurchase.joinGroupPurchase({ uniqueId });
        } else {
            GTip.showTip([GLang.code.ui.can_not_join_group_purchase]);
        }
    }
    /** 是否初始化过了缓存数据 */
    private _hasInited = false;
    /** 获取最近团购数据 */
    async recentVideoGroupPurchase(): Promise<{ info: FriendInfo; data: VideoGroupPurchase }[]> {
        if (this._hasInited) {
            const list: VideoGroupPurchase[] = Object.keys(GState.sharedData.videoGroupPurchaseShared).map(
                (k) => GState.sharedData.videoGroupPurchaseShared[k]
            );
            const infos = await GModel.friend.getRoleInfo(list.map((x) => x.launcher));
            return list.map((x, i) => {
                return {
                    info: infos[i],
                    data: x,
                };
            });
        } else {
            // 初始化数据
            this._hasInited = true;
            const data = await GApi.playerVideoGroupPurchase.recentVideoGroupPurchase();
            // 此处手动初始化了数据
            GState.sharedData.videoGroupPurchaseShared = data;
            const list: VideoGroupPurchase[] = Object.keys(GState.sharedData.videoGroupPurchaseShared).map(
                (k) => GState.sharedData.videoGroupPurchaseShared[k]
            );
            const infos = await GModel.friend.getRoleInfo(list.map((x) => x.launcher));
            return list.map((x, i) => {
                return {
                    info: infos[i],
                    data: x,
                };
            });
        }
    }
}
