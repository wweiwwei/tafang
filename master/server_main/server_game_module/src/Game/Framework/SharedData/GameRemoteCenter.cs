using System.Collections.Immutable;

namespace GamePlay;

public static class GameRemoteCenter
{

    private static IServerToGameModuleApi _api;

    // 反射调用
    private static void SetServerToGameModuleApi(IServerToGameModuleApi api)
    {
        _api = api;
    }
    // 反射调用
    private static IGameModuleToServerApi GetGameModuleToServerApi()
    {
        return new GameModuleToServerApi();
    }

    /** 服务器列表 */
    public static ImmutableArray<DBGameServer> GetServerList()
    {
        return _api.GetServerList();
    }
    /** 包信息 */
    public static ImmutableDictionary<string, DBPackageInfo> GetPackageInfoMap()
    {
        return _api.GetPackageInfoMap();
    }
    /** 发送邮件 */
    public static async Task SendEmail(List<DBEmail> emails)
    {
        await _api.SendEmail(emails);
    }
    /** 全服广播 */
    public static async Task BroadCastAll(string msg)
    {
        await _api.GetBroadcastGrain().SendAll(msg);
    }
    /** 获取共享数据的管理grain */
    public static IGameSharedGrain GetSharedGrain(string key)
    {
        return _api.GetSharedGrain(key);
    }
    /** 广播到特定的玩家 */
    public static async Task BroadCastForTargetPlayer(string msg, ImmutableArray<long> roleId)
    {
        await _api.GetBroadcastGrain().Send(roleId, msg);
    }
    /** 分区编码 */
    public static string AreaCode => _api.AreaCode;

}

class GameModuleToServerApi : IGameModuleToServerApi
{
    public IPlayerDataManager CreatePlayerDataManager(DBPlayerRoleData roleData, DBPlayerInfo playerInfo)
    {
        return new PlayerDataManager(roleData, playerInfo);
    }

    public IGameSharedManager CreateSharedManager(string key, string? data)
    {
        return SharedManagerFactory.CreateSharedManager(key, data);
    }

    public SharedManagerConfig GetGameSharedManagerConfig(string key)
    {
        return SharedManagerFactory.GetConfig(key);
    }

    public void LoadTable(string data)
    {
        GTable.Load(data);
    }
}