
using System.Collections.Immutable;

namespace GamePlay;

public class RankingSharedManager : AbstractSharedManager<RankingSharedData>, IServerLevelSharedManager
{
    public readonly static SharedManagerConfig ManagerConfig = new(
        NeedTick: true,
        TickInterval: TimeSpan.FromMinutes(1),
        NeedSave: true,
        SaveInterval: TimeSpan.FromMinutes(1),
        NeedKeepAlive: true
    );
    public RankingSharedManager()
    {

    }
    public RankingSharedManager(string key, string? data) : base(key, data)
    {
    }

    public override SharedManagerConfig GetConfig()
    {
        return ManagerConfig;
    }

    public override Task Init()
    {
        RefreshRank();
        return Task.CompletedTask;
    }

    public override Task OnDeactive()
    {
        return Task.CompletedTask;
    }

    public override async Task OnTick()
    {
        RefreshRank();
        await CheckRankingReward();
    }

    private async Task CheckRankingReward()
    {
        // todo 调整冲榜奖励发放逻辑
        // if (Data.hasSendRankingReward) return;
        // var data = GameRemoteCenter.GetServerList().First(x => x.areaCode == GameRemoteCenter.AreaCode);
        // var beginTime = new DateTimeOffset(data.startStamp).ToUnixTimeMilliseconds();
        // var endTime = beginTime + GConfig.Ins.ImpactRank.LastDay * DateUtils.OneDay;
        // var now = DateUtils.Now();
        // if (now > endTime)
        // {
        //     Data = Data with { hasSendRankingReward = true };
        //     var stageRanking = _rankingCacheFull[1];
        //     var cardPoolRanking = _rankingCacheFull[3];
        //     await SendEmail(stageRanking, GTable.Ins.RankRewardTblList.Where(x => x.Page == 0).ToImmutableArray(), 2005);
        //     await SendEmail(cardPoolRanking, GTable.Ins.RankRewardTblList.Where(x => x.Page == 1).ToImmutableArray(), 2006);
        // }
    }

    private static async Task SendEmail(ImmutableArray<ArenaRoleRankInfo> ranking, ImmutableArray<RankRewardTbl> rewardList, int emailTemplate)
    {
        var emailEndTime = DateTime.UtcNow.AddDays(7);
        var email = ranking.Select(x =>
        {
            var rank = x.rank;
            var tbl = rewardList.FirstOrDefault(t => t.Rank[0] <= rank && t.Rank[1] >= rank);
            if (tbl == null) return null;
            return new DBEmail()
            {
                endTime = emailEndTime,
                roleId = x.roleId,
                param = $"{rank}[p]{string.Join("|", tbl.Reward.Select(t => string.Join(",", t)))}",
                template = emailTemplate
            };
        }).Where(x => x != null);
        await GameRemoteCenter.SendEmail(email.ToList()!);
    }

    private List<ImmutableArray<ArenaRoleRankInfo>> _rankingCacheFull = new();
    private List<ImmutableArray<ArenaRoleRankInfo>> _rankingCacheTop100 = new();
    private void RefreshRank()
    {
        if (!_dirty) return;
        _rankingCacheFull = new List<ImmutableArray<ArenaRoleRankInfo>>
        {
            DicToRankingList(Data.towerRanking),
            DicToRankingList(Data.stageRanking),
            DicToRankingList(Data.captainRanking),
            DicToRankingList(Data.cardPoolRanking),
            DicToRankingList(Data.equipmentCardPoolRanking),
            DicToRankingList(Data.damageRanking),
            DicToRankingList(Data.multipleDamageRanking),
            DicToRankingList(Data.banquetPointRanking)
        };
        _rankingCacheTop100 = _rankingCacheFull.Select(x => x.Take(100).ToImmutableArray()).ToList();
    }

