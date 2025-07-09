using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public record CardPoolData(
        ImmutableDictionary<int, CardPool> cardPool
    )
    {

        public CardPoolData() : this(
            cardPool: ImmutableDictionary<int, CardPool>.Empty
        )
        { }

    }
}