using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public class EquipmentIndex
    {

        private readonly ImmutableDictionary<int, long> equipmentUpgradeRequire;

        public EquipmentIndex(TableData Table, TableConfigData Config)
        {
            var res = new Dictionary<int, long>();
            var env = new Dictionary<string, double>();
            foreach (var tbl in Table.HeroEquipmentLevelTblList)
            {
                for (int level = tbl.Level[0]; level <= tbl.Level[1]; level++)
                {
                    env["lv"] = level;
                    res.Add(level, (long)AstUtil.Eval(tbl.CoinCost, env));
                }
            }
            equipmentUpgradeRequire = res.ToImmutableDictionary();
        }

        /** 返回消耗 */
        public Item UpgradeAllCost(long expStorage, IEnumerable<TempEquipment> equipment, int limit)
        {
            var expId = GameConstant.HeroEquipmentExpId;
            var expCost = 0L;
            while (true)
            {
                var canUpgrade = equipment.Where(e => e.Level <= limit);
                if (canUpgrade.Count() == 0)
                {
                    return new Item(expId, expCost);
                }
                else
                {
                    var min = canUpgrade.MinBy(e => e.Level)!;
                    expCost += equipmentUpgradeRequire[min.Level];
                    if (expStorage < expCost)
                    {
                        return new Item(expId, expCost - equipmentUpgradeRequire[min.Level]);
                    }
                    min.Level += 1;
                }
            }
        }

    }

    public class TempEquipment
    {
        public readonly int Id;
        public int Level;
        public readonly int Rank;

        public TempEquipment(int id, int level, int rank)
        {
            Id = id;
            Level = level;
            Rank = rank;
        }
    }
}