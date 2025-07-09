using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public record CarEquipment(int id, ImmutableArray<CarEquipmentStorage> storage)
    {
        public CarEquipment Upgrade(int level, PlayerDataManager Ctx)
        {
            var requireTbl = Ctx.Table.CarEquipmentLevelTblList.FirstOrDefault(t => t.Level == level);
            if (requireTbl != null)
            {
                var coinRequire = requireTbl.CoinCost;
                Ctx.KnapsackManager.SubItem(new Item(GameConstant.CoinId, coinRequire));
                var newStorage = storage.Select(e => e.level == level ? e.SubCount(1) : e).ToImmutableArray();
                newStorage = newStorage.Select(e => e.level == level + 1 ? e.AddCount(1) : e).ToImmutableArray();
                return this with { storage = newStorage };
            }
            else
            {
                GameAssert.Raise(2008);
                return this;
            }
        }

        public CarEquipment SubCount(int level, long count)
        {
            var i = storage.IndexWhere(e => e.level == level);
            if (i == -1)
            {
                GameAssert.Raise(6002);
                return this;
            }
            else
            {
                var e = storage[i];
                var newStorage = storage.SetItem(i, e.SubCount(count));
                return this with { storage = newStorage };
            }
        }

        public CarEquipment AddCount(int level, long count)
        {
            var i = storage.IndexWhere(e => e.level == level);
            if (i == -1)
            {
                var newStorage = storage.Add(new CarEquipmentStorage(id, level, count));
                return this with { storage = newStorage };
            }
            else
            {
                var e = storage[i];
                var newStorage = storage.SetItem(i, e.AddCount(count));
                return this with { storage = newStorage };
            }
        }
    }

    public record CarEquipmentStorage(int id, int level, long count)
    {
        public CarEquipmentStorage AddCount(long count)
        {
            return this with { count = this.count + count };
        }

        public CarEquipmentStorage SubCount(long count)
        {
            GameAssert.Expect(this.count >= count, 6002);
            return this with { count = this.count - count };
        }
    }
}