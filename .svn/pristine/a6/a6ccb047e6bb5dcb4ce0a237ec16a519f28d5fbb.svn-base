using System.Collections.Immutable;
using Newtonsoft.Json.Linq;

namespace GamePlay;

public class PlayerMountManager : AbstractManager<PlayerMountData>, IBaseManager
{
    public PlayerMountManager(JToken saveData, PlayerDataManager ctx) : base(saveData, ctx)
    {
    }

    public override void DailyRefresh()
    {

    }

    public override void InitData()
    {
        if (Data.current == 0)
        {
            var t = Ctx.Table.PlayerMountTblList.First(t => t.BaseMount == 1);
            Data = Data with { storage = [t.Id], current = t.Id };
        }
    }

    [Update("mountStorage")]
    public ImmutableArray<int> MountStorage()
    {
        return Data.storage;
    }

    [Update("mountCurrent")]
    public int MountCurrent()
    {
        return Data.current;
    }

    public void AddMount(int id)
    {
        if (Data.storage.Contains(id)) return;
        Data = Data with { storage = Data.storage.Add(id) };
        Ctx.Emit(CachePath.mountStorage);
    }
    [Handle("mount/changeMount")]
    public void ChangeMount(int id)
    {
        GameAssert.Must(Data.storage.Contains(id), "mount not exist");
        Data = Data with { current = id };
        Ctx.Emit(CachePath.mountCurrent);
    }

}