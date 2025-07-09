using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay;

public record CareerTalent(
    /** 装备id */
    int id,
    /** 装备等级 */
    int level,
    /** 装备词条 */
    long exp
)
{
    public long UpdateExp(PlayerDataManager Ctx)
    {
        return Ctx.Table.JobTalentLevelTblList.First(t => t.Level == level).Require;
    }
    public bool IsMaxLevel(PlayerDataManager Ctx)
    {
        return level >= Ctx.Table.JobTalentLevelTblList.Length;
    }
};
