using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace GamePlay;

public class PlayerFriendManager : AbstractManager<PlayerFriendData>, IBaseManager
{
    public PlayerFriendManager(JToken saveData, PlayerDataManager ctx) : base(saveData, ctx)
    {
    }

    public override void DailyRefresh()
    {
    }

    public override void InitData()
    {
    }

    [Handle("friend/friendState")]
    public async Task<PlayerFriendState> FriendState()
    {
        return await Ctx.Remote.GetPlayerFriendGrain().GetFriendState();
    }


    /** 获取推荐好友列表 */
    [Handle("friend/friendRecommend")]
    public async Task<ImmutableArray<long>> FriendRecommend()
    {
        var state = await FriendState();
        var list = await Ctx.Remote.GetPlayerInfoCacheGrain().FriendRecommend();
        var selfId = Ctx.RoleData.id;
        var filterList = list
            .Where(id => id != selfId
            && !state.friendList.Contains(id)
            && !state.blackList.Contains(id))
            .ToList();
        var rdList = RandomUtils.RandomIndexList(filterList, 5);
        return rdList.Select(index => filterList[index]).ToImmutableArray();
    }

    /** 发送好友申请 */
    [Handle("friend/sendFriendApplication")]
    public async Task SendFriendApplication(long friendId)
    {
        var code = await Ctx.Remote.GetPlayerFriendGrain().SendFriendApplication(friendId);
        GameAssert.Expect(code == 0, code);
    }

    /** 同意好友申请 */
    [Handle("friend/acceptFriendApplication")]
    public async Task AcceptFriendApplication(long friendId)
    {
        var code = await Ctx.Remote.GetPlayerFriendGrain().AcceptFriendApplication(friendId);
        GameAssert.Expect(code == 0, code);
    }

    /** 同意所有好友申请 */
    [Handle("friend/acceptAllFriendApplication")]
    public async Task AcceptAllFriendApplication()
    {
        await Ctx.Remote.GetPlayerFriendGrain().AcceptAllFriendApplication();
    }

    /** 拒绝好友申请 */
    [Handle("friend/rejectFriendApplication")]
    public async Task RejectFriendApplication(long friendId)
    {
        await Ctx.Remote.GetPlayerFriendGrain().RejectFriendApplication(friendId);
    }

    /** 拒绝所有好友申请 */
    [Handle("friend/rejectAllFriendApplication")]
    public async Task RejectAllFriendApplication()
    {
        await Ctx.Remote.GetPlayerFriendGrain().RejectAllFriendApplication();
    }

    /** 搜索玩家 */
    [Handle("friend/searchPlayer")]
    public async Task<ImmutableArray<long>> SearchPlayer(string query)
    {
        return await Ctx.Remote.SearchPlayer(query);
    }

    /** 删除好友 */
    [Handle("friend/deleteFriend")]
    public async Task DeleteFriend(long friendId)
    {
        await Ctx.Remote.GetPlayerFriendGrain().DeleteFriend(friendId);
    }

    /** 获取角色信息列表 */
    [Handle("friend/roleInfo")]
    public async Task<ImmutableDictionary<long, FriendInfo>> RoleInfo(long[] roleIdList)
    {
        // var chunks = roleIdList.Chunk(10);
        // var res = new Dictionary<long, FriendInfo>();
        // for (var i = 0; i < chunks.Count(); i++)
        // {

        // }
        return await Ctx.Remote.GetPlayerInfoCacheGrain().RoleInfo(roleIdList.ToImmutableArray());
    }

    /** 加入黑名单 */
    [Handle("friend/addBlackList")]
    public async Task AddBlackList(long friendId)
    {
        var code = await Ctx.Remote.GetPlayerFriendGrain().AddBlackList(friendId);
        GameAssert.Expect(code == 0, code);
    }

    /** 移除黑名单 */
    [Handle("friend/removeBlackList")]
    public async Task RemoveBlackList(long friendId)
    {
        await Ctx.Remote.GetPlayerFriendGrain().RemoveBlackList(friendId);
    }

    /** 挑战玩家 */
    [Handle("friend/challenge")]
    public async Task<string> Challenge(long friendId)
    {
        return await Ctx.Remote.FriendTeam(friendId);
    }


}

