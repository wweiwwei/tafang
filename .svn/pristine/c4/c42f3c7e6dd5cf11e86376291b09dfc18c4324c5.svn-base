using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public record GuideData(
        /** 已完成的引导记录 */
        ImmutableList<int> hasComplete
    )
    {
        public GuideData() : this(
            hasComplete: ImmutableList<int>.Empty
        )
        { }

    }
}