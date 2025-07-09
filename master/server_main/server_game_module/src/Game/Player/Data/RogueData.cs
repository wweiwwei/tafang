
using System.Collections.Immutable;

namespace GamePlay;

public record RogueData(
    ImmutableDictionary<int, int> exSkillLv,
    ImmutableDictionary<int, int> skillLv,
    ImmutableArray<int> curExSkill
)
{
    public RogueData() : this(
        exSkillLv: new Dictionary<int, int>()
        {
            { 10001, 1 }
        }.ToImmutableDictionary(),
        skillLv: ImmutableDictionary<int, int>.Empty,
        curExSkill: [10001]
    )
    { }
}