using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay;

public record WarOrderData(
    ImmutableDictionary<int, WarOrder> warOrder

)
{
    public WarOrderData() : this(
        warOrder: ImmutableDictionary<int, WarOrder>.Empty
    )
    { }
}
