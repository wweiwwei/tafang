using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public record CareerData(
        int currentCareer,
        ImmutableDictionary<int, CareerTalent> talent,
        int video
    )
    {
        public CareerData() : this(
            currentCareer: 0,
            talent: ImmutableDictionary<int, CareerTalent>.Empty,
            video: 2
        )
        { }
    }
}