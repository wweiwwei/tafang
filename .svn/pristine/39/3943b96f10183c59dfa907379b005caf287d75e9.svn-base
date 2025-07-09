using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public record StageData(
    /** 地图信息 */
    ImmutableDictionary<int, MainStage> stage,
    /** 当前挂机地图 */
    int afkMap,
    /** 地图收益 */
    ImmutableDictionary<int, long> afkMapProduce,
    /** 地图收益最后刷新时间 */
    long mapProduceLastRefreshStamp,
    /** 战斗挂机收益 */
    AfkData afkBattleReward,
    /** 成就任务已获取奖励 */
    ImmutableArray<int> achievementRewardHasGet,
    /** 已购买商品数量，id=>数量 */
    ImmutableDictionary<int, int> shopHasBuy,
    /** 上次关卡战斗的时间 */
    long lastStageBattleTime,
    /** 可视频领取的额外奖励 */
    ImmutableArray<Item> ExtraReward,
    /** 今日视频扫荡 */
    int todayAdSweep,
    /** 今日广告双倍领取 */
    int todayAdDouble,
    /** 已领取首次通关奖励 */
    ImmutableArray<string> firstRewardHasGet,
    /** 记录波数 */
    int recordWave
    )
    {
        public StageData() : this(
            stage: ImmutableDictionary<int, MainStage>.Empty,
            afkMap: 1,
            afkMapProduce: ImmutableDictionary<int, long>.Empty,
            mapProduceLastRefreshStamp: 0L,
            afkBattleReward: AfkData.InitEmpty(),
            achievementRewardHasGet: ImmutableArray<int>.Empty,
            shopHasBuy: ImmutableDictionary<int, int>.Empty,
            lastStageBattleTime: 0L,
            ExtraReward: ImmutableArray<Item>.Empty,
            todayAdSweep: 0,
            todayAdDouble: 0,
            firstRewardHasGet: ImmutableArray<string>.Empty,
            recordWave: 0
        )
        { }

    }
}