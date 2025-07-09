using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public record BanquetData(
        long point,
        int level,
        int donateTimes,
        long beginTime,
        ImmutableDictionary<int, Mission> banquetMission,
        ImmutableDictionary<int, int> shopItems,
        ImmutableArray<int> levelHasGet,
        ImmutableArray<int> packHasBuy
    )
    {
        public BanquetData() : this(
            point: 0L,
            level: 0,
            beginTime: 0L,
            donateTimes: 0,
            banquetMission: ImmutableDictionary<int, Mission>.Empty,
            shopItems: ImmutableDictionary<int, int>.Empty,
            levelHasGet: ImmutableArray<int>.Empty,
            packHasBuy: ImmutableArray<int>.Empty
        )
        { }
    }
}