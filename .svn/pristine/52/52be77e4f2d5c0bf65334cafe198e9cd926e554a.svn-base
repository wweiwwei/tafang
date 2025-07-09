
using System.Collections;
using System.Collections.Immutable;

namespace GamePlay;

public abstract class AbstractSharedManager<T> : IGameSharedManager where T : class, new()
{
    protected T Data;
    public IGameSharedGrainRemote Remote;
    public abstract SharedManagerConfig GetConfig();
    public string Key;

    public AbstractSharedManager()
    {

    }
    public AbstractSharedManager(string key, string? data)
    {
        Key = key;
        var config = GetConfig();
        if (!config.NeedSave || data == null || data.Length == 0)
        {
            Data = new T();
        }
        else
        {
            Data = JsonUtils.Parse<T>(data);
        }
    }

    public async Task<(GameErrorInfo, object?)> Handle(string method, object[] param)
    {
        var t = GetType();
        var path = $"{t.Name}/{method}";

        // 清空待广播的数据
        msgList = new();
        try
        {
            Remote.SharedDataLog(
                area_code: GameRemoteCenter.AreaCode,
                event_name: "request",
                log_data: JsonUtils.Stringify(param),
                key: Key,
                request_path: path,
                err_code: 0,
                time_cost: 0);
            var m = t.GetMethod(method)!;
            dynamic task = m.Invoke(this, param)!;
            object? o = null;
            var genericArguments = task.GetType().GetGenericArguments();
            if (genericArguments.Length == 0 || genericArguments[0].Name == "VoidTaskResult")
            {
                await task;
            }
            else
            {
                o = await task;
            }
            Remote.SharedDataLog(
                area_code: GameRemoteCenter.AreaCode,
                event_name: "response",
                log_data: JsonUtils.Stringify(o),
                key: Key,
                request_path: path,
                err_code: 0,
                time_cost: 0);
            await BeginBroadcast();
            return (GameErrorInfo.Ok, o);
        }
        catch (GameOrdinaryException e)
        {
            var tbl = GTable.Ins.ServerLangTblMap.GetValueOrDefault(e.ErrCode);
            var info = new GameErrorInfo(e.ErrCode, LangUtils.GetText(tbl != null ? tbl.ConfigPath : $"err{e.ErrCode}", e.ExtraKey, "zh_chs"));
            Remote.SharedDataLog(
                area_code: GameRemoteCenter.AreaCode,
                event_name: "response",
                log_data: info.msg,
                key: Key,
                request_path: path,
                err_code: info.code,
                time_cost: 0);
            return (info, null);
        }
        catch (Exception e)
        {
            Remote.SharedDataErrorLog(
            ex: e,
            area_code: GameRemoteCenter.AreaCode,
            event_name: "handleError",
            log_data: "",
            key: Key, request_path: path,
            err_code: 500,
            time_cost: 0);
            var tbl = GTable.Ins.ServerLangTblMap[500];
            var info = new GameErrorInfo(500, tbl.Zh_chs);
            return (info, null);
        }
    }

    public abstract Task Init();

    public abstract Task OnDeactive();

    public virtual Task OnTick()
    {
        return Task.CompletedTask;
    }

    public string SaveDataJson()
    {
        return JsonUtils.Stringify(Data);
    }

    public void SetRemote(IGameSharedGrainRemote remote)
    {
        Remote = remote;
    }

    /** 全部更新（全类型可用）,数据类型不限制 */
    protected void EmitReplaceForAllPlayer(SharedDataKey key, object data)
    {
        var msg = new GameSharedDataMessage(key.Path, data, "replace");
        msgList.Add(new BroadcastInfo()
        {
            msg = msg,
            isBroadcastAll = true,
            roleId = null,
        });
    }

