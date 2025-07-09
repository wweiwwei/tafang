using System.Collections.Immutable;

namespace GamePlay;
// 直接获取装备的版本
public partial class StoneManager
{
    [Handle("stone/drawCard2")]
    public object DrawCard2(bool auto)
    {
        var storage = Ctx.KnapsackManager.GetStorageById(GameConstant.TurntableStorageId);
        var count = Math.Min(storage, Data.autoSetting.openCount);
        if (count <= 0) return Array.Empty<object>();
        if (!auto)
        {
            count = 1;
        }
        Ctx.KnapsackManager.SubItem(new Item(GameConstant.TurntableStorageId, count));
        Ctx.MissionManager.UpdateMissionProgress(10, count);
        Ctx.Emit(CachePath.stone);
        var res = new List<object>();
        Data = Data with
        {
            totalDraw = Data.totalDraw + count,
            totalSummon = Data.totalSummon + count
        };
        for (int i = 0; i < count; i++)
        {
            var finalReward = new List<Item>();
            var finalExpAdd = 0L;
            var e = DrawCardOnce2();
            var sell = false;
            if (auto && CanSell(e))
            {
                sell = true;
            }
            var (expAdd, reward) = Ctx.PlayerEquipmentManager.AddTemp(e, sell);
            finalExpAdd += expAdd;
            finalReward.AddRange(reward);
            res.Add(new Dictionary<string, object>()
            {
                {"equipment", e},
                {"reward", Item.CombineItem(finalReward)},
                {"exp", finalExpAdd},
                {"sell",sell}
            });
        }
        return res;
    }

    private PlayerEquipment DrawCardOnce2()
    {
        EquipmentTbl eTbl;
        var tbl = Ctx.Table.StoneLevelTblList.First(t => t.Level == Data.level);
        var weight = new int[] { tbl.Rare0, tbl.Rare1, tbl.Rare2, tbl.Rare3, tbl.Rare4, tbl.Rare5, tbl.Rare6, tbl.Rare7, tbl.Rare8 };
        var quality = RandomUtils.GetHappenedIndex(weight);
        Data = Data with { uniqueId = Data.uniqueId + 1 };
        var uniqueId = Data.uniqueId;
        if (Data.totalDraw > Ctx.Config.Stone.InitEquipment.Length)
        {
            // 已经过了预设装备
            // 暂时抽不到7以后的装备
            var tblList = Ctx.Table.EquipmentTblList.Where(t => t.Quality == quality).Where(t => t.Part <= 7);
            eTbl = RandomUtils.RandomElement(tblList);
        }
        else
        {
            // 预设装备
            var id = Ctx.Config.Stone.InitEquipment[(int)(Data.totalDraw - 1)];
            eTbl = Ctx.Table.EquipmentTblMap[id];

        }
        var lv = Ctx.PlayerManager.Level();
        var level = RandomUtils.RandomInt(lv > 3 ? (lv - 3) : (lv - (lv - 1)), lv + 2);
        var values = eTbl.Property.Select(p =>
        {
            var property = p[0];
            var env = new Dictionary<string, double> {
                {"lv",level}
            };
            var min = AstUtil.Eval(p[1], env);
            var max = AstUtil.Eval(p[2], env);
            var val = RandomUtilsEx.RandomDouble(min, max);
            return new PlayerEquipmentProperty(property, (long)Math.Round(val));
        }).ToImmutableArray();
        return new PlayerEquipment(
            uniqueId: uniqueId,
            id: eTbl.Id,
            level,
            baseProperty: values,
            stat: GetStat(eTbl, lv)
        );

    }

}