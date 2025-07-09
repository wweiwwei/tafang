namespace GamePlay;

public record PlayerSkill(
    int id,
    int level,
    int exp
)
{
    public bool CanUpgrade(PlayerDataManager Ctx)
    {
        GameAssert.Expect(!IsMaxLevel(Ctx), 500);
        var tbl = Ctx.Table.PlayerSkillTblMap[id];
        var quality = tbl.Quality;
        var cost = Ctx.Table.PlayerSkillLevelTblList.FirstOrDefault(t => t.Level == level);
        if (cost != null)
            return exp >= cost.Require[quality - 1];
        else return false;
    }
    public bool IsMaxLevel(PlayerDataManager Ctx)
    {
        return level > Ctx.Table.PlayerSkillLevelTblList.Length;
    }
    public int UpgradeCost(PlayerDataManager Ctx)
    {
        var quality = Ctx.Table.PlayerSkillTblMap[id].Quality;
        var tbl = Ctx.Table.PlayerSkillLevelTblList.FirstOrDefault(t => t.Level == level);
        if (tbl != null)
            return tbl.Require[quality - 1];
        else return 0;
    }
};