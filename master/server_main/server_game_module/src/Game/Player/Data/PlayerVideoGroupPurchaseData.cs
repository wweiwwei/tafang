using System.Collections.Immutable;

public record PlayerVideoGroupPurchaseData(
    /** 观看视频次数 */
    int videoCount,
    /** 总计发起团购次数 */
    int totalLaunch,
    /** 今日参加团购次数 */
    int todayJoin,
    /** 今日发起团购次数 */
    int todayLaunch,
    /** 今日已参与团购id */
    ImmutableArray<int> hasJoinToday
)
{
    public PlayerVideoGroupPurchaseData() : this(
        videoCount: 0,
        totalLaunch: 0,
        todayJoin: 0,
        todayLaunch: 0,
        hasJoinToday: ImmutableArray<int>.Empty
    )
    { }
};