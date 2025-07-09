using System.Collections.Immutable;

namespace GamePlay;

public class IdIndex
{

    public readonly ImmutableDictionary<int, int> TalentIdToEquipmentId;
    public IdIndex(TableData Table, TableConfigData Config)
    {
        TalentIdToEquipmentId = Table.EquipmentTblList.ToImmutableDictionary(x => x.SkillTalent, x => x.Id);
    }

}
