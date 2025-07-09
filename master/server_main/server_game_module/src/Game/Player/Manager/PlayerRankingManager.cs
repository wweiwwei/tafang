using System.Collections.Immutable;
using Newtonsoft.Json.Linq;

namespace GamePlay;

public class PlayerRankingManager : AbstractManager<PlayerRankingData>, IBaseManager
{
    public PlayerRankingManager(JToken saveData, PlayerDataManager ctx) : base(saveData, ctx)
    {
    }

    public override void DailyRefresh()
    {

    }

    public override void InitData()
    {

    }
    // 这个值一般不会发生变化，缓存起来
    private long _serverStartTimeCache = -1L;
    /** 获取开服时间 */
    public long ServerStartTime()
    {
        if (_serverStartTimeCache > 0) return _serverStartTimeCache;
        var data = GameRemoteCenter.GetServerList().First(x => x.serverCode == Ctx.RoleData.serverCode);
        var res = new DateTimeOffset(data.startStamp).ToUnixTimeMilliseconds();
        _serverStartTimeCache = res;
        return _serverStartTimeCache;
    }

    [Handle("ranking/towerRanking")]
    public async Task<ImmutableArray<ArenaRoleRankInfo>> TowerRanking()
    {
        var proxy = SharedManagerFactory.GetProxyServerLevel<RankingSharedManager>();
        return await proxy.Top100(0);
    }

    [Handle("ranking/stageRanking")]
    public async Task<ImmutableArray<ArenaRoleRankInfo>> StageRanking()
    {
        var proxy = SharedManagerFactory.GetProxyServerLevel<RankingSharedManager>();
        return await proxy.Top100(1);
    }

    // [Handle("ranking/captainRanking")]
    // public async Task<ImmutableArray<ArenaRoleRankInfo>> CaptainRanking()
    // {
    //     var proxy = SharedManagerFactory.GetProxyServerLevel<RankingSharedManager>();
    //     return await proxy.Top100(2);
    // }

    // [Handle("ranking/cardPoolRanking")]
    // public async Task<ImmutableArray<ArenaRoleRankInfo>> CardPoolRanking()
    // {
    //     var proxy = SharedManagerFactory.GetProxyServerLevel<RankingSharedManager>();
    //     return await proxy.Top100(3);
    // }

    // [Handle("ranking/equipmentCardPoolRanking")]
    // public async Task<ImmutableArray<ArenaRoleRankInfo>> EquipmentCardPoolRanking()
    // {
    //     var proxy = SharedManagerFactory.GetProxyServerLevel<RankingSharedManager>();
    //     return await proxy.Top100(4);
    // }


    [Handle("ranking/rankingByIndex")]
    public async Task<ImmutableArray<ArenaRoleRankInfo>> RankingByIndex(int index)
    {
        var proxy = SharedManagerFactory.GetProxyServerLevel<RankingSharedManager>();
        return await proxy.Top100(index);
    }
    /** 处理上报逻辑 */
    public void Report(int missionKind)
    {
        if (missionKind == 18)
        {
            // 爬塔
            var proxy = SharedManagerFactory.GetProxyServerLevel<RankingSharedManager>();
            proxy.UpdateRanking(0, Ctx.RoleData.id, Ctx.TowerManager.TowerLevel);
        }
        // else if (missionKind == 1)
        // {
        //     // 船长室
        //     var proxy = SharedManagerFactory.GetProxyServerLevel<RankingSharedManager>();
        //     proxy.UpdateRanking(2, Ctx.RoleData.id, Ctx.FacilityManager.GetCaptain().rank);
        // }
        else if (missionKind == 4)
        {
            // 关卡
            var proxy = SharedManagerFactory.GetProxyServerLevel<RankingSharedManager>();
            var stage = Ctx.StageManager.AllStage()[1];
            proxy.UpdateRanking(1, Ctx.RoleData.id, stage.clear ? stage.stageIndex : stage.stageIndex - 1);
        }
        // else if (missionKind == 19)
        // {
        //     // 抽卡 todo 改成上报活动开始以来的抽卡数
        //     var proxy = SharedManagerFactory.GetProxyServerLevel<RankingSharedManager>();
        //     proxy.UpdateRanking(3, Ctx.RoleData.id, Ctx.ImpactManager.heroTotal);
        // }
        // else if (missionKind == 20)
        // {
        //     // 装备抽卡 todo 改成上报活动开始以来的抽卡数
        //     var proxy = SharedManagerFactory.GetProxyServerLevel<RankingSharedManager>();
        //     proxy.UpdateRanking(4, Ctx.RoleData.id, Ctx.ImpactManager.equipTotal);
        // }
    }

    public void ReportDamage(int kind)
    {
        if (kind == 5)
        {
            // 单体伤害
            var proxy = SharedManagerFactory.GetProxyServerLevel<RankingSharedManager>();
            proxy.UpdateRanking(5, Ctx.RoleData.id, Ctx.DamageManager.damage);
        }
        else if (kind == 6)
        {
            // 群体伤害
            var proxy = SharedManagerFactory.GetProxyServerLevel<RankingSharedManager>();
            proxy.UpdateRanking(6, Ctx.RoleData.id, Ctx.DamageManager.mulDamage);
        }
    }
    public void ReportBanquet()
    {
        var proxy = SharedManagerFactory.GetProxyServerLevel<RankingSharedManager>();
        proxy.UpdateRanking(7, Ctx.RoleData.id, Ctx.BanquetManager.Point);
    }
}
