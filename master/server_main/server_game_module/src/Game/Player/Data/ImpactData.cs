using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public record ImpactData(
       ImmutableDictionary<int, Mission> challengeMission,
       ImmutableDictionary<int, Mission> recruitMission,
       ImmutableDictionary<int, Mission> equipMission,
       ImmutableDictionary<int, Mission> arenaMission,
       ImmutableArray<int> hasGetPackage,
       long beginTime,
       int challengeRound,
       int recruitRound,
       int equipRound,
       int arenaRound,
       int heroTotal,
       int equipTotal,
       int arenaTotal
    )
    {
        public ImpactData() : this(
            challengeMission: ImmutableDictionary<int, Mission>.Empty,
            recruitMission: ImmutableDictionary<int, Mission>.Empty,
            equipMission: ImmutableDictionary<int, Mission>.Empty,
            arenaMission: ImmutableDictionary<int, Mission>.Empty,
            hasGetPackage: ImmutableArray<int>.Empty,
            beginTime: 0,
            challengeRound: 1,
            recruitRound: 1,
            equipRound: 1,
            arenaRound: 1,
            heroTotal: 0,
            equipTotal: 0,
            arenaTotal: 0
        )
        { }
    }
}