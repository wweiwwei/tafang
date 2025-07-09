using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public record CollectionData(
        ImmutableDictionary<int, int> relation,
        ImmutableDictionary<int, int> hasGetMap,
        ImmutableDictionary<int, ImmutableList<int>> collectionLevelRewardHasGet
    )
    {
        public CollectionData() : this(
            relation: ImmutableDictionary<int, int>.Empty,
            hasGetMap: ImmutableDictionary<int, int>.Empty,
            collectionLevelRewardHasGet: ImmutableDictionary<int, ImmutableList<int>>.Empty
        )
        { }

    }
}