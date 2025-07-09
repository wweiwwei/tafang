using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public record BattleCar(
        int id,
        int level,
        ImmutableArray<EquipmentInCar?> equipment
    )
    {

        private Dictionary<string, double> Env()
        {
            Dictionary<string, double> m = new(){
                {"lv", level}
            };
            return m;
        }

        /** 战车升级所需材料 */
        public List<Item>? UpgradeRequire(PlayerDataManager Ctx)
        {
            var tbl = Ctx.Table.CarLevelTblList.FirstOrDefault(t => level >= t.Level[0] && level < t.Level[1]);
            if (tbl != null)
            {
                return new List<Item>(){
                    new Item(GameConstant.CarExpId, (long) Math.Round(AstUtil.Eval(tbl.Require, Env()))),
                    new Item(GameConstant.CoinId, (long) Math.Round(AstUtil.Eval(tbl.CoinCost, Env())))
                };
            }
            return null;
        }

        public BattleCar Upgrade(PlayerDataManager Ctx)
        {
            var require = UpgradeRequire(Ctx);
            GameAssert.Expect(require != null, 9001);
            Ctx.KnapsackManager.SubItem(require!);
            return this with { level = level + 1 };
        }

    }

    public record EquipmentInCar(int id, int level);
}