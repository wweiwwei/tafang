using System.Collections.Immutable;

namespace GamePlay;

public record FossilData(
    int fossilStar,
    ImmutableArray<int> fossilFormation
)
{
    public FossilData() : this(
        fossilStar: -1,
        fossilFormation: ImmutableArray<int>.Empty
    )
    { }
}
