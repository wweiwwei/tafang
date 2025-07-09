using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public record PlayerEmailData(
        ImmutableArray<HasGetEmail> hasGetEmail,
        ImmutableArray<HasGetCdKey> hasGetCdKey
    )
    {
        public PlayerEmailData() : this(
            hasGetEmail: ImmutableArray<HasGetEmail>.Empty,
            hasGetCdKey: ImmutableArray<HasGetCdKey>.Empty
        )
        { }
    }

    public record HasGetEmail(long id, long stamp);
    public record HasGetCdKey(string key, long stamp);

}