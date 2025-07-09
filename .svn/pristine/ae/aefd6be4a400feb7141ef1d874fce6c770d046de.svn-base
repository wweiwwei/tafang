using System.Collections.Immutable;

namespace GamePlay;

public record Sprite(
    int id,
    int rank,
    long exp
)
{

    public MountTbl Tbl(PlayerDataManager Ctx)
    {
        return Ctx.Table.MountTblMap[id];
    }
    public bool CanUprank(PlayerDataManager Ctx)
    {
        var cost = UprankCost(Ctx);
        if (cost != null)
            return !IsMaxRank(Ctx) && exp >= cost;
        else
            return false;
    }
    public bool IsMaxRank(PlayerDataManager Ctx)
    {
        return rank >= Ctx.Table.MountRankTblList.Length;
    }

    public long UprankCost(PlayerDataManager Ctx)
    {
        var tbl = Ctx.Table.MountRankTblList.FirstOrDefault(t => t.Level == rank);
        if (tbl != null)
            return tbl.Require;
        else return 0;
    }



};