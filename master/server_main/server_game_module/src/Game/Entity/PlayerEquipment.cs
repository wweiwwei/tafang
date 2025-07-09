using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay;

public record PlayerEquipment(
    /** 装备唯一id */
    long uniqueId,
    /** 装备id */
    int id,
    /** 装备等级 */
    int level,
    /** 属性值 */
    ImmutableArray<PlayerEquipmentProperty> baseProperty,
    /** 装备词条 */
    ImmutableArray<PlayerEquipmentStat> stat
)
{
    public EquipmentTbl Tbl(PlayerDataManager Ctx)
    {
        return Ctx.Table.EquipmentTblMap[id];
    }

    /** 装备战斗力 */
    public long Bp(PlayerDataManager Ctx)
    {
        var res = 0.0;
        baseProperty.ForEach(d =>
        {
            var v = Ctx.Index.Battle.GetBpByProperty(d.property) * d.value;
            res += v;
        });
        stat.ForEach(d =>
        {
            var tbl = Ctx.Table.EquipmentStatTblMap[d.id];
            var v = Ctx.Index.Battle.GetBpByProperty(tbl.Property) * d.value;
            res += v;
        });
        return (long)Math.Round(res);
    }
};


public record PlayerEquipmentStat(
    /** 词条id */
    int id,
    /** 词条数值 */
    long value
)
{
    public EquipmentStatTbl Tbl(PlayerDataManager Ctx)
    {
        return Ctx.Table.EquipmentStatTblMap[id];
    }
};

public record PlayerEquipmentProperty(
    /** 属性 */
    string property,
    /** 词条数值 */
    long value
)
{ }