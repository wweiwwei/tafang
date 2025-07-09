using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay;

public record PlayerEquipmentPlace(
    /** 塔位index */
    int index,
    /** 塔位等级 */
    int level,
    /** 洗练词条 */
    ImmutableArray<PlayerEquipmentWashStat> stat
)
{
    public bool IsMaxLevel(PlayerDataManager Ctx)
    {
        return level >= Ctx.Table.TowerStrengthenTblList.Length;
    }

    public ImmutableArray<Item>? strengthenCost(PlayerDataManager Ctx)
    {
        var tbl = Ctx.Table.TowerStrengthenTblList.FirstOrDefault(t => t.Level == level + 1);
        if (tbl != null)
            return tbl.Cost.Select(item => new Item(item[0], item[1])).ToImmutableArray();
        else return null;
    }
};


public record PlayerEquipmentWashStat(
    /** 词条唯一id */
    int id,
    /** 词条数值 */
    long value,
    /**是否锁定*/
    bool locked
)
{
    public TowerWashTbl Tbl(PlayerDataManager Ctx)
    {
        return Ctx.Table.TowerWashTblMap[id];
    }
};