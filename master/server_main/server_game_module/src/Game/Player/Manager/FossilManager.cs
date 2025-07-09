using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace GamePlay;

public class FossilManager : AbstractManager<FossilData>, IBaseManager
{
    public FossilManager(JToken saveData, PlayerDataManager ctx) : base(saveData, ctx)
    {
    }

    public override void DailyRefresh()
    {

    }

    public override void InitData()
    {
        if (Data.fossilFormation.IsEmpty)
        {
            int[] formation = new int[6];
            Array.Fill(formation, -1);
            Data = Data with { fossilFormation = formation.ToImmutableArray() };
        }
    }

    [Update("fossilData")]
    public Dictionary<string, object> InitFossil()
    {
        return new Dictionary<string, object>()
        {
            ["fossilStar"] = Data.fossilStar,
            ["fossilFormation"] = Data.fossilFormation
        };
    }

    [Handle("fossil/setStar")]
    public void SetStar(int id)
    {
        GameAssert.Must(Ctx.Table.FossilComboTblList.Any(t => t.ItemId == id) || id == -1, $"id:{id} is not a fossil star");
        GameAssert.Must(id == -1 || Ctx.KnapsackManager.GetStorageById(id) > 0, $"not owned item id:{id}");
        Data = Data with { fossilStar = id };
        Ctx.Emit(CachePath.fossilData);
    }

    [Handle("fossil/setFormation")]
    public void SetFormation(int[] formation)
    {
        GameAssert.Must(formation.Length == 6, "formation size error");
        GameAssert.Must(formation.All(f => f == -1 || Ctx.Table.FossilTblMap.ContainsKey(f)), $"id error ");
        GameAssert.Must(formation.Where(f => f != -1).All(f => Ctx.KnapsackManager.GetStorageById(f) > 0), $"not owned item ");
        Data = Data with { fossilFormation = formation.ToImmutableArray() };
        Ctx.Emit(CachePath.fossilData);
    }

    [Handle("fossil/sellItem")]
    public ImmutableArray<Item> SellItem(Item item)
    {
        GameAssert.Must(Ctx.Table.ItemTblMap.ContainsKey(item.id), $"id:{item.id} is not exist");
        GameAssert.Must(item.id == -1 || Ctx.KnapsackManager.GetStorageById(item.id) > 0, $"not owned item id:{item.id}");
        Ctx.KnapsackManager.SubItem(item);
        var price = Ctx.Table.FossilTblMap[item.id].Price;
        var reward = Ctx.KnapsackManager.AddItem(new Item((int)price[0], price[1]));
        return reward;
    }
}
