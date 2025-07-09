using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using Orleans;

namespace GamePlay;

public class PlayerArenaManager : AbstractManager<PlayerArenaData>, IBaseManager
{
    public PlayerArenaManager(JToken saveData, PlayerDataManager ctx) : base(saveData, ctx)
    {
    }

    public override void DailyRefresh()
    {
        Data = Data with { todayRefresh = 0, todayBuy = 0, challenge = ImmutableArray<long>.Empty };
        var storage = Ctx.KnapsackManager.GetStorageById(GameConstant.ChallengeTicket);
        if (storage < 5) Ctx.KnapsackManager.AddItem(new Item(GameConstant.ChallengeTicket, 5 - storage));
    }

    public override void InitData()
    {
    }

    [Handle("arena/info")]
    public async Task<Dictionary<string, object>> Info()
    {
        var info = await Ctx.Remote.GetArenaGrain().Info(Ctx.RoleData.id);
        return new Dictionary<string, object>()
            {
                {"rank", info.rank},
                {"point", info.point},
                {"todayRefresh", Data.todayRefresh},
                {"todayBuy", Data.todayBuy}
            };
    }
    [Handle("arena/top")]
    public async Task<ImmutableArray<ArenaRoleRankInfo>> Top()
    {
        return await Ctx.Remote.GetArenaGrain().Top();
    }
    [Handle("arena/challengeList")]
    public async Task<ImmutableArray<ArenaRoleRankInfo>> ChallengeList()
    {
        if (Data.challenge.Length > 0)
        {
            return await Ctx.Remote.GetArenaGrain().InfoByRoleId(Data.challenge);
        }
        else
        {
            return await RefreshChallengeList(false);
        }
    }
    [Handle("arena/refreshChallengeList")]
    public async Task<ImmutableArray<ArenaRoleRankInfo>> RefreshChallengeList(bool click)
    {
        var list = await Ctx.Remote.GetArenaGrain().ChallengeList(Ctx.RoleData.id);
        Data = Data with { challenge = list.Select(x => x.roleId).ToImmutableArray() };
        if (click) Data = Data with { todayRefresh = Data.todayRefresh + 1 };
        return list;
    }
    [Handle("arena/history")]
    public async Task<ImmutableArray<PlayerArenaHistory>> History()
    {
        var history = await Ctx.Remote.ArenaHistory();
        return history;
    }
    private bool IsNowArenaOpen()
    {
        var timeConfig = Ctx.Config.Arena.OpenTime;
        var dayTime = DateUtils.GetDayTime(Ctx.Now());
        var hour = dayTime / DateUtils.OneHour;
        return hour >= timeConfig[0] - 1 && hour < timeConfig[1];
    }
    [Handle("arena/challenge")]
    public async Task<Dictionary<string, object>> Challenge(long targetRoleId)
    {
        GameAssert.Expect(IsNowArenaOpen(), 18001);
        var (ok, res) = await Ctx.Remote.ArenaChallenge(targetRoleId);
        GameAssert.Must(ok, "challenge error");
        Ctx.KnapsackManager.SubItem(new Item(GameConstant.ChallengeTicket, 1));
        Ctx.MissionManager.UpdateMissionProgress(22, 1);
        return res;
    }
    [Handle("arena/buyTicket")]
    public void buyTicket()
    {
        GameAssert.Expect(IsNowArenaOpen(), 18001);
        Ctx.KnapsackManager.SubItem(new Item(GameConstant.DiamondId, Ctx.Config.Arena.Cost[Data.todayBuy]));
        Ctx.KnapsackManager.AddItem(new Item(GameConstant.ChallengeTicket, 1));
        if (Data.todayBuy < Ctx.Config.Arena.Cost.Length - 1) Data = Data with { todayBuy = Data.todayBuy + 1 };
    }
}
