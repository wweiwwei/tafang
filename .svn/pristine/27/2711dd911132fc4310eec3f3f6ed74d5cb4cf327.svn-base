using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public record BattleData(
        /** 法杖视频次数 */
        ImmutableDictionary<int, int> video,
        /** 法杖剩余有效时间 */
        long remain,
        /** 法杖类型id */
        int kindId
    )
    {

        public BattleData() : this(
            video: ImmutableDictionary<int, int>.Empty,
            remain: 0L,
            kindId: 0
        )
        { }
    }

}