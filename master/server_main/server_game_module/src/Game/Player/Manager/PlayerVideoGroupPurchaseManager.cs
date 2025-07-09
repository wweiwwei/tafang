using System.Collections.Immutable;
using Newtonsoft.Json.Linq;

namespace GamePlay;

public class PlayerVideoGroupPurchaseManager : AbstractManager<PlayerVideoGroupPurchaseData>, IBaseManager
{
    public PlayerVideoGroupPurchaseManager(JToken saveData, PlayerDataManager ctx) : base(saveData, ctx)
    {
    }

    public override void DailyRefresh()
    {
        Data = Data with
        {
            todayJoin = 0,
            todayLaunch = 0,
            hasJoinToday = ImmutableArray<int>.Empty
        };
        Ctx.Emit(CachePath.videoGroupPurchaseData);
    }

    public override void InitData()
    {

    }

    [Update("videoGroupPurchaseData")]
    public Dictionary<string, object> VideoGroupPurchaseData()
    {
        return new Dictionary<string, object>() {
            {"videoCount",Data.videoCount},
            {"todayJoin",Data.todayJoin},
            {"todayLaunch",Data.todayLaunch},
            {"rewardId",Ctx.Table.VideoGroupPurchaseTblList[Data.totalLaunch % Ctx.Table.VideoGroupPurchaseTblList.Length].Id}
        };
    }

    [Handle("playerVideoGroupPurchase/reportVideo")]
    public void ReportVideo()
    {
        Data = Data with
        {
            videoCount = Data.videoCount + 1,
        };
        Ctx.Emit(CachePath.videoGroupPurchaseData);
    }

    [Handle("playerVideoGroupPurchase/launchGroupPurchase")]
    public async Task LaunchGroupPurchase()
    {
        GameAssert.Expect(Data.videoCount >= Ctx.Config.VideoGroupPurchase.LaunchRequire, 22001);
        GameAssert.Expect(Data.todayLaunch < Ctx.Config.VideoGroupPurchase.LaunchDailyLimit, 22006);
        var proxy = SharedManagerFactory.GetProxyServerLevel<VideoGroupPurchaseSharedManager>();
        var tbl = Ctx.Table.VideoGroupPurchaseTblList[Data.totalLaunch % Ctx.Table.VideoGroupPurchaseTblList.Length];
        Data = Data with
        {
            videoCount = Data.videoCount - Ctx.Config.VideoGroupPurchase.LaunchRequire,
            totalLaunch = Data.totalLaunch + 1,
            todayLaunch = Data.todayLaunch + 1,
        };
        await proxy.LaunchGroupPurchase(Ctx.RoleData.id, tbl.Id);
        Ctx.Emit(CachePath.videoGroupPurchaseData);

    }
    [Handle("playerVideoGroupPurchase/isCanJoinGroupPurchase")]
    public async Task<bool> IsCanJoinGroupPurchase(long uniqueId)
    {
        if (Data.todayJoin >= Ctx.Config.VideoGroupPurchase.DailyLimit) return false;
        var proxy = SharedManagerFactory.GetProxyServerLevel<VideoGroupPurchaseSharedManager>();
        var data = await proxy.RecentVideoGroupPurchase(Ctx.RoleData.id);
        if (!data.ContainsKey(uniqueId)) return false;
        var rewardId = data[uniqueId].rewardId;
        var count = Data.hasJoinToday.Count(x => x == rewardId);
        GameAssert.Expect(count < 2, 22007);
        return await proxy.IsCanJoin(Ctx.RoleData.id, uniqueId);
    }

    [Handle("playerVideoGroupPurchase/joinGroupPurchase")]
    public async Task JoinGroupPurchase(long uniqueId)
    {
        GameAssert.Expect(Data.todayJoin < Ctx.Config.VideoGroupPurchase.DailyLimit, 22004);
        // 考虑到看广告需要时间，不做人数检测
        var proxy = SharedManagerFactory.GetProxyServerLevel<VideoGroupPurchaseSharedManager>();
        var data = await proxy.RecentVideoGroupPurchase(Ctx.RoleData.id);
        var rewardId = data[uniqueId].rewardId;
        Data = Data with
        {
            todayJoin = Data.todayJoin + 1,
            hasJoinToday = Data.hasJoinToday.Add(rewardId)
        };
        await proxy.JoinGroupPurchase(Ctx.RoleData.id, uniqueId);
        Ctx.Emit(CachePath.videoGroupPurchaseData);
    }

    [Handle("playerVideoGroupPurchase/recentVideoGroupPurchase")]
    public async Task<ImmutableDictionary<long, VideoGroupPurchase>> RecentVideoGroupPurchase()
    {
        var proxy = SharedManagerFactory.GetProxyServerLevel<VideoGroupPurchaseSharedManager>();
        return await proxy.RecentVideoGroupPurchase(Ctx.RoleData.id);
    }
}