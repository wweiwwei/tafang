using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public record KnapsackData(
        /** 当前库存 */
        ImmutableDictionary<int, long> storage,
        /** 累计获取 */
        ImmutableDictionary<int, long> acc,
        /** 累计消耗 */
        ImmutableDictionary<int, long> accCost
    )
    {
        public KnapsackData() : this(
            storage: ImmutableDictionary<int, long>.Empty,
            acc: ImmutableDictionary<int, long>.Empty,
            accCost: ImmutableDictionary<int, long>.Empty
        )
        { }
    }
}