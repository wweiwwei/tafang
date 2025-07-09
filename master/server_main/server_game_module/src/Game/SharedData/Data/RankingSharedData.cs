

using System.Collections.Immutable;

namespace GamePlay;

// 出于性能考虑，排名系统不使用不可变数据结构
public record RankingSharedData(
    /** 爬塔分数 */
    Dictionary<long, RankingPointInfo> towerRanking,
    /** 关卡分数 */
    Dictionary<long, RankingPointInfo> stageRanking,
    /** 船长室分数 */
    Dictionary<long, RankingPointInfo> captainRanking,
    /** 卡池分数 */
    Dictionary<long, RankingPointInfo> cardPoolRanking,
    /** 装备卡池分数 */
    Dictionary<long, RankingPointInfo> equipmentCardPoolRanking,
    /** 单体伤害分数 */
    Dictionary<long, RankingPointInfo> damageRanking,
    /** 群体伤害分数 */
    Dictionary<long, RankingPointInfo> multipleDamageRanking,
    /** 宴会积分 */
    Dictionary<long, RankingPointInfo> banquetPointRanking,
    /** 是否已发放冲榜奖励 */
    ImmutableDictionary<int, bool> hasSendRewardMap
)
{
    public RankingSharedData() : this(
        towerRanking: new Dictionary<long, RankingPointInfo>(),
        stageRanking: new Dictionary<long, RankingPointInfo>(),
        captainRanking: new Dictionary<long, RankingPointInfo>(),
        cardPoolRanking: new Dictionary<long, RankingPointInfo>(),
        equipmentCardPoolRanking: new Dictionary<long, RankingPointInfo>(),
        damageRanking: new Dictionary<long, RankingPointInfo>(),
        multipleDamageRanking: new Dictionary<long, RankingPointInfo>(),
        banquetPointRanking: new Dictionary<long, RankingPointInfo>(),
        hasSendRewardMap: ImmutableDictionary<int, bool>.Empty
    )
    { }

}