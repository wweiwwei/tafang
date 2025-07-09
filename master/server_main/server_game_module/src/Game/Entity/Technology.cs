using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay;

public record Technology(
    /** 科技id */
    int id,
    /** 等级 */
    int level
)
{
    private Dictionary<string, double> Env()
    {
        var m = new Dictionary<string, double>
            {
                { "lv", level }
            };
        return m;
    }
    public TechTreeTbl Tbl(PlayerDataManager Ctx)
    {
        return Ctx.Table.TechTreeTblMap[id];
    }
    public ImmutableArray<Item> UpdateCost(PlayerDataManager Ctx)
    {
        var reward = Tbl(Ctx).Cost.Select(arr =>
        {
            return new Item(int.Parse(arr[0]), (long)Math.Round(AstUtil.Eval(arr[1], Env())));
        });
        return reward.ToImmutableArray();
    }
    // public long UpdateCostTime(PlayerDataManager Ctx)
    // {
    //     return (int)AstUtil.Eval(Tbl(Ctx).TimeCost, Env()) * DateUtils.OneSecond;
    // }
    public bool IsMaxLevel(PlayerDataManager Ctx)
    {
        return level >= Tbl(Ctx).MaxLevel;
    }
};

