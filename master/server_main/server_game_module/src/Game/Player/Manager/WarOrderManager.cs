using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace GamePlay
{
    public class WarOrderManager : AbstractManager<WarOrderData>, IBaseManager
    {
        public WarOrderManager(JToken saveData, PlayerDataManager ctx) : base(saveData, ctx)
        {
        }

        public override void DailyRefresh()
        {

        }

        public override void InitData()
        {
            var newOrder = Ctx.Table.WarOrderTblList.ToImmutableDictionary(
                tbl => tbl.Id,
                tbl => Data.warOrder.ContainsKey(tbl.Id) ? Data.warOrder[tbl.Id] :
                 new WarOrder(id: tbl.Id, hasBuy: tbl.OrderKind == 1, progress: 0, hasGet: ImmutableArray<int>.Empty, freeHasGet: ImmutableArray<int>.Empty).InitProgress(Ctx)
            );
            Data = Data with { warOrder = newOrder };

        }

        /** ast环境 */
        private Dictionary<string, double> Env()
        {
            var m = new Dictionary<string, double>
            {
                { "lv", Ctx.PlayerManager.Level() }
            };
            return m;
        }

        [PartialUpdate("warOrder")]
        public ImmutableDictionary<int, WarOrder> AllWarOrder()
        {
            return Data.warOrder;
        }

        public void UpdateWarOrderProgress(int kind, long count, int[] param)
        {
            var newWarOrder = Data.warOrder.ToImmutableDictionary(e => e.Key, e => e.Value.UpdateWarOrderProgress(kind, count, param, Ctx));
            var origin = Data.warOrder;
            Data = Data with { warOrder = newWarOrder };
            var diff = newWarOrder.Where(e => e.Value != origin[e.Key]).Select(e => e.Key);
            Ctx.EmitMany(CachePath.warOrder, diff);
        }

        public void BuyWarOrder(int id)
        {
            GameAssert.Expect(!Data.warOrder[id].hasBuy, 21002);
            var newWarOrder = Data.warOrder[id];
            newWarOrder = newWarOrder with { hasBuy = true };
            Data = Data with { warOrder = Data.warOrder.SetItem(id, newWarOrder) };
            Ctx.Emit(CachePath.warOrder, id);
        }

        [Handle("warOrder/obtain")]
        public ImmutableArray<Item> Obtain(int rewardId, bool free)
        {
            var rtbl = Ctx.Table.WarOrderRewardTblMap[rewardId];
            var warOrder = Data.warOrder[rtbl.WarOrderId];
            GameAssert.Expect(warOrder.progress >= rtbl.Require, 21001);
            var finalReward = new List<Item>();
            var freeReward = new List<Item>();
            var chargeReward = new List<Item>();
            if (free && !warOrder.freeHasGet.Contains(rewardId))
            {
                rtbl.FreeReward.ForEach(re =>
                {
                    freeReward.Add(new Item(int.Parse(re[0]), (long)Math.Round(AstUtil.Eval(re[1], Env()))));
                });
                finalReward.AddRange(Ctx.KnapsackManager.AddItem(freeReward));
                warOrder = warOrder with { freeHasGet = warOrder.freeHasGet.Add(rewardId) };
                Data = Data with { warOrder = Data.warOrder.SetItem(warOrder.id, warOrder) };
            }
            if (!free && warOrder.hasBuy && !warOrder.hasGet.Contains(rewardId))
            {
                rtbl.Reward.ForEach(re =>
                {
                    chargeReward.Add(new Item(int.Parse(re[0]), (long)Math.Round(AstUtil.Eval(re[1], Env()))));
                });
                finalReward.AddRange(Ctx.KnapsackManager.AddItem(chargeReward));
                warOrder = warOrder with { hasGet = warOrder.hasGet.Add(rewardId) };
                Data = Data with { warOrder = Data.warOrder.SetItem(warOrder.id, warOrder) };
            }
            Ctx.Emit(CachePath.warOrder, warOrder.id);
            return finalReward.ToImmutableArray();
        }
    }
}