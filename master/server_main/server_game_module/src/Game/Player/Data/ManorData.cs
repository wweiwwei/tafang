using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public record ManorData(
        /**id:[左下角点[x,y]]*/
        ImmutableDictionary<int, ImmutableArray<ImmutableArray<int>>> map
    )
    {
        public ManorData() : this(
            map: ImmutableDictionary<int, ImmutableArray<ImmutableArray<int>>>.Empty
        )
        { }
    }

    public static class ManorConfig
    {
        public const int vertical = 30;
        public const int horizontal = 21;
    }
}