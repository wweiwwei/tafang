
using System.Collections.Immutable;

namespace GamePlay;

public class BanquetSharedManager : AbstractSharedManager<BanquetSharedData>, IServerLevelSharedManager
{

    public readonly static SharedManagerConfig ManagerConfig = new(
        NeedTick: true,
        TickInterval: TimeSpan.FromSeconds(10),
        NeedSave: true,
        SaveInterval: TimeSpan.FromMinutes(1),
        NeedKeepAlive: true
    );

    public BanquetSharedManager()
    {

    }

    public BanquetSharedManager(string key, string? data) : base(key, data)
    {
    }

    public override SharedManagerConfig GetConfig()
    {
        return ManagerConfig;
    }

    public override Task Init()
    {
        RefreshGroup();
        return Task.CompletedTask;
    }

    public override Task OnDeactive()
    {
        return Task.CompletedTask;
    }

    public async void RefreshGroup()
    {
        var proxy = SharedManagerFactory.GetProxyServerLevel<RankingSharedManager>();
        await proxy.ClearRankData(7);
        var configTime = GConfig.Ins.Banquet.StartTime;
        if (Data.beginTime != configTime)
        {
            var newGroup = GTable.Ins.BanquetGroupTblList.Where(t => t.Kind == 0).ToImmutableDictionary(
                tbl => tbl.Id,
            tbl => ImmutableArray<long>.Empty
            );
            Data = Data with { beginTime = configTime, pointRewardHasSend = false, groupHasSend = ImmutableArray<int>.Empty, groupPurchase = newGroup };
        }
    }

    private static DBEmail GetEmail(BanquetGroupTbl tbl, int roleCount, long roleId)
    {
        var discount = 10 - Math.Floor(roleCount * 0.1);
        var finalDiscount = discount <= tbl.Discount ? tbl.Discount : discount;
        var returnCost = new Item((int)tbl.Cost[0], tbl.Cost[1]).MulRound((10 - finalDiscount) * 0.01);
        var reward = new Item((int)tbl.Reward[0], tbl.Reward[1]);
        var finalReward = new Item[] { returnCost, reward };
        var rewardStr = Item.GetEmailRewardString(finalReward);
        return new DBEmail()
        {
            endTime = DateTime.UtcNow.AddDays(7),
            roleId = roleId,
            template = 3004,
            param = $"{roleCount}[p]{rewardStr}",
        };
    }

    /** 参与团购 */
    public virtual Task JoinGroupPurchase(long roleId, int id)
    {
        var now = DateUtils.Now();
        GameAssert.Expect(Data.groupPurchase.ContainsKey(id) || !Data.groupHasSend.Contains(id), 22005);
        var tbl = GTable.Ins.BanquetGroupTblMap[id];
        GameAssert.Expect(tbl.StartTime <= now, 26005);
        GameAssert.Expect(tbl.EndTime > now, 26006);
        var purchase = Data.groupPurchase[id];
        GameAssert.Expect(!purchase.Contains(roleId), 22002);
        GameAssert.Expect(purchase.Length <= GConfig.Ins.Banquet.GroupLimit, 22003);
        Data = Data with
        {
            groupPurchase = Data.groupPurchase.SetItem(id, purchase.Add(roleId))
        };
        return Task.CompletedTask;
    }

    public override async Task OnTick()
    {
        var now = DateUtils.Now();
        var needSendEmail = Data.groupPurchase.Where(pair => !Data.groupHasSend.Contains(pair.Key) &&
            GTable.Ins.BanquetGroupTblMap[pair.Key].EndTime >= now &&
            pair.Value.Length > 0
        ).ToList();
        if (needSendEmail.Count > 0)
        {
            for (var i = 0; i < needSendEmail.Count; i++)
            {
                var purchase = needSendEmail[i];
                var tbl = GTable.Ins.BanquetGroupTblMap[purchase.Key];
                var mailList = purchase.Value.Select(id => GetEmail(tbl, purchase.Value.Length, id)).ToList();
                await GameRemoteCenter.SendEmail(mailList);
                Data = Data with { groupHasSend = Data.groupHasSend.Add(purchase.Key) };
            }
        }
        var actbl = GTable.Ins.ActivitiesTblMap[GameConstant.BanquetId];
        var endTime = Data.beginTime + actbl.LastDay * DateUtils.OneDay + actbl.Delay * DateUtils.OneDay;
        if (now >= endTime && !Data.pointRewardHasSend)
        {
            var proxy = SharedManagerFactory.GetProxyServerLevel<RankingSharedManager>();
            var ranking = await proxy.AllRankData(7);
            var rewardList = GTable.Ins.BanquetPointRewardTblList;
            var email = ranking.Select(x =>
            {
                var tbl = rewardList.FirstOrDefault(t => t.Point[0] <= x.point && t.Point[1] >= x.point);
                if (tbl == null) return null;
                return new DBEmail()
                {
                    endTime = DateTime.UtcNow.AddDays(7),
                    roleId = x.roleId,
                    param = $"{x.point}[p]{string.Join("|", tbl.Reward.Select(t => string.Join(",", t)))}",
                    template = 3005
                };
            }).Where(x => x != null);
            Data = Data with { pointRewardHasSend = true };
        }
    }
}