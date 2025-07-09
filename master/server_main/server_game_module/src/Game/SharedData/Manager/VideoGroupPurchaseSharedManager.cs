
using System.Collections.Immutable;

namespace GamePlay;

public class VideoGroupPurchaseSharedManager : AbstractSharedManager<VideoGroupPurchaseSharedData>, IServerLevelSharedManager
{

    public readonly static SharedManagerConfig ManagerConfig = new(
        NeedTick: true,
        TickInterval: TimeSpan.FromSeconds(10),
        NeedSave: true,
        SaveInterval: TimeSpan.FromMinutes(1),
        NeedKeepAlive: true
    );

    public VideoGroupPurchaseSharedManager()
    {

    }

    public VideoGroupPurchaseSharedManager(string key, string? data) : base(key, data)
    {
    }

    public override SharedManagerConfig GetConfig()
    {
        return ManagerConfig;
    }

    public override Task Init()
    {
        return Task.CompletedTask;
    }

    public override Task OnDeactive()
    {
        return Task.CompletedTask;
    }


    /** 发起团购 */
    public virtual Task LaunchGroupPurchase(long roleId, int rewardId)
    {
        var tbl = GTable.Ins.VideoGroupPurchaseTblMap[rewardId];
        var purchase = new VideoGroupPurchase(
            uniqueId: Data.uniqueId,
            beginTime: DateUtils.Now(),
            endTime: DateUtils.Now() + tbl.Time * DateUtils.OneMinute,
            rewardId: rewardId,
            roleIdList: ImmutableArray<long>.Empty,
            launcher: roleId,
            hasSend: false
            );
        Data = Data with
        {
            purchaseMap = Data.purchaseMap.SetItem(purchase.uniqueId, purchase),
            uniqueId = Data.uniqueId + 1,
        };
        var updateData = new Dictionary<long, VideoGroupPurchase>(){
            {purchase.uniqueId,purchase}
        };
        EmitKeyUpdateForAllPlayer(SharedCachePath.videoGroupPurchaseShared, updateData);
        return Task.CompletedTask;
    }

    private static DBEmail GetEmail(VideoGroupPurchaseTbl tbl, int roleCount, long roleId)
    {
        var reward = Item.FromItemArray(tbl.Reward).Select(x => x.Mul(roleCount));
        var rewardStr = Item.GetEmailRewardString(reward);
        return new DBEmail()
        {
            endTime = DateTime.UtcNow.AddDays(7),
            roleId = roleId,
            template = 2004,
            param = $"{roleCount}[p]{rewardStr}",
        };
    }

    /** 参与团购 */
    public virtual async Task JoinGroupPurchase(long roleId, long uniqueId)
    {
        GameAssert.Expect(Data.purchaseMap.ContainsKey(uniqueId), 22005);
        var purchase = Data.purchaseMap[uniqueId];
        if (purchase.roleIdList.Contains(roleId)) return;
        VideoGroupPurchase newPurchase;
        var tbl = GTable.Ins.VideoGroupPurchaseTblMap[purchase.rewardId];
        if (purchase.hasSend)
        {
            // 已发送，但还有玩家加入，直接给该玩家发邮件
            newPurchase = purchase with { roleIdList = purchase.roleIdList.Add(roleId) };
            // 按照发送邮件时的人数发送
            var mail = GetEmail(tbl, purchase.roleIdList.Length, roleId);
            await GameRemoteCenter.SendEmail(new List<DBEmail>() { mail });
        }
        else if (purchase.roleIdList.Length + 1 >= tbl.Limit)
        {
            // 未发送，人数达到了，直接发邮件
            newPurchase = purchase with { roleIdList = purchase.roleIdList.Add(roleId), hasSend = true };
            var mailList = newPurchase.roleIdList.Select(id => GetEmail(tbl, newPurchase.roleIdList.Length, id)).ToList();
            await GameRemoteCenter.SendEmail(mailList);
        }
        else
        {
            // 未发送，人数未达到
            newPurchase = purchase with { roleIdList = purchase.roleIdList.Add(roleId) };
        }
        Data = Data with
        {
            purchaseMap = Data.purchaseMap.SetItem(uniqueId, newPurchase),
        };
        var updateData = new Dictionary<long, VideoGroupPurchase>(){
            {uniqueId,newPurchase}
        };
        EmitKeyUpdateForAllPlayer(SharedCachePath.videoGroupPurchaseShared, updateData);
    }

    public virtual Task<bool> IsCanJoin(long roleId, long uniqueId)
    {
        if (!Data.purchaseMap.ContainsKey(uniqueId)) return Task.FromResult(false);
        var purchase = Data.purchaseMap[uniqueId];
        if (purchase.roleIdList.Contains(roleId)) return Task.FromResult(false);
        var tbl = GTable.Ins.VideoGroupPurchaseTblMap[purchase.rewardId];
        if (purchase.roleIdList.Length >= tbl.Limit) return Task.FromResult(false);
        return Task.FromResult(true);
    }

    public virtual Task<ImmutableDictionary<long, VideoGroupPurchase>> RecentVideoGroupPurchase(long roleId)
    {
        return Task.FromResult(Data.purchaseMap);
    }

    public override async Task OnTick()
    {
        var now = DateUtils.Now();
        var needSendEmail = Data.purchaseMap.Where(x => now > x.Value.endTime && !x.Value.hasSend).ToList();
        if (needSendEmail.Count > 0)
        {
            var newMap = Data.purchaseMap.ToImmutableDictionary(
                kv => kv.Key,
                kv => needSendEmail.Any(x => x.Key == kv.Key) ? kv.Value with { hasSend = true } : kv.Value);
            Data = Data with
            {
                purchaseMap = newMap
            };
            for (var i = 0; i < needSendEmail.Count; i++)
            {
                var purchase = needSendEmail[i].Value;
                var tbl = GTable.Ins.VideoGroupPurchaseTblMap[purchase.rewardId];
                var mailList = purchase.roleIdList.Select(id => GetEmail(tbl, purchase.roleIdList.Length, id)).ToList();
                await GameRemoteCenter.SendEmail(mailList);
            }
        }
        var matchTime = now - DateUtils.OneMinute * 3;
        var needRemove = Data.purchaseMap.Where(x => matchTime > x.Value.endTime).ToList();
        if (needRemove.Count > 0)
        {
            Data = Data with
            {
                purchaseMap = Data.purchaseMap.RemoveRange(needRemove.Select(x => x.Key))
            };
        }
    }


}