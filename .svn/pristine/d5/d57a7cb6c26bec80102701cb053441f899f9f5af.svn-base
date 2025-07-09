using System.Collections.Immutable;

namespace GamePlay;

public record PlayerPetData(
    int currentFormation,
    ImmutableDictionary<int, ImmutableArray<int>> formation,
    ImmutableDictionary<int, PlayerPet> pet

)
{
    public PlayerPetData() : this(
        formation: ImmutableDictionary<int, ImmutableArray<int>>.Empty,
        pet: ImmutableDictionary<int, PlayerPet>.Empty,
        currentFormation: 1
    )
    { }
}
