using System.Collections.Immutable;

namespace GamePlay;

public record PlayerSkillData(
    int currentFormation,
    ImmutableDictionary<int, ImmutableArray<int>> formation,
    ImmutableDictionary<int, PlayerSkill> skill

)
{
    public PlayerSkillData() : this(
        formation: ImmutableDictionary<int, ImmutableArray<int>>.Empty,
        skill: ImmutableDictionary<int, PlayerSkill>.Empty,
        currentFormation: 1
    )
    { }
}
