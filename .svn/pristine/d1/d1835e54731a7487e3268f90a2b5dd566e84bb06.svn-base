using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace GamePlay
{
    public class ChargeManager : AbstractManager<ChargeData>, IBaseManager
    {
        public ChargeManager(JToken saveData, PlayerDataManager ctx) : base(saveData, ctx)
        {
        }
        public override void DailyRefresh()
        {
            if (Data.month2Active)
            {
                Data = Data with { month2Reward = true };
                Ctx.Emit(CachePath.chargeData);
            }
            if (CheckMonthRemain() > 0)
            {
                Data = Data with { month1Reward = true };
                Ctx.Emit(CachePath.chargeData);
            }
        }

        public override void InitData()
        {

        }

        public List<DBPlayerOrder> OrderCache = new List<DBPlayerOrder>();

        [Update("charge")]
        public Dictionary<string, object> ChargeInfo()
        {
            var hasGetSet = Data.hasGetOrder.Select(t => t.id).ToHashSet();
            return new Dictionary<string, object>()
            {
                { "totalPay", OrderCache.Sum(t => t.price) },
                { "order", OrderCache },
                { "canGetOrder", OrderCache.Where(t => !hasGetSet.Contains(t.id)) }
            };
        }

        [Update("chargeData")]
        public Dictionary<string, object> ChargeData()
        {
            var month1 = new Dictionary<string, object>()
            {
                { "remain", Data.month1Remain },
                { "start", (DateUtils.GetTodayStartTime(Ctx.Now()) - Data.month1Stamp) / DateUtils.OneDay },
                { "reward", Data.month1Reward }
            };
            var month2 = new Dictionary<string, object>()
            {
                { "active", Data.month2Active },
                { "reward", Data.month2Reward }
            };
            return new Dictionary<string, object>()
            {
                { "month1", month1 },
                { "month2", month2 },
                { "clearAd", Data.clearAd },
                { "firstPackage", Data.firstPackage }
            };
        }

        [Handle("charge/checkMonthRemain")]
        public int CheckMonthRemain()
        {
            if (Data.month1Remain > 0)
            {
                var remain = Data.month1Remain - ((DateUtils.GetTodayStartTime(Ctx.Now()) - Data.month1Stamp) / DateUtils.OneDay);
                if (remain <= 0)
                {
                    Data = Data with { month1Remain = 0, month1Reward = false };
                    Ctx.Emit(CachePath.chargeData);
                    return 0;
                }
                else
                {
                    return (int)remain;
                }
            }
            else
            {
                return 0;
            }
        }

        [Handle("charge/testPay")]
        public async Task TestPay(int itemId, string extra)
        {
            await Ctx.Remote.TestPay(itemId, extra);
        }

        [Handle("charge/obtainReward")]
        public object? ObtainReward(int id)
        {
            if (OrderCache.All(t => t.id != id)) return false;
            var hasGetSet = Data.hasGetOrder.Select(t => t.id).ToHashSet();
            if (hasGetSet.Contains(id)) return false;
            Data = Data with { hasGetOrder = Data.hasGetOrder.Add(new HasGetOrder(id, Ctx.Now())) };
            Ctx.Emit(CachePath.charge);
            var order = OrderCache.First(t => t.id == id);
            return HandleReward(order);
        }

        public object? HandleReward(DBPlayerOrder order)
        {
            var tbl = Ctx.Table.ChargeTblMap[order.itemId];
            switch (tbl.Kind)
            {
                case 1:
                    return HandleDiamond(order);
                case 2:
                    return HandlePinkDiamond(order);
                case 3:
                    return HandleClearAd(order);
                case 4:
                    return HandleMonthCard(order);
                case 5:
                    return HandlePermanentCard(order);
                case 6:
                    return HandlePackage(order);
                case 7:
                    return HandleFirstCharge(order);
                case 8:
                    HandleWarOrder(order);
                    return null;
                // case 9:
                //     return HandlePuzzlePack(order);
                case 10:
                    return HandleImpactPack(order);
                default:
                    return null;
            }
        }
        public void HandleWarOrder(DBPlayerOrder order)
        {
            Ctx.WarOrderManager.BuyWarOrder(order.itemId);
        }
        public ImmutableArray<Item> HandleImpactPack(DBPlayerOrder order)
        {
            return Ctx.ImpactManager.BuyImpactPack(order);
        }

        public ImmutableArray<Item> HandleDiamond(DBPlayerOrder order)
        {
            var tbl = Ctx.Table.ChargeTblMap[order.itemId];
            var baseCount = Math.Max(tbl.Cny / 10, 1);
            var count = OrderCache.Any(t => t.id != order.id && t.itemId == order.itemId) ? baseCount : baseCount * 2;
            var reward = new Item(GameConstant.DiamondId, count);
            var finalReward = Ctx.KnapsackManager.AddItem(reward);
            return finalReward;
        }

        public ImmutableArray<Item> HandlePinkDiamond(DBPlayerOrder order)
        {
            var tbl = Ctx.Table.ChargeTblMap[order.itemId];
            var reward = new Item(GameConstant.PinkDiamondId, tbl.Cny / 10);
            var finalReward = Ctx.KnapsackManager.AddItem(reward);
            return finalReward;
        }

        public ImmutableArray<Item> HandleClearAd(DBPlayerOrder order)
        {
            GameAssert.Expect(!Data.clearAd, 17001);
            Data = Data with { clearAd = true };
            Ctx.Emit(CachePath.chargeData);
            var reward = Item.FromItemArray(Ctx.Table.ClearAdTblMap[order.itemId].Reward);
            var finalReward = Ctx.KnapsackManager.AddItem(reward).ToImmutableArray();
            return finalReward;
        }

        public ImmutableArray<Item> HandlePermanentCard(DBPlayerOrder order)
        {
            GameAssert.Expect(!Data.month2Active, 17001);
            Data = Data with { month2Active = true, month2Reward = true };
            Ctx.Emit(CachePath.chargeData);
            var permanentReward = ObtainPermanentCardReward();
            var reward = Item.FromItemArray(Ctx.Table.MonthCardTblMap[order.itemId].Purchase);
            var finalReward = Ctx.KnapsackManager.AddItem(reward).ToImmutableArray();
            return finalReward.AddRange(permanentReward);
        }

        public ImmutableArray<Item> HandleMonthCard(DBPlayerOrder order)
        {
            if (CheckMonthRemain() > 0)
            {
                Data = Data with { month1Remain = Data.month1Remain + 30 };
            }
            else
            {
                Data = Data with { month1Stamp = DateUtils.GetTodayStartTime(Ctx.Now()), month1Remain = 30, month1Reward = true };
            }
            Ctx.Emit(CachePath.chargeData);
            var monthCardReward = ObtainMonthCardReward();
            var reward = Item.FromItemArray(Ctx.Table.MonthCardTblMap[order.itemId].Purchase);
            var finalReward = Ctx.KnapsackManager.AddItem(reward).ToImmutableArray();
            return finalReward.AddRange(monthCardReward);
        }

        public ImmutableArray<Item> HandlePackage(DBPlayerOrder order)
        {
            var extra = JsonUtils.Parse<PackageChargeExtra>(order.extra);
            var info = PackInfo()[extra.id];
            GameAssert.Expect(!info.hasBuy, 17001);
            var newInfo = info with { hasBuy = true };
            Data = Data with { giftPack = Data.giftPack.SetItem(extra.id, newInfo) };
            var tbl = Ctx.Table.GiftPackTblMap[order.itemId];
            var reward = Item.FromItemArray(tbl.Reward);
            var finalReward = Ctx.KnapsackManager.AddItem(reward);
            Ctx.Emit(CachePath.giftPack, extra.id);
            return finalReward;
        }

        public ImmutableArray<Item> HandleFirstCharge(DBPlayerOrder order)
        {
            GameAssert.Expect(!Data.firstPackage.Contains(order.itemId), 17001);
            Data = Data with { firstPackage = Data.firstPackage.Add(order.itemId) };
            Ctx.Emit(CachePath.chargeData);
            var tbl = Ctx.Table.FirstPackageTblMap[order.itemId];
            var reward = Item.FromItemArray(tbl.Reward);
            var finalReward = Ctx.KnapsackManager.AddItem(reward);
            return finalReward;
        }

        [Handle("charge/obtainPermanentCardReward")]
        public ImmutableArray<Item> ObtainPermanentCardReward()
        {
            if (Data.month2Reward && Data.month2Active)
            {
                Data = Data with { month2Reward = false };
                Ctx.Emit(CachePath.chargeData);
                var tbl = Ctx.Table.MonthCardTblMap[GameConstant.PermanentCardId];
                var reward = Item.FromItemArray(tbl.Reward);
                var finalReward = Ctx.KnapsackManager.AddItem(reward).ToImmutableArray();
                return finalReward;
            }
            else
            {
                return ImmutableArray<Item>.Empty;
            }
        }

        [Handle("charge/obtainMonthCardReward")]
        public ImmutableArray<Item> ObtainMonthCardReward()
        {
            if (Data.month1Reward)
            {
                Data = Data with { month1Reward = false };
                Ctx.Emit(CachePath.chargeData);
                var tbl = Ctx.Table.MonthCardTblMap[GameConstant.MonthCardId];
                var reward = Item.FromItemArray(tbl.Reward);
                var finalReward = Ctx.KnapsackManager.AddItem(reward).ToImmutableArray();
                return finalReward;
            }
            else
            {
                return ImmutableArray<Item>.Empty;
            }
        }

        [PartialUpdate("giftPack")]
        public ImmutableDictionary<int, GiftPackInfo> PackInfo() => Data.giftPack;

        [Handle("charge/activePack")]
        public void ActivePack(int id)
        {
            var tbl = Ctx.Table.PackRuleTblMap[id];
            var duration = tbl.Duration == -1 ? -1 : Ctx.Now() + tbl.Duration * DateUtils.OneHour;
            var total = OrderCache.Sum(t => t.price);
            var index = tbl.PlayerClass.LastIndexWhere(t => t <= total);
            var newPackageId = tbl.PackageId[index];
            if (Data.giftPack.ContainsKey(id))
            {
                var info = Data.giftPack[id];
                var newInfo = info with
                {
                    packageId = newPackageId,
                    endTime = duration,
                    hasShow = info.hasShow + 1,
                    hasBuy = false
                };
                Data = Data with { giftPack = Data.giftPack.SetItem(id, newInfo) };
                Ctx.Emit(CachePath.giftPack, id);
            }
            else
            {
                var newInfo = new GiftPackInfo(
                    id: id,
                    endTime: Ctx.Now() + 4 * DateUtils.OneHour,
                    hasShow: 1,
                    hasBuy: false,
                    packageId: newPackageId
                );
                Data = Data with { giftPack = Data.giftPack.Add(id, newInfo) };
                Ctx.Emit(CachePath.giftPack, newInfo.id);
            }
        }

    }

    public record PackageChargeExtra(int id);
}