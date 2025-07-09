using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public record EnemyData(
        ImmutableArray<EnemyInfo> team,
        ImmutableArray<int> hasWin,
        int hasChallengeToday,
        int refreshToday,
        int todayBuy,
        string mirror,
        bool needRefresh
    )
    {
        public EnemyData() : this(
            team: ImmutableArray<EnemyInfo>.Empty,
            hasWin: ImmutableArray<int>.Empty,
            hasChallengeToday: 0,
            refreshToday: 0,
            todayBuy: 0,
            mirror: "",
            needRefresh: true
        )
        { }
    }

    public record EnemyInfo(
        int uid,
        int rank,
        int iconId,
        string name,
        long bp
    )
    { }

}