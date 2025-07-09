using System.Collections.Immutable;
using System.Reflection;
using Newtonsoft.Json.Linq;

namespace GamePlay;

public partial class PlayerDataManager : IPlayerDataManager
{
    public DBPlayerRoleData RoleData;
    public DBPlayerInfo PlayerInfo;
    public TableData Table;
    public TableConfigData Config;
    public TableIndexData Index;
    public IPlayerGrainRemote Remote;
    public PlayerDataManager(DBPlayerRoleData roleData, DBPlayerInfo playerInfo)
    {
        CacheHandler = new CacheHandler(this);
        RequestHandler = new RequestHandler(this);
        Table = GTable.Ins;
        Config = GConfig.Ins;
        Index = GIndex.Ins;
        RoleData = roleData;
        PlayerInfo = playerInfo;
        var saveData = JsonUtils.ParseJToken(roleData.data);
        ManagerFields.ForEach(f =>
        {
            var m = Activator.CreateInstance(f.FieldType, saveData, this)!;
            f.SetValue(this, m);
            Managers.Add((IBaseManager)m);
        });
    }


    public List<IBaseManager> Managers = new();

    private bool _hasInit = false;

    public bool HasInited() => _hasInit;
    public void Init()
    {
        Managers.ForEach(m =>
        {
            m.InitData();
        });
        Managers.ForEach(m =>
        {
            m.PostInit();
        });
        TryRefreshDaily();
        OnTick();
        _hasInit = true;
    }

    public long Now()
    {
        return DateUtils.Now() + TimeManager.Offset();
    }

    public void OnTick()
    {
        Table = GTable.Ins;
        Config = GConfig.Ins;
        Index = GIndex.Ins;
        TryRefreshDaily();
        Managers.ForEach(m => m.Tick());
    }

    private void TryRefreshDaily()
    {
        if (DateUtils.IsNextDay(Now(), DailyManager.GetDayStamp()))
        {
            DailyManager.SetDayStamp(Now());
            Managers.ForEach(m =>
            {
                m.DailyRefresh();
            });
        }
    }

    public string SaveDataJson()
    {
        if (GMManager.Clear)
        {
            return "{}";
        }
        var dic = new Dictionary<string, object>();
        foreach (var manager in Managers)
        {
            dic[manager.GetKeyName()] = manager.GetSaveData();
        }
        return JsonUtils.Stringify(dic);
    }

    public void Emit(UpdateKey path)
    {
        if (!_hasInit) return;
        _refreshDic[path.Path] = ImmutableHashSet<dynamic>.Empty;
    }

    public void EmitMany(PartialUpdateKey path, IEnumerable<int> keySet)
    {
        if (!_hasInit) return;
        if (!_refreshDic.ContainsKey(path.Path))
        {
            _refreshDic[path.Path] = keySet.Select(t => (dynamic)t).ToImmutableHashSet();
        }
        else
        {
            _refreshDic[path.Path] = _refreshDic[path.Path].Union(keySet.Select(t => (dynamic)t));
        }
    }

    public void EmitMany(PartialUpdateKey path, IEnumerable<long> keySet)
    {
        if (!_hasInit) return;
        if (!_refreshDic.ContainsKey(path.Path))
        {
            _refreshDic[path.Path] = keySet.Select(t => (dynamic)t).ToImmutableHashSet();
        }
        else
        {
            _refreshDic[path.Path] = _refreshDic[path.Path].Union(keySet.Select(t => (dynamic)t));
        }
    }

    public void EmitMany(PartialUpdateKey path, IEnumerable<string> keySet)
    {
        if (!_hasInit) return;
        if (!_refreshDic.ContainsKey(path.Path))
        {
            _refreshDic[path.Path] = keySet.Select(t => (dynamic)t).ToImmutableHashSet();
        }
        else
        {
            _refreshDic[path.Path] = _refreshDic[path.Path].Union(keySet);
        }
    }

    public void Emit(PartialUpdateKey path, dynamic key)
    {
        if (!_hasInit) return;
        if (!_refreshDic.ContainsKey(path.Path))
        {
            _refreshDic[path.Path] = ImmutableHashSet<dynamic>.Empty.Add(key);
        }
        else
        {
            _refreshDic[path.Path] = _refreshDic[path.Path].Add(key);
        }
    }

    public void EmitRaw(string p)
    {
        if (!_hasInit) return;
        _refreshDic[p] = ImmutableHashSet<object>.Empty;
    }

    public async Task<ClientResponseMessage> ClientRequest(ClientRequestMessage msg)
    {
        Managers.ForEach(m => m.BackUp());
        try
        {
            var res = await _clientRequest(msg.path, msg.param);
            var responseData = new ClientResponseMessage(msg.requestId, GameErrorInfo.Ok, res);
            return responseData;
        }
        catch (GameOrdinaryException e)
        {
            Managers.ForEach(m => m.RollBack());
            var tbl = Table.ServerLangTblMap.GetValueOrDefault(e.ErrCode);
            var info = new GameErrorInfo(e.ErrCode, LangUtils.GetText(tbl != null ? tbl.ConfigPath : $"err{e.ErrCode}", e.ExtraKey, "zh_chs"));
            var responseData = new ClientResponseMessage(msg.requestId, info, null);
            return responseData;
        }
        catch (GameSharedManagerRequestException e)
        {
            var responseData = new ClientResponseMessage(msg.requestId, e.gameErrorInfo, null);
            return responseData;
        }
        catch (Exception e)
        {
            Remote.GameLinkErrorLog(
                ex: e,
                e: "RequestError",
                roleId: RoleData.id,
                path: msg.path,
                requestId: msg.requestId,
                errCode: 500
            );
            var tbl = Table.ServerLangTblMap[500];
            var info = new GameErrorInfo(500, tbl.Zh_chs);
            var responseData = new ClientResponseMessage(msg.requestId, info, null);
            return responseData;
        }
    }

