import { GameDate } from "../../framework/date/GameDate";
import Item from "../entity/Item";

export default class TurntableModel {
    /** 引导计数判定 */
    guideCount = 0;

    roll(count: number): Promise<{
        id: number[];
        reward: Item[];
    }> {
        this.guideCount++;
        return GApi.turntable.roll({ count });
    }

    /** 今日剩余视频次数 */
    remainVideo(): number {
        return GState.data.turntableData.video;
    }

    /** 可以看下次视频的剩余时间 */
    videoColdDown(): number {
        return GConfig.turntable.videoColdDown - (GameDate.nowUpdated() - GState.data.turntableData.videoStamp);
    }
    /**观看视频获得奖励 */
    videoAddItem() {
        return GApi.turntable.videoAddItem();
    }
}
