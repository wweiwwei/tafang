using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public class HeroIndex
    {
        /** 英雄升级消耗 key 等级 Seq 中第一个元素是金币消耗，第二个元素是经验石消耗 */
        private readonly ImmutableDictionary<int, ImmutableArray<long>> heroUpgradeRequire;

        public HeroIndex(TableData Table, TableConfigData Config)
        {
            var res = new Dictionary<int, ImmutableArray<long>>();
            var env = new Dictionary<string, double>();
            Table.HeroLevelTblList.ForEach(tbl =>
            {
                for (int level = tbl.Level[0]; level <= tbl.Level[1]; level++)
                {
                    env["lv"] = level;
                    res.Add(level,
                    new long[] {
                        (long)Math.Round(AstUtil.Eval(tbl.CoinCost, env)),
                    (long)Math.Round(AstUtil.Eval(tbl.Require, env)) }.ToImmutableArray());
                }
            });
            heroUpgradeRequire = res.ToImmutableDictionary();
        }

        /** 返回消耗 */
        public ImmutableArray<Item> UpgradeAllCost(long coinStorage, long expStorage, ImmutableArray<HeroTemp> heroList)
        {
            var coinId = GameConstant.CoinId;
            var expId = GameConstant.HeroExpId;
            var coinCost = 0L;
            var expCost = 0L;
            while (true)
            {
                var canUpgrade = heroList.Where(h => h.CanUpgrade);
                if (canUpgrade.Count() == 0)
                {
                    return new Item[] { new Item(coinId, coinCost), new Item(expId, expCost) }.ToImmutableArray();
                }
                else
                {
                    var min = canUpgrade.MinBy(h => h.Level)!;
                    coinCost += heroUpgradeRequire[min.Level][0];
                    expCost += heroUpgradeRequire[min.Level][1];
                    if (coinStorage < coinCost || expStorage < expCost)
                    {
                        return new Item[]{
                            new Item(coinId, coinCost - heroUpgradeRequire[min.Level][0]),
                            new Item(expId, expCost - heroUpgradeRequire[min.Level][1])
                        }.ToImmutableArray();
                    }
                    min.Level += 1;
                }

            }
        }
    }

    public class HeroTemp
    {
        public readonly int Uid;
        public readonly int LevelLimit;
        public int Level;

        public HeroTemp(int uid, int levelLimit, int level)
        {
            Uid = uid;
            LevelLimit = levelLimit;
            Level = level;
        }
        public bool CanUpgrade => Level < LevelLimit;
    }


}