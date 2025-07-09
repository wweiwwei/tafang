using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public record HeroData(
        /** 当前库存 */
        ImmutableDictionary<int, Hero> hero,
        /** 唯一id */
        int uniqueId,
        /** 编队 */
        ImmutableDictionary<string, ImmutableArray<int>> formation,
        /** 装备 */
        ImmutableDictionary<int, Equipment> equipment
    )
    {

        public HeroData() : this(
            hero: ImmutableDictionary<int, Hero>.Empty,
            uniqueId: 1,
            formation: ImmutableDictionary<string, ImmutableArray<int>>.Empty,
            equipment: ImmutableDictionary<int, Equipment>.Empty
        )
        { }

    }
}