    /** 追加数据（使用于列表类型）,数据类型是一个列表 */
    protected void EmitAppendForAllPlayer(SharedDataKey key, ICollection list)
    {
        var msg = new GameSharedDataMessage(key.Path, list, "append");
        msgList.Add(new BroadcastInfo()
        {
            msg = msg,
            isBroadcastAll = true,
            roleId = null,
        });
    }

    /** 更新某个key（使用于字典类型）,数据类型是一个字典 */
    protected void EmitKeyUpdateForAllPlayer(SharedDataKey key, IDictionary dic)
    {
        var msg = new GameSharedDataMessage(key.Path, dic, "keyUpdate");
        msgList.Add(new BroadcastInfo()
        {
            msg = msg,
            isBroadcastAll = true,
            roleId = null,
        });
    }

    /** 删除某些key（使用于字典类型）,数据类型是一个列表，存放key的列表  */
    protected void EmitkeyDelForAllPlayer(SharedDataKey key, ICollection list)
    {
        var msg = new GameSharedDataMessage(key.Path, list, "keyDel");
        msgList.Add(new BroadcastInfo()
        {
            msg = msg,
            isBroadcastAll = true,
            roleId = null,
        });
    }

    /** 全部更新（全类型可用）,数据类型不限制 */
    protected void EmitReplaceForTargetPlayer(SharedDataKey key, object data, ImmutableArray<long> roleId)
    {
        var msg = new GameSharedDataMessage(key.Path, data, "replace");
        msgList.Add(new BroadcastInfo()
        {
            msg = msg,
            isBroadcastAll = false,
            roleId = roleId,
        });
    }

    /** 追加数据（使用于列表类型）,数据类型是一个列表 */
    protected void EmitAppendForTargetPlayer(SharedDataKey key, ICollection list, ImmutableArray<long> roleId)
    {
        var msg = new GameSharedDataMessage(key.Path, list, "append");
        msgList.Add(new BroadcastInfo()
        {
            msg = msg,
            isBroadcastAll = false,
            roleId = roleId,
        });
    }

    /** 更新某个key（使用于字典类型）,数据类型是一个字典 */
    protected void EmitKeyUpdateForTargetPlayer(SharedDataKey key, IDictionary dic, ImmutableArray<long> roleId)
    {
        var msg = new GameSharedDataMessage(key.Path, dic, "keyUpdate");
        msgList.Add(new BroadcastInfo()
        {
            msg = msg,
            isBroadcastAll = false,
            roleId = roleId,
        });
    }

    /** 删除某些key（使用于字典类型）,数据类型是一个列表，存放key的列表  */
    protected void EmitkeyDelForTargetPlayer(SharedDataKey key, ICollection list, ImmutableArray<long> roleId)
    {
        var msg = new GameSharedDataMessage(key.Path, list, "keyDel");
        msgList.Add(new BroadcastInfo()
        {
            msg = msg,
            isBroadcastAll = false,
            roleId = roleId,
        });

    }

    private List<BroadcastInfo> msgList = new();

    /** 开始更新 */
    protected async Task BeginBroadcast()
    {
        for (var i = 0; i < msgList.Count; i++)
        {
            var msg = JsonUtils.Stringify(msgList[i].msg);
            Remote.SharedDataLog(
                area_code: GameRemoteCenter.AreaCode,
                event_name: msgList[i].isBroadcastAll ? "broadcastAll" : "broadcastTarget",
                log_data: msg,
                key: Key,
                request_path: msgList[i].msg.path,
                err_code: 0,
                time_cost: 0);
            var enc = Base64Utils.Encode(msg);
            if (msgList[i].isBroadcastAll)
            {
                await GameRemoteCenter.BroadCastAll(enc);
            }
            else
            {
                await GameRemoteCenter.BroadCastForTargetPlayer(enc, msgList[i].roleId!.Value);
            }
        }

    }

    struct BroadcastInfo
    {
        required public GameSharedDataMessage msg;
        required public bool isBroadcastAll;
        required public ImmutableArray<long>? roleId;
    }
}

