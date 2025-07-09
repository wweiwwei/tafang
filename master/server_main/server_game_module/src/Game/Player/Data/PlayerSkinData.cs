using System.Collections.Immutable;

namespace GamePlay;

public record PlayerSkinData(
    ImmutableArray<int> storage,
    int current
)
{
    public PlayerSkinData() : this(
        storage: [],
        current: 0
    )
    { }
}