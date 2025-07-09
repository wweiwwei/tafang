using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace GamePlay;

public partial class StoneManager : AbstractManager<StoneData>, IBaseManager
{
    public StoneManager(JToken saveData, PlayerDataManager ctx) : base(saveData, ctx)
    {
    }

    public override void DailyRefresh()
    {

    }

    public override void InitData()
    {

    }

    public override void Tick()
    {
        CheckUpgradeComplete();
    }

    public int Level()
    {
        return Data.level;
    }

    [PartialUpdate("equipmentMonster")]
    public ImmutableDictionary<long, EquipmentMonster> EquipmentMonster()
    {
        return Data.equipmentMonster;
    }


    [Update("stone")]
    public Dictionary<string, object> PlayerEquipment()
    {
        return new Dictionary<string, object>
        {
            {"level",Data.level},
            {"stage",Data.stage},
            {"upgrade",Data.upgrade},
            {"upgradeEndTime",Data.upgradeEndTime},
            {"totalSummon",Data.totalSummon},
            {"totalDraw",Data.totalDraw},
        };
    }

    [Update("stoneAuto")]
    public StoneAutoSetting StoneAuto()
    {
        return Data.autoSetting;
    }

    private void CheckUpgradeComplete()
    {
        if (Data.upgrade && Ctx.Now() >= Data.upgradeEndTime)
        {
            Data = Data with { level = Data.level + 1, stage = 0, upgrade = false, upgradeEndTime = -1 };
            Ctx.MissionManager.UpdateMissionProgress(37, 1);
            Ctx.Emit(CachePath.stone);
        }
    }

    [Handle("stone/changeAutoSetting")]
    public void ChangeAutoSetting(StoneAutoSetting setting)
    {
        var level = Data.level;
        var tbl = Ctx.Table.StoneLevelTblList.First(t => t.Level == level);
        if (tbl.OpenCount < setting.openCount)
        {
            // 未能开启却尝试设置
            return;
        }
        Data = Data with { autoSetting = setting };
        Ctx.Emit(CachePath.stoneAuto);
    }

    [Handle("stone/upgradeStage")]
    public void UpgradeStage()
    {
        GameAssert.Crash("not use");
        var maxLevel = Ctx.Table.StoneLevelTblList.Max(t => t.Level);
        GameAssert.Expect(Data.level < maxLevel, 50001);
        var tbl = Ctx.Table.StoneLevelTblList.First(t => t.Level == Data.level);
        var cost = new Item(GameConstant.CoinId, tbl.UpgradeCost);
        GameAssert.Expect(Data.stage < tbl.UpgradeCount, 50002);
        Ctx.KnapsackManager.SubItem(cost);
        Data = Data with { stage = Data.stage + 1 };
        Ctx.Emit(CachePath.stone);
    }

    [Handle("stone/upgrade")]
    public void Upgrade()
    {
        var maxLevel = Ctx.Table.StoneLevelTblList.Max(t => t.Level);
        GameAssert.Expect(Data.level < maxLevel, 50001);
        var tbl = Ctx.Table.StoneLevelTblList.First(t => t.Level == Data.level);
        // GameAssert.Expect(Data.stage >= tbl.UpgradeCount, 50003);
        var totalRequire = Ctx.Table.StoneLevelTblList.Where(t => t.Level <= Data.level).Sum(t => t.UpgradeCost);
        GameAssert.Expect(Data.totalSummon >= totalRequire, 50005);
        Data = Data with { upgrade = true, upgradeEndTime = Ctx.Now() + tbl.UpgradeTime * DateUtils.OneMinute };
        Ctx.Emit(CachePath.stone);
    }

