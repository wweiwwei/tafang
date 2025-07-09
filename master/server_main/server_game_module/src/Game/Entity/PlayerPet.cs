using System.Collections.Immutable;

namespace GamePlay;

public record PlayerPet(
    int id,
    int level,
    int exp
)
{
    public bool CanUpgrade(PlayerDataManager Ctx)
    {
        GameAssert.Expect(!IsMaxLevel(Ctx), 500);
        var tbl = Ctx.Table.PetTblMap[id];
        var quality = tbl.Quality;
        var costTbl = Ctx.Table.PetLevelTblList.FirstOrDefault(t => t.Level == level);
        if (costTbl != null)
            return exp >= costTbl.Require[quality - 1];
        else
            return false;
    }
    public bool IsMaxLevel(PlayerDataManager Ctx)
    {
        return level > Ctx.Table.PetLevelTblList.Length;
    }

    public int UpgradeCost(PlayerDataManager Ctx)
    {
        var quality = Ctx.Table.PetTblMap[id].Quality;
        var tbl = Ctx.Table.PetLevelTblList.FirstOrDefault(t => t.Level == level);
        if (tbl != null)
            return tbl.Require[quality - 1];
        else return 0;
    }
};