import { GameDate } from "../../framework/date/GameDate";

export class PowerModel {
    /** 体力信息 */
    powerInfo() {
        const data = GState.data.powerData;
        return {
            power: data.power,
            maxPower: GConfig.player.powerMax,
            videoRemain: GConfig.player.powerVideo[1] - data.todayVideoPower,
            diamondRemain: GConfig.player.powerDiamond[2] - data.todayDiamondPower,
            refreshRemain: data.lastPowerRefresh + GConfig.player.powerRecoverInterval - GameDate.nowUpdated(),
        };
    }
    /** 视频增加体力 */
    videoAddPower() {
        return GApi.power.videoAddPower();
    }
    /** 钻石增加体力 */
    diamondAddPower(count: number) {
        return GApi.power.diamondAddPower({ count });
    }
}
