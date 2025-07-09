using System.Collections.Immutable;

namespace GamePlay;


public record WarOrder(
    int id,
    /**  是否购买 */
    bool hasBuy,
    /** 已获取的免费奖励 */
    ImmutableArray<int> freeHasGet,
    /** 已获取的付费奖励 */
    ImmutableArray<int> hasGet,
    /** 进度 */
    long progress
)
{
    public WarOrderTbl Tbl(PlayerDataManager Ctx)
    {
        return Ctx.Table.WarOrderTblMap[id];
    }
    public WarOrder InitProgress(PlayerDataManager Ctx)
    {
        // if (hasGet || freeHasGet) return this;
        var tbl = Tbl(Ctx);
        var newProgress = Mission.GetInitProgress(Ctx, tbl.Kind, tbl.Param);
        if (progress >= newProgress) return this;
        return this with { progress = newProgress };
    }
    public WarOrder UpdateWarOrderProgress(int kind, long count, int[] param, PlayerDataManager Ctx)
    {
        var tbl = Tbl(Ctx);
        if (tbl.Kind != kind) return this;
        if (kind == 8)
        {
            if (param[0] != tbl.Param[0]) return this;
            return this with { progress = progress + count };
        }
        else if (kind == 10 || kind == 16 || kind == 17 || kind == 19 || kind == 20)
        {
            return this with { progress = progress + count };
        }
        else
        {
            return InitProgress(Ctx);
        }
    }
}