using System.Collections.Immutable;

namespace GamePlay;

public record PlayerMountData(
    ImmutableArray<int> storage,
    int current
)
{
    public PlayerMountData() : this(
        storage: [],
        current: 0
    )
    { }
}