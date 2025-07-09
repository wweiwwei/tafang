using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay;
public class CardPoolIndex
{
    public readonly ImmutableArray<int> LevelRequireArray;
    public CardPoolIndex(TableData Table, TableConfigData Config)
    {
        var levelList = Table.CardPoolLevelTblList.Select(t =>
        {
            var total = Table.CardPoolLevelTblList.Where(x => x.Level <= t.Level).Sum(x => x.Require);
            return total;
        }).ToList();
        var list = new List<int> { 0 };
        list.AddRange(levelList);
        list.Add(int.MaxValue);
        LevelRequireArray = list.ToImmutableArray();
    }

    public int GetLevel(int total)
    {
        return LevelRequireArray.LastIndexWhere(x => total >= x) + 1;
    }
}
