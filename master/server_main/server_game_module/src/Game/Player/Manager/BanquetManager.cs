using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace GamePlay
{
    public class BanquetManager : AbstractManager<BanquetData>, IBaseManager
    {
        public BanquetManager(JToken saveData, PlayerDataManager ctx) : base(saveData, ctx)
        {
        }

        public override void DailyRefresh()
        {

        }

        public override void InitData()
        {
            CheckResetActivity();
        }

        public void CheckResetActivity()
        {
            var configTime = Ctx.Config.Banquet.StartTime;
            if (Data.beginTime != configTime)
            {
                var newMission = Ctx.Table.BanquetMissionTblList.ToImmutableDictionary(
                    tbl => tbl.Id,
                    tbl => new Mission(id: tbl.Id, progress: 0, hasGet: false, stage: tbl.Stage).InitProgress(Ctx)
                );
                var newShop = Ctx.Table.BanquetShopTblList.ToImmutableDictionary(
                tbl => tbl.Id,
                tbl => Data.shopItems.ContainsKey(tbl.Id) ? Data.shopItems[tbl.Id] : 0
            );
                Data = Data with
                {
                    level = 0,
                    donateTimes = 0,
                    point = 0L,
                    banquetMission = newMission,
                    beginTime = configTime,
                    shopItems = newShop,
                    levelHasGet = ImmutableArray<int>.Empty
                };
                Ctx.Emit(CachePath.banquetData);
            }
        }

        public long Point => Data.point;

        [Handle("banquet/exchangePoint")]
        public ImmutableArray<Item> ExchangePoint(int id, int count)
        {
            var isFree = id == GameConstant.BanquetFreeId;
            GameAssert.Must(isFree || id == GameConstant.BanquetSpendId, $"id:{id} is not valid");
            if (isFree)
            {
                GameAssert.Expect(Data.donateTimes >= Ctx.Config.Banquet.FreeLimit, 26007);
                count = (Data.donateTimes + count > Ctx.Config.Banquet.FreeLimit) ? (Ctx.Config.Banquet.FreeLimit - Data.donateTimes) : count;
            }
            var point = Ctx.Config.Banquet.ExchangeCount[isFree ? 0 : 1];
            Ctx.KnapsackManager.SubItem(new Item(id, count));
            Data = Data with { point = Data.point + point * count, donateTimes = Data.donateTimes + (isFree ? count : 0) };
            var rest = Data.point;
            Ctx.Table.BanquetLevelTblList.ForEach(t =>
            {
                if (t.Level == Data.level && rest >= t.Require)
                {
                    rest -= t.Require;
                    Data = Data with { level = Data.level + 1 };
                }
            });
            Ctx.PlayerRankingManager.ReportBanquet();
            Ctx.Emit(CachePath.banquetData);
            return Ctx.KnapsackManager.AddItem(new Item(GameConstant.BanquetPointId, point).Mul(count));
        }

        [Handle("banquet/obtainLevelReward")]
        public ImmutableArray<Item> ObtainLevelReward(int id)
        {
            GameAssert.Must(Ctx.Table.BanquetLevelTblMap.ContainsKey(id), $"id:{id} is not exist");
            var tbl = Ctx.Table.BanquetLevelTblMap[id];
            GameAssert.Expect(!Data.levelHasGet.Contains(id), 26002);
            GameAssert.Expect(Data.level > tbl.Level, 26001);
            Data = Data with { levelHasGet = Data.levelHasGet.Add(id) };
            Ctx.Emit(CachePath.banquetData);
            var reward = Ctx.KnapsackManager.AddItem(Item.FromItemArray(tbl.Reward));
            return reward;
        }

        [Handle("banquet/buyPack")]
        public ImmutableArray<Item> BuyPack(int id)
        {
            GameAssert.Must(Ctx.Table.BanquetPackTblMap.ContainsKey(id), $"id:{id} is not exist");
            var tbl = Ctx.Table.BanquetPackTblMap[id];
            GameAssert.Expect(tbl.Limit == -1 || tbl.Limit > Data.packHasBuy.Count(i => i == id), 26003);
            Ctx.KnapsackManager.SubItem(new Item((int)tbl.Price[0], tbl.Price[1]));
            Data = Data with { packHasBuy = Data.packHasBuy.Add(id) };
            return Ctx.KnapsackManager.AddItem(Item.FromItemArray(tbl.Reward));
        }

        [Handle("banquet/buyShopItem")]
        public ImmutableArray<Item> BuyShopItem(int tid, int count)
        {
            GameAssert.Must(Ctx.Table.BanquetShopTblMap.ContainsKey(tid), $"id:{tid} is not exist");
            var tbl = Ctx.Table.BanquetShopTblMap[tid];
            GameAssert.Expect(Data.point >= tbl.Unlock, 26004);
            GameAssert.Expect(tbl.Storage == -1 || tbl.Storage >= Data.shopItems[tid] + count, 23001);
            Ctx.KnapsackManager.SubItem(new Item((int)tbl.Price[0], tbl.Price[1]).Mul(count));
            Data = Data with { shopItems = Data.shopItems.SetItem(tid, Data.shopItems[tid] + count) };
            // Ctx.Emit(CachePath.shopData);
            return Ctx.KnapsackManager.AddItem(new Item((int)tbl.Item[0], tbl.Item[1]).Mul(count));
        }

        [Handle("banquet/obtainMissionReward")]
        public ImmutableArray<Item> ObtainMissionReward(int id)
        {
            GameAssert.Must(Data.banquetMission.ContainsKey(id), $"id:{id} is not exist");
            var mission = Data.banquetMission[id];
            var (reward, m) = mission.Obtain(Ctx);
            var finalReward = Ctx.KnapsackManager.AddItem(reward);
            Data = Data with { banquetMission = Data.banquetMission.SetItem(id, m) };
            Ctx.Emit(CachePath.banquetMission, id);
            return finalReward;
        }

        [Handle("banquet/buyGroup")]
        public ImmutableArray<Item> BuyGroup(int id)
        {
            var now = Ctx.Now();
            var tbl = Ctx.Table.BanquetGroupTblMap[id];
            GameAssert.Expect(now >= tbl.StartTime, 26005);
            GameAssert.Expect(now < tbl.EndTime, 26006);
            Ctx.KnapsackManager.SubItem(new Item((int)tbl.Cost[0], tbl.Cost[1]));
            if (tbl.Kind == 0)
            {
                var proxy = SharedManagerFactory.GetProxyServerLevel<BanquetSharedManager>();
                proxy.JoinGroupPurchase(Ctx.RoleData.id, id);
                return ImmutableArray<Item>.Empty;
            }
            else
            {
                return new ImmutableArray<Item>() { new Item((int)tbl.Reward[0], tbl.Reward[1]) };
            }
        }

        public void UpdateBanquetMissionProgress(int kind, long count, int[] param)
        {
            var tbl = Ctx.Table.ActivitiesTblMap[GameConstant.BanquetId];
            var day = (int)Math.Ceiling((double)(Ctx.Now() - (Data.beginTime + tbl.Delay * DateUtils.OneDay)) / DateUtils.OneDay);
            if (day > tbl.LastDay) return;
            var newMap = Data.banquetMission.ToImmutableDictionary(e => e.Key, e =>
            {
                if (Ctx.Table.BanquetMissionTblMap[e.Key].Day <= day)
                {
                    return e.Value.UpdateMissionProgress(kind, count, param, Ctx);
                }
                return e.Value;
            });
            var originMap = Data.banquetMission;
            Data = Data with { banquetMission = newMap };
            var diff = newMap.Where(e => e.Value != originMap[e.Key]).Select(e => e.Key);
            Ctx.EmitMany(CachePath.banquetMission, diff);
        }

        [PartialUpdate("banquetMission")]
        public ImmutableDictionary<int, Mission> InitMission()
        {
            return Data.banquetMission;
        }

        [Update("banquetData")]
        public Dictionary<string, object> InitBanquetData()
        {
            return new Dictionary<string, object>(){
                {"level",Data.level},
                {"point",Data.point},
                {"donateTimes",Data.donateTimes},
                {"beginTime",Data.beginTime},
                {"levelHasGet",Data.levelHasGet},
                {"shopItems",Data.shopItems}
            };
        }
    }
}