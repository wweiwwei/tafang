using System.Collections.Immutable;
using Newtonsoft.Json.Linq;

namespace GamePlay;

public class PlayerSkinManager : AbstractManager<PlayerSkinData>, IBaseManager
{
    public PlayerSkinManager(JToken saveData, PlayerDataManager ctx) : base(saveData, ctx)
    {
    }

    public override void DailyRefresh()
    {

    }

    public override void InitData()
    {
        if (Data.current == 0)
        {
            var t = Ctx.Table.PlayerSkinTblList.First(t => t.BaseMount == 1);
            Data = Data with { storage = [t.Id], current = t.Id };
        }
    }

    [Update("skinStorage")]
    public ImmutableArray<int> SkinStorage()
    {
        return Data.storage;
    }

    [Update("skinCurrent")]
    public int SkinCurrent()
    {
        return Data.current;
    }

    public void AddSkin(int id)
    {
        if (Data.storage.Contains(id)) return;
        Data = Data with { storage = Data.storage.Add(id) };
        Ctx.Emit(CachePath.skinStorage);
    }

    [Handle("skin/changeSkin")]
    public void ChangeSkin(int id)
    {
        GameAssert.Must(Data.storage.Contains(id), "skin not exist");
        Data = Data with { current = id };
        Ctx.Emit(CachePath.skinCurrent);
    }

}