    [Handle("stone/accelerate")]
    public void Accelerate(int kind, long count)
    {
        GameAssert.Expect(Data.upgrade, 50004);
        if (!Data.upgrade) return;
        // todo 视频和物品消耗
        if (kind == 1)
        {
            // 视频
            Data = Data with { upgradeEndTime = Data.upgradeEndTime - 30 * DateUtils.OneMinute };
        }
        else if (kind == 2)
        {
            // 消耗加速物品
            Data = Data with { upgradeEndTime = Data.upgradeEndTime - 5 * DateUtils.OneMinute * count };
        }
        CheckUpgradeComplete();
        Ctx.Emit(CachePath.stone);
    }


    /** 是否出售装备 */
    public bool CanSell(PlayerEquipment e)
    {
        var tbl = Ctx.Table.EquipmentTblMap[e.id];
        // 战力满足需求
        if (Data.autoSetting.highBpStop)
        {
            var part = e.Tbl(Ctx).Part;
            var equipment = Ctx.PlayerEquipmentManager.PlayerEquipment();
            if (part >= equipment.Length) return false;
            var originUid = equipment[part];
            var storage = Ctx.PlayerEquipmentManager.PlayerEquipmentStorage();
            if (!storage.ContainsKey(originUid))
            {
                return false;
            }
            var originE = storage[originUid];
            var bp = e.Bp(Ctx);
            if (bp > originE.Bp(Ctx))
            {
                return false;
            }
        }
        if (tbl.Quality < Data.autoSetting.autoSellQuality) return true;
        // 未启动任何筛选条件，不能出售
        if (!Data.autoSetting.filter1Open && !Data.autoSetting.filter2Open) return false;
        var ok1 = Data.autoSetting.filter1Open && CheckFilter(e, Data.autoSetting.filter1);
        var ok2 = Data.autoSetting.filter2Open && CheckFilter(e, Data.autoSetting.filter2);
        // 满足其中一条筛选条件则不能出售
        return !(ok1 || ok2);
    }

    public bool CheckFilter(PlayerEquipment e, ImmutableArray<string> filter)
    {
        var need = filter.Where(p => p != "any").ToArray();
        if (need.Length == 0) return true;
        // 词条数少于筛选条件
        if (e.stat.Length < need.Length) return false;
        var propertyList = e.stat.Select(s =>
        {
            var tbl = s.Tbl(Ctx);
            return tbl.Property;
        }).ToArray();
        // 所有需要属性都能在词条中找到
        return need.All(p => propertyList.Contains(p));
    }

    private ImmutableArray<PlayerEquipmentStat> GetStat(EquipmentTbl tbl, int lv)
    {
        var res = ImmutableArray<PlayerEquipmentStat>.Empty;
        if (!RandomUtils.IsHappened(tbl.Stat1 * 0.0001)) return res;
        var env = new Dictionary<string, double> {
            {"lv",lv}
        };
        var rdIndex1 = RandomUtils.GetHappenedIndex(tbl.StatWeight);
        var id1 = tbl.StatPool[rdIndex1];
        var statTbl1 = Ctx.Table.EquipmentStatTblMap[id1];
        var max1 = (long)Math.Floor(AstUtil.Eval(statTbl1.Max, env));
        var min1 = (long)Math.Floor(AstUtil.Eval(statTbl1.Min, env));
        var s1 = new PlayerEquipmentStat(id1, RandomUtils.RandomLong(min1, max1));
        res = res.Add(s1);
        if (!RandomUtils.IsHappened(tbl.Stat2 * 0.0001)) return res;
        var idList = tbl.StatPool.RemoveAt(rdIndex1);
        var weightList = tbl.StatWeight.RemoveAt(rdIndex1);
        var rdIndex2 = RandomUtils.GetHappenedIndex(weightList);
        var id2 = idList[rdIndex2];
        var statTbl2 = Ctx.Table.EquipmentStatTblMap[id2];
        var max2 = (long)Math.Floor(AstUtil.Eval(statTbl2.Max, env));
        var min2 = (long)Math.Floor(AstUtil.Eval(statTbl2.Min, env));
        var s2 = new PlayerEquipmentStat(id2, RandomUtils.RandomLong(min2, max2));
        res = res.Add(s2);
        return res;
    }


}
