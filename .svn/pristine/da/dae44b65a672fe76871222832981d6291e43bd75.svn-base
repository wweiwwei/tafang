using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace GamePlay
{
    public class BattleManager : AbstractManager<BattleData>, IBaseManager
    {
        public BattleManager(JToken saveData, PlayerDataManager ctx) : base(saveData, ctx)
        {
        }

        public override void DailyRefresh()
        {
            Data = Data with { video = ImmutableDictionary<int, int>.Empty };
            Ctx.Emit(CachePath.magicStaff);
        }

        public override void InitData()
        {

        }

        [Handle("battle/videoAddMagicStaff")]
        public ImmutableArray<Item> VideoAddMagicStaff(int id)
        {
            var tbl = Ctx.Table.MagicStaffTblMap[id];
            var todayHasUse = Data.video.GetValueOrDefault(id, 0);
            var remain = tbl.VideoLimit - todayHasUse;
            GameAssert.Expect(remain > 0, 15001);
            Data = Data with { video = Data.video.SetItem(id, todayHasUse + 1) };
            var reward = new Item(id, tbl.VideoCount);
            var finalReward = Ctx.KnapsackManager.AddItem(reward);
            Ctx.Emit(CachePath.magicStaff);
            return finalReward;
        }

        [Handle("battle/diamondBuyMagicStaff")]
        public ImmutableArray<Item> DiamondBuyMagicStaff(int id, long count)
        {
            var tbl = Ctx.Table.MagicStaffTblMap[id];
            var cost = new Item(GameConstant.DiamondId, tbl.Price * count);
            Ctx.KnapsackManager.SubItem(cost);
            var finalReward = Ctx.KnapsackManager.AddItem(new Item(id, count));
            Ctx.Emit(CachePath.magicStaff);
            return finalReward;
        }

        [Handle("battle/useMagicStaff")]
        public void UseMagicStaff(int id, long count)
        {
            var tbl = Ctx.Table.MagicStaffTblMap[id];
            Ctx.KnapsackManager.SubItem(new Item(id, count));
            var time = tbl.Duration * 60 * 1000L;
            if (Data.kindId == id)
            {
                Data = Data with { remain = Data.remain + time };
            }
            else
            {
                Data = Data with { remain = time, kindId = id };
            }
            Ctx.Emit(CachePath.magicStaff);
        }

        [Handle("battle/timeUseReport")]
        public void TimeUseReport(long time)
        {
            Data = Data with { remain = Math.Max(Data.remain - time, 0) };
            Ctx.Emit(CachePath.magicStaff);
        }

        [Update("magicStaff")]
        public Dictionary<string, object> MagicStaff() => new Dictionary<string, object>
        {
            ["video"] = Data.video,
            ["remain"] = Data.remain,
            ["kindId"] = Data.kindId,
        };

        [Handle("battle/killMonster")]
        public void KillMonster()
        {
            Ctx.MissionManager.UpdateMissionProgress(17, 1);
        }

        [Handle("battle/killMonsterEx")]
        public void KillMonsterEx(long count, long coin)
        {
            Ctx.MissionManager.UpdateMissionProgress(17, count);
            Ctx.KnapsackManager.AddItem(new Item((int)Ctx.Config.Battle.DropItem[0], coin));
        }
    }
}