using System.Collections.Immutable;
using Newtonsoft.Json.Linq;

namespace GamePlay;

public class PlayerSkillManager : AbstractManager<PlayerSkillData>, IBaseManager
{
    public PlayerSkillManager(JToken saveData, PlayerDataManager ctx) : base(saveData, ctx)
    {
    }

    public override void DailyRefresh()
    {

    }

    public override void InitData()
    {
        var newSkill = Ctx.Table.PlayerSkillTblList.ToImmutableDictionary(
            tbl => tbl.Id,
            tbl =>
            {
                if (Data.skill.ContainsKey(tbl.Id))
                {
                    return Data.skill[tbl.Id];
                }
                else
                {
                    return new PlayerSkill(tbl.Id, 0, 0);
                }
            }
        );
        Data = Data with { skill = newSkill };
        if (Data.formation.IsEmpty)
        {
            for (var i = 1; i < 4; i++)
            {
                Data = Data with { formation = Data.formation.SetItem(i, new int[] { -1, -1, -1, -1, -1 }.ToImmutableArray()) };
            }
            // todo 删除测试代码
            var testList = new int[] { 3001, 3002, 3003, -1, -1 };
            testList.ForEach(id =>
            {
                if (id > 0)
                {
                    AddPlayerSkill(id, 1);
                }
            });
            Data = Data with
            {
                formation = Data.formation.SetItem(1, testList.ToImmutableArray())
            };
        }

    }

    [PartialUpdate("skillFormation")]
    public ImmutableDictionary<int, ImmutableArray<int>> SkillFormation()
    {
        return Data.formation;
    }

    [PartialUpdate("playerSkill")]
    public ImmutableDictionary<int, PlayerSkill> AllSkill()
    {
        return Data.skill;
    }

    [Update("currentSkillFormation")]
    public int CurrentSkillFormation() => Data.currentFormation;

    [Handle("playerSkill/setFormation")]
    public void SetFormation(int key, int[] formation)
    {
        GameAssert.Must(Data.formation.ContainsKey(key), $"key:{key} is not exist");
        GameAssert.Must(formation.All(id => id == -1 || (Data.skill.ContainsKey(id) && Data.skill[id].level > 0)), "id is not exist or level error");
        GameAssert.Must(formation.Length == 5, "formation size error");
        Data = Data with { formation = Data.formation.SetItem(key, formation.ToImmutableArray()) };
        Ctx.Emit(CachePath.skillFormation, key);
    }

    [Handle("playerSkill/changeFormation")]
    public void ChangeFormation(int key)
    {
        GameAssert.Must(Data.formation.ContainsKey(key), $"key:{key} is not exist");
        Data = Data with { currentFormation = key };
        Ctx.Emit(CachePath.currentSkillFormation);
    }

    [Handle("playerSkill/upgradeSkill")]
    public void UpgradeSkill(int id)
    {
        var s = Data.skill[id];
        if (s.CanUpgrade(Ctx))
        {
            var quality = Ctx.Table.PlayerSkillTblMap[id].Quality;
            var cost = Ctx.Table.PlayerSkillLevelTblList.First(t => t.Level == s.level).Require[quality];
            SubPlayerSkill(s.id, cost);
            var newSkill = s with { level = s.level + 1 };
            Data = Data with { skill = Data.skill.SetItem(id, newSkill) };
            Ctx.Emit(CachePath.playerSkill, id);
        }

    }

    [Handle("playerSkill/upgradeAllSkill")]
    public void UpgradeAllSkill()
    {
        while (Data.skill.Values.Any(s => s.CanUpgrade(Ctx)))
        {
            var newSkill = Data.skill.Values.Where(s => s.CanUpgrade(Ctx)).ToImmutableDictionary(
                skill => skill.id,
                skill => skill with { level = skill.level + 1, exp = skill.exp - skill.UpgradeCost(Ctx) }
            );
            Data = Data with { skill = Data.skill.SetItems(newSkill) };
            Console.WriteLine(newSkill.Keys);
            Ctx.EmitMany(CachePath.playerSkill, newSkill.Keys);
        }
    }

    public void AddPlayerSkill(int id, int count)
    {
        GameAssert.Must(count >= 0, $"illegal input id:{id} count:{count}");
        if (count == 0) return;
        var s = Data.skill[id];
        var newS = s with { exp = s.exp + count };
        if (s.level == 0)
        {
            newS = newS with { level = 1, exp = newS.exp - 1 };
        }
        Data = Data with { skill = Data.skill.SetItem(id, newS) };
        Ctx.Emit(CachePath.playerSkill, id);
    }

    public void SubPlayerSkill(int id, int count)
    {
        GameAssert.Must(count >= 0, $"illegal input id:{id} count:{count}");
        if (count == 0) return;
        var s = Data.skill[id];
        var newS = s with { exp = s.exp - count };
        Data = Data with { skill = Data.skill.SetItem(id, newS) };
        Ctx.Emit(CachePath.playerSkill, id);
    }

}