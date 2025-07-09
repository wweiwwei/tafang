using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public record DamageData(
        ImmutableArray<int> hasGetReward,
        long myDamage,
        long myMulDamage
    )
    {
        public DamageData() : this(
            hasGetReward: ImmutableArray<int>.Empty,
            myDamage: 0L,
            myMulDamage: 0L
        )
        { }
    }
}