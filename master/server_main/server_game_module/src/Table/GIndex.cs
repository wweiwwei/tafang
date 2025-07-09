

namespace GamePlay
{
    public static class GIndex
    {
        public static TableIndexData Ins;

    }

    public class TableIndexData
    {
        public readonly CollectionIndex Collection;
        public readonly HeroIndex Hero;
        public readonly EquipmentIndex Equipment;
        public readonly LangIndex Lang;
        public readonly MissionIndex Mission;
        public readonly CardPoolIndex CardPool;
        public readonly IdIndex Id;
        public readonly BattleIndex Battle;

        public TableIndexData(TableData Table, TableConfigData Config)
        {
            Id = new IdIndex(Table, Config);
            Collection = new CollectionIndex(Table, Config);
            Hero = new HeroIndex(Table, Config);
            Equipment = new EquipmentIndex(Table, Config);
            Lang = new LangIndex(Table, Config);
            Mission = new MissionIndex(Table, Config);
            CardPool = new CardPoolIndex(Table, Config);
            Battle = new BattleIndex(Table, Config);
        }



    }
}