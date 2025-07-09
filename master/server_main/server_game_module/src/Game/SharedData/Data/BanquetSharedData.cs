

using System.Collections.Immutable;

namespace GamePlay;

// 出于性能考虑，排名系统不使用不可变数据结构
public record BanquetSharedData(
    long beginTime,
    bool pointRewardHasSend,
    ImmutableDictionary<int, ImmutableArray<long>> groupPurchase,
    ImmutableArray<int> groupHasSend
)
{
    public BanquetSharedData() : this(
        beginTime: 0L,
        pointRewardHasSend: false,
        groupHasSend: ImmutableArray<int>.Empty,
        groupPurchase: ImmutableDictionary<int, ImmutableArray<long>>.Empty
    )
    { }

}