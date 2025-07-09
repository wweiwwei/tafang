using System.Collections.Immutable;

namespace GamePlay;
public class BattleIndex
{
    public readonly ImmutableDictionary<string, double> propertyToBp;
    public BattleIndex(TableData Table, TableConfigData Config)
    {
        var dic = new Dictionary<string, double>();
        Table.BattlePropertyTblList.ForEach(t =>
        {
            dic[t.Key] = t.BattlePoint;
        });
        propertyToBp = dic.ToImmutableDictionary();
    }

    public double GetBpByProperty(string property)
    {
        return propertyToBp.GetValueOrDefault(property, 0L);
    }
}