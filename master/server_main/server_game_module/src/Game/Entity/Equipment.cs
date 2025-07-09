using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public record Equipment(int id, ImmutableArray<EquipmentStorage> storage)
    {
        private Dictionary<string, double> Env(int level)
        {
            var m = new Dictionary<string, double>
            {
                { "lv", level }
            };
            return m;
        }
        public Equipment Upgrade(int level, int rank, PlayerDataManager ctx)
        {
            var requireTbl = ctx.Table.HeroEquipmentLevelTblList.FirstOrDefault(t => t.Level[0] <= level && t.Level[1] >= level);
            GameAssert.Expect(requireTbl != null && level + 1 <= ctx.Config.Hero.EquipmentRankLevelLimit[rank], 6003);
            var coinRequire = requireTbl!.CoinCost;
            ctx.KnapsackManager.SubItem(new Item(GameConstant.HeroEquipmentExpId, (long)AstUtil.Eval(coinRequire, Env(level))));
            return this.SubCount(level, rank, 1).AddCount(level + 1, rank, 1);
        }

        public Equipment UpgradeRank(int level, int rank, PlayerDataManager ctx)
        {
            var requireTbl = ctx.Table.HeroEquipmentRankTblList.FirstOrDefault(t => t.Level == rank);
            var upgradeRequire = requireTbl!.Require;
            GameAssert.Expect(upgradeRequire > 0, 6003);
            var coinRequire = requireTbl.CoinCost;
            ctx.KnapsackManager.SubItem(new Item(GameConstant.CoinId, coinRequire));
            return this.SubCount(1, 0, upgradeRequire).SubCount(level, rank, 1).AddCount(level, rank + 1, 1);
        }

        public Equipment AddCount(int level, int rank, long count)
        {
            var i = storage.IndexWhere(e => e.level == level && e.rank == rank);
            if (i == -1)
            {
                return this with { storage = storage.Append(new EquipmentStorage(id, level, rank, count)).ToImmutableArray() };
            }
            else
            {
                var e = storage[i];
                return this with { storage = storage.SetItem(i, e.AddCount(count)).ToImmutableArray() };
            }
        }

        public Equipment SubCount(int level, int rank, long count)
        {
            var i = storage.IndexWhere(e => e.level == level && e.rank == rank);
            GameAssert.Expect(i != -1, 6002);
            var e = storage[i];
            return this with { storage = storage.SetItem(i, e.SubCount(count)).ToImmutableArray() };
        }

        public int Part(PlayerDataManager ctx)
        {
            return ctx.Table.HeroEquipmentTblMap[id].Part;
        }

        public bool HasAvailable(int level, int rank, PlayerDataManager ctx)
        {
            var availableCount = GetAvailableCount(ctx).GetOrDefault(rank, level);
            return availableCount > 0;
        }

        private Table2D<int, int, long> GetAvailableCount(PlayerDataManager ctx)
        {
            var eUse = new Table2D<int, int, long>();
            var p = Part(ctx);
            foreach (var h in ctx.HeroManager.AllHero())
            {
                var e = h.Value.equipment[p];
                if (e != null && e.id == id)
                {
                    eUse.Set(e.rank, e.level, eUse.GetOrDefault(e.rank, e.level) + 1);
                }
            }
            var res = new Table2D<int, int, long>();
            foreach (var e in storage)
            {
                var level = e.level;
                var rank = e.rank;
                var count = e.count;
                var use = eUse.GetOrDefault(rank, level);
                if (use != 0)
                {
                    res.Set(rank, level, count - use);
                }
                else
                {
                    res.Set(rank, level, count);
                }
            }
            return res;
        }

    }

    public record EquipmentStorage(int id, int level, int rank, long count)
    {

        public EquipmentStorage AddCount(long c)
        {
            return this with { count = count + c };
        }

        public EquipmentStorage SubCount(long c)
        {
            GameAssert.Expect(count >= c, 6002);
            return this with { count = count - c };
        }
    }


}