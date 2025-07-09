using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public record TowerData(
        int level,
        long levelTime,
        TowerAfkData afkBattleReward,
        ImmutableArray<int> hasGet
    )
    {
        public TowerData() : this(
            level: 0,
            levelTime: 0L,
            afkBattleReward: new TowerAfkData(
                beginStamp: 0,
                lastRefreshStamp: 0L,
                reward: ImmutableArray<Item>.Empty
            ),
            hasGet: ImmutableArray<int>.Empty
        )
        { }
    }
}