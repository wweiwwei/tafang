using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public record ChargeData(
        ImmutableArray<HasGetOrder> hasGetOrder,
        long month1Stamp,
        int month1Remain,
        bool month1Reward,
        bool month2Active,
        bool month2Reward,
        bool clearAd,
        ImmutableArray<int> firstPackage,
        ImmutableDictionary<int, GiftPackInfo> giftPack
    )
    {
        public ChargeData() : this(
            hasGetOrder: ImmutableArray<HasGetOrder>.Empty,
            month1Stamp: 0L,
            month1Remain: 0,
            month1Reward: false,
            month2Active: false,
            month2Reward: false,
            clearAd: false,
            firstPackage: ImmutableArray<int>.Empty,
            giftPack: ImmutableDictionary<int, GiftPackInfo>.Empty
        )
        { }
    }

    public record HasGetOrder(long id, long stamp);
    public record GiftPackInfo(int id, long endTime, int hasShow, bool hasBuy, int packageId);
}