using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public record CarData(
        BattleCar car,
        ImmutableDictionary<int, CarEquipment> equipment
    )
    {
        public CarData() : this(
            car: new BattleCar(10001, 1, (new EquipmentInCar?[] { null, null, null, null, null }).ToImmutableArray()),
            equipment: ImmutableDictionary<int, CarEquipment>.Empty
        )
        {

        }

    }
}