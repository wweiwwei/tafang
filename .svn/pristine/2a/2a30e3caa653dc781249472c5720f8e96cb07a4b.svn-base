using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace GamePlay;
public class InfiniteManager : AbstractManager<InfiniteData>, IBaseManager
{
    public InfiniteManager(JToken saveData, PlayerDataManager ctx) : base(saveData, ctx)
    {
    }

    public override void DailyRefresh()
    {
        var tbl = Ctx.Table.InfiniteBattleTblList.FirstOrDefault(t =>
        {
            return t.Lv[0] <= Data.historyRecord + 1 && t.Lv[1] >= Data.historyRecord + 1;
        });
        if (tbl == null)
        {
            tbl = Ctx.Table.InfiniteBattleTblList.FirstOrDefault(t =>
                    {
                        return t.Lv[0] <= Data.historyRecord && t.Lv[1] >= Data.historyRecord;
                    });
        }
        Data = Data with
        {
            todayHasGet = 0,
            todayRecord = tbl!.RecordPoint - 1,
        };
    }

    public override void InitData()
    {

    }

    [Update("infiniteData")]
    public Dictionary<string, object> InfiniteData()
    {
        return new() {
            {"historyRecord",Data.historyRecord},
            {"todayRecord",Data.todayRecord},
            {"todayHasGet",Data.todayHasGet},
        };
    }
    [Handle("infinite/updateRecord")]
    public void UpdateRecord(int lv)
    {
        Data = Data with
        {
            historyRecord = Math.Max(lv, Data.historyRecord),
            todayRecord = Math.Max(lv, Data.todayRecord),
        };
        Ctx.Emit(CachePath.infiniteData);
        Ctx.MissionManager.UpdateMissionProgress(39, 1);
    }

    [Handle("infinite/obtainReward")]
    public ImmutableArray<Item> ObtainReward()
    {
        var list = new List<Item>();
        Dictionary<string, double> m = new Dictionary<string, double>();
        for (var i = Data.todayHasGet + 1; i <= Data.todayRecord; i++)
        {
            m["lv"] = i;
            var tbl = Ctx.Table.InfiniteBattleTblList.First(t => t.Lv[0] <= i && t.Lv[1] >= i);
            ImmutableArray<Item> firstReward = tbl.Reward.Select(t => new Item(int.Parse(t[0]), (long)Math.Round(AstUtilsEx.EvalOptimize(t[1], m)))).ToImmutableArray();
            ImmutableArray<Item> specialReward = tbl.SpecialReward.Where(t => i % int.Parse(t[0]) == 0).Select(t => new Item(int.Parse(t[1]), (long)Math.Round(AstUtilsEx.EvalOptimize(t[2], m)))).ToImmutableArray();
            list.AddRange(firstReward);
            list.AddRange(specialReward);
        }
        var combineReward = Item.CombineItem(list);
        var finalReward = Ctx.KnapsackManager.AddItem(combineReward);
        Data = Data with
        {
            todayHasGet = Data.todayRecord,
        };
        Ctx.Emit(CachePath.infiniteData);
        return finalReward;
    }

    [Handle("infinite/obtainRewardMail")]
    public ImmutableArray<Item> ObtainRewardMail(long uid)
    {
        // todo 奖励计算
        Data = Data with
        {
            todayHasGet = Data.todayRecord
        };
        Ctx.Emit(CachePath.infiniteData);
        return ImmutableArray<Item>.Empty;
    }

    [Handle("infinite/obtainAllRewardMail")]
    public ImmutableArray<Item> ObtainAllRewardMail()
    {
        // todo 奖励计算
        Data = Data with
        {
            todayHasGet = Data.todayRecord
        };
        Ctx.Emit(CachePath.infiniteData);
        return ImmutableArray<Item>.Empty;
    }
}