    private static ImmutableArray<ArenaRoleRankInfo> UpdateTop100Ranking(long roleId, long point, ImmutableArray<ArenaRoleRankInfo> ranking)
    {
        if (ranking.Length >= 100 && ranking.Last().point >= point)
        {
            return ranking;
        }
        var dic = ranking.ToDictionary(x => x.roleId, x => x.point);
        dic[roleId] = point;
        return dic.OrderByDescending(x => x.Value).Take(100).Select((x, i) => new ArenaRoleRankInfo(x.Key, i + 1, x.Value)).ToImmutableArray();
    }

    public static ImmutableArray<ArenaRoleRankInfo> DicToRankingList(Dictionary<long, RankingPointInfo> dic)
    {
        var temp = dic.ToList();
        temp.Sort((a, b) =>
        {
            if (b.Value.point > a.Value.point)
            {
                // 分数越高排名越高
                return 1;
            }
            else if (b.Value.point < a.Value.point)
            {
                return -1;
            }
            else if (b.Value.stamp < a.Value.stamp)
            {
                // 时间越早排名越高
                return 1;
            }
            else if (b.Value.stamp > a.Value.stamp)
            {
                return -1;
            }
            else
            {
                return 0;
            }
        });
        return temp.Select((v, i) =>
        {
            return new ArenaRoleRankInfo(roleId: v.Key, rank: i + 1, point: v.Value.point);
        }).ToImmutableArray();
    }

    /** 数据需要刷新 */
    private bool _dirty = true;

    /** 汇报排名 kind 0：爬塔 kind 1: 关卡 kind 2: 船长室 kind 3：卡池 4: 装备卡池 */
    public virtual Task UpdateRanking(int kind, long roleId, long point)
    {
        if (kind == 0)
        {
            Data.towerRanking[roleId] = new(point, DateUtils.Now());
        }
        else if (kind == 1)
        {
            Data.stageRanking[roleId] = new(point, DateUtils.Now());
        }
        else if (kind == 2)
        {
            Data.captainRanking[roleId] = new(point, DateUtils.Now());
        }
        else if (kind == 3)
        {
            Data.cardPoolRanking[roleId] = new(point, DateUtils.Now());
        }
        else if (kind == 4)
        {
            Data.equipmentCardPoolRanking[roleId] = new(point, DateUtils.Now());
        }
        else if (kind == 5)
        {
            Data.damageRanking[roleId] = new(point, DateUtils.Now());
        }
        else if (kind == 6)
        {
            Data.multipleDamageRanking[roleId] = new(point, DateUtils.Now());
        }
        else if (kind == 7)
        {
            Data.banquetPointRanking[roleId] = new(point, DateUtils.Now());
        }
        _rankingCacheTop100[kind] = UpdateTop100Ranking(roleId, point, _rankingCacheTop100[kind]);
        _dirty = true;
        return Task.CompletedTask;
    }
    /** 前100排名 kind 0：爬塔 kind 1: 关卡 kind 2: 船长室 kind 3：卡池  4: 装备卡池 */
    public virtual Task<ImmutableArray<ArenaRoleRankInfo>> Top100(int kind)
    {
        return Task.FromResult(_rankingCacheTop100[kind]);
    }
    /** 获取玩家排名 kind 0：爬塔 kind 1: 关卡 kind 2: 船长室 kind 3：卡池  4: 装备卡池 */
    public virtual Task<int> PlayerRank(int kind, long roleId)
    {
        var index = _rankingCacheFull[kind].IndexWhere(x => x.roleId == roleId);
        if (index == -1)
        {
            return Task.FromResult(-1);
        }
        else
        {
            return Task.FromResult(index + 1);
        }
    }
    public virtual Task<ImmutableArray<ArenaRoleRankInfo>> AllRankData(int kind)
    {
        RefreshRank();
        var res = _rankingCacheFull[kind];
        return Task.FromResult(res);
    }
    public virtual Task ClearRankData(int kind)
    {
        _rankingCacheFull[kind] = new();
        switch (kind)
        {
            case 7:
                Data = Data with
                {
                    banquetPointRanking = new Dictionary<long, RankingPointInfo>()
                };
                break;
            default: break;
        }
        return Task.CompletedTask;
    }
}