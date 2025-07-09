using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace GamePlay
{
    public class CarManager : AbstractManager<CarData>, IBaseManager
    {
        public CarManager(JToken saveData, PlayerDataManager ctx) : base(saveData, ctx)
        {
        }

        public override void DailyRefresh()
        {

        }

        public override void InitData()
        {

        }

        [PartialUpdate("battleCarEquipment")]
        public ImmutableDictionary<int, CarEquipment> AllCarEquipment()
        {
            return Data.equipment;
        }

        [Update("battleCar")]
        public BattleCar BattleCar()
        {
            return Data.car;
        }

    }
}