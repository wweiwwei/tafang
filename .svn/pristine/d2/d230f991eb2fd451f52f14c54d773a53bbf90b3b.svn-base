using System.Collections.Immutable;
using System.Reflection;
using Castle.DynamicProxy;

namespace GamePlay;

public static class SharedManagerFactory
{

    private readonly static ImmutableArray<(string, SharedManagerConfig, Type)> _allConfig;

    static SharedManagerFactory()
    {
        var a = Assembly.GetExecutingAssembly();
        var types = a.GetTypes().Where(t => !t.Name.StartsWith("AbstractSharedManager") && t.GetInterfaces().Any(i => i.Name == "IGameSharedManager")).ToList();
        _allConfig = types.Select(t =>
        {
            var f = t.GetField("ManagerConfig", BindingFlags.Static | BindingFlags.Public)!;
            return (t.Name, (SharedManagerConfig)f.GetValue(null)!, t);
        }).ToImmutableArray();
    }

    public static SharedManagerConfig GetConfig(string key)
    {
        for (var i = 0; i < _allConfig.Length; i++)
        {
            if (key.Contains(_allConfig[i].Item1))
            {
                return _allConfig[i].Item2;
            }
        }
        throw new Exception($"Unknown SharedManager key {key}");
    }

    public static IGameSharedManager CreateSharedManager(string key, string? data)
    {
        for (var i = 0; i < _allConfig.Length; i++)
        {
            if (key.Contains(_allConfig[i].Item1))
            {
                var t = _allConfig[i].Item3;
                return (IGameSharedManager)Activator.CreateInstance(t, key, data)!;
            }
        }
        throw new Exception($"Unknown SharedManager key {key}");

    }

    private static readonly ProxyGenerator ProxyIns = new();

    public static T GetProxyServerLevel<T>() where T : class, IGameSharedManager, IServerLevelSharedManager, new()
    {
        var t = typeof(T);
        var grain = GameRemoteCenter.GetSharedGrain($"{t.Name}_{GameRemoteCenter.AreaCode}");
        var invocation = new SharedManagerInterceptor(grain);
        var proxy = ProxyIns.CreateClassProxy<T>(invocation);
        return proxy;
    }

    public static T GetProxyRoleLevel<T>(long roleId) where T : class, IGameSharedManager, IRoleLevelSharedManager, new()
    {
        var t = typeof(T);
        var grain = GameRemoteCenter.GetSharedGrain($"{t.Name}_{roleId}");
        var invocation = new SharedManagerInterceptor(grain);
        var proxy = ProxyIns.CreateClassProxy<T>(invocation);
        return proxy;
    }
    public static T GetProxyGroupLevel<T>(string group) where T : class, IGameSharedManager, IGroupLevelSharedManager, new()
    {
        var t = typeof(T);
        var grain = GameRemoteCenter.GetSharedGrain($"{t.Name}_{group}");
        var invocation = new SharedManagerInterceptor(grain);
        var proxy = ProxyIns.CreateClassProxy<T>(invocation);
        return proxy;
    }

}
class SharedManagerInterceptor : IInterceptor
{

    private readonly IGameSharedGrain Grain;
    public SharedManagerInterceptor(IGameSharedGrain grain)
    {
        Grain = grain;
    }
    public void Intercept(IInvocation invocation)
    {
        var m = invocation.Method;
        var c = m.DeclaringType!;
        var args = invocation.Arguments;
        var res = Grain.Handle(m.Name, args);
        Task ret = GameSharedInvocationHandler.Handle($"{c.Name}/{m.Name}", res);
        invocation.ReturnValue = ret;
    }
}