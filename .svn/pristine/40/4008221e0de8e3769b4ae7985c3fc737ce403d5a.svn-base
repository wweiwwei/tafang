using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public record MissionData(
        int taskId,
        bool taskHasGet,
        ImmutableDictionary<int, Mission> mainMission
    )
    {
        public MissionData() : this(
            taskId: 0,
            taskHasGet: false,
            mainMission: ImmutableDictionary<int, Mission>.Empty
        )
        { }
    }
}