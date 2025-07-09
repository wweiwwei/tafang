using System.Collections.Immutable;
using Newtonsoft.Json.Linq;

namespace GamePlay;

public class PlayerPetManager : AbstractManager<PlayerPetData>, IBaseManager
{
    public PlayerPetManager(JToken saveData, PlayerDataManager ctx) : base(saveData, ctx)
    {
    }

    public override void DailyRefresh()
    {

    }

    public override void InitData()
    {
        var newPet = Ctx.Table.PetTblList.ToImmutableDictionary(
            tbl => tbl.Id,
            tbl =>
            {
                if (Data.pet.ContainsKey(tbl.Id))
                {
                    return Data.pet[tbl.Id];
                }
                else
                {
                    return new PlayerPet(tbl.Id, 0, 0);
                }
            }
        );
        Data = Data with { pet = newPet };
        if (Data.formation.IsEmpty)
        {
            for (var i = 1; i < 4; i++)
            {
                Data = Data with { formation = Data.formation.SetItem(i, new int[] { -1, -1, -1, -1, -1 }.ToImmutableArray()) };
            }
            // todo 删除测试代码
            var testList = new int[] { 4002, 4007, 4015, 4016, 4012 };
            testList.ForEach(id =>
            {
                AddPlayerPet(id, 1);
            });
            Data = Data with
            {
                formation = Data.formation.SetItem(1, testList.ToImmutableArray())
            };
        }
    }

    [PartialUpdate("petFormation")]
    public ImmutableDictionary<int, ImmutableArray<int>> PetFormation()
    {
        return Data.formation;
    }

    [PartialUpdate("playerPet")]
    public ImmutableDictionary<int, PlayerPet> AllPet()
    {
        return Data.pet;
    }

    [Update("currentPetFormation")]
    public int CurrentPetFormation() => Data.currentFormation;

    [Handle("playerPet/setFormation")]
    public void SetFormation(int key, int[] formation)
    {
        GameAssert.Must(Data.formation.ContainsKey(key), $"key:{key} is not exist");
        GameAssert.Must(formation.All(id => id == -1 || Data.pet.ContainsKey(id)), "id is not exist");
        GameAssert.Must(formation.Length == 5, "formation size error");
        Data = Data with { formation = Data.formation.SetItem(key, formation.ToImmutableArray()) };
        Ctx.Emit(CachePath.petFormation, key);
    }

    [Handle("playerPet/changeFormation")]
    public void ChangeFormation(int key)
    {
        GameAssert.Must(Data.formation.ContainsKey(key), $"key:{key} is not exist");
        Data = Data with { currentFormation = key };
        Ctx.Emit(CachePath.currentPetFormation);
    }

    [Handle("playerPet/upgradepet")]
    public void Upgradepet(int id)
    {
        var s = Data.pet[id];
        if (s.CanUpgrade(Ctx))
        {
            SubPlayerpet(s.id, s.UpgradeCost(Ctx));
            var newpet = s with { level = s.level + 1 };
            Data = Data with { pet = Data.pet.SetItem(id, newpet) };
            Ctx.Emit(CachePath.playerPet, id);
        }

    }

    [Handle("playerPet/upgradeAllPet")]
    public void UpgradeAllPet()
    {
        while (Data.pet.Values.Any(s => s.CanUpgrade(Ctx)))
        {
            var newPet = Data.pet.Values.Where(s => s.CanUpgrade(Ctx)).ToImmutableDictionary(
                pet => pet.id,
                pet => pet with { level = pet.level + 1, exp = pet.exp - pet.UpgradeCost(Ctx) }
            );
            Data = Data with { pet = Data.pet.SetItems(newPet) };
            Ctx.EmitMany(CachePath.playerPet, newPet.Keys);
        }
    }

    public void AddPlayerPet(int id, int count)
    {
        GameAssert.Must(count >= 0, $"illegal input id:{id} count:{count}");
        if (count == 0) return;
        var s = Data.pet[id];
        var newS = s with { exp = s.exp + count };
        if (s.level == 0)
        {
            newS = newS with { level = 1, exp = newS.exp - 1 };
        }
        Data = Data with { pet = Data.pet.SetItem(id, newS) };
        Ctx.Emit(CachePath.playerPet, id);
    }

    public void SubPlayerpet(int id, int count)
    {
        GameAssert.Must(count >= 0, $"illegal input id:{id} count:{count}");
        if (count == 0) return;
        var s = Data.pet[id];
        var newS = s with { exp = s.exp - count };
        Data = Data with { pet = Data.pet.SetItem(id, newS) };
        Ctx.Emit(CachePath.playerPet, id);
    }

}