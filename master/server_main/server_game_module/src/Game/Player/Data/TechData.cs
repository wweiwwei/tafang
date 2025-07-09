using System.Collections.Immutable;

namespace GamePlay;

public record TechData(
    ImmutableDictionary<int, Technology> techTree,
    int nextTech
)
{
    public TechData() : this(
        techTree: ImmutableDictionary<int, Technology>.Empty,
        nextTech: 0
    )
    { }
}
