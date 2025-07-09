using System.Collections.Immutable;

namespace GamePlay;
// 召唤装备怪的版本
public partial class StoneManager
{

    private EquipmentMonster GenerateMonster()
    {
        var tbl = Ctx.Table.StoneLevelTblList.First(t => t.Level == Data.level);
        var weight = new int[] { tbl.Rare0, tbl.Rare1, tbl.Rare2, tbl.Rare3, tbl.Rare4, tbl.Rare5, tbl.Rare6, tbl.Rare7, tbl.Rare8 };
        var quality = RandomUtils.GetHappenedIndex(weight);
        var monsterTbl = Ctx.Table.EquipmentMonsterTblList.First(t => t.Quality == quality);
        Data = Data with { uniqueId = Data.uniqueId + 1 };
        return new EquipmentMonster(
            uniqueId: Data.uniqueId,
            quality: quality
        );
    }
    [Handle("stone/summon")]
    public EquipmentMonster[] Summon(long count)
    {
        Ctx.KnapsackManager.SubItem(new Item(GameConstant.TurntableStorageId, count));
        Ctx.MissionManager.UpdateMissionProgress(10, count);
        var monster = Enumerable.Range(0, (int)count).Select(i => GenerateMonster()).ToArray();
        var dic = monster.ToDictionary(m => m.uniqueId, m => m);
        Data = Data with
        {
            equipmentMonster = Data.equipmentMonster.SetItems(dic),
            totalSummon = Data.totalSummon + count
        };
        Ctx.Emit(CachePath.stone);
        Ctx.EmitMany(CachePath.equipmentMonster, dic.Keys);
        return monster;
    }


    [Handle("stone/drawCard")]
    public object DrawCard(bool auto, long uniqueId)
    {
        var finalReward = new List<Item>();
        var finalExpAdd = 0L;
        var quality = Data.equipmentMonster[uniqueId].quality;
        Data = Data with
        {
            totalDraw = Data.totalDraw + 1,
            equipmentMonster = Data.equipmentMonster.Remove(uniqueId),
        };
        Ctx.Emit(CachePath.equipmentMonster, uniqueId);
        var e = DrawCardOnce(uniqueId, quality);
        var sell = false;
        if (auto && CanSell(e))
        {
            sell = true;
        }
        var (expAdd, reward) = Ctx.PlayerEquipmentManager.AddTemp(e, sell);
        finalExpAdd += expAdd;
        finalReward.AddRange(reward);
        var res = new List<object>();
        res.Add(new Dictionary<string, object>()
        {
            {"equipment", e},
            {"reward", Item.CombineItem(finalReward)},
            {"exp", finalExpAdd},
            {"sell",sell}
        });
        return res;
    }

    private PlayerEquipment DrawCardOnce(long uniqueId, int quality)
    {
        EquipmentTbl eTbl;
        if (Data.totalDraw > Ctx.Config.Stone.InitEquipment.Length)
        {
            // 已经过了预设装备
            var tblList = Ctx.Table.EquipmentTblList.Where(t => t.Quality == quality);
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