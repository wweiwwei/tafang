using System.Collections.Immutable;

namespace GamePlay;

public record VideoGroupPurchaseSharedData(
    ImmutableDictionary<long, VideoGroupPurchase> purchaseMap,
    long uniqueId
)
{
    public VideoGroupPurchaseSharedData() : this(
        purchaseMap: ImmutableDictionary<long, VideoGroupPurchase>.Empty,
        uniqueId: 1
    )
    { }

}