    public async Task<dynamic?> _clientRequest(string path, JObject? param)
    {
        Table = GTable.Ins;
        Config = GConfig.Ins;
        Index = GIndex.Ins;
        TryRefreshDaily();
        return await RequestHandler.RequestHandle(path, param);
    }

    private static async Task<T> GetResultAsync<T>(Task<T> task)
    {
        return await task;
    }

    private Dictionary<string, ImmutableHashSet<dynamic>> _refreshDic = new();

    public List<INotifyMessage> RefreshCache(bool partial)
    {
        var res = new List<INotifyMessage>();
        foreach (var kv in _refreshDic)
        {
            var path = kv.Key;
            var keySet = kv.Value;
            res.Add(CacheHandler.CacheHandle(path, partial, keySet));
        }
        _refreshDic.Clear();
        return res;
    }

    public Dictionary<string, object?> GetPlayerState()
    {
        var res = CacheRoute.Keys.Select(p =>
        {
            var obj = CacheHandler.CacheHandle(p, false, ImmutableHashSet<object>.Empty);
            return (p, obj.data);
        }).ToDictionary(
            p => p.p,
            p => p.data
        );
        return res;
    }

    public int GetPlayerLevel()
    {
        return PlayerManager.Level();
    }
    public void SetRemote(IPlayerGrainRemote remote)
    {
        Remote = remote;
    }
    public void SetPlayerOrder(List<DBPlayerOrder> list)
    {
        ChargeManager.OrderCache = list;
        Emit(CachePath.charge);
    }
    public void SetEmail(ImmutableDictionary<long, EmailInfo> email)
    {
        PlayerEmailManager.EmailCache = email;
        Emit(CachePath.email);
    }
    public void RefreshEmail()
    {
        Emit(CachePath.email);
    }
    private readonly CacheHandler CacheHandler;
    private readonly RequestHandler RequestHandler;

    public static SortedDictionary<string, GameRequestRouteInfo> RequestRoute = new();
    public static SortedDictionary<string, GameCacheRouteInfo> CacheRoute = new();
    public static List<FieldInfo> ManagerFields = new();

    static PlayerDataManager()
    {
        var type = typeof(PlayerDataManager);
        ManagerFields = type.GetFields()
        .Where(f => f.FieldType.GetInterface("IBaseManager") != null)
        .ToList();
        ManagerFields.ForEach(f =>
        {
            var managerType = f.FieldType;
            managerType.GetMethods()
            .ToList()
            .ForEach(m =>
            {
                var attr = m.GetCustomAttribute<Handle>();
                if (attr != null)
                {
                    var path = attr.Path;
                    if (RequestRoute.ContainsKey(path))
                    {
                        throw new Exception($"path {path} be register more than once");
                    }
                    RequestRoute[path] = new GameRequestRouteInfo(path, f, m);
                }
            });
        });
        var cacheKeyDic = typeof(CachePath).GetFields().ToDictionary(f => f.Name, f => f.FieldType == typeof(PartialUpdateKey));
        ManagerFields.ForEach(f =>
        {
            var managerType = f.FieldType;
            managerType.GetMethods()
            .ToList()
            .ForEach(m =>
            {
                var attr = m.GetCustomAttribute<Update>();
                if (attr != null)
                {
                    var path = attr.Path;
                    if (CacheRoute.ContainsKey(path))
                    {
                        throw new Exception($"path {path} be register more than once");
                    }
                    CacheRoute[path] = new GameCacheRouteInfo(path, f, m, false);
                    if (!cacheKeyDic.ContainsKey(path))
                    {
                        throw new Exception($"path {path} not declare in CachePath");
                    }
                    if (cacheKeyDic[path])
                    {
                        throw new Exception($"path {path} register as Update route, but in CachePath is PartialUpdate");
                    }
                }
                var attr2 = m.GetCustomAttribute<PartialUpdate>();
                if (attr2 != null)
                {
                    var path = attr2.Path;
                    if (CacheRoute.ContainsKey(path))
                    {
                        throw new Exception($"path {path} be register more than once");
                    }
                    CacheRoute[path] = new GameCacheRouteInfo(path, f, m, true);
                    if (!cacheKeyDic.ContainsKey(path))
                    {
                        throw new Exception($"path {path} not declare in CachePath");
                    }
                    if (!cacheKeyDic[path])
                    {
                        throw new Exception($"path {path} register as PartialUpdate route, but in CachePath is Update");
                    }
                }
            });
        });
        // 路由注册检查，看是否有忘记注册的key
        foreach (var k in cacheKeyDic.Keys)
        {
            if (!CacheRoute.ContainsKey(k))
            {
                throw new Exception($"path {k} Declare in CachePath, but not register as a route");
            }
        }
    }
}

public class GameRequestRouteInfo
{
    public string Path;
    public FieldInfo ManagerField;
    public MethodInfo HandlerMethod;

    public GameRequestRouteInfo(string path, FieldInfo managerField, MethodInfo handlerMethod)
    {
        Path = path;
        ManagerField = managerField;
        HandlerMethod = handlerMethod;
    }
}

public class GameCacheRouteInfo
{
    public string Path;
    public FieldInfo ManagerField;
    public MethodInfo HandlerMethod;
    public bool Partial;

    public GameCacheRouteInfo(string path, FieldInfo managerField, MethodInfo handlerMethod, bool partial)
    {
        Path = path;
        ManagerField = managerField;
        HandlerMethod = handlerMethod;
        Partial = partial;
    }

}
