
//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Collections.ObjectModel;
using System.Linq;

#pragma warning disable CS8602
#pragma warning disable CS8600
#pragma warning disable CS8618
#pragma warning disable CS8604
#pragma warning disable CS0649


namespace GamePlay
{
    public class GTable
    {
        public static TableData Ins;

        public static void Load(string data)
        {
            var newData = new TableData(JsonUtils.ParseJToken(data));
            var newConfig = new TableConfigData(newData);
            var newIndex = new TableIndexData(newData, newConfig);
            GConfig.Ins = newConfig;
            GIndex.Ins = newIndex;
            Ins = newData;
        }

    }

    public class TableSchema
    {
        public string name;
        public string[] fields;
        public string[] types;
    }

    public class TableData
    {
        public TableData(JToken json)
        {
            var origin = (JArray)json["tableSchema"];
            var schema = origin.Select(o => JsonUtils.Parse<TableSchema>(o)).ToDictionary(t=>t.name,t=>t);
            {
                var str = (string)json["GameConfigTbl"];
                var fields = schema["GameConfigTbl"];
                var map = new Dictionary<int, GameConfigTbl>();
                var list = new List<GameConfigTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new GameConfigTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                GameConfigTblMap = map.ToImmutableDictionary();
                GameConfigTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["ItemTbl"];
                var fields = schema["ItemTbl"];
                var map = new Dictionary<int, ItemTbl>();
                var list = new List<ItemTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new ItemTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                ItemTblMap = map.ToImmutableDictionary();
                ItemTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["ChestTbl"];
                var fields = schema["ChestTbl"];
                var map = new Dictionary<int, ChestTbl>();
                var list = new List<ChestTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new ChestTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                ChestTblMap = map.ToImmutableDictionary();
                ChestTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["HeroTbl"];
                var fields = schema["HeroTbl"];
                var map = new Dictionary<int, HeroTbl>();
                var list = new List<HeroTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new HeroTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                HeroTblMap = map.ToImmutableDictionary();
                HeroTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["HeroRankBuffTbl"];
                var fields = schema["HeroRankBuffTbl"];
                var map = new Dictionary<int, HeroRankBuffTbl>();
                var list = new List<HeroRankBuffTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new HeroRankBuffTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                HeroRankBuffTblMap = map.ToImmutableDictionary();
                HeroRankBuffTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["HeroRankSpecialTbl"];
                var fields = schema["HeroRankSpecialTbl"];
                var map = new Dictionary<int, HeroRankSpecialTbl>();
                var list = new List<HeroRankSpecialTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new HeroRankSpecialTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                HeroRankSpecialTblMap = map.ToImmutableDictionary();
                HeroRankSpecialTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["HeroRankPropertyTbl"];
                var fields = schema["HeroRankPropertyTbl"];
                var map = new Dictionary<int, HeroRankPropertyTbl>();
                var list = new List<HeroRankPropertyTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new HeroRankPropertyTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                HeroRankPropertyTblMap = map.ToImmutableDictionary();
                HeroRankPropertyTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["HeroEquipmentTbl"];
                var fields = schema["HeroEquipmentTbl"];
                var map = new Dictionary<int, HeroEquipmentTbl>();
                var list = new List<HeroEquipmentTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new HeroEquipmentTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                HeroEquipmentTblMap = map.ToImmutableDictionary();
                HeroEquipmentTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["HeroSkillTbl"];
                var fields = schema["HeroSkillTbl"];
                var map = new Dictionary<int, HeroSkillTbl>();
                var list = new List<HeroSkillTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new HeroSkillTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                HeroSkillTblMap = map.ToImmutableDictionary();
                HeroSkillTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["HeroLevelTbl"];
                var fields = schema["HeroLevelTbl"];
                var map = new Dictionary<int, HeroLevelTbl>();
                var list = new List<HeroLevelTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new HeroLevelTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                HeroLevelTblMap = map.ToImmutableDictionary();
                HeroLevelTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["HeroRankTbl"];
                var fields = schema["HeroRankTbl"];
                var map = new Dictionary<int, HeroRankTbl>();
                var list = new List<HeroRankTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new HeroRankTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                HeroRankTblMap = map.ToImmutableDictionary();
                HeroRankTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["HeroStarTbl"];
                var fields = schema["HeroStarTbl"];
                var map = new Dictionary<int, HeroStarTbl>();
                var list = new List<HeroStarTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new HeroStarTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                HeroStarTblMap = map.ToImmutableDictionary();
                HeroStarTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["HeroEquipmentLevelTbl"];
                var fields = schema["HeroEquipmentLevelTbl"];
                var map = new Dictionary<int, HeroEquipmentLevelTbl>();
                var list = new List<HeroEquipmentLevelTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new HeroEquipmentLevelTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                HeroEquipmentLevelTblMap = map.ToImmutableDictionary();
                HeroEquipmentLevelTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["HeroEquipmentRankTbl"];
                var fields = schema["HeroEquipmentRankTbl"];
                var map = new Dictionary<int, HeroEquipmentRankTbl>();
                var list = new List<HeroEquipmentRankTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new HeroEquipmentRankTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                HeroEquipmentRankTblMap = map.ToImmutableDictionary();
                HeroEquipmentRankTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["FacilityTbl"];
                var fields = schema["FacilityTbl"];
                var map = new Dictionary<int, FacilityTbl>();
                var list = new List<FacilityTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new FacilityTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                FacilityTblMap = map.ToImmutableDictionary();
                FacilityTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["FacilityLevelTbl"];
                var fields = schema["FacilityLevelTbl"];
                var map = new Dictionary<int, FacilityLevelTbl>();
                var list = new List<FacilityLevelTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new FacilityLevelTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                FacilityLevelTblMap = map.ToImmutableDictionary();
                FacilityLevelTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["FacilityRankTbl"];
                var fields = schema["FacilityRankTbl"];
                var map = new Dictionary<int, FacilityRankTbl>();
                var list = new List<FacilityRankTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new FacilityRankTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                FacilityRankTblMap = map.ToImmutableDictionary();
                FacilityRankTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["FacilityHeroLevelBuffTbl"];
                var fields = schema["FacilityHeroLevelBuffTbl"];
                var map = new Dictionary<int, FacilityHeroLevelBuffTbl>();
                var list = new List<FacilityHeroLevelBuffTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new FacilityHeroLevelBuffTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                FacilityHeroLevelBuffTblMap = map.ToImmutableDictionary();
                FacilityHeroLevelBuffTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["FacilityStarTbl"];
                var fields = schema["FacilityStarTbl"];
                var map = new Dictionary<int, FacilityStarTbl>();
                var list = new List<FacilityStarTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new FacilityStarTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                FacilityStarTblMap = map.ToImmutableDictionary();
                FacilityStarTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["FacilityBuffTbl"];
                var fields = schema["FacilityBuffTbl"];
                var map = new Dictionary<int, FacilityBuffTbl>();
                var list = new List<FacilityBuffTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new FacilityBuffTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                FacilityBuffTblMap = map.ToImmutableDictionary();
                FacilityBuffTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["StageMapTbl"];
                var fields = schema["StageMapTbl"];
                var map = new Dictionary<int, StageMapTbl>();
                var list = new List<StageMapTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new StageMapTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                StageMapTblMap = map.ToImmutableDictionary();
                StageMapTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["StageTbl"];
                var fields = schema["StageTbl"];
                var map = new Dictionary<int, StageTbl>();
                var list = new List<StageTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new StageTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                StageTblMap = map.ToImmutableDictionary();
                StageTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["StageReputationShopTbl"];
                var fields = schema["StageReputationShopTbl"];
                var map = new Dictionary<int, StageReputationShopTbl>();
                var list = new List<StageReputationShopTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new StageReputationShopTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                StageReputationShopTblMap = map.ToImmutableDictionary();
                StageReputationShopTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["StageAchievementTbl"];
                var fields = schema["StageAchievementTbl"];
                var map = new Dictionary<int, StageAchievementTbl>();
                var list = new List<StageAchievementTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new StageAchievementTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                StageAchievementTblMap = map.ToImmutableDictionary();
                StageAchievementTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["EquipmentMonsterTbl"];
                var fields = schema["EquipmentMonsterTbl"];
                var map = new Dictionary<int, EquipmentMonsterTbl>();
                var list = new List<EquipmentMonsterTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new EquipmentMonsterTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                EquipmentMonsterTblMap = map.ToImmutableDictionary();
                EquipmentMonsterTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["MonsterWaveTbl"];
                var fields = schema["MonsterWaveTbl"];
                var map = new Dictionary<int, MonsterWaveTbl>();
                var list = new List<MonsterWaveTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new MonsterWaveTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                MonsterWaveTblMap = map.ToImmutableDictionary();
                MonsterWaveTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["MonsterWaveDetailTbl"];
                var fields = schema["MonsterWaveDetailTbl"];
                var map = new Dictionary<int, MonsterWaveDetailTbl>();
                var list = new List<MonsterWaveDetailTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new MonsterWaveDetailTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                MonsterWaveDetailTblMap = map.ToImmutableDictionary();
                MonsterWaveDetailTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["MonsterTbl"];
                var fields = schema["MonsterTbl"];
                var map = new Dictionary<int, MonsterTbl>();
                var list = new List<MonsterTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new MonsterTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                MonsterTblMap = map.ToImmutableDictionary();
                MonsterTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["ShopTbl"];
                var fields = schema["ShopTbl"];
                var map = new Dictionary<int, ShopTbl>();
                var list = new List<ShopTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new ShopTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                ShopTblMap = map.ToImmutableDictionary();
                ShopTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["PlayerLevelTbl"];
                var fields = schema["PlayerLevelTbl"];
                var map = new Dictionary<int, PlayerLevelTbl>();
                var list = new List<PlayerLevelTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new PlayerLevelTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                PlayerLevelTblMap = map.ToImmutableDictionary();
                PlayerLevelTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["PlayerRankTbl"];
                var fields = schema["PlayerRankTbl"];
                var map = new Dictionary<int, PlayerRankTbl>();
                var list = new List<PlayerRankTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new PlayerRankTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                PlayerRankTblMap = map.ToImmutableDictionary();
                PlayerRankTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["PlayerMissionTbl"];
                var fields = schema["PlayerMissionTbl"];
                var map = new Dictionary<int, PlayerMissionTbl>();
                var list = new List<PlayerMissionTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new PlayerMissionTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                PlayerMissionTblMap = map.ToImmutableDictionary();
                PlayerMissionTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["MainMissionTaskTbl"];
                var fields = schema["MainMissionTaskTbl"];
                var map = new Dictionary<int, MainMissionTaskTbl>();
                var list = new List<MainMissionTaskTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new MainMissionTaskTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                MainMissionTaskTblMap = map.ToImmutableDictionary();
                MainMissionTaskTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["MainMissionTbl"];
                var fields = schema["MainMissionTbl"];
                var map = new Dictionary<int, MainMissionTbl>();
                var list = new List<MainMissionTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new MainMissionTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                MainMissionTblMap = map.ToImmutableDictionary();
                MainMissionTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["TowerChallengeTbl"];
                var fields = schema["TowerChallengeTbl"];
                var map = new Dictionary<int, TowerChallengeTbl>();
                var list = new List<TowerChallengeTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new TowerChallengeTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                TowerChallengeTblMap = map.ToImmutableDictionary();
                TowerChallengeTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["TowerLevelRewardTbl"];
                var fields = schema["TowerLevelRewardTbl"];
                var map = new Dictionary<int, TowerLevelRewardTbl>();
                var list = new List<TowerLevelRewardTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new TowerLevelRewardTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                TowerLevelRewardTblMap = map.ToImmutableDictionary();
                TowerLevelRewardTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["ArenaRewardTbl"];
                var fields = schema["ArenaRewardTbl"];
                var map = new Dictionary<int, ArenaRewardTbl>();
                var list = new List<ArenaRewardTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new ArenaRewardTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                ArenaRewardTblMap = map.ToImmutableDictionary();
                ArenaRewardTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["BattleSkillTbl"];
                var fields = schema["BattleSkillTbl"];
                var map = new Dictionary<int, BattleSkillTbl>();
                var list = new List<BattleSkillTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new BattleSkillTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                BattleSkillTblMap = map.ToImmutableDictionary();
                BattleSkillTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["CarTbl"];
                var fields = schema["CarTbl"];
                var map = new Dictionary<int, CarTbl>();
                var list = new List<CarTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new CarTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                CarTblMap = map.ToImmutableDictionary();
                CarTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["CarSkillTbl"];
                var fields = schema["CarSkillTbl"];
                var map = new Dictionary<int, CarSkillTbl>();
                var list = new List<CarSkillTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new CarSkillTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                CarSkillTblMap = map.ToImmutableDictionary();
                CarSkillTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["CarLevelTbl"];
                var fields = schema["CarLevelTbl"];
                var map = new Dictionary<int, CarLevelTbl>();
                var list = new List<CarLevelTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new CarLevelTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                CarLevelTblMap = map.ToImmutableDictionary();
                CarLevelTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["CarEquipmentTbl"];
                var fields = schema["CarEquipmentTbl"];
                var map = new Dictionary<int, CarEquipmentTbl>();
                var list = new List<CarEquipmentTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new CarEquipmentTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                CarEquipmentTblMap = map.ToImmutableDictionary();
                CarEquipmentTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["CarEquipmentLevelTbl"];
                var fields = schema["CarEquipmentLevelTbl"];
                var map = new Dictionary<int, CarEquipmentLevelTbl>();
                var list = new List<CarEquipmentLevelTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new CarEquipmentLevelTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                CarEquipmentLevelTblMap = map.ToImmutableDictionary();
                CarEquipmentLevelTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["CardPoolTbl"];
                var fields = schema["CardPoolTbl"];
                var map = new Dictionary<int, CardPoolTbl>();
                var list = new List<CardPoolTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new CardPoolTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                CardPoolTblMap = map.ToImmutableDictionary();
                CardPoolTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["CardPoolLevelTbl"];
                var fields = schema["CardPoolLevelTbl"];
                var map = new Dictionary<int, CardPoolLevelTbl>();
                var list = new List<CardPoolLevelTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new CardPoolLevelTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                CardPoolLevelTblMap = map.ToImmutableDictionary();
                CardPoolLevelTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["SpineAttackAnimationInfoTbl"];
                var fields = schema["SpineAttackAnimationInfoTbl"];
                var map = new Dictionary<int, SpineAttackAnimationInfoTbl>();
                var list = new List<SpineAttackAnimationInfoTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new SpineAttackAnimationInfoTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                SpineAttackAnimationInfoTblMap = map.ToImmutableDictionary();
                SpineAttackAnimationInfoTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["SpineInfoTbl"];
                var fields = schema["SpineInfoTbl"];
                var map = new Dictionary<int, SpineInfoTbl>();
                var list = new List<SpineInfoTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new SpineInfoTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                SpineInfoTblMap = map.ToImmutableDictionary();
                SpineInfoTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["HeroFormationTbl"];
                var fields = schema["HeroFormationTbl"];
                var map = new Dictionary<int, HeroFormationTbl>();
                var list = new List<HeroFormationTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new HeroFormationTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                HeroFormationTblMap = map.ToImmutableDictionary();
                HeroFormationTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["RelationBuffTbl"];
                var fields = schema["RelationBuffTbl"];
                var map = new Dictionary<int, RelationBuffTbl>();
                var list = new List<RelationBuffTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new RelationBuffTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                RelationBuffTblMap = map.ToImmutableDictionary();
                RelationBuffTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["FacilityTunnelTbl"];
                var fields = schema["FacilityTunnelTbl"];
                var map = new Dictionary<int, FacilityTunnelTbl>();
                var list = new List<FacilityTunnelTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new FacilityTunnelTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                FacilityTunnelTblMap = map.ToImmutableDictionary();
                FacilityTunnelTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["FacilityPositionTbl"];
                var fields = schema["FacilityPositionTbl"];
                var map = new Dictionary<int, FacilityPositionTbl>();
                var list = new List<FacilityPositionTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new FacilityPositionTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                FacilityPositionTblMap = map.ToImmutableDictionary();
                FacilityPositionTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["EnemyBattleTbl"];
                var fields = schema["EnemyBattleTbl"];
                var map = new Dictionary<int, EnemyBattleTbl>();
                var list = new List<EnemyBattleTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new EnemyBattleTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                EnemyBattleTblMap = map.ToImmutableDictionary();
                EnemyBattleTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["MineRewardTbl"];
                var fields = schema["MineRewardTbl"];
                var map = new Dictionary<int, MineRewardTbl>();
                var list = new List<MineRewardTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new MineRewardTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                MineRewardTblMap = map.ToImmutableDictionary();
                MineRewardTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["MineMapAreaTbl"];
                var fields = schema["MineMapAreaTbl"];
                var map = new Dictionary<int, MineMapAreaTbl>();
                var list = new List<MineMapAreaTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new MineMapAreaTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                MineMapAreaTblMap = map.ToImmutableDictionary();
                MineMapAreaTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["MineBattleMapTbl"];
                var fields = schema["MineBattleMapTbl"];
                var map = new Dictionary<int, MineBattleMapTbl>();
                var list = new List<MineBattleMapTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new MineBattleMapTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                MineBattleMapTblMap = map.ToImmutableDictionary();
                MineBattleMapTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["GiftPackTbl"];
                var fields = schema["GiftPackTbl"];
                var map = new Dictionary<int, GiftPackTbl>();
                var list = new List<GiftPackTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new GiftPackTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                GiftPackTblMap = map.ToImmutableDictionary();
                GiftPackTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["PackRuleTbl"];
                var fields = schema["PackRuleTbl"];
                var map = new Dictionary<int, PackRuleTbl>();
                var list = new List<PackRuleTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new PackRuleTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                PackRuleTblMap = map.ToImmutableDictionary();
                PackRuleTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["DialogueTbl"];
                var fields = schema["DialogueTbl"];
                var map = new Dictionary<int, DialogueTbl>();
                var list = new List<DialogueTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new DialogueTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                DialogueTblMap = map.ToImmutableDictionary();
                DialogueTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["DialogueContentTbl"];
                var fields = schema["DialogueContentTbl"];
                var map = new Dictionary<int, DialogueContentTbl>();
                var list = new List<DialogueContentTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new DialogueContentTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                DialogueContentTblMap = map.ToImmutableDictionary();
                DialogueContentTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["GuideTbl"];
                var fields = schema["GuideTbl"];
                var map = new Dictionary<int, GuideTbl>();
                var list = new List<GuideTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new GuideTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                GuideTblMap = map.ToImmutableDictionary();
                GuideTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["GuideContentTbl"];
                var fields = schema["GuideContentTbl"];
                var map = new Dictionary<int, GuideContentTbl>();
                var list = new List<GuideContentTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new GuideContentTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                GuideContentTblMap = map.ToImmutableDictionary();
                GuideContentTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["HeroCollectionTbl"];
                var fields = schema["HeroCollectionTbl"];
                var map = new Dictionary<int, HeroCollectionTbl>();
                var list = new List<HeroCollectionTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new HeroCollectionTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                HeroCollectionTblMap = map.ToImmutableDictionary();
                HeroCollectionTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["HeroCollectionPointTbl"];
                var fields = schema["HeroCollectionPointTbl"];
                var map = new Dictionary<int, HeroCollectionPointTbl>();
                var list = new List<HeroCollectionPointTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new HeroCollectionPointTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                HeroCollectionPointTblMap = map.ToImmutableDictionary();
                HeroCollectionPointTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["HeroCollectionLevelRewardTbl"];
                var fields = schema["HeroCollectionLevelRewardTbl"];
                var map = new Dictionary<int, HeroCollectionLevelRewardTbl>();
                var list = new List<HeroCollectionLevelRewardTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new HeroCollectionLevelRewardTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                HeroCollectionLevelRewardTblMap = map.ToImmutableDictionary();
                HeroCollectionLevelRewardTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["MusicInfoTbl"];
                var fields = schema["MusicInfoTbl"];
                var map = new Dictionary<int, MusicInfoTbl>();
                var list = new List<MusicInfoTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new MusicInfoTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                MusicInfoTblMap = map.ToImmutableDictionary();
                MusicInfoTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["BattleSceneInfoTbl"];
                var fields = schema["BattleSceneInfoTbl"];
                var map = new Dictionary<int, BattleSceneInfoTbl>();
                var list = new List<BattleSceneInfoTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new BattleSceneInfoTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                BattleSceneInfoTblMap = map.ToImmutableDictionary();
                BattleSceneInfoTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["BattleRoadInfoTbl"];
                var fields = schema["BattleRoadInfoTbl"];
                var map = new Dictionary<int, BattleRoadInfoTbl>();
                var list = new List<BattleRoadInfoTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new BattleRoadInfoTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                BattleRoadInfoTblMap = map.ToImmutableDictionary();
                BattleRoadInfoTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["ClearAdTbl"];
                var fields = schema["ClearAdTbl"];
                var map = new Dictionary<int, ClearAdTbl>();
                var list = new List<ClearAdTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new ClearAdTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                ClearAdTblMap = map.ToImmutableDictionary();
                ClearAdTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["MagicStaffTbl"];
                var fields = schema["MagicStaffTbl"];
                var map = new Dictionary<int, MagicStaffTbl>();
                var list = new List<MagicStaffTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new MagicStaffTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                MagicStaffTblMap = map.ToImmutableDictionary();
                MagicStaffTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["SystemUnlockTbl"];
                var fields = schema["SystemUnlockTbl"];
                var map = new Dictionary<int, SystemUnlockTbl>();
                var list = new List<SystemUnlockTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new SystemUnlockTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                SystemUnlockTblMap = map.ToImmutableDictionary();
                SystemUnlockTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["WeakGuideTbl"];
                var fields = schema["WeakGuideTbl"];
                var map = new Dictionary<int, WeakGuideTbl>();
                var list = new List<WeakGuideTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new WeakGuideTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                WeakGuideTblMap = map.ToImmutableDictionary();
                WeakGuideTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["WeakGuideContentTbl"];
                var fields = schema["WeakGuideContentTbl"];
                var map = new Dictionary<int, WeakGuideContentTbl>();
                var list = new List<WeakGuideContentTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new WeakGuideContentTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                WeakGuideContentTblMap = map.ToImmutableDictionary();
                WeakGuideContentTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["TurntableTbl"];
                var fields = schema["TurntableTbl"];
                var map = new Dictionary<int, TurntableTbl>();
                var list = new List<TurntableTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new TurntableTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                TurntableTblMap = map.ToImmutableDictionary();
                TurntableTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["ChestItemPoolTbl"];
                var fields = schema["ChestItemPoolTbl"];
                var map = new Dictionary<int, ChestItemPoolTbl>();
                var list = new List<ChestItemPoolTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new ChestItemPoolTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                ChestItemPoolTblMap = map.ToImmutableDictionary();
                ChestItemPoolTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["OptionalChestPoolTbl"];
                var fields = schema["OptionalChestPoolTbl"];
                var map = new Dictionary<int, OptionalChestPoolTbl>();
                var list = new List<OptionalChestPoolTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new OptionalChestPoolTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                OptionalChestPoolTblMap = map.ToImmutableDictionary();
                OptionalChestPoolTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["FirstPackageTbl"];
                var fields = schema["FirstPackageTbl"];
                var map = new Dictionary<int, FirstPackageTbl>();
                var list = new List<FirstPackageTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new FirstPackageTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                FirstPackageTblMap = map.ToImmutableDictionary();
                FirstPackageTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["MonthCardTbl"];
                var fields = schema["MonthCardTbl"];
                var map = new Dictionary<int, MonthCardTbl>();
                var list = new List<MonthCardTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new MonthCardTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                MonthCardTblMap = map.ToImmutableDictionary();
                MonthCardTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["CaptainMissionTbl"];
                var fields = schema["CaptainMissionTbl"];
                var map = new Dictionary<int, CaptainMissionTbl>();
                var list = new List<CaptainMissionTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new CaptainMissionTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                CaptainMissionTblMap = map.ToImmutableDictionary();
                CaptainMissionTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["CaptainBuffTbl"];
                var fields = schema["CaptainBuffTbl"];
                var map = new Dictionary<int, CaptainBuffTbl>();
                var list = new List<CaptainBuffTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new CaptainBuffTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                CaptainBuffTblMap = map.ToImmutableDictionary();
                CaptainBuffTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["WarOrderTbl"];
                var fields = schema["WarOrderTbl"];
                var map = new Dictionary<int, WarOrderTbl>();
                var list = new List<WarOrderTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new WarOrderTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                WarOrderTblMap = map.ToImmutableDictionary();
                WarOrderTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["WarOrderRewardTbl"];
                var fields = schema["WarOrderRewardTbl"];
                var map = new Dictionary<int, WarOrderRewardTbl>();
                var list = new List<WarOrderRewardTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new WarOrderRewardTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                WarOrderRewardTblMap = map.ToImmutableDictionary();
                WarOrderRewardTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["RuleTextTbl"];
                var fields = schema["RuleTextTbl"];
                var map = new Dictionary<int, RuleTextTbl>();
                var list = new List<RuleTextTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new RuleTextTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                RuleTextTblMap = map.ToImmutableDictionary();
                RuleTextTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["RankMissionTbl"];
                var fields = schema["RankMissionTbl"];
                var map = new Dictionary<int, RankMissionTbl>();
                var list = new List<RankMissionTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new RankMissionTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                RankMissionTblMap = map.ToImmutableDictionary();
                RankMissionTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["RankPackTbl"];
                var fields = schema["RankPackTbl"];
                var map = new Dictionary<int, RankPackTbl>();
                var list = new List<RankPackTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new RankPackTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                RankPackTblMap = map.ToImmutableDictionary();
                RankPackTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["RankRewardTbl"];
                var fields = schema["RankRewardTbl"];
                var map = new Dictionary<int, RankRewardTbl>();
                var list = new List<RankRewardTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new RankRewardTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                RankRewardTblMap = map.ToImmutableDictionary();
                RankRewardTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["VideoGroupPurchaseTbl"];
                var fields = schema["VideoGroupPurchaseTbl"];
                var map = new Dictionary<int, VideoGroupPurchaseTbl>();
                var list = new List<VideoGroupPurchaseTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new VideoGroupPurchaseTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                VideoGroupPurchaseTblMap = map.ToImmutableDictionary();
                VideoGroupPurchaseTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["BanquetLevelTbl"];
                var fields = schema["BanquetLevelTbl"];
                var map = new Dictionary<int, BanquetLevelTbl>();
                var list = new List<BanquetLevelTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new BanquetLevelTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                BanquetLevelTblMap = map.ToImmutableDictionary();
                BanquetLevelTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["BanquetPointRewardTbl"];
                var fields = schema["BanquetPointRewardTbl"];
                var map = new Dictionary<int, BanquetPointRewardTbl>();
                var list = new List<BanquetPointRewardTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new BanquetPointRewardTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                BanquetPointRewardTblMap = map.ToImmutableDictionary();
                BanquetPointRewardTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["BanquetMissionTbl"];
                var fields = schema["BanquetMissionTbl"];
                var map = new Dictionary<int, BanquetMissionTbl>();
                var list = new List<BanquetMissionTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new BanquetMissionTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                BanquetMissionTblMap = map.ToImmutableDictionary();
                BanquetMissionTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["BanquetShopTbl"];
                var fields = schema["BanquetShopTbl"];
                var map = new Dictionary<int, BanquetShopTbl>();
                var list = new List<BanquetShopTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new BanquetShopTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                BanquetShopTblMap = map.ToImmutableDictionary();
                BanquetShopTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["BanquetPackTbl"];
                var fields = schema["BanquetPackTbl"];
                var map = new Dictionary<int, BanquetPackTbl>();
                var list = new List<BanquetPackTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new BanquetPackTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                BanquetPackTblMap = map.ToImmutableDictionary();
                BanquetPackTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["BanquetGroupTbl"];
                var fields = schema["BanquetGroupTbl"];
                var map = new Dictionary<int, BanquetGroupTbl>();
                var list = new List<BanquetGroupTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new BanquetGroupTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                BanquetGroupTblMap = map.ToImmutableDictionary();
                BanquetGroupTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["TowerStrengthenTbl"];
                var fields = schema["TowerStrengthenTbl"];
                var map = new Dictionary<int, TowerStrengthenTbl>();
                var list = new List<TowerStrengthenTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new TowerStrengthenTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                TowerStrengthenTblMap = map.ToImmutableDictionary();
                TowerStrengthenTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["TowerWashTbl"];
                var fields = schema["TowerWashTbl"];
                var map = new Dictionary<int, TowerWashTbl>();
                var list = new List<TowerWashTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new TowerWashTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                TowerWashTblMap = map.ToImmutableDictionary();
                TowerWashTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["TowerWashRareTbl"];
                var fields = schema["TowerWashRareTbl"];
                var map = new Dictionary<int, TowerWashRareTbl>();
                var list = new List<TowerWashRareTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new TowerWashRareTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                TowerWashRareTblMap = map.ToImmutableDictionary();
                TowerWashRareTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["EquipmentTbl"];
                var fields = schema["EquipmentTbl"];
                var map = new Dictionary<int, EquipmentTbl>();
                var list = new List<EquipmentTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new EquipmentTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                EquipmentTblMap = map.ToImmutableDictionary();
                EquipmentTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["EquipmentStatTbl"];
                var fields = schema["EquipmentStatTbl"];
                var map = new Dictionary<int, EquipmentStatTbl>();
                var list = new List<EquipmentStatTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new EquipmentStatTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                EquipmentStatTblMap = map.ToImmutableDictionary();
                EquipmentStatTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["StoneLevelTbl"];
                var fields = schema["StoneLevelTbl"];
                var map = new Dictionary<int, StoneLevelTbl>();
                var list = new List<StoneLevelTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new StoneLevelTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                StoneLevelTblMap = map.ToImmutableDictionary();
                StoneLevelTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["PlayerSkillTbl"];
                var fields = schema["PlayerSkillTbl"];
                var map = new Dictionary<int, PlayerSkillTbl>();
                var list = new List<PlayerSkillTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new PlayerSkillTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                PlayerSkillTblMap = map.ToImmutableDictionary();
                PlayerSkillTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["PlayerSkillLevelTbl"];
                var fields = schema["PlayerSkillLevelTbl"];
                var map = new Dictionary<int, PlayerSkillLevelTbl>();
                var list = new List<PlayerSkillLevelTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new PlayerSkillLevelTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                PlayerSkillLevelTblMap = map.ToImmutableDictionary();
                PlayerSkillLevelTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["PlayerSkillTalentTbl"];
                var fields = schema["PlayerSkillTalentTbl"];
                var map = new Dictionary<int, PlayerSkillTalentTbl>();
                var list = new List<PlayerSkillTalentTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new PlayerSkillTalentTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                PlayerSkillTalentTblMap = map.ToImmutableDictionary();
                PlayerSkillTalentTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["PetTbl"];
                var fields = schema["PetTbl"];
                var map = new Dictionary<int, PetTbl>();
                var list = new List<PetTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new PetTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                PetTblMap = map.ToImmutableDictionary();
                PetTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["PetLevelTbl"];
                var fields = schema["PetLevelTbl"];
                var map = new Dictionary<int, PetLevelTbl>();
                var list = new List<PetLevelTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new PetLevelTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                PetLevelTblMap = map.ToImmutableDictionary();
                PetLevelTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["FossilTbl"];
                var fields = schema["FossilTbl"];
                var map = new Dictionary<int, FossilTbl>();
                var list = new List<FossilTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new FossilTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                FossilTblMap = map.ToImmutableDictionary();
                FossilTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["FossilComboTbl"];
                var fields = schema["FossilComboTbl"];
                var map = new Dictionary<int, FossilComboTbl>();
                var list = new List<FossilComboTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new FossilComboTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                FossilComboTblMap = map.ToImmutableDictionary();
                FossilComboTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["ManorFacilityTbl"];
                var fields = schema["ManorFacilityTbl"];
                var map = new Dictionary<int, ManorFacilityTbl>();
                var list = new List<ManorFacilityTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new ManorFacilityTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                ManorFacilityTblMap = map.ToImmutableDictionary();
                ManorFacilityTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["ManorDecorationTbl"];
                var fields = schema["ManorDecorationTbl"];
                var map = new Dictionary<int, ManorDecorationTbl>();
                var list = new List<ManorDecorationTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new ManorDecorationTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                ManorDecorationTblMap = map.ToImmutableDictionary();
                ManorDecorationTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["ManorPlantTbl"];
                var fields = schema["ManorPlantTbl"];
                var map = new Dictionary<int, ManorPlantTbl>();
                var list = new List<ManorPlantTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new ManorPlantTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                ManorPlantTblMap = map.ToImmutableDictionary();
                ManorPlantTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["JobChangeTbl"];
                var fields = schema["JobChangeTbl"];
                var map = new Dictionary<int, JobChangeTbl>();
                var list = new List<JobChangeTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new JobChangeTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                JobChangeTblMap = map.ToImmutableDictionary();
                JobChangeTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["JobSkillTbl"];
                var fields = schema["JobSkillTbl"];
                var map = new Dictionary<int, JobSkillTbl>();
                var list = new List<JobSkillTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new JobSkillTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                JobSkillTblMap = map.ToImmutableDictionary();
                JobSkillTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["JobTalentTbl"];
                var fields = schema["JobTalentTbl"];
                var map = new Dictionary<int, JobTalentTbl>();
                var list = new List<JobTalentTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new JobTalentTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                JobTalentTblMap = map.ToImmutableDictionary();
                JobTalentTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["JobTalentLevelTbl"];
                var fields = schema["JobTalentLevelTbl"];
                var map = new Dictionary<int, JobTalentLevelTbl>();
                var list = new List<JobTalentLevelTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new JobTalentLevelTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                JobTalentLevelTblMap = map.ToImmutableDictionary();
                JobTalentLevelTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["DamageChallengeTbl"];
                var fields = schema["DamageChallengeTbl"];
                var map = new Dictionary<int, DamageChallengeTbl>();
                var list = new List<DamageChallengeTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new DamageChallengeTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                DamageChallengeTblMap = map.ToImmutableDictionary();
                DamageChallengeTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["DamageMonsterTbl"];
                var fields = schema["DamageMonsterTbl"];
                var map = new Dictionary<int, DamageMonsterTbl>();
                var list = new List<DamageMonsterTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new DamageMonsterTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                DamageMonsterTblMap = map.ToImmutableDictionary();
                DamageMonsterTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["HeroSoulTbl"];
                var fields = schema["HeroSoulTbl"];
                var map = new Dictionary<int, HeroSoulTbl>();
                var list = new List<HeroSoulTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new HeroSoulTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                HeroSoulTblMap = map.ToImmutableDictionary();
                HeroSoulTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["HeroSoulValueTbl"];
                var fields = schema["HeroSoulValueTbl"];
                var map = new Dictionary<int, HeroSoulValueTbl>();
                var list = new List<HeroSoulValueTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new HeroSoulValueTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                HeroSoulValueTblMap = map.ToImmutableDictionary();
                HeroSoulValueTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["HeroSoulLevelTbl"];
                var fields = schema["HeroSoulLevelTbl"];
                var map = new Dictionary<int, HeroSoulLevelTbl>();
                var list = new List<HeroSoulLevelTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new HeroSoulLevelTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                HeroSoulLevelTblMap = map.ToImmutableDictionary();
                HeroSoulLevelTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["HeroSoulBreakTbl"];
                var fields = schema["HeroSoulBreakTbl"];
                var map = new Dictionary<int, HeroSoulBreakTbl>();
                var list = new List<HeroSoulBreakTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new HeroSoulBreakTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                HeroSoulBreakTblMap = map.ToImmutableDictionary();
                HeroSoulBreakTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["DefendTowerTbl"];
                var fields = schema["DefendTowerTbl"];
                var map = new Dictionary<int, DefendTowerTbl>();
                var list = new List<DefendTowerTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new DefendTowerTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                DefendTowerTblMap = map.ToImmutableDictionary();
                DefendTowerTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["InfiniteBattleTbl"];
                var fields = schema["InfiniteBattleTbl"];
                var map = new Dictionary<int, InfiniteBattleTbl>();
                var list = new List<InfiniteBattleTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new InfiniteBattleTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                InfiniteBattleTblMap = map.ToImmutableDictionary();
                InfiniteBattleTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["RogueSkillTbl"];
                var fields = schema["RogueSkillTbl"];
                var map = new Dictionary<int, RogueSkillTbl>();
                var list = new List<RogueSkillTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new RogueSkillTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                RogueSkillTblMap = map.ToImmutableDictionary();
                RogueSkillTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["RogueSkillDetailTbl"];
                var fields = schema["RogueSkillDetailTbl"];
                var map = new Dictionary<int, RogueSkillDetailTbl>();
                var list = new List<RogueSkillDetailTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new RogueSkillDetailTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                RogueSkillDetailTblMap = map.ToImmutableDictionary();
                RogueSkillDetailTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["RogueSkillEnhanceTbl"];
                var fields = schema["RogueSkillEnhanceTbl"];
                var map = new Dictionary<int, RogueSkillEnhanceTbl>();
                var list = new List<RogueSkillEnhanceTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new RogueSkillEnhanceTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                RogueSkillEnhanceTblMap = map.ToImmutableDictionary();
                RogueSkillEnhanceTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["RogueBlessTbl"];
                var fields = schema["RogueBlessTbl"];
                var map = new Dictionary<int, RogueBlessTbl>();
                var list = new List<RogueBlessTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new RogueBlessTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                RogueBlessTblMap = map.ToImmutableDictionary();
                RogueBlessTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["RogueEquipmentTbl"];
                var fields = schema["RogueEquipmentTbl"];
                var map = new Dictionary<int, RogueEquipmentTbl>();
                var list = new List<RogueEquipmentTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new RogueEquipmentTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                RogueEquipmentTblMap = map.ToImmutableDictionary();
                RogueEquipmentTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["RogueExSkillTbl"];
                var fields = schema["RogueExSkillTbl"];
                var map = new Dictionary<int, RogueExSkillTbl>();
                var list = new List<RogueExSkillTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new RogueExSkillTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                RogueExSkillTblMap = map.ToImmutableDictionary();
                RogueExSkillTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["RogueExSkillEnhanceTbl"];
                var fields = schema["RogueExSkillEnhanceTbl"];
                var map = new Dictionary<int, RogueExSkillEnhanceTbl>();
                var list = new List<RogueExSkillEnhanceTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new RogueExSkillEnhanceTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                RogueExSkillEnhanceTblMap = map.ToImmutableDictionary();
                RogueExSkillEnhanceTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["TechTreeTbl"];
                var fields = schema["TechTreeTbl"];
                var map = new Dictionary<int, TechTreeTbl>();
                var list = new List<TechTreeTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new TechTreeTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                TechTreeTblMap = map.ToImmutableDictionary();
                TechTreeTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["MountTbl"];
                var fields = schema["MountTbl"];
                var map = new Dictionary<int, MountTbl>();
                var list = new List<MountTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new MountTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                MountTblMap = map.ToImmutableDictionary();
                MountTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["MountRankTbl"];
                var fields = schema["MountRankTbl"];
                var map = new Dictionary<int, MountRankTbl>();
                var list = new List<MountRankTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new MountRankTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                MountRankTblMap = map.ToImmutableDictionary();
                MountRankTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["MountPoolTbl"];
                var fields = schema["MountPoolTbl"];
                var map = new Dictionary<int, MountPoolTbl>();
                var list = new List<MountPoolTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new MountPoolTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                MountPoolTblMap = map.ToImmutableDictionary();
                MountPoolTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["MountPoolRewardTbl"];
                var fields = schema["MountPoolRewardTbl"];
                var map = new Dictionary<int, MountPoolRewardTbl>();
                var list = new List<MountPoolRewardTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new MountPoolRewardTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                MountPoolRewardTblMap = map.ToImmutableDictionary();
                MountPoolRewardTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["PlayerSkinTbl"];
                var fields = schema["PlayerSkinTbl"];
                var map = new Dictionary<int, PlayerSkinTbl>();
                var list = new List<PlayerSkinTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new PlayerSkinTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                PlayerSkinTblMap = map.ToImmutableDictionary();
                PlayerSkinTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["PlayerMountTbl"];
                var fields = schema["PlayerMountTbl"];
                var map = new Dictionary<int, PlayerMountTbl>();
                var list = new List<PlayerMountTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new PlayerMountTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                PlayerMountTblMap = map.ToImmutableDictionary();
                PlayerMountTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["BattleRogueBossTbl"];
                var fields = schema["BattleRogueBossTbl"];
                var map = new Dictionary<int, BattleRogueBossTbl>();
                var list = new List<BattleRogueBossTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new BattleRogueBossTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                BattleRogueBossTblMap = map.ToImmutableDictionary();
                BattleRogueBossTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["BattleRogueBossSkillTbl"];
                var fields = schema["BattleRogueBossSkillTbl"];
                var map = new Dictionary<int, BattleRogueBossSkillTbl>();
                var list = new List<BattleRogueBossSkillTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new BattleRogueBossSkillTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                BattleRogueBossSkillTblMap = map.ToImmutableDictionary();
                BattleRogueBossSkillTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["ChargeTbl"];
                var fields = schema["ChargeTbl"];
                var map = new Dictionary<int, ChargeTbl>();
                var list = new List<ChargeTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new ChargeTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                ChargeTblMap = map.ToImmutableDictionary();
                ChargeTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["ActivitiesTbl"];
                var fields = schema["ActivitiesTbl"];
                var map = new Dictionary<int, ActivitiesTbl>();
                var list = new List<ActivitiesTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new ActivitiesTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                ActivitiesTblMap = map.ToImmutableDictionary();
                ActivitiesTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["MetaTableExtendTbl"];
                var fields = schema["MetaTableExtendTbl"];
                var map = new Dictionary<int, MetaTableExtendTbl>();
                var list = new List<MetaTableExtendTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new MetaTableExtendTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                MetaTableExtendTblMap = map.ToImmutableDictionary();
                MetaTableExtendTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["EnumTbl"];
                var fields = schema["EnumTbl"];
                var map = new Dictionary<int, EnumTbl>();
                var list = new List<EnumTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new EnumTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                EnumTblMap = map.ToImmutableDictionary();
                EnumTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["UIBindTbl"];
                var fields = schema["UIBindTbl"];
                var map = new Dictionary<int, UIBindTbl>();
                var list = new List<UIBindTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new UIBindTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                UIBindTblMap = map.ToImmutableDictionary();
                UIBindTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["UIMainSceneTbl"];
                var fields = schema["UIMainSceneTbl"];
                var map = new Dictionary<int, UIMainSceneTbl>();
                var list = new List<UIMainSceneTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new UIMainSceneTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                UIMainSceneTblMap = map.ToImmutableDictionary();
                UIMainSceneTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["ClientLangTbl"];
                var fields = schema["ClientLangTbl"];
                var map = new Dictionary<int, ClientLangTbl>();
                var list = new List<ClientLangTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new ClientLangTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                ClientLangTblMap = map.ToImmutableDictionary();
                ClientLangTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["MissionKindTbl"];
                var fields = schema["MissionKindTbl"];
                var map = new Dictionary<int, MissionKindTbl>();
                var list = new List<MissionKindTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new MissionKindTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                MissionKindTblMap = map.ToImmutableDictionary();
                MissionKindTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["UIRedTipTbl"];
                var fields = schema["UIRedTipTbl"];
                var map = new Dictionary<int, UIRedTipTbl>();
                var list = new List<UIRedTipTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new UIRedTipTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                UIRedTipTblMap = map.ToImmutableDictionary();
                UIRedTipTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["BattlePropertyTbl"];
                var fields = schema["BattlePropertyTbl"];
                var map = new Dictionary<int, BattlePropertyTbl>();
                var list = new List<BattlePropertyTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new BattlePropertyTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                BattlePropertyTblMap = map.ToImmutableDictionary();
                BattlePropertyTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["ServerLangTbl"];
                var fields = schema["ServerLangTbl"];
                var map = new Dictionary<int, ServerLangTbl>();
                var list = new List<ServerLangTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new ServerLangTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                ServerLangTblMap = map.ToImmutableDictionary();
                ServerLangTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["ServerAnnouncementTbl"];
                var fields = schema["ServerAnnouncementTbl"];
                var map = new Dictionary<int, ServerAnnouncementTbl>();
                var list = new List<ServerAnnouncementTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new ServerAnnouncementTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                ServerAnnouncementTblMap = map.ToImmutableDictionary();
                ServerAnnouncementTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["ServerEmailTemplateTbl"];
                var fields = schema["ServerEmailTemplateTbl"];
                var map = new Dictionary<int, ServerEmailTemplateTbl>();
                var list = new List<ServerEmailTemplateTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new ServerEmailTemplateTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                ServerEmailTemplateTblMap = map.ToImmutableDictionary();
                ServerEmailTemplateTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["ServerGroupEmailTbl"];
                var fields = schema["ServerGroupEmailTbl"];
                var map = new Dictionary<int, ServerGroupEmailTbl>();
                var list = new List<ServerGroupEmailTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new ServerGroupEmailTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                ServerGroupEmailTblMap = map.ToImmutableDictionary();
                ServerGroupEmailTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["ServerCdKeyTbl"];
                var fields = schema["ServerCdKeyTbl"];
                var map = new Dictionary<int, ServerCdKeyTbl>();
                var list = new List<ServerCdKeyTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new ServerCdKeyTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                ServerCdKeyTblMap = map.ToImmutableDictionary();
                ServerCdKeyTblList = list.ToImmutableArray();
            }
            {
                var str = (string)json["ServerCdKeyOnceConfigTbl"];
                var fields = schema["ServerCdKeyOnceConfigTbl"];
                var map = new Dictionary<int, ServerCdKeyOnceConfigTbl>();
                var list = new List<ServerCdKeyOnceConfigTbl>();
                str.Split("\n").ForEach(row => {
                    var tbl = new ServerCdKeyOnceConfigTbl(row, fields.fields);
                    map.Add(tbl.Id, tbl);
                    list.Add(tbl);
                });
                ServerCdKeyOnceConfigTblMap = map.ToImmutableDictionary();
                ServerCdKeyOnceConfigTblList = list.ToImmutableArray();
            }

        }
        public readonly ImmutableDictionary<int, GameConfigTbl> GameConfigTblMap;
        public readonly ImmutableArray<GameConfigTbl> GameConfigTblList;
        public readonly ImmutableDictionary<int, ItemTbl> ItemTblMap;
        public readonly ImmutableArray<ItemTbl> ItemTblList;
        public readonly ImmutableDictionary<int, ChestTbl> ChestTblMap;
        public readonly ImmutableArray<ChestTbl> ChestTblList;
        public readonly ImmutableDictionary<int, HeroTbl> HeroTblMap;
        public readonly ImmutableArray<HeroTbl> HeroTblList;
        public readonly ImmutableDictionary<int, HeroRankBuffTbl> HeroRankBuffTblMap;
        public readonly ImmutableArray<HeroRankBuffTbl> HeroRankBuffTblList;
        public readonly ImmutableDictionary<int, HeroRankSpecialTbl> HeroRankSpecialTblMap;
        public readonly ImmutableArray<HeroRankSpecialTbl> HeroRankSpecialTblList;
        public readonly ImmutableDictionary<int, HeroRankPropertyTbl> HeroRankPropertyTblMap;
        public readonly ImmutableArray<HeroRankPropertyTbl> HeroRankPropertyTblList;
        public readonly ImmutableDictionary<int, HeroEquipmentTbl> HeroEquipmentTblMap;
        public readonly ImmutableArray<HeroEquipmentTbl> HeroEquipmentTblList;
        public readonly ImmutableDictionary<int, HeroSkillTbl> HeroSkillTblMap;
        public readonly ImmutableArray<HeroSkillTbl> HeroSkillTblList;
        public readonly ImmutableDictionary<int, HeroLevelTbl> HeroLevelTblMap;
        public readonly ImmutableArray<HeroLevelTbl> HeroLevelTblList;
        public readonly ImmutableDictionary<int, HeroRankTbl> HeroRankTblMap;
        public readonly ImmutableArray<HeroRankTbl> HeroRankTblList;
        public readonly ImmutableDictionary<int, HeroStarTbl> HeroStarTblMap;
        public readonly ImmutableArray<HeroStarTbl> HeroStarTblList;
        public readonly ImmutableDictionary<int, HeroEquipmentLevelTbl> HeroEquipmentLevelTblMap;
        public readonly ImmutableArray<HeroEquipmentLevelTbl> HeroEquipmentLevelTblList;
        public readonly ImmutableDictionary<int, HeroEquipmentRankTbl> HeroEquipmentRankTblMap;
        public readonly ImmutableArray<HeroEquipmentRankTbl> HeroEquipmentRankTblList;
        public readonly ImmutableDictionary<int, FacilityTbl> FacilityTblMap;
        public readonly ImmutableArray<FacilityTbl> FacilityTblList;
        public readonly ImmutableDictionary<int, FacilityLevelTbl> FacilityLevelTblMap;
        public readonly ImmutableArray<FacilityLevelTbl> FacilityLevelTblList;
        public readonly ImmutableDictionary<int, FacilityRankTbl> FacilityRankTblMap;
        public readonly ImmutableArray<FacilityRankTbl> FacilityRankTblList;
        public readonly ImmutableDictionary<int, FacilityHeroLevelBuffTbl> FacilityHeroLevelBuffTblMap;
        public readonly ImmutableArray<FacilityHeroLevelBuffTbl> FacilityHeroLevelBuffTblList;
        public readonly ImmutableDictionary<int, FacilityStarTbl> FacilityStarTblMap;
        public readonly ImmutableArray<FacilityStarTbl> FacilityStarTblList;
        public readonly ImmutableDictionary<int, FacilityBuffTbl> FacilityBuffTblMap;
        public readonly ImmutableArray<FacilityBuffTbl> FacilityBuffTblList;
        public readonly ImmutableDictionary<int, StageMapTbl> StageMapTblMap;
        public readonly ImmutableArray<StageMapTbl> StageMapTblList;
        public readonly ImmutableDictionary<int, StageTbl> StageTblMap;
        public readonly ImmutableArray<StageTbl> StageTblList;
        public readonly ImmutableDictionary<int, StageReputationShopTbl> StageReputationShopTblMap;
        public readonly ImmutableArray<StageReputationShopTbl> StageReputationShopTblList;
        public readonly ImmutableDictionary<int, StageAchievementTbl> StageAchievementTblMap;
        public readonly ImmutableArray<StageAchievementTbl> StageAchievementTblList;
        public readonly ImmutableDictionary<int, EquipmentMonsterTbl> EquipmentMonsterTblMap;
        public readonly ImmutableArray<EquipmentMonsterTbl> EquipmentMonsterTblList;
        public readonly ImmutableDictionary<int, MonsterWaveTbl> MonsterWaveTblMap;
        public readonly ImmutableArray<MonsterWaveTbl> MonsterWaveTblList;
        public readonly ImmutableDictionary<int, MonsterWaveDetailTbl> MonsterWaveDetailTblMap;
        public readonly ImmutableArray<MonsterWaveDetailTbl> MonsterWaveDetailTblList;
        public readonly ImmutableDictionary<int, MonsterTbl> MonsterTblMap;
        public readonly ImmutableArray<MonsterTbl> MonsterTblList;
        public readonly ImmutableDictionary<int, ShopTbl> ShopTblMap;
        public readonly ImmutableArray<ShopTbl> ShopTblList;
        public readonly ImmutableDictionary<int, PlayerLevelTbl> PlayerLevelTblMap;
        public readonly ImmutableArray<PlayerLevelTbl> PlayerLevelTblList;
        public readonly ImmutableDictionary<int, PlayerRankTbl> PlayerRankTblMap;
        public readonly ImmutableArray<PlayerRankTbl> PlayerRankTblList;
        public readonly ImmutableDictionary<int, PlayerMissionTbl> PlayerMissionTblMap;
        public readonly ImmutableArray<PlayerMissionTbl> PlayerMissionTblList;
        public readonly ImmutableDictionary<int, MainMissionTaskTbl> MainMissionTaskTblMap;
        public readonly ImmutableArray<MainMissionTaskTbl> MainMissionTaskTblList;
        public readonly ImmutableDictionary<int, MainMissionTbl> MainMissionTblMap;
        public readonly ImmutableArray<MainMissionTbl> MainMissionTblList;
        public readonly ImmutableDictionary<int, TowerChallengeTbl> TowerChallengeTblMap;
        public readonly ImmutableArray<TowerChallengeTbl> TowerChallengeTblList;
        public readonly ImmutableDictionary<int, TowerLevelRewardTbl> TowerLevelRewardTblMap;
        public readonly ImmutableArray<TowerLevelRewardTbl> TowerLevelRewardTblList;
        public readonly ImmutableDictionary<int, ArenaRewardTbl> ArenaRewardTblMap;
        public readonly ImmutableArray<ArenaRewardTbl> ArenaRewardTblList;
        public readonly ImmutableDictionary<int, BattleSkillTbl> BattleSkillTblMap;
        public readonly ImmutableArray<BattleSkillTbl> BattleSkillTblList;
        public readonly ImmutableDictionary<int, CarTbl> CarTblMap;
        public readonly ImmutableArray<CarTbl> CarTblList;
        public readonly ImmutableDictionary<int, CarSkillTbl> CarSkillTblMap;
        public readonly ImmutableArray<CarSkillTbl> CarSkillTblList;
        public readonly ImmutableDictionary<int, CarLevelTbl> CarLevelTblMap;
        public readonly ImmutableArray<CarLevelTbl> CarLevelTblList;
        public readonly ImmutableDictionary<int, CarEquipmentTbl> CarEquipmentTblMap;
        public readonly ImmutableArray<CarEquipmentTbl> CarEquipmentTblList;
        public readonly ImmutableDictionary<int, CarEquipmentLevelTbl> CarEquipmentLevelTblMap;
        public readonly ImmutableArray<CarEquipmentLevelTbl> CarEquipmentLevelTblList;
        public readonly ImmutableDictionary<int, CardPoolTbl> CardPoolTblMap;
        public readonly ImmutableArray<CardPoolTbl> CardPoolTblList;
        public readonly ImmutableDictionary<int, CardPoolLevelTbl> CardPoolLevelTblMap;
        public readonly ImmutableArray<CardPoolLevelTbl> CardPoolLevelTblList;
        public readonly ImmutableDictionary<int, SpineAttackAnimationInfoTbl> SpineAttackAnimationInfoTblMap;
        public readonly ImmutableArray<SpineAttackAnimationInfoTbl> SpineAttackAnimationInfoTblList;
        public readonly ImmutableDictionary<int, SpineInfoTbl> SpineInfoTblMap;
        public readonly ImmutableArray<SpineInfoTbl> SpineInfoTblList;
        public readonly ImmutableDictionary<int, HeroFormationTbl> HeroFormationTblMap;
        public readonly ImmutableArray<HeroFormationTbl> HeroFormationTblList;
        public readonly ImmutableDictionary<int, RelationBuffTbl> RelationBuffTblMap;
        public readonly ImmutableArray<RelationBuffTbl> RelationBuffTblList;
        public readonly ImmutableDictionary<int, FacilityTunnelTbl> FacilityTunnelTblMap;
        public readonly ImmutableArray<FacilityTunnelTbl> FacilityTunnelTblList;
        public readonly ImmutableDictionary<int, FacilityPositionTbl> FacilityPositionTblMap;
        public readonly ImmutableArray<FacilityPositionTbl> FacilityPositionTblList;
        public readonly ImmutableDictionary<int, EnemyBattleTbl> EnemyBattleTblMap;
        public readonly ImmutableArray<EnemyBattleTbl> EnemyBattleTblList;
        public readonly ImmutableDictionary<int, MineRewardTbl> MineRewardTblMap;
        public readonly ImmutableArray<MineRewardTbl> MineRewardTblList;
        public readonly ImmutableDictionary<int, MineMapAreaTbl> MineMapAreaTblMap;
        public readonly ImmutableArray<MineMapAreaTbl> MineMapAreaTblList;
        public readonly ImmutableDictionary<int, MineBattleMapTbl> MineBattleMapTblMap;
        public readonly ImmutableArray<MineBattleMapTbl> MineBattleMapTblList;
        public readonly ImmutableDictionary<int, GiftPackTbl> GiftPackTblMap;
        public readonly ImmutableArray<GiftPackTbl> GiftPackTblList;
        public readonly ImmutableDictionary<int, PackRuleTbl> PackRuleTblMap;
        public readonly ImmutableArray<PackRuleTbl> PackRuleTblList;
        public readonly ImmutableDictionary<int, DialogueTbl> DialogueTblMap;
        public readonly ImmutableArray<DialogueTbl> DialogueTblList;
        public readonly ImmutableDictionary<int, DialogueContentTbl> DialogueContentTblMap;
        public readonly ImmutableArray<DialogueContentTbl> DialogueContentTblList;
        public readonly ImmutableDictionary<int, GuideTbl> GuideTblMap;
        public readonly ImmutableArray<GuideTbl> GuideTblList;
        public readonly ImmutableDictionary<int, GuideContentTbl> GuideContentTblMap;
        public readonly ImmutableArray<GuideContentTbl> GuideContentTblList;
        public readonly ImmutableDictionary<int, HeroCollectionTbl> HeroCollectionTblMap;
        public readonly ImmutableArray<HeroCollectionTbl> HeroCollectionTblList;
        public readonly ImmutableDictionary<int, HeroCollectionPointTbl> HeroCollectionPointTblMap;
        public readonly ImmutableArray<HeroCollectionPointTbl> HeroCollectionPointTblList;
        public readonly ImmutableDictionary<int, HeroCollectionLevelRewardTbl> HeroCollectionLevelRewardTblMap;
        public readonly ImmutableArray<HeroCollectionLevelRewardTbl> HeroCollectionLevelRewardTblList;
        public readonly ImmutableDictionary<int, MusicInfoTbl> MusicInfoTblMap;
        public readonly ImmutableArray<MusicInfoTbl> MusicInfoTblList;
        public readonly ImmutableDictionary<int, BattleSceneInfoTbl> BattleSceneInfoTblMap;
        public readonly ImmutableArray<BattleSceneInfoTbl> BattleSceneInfoTblList;
        public readonly ImmutableDictionary<int, BattleRoadInfoTbl> BattleRoadInfoTblMap;
        public readonly ImmutableArray<BattleRoadInfoTbl> BattleRoadInfoTblList;
        public readonly ImmutableDictionary<int, ClearAdTbl> ClearAdTblMap;
        public readonly ImmutableArray<ClearAdTbl> ClearAdTblList;
        public readonly ImmutableDictionary<int, MagicStaffTbl> MagicStaffTblMap;
        public readonly ImmutableArray<MagicStaffTbl> MagicStaffTblList;
        public readonly ImmutableDictionary<int, SystemUnlockTbl> SystemUnlockTblMap;
        public readonly ImmutableArray<SystemUnlockTbl> SystemUnlockTblList;
        public readonly ImmutableDictionary<int, WeakGuideTbl> WeakGuideTblMap;
        public readonly ImmutableArray<WeakGuideTbl> WeakGuideTblList;
        public readonly ImmutableDictionary<int, WeakGuideContentTbl> WeakGuideContentTblMap;
        public readonly ImmutableArray<WeakGuideContentTbl> WeakGuideContentTblList;
        public readonly ImmutableDictionary<int, TurntableTbl> TurntableTblMap;
        public readonly ImmutableArray<TurntableTbl> TurntableTblList;
        public readonly ImmutableDictionary<int, ChestItemPoolTbl> ChestItemPoolTblMap;
        public readonly ImmutableArray<ChestItemPoolTbl> ChestItemPoolTblList;
        public readonly ImmutableDictionary<int, OptionalChestPoolTbl> OptionalChestPoolTblMap;
        public readonly ImmutableArray<OptionalChestPoolTbl> OptionalChestPoolTblList;
        public readonly ImmutableDictionary<int, FirstPackageTbl> FirstPackageTblMap;
        public readonly ImmutableArray<FirstPackageTbl> FirstPackageTblList;
        public readonly ImmutableDictionary<int, MonthCardTbl> MonthCardTblMap;
        public readonly ImmutableArray<MonthCardTbl> MonthCardTblList;
        public readonly ImmutableDictionary<int, CaptainMissionTbl> CaptainMissionTblMap;
        public readonly ImmutableArray<CaptainMissionTbl> CaptainMissionTblList;
        public readonly ImmutableDictionary<int, CaptainBuffTbl> CaptainBuffTblMap;
        public readonly ImmutableArray<CaptainBuffTbl> CaptainBuffTblList;
        public readonly ImmutableDictionary<int, WarOrderTbl> WarOrderTblMap;
        public readonly ImmutableArray<WarOrderTbl> WarOrderTblList;
        public readonly ImmutableDictionary<int, WarOrderRewardTbl> WarOrderRewardTblMap;
        public readonly ImmutableArray<WarOrderRewardTbl> WarOrderRewardTblList;
        public readonly ImmutableDictionary<int, RuleTextTbl> RuleTextTblMap;
        public readonly ImmutableArray<RuleTextTbl> RuleTextTblList;
        public readonly ImmutableDictionary<int, RankMissionTbl> RankMissionTblMap;
        public readonly ImmutableArray<RankMissionTbl> RankMissionTblList;
        public readonly ImmutableDictionary<int, RankPackTbl> RankPackTblMap;
        public readonly ImmutableArray<RankPackTbl> RankPackTblList;
        public readonly ImmutableDictionary<int, RankRewardTbl> RankRewardTblMap;
        public readonly ImmutableArray<RankRewardTbl> RankRewardTblList;
        public readonly ImmutableDictionary<int, VideoGroupPurchaseTbl> VideoGroupPurchaseTblMap;
        public readonly ImmutableArray<VideoGroupPurchaseTbl> VideoGroupPurchaseTblList;
        public readonly ImmutableDictionary<int, BanquetLevelTbl> BanquetLevelTblMap;
        public readonly ImmutableArray<BanquetLevelTbl> BanquetLevelTblList;
        public readonly ImmutableDictionary<int, BanquetPointRewardTbl> BanquetPointRewardTblMap;
        public readonly ImmutableArray<BanquetPointRewardTbl> BanquetPointRewardTblList;
        public readonly ImmutableDictionary<int, BanquetMissionTbl> BanquetMissionTblMap;
        public readonly ImmutableArray<BanquetMissionTbl> BanquetMissionTblList;
        public readonly ImmutableDictionary<int, BanquetShopTbl> BanquetShopTblMap;
        public readonly ImmutableArray<BanquetShopTbl> BanquetShopTblList;
        public readonly ImmutableDictionary<int, BanquetPackTbl> BanquetPackTblMap;
        public readonly ImmutableArray<BanquetPackTbl> BanquetPackTblList;
        public readonly ImmutableDictionary<int, BanquetGroupTbl> BanquetGroupTblMap;
        public readonly ImmutableArray<BanquetGroupTbl> BanquetGroupTblList;
        public readonly ImmutableDictionary<int, TowerStrengthenTbl> TowerStrengthenTblMap;
        public readonly ImmutableArray<TowerStrengthenTbl> TowerStrengthenTblList;
        public readonly ImmutableDictionary<int, TowerWashTbl> TowerWashTblMap;
        public readonly ImmutableArray<TowerWashTbl> TowerWashTblList;
        public readonly ImmutableDictionary<int, TowerWashRareTbl> TowerWashRareTblMap;
        public readonly ImmutableArray<TowerWashRareTbl> TowerWashRareTblList;
        public readonly ImmutableDictionary<int, EquipmentTbl> EquipmentTblMap;
        public readonly ImmutableArray<EquipmentTbl> EquipmentTblList;
        public readonly ImmutableDictionary<int, EquipmentStatTbl> EquipmentStatTblMap;
        public readonly ImmutableArray<EquipmentStatTbl> EquipmentStatTblList;
        public readonly ImmutableDictionary<int, StoneLevelTbl> StoneLevelTblMap;
        public readonly ImmutableArray<StoneLevelTbl> StoneLevelTblList;
        public readonly ImmutableDictionary<int, PlayerSkillTbl> PlayerSkillTblMap;
        public readonly ImmutableArray<PlayerSkillTbl> PlayerSkillTblList;
        public readonly ImmutableDictionary<int, PlayerSkillLevelTbl> PlayerSkillLevelTblMap;
        public readonly ImmutableArray<PlayerSkillLevelTbl> PlayerSkillLevelTblList;
        public readonly ImmutableDictionary<int, PlayerSkillTalentTbl> PlayerSkillTalentTblMap;
        public readonly ImmutableArray<PlayerSkillTalentTbl> PlayerSkillTalentTblList;
        public readonly ImmutableDictionary<int, PetTbl> PetTblMap;
        public readonly ImmutableArray<PetTbl> PetTblList;
        public readonly ImmutableDictionary<int, PetLevelTbl> PetLevelTblMap;
        public readonly ImmutableArray<PetLevelTbl> PetLevelTblList;
        public readonly ImmutableDictionary<int, FossilTbl> FossilTblMap;
        public readonly ImmutableArray<FossilTbl> FossilTblList;
        public readonly ImmutableDictionary<int, FossilComboTbl> FossilComboTblMap;
        public readonly ImmutableArray<FossilComboTbl> FossilComboTblList;
        public readonly ImmutableDictionary<int, ManorFacilityTbl> ManorFacilityTblMap;
        public readonly ImmutableArray<ManorFacilityTbl> ManorFacilityTblList;
        public readonly ImmutableDictionary<int, ManorDecorationTbl> ManorDecorationTblMap;
        public readonly ImmutableArray<ManorDecorationTbl> ManorDecorationTblList;
        public readonly ImmutableDictionary<int, ManorPlantTbl> ManorPlantTblMap;
        public readonly ImmutableArray<ManorPlantTbl> ManorPlantTblList;
        public readonly ImmutableDictionary<int, JobChangeTbl> JobChangeTblMap;
        public readonly ImmutableArray<JobChangeTbl> JobChangeTblList;
        public readonly ImmutableDictionary<int, JobSkillTbl> JobSkillTblMap;
        public readonly ImmutableArray<JobSkillTbl> JobSkillTblList;
        public readonly ImmutableDictionary<int, JobTalentTbl> JobTalentTblMap;
        public readonly ImmutableArray<JobTalentTbl> JobTalentTblList;
        public readonly ImmutableDictionary<int, JobTalentLevelTbl> JobTalentLevelTblMap;
        public readonly ImmutableArray<JobTalentLevelTbl> JobTalentLevelTblList;
        public readonly ImmutableDictionary<int, DamageChallengeTbl> DamageChallengeTblMap;
        public readonly ImmutableArray<DamageChallengeTbl> DamageChallengeTblList;
        public readonly ImmutableDictionary<int, DamageMonsterTbl> DamageMonsterTblMap;
        public readonly ImmutableArray<DamageMonsterTbl> DamageMonsterTblList;
        public readonly ImmutableDictionary<int, HeroSoulTbl> HeroSoulTblMap;
        public readonly ImmutableArray<HeroSoulTbl> HeroSoulTblList;
        public readonly ImmutableDictionary<int, HeroSoulValueTbl> HeroSoulValueTblMap;
        public readonly ImmutableArray<HeroSoulValueTbl> HeroSoulValueTblList;
        public readonly ImmutableDictionary<int, HeroSoulLevelTbl> HeroSoulLevelTblMap;
        public readonly ImmutableArray<HeroSoulLevelTbl> HeroSoulLevelTblList;
        public readonly ImmutableDictionary<int, HeroSoulBreakTbl> HeroSoulBreakTblMap;
        public readonly ImmutableArray<HeroSoulBreakTbl> HeroSoulBreakTblList;
        public readonly ImmutableDictionary<int, DefendTowerTbl> DefendTowerTblMap;
        public readonly ImmutableArray<DefendTowerTbl> DefendTowerTblList;
        public readonly ImmutableDictionary<int, InfiniteBattleTbl> InfiniteBattleTblMap;
        public readonly ImmutableArray<InfiniteBattleTbl> InfiniteBattleTblList;
        public readonly ImmutableDictionary<int, RogueSkillTbl> RogueSkillTblMap;
        public readonly ImmutableArray<RogueSkillTbl> RogueSkillTblList;
        public readonly ImmutableDictionary<int, RogueSkillDetailTbl> RogueSkillDetailTblMap;
        public readonly ImmutableArray<RogueSkillDetailTbl> RogueSkillDetailTblList;
        public readonly ImmutableDictionary<int, RogueSkillEnhanceTbl> RogueSkillEnhanceTblMap;
        public readonly ImmutableArray<RogueSkillEnhanceTbl> RogueSkillEnhanceTblList;
        public readonly ImmutableDictionary<int, RogueBlessTbl> RogueBlessTblMap;
        public readonly ImmutableArray<RogueBlessTbl> RogueBlessTblList;
        public readonly ImmutableDictionary<int, RogueEquipmentTbl> RogueEquipmentTblMap;
        public readonly ImmutableArray<RogueEquipmentTbl> RogueEquipmentTblList;
        public readonly ImmutableDictionary<int, RogueExSkillTbl> RogueExSkillTblMap;
        public readonly ImmutableArray<RogueExSkillTbl> RogueExSkillTblList;
        public readonly ImmutableDictionary<int, RogueExSkillEnhanceTbl> RogueExSkillEnhanceTblMap;
        public readonly ImmutableArray<RogueExSkillEnhanceTbl> RogueExSkillEnhanceTblList;
        public readonly ImmutableDictionary<int, TechTreeTbl> TechTreeTblMap;
        public readonly ImmutableArray<TechTreeTbl> TechTreeTblList;
        public readonly ImmutableDictionary<int, MountTbl> MountTblMap;
        public readonly ImmutableArray<MountTbl> MountTblList;
        public readonly ImmutableDictionary<int, MountRankTbl> MountRankTblMap;
        public readonly ImmutableArray<MountRankTbl> MountRankTblList;
        public readonly ImmutableDictionary<int, MountPoolTbl> MountPoolTblMap;
        public readonly ImmutableArray<MountPoolTbl> MountPoolTblList;
        public readonly ImmutableDictionary<int, MountPoolRewardTbl> MountPoolRewardTblMap;
        public readonly ImmutableArray<MountPoolRewardTbl> MountPoolRewardTblList;
        public readonly ImmutableDictionary<int, PlayerSkinTbl> PlayerSkinTblMap;
        public readonly ImmutableArray<PlayerSkinTbl> PlayerSkinTblList;
        public readonly ImmutableDictionary<int, PlayerMountTbl> PlayerMountTblMap;
        public readonly ImmutableArray<PlayerMountTbl> PlayerMountTblList;
        public readonly ImmutableDictionary<int, BattleRogueBossTbl> BattleRogueBossTblMap;
        public readonly ImmutableArray<BattleRogueBossTbl> BattleRogueBossTblList;
        public readonly ImmutableDictionary<int, BattleRogueBossSkillTbl> BattleRogueBossSkillTblMap;
        public readonly ImmutableArray<BattleRogueBossSkillTbl> BattleRogueBossSkillTblList;
        public readonly ImmutableDictionary<int, ChargeTbl> ChargeTblMap;
        public readonly ImmutableArray<ChargeTbl> ChargeTblList;
        public readonly ImmutableDictionary<int, ActivitiesTbl> ActivitiesTblMap;
        public readonly ImmutableArray<ActivitiesTbl> ActivitiesTblList;
        public readonly ImmutableDictionary<int, MetaTableExtendTbl> MetaTableExtendTblMap;
        public readonly ImmutableArray<MetaTableExtendTbl> MetaTableExtendTblList;
        public readonly ImmutableDictionary<int, EnumTbl> EnumTblMap;
        public readonly ImmutableArray<EnumTbl> EnumTblList;
        public readonly ImmutableDictionary<int, UIBindTbl> UIBindTblMap;
        public readonly ImmutableArray<UIBindTbl> UIBindTblList;
        public readonly ImmutableDictionary<int, UIMainSceneTbl> UIMainSceneTblMap;
        public readonly ImmutableArray<UIMainSceneTbl> UIMainSceneTblList;
        public readonly ImmutableDictionary<int, ClientLangTbl> ClientLangTblMap;
        public readonly ImmutableArray<ClientLangTbl> ClientLangTblList;
        public readonly ImmutableDictionary<int, MissionKindTbl> MissionKindTblMap;
        public readonly ImmutableArray<MissionKindTbl> MissionKindTblList;
        public readonly ImmutableDictionary<int, UIRedTipTbl> UIRedTipTblMap;
        public readonly ImmutableArray<UIRedTipTbl> UIRedTipTblList;
        public readonly ImmutableDictionary<int, BattlePropertyTbl> BattlePropertyTblMap;
        public readonly ImmutableArray<BattlePropertyTbl> BattlePropertyTblList;
        public readonly ImmutableDictionary<int, ServerLangTbl> ServerLangTblMap;
        public readonly ImmutableArray<ServerLangTbl> ServerLangTblList;
        public readonly ImmutableDictionary<int, ServerAnnouncementTbl> ServerAnnouncementTblMap;
        public readonly ImmutableArray<ServerAnnouncementTbl> ServerAnnouncementTblList;
        public readonly ImmutableDictionary<int, ServerEmailTemplateTbl> ServerEmailTemplateTblMap;
        public readonly ImmutableArray<ServerEmailTemplateTbl> ServerEmailTemplateTblList;
        public readonly ImmutableDictionary<int, ServerGroupEmailTbl> ServerGroupEmailTblMap;
        public readonly ImmutableArray<ServerGroupEmailTbl> ServerGroupEmailTblList;
        public readonly ImmutableDictionary<int, ServerCdKeyTbl> ServerCdKeyTblMap;
        public readonly ImmutableArray<ServerCdKeyTbl> ServerCdKeyTblList;
        public readonly ImmutableDictionary<int, ServerCdKeyOnceConfigTbl> ServerCdKeyOnceConfigTblMap;
        public readonly ImmutableArray<ServerCdKeyOnceConfigTbl> ServerCdKeyOnceConfigTblList;
    }


    internal class TableTool
    {
        public static int ToInt(string col) { return col == "?" ? -1 : int.Parse(col); }
        public static long ToLong(string col) { return col == "?" ? -1 : long.Parse(col); }
        public static double ToDouble(string col) { return col == "?" ? -1 : double.Parse(col); }
        public static string ToString(string col) { return col == "?" ? "" : col; }
        public static ImmutableArray<int> ToIntArr(string col) { return col == "?" ? Array.Empty<int>().ToImmutableArray() : col.Split("|").Select(c => int.Parse(c)).ToImmutableArray(); }
        public static ImmutableArray<long> ToLongArr(string col) { return col == "?" ? Array.Empty<long>().ToImmutableArray() : col.Split("|").Select(c => long.Parse(c)).ToImmutableArray(); }
        public static ImmutableArray<double> ToDoubleArr(string col) { return col == "?" ? Array.Empty<double>().ToImmutableArray() : col.Split("|").Select(c => double.Parse(c)).ToImmutableArray(); }
        public static ImmutableArray<string> ToStringArr(string col) { return col == "?" ? Array.Empty<string>().ToImmutableArray() : col.Split("|").ToImmutableArray(); }
        public static ImmutableArray<ImmutableArray<int>> ToIntMatrix(string col)
        {
            return col == "?" ? Array.Empty<ImmutableArray<int>>().ToImmutableArray() : col.Split("|")
                .Select(arr =>
                {
                    return arr.Split(",").Select(c => int.Parse(c)).ToImmutableArray();
                }).ToImmutableArray();
        }
        public static ImmutableArray<ImmutableArray<long>> ToLongMatrix(string col)
        {
            return col == "?" ? Array.Empty<ImmutableArray<long>>().ToImmutableArray() : col.Split("|")
                .Select(arr =>
                {
                    return arr.Split(",").Select(c => long.Parse(c)).ToImmutableArray();
                }).ToImmutableArray();
        }
        public static ImmutableArray<ImmutableArray<double>> ToDoubleMatrix(string col)
        {
            return col == "?" ? Array.Empty<ImmutableArray<double>>().ToImmutableArray() : col.Split("|")
                .Select(arr =>
                {
                    return arr.Split(",").Select(c => double.Parse(c)).ToImmutableArray();
                }).ToImmutableArray();
        }
        public static ImmutableArray<ImmutableArray<string>> ToStringeMatrix(string col)
        {
            return col == "?" ? Array.Empty<ImmutableArray<string>>().ToImmutableArray() : col.Split("|")
                .Select(arr =>
                {
                    return arr.Split(",").ToImmutableArray();
                }).ToImmutableArray();
        }
    }
    public interface BaseMissionTbl
    {
        /** 主键 */
        public int Id {get;}
        /** 任务类型 */
        public int Kind {get;}
        /** 任务需求 */
        public ImmutableArray<int> Require {get;}
        /** 任务参数 */
        public ImmutableArray<int> Param {get;}
        /** 任务奖励 */
        public ImmutableArray<ImmutableArray<long>> Reward {get;}
        /** 任务最大阶段数 */
        public int Stage {get;}

    }
    public class GameConfigTbl
    {
        /** 主键，可以随便改 */
        public int Id {get;}
        /** 配置说明 */
        public string Tip {get;}
        /** 配置值 */
        public ImmutableArray<string> Config {get;}
        /** 配置路径（程序配置，策划不要修改） */
        public string ConfigPath {get;}
        /** 转换器（程序配置，策划不要修改） */
        public string Adaptor {get;}

        public GameConfigTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Tip=TableTool.ToString(cols[Array.IndexOf(fields, "tip")]);
			Config=TableTool.ToStringArr(cols[Array.IndexOf(fields, "config")]);
			ConfigPath=TableTool.ToString(cols[Array.IndexOf(fields, "configPath")]);
			Adaptor=TableTool.ToString(cols[Array.IndexOf(fields, "adaptor")]);
        }
    }
    public class ItemTbl
    {
        /** 唯一id（不可修改） */
        public int Id {get;}
        /** 物品名称 */
        public string Name {get;}
        /** 物品类型 */
        public int Kind {get;}
        /** 品质 */
        public int Quality {get;}
        /** 图片资源 */
        public string Img {get;}
        /** 物品描述 */
        public string Description {get;}

        public ItemTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Name=TableTool.ToString(cols[Array.IndexOf(fields, "name")]);
			Kind=TableTool.ToInt(cols[Array.IndexOf(fields, "kind")]);
			Quality=TableTool.ToInt(cols[Array.IndexOf(fields, "quality")]);
			Img=TableTool.ToString(cols[Array.IndexOf(fields, "img")]);
			Description=TableTool.ToString(cols[Array.IndexOf(fields, "description")]);
        }
    }
    public class ChestTbl
    {
        /** 跟物品表中的宝箱id对应 */
        public int Id {get;}
        /** 宝箱产出 */
        public ImmutableArray<ImmutableArray<int>> Reward {get;}

        public ChestTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Reward=TableTool.ToIntMatrix(cols[Array.IndexOf(fields, "reward")]);
        }
    }
    public class HeroTbl
    {
        /** 唯一id */
        public int Id {get;}
        /** 品质 */
        public int Quality {get;}
        /** 英雄职业 */
        public string Kind {get;}
        /** 图片资源 */
        public string Img {get;}
        /** 英雄名称 */
        public string Name {get;}
        /** 英雄描述 */
        public string Description {get;}
        /** 攻击 */
        public string Attack {get;}
        /** 防御 */
        public string Armor {get;}
        /** 生命 */
        public string MaxHp {get;}
        /** 普攻间隔(毫秒) */
        public int NormalAttackInterval {get;}
        /** 普攻范围(像素) */
        public int NormalAttackRange {get;}
        /** 移动速度（像素/秒） */
        public int MoveSpeed {get;}
        /** 角色碎片 */
        public int Frag {get;}
        /** 普攻 */
        public int NormalAttack {get;}
        /** 主动技能 */
        public int MainSkill {get;}
        /** 技能范围 */
        public int SkillRange {get;}

        public HeroTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Quality=TableTool.ToInt(cols[Array.IndexOf(fields, "quality")]);
			Kind=TableTool.ToString(cols[Array.IndexOf(fields, "kind")]);
			Img=TableTool.ToString(cols[Array.IndexOf(fields, "img")]);
			Name=TableTool.ToString(cols[Array.IndexOf(fields, "name")]);
			Description=TableTool.ToString(cols[Array.IndexOf(fields, "description")]);
			Attack=TableTool.ToString(cols[Array.IndexOf(fields, "attack")]);
			Armor=TableTool.ToString(cols[Array.IndexOf(fields, "armor")]);
			MaxHp=TableTool.ToString(cols[Array.IndexOf(fields, "maxHp")]);
			NormalAttackInterval=TableTool.ToInt(cols[Array.IndexOf(fields, "normalAttackInterval")]);
			NormalAttackRange=TableTool.ToInt(cols[Array.IndexOf(fields, "normalAttackRange")]);
			MoveSpeed=TableTool.ToInt(cols[Array.IndexOf(fields, "moveSpeed")]);
			Frag=TableTool.ToInt(cols[Array.IndexOf(fields, "frag")]);
			NormalAttack=TableTool.ToInt(cols[Array.IndexOf(fields, "normalAttack")]);
			MainSkill=TableTool.ToInt(cols[Array.IndexOf(fields, "mainSkill")]);
			SkillRange=TableTool.ToInt(cols[Array.IndexOf(fields, "skillRange")]);
        }
    }
    public class HeroRankBuffTbl
    {
        /** 不读 */
        public int Id {get;}
        /** 职业 */
        public string Kind {get;}
        /** 阶数 */
        public int Rank {get;}
        /** 绿卡 */
        public ImmutableArray<ImmutableArray<string>> Quality0 {get;}
        /** 蓝卡 */
        public ImmutableArray<ImmutableArray<string>> Quality1 {get;}
        /** 紫卡 */
        public ImmutableArray<ImmutableArray<string>> Quality2 {get;}
        /** 橙卡 */
        public ImmutableArray<ImmutableArray<string>> Quality3 {get;}
        /** 红卡 */
        public ImmutableArray<ImmutableArray<string>> Quality4 {get;}
        /** 战斗技能 */
        public ImmutableArray<int> BattleSkill {get;}
        /** 描述（有填写描述优先显示描述，没有则按属性加成显示） */
        public string Description {get;}

        public HeroRankBuffTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Kind=TableTool.ToString(cols[Array.IndexOf(fields, "kind")]);
			Rank=TableTool.ToInt(cols[Array.IndexOf(fields, "rank")]);
			Quality0=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "quality0")]);
			Quality1=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "quality1")]);
			Quality2=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "quality2")]);
			Quality3=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "quality3")]);
			Quality4=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "quality4")]);
			BattleSkill=TableTool.ToIntArr(cols[Array.IndexOf(fields, "battleSkill")]);
			Description=TableTool.ToString(cols[Array.IndexOf(fields, "description")]);
        }
    }
    public class HeroRankSpecialTbl
    {
        /** 不读 */
        public int Id {get;}
        /** 英雄id */
        public int HeroId {get;}
        /** 阶数 */
        public int Rank {get;}
        /** 属性 */
        public ImmutableArray<ImmutableArray<string>> Property {get;}
        /** 战斗技能 */
        public ImmutableArray<int> BattleSkill {get;}
        /** 描述（有填写描述优先显示描述，没有则按属性加成显示） */
        public string Description {get;}

        public HeroRankSpecialTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			HeroId=TableTool.ToInt(cols[Array.IndexOf(fields, "heroId")]);
			Rank=TableTool.ToInt(cols[Array.IndexOf(fields, "rank")]);
			Property=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "property")]);
			BattleSkill=TableTool.ToIntArr(cols[Array.IndexOf(fields, "battleSkill")]);
			Description=TableTool.ToString(cols[Array.IndexOf(fields, "description")]);
        }
    }
    public class HeroRankPropertyTbl
    {
        /** 不读 */
        public int Id {get;}
        /** 品质 */
        public int Quality {get;}
        /** 阶数 */
        public int Rank {get;}
        /** 攻击 */
        public int Attack {get;}
        /** 防御 */
        public int Armor {get;}
        /** 生命值 */
        public int MaxHp {get;}

        public HeroRankPropertyTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Quality=TableTool.ToInt(cols[Array.IndexOf(fields, "quality")]);
			Rank=TableTool.ToInt(cols[Array.IndexOf(fields, "rank")]);
			Attack=TableTool.ToInt(cols[Array.IndexOf(fields, "attack")]);
			Armor=TableTool.ToInt(cols[Array.IndexOf(fields, "armor")]);
			MaxHp=TableTool.ToInt(cols[Array.IndexOf(fields, "maxHp")]);
        }
    }
    public class HeroEquipmentTbl
    {
        /** 唯一id（不可修改） */
        public int Id {get;}
        /** 装备名称 */
        public string Name {get;}
        /** 品质 */
        public int Quality {get;}
        /** 部位 */
        public int Part {get;}
        /** 图片资源 */
        public string Img {get;}
        /** 装备描述 */
        public string Description {get;}
        /** 属性 */
        public ImmutableArray<ImmutableArray<string>> Property {get;}
        /** 突破属性 */
        public ImmutableArray<ImmutableArray<string>> RankProperty {get;}

        public HeroEquipmentTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Name=TableTool.ToString(cols[Array.IndexOf(fields, "name")]);
			Quality=TableTool.ToInt(cols[Array.IndexOf(fields, "quality")]);
			Part=TableTool.ToInt(cols[Array.IndexOf(fields, "part")]);
			Img=TableTool.ToString(cols[Array.IndexOf(fields, "img")]);
			Description=TableTool.ToString(cols[Array.IndexOf(fields, "description")]);
			Property=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "property")]);
			RankProperty=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "rankProperty")]);
        }
    }
    public class HeroSkillTbl
    {
        /** 唯一id（不可修改，保持和英雄id相同） */
        public int Id {get;}
        /** 品质 */
        public int Quality {get;}
        /** 技能名称 */
        public string Name {get;}
        /** 图片资源 */
        public string Img {get;}
        /** 技能描述 */
        public string Description {get;}
        /** 战斗技能 */
        public ImmutableArray<int> BattleSkill {get;}
        /** 技能描述参数 */
        public ImmutableArray<ImmutableArray<string>> DescriptionParam {get;}

        public HeroSkillTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Quality=TableTool.ToInt(cols[Array.IndexOf(fields, "quality")]);
			Name=TableTool.ToString(cols[Array.IndexOf(fields, "name")]);
			Img=TableTool.ToString(cols[Array.IndexOf(fields, "img")]);
			Description=TableTool.ToString(cols[Array.IndexOf(fields, "description")]);
			BattleSkill=TableTool.ToIntArr(cols[Array.IndexOf(fields, "battleSkill")]);
			DescriptionParam=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "descriptionParam")]);
        }
    }
    public class HeroLevelTbl
    {
        /** 主键，可修改 */
        public int Id {get;}
        /** 英雄等级 */
        public ImmutableArray<int> Level {get;}
        /** 升级经验值 */
        public string Require {get;}
        /** 金币消耗 */
        public string CoinCost {get;}

        public HeroLevelTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Level=TableTool.ToIntArr(cols[Array.IndexOf(fields, "level")]);
			Require=TableTool.ToString(cols[Array.IndexOf(fields, "require")]);
			CoinCost=TableTool.ToString(cols[Array.IndexOf(fields, "coinCost")]);
        }
    }
    public class HeroRankTbl
    {
        /** 主键，可修改 */
        public int Id {get;}
        /** 英雄突破阶数 */
        public int Level {get;}
        /** 升阶需求突破书 */
        public int Require {get;}
        /** 金币消耗 */
        public int CoinCost {get;}

        public HeroRankTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Level=TableTool.ToInt(cols[Array.IndexOf(fields, "level")]);
			Require=TableTool.ToInt(cols[Array.IndexOf(fields, "require")]);
			CoinCost=TableTool.ToInt(cols[Array.IndexOf(fields, "coinCost")]);
        }
    }
    public class HeroStarTbl
    {
        /** 主键，可修改 */
        public int Id {get;}
        /** 英雄星级 */
        public int Level {get;}
        /** 碎片消耗 */
        public int FragCost {get;}
        /** 金币消耗 */
        public int CoinCost {get;}
        /** 属性比例 */
        public int Property {get;}
        /** 技能等级 */
        public ImmutableArray<int> SkillLevel {get;}

        public HeroStarTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Level=TableTool.ToInt(cols[Array.IndexOf(fields, "level")]);
			FragCost=TableTool.ToInt(cols[Array.IndexOf(fields, "fragCost")]);
			CoinCost=TableTool.ToInt(cols[Array.IndexOf(fields, "coinCost")]);
			Property=TableTool.ToInt(cols[Array.IndexOf(fields, "property")]);
			SkillLevel=TableTool.ToIntArr(cols[Array.IndexOf(fields, "skillLevel")]);
        }
    }
    public class HeroEquipmentLevelTbl
    {
        /** 主键，可修改 */
        public int Id {get;}
        /** 英雄等级 */
        public ImmutableArray<int> Level {get;}
        /** 布料消耗 */
        public string CoinCost {get;}

        public HeroEquipmentLevelTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Level=TableTool.ToIntArr(cols[Array.IndexOf(fields, "level")]);
			CoinCost=TableTool.ToString(cols[Array.IndexOf(fields, "coinCost")]);
        }
    }
    public class HeroEquipmentRankTbl
    {
        /** 主键，可修改 */
        public int Id {get;}
        /** 英雄装备突破阶数 */
        public int Level {get;}
        /** 升阶材料数量 */
        public int Require {get;}
        /** 金币消耗 */
        public int CoinCost {get;}

        public HeroEquipmentRankTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Level=TableTool.ToInt(cols[Array.IndexOf(fields, "level")]);
			Require=TableTool.ToInt(cols[Array.IndexOf(fields, "require")]);
			CoinCost=TableTool.ToInt(cols[Array.IndexOf(fields, "coinCost")]);
        }
    }
    public class FacilityTbl
    {
        /** 唯一id */
        public int Id {get;}
        /** 建筑名称 */
        public string Name {get;}
        /** 建筑描述 */
        public string Description {get;}
        /** 建筑类型 */
        public int Kind {get;}
        /** 是否可入驻 */
        public int EnableHero {get;}
        /** 是否供水 */
        public int UseWater {get;}
        /** 解锁 */
        public int CaptainRankRequire {get;}
        /** 解锁前置条件 */
        public ImmutableArray<int> Pre {get;}
        /** 消耗材料id */
        public int MaterialId {get;}
        /** 建筑原料消耗比例 */
        public int MaterialCost {get;}
        /** 产出材料id */
        public int ProduceId {get;}
        /** 建筑初始属性 */
        public ImmutableArray<ImmutableArray<int>> BaseProperty {get;}
        /** 预制体名称 */
        public string Prefab {get;}
        /** 守卫怪物阵容 */
        public int Guard {get;}
        /** 位置id */
        public int PosId {get;}
        /** 升级1名称 */
        public string Level1Name {get;}
        /** 升级2名称 */
        public string Level2Name {get;}
        /** 建筑图片 */
        public string Image {get;}
        /** 缩略图 */
        public string Image2 {get;}
        /** 解锁奖励 */
        public ImmutableArray<ImmutableArray<long>> Reward {get;}
        /** 产量物品 */
        public int ChestId {get;}
        /** 占领获得幸存者数量 */
        public int Survivor {get;}
        /** 每个工作格子所需要的英雄阶数 */
        public ImmutableArray<int> WorkRequire {get;}
        /** 每个游戏小时产出多少次 */
        public int ProduceCount {get;}
        /** 怪物等级 */
        public int MonsterLv {get;}

        public FacilityTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Name=TableTool.ToString(cols[Array.IndexOf(fields, "name")]);
			Description=TableTool.ToString(cols[Array.IndexOf(fields, "description")]);
			Kind=TableTool.ToInt(cols[Array.IndexOf(fields, "kind")]);
			EnableHero=TableTool.ToInt(cols[Array.IndexOf(fields, "enableHero")]);
			UseWater=TableTool.ToInt(cols[Array.IndexOf(fields, "useWater")]);
			CaptainRankRequire=TableTool.ToInt(cols[Array.IndexOf(fields, "captainRankRequire")]);
			Pre=TableTool.ToIntArr(cols[Array.IndexOf(fields, "pre")]);
			MaterialId=TableTool.ToInt(cols[Array.IndexOf(fields, "materialId")]);
			MaterialCost=TableTool.ToInt(cols[Array.IndexOf(fields, "materialCost")]);
			ProduceId=TableTool.ToInt(cols[Array.IndexOf(fields, "produceId")]);
			BaseProperty=TableTool.ToIntMatrix(cols[Array.IndexOf(fields, "baseProperty")]);
			Prefab=TableTool.ToString(cols[Array.IndexOf(fields, "prefab")]);
			Guard=TableTool.ToInt(cols[Array.IndexOf(fields, "guard")]);
			PosId=TableTool.ToInt(cols[Array.IndexOf(fields, "posId")]);
			Level1Name=TableTool.ToString(cols[Array.IndexOf(fields, "level1Name")]);
			Level2Name=TableTool.ToString(cols[Array.IndexOf(fields, "level2Name")]);
			Image=TableTool.ToString(cols[Array.IndexOf(fields, "image")]);
			Image2=TableTool.ToString(cols[Array.IndexOf(fields, "image2")]);
			Reward=TableTool.ToLongMatrix(cols[Array.IndexOf(fields, "reward")]);
			ChestId=TableTool.ToInt(cols[Array.IndexOf(fields, "chestId")]);
			Survivor=TableTool.ToInt(cols[Array.IndexOf(fields, "survivor")]);
			WorkRequire=TableTool.ToIntArr(cols[Array.IndexOf(fields, "workRequire")]);
			ProduceCount=TableTool.ToInt(cols[Array.IndexOf(fields, "produceCount")]);
			MonsterLv=TableTool.ToInt(cols[Array.IndexOf(fields, "monsterLv")]);
        }
    }
    public class FacilityLevelTbl
    {
        /** 不读 */
        public int Id {get;}
        /** 建筑id */
        public int FacilityId {get;}
        /** 等级 */
        public ImmutableArray<int> Level {get;}
        /** 升级材料消耗 */
        public ImmutableArray<ImmutableArray<string>> Cost {get;}
        /** 水消耗 */
        public string Maintenance {get;}
        /** 等级数值 */
        public ImmutableArray<string> Value {get;}
        /** 满级奖励 */
        public ImmutableArray<double> MaxValue {get;}

        public FacilityLevelTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			FacilityId=TableTool.ToInt(cols[Array.IndexOf(fields, "facilityId")]);
			Level=TableTool.ToIntArr(cols[Array.IndexOf(fields, "level")]);
			Cost=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "cost")]);
			Maintenance=TableTool.ToString(cols[Array.IndexOf(fields, "maintenance")]);
			Value=TableTool.ToStringArr(cols[Array.IndexOf(fields, "value")]);
			MaxValue=TableTool.ToDoubleArr(cols[Array.IndexOf(fields, "maxValue")]);
        }
    }
    public class FacilityRankTbl
    {
        /** 不读 */
        public int Id {get;}
        /** 建筑id */
        public int FacilityId {get;}
        /** 阶数 */
        public int Rank {get;}
        /** 材料消耗 */
        public ImmutableArray<ImmutableArray<long>> Cost {get;}
        /** 升阶奖励 */
        public ImmutableArray<ImmutableArray<long>> Reward {get;}
        /** 船长室产量 */
        public long CaptainProduce {get;}
        /** 建筑等级上限 */
        public int LvLimit {get;}
        /** 阶数前置条件 */
        public ImmutableArray<ImmutableArray<int>> Pre {get;}

        public FacilityRankTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			FacilityId=TableTool.ToInt(cols[Array.IndexOf(fields, "facilityId")]);
			Rank=TableTool.ToInt(cols[Array.IndexOf(fields, "rank")]);
			Cost=TableTool.ToLongMatrix(cols[Array.IndexOf(fields, "cost")]);
			Reward=TableTool.ToLongMatrix(cols[Array.IndexOf(fields, "reward")]);
			CaptainProduce=TableTool.ToLong(cols[Array.IndexOf(fields, "captainProduce")]);
			LvLimit=TableTool.ToInt(cols[Array.IndexOf(fields, "lvLimit")]);
			Pre=TableTool.ToIntMatrix(cols[Array.IndexOf(fields, "pre")]);
        }
    }
    public class FacilityHeroLevelBuffTbl
    {
        /** 不读 */
        public int Id {get;}
        /** 英雄阶数 */
        public int Level {get;}
        /** 生产效率 */
        public int Produce {get;}
        /** 食堂专用 */
        public int Eat {get;}
        /** 医院专用 */
        public int Heal {get;}

        public FacilityHeroLevelBuffTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Level=TableTool.ToInt(cols[Array.IndexOf(fields, "level")]);
			Produce=TableTool.ToInt(cols[Array.IndexOf(fields, "produce")]);
			Eat=TableTool.ToInt(cols[Array.IndexOf(fields, "eat")]);
			Heal=TableTool.ToInt(cols[Array.IndexOf(fields, "heal")]);
        }
    }
    public class FacilityStarTbl
    {
        /** 不读 */
        public int Id {get;}
        /** 建筑id */
        public int FacilityId {get;}
        /** 星级 */
        public int Star {get;}
        /** 材料消耗 */
        public ImmutableArray<ImmutableArray<long>> Cost {get;}
        /** 升星属性 */
        public ImmutableArray<int> Reward {get;}

        public FacilityStarTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			FacilityId=TableTool.ToInt(cols[Array.IndexOf(fields, "facilityId")]);
			Star=TableTool.ToInt(cols[Array.IndexOf(fields, "star")]);
			Cost=TableTool.ToLongMatrix(cols[Array.IndexOf(fields, "cost")]);
			Reward=TableTool.ToIntArr(cols[Array.IndexOf(fields, "reward")]);
        }
    }
    public class FacilityBuffTbl
    {
        /** 不读 */
        public int Id {get;}
        /** buff类型 */
        public int BuffKind {get;}
        /** 公式计算 */
        public string Config {get;}

        public FacilityBuffTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			BuffKind=TableTool.ToInt(cols[Array.IndexOf(fields, "buffKind")]);
			Config=TableTool.ToString(cols[Array.IndexOf(fields, "config")]);
        }
    }
    public class StageMapTbl
    {
        /** 不读 */
        public int Id {get;}
        /** 地图编号 */
        public int MapIndex {get;}
        /** 地图名称 */
        public string Name {get;}
        /** 选关图标 */
        public string Banner {get;}
        /** LV系数 */
        public int BaseLv {get;}

        public StageMapTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			MapIndex=TableTool.ToInt(cols[Array.IndexOf(fields, "mapIndex")]);
			Name=TableTool.ToString(cols[Array.IndexOf(fields, "name")]);
			Banner=TableTool.ToString(cols[Array.IndexOf(fields, "banner")]);
			BaseLv=TableTool.ToInt(cols[Array.IndexOf(fields, "baseLv")]);
        }
    }
    public class StageTbl
    {
        /** 不读 */
        public int Id {get;}
        /** 地图编号 */
        public int MapIndex {get;}
        /** 关卡编号 */
        public int StageIndex {get;}
        /** 地图配置 */
        public int MapId {get;}
        /** 守卫怪物阵容 */
        public int Guard {get;}
        /** LV系数 */
        public int BaseLv {get;}
        /** 波数奖励 */
        public ImmutableArray<int> Wave {get;}
        /** 首次通关奖励 */
        public ImmutableArray<ImmutableArray<long>> FirstReward {get;}
        /** 扫荡奖励 */
        public ImmutableArray<ImmutableArray<long>> SweepReward {get;}
        /** 未通关奖励比率 */
        public string Ratio {get;}

        public StageTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			MapIndex=TableTool.ToInt(cols[Array.IndexOf(fields, "mapIndex")]);
			StageIndex=TableTool.ToInt(cols[Array.IndexOf(fields, "stageIndex")]);
			MapId=TableTool.ToInt(cols[Array.IndexOf(fields, "mapId")]);
			Guard=TableTool.ToInt(cols[Array.IndexOf(fields, "guard")]);
			BaseLv=TableTool.ToInt(cols[Array.IndexOf(fields, "baseLv")]);
			Wave=TableTool.ToIntArr(cols[Array.IndexOf(fields, "wave")]);
			FirstReward=TableTool.ToLongMatrix(cols[Array.IndexOf(fields, "firstReward")]);
			SweepReward=TableTool.ToLongMatrix(cols[Array.IndexOf(fields, "sweepReward")]);
			Ratio=TableTool.ToString(cols[Array.IndexOf(fields, "ratio")]);
        }
    }
    public class StageReputationShopTbl
    {
        /** 唯一id（不可修改） */
        public int Id {get;}
        /** 地图编号 */
        public int MapIndex {get;}
        /** 物品 */
        public ImmutableArray<long> Item {get;}
        /** 声望价格 */
        public int Reputation {get;}
        /** 库存数量 */
        public int Storage {get;}
        /** 解锁声望等级 */
        public int UnlockReputationLevel {get;}

        public StageReputationShopTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			MapIndex=TableTool.ToInt(cols[Array.IndexOf(fields, "mapIndex")]);
			Item=TableTool.ToLongArr(cols[Array.IndexOf(fields, "item")]);
			Reputation=TableTool.ToInt(cols[Array.IndexOf(fields, "reputation")]);
			Storage=TableTool.ToInt(cols[Array.IndexOf(fields, "storage")]);
			UnlockReputationLevel=TableTool.ToInt(cols[Array.IndexOf(fields, "unlockReputationLevel")]);
        }
    }
    public class StageAchievementTbl
    {
        /** 唯一id */
        public int Id {get;}
        /** 地图编号和关卡编号 */
        public ImmutableArray<int> Stage {get;}
        /** 奖励 */
        public ImmutableArray<ImmutableArray<long>> Reward {get;}

        public StageAchievementTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Stage=TableTool.ToIntArr(cols[Array.IndexOf(fields, "stage")]);
			Reward=TableTool.ToLongMatrix(cols[Array.IndexOf(fields, "reward")]);
        }
    }
    public class EquipmentMonsterTbl
    {
        /** 主键 */
        public int Id {get;}
        /** 装备品质 */
        public int Quality {get;}
        /** 生命值倍率 */
        public double Life {get;}

        public EquipmentMonsterTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Quality=TableTool.ToInt(cols[Array.IndexOf(fields, "quality")]);
			Life=TableTool.ToDouble(cols[Array.IndexOf(fields, "life")]);
        }
    }
    public class MonsterWaveTbl
    {
        /** 唯一id */
        public int Id {get;}
        /** 失败怪物数 */
        public int MonsterLimit {get;}
        /** boss配置 */
        public int Boss {get;}
        /** 波次 */
        public ImmutableArray<int> WaveList {get;}

        public MonsterWaveTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			MonsterLimit=TableTool.ToInt(cols[Array.IndexOf(fields, "monsterLimit")]);
			Boss=TableTool.ToInt(cols[Array.IndexOf(fields, "boss")]);
			WaveList=TableTool.ToIntArr(cols[Array.IndexOf(fields, "waveList")]);
        }
    }
    public class MonsterWaveDetailTbl
    {
        /** 唯一id */
        public int Id {get;}
        /** 波数时间(毫秒) */
        public int WaveTime {get;}
        /** 波数附加等级 */
        public int WaveLevel {get;}
        /** 波数提示 */
        public int WaveTip {get;}
        /** 波数 */
        public ImmutableArray<ImmutableArray<int>> Wave {get;}

        public MonsterWaveDetailTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			WaveTime=TableTool.ToInt(cols[Array.IndexOf(fields, "waveTime")]);
			WaveLevel=TableTool.ToInt(cols[Array.IndexOf(fields, "waveLevel")]);
			WaveTip=TableTool.ToInt(cols[Array.IndexOf(fields, "waveTip")]);
			Wave=TableTool.ToIntMatrix(cols[Array.IndexOf(fields, "wave")]);
        }
    }
    public class MonsterTbl
    {
        /** 唯一id */
        public int Id {get;}
        /** 怪物名 */
        public string Name {get;}
        /** 怪物关卡 */
        public int Gauka {get;}
        /** 品质 */
        public int Quality {get;}
        /** 移动类型 */
        public int MoveType {get;}
        /** 攻击类型 */
        public int AttackType {get;}
        /** 怪物tag */
        public ImmutableArray<string> Tag {get;}
        /** 图片资源 */
        public string Img {get;}
        /** 普攻间隔(毫秒) */
        public int NormalAttackInterval {get;}
        /** 普攻范围(像素) */
        public int NormalAttackRange {get;}
        /** 普攻 */
        public int NormalAttack {get;}
        /** 体型尺寸 */
        public ImmutableArray<int> Size {get;}
        /** 主动技能 */
        public ImmutableArray<int> MainSkill {get;}
        /** 其它技能 */
        public ImmutableArray<int> Skill {get;}
        /** 移动速度（像素/秒） */
        public int MoveSpeed {get;}
        /** 攻击力 */
        public string Attack {get;}
        /** 防御力 */
        public string Armor {get;}
        /** 生命值 */
        public string MaxHp {get;}
        /** 命中 */
        public string Hit {get;}
        /** 闪避 */
        public string Dodge {get;}
        /** 暴击率 */
        public string Critical {get;}
        /** 反暴击 */
        public string CriticalImmune {get;}
        /** 暴击伤害 */
        public string CriticalDamage {get;}
        /** 暴击伤害抵抗 */
        public string CriticalResistant {get;}
        /** 增伤 */
        public string Damage {get;}
        /** 减伤 */
        public string Defence {get;}
        /** 技能范围 */
        public int SkillRange {get;}
        /** 普攻连击率 */
        public string Combo {get;}
        /** 普攻连击减免 */
        public string AntiCombo {get;}
        /** 普攻击晕率 */
        public string Stun {get;}
        /** 普攻击晕减免 */
        public string AntiStun {get;}
        /** 普攻吸血 */
        public string LifeSteal {get;}
        /** 普攻吸血减免 */
        public string AntiLifeSteal {get;}
        /** 生命恢复(每秒) */
        public string LifeRecover {get;}

        public MonsterTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Name=TableTool.ToString(cols[Array.IndexOf(fields, "name")]);
			Gauka=TableTool.ToInt(cols[Array.IndexOf(fields, "gauka")]);
			Quality=TableTool.ToInt(cols[Array.IndexOf(fields, "quality")]);
			MoveType=TableTool.ToInt(cols[Array.IndexOf(fields, "moveType")]);
			AttackType=TableTool.ToInt(cols[Array.IndexOf(fields, "attackType")]);
			Tag=TableTool.ToStringArr(cols[Array.IndexOf(fields, "tag")]);
			Img=TableTool.ToString(cols[Array.IndexOf(fields, "img")]);
			NormalAttackInterval=TableTool.ToInt(cols[Array.IndexOf(fields, "normalAttackInterval")]);
			NormalAttackRange=TableTool.ToInt(cols[Array.IndexOf(fields, "normalAttackRange")]);
			NormalAttack=TableTool.ToInt(cols[Array.IndexOf(fields, "normalAttack")]);
			Size=TableTool.ToIntArr(cols[Array.IndexOf(fields, "size")]);
			MainSkill=TableTool.ToIntArr(cols[Array.IndexOf(fields, "mainSkill")]);
			Skill=TableTool.ToIntArr(cols[Array.IndexOf(fields, "skill")]);
			MoveSpeed=TableTool.ToInt(cols[Array.IndexOf(fields, "moveSpeed")]);
			Attack=TableTool.ToString(cols[Array.IndexOf(fields, "attack")]);
			Armor=TableTool.ToString(cols[Array.IndexOf(fields, "armor")]);
			MaxHp=TableTool.ToString(cols[Array.IndexOf(fields, "maxHp")]);
			Hit=TableTool.ToString(cols[Array.IndexOf(fields, "hit")]);
			Dodge=TableTool.ToString(cols[Array.IndexOf(fields, "dodge")]);
			Critical=TableTool.ToString(cols[Array.IndexOf(fields, "critical")]);
			CriticalImmune=TableTool.ToString(cols[Array.IndexOf(fields, "criticalImmune")]);
			CriticalDamage=TableTool.ToString(cols[Array.IndexOf(fields, "criticalDamage")]);
			CriticalResistant=TableTool.ToString(cols[Array.IndexOf(fields, "criticalResistant")]);
			Damage=TableTool.ToString(cols[Array.IndexOf(fields, "damage")]);
			Defence=TableTool.ToString(cols[Array.IndexOf(fields, "defence")]);
			SkillRange=TableTool.ToInt(cols[Array.IndexOf(fields, "skillRange")]);
			Combo=TableTool.ToString(cols[Array.IndexOf(fields, "combo")]);
			AntiCombo=TableTool.ToString(cols[Array.IndexOf(fields, "antiCombo")]);
			Stun=TableTool.ToString(cols[Array.IndexOf(fields, "stun")]);
			AntiStun=TableTool.ToString(cols[Array.IndexOf(fields, "antiStun")]);
			LifeSteal=TableTool.ToString(cols[Array.IndexOf(fields, "lifeSteal")]);
			AntiLifeSteal=TableTool.ToString(cols[Array.IndexOf(fields, "antiLifeSteal")]);
			LifeRecover=TableTool.ToString(cols[Array.IndexOf(fields, "lifeRecover")]);
        }
    }
    public class ShopTbl
    {
        /** 唯一id（不可修改） */
        public int Id {get;}
        /** 物品 */
        public ImmutableArray<long> Item {get;}
        /** 商店分页编号 */
        public int Page {get;}
        /** 购买次数限制 */
        public int Storage {get;}
        /** 购买价格 */
        public ImmutableArray<long> Price {get;}
        /** 库存刷新逻辑 */
        public int Refresh {get;}
        /** 解锁等级 */
        public int Unlock {get;}

        public ShopTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Item=TableTool.ToLongArr(cols[Array.IndexOf(fields, "item")]);
			Page=TableTool.ToInt(cols[Array.IndexOf(fields, "page")]);
			Storage=TableTool.ToInt(cols[Array.IndexOf(fields, "storage")]);
			Price=TableTool.ToLongArr(cols[Array.IndexOf(fields, "price")]);
			Refresh=TableTool.ToInt(cols[Array.IndexOf(fields, "refresh")]);
			Unlock=TableTool.ToInt(cols[Array.IndexOf(fields, "unlock")]);
        }
    }
    public class PlayerLevelTbl
    {
        /** 主键，可修改 */
        public int Id {get;}
        /** 玩家等级 */
        public int Level {get;}
        /** 升级消耗 */
        public long Require {get;}
        /** 称号 */
        public string LevelName {get;}
        /** 属性，加百分比 */
        public ImmutableArray<ImmutableArray<string>> Property {get;}

        public PlayerLevelTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Level=TableTool.ToInt(cols[Array.IndexOf(fields, "level")]);
			Require=TableTool.ToLong(cols[Array.IndexOf(fields, "require")]);
			LevelName=TableTool.ToString(cols[Array.IndexOf(fields, "levelName")]);
			Property=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "property")]);
        }
    }
    public class PlayerRankTbl
    {
        /** 不读 */
        public int Id {get;}
        /** 职业阶数 */
        public int Rank {get;}
        /** 等级上限 */
        public int LevelLimit {get;}
        /** 职业称号 */
        public string CareerName {get;}
        /** 属性，加百分比 */
        public ImmutableArray<ImmutableArray<string>> Property {get;}

        public PlayerRankTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Rank=TableTool.ToInt(cols[Array.IndexOf(fields, "rank")]);
			LevelLimit=TableTool.ToInt(cols[Array.IndexOf(fields, "levelLimit")]);
			CareerName=TableTool.ToString(cols[Array.IndexOf(fields, "careerName")]);
			Property=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "property")]);
        }
    }
    public class PlayerMissionTbl:BaseMissionTbl
    {
        /** 唯一id(注意所有任务类型都不能使用重复id) */
        public int Id {get;}
        /** 职业阶数 */
        public int Rank {get;}
        /** 任务类型 */
        public int Kind {get;}
        /** 任务需求 */
        public ImmutableArray<int> Require {get;}
        /** 任务参数 */
        public ImmutableArray<int> Param {get;}
        /** 奖励 */
        public ImmutableArray<ImmutableArray<long>> Reward {get;}
        /** 任务最大阶段数 */
        public int Stage {get;}

        public PlayerMissionTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Rank=TableTool.ToInt(cols[Array.IndexOf(fields, "rank")]);
			Kind=TableTool.ToInt(cols[Array.IndexOf(fields, "kind")]);
			Require=TableTool.ToIntArr(cols[Array.IndexOf(fields, "require")]);
			Param=TableTool.ToIntArr(cols[Array.IndexOf(fields, "param")]);
			Reward=TableTool.ToLongMatrix(cols[Array.IndexOf(fields, "reward")]);
			Stage=TableTool.ToInt(cols[Array.IndexOf(fields, "stage")]);
        }
    }
    public class MainMissionTaskTbl
    {
        /** 目标id（不可修改） */
        public int Id {get;}
        /** 奖励 */
        public ImmutableArray<ImmutableArray<long>> Reward {get;}
        /** 目标需求 */
        public int Require {get;}

        public MainMissionTaskTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Reward=TableTool.ToLongMatrix(cols[Array.IndexOf(fields, "reward")]);
			Require=TableTool.ToInt(cols[Array.IndexOf(fields, "require")]);
        }
    }
    public class MainMissionTbl:BaseMissionTbl
    {
        /** 唯一id */
        public int Id {get;}
        /** 位置 */
        public int Index {get;}
        /** 层级 */
        public int Order {get;}
        /** 任务类型 */
        public int Kind {get;}
        /** 任务需求 */
        public ImmutableArray<int> Require {get;}
        /** 任务参数 */
        public ImmutableArray<int> Param {get;}
        /** 奖励 */
        public ImmutableArray<ImmutableArray<long>> Reward {get;}
        /** 开启条件 */
        public ImmutableArray<int> Unlock {get;}
        /** 任务最大阶段数 */
        public int Stage {get;}

        public MainMissionTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Index=TableTool.ToInt(cols[Array.IndexOf(fields, "index")]);
			Order=TableTool.ToInt(cols[Array.IndexOf(fields, "order")]);
			Kind=TableTool.ToInt(cols[Array.IndexOf(fields, "kind")]);
			Require=TableTool.ToIntArr(cols[Array.IndexOf(fields, "require")]);
			Param=TableTool.ToIntArr(cols[Array.IndexOf(fields, "param")]);
			Reward=TableTool.ToLongMatrix(cols[Array.IndexOf(fields, "reward")]);
			Unlock=TableTool.ToIntArr(cols[Array.IndexOf(fields, "unlock")]);
			Stage=TableTool.ToInt(cols[Array.IndexOf(fields, "stage")]);
        }
    }
    public class TowerChallengeTbl
    {
        /** 不读 */
        public int Id {get;}
        /** 塔层数 */
        public int TowerLv {get;}
        /** 怪物 */
        public int Guard {get;}
        /** 奖励 */
        public ImmutableArray<ImmutableArray<long>> Reward {get;}
        /** 怪物等级 */
        public int MonsterLv {get;}
        /** 每分钟挂机收益 */
        public ImmutableArray<ImmutableArray<string>> AfkReward {get;}

        public TowerChallengeTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			TowerLv=TableTool.ToInt(cols[Array.IndexOf(fields, "towerLv")]);
			Guard=TableTool.ToInt(cols[Array.IndexOf(fields, "guard")]);
			Reward=TableTool.ToLongMatrix(cols[Array.IndexOf(fields, "reward")]);
			MonsterLv=TableTool.ToInt(cols[Array.IndexOf(fields, "monsterLv")]);
			AfkReward=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "afkReward")]);
        }
    }
    public class TowerLevelRewardTbl
    {
        /** 不读 */
        public int Id {get;}
        /** 塔层数 */
        public int TowerLv {get;}
        /** 奖励 */
        public ImmutableArray<ImmutableArray<long>> Reward {get;}

        public TowerLevelRewardTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			TowerLv=TableTool.ToInt(cols[Array.IndexOf(fields, "towerLv")]);
			Reward=TableTool.ToLongMatrix(cols[Array.IndexOf(fields, "reward")]);
        }
    }
    public class ArenaRewardTbl
    {
        /** 不读 */
        public int Id {get;}
        /** 类型 */
        public int Kind {get;}
        /** 排名范围 */
        public ImmutableArray<int> Rank {get;}
        /** 奖励物品 */
        public ImmutableArray<ImmutableArray<long>> Reward {get;}

        public ArenaRewardTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Kind=TableTool.ToInt(cols[Array.IndexOf(fields, "kind")]);
			Rank=TableTool.ToIntArr(cols[Array.IndexOf(fields, "rank")]);
			Reward=TableTool.ToLongMatrix(cols[Array.IndexOf(fields, "reward")]);
        }
    }
    public class BattleSkillTbl
    {
        /** 唯一id（不可修改） */
        public int Id {get;}
        /** 配置文件 */
        public string Config {get;}
        /** 参数1 */
        public string Param1 {get;}
        /** 参数2 */
        public string Param2 {get;}
        /** 参数3 */
        public string Param3 {get;}
        /** 参数4 */
        public string Param4 {get;}
        /** 参数5 */
        public string Param5 {get;}
        /** 标志位 */
        public ImmutableArray<string> Flag {get;}
        /** 属性加成 */
        public ImmutableArray<ImmutableArray<string>> Property {get;}
        /** 眩晕 */
        public int Stupor {get;}
        /** 缴械 */
        public int Disarm {get;}
        /** 恐惧 */
        public int Fear {get;}
        /** 沉默 */
        public int Silence {get;}
        /** 嘲讽 */
        public int Sneer {get;}

        public BattleSkillTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Config=TableTool.ToString(cols[Array.IndexOf(fields, "config")]);
			Param1=TableTool.ToString(cols[Array.IndexOf(fields, "param1")]);
			Param2=TableTool.ToString(cols[Array.IndexOf(fields, "param2")]);
			Param3=TableTool.ToString(cols[Array.IndexOf(fields, "param3")]);
			Param4=TableTool.ToString(cols[Array.IndexOf(fields, "param4")]);
			Param5=TableTool.ToString(cols[Array.IndexOf(fields, "param5")]);
			Flag=TableTool.ToStringArr(cols[Array.IndexOf(fields, "flag")]);
			Property=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "property")]);
			Stupor=TableTool.ToInt(cols[Array.IndexOf(fields, "stupor")]);
			Disarm=TableTool.ToInt(cols[Array.IndexOf(fields, "disarm")]);
			Fear=TableTool.ToInt(cols[Array.IndexOf(fields, "fear")]);
			Silence=TableTool.ToInt(cols[Array.IndexOf(fields, "silence")]);
			Sneer=TableTool.ToInt(cols[Array.IndexOf(fields, "sneer")]);
        }
    }
    public class CarTbl
    {
        /** 唯一id（不可修改） */
        public int Id {get;}
        /** 品质 */
        public int Quality {get;}
        /** 图片资源 */
        public string Img {get;}
        /** 战车名称 */
        public string Name {get;}
        /** 战车描述 */
        public string Description {get;}
        /** 攻击 */
        public string Attack {get;}
        /** 防御 */
        public string Armor {get;}
        /** 生命 */
        public string MaxHp {get;}
        /** 主动技能 */
        public int MainSkill {get;}
        /** 被动技能 */
        public ImmutableArray<int> Skill {get;}

        public CarTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Quality=TableTool.ToInt(cols[Array.IndexOf(fields, "quality")]);
			Img=TableTool.ToString(cols[Array.IndexOf(fields, "img")]);
			Name=TableTool.ToString(cols[Array.IndexOf(fields, "name")]);
			Description=TableTool.ToString(cols[Array.IndexOf(fields, "description")]);
			Attack=TableTool.ToString(cols[Array.IndexOf(fields, "attack")]);
			Armor=TableTool.ToString(cols[Array.IndexOf(fields, "armor")]);
			MaxHp=TableTool.ToString(cols[Array.IndexOf(fields, "maxHp")]);
			MainSkill=TableTool.ToInt(cols[Array.IndexOf(fields, "mainSkill")]);
			Skill=TableTool.ToIntArr(cols[Array.IndexOf(fields, "skill")]);
        }
    }
    public class CarSkillTbl
    {
        /** 唯一id（不可修改） */
        public int Id {get;}
        /** 品质 */
        public int Quality {get;}
        /** 图片资源 */
        public string Img {get;}
        /** 技能名 */
        public string Name {get;}
        /** 技能描述 */
        public string Description {get;}
        /** 战斗技能 */
        public ImmutableArray<int> BattleSkill {get;}

        public CarSkillTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Quality=TableTool.ToInt(cols[Array.IndexOf(fields, "quality")]);
			Img=TableTool.ToString(cols[Array.IndexOf(fields, "img")]);
			Name=TableTool.ToString(cols[Array.IndexOf(fields, "name")]);
			Description=TableTool.ToString(cols[Array.IndexOf(fields, "description")]);
			BattleSkill=TableTool.ToIntArr(cols[Array.IndexOf(fields, "battleSkill")]);
        }
    }
    public class CarLevelTbl
    {
        /** 主键，可修改 */
        public int Id {get;}
        /** 战车等级 */
        public ImmutableArray<int> Level {get;}
        /** 升级经验值 */
        public string Require {get;}
        /** 金币消耗 */
        public string CoinCost {get;}

        public CarLevelTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Level=TableTool.ToIntArr(cols[Array.IndexOf(fields, "level")]);
			Require=TableTool.ToString(cols[Array.IndexOf(fields, "require")]);
			CoinCost=TableTool.ToString(cols[Array.IndexOf(fields, "coinCost")]);
        }
    }
    public class CarEquipmentTbl
    {
        /** 唯一id（不可修改） */
        public int Id {get;}
        /** 装备名称 */
        public string Name {get;}
        /** 品质 */
        public int Quality {get;}
        /** 部位 */
        public int Part {get;}
        /** 图片资源 */
        public string Img {get;}
        /** 装备描述 */
        public string Description {get;}
        /** 属性 */
        public ImmutableArray<ImmutableArray<string>> Property {get;}

        public CarEquipmentTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Name=TableTool.ToString(cols[Array.IndexOf(fields, "name")]);
			Quality=TableTool.ToInt(cols[Array.IndexOf(fields, "quality")]);
			Part=TableTool.ToInt(cols[Array.IndexOf(fields, "part")]);
			Img=TableTool.ToString(cols[Array.IndexOf(fields, "img")]);
			Description=TableTool.ToString(cols[Array.IndexOf(fields, "description")]);
			Property=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "property")]);
        }
    }
    public class CarEquipmentLevelTbl
    {
        /** 主键，可修改 */
        public int Id {get;}
        /** 战车部件等级 */
        public int Level {get;}
        /** 升阶材料数量 */
        public int Require {get;}
        /** 金币消耗 */
        public int CoinCost {get;}

        public CarEquipmentLevelTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Level=TableTool.ToInt(cols[Array.IndexOf(fields, "level")]);
			Require=TableTool.ToInt(cols[Array.IndexOf(fields, "require")]);
			CoinCost=TableTool.ToInt(cols[Array.IndexOf(fields, "coinCost")]);
        }
    }
    public class CardPoolTbl
    {
        /** 卡池id，不可修改 */
        public int Id {get;}
        /** 抽卡券id */
        public int Ticket {get;}
        /** 15抽钻石价格 */
        public long Price15 {get;}
        /** 35抽钻石价格 */
        public long Price35 {get;}
        /** 每日上限 */
        public int DailyLimit {get;}

        public CardPoolTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Ticket=TableTool.ToInt(cols[Array.IndexOf(fields, "ticket")]);
			Price15=TableTool.ToLong(cols[Array.IndexOf(fields, "price15")]);
			Price35=TableTool.ToLong(cols[Array.IndexOf(fields, "price35")]);
			DailyLimit=TableTool.ToInt(cols[Array.IndexOf(fields, "dailyLimit")]);
        }
    }
    public class CardPoolLevelTbl
    {
        /** 唯一id */
        public int Id {get;}
        /** 等级 */
        public int Level {get;}
        /** 升级所需抽卡次数 */
        public int Require {get;}
        /** 品质0概率 */
        public int Rare0 {get;}
        /** 品质1概率 */
        public int Rare1 {get;}
        /** 品质2概率 */
        public int Rare2 {get;}
        /** 品质3概率 */
        public int Rare3 {get;}
        /** 品质4概率 */
        public int Rare4 {get;}
        /** 品质5概率 */
        public int Rare5 {get;}
        /** 品质6概率 */
        public int Rare6 {get;}
        /** 品质7概率 */
        public int Rare7 {get;}
        /** 品质8概率 */
        public int Rare8 {get;}

        public CardPoolLevelTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Level=TableTool.ToInt(cols[Array.IndexOf(fields, "level")]);
			Require=TableTool.ToInt(cols[Array.IndexOf(fields, "require")]);
			Rare0=TableTool.ToInt(cols[Array.IndexOf(fields, "rare0")]);
			Rare1=TableTool.ToInt(cols[Array.IndexOf(fields, "rare1")]);
			Rare2=TableTool.ToInt(cols[Array.IndexOf(fields, "rare2")]);
			Rare3=TableTool.ToInt(cols[Array.IndexOf(fields, "rare3")]);
			Rare4=TableTool.ToInt(cols[Array.IndexOf(fields, "rare4")]);
			Rare5=TableTool.ToInt(cols[Array.IndexOf(fields, "rare5")]);
			Rare6=TableTool.ToInt(cols[Array.IndexOf(fields, "rare6")]);
			Rare7=TableTool.ToInt(cols[Array.IndexOf(fields, "rare7")]);
			Rare8=TableTool.ToInt(cols[Array.IndexOf(fields, "rare8")]);
        }
    }
    public class SpineAttackAnimationInfoTbl
    {
        /** 不读 */
        public int Id {get;}
        /** 骨骼动画名称 */
        public string Spine {get;}
        /** 动画名称 */
        public string Animation {get;}
        /** 技能关键帧（帧，以30帧为基准） */
        public ImmutableArray<int> KeyFrame {get;}
        /** 总帧数（帧，以30帧为基准） */
        public int Total {get;}
        /** 默认动画速度 */
        public double AnimationSpeed {get;}

        public SpineAttackAnimationInfoTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Spine=TableTool.ToString(cols[Array.IndexOf(fields, "spine")]);
			Animation=TableTool.ToString(cols[Array.IndexOf(fields, "animation")]);
			KeyFrame=TableTool.ToIntArr(cols[Array.IndexOf(fields, "keyFrame")]);
			Total=TableTool.ToInt(cols[Array.IndexOf(fields, "total")]);
			AnimationSpeed=TableTool.ToDouble(cols[Array.IndexOf(fields, "animationSpeed")]);
        }
    }
    public class SpineInfoTbl
    {
        /** 不读 */
        public int Id {get;}
        /** 骨骼动画名称 */
        public string Spine {get;}
        /** 骨骼皮肤 */
        public string Skin {get;}
        /** 子弹发射起点 */
        public ImmutableArray<int> BulletBegin {get;}
        /** 角色缩放 */
        public double Scale {get;}
        /** 角色ui缩放 */
        public double UiScale {get;}
        /** 角色在场景行走的尺寸 */
        public double SceneScale {get;}
        /** 生命/能量条位置(y坐标) */
        public int BarPosition {get;}
        /** 生命/能量条缩放 */
        public double BarScale {get;}
        /** 阴影缩放 */
        public double ShadowScale {get;}
        /** 阴影位置(y坐标) */
        public int ShadowPosition {get;}
        /** 是否显示阴影 */
        public int ShowShadow {get;}
        /** 冲刺配置 */
        public ImmutableArray<double> Rush {get;}
        /** 护盾配置 */
        public ImmutableArray<double> Shield {get;}
        /** 眩晕配置 */
        public ImmutableArray<double> Stupor {get;}
        /** 普攻击中特效 */
        public string HitEffect {get;}
        /** 击中特效缩放 */
        public string HitEffectScale {get;}
        /** 击中特效延迟 */
        public string HitEffectDelay {get;}
        /** 击中特效偏移 */
        public ImmutableArray<double> HitEffectOffset {get;}
        /** 普攻子弹资源 */
        public string BulletImg {get;}
        /** 普攻子弹速度（像素/秒） */
        public int BulletSpeed {get;}
        /** 普攻弹道类型（1、贝塞尔曲线 2、直线） */
        public int CurveType {get;}
        /** 曲线参数 */
        public int CurveParam {get;}
        /** 子弹缩放 */
        public double BulletScale {get;}

        public SpineInfoTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Spine=TableTool.ToString(cols[Array.IndexOf(fields, "spine")]);
			Skin=TableTool.ToString(cols[Array.IndexOf(fields, "skin")]);
			BulletBegin=TableTool.ToIntArr(cols[Array.IndexOf(fields, "bulletBegin")]);
			Scale=TableTool.ToDouble(cols[Array.IndexOf(fields, "scale")]);
			UiScale=TableTool.ToDouble(cols[Array.IndexOf(fields, "uiScale")]);
			SceneScale=TableTool.ToDouble(cols[Array.IndexOf(fields, "sceneScale")]);
			BarPosition=TableTool.ToInt(cols[Array.IndexOf(fields, "barPosition")]);
			BarScale=TableTool.ToDouble(cols[Array.IndexOf(fields, "barScale")]);
			ShadowScale=TableTool.ToDouble(cols[Array.IndexOf(fields, "shadowScale")]);
			ShadowPosition=TableTool.ToInt(cols[Array.IndexOf(fields, "shadowPosition")]);
			ShowShadow=TableTool.ToInt(cols[Array.IndexOf(fields, "showShadow")]);
			Rush=TableTool.ToDoubleArr(cols[Array.IndexOf(fields, "rush")]);
			Shield=TableTool.ToDoubleArr(cols[Array.IndexOf(fields, "shield")]);
			Stupor=TableTool.ToDoubleArr(cols[Array.IndexOf(fields, "stupor")]);
			HitEffect=TableTool.ToString(cols[Array.IndexOf(fields, "hitEffect")]);
			HitEffectScale=TableTool.ToString(cols[Array.IndexOf(fields, "hitEffectScale")]);
			HitEffectDelay=TableTool.ToString(cols[Array.IndexOf(fields, "hitEffectDelay")]);
			HitEffectOffset=TableTool.ToDoubleArr(cols[Array.IndexOf(fields, "hitEffectOffset")]);
			BulletImg=TableTool.ToString(cols[Array.IndexOf(fields, "bulletImg")]);
			BulletSpeed=TableTool.ToInt(cols[Array.IndexOf(fields, "bulletSpeed")]);
			CurveType=TableTool.ToInt(cols[Array.IndexOf(fields, "curveType")]);
			CurveParam=TableTool.ToInt(cols[Array.IndexOf(fields, "curveParam")]);
			BulletScale=TableTool.ToDouble(cols[Array.IndexOf(fields, "bulletScale")]);
        }
    }
    public class HeroFormationTbl
    {
        /** 不读 */
        public int Id {get;}
        /** 位置编号 */
        public int Index {get;}
        /** 生命/能量条位置(y坐标) */
        public int BarPosition {get;}
        /** 生命/能量条缩放 */
        public double BarScale {get;}

        public HeroFormationTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Index=TableTool.ToInt(cols[Array.IndexOf(fields, "index")]);
			BarPosition=TableTool.ToInt(cols[Array.IndexOf(fields, "barPosition")]);
			BarScale=TableTool.ToDouble(cols[Array.IndexOf(fields, "barScale")]);
        }
    }
    public class RelationBuffTbl
    {
        /** 唯一id（不可修改） */
        public int Id {get;}
        /** 羁绊分页 */
        public int Page {get;}
        /** 羁绊id */
        public ImmutableArray<int> RelationId {get;}
        /** 词条1 */
        public ImmutableArray<string> Buff1 {get;}
        /** 词条2 */
        public ImmutableArray<string> Buff2 {get;}
        /** 词条3 */
        public ImmutableArray<string> Buff3 {get;}
        /** 词条4 */
        public ImmutableArray<string> Buff4 {get;}

        public RelationBuffTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Page=TableTool.ToInt(cols[Array.IndexOf(fields, "page")]);
			RelationId=TableTool.ToIntArr(cols[Array.IndexOf(fields, "relationId")]);
			Buff1=TableTool.ToStringArr(cols[Array.IndexOf(fields, "buff1")]);
			Buff2=TableTool.ToStringArr(cols[Array.IndexOf(fields, "buff2")]);
			Buff3=TableTool.ToStringArr(cols[Array.IndexOf(fields, "buff3")]);
			Buff4=TableTool.ToStringArr(cols[Array.IndexOf(fields, "buff4")]);
        }
    }
    public class FacilityTunnelTbl
    {
        /** 不读 */
        public int Id {get;}
        /** 通道连接区域 */
        public ImmutableArray<int> Area {get;}
        /** 通道类型 */
        public int TunnelType {get;}
        /** 路径定位点 */
        public ImmutableArray<ImmutableArray<int>> PathPoint {get;}

        public FacilityTunnelTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Area=TableTool.ToIntArr(cols[Array.IndexOf(fields, "area")]);
			TunnelType=TableTool.ToInt(cols[Array.IndexOf(fields, "tunnelType")]);
			PathPoint=TableTool.ToIntMatrix(cols[Array.IndexOf(fields, "pathPoint")]);
        }
    }
    public class FacilityPositionTbl
    {
        /** 唯一id（不可修改） */
        public int Id {get;}
        /** 层级 */
        public int ZIndex {get;}
        /** 通行区域编号 */
        public int Area {get;}
        /** 坐标 */
        public ImmutableArray<int> Position {get;}

        public FacilityPositionTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			ZIndex=TableTool.ToInt(cols[Array.IndexOf(fields, "zIndex")]);
			Area=TableTool.ToInt(cols[Array.IndexOf(fields, "area")]);
			Position=TableTool.ToIntArr(cols[Array.IndexOf(fields, "position")]);
        }
    }
    public class EnemyBattleTbl
    {
        /** 不读 */
        public int Id {get;}
        /** 排名 */
        public int Rank {get;}
        /** 奖励 */
        public ImmutableArray<ImmutableArray<string>> Reward {get;}
        /** 积分 */
        public int Point {get;}
        /** 战力倍数 */
        public int Power {get;}
        /** 名称 */
        public string TeamName {get;}

        public EnemyBattleTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Rank=TableTool.ToInt(cols[Array.IndexOf(fields, "rank")]);
			Reward=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "reward")]);
			Point=TableTool.ToInt(cols[Array.IndexOf(fields, "point")]);
			Power=TableTool.ToInt(cols[Array.IndexOf(fields, "power")]);
			TeamName=TableTool.ToString(cols[Array.IndexOf(fields, "teamName")]);
        }
    }
    public class MineRewardTbl
    {
        /** 主键，不可修改 */
        public int Id {get;}
        /** 奖励类型 */
        public int RewardType {get;}
        /** 奖励ID */
        public int RewardId {get;}
        /** 权重 */
        public int Weight {get;}
        /** 最小数量|最大数量 */
        public ImmutableArray<int> Count {get;}
        /** 图片 */
        public string Img {get;}

        public MineRewardTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			RewardType=TableTool.ToInt(cols[Array.IndexOf(fields, "rewardType")]);
			RewardId=TableTool.ToInt(cols[Array.IndexOf(fields, "rewardId")]);
			Weight=TableTool.ToInt(cols[Array.IndexOf(fields, "weight")]);
			Count=TableTool.ToIntArr(cols[Array.IndexOf(fields, "count")]);
			Img=TableTool.ToString(cols[Array.IndexOf(fields, "img")]);
        }
    }
    public class MineMapAreaTbl
    {
        /** Id */
        public int Id {get;}
        /** 区域ID */
        public int AreaId {get;}
        /** 解锁层数 */
        public ImmutableArray<int> UnlockFloor {get;}
        /** 列1 */
        public int Col1 {get;}
        /** 列2 */
        public int Col2 {get;}
        /** 列3 */
        public int Col3 {get;}
        /** 列4 */
        public int Col4 {get;}
        /** 列5 */
        public int Col5 {get;}
        /** 列6 */
        public int Col6 {get;}
        /** 权重 */
        public ImmutableArray<int> Weight {get;}

        public MineMapAreaTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			AreaId=TableTool.ToInt(cols[Array.IndexOf(fields, "areaId")]);
			UnlockFloor=TableTool.ToIntArr(cols[Array.IndexOf(fields, "unlockFloor")]);
			Col1=TableTool.ToInt(cols[Array.IndexOf(fields, "col1")]);
			Col2=TableTool.ToInt(cols[Array.IndexOf(fields, "col2")]);
			Col3=TableTool.ToInt(cols[Array.IndexOf(fields, "col3")]);
			Col4=TableTool.ToInt(cols[Array.IndexOf(fields, "col4")]);
			Col5=TableTool.ToInt(cols[Array.IndexOf(fields, "col5")]);
			Col6=TableTool.ToInt(cols[Array.IndexOf(fields, "col6")]);
			Weight=TableTool.ToIntArr(cols[Array.IndexOf(fields, "weight")]);
        }
    }
    public class MineBattleMapTbl
    {
        /** 主键，不可更改 */
        public int Id {get;}
        /** 怪物组合名称 */
        public string Name {get;}
        /** 小怪解锁层数 */
        public ImmutableArray<int> UnlockFloor {get;}
        /** 小怪权重 */
        public int Weight {get;}
        /** boss守卫层数 */
        public int Boss {get;}
        /** 怪物组合 */
        public int Guard {get;}
        /** 奖励 */
        public ImmutableArray<ImmutableArray<long>> Reward {get;}
        /** 挖矿积分 */
        public int Point {get;}
        /** 体力消耗 */
        public int PowerCost {get;}
        /** 怪物等级 */
        public int MonsterLv {get;}

        public MineBattleMapTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Name=TableTool.ToString(cols[Array.IndexOf(fields, "name")]);
			UnlockFloor=TableTool.ToIntArr(cols[Array.IndexOf(fields, "unlockFloor")]);
			Weight=TableTool.ToInt(cols[Array.IndexOf(fields, "weight")]);
			Boss=TableTool.ToInt(cols[Array.IndexOf(fields, "boss")]);
			Guard=TableTool.ToInt(cols[Array.IndexOf(fields, "guard")]);
			Reward=TableTool.ToLongMatrix(cols[Array.IndexOf(fields, "reward")]);
			Point=TableTool.ToInt(cols[Array.IndexOf(fields, "point")]);
			PowerCost=TableTool.ToInt(cols[Array.IndexOf(fields, "powerCost")]);
			MonsterLv=TableTool.ToInt(cols[Array.IndexOf(fields, "monsterLv")]);
        }
    }
    public class GiftPackTbl
    {
        /** 唯一id，与充值id对应 */
        public int Id {get;}
        /** 奖励物品 */
        public ImmutableArray<ImmutableArray<long>> Reward {get;}

        public GiftPackTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Reward=TableTool.ToLongMatrix(cols[Array.IndexOf(fields, "reward")]);
        }
    }
    public class PackRuleTbl
    {
        /** 主键，不可修改 */
        public int Id {get;}
        /** 规则 */
        public int Kind {get;}
        /** 触发条件 */
        public ImmutableArray<ImmutableArray<int>> Trigger {get;}
        /** 玩家充值档位 */
        public ImmutableArray<int> PlayerClass {get;}
        /** 礼包id */
        public ImmutableArray<int> PackageId {get;}
        /** 持续时间 */
        public int Duration {get;}
        /** 推送次数限制 */
        public int Limit {get;}
        /** 礼包分组 */
        public int Group {get;}
        /** 主界面入口图标 */
        public string EntranceImg {get;}

        public PackRuleTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Kind=TableTool.ToInt(cols[Array.IndexOf(fields, "kind")]);
			Trigger=TableTool.ToIntMatrix(cols[Array.IndexOf(fields, "trigger")]);
			PlayerClass=TableTool.ToIntArr(cols[Array.IndexOf(fields, "playerClass")]);
			PackageId=TableTool.ToIntArr(cols[Array.IndexOf(fields, "packageId")]);
			Duration=TableTool.ToInt(cols[Array.IndexOf(fields, "duration")]);
			Limit=TableTool.ToInt(cols[Array.IndexOf(fields, "limit")]);
			Group=TableTool.ToInt(cols[Array.IndexOf(fields, "group")]);
			EntranceImg=TableTool.ToString(cols[Array.IndexOf(fields, "entranceImg")]);
        }
    }
    public class DialogueTbl
    {
        /** 对话编号 */
        public int Id {get;}
        /** 触发条件 */
        public ImmutableArray<int> Trigger {get;}

        public DialogueTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Trigger=TableTool.ToIntArr(cols[Array.IndexOf(fields, "trigger")]);
        }
    }
    public class DialogueContentTbl
    {
        /** 主键 */
        public int Id {get;}
        /** 对话编号 */
        public int DialogueId {get;}
        /** 对话角色 */
        public string Role {get;}
        /** 对话角色位置 */
        public int RolePos {get;}
        /** 对话内容 */
        public string Content {get;}

        public DialogueContentTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			DialogueId=TableTool.ToInt(cols[Array.IndexOf(fields, "dialogueId")]);
			Role=TableTool.ToString(cols[Array.IndexOf(fields, "role")]);
			RolePos=TableTool.ToInt(cols[Array.IndexOf(fields, "rolePos")]);
			Content=TableTool.ToString(cols[Array.IndexOf(fields, "content")]);
        }
    }
    public class GuideTbl
    {
        /** 引导编号 */
        public int Id {get;}
        /** 在线触发检测 */
        public ImmutableArray<int> Trigger {get;}
        /** 登录触发检测 */
        public ImmutableArray<ImmutableArray<string>> LoginTrigger {get;}
        /** 跳过条件 */
        public ImmutableArray<ImmutableArray<string>> Skip {get;}

        public GuideTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Trigger=TableTool.ToIntArr(cols[Array.IndexOf(fields, "trigger")]);
			LoginTrigger=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "loginTrigger")]);
			Skip=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "skip")]);
        }
    }
    public class GuideContentTbl
    {
        /** 主键 */
        public int Id {get;}
        /** 引导编号 */
        public int GuideId {get;}
        /** 对话角色 */
        public string Role {get;}
        /** 对话角色位置 */
        public int RolePos {get;}
        /** 引导内容 */
        public string Content {get;}
        /** 定位节点 */
        public string Point {get;}
        /** 引导完成条件 */
        public ImmutableArray<ImmutableArray<string>> Complete {get;}
        /** 按键屏蔽 */
        public int ButtonBlock {get;}
        /** 场景事件屏蔽 */
        public int SceneBlock {get;}
        /** 手动战斗 */
        public int GuideBattle {get;}
        /** 对话位置偏移量 */
        public int DialogueOffset {get;}
        /** 预触发 */
        public ImmutableArray<string> PreRun {get;}
        /** 结束触发 */
        public ImmutableArray<string> AfterRun {get;}
        /** 引导手指坐标偏移 */
        public ImmutableArray<int> Hand {get;}

        public GuideContentTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			GuideId=TableTool.ToInt(cols[Array.IndexOf(fields, "guideId")]);
			Role=TableTool.ToString(cols[Array.IndexOf(fields, "role")]);
			RolePos=TableTool.ToInt(cols[Array.IndexOf(fields, "rolePos")]);
			Content=TableTool.ToString(cols[Array.IndexOf(fields, "content")]);
			Point=TableTool.ToString(cols[Array.IndexOf(fields, "point")]);
			Complete=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "complete")]);
			ButtonBlock=TableTool.ToInt(cols[Array.IndexOf(fields, "buttonBlock")]);
			SceneBlock=TableTool.ToInt(cols[Array.IndexOf(fields, "sceneBlock")]);
			GuideBattle=TableTool.ToInt(cols[Array.IndexOf(fields, "guideBattle")]);
			DialogueOffset=TableTool.ToInt(cols[Array.IndexOf(fields, "dialogueOffset")]);
			PreRun=TableTool.ToStringArr(cols[Array.IndexOf(fields, "preRun")]);
			AfterRun=TableTool.ToStringArr(cols[Array.IndexOf(fields, "afterRun")]);
			Hand=TableTool.ToIntArr(cols[Array.IndexOf(fields, "hand")]);
        }
    }
    public class HeroCollectionTbl
    {
        /** 不读 */
        public int Id {get;}
        /** 分页 */
        public int Page {get;}
        /** 图鉴等级 */
        public int Level {get;}
        /** 升级点数要求 */
        public int PointRequire {get;}
        /** 词条1 */
        public ImmutableArray<string> Buff1 {get;}
        /** 词条2 */
        public ImmutableArray<string> Buff2 {get;}
        /** 词条3 */
        public ImmutableArray<string> Buff3 {get;}
        /** 词条4 */
        public ImmutableArray<string> Buff4 {get;}

        public HeroCollectionTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Page=TableTool.ToInt(cols[Array.IndexOf(fields, "page")]);
			Level=TableTool.ToInt(cols[Array.IndexOf(fields, "level")]);
			PointRequire=TableTool.ToInt(cols[Array.IndexOf(fields, "pointRequire")]);
			Buff1=TableTool.ToStringArr(cols[Array.IndexOf(fields, "buff1")]);
			Buff2=TableTool.ToStringArr(cols[Array.IndexOf(fields, "buff2")]);
			Buff3=TableTool.ToStringArr(cols[Array.IndexOf(fields, "buff3")]);
			Buff4=TableTool.ToStringArr(cols[Array.IndexOf(fields, "buff4")]);
        }
    }
    public class HeroCollectionPointTbl
    {
        /** 不读 */
        public int Id {get;}
        /** 分页 */
        public int Page {get;}
        /** 英雄星级 */
        public int Star {get;}
        /** 点数获取（按品质） */
        public ImmutableArray<int> Point {get;}

        public HeroCollectionPointTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Page=TableTool.ToInt(cols[Array.IndexOf(fields, "page")]);
			Star=TableTool.ToInt(cols[Array.IndexOf(fields, "star")]);
			Point=TableTool.ToIntArr(cols[Array.IndexOf(fields, "point")]);
        }
    }
    public class HeroCollectionLevelRewardTbl
    {
        /** 不读 */
        public int Id {get;}
        /** 分页 */
        public int Page {get;}
        /** 图鉴等级 */
        public int Level {get;}
        /** 奖励 */
        public ImmutableArray<ImmutableArray<long>> Reward {get;}

        public HeroCollectionLevelRewardTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Page=TableTool.ToInt(cols[Array.IndexOf(fields, "page")]);
			Level=TableTool.ToInt(cols[Array.IndexOf(fields, "level")]);
			Reward=TableTool.ToLongMatrix(cols[Array.IndexOf(fields, "reward")]);
        }
    }
    public class MusicInfoTbl
    {
        /** 不读 */
        public int Id {get;}
        /** 音乐名 */
        public string Music {get;}
        /** 音量 */
        public double Volume {get;}

        public MusicInfoTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Music=TableTool.ToString(cols[Array.IndexOf(fields, "music")]);
			Volume=TableTool.ToDouble(cols[Array.IndexOf(fields, "volume")]);
        }
    }
    public class BattleSceneInfoTbl
    {
        /** 唯一id */
        public int Id {get;}
        /** 预制体 */
        public string Prefab {get;}
        /** 背景音乐 */
        public string Music {get;}
        /** 场景缩放比例 */
        public double Scale {get;}
        /** 默认镜头缩放 */
        public double DefaultRatio {get;}
        /** 主角位置 */
        public ImmutableArray<int> PlayerPos {get;}
        /** 默认摄像机位置 */
        public ImmutableArray<int> DefaultCameraPos {get;}
        /** 允许移动镜头 */
        public int AllowMove {get;}
        /** 地图偏移量 */
        public int MapOffset {get;}
        /** 怪物起始点配置 */
        public double MonsterBegin {get;}
        /** 路径id */
        public int RoadId {get;}
        /** 路径缩放 */
        public double RoadScale {get;}
        /** 路径位置 */
        public ImmutableArray<int> RoadPos {get;}

        public BattleSceneInfoTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Prefab=TableTool.ToString(cols[Array.IndexOf(fields, "prefab")]);
			Music=TableTool.ToString(cols[Array.IndexOf(fields, "music")]);
			Scale=TableTool.ToDouble(cols[Array.IndexOf(fields, "scale")]);
			DefaultRatio=TableTool.ToDouble(cols[Array.IndexOf(fields, "defaultRatio")]);
			PlayerPos=TableTool.ToIntArr(cols[Array.IndexOf(fields, "playerPos")]);
			DefaultCameraPos=TableTool.ToIntArr(cols[Array.IndexOf(fields, "defaultCameraPos")]);
			AllowMove=TableTool.ToInt(cols[Array.IndexOf(fields, "allowMove")]);
			MapOffset=TableTool.ToInt(cols[Array.IndexOf(fields, "mapOffset")]);
			MonsterBegin=TableTool.ToDouble(cols[Array.IndexOf(fields, "monsterBegin")]);
			RoadId=TableTool.ToInt(cols[Array.IndexOf(fields, "roadId")]);
			RoadScale=TableTool.ToDouble(cols[Array.IndexOf(fields, "roadScale")]);
			RoadPos=TableTool.ToIntArr(cols[Array.IndexOf(fields, "roadPos")]);
        }
    }
    public class BattleRoadInfoTbl
    {
        /** 唯一id */
        public int Id {get;}
        /** 图片资源 */
        public string Img {get;}
        /** 路径类型 */
        public int Kind {get;}
        /** 路径配置 */
        public ImmutableArray<ImmutableArray<int>> Road {get;}

        public BattleRoadInfoTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Img=TableTool.ToString(cols[Array.IndexOf(fields, "img")]);
			Kind=TableTool.ToInt(cols[Array.IndexOf(fields, "kind")]);
			Road=TableTool.ToIntMatrix(cols[Array.IndexOf(fields, "road")]);
        }
    }
    public class ClearAdTbl
    {
        /** 唯一id，与充值id对应 */
        public int Id {get;}
        /** 奖励物品 */
        public ImmutableArray<ImmutableArray<long>> Reward {get;}

        public ClearAdTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Reward=TableTool.ToLongMatrix(cols[Array.IndexOf(fields, "reward")]);
        }
    }
    public class MagicStaffTbl
    {
        /** 法杖id，跟物品表对应 */
        public int Id {get;}
        /** 持续时间（分钟） */
        public int Duration {get;}
        /** 攻击频率（次/秒） */
        public int AttackSpeed {get;}
        /** 战斗速率（万分比） */
        public int BattleSpeed {get;}
        /** 攻击力加成（万分比） */
        public int AttackBuff {get;}
        /** 钻石购买价格 */
        public int Price {get;}
        /** 每日广告次数 */
        public int VideoLimit {get;}
        /** 每次广告获取个数 */
        public int VideoCount {get;}
        /** 解锁id */
        public int SystemId {get;}

        public MagicStaffTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Duration=TableTool.ToInt(cols[Array.IndexOf(fields, "duration")]);
			AttackSpeed=TableTool.ToInt(cols[Array.IndexOf(fields, "attackSpeed")]);
			BattleSpeed=TableTool.ToInt(cols[Array.IndexOf(fields, "battleSpeed")]);
			AttackBuff=TableTool.ToInt(cols[Array.IndexOf(fields, "attackBuff")]);
			Price=TableTool.ToInt(cols[Array.IndexOf(fields, "price")]);
			VideoLimit=TableTool.ToInt(cols[Array.IndexOf(fields, "videoLimit")]);
			VideoCount=TableTool.ToInt(cols[Array.IndexOf(fields, "videoCount")]);
			SystemId=TableTool.ToInt(cols[Array.IndexOf(fields, "systemId")]);
        }
    }
    public class SystemUnlockTbl
    {
        /** 功能id */
        public int Id {get;}
        /** 条件 */
        public ImmutableArray<int> Condition {get;}
        /** 是否有解锁通知窗口 */
        public int Inform {get;}
        /** 解锁的文本 */
        public string Text {get;}
        /** 解锁图片 */
        public string Img {get;}

        public SystemUnlockTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Condition=TableTool.ToIntArr(cols[Array.IndexOf(fields, "condition")]);
			Inform=TableTool.ToInt(cols[Array.IndexOf(fields, "inform")]);
			Text=TableTool.ToString(cols[Array.IndexOf(fields, "text")]);
			Img=TableTool.ToString(cols[Array.IndexOf(fields, "img")]);
        }
    }
    public class WeakGuideTbl
    {
        /** 引导编号 */
        public int Id {get;}
        /** 触发检测 */
        public ImmutableArray<int> Trigger {get;}
        /** 跳过条件 */
        public ImmutableArray<ImmutableArray<string>> Skip {get;}

        public WeakGuideTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Trigger=TableTool.ToIntArr(cols[Array.IndexOf(fields, "trigger")]);
			Skip=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "skip")]);
        }
    }
    public class WeakGuideContentTbl
    {
        /** 主键 */
        public int Id {get;}
        /** 引导编号 */
        public int GuideId {get;}
        /** 定位节点 */
        public string Point {get;}
        /** 引导完成条件 */
        public ImmutableArray<ImmutableArray<string>> Complete {get;}
        /** 引导手指坐标偏移 */
        public ImmutableArray<int> Hand {get;}

        public WeakGuideContentTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			GuideId=TableTool.ToInt(cols[Array.IndexOf(fields, "guideId")]);
			Point=TableTool.ToString(cols[Array.IndexOf(fields, "point")]);
			Complete=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "complete")]);
			Hand=TableTool.ToIntArr(cols[Array.IndexOf(fields, "hand")]);
        }
    }
    public class TurntableTbl
    {
        /** 主键 */
        public int Id {get;}
        /** 物品id */
        public int ItemId {get;}
        /** 初始量区间 */
        public ImmutableArray<long> RewardCount {get;}
        /** 额外奖励（产量箱） */
        public ImmutableArray<long> Reward {get;}
        /** 权重 */
        public int Weight {get;}
        /** 是否属于保底 */
        public int Rare {get;}
        /** 解锁前置条件 */
        public ImmutableArray<int> Pre {get;}

        public TurntableTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			ItemId=TableTool.ToInt(cols[Array.IndexOf(fields, "itemId")]);
			RewardCount=TableTool.ToLongArr(cols[Array.IndexOf(fields, "rewardCount")]);
			Reward=TableTool.ToLongArr(cols[Array.IndexOf(fields, "reward")]);
			Weight=TableTool.ToInt(cols[Array.IndexOf(fields, "weight")]);
			Rare=TableTool.ToInt(cols[Array.IndexOf(fields, "rare")]);
			Pre=TableTool.ToIntArr(cols[Array.IndexOf(fields, "pre")]);
        }
    }
    public class ChestItemPoolTbl
    {
        /** 主键，可修改 */
        public int Id {get;}
        /** 物品id */
        public int ItemId {get;}
        /** 奖励 */
        public ImmutableArray<long> Reward {get;}
        /** 权重 */
        public int Weight {get;}

        public ChestItemPoolTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			ItemId=TableTool.ToInt(cols[Array.IndexOf(fields, "itemId")]);
			Reward=TableTool.ToLongArr(cols[Array.IndexOf(fields, "reward")]);
			Weight=TableTool.ToInt(cols[Array.IndexOf(fields, "weight")]);
        }
    }
    public class OptionalChestPoolTbl
    {
        /** 主键，可修改 */
        public int Id {get;}
        /** 物品id */
        public int ItemId {get;}
        /** 奖励 */
        public ImmutableArray<long> Reward {get;}

        public OptionalChestPoolTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			ItemId=TableTool.ToInt(cols[Array.IndexOf(fields, "itemId")]);
			Reward=TableTool.ToLongArr(cols[Array.IndexOf(fields, "reward")]);
        }
    }
    public class FirstPackageTbl
    {
        /** 主键，不可修改 */
        public int Id {get;}
        /** 充值金额 */
        public int Total {get;}
        /** 奖励 */
        public ImmutableArray<ImmutableArray<long>> Reward {get;}

        public FirstPackageTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Total=TableTool.ToInt(cols[Array.IndexOf(fields, "total")]);
			Reward=TableTool.ToLongMatrix(cols[Array.IndexOf(fields, "reward")]);
        }
    }
    public class MonthCardTbl
    {
        /** 唯一id，与充值id对应 */
        public int Id {get;}
        /** 每日奖励物品 */
        public ImmutableArray<ImmutableArray<long>> Reward {get;}
        /** 购买奖励 */
        public ImmutableArray<ImmutableArray<long>> Purchase {get;}

        public MonthCardTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Reward=TableTool.ToLongMatrix(cols[Array.IndexOf(fields, "reward")]);
			Purchase=TableTool.ToLongMatrix(cols[Array.IndexOf(fields, "purchase")]);
        }
    }
    public class CaptainMissionTbl
    {
        /** 唯一id(注意所有任务类型都不能使用重复id) */
        public int Id {get;}
        /** 庇护所阶数 */
        public int Rank {get;}
        /** 任务类型 */
        public int Kind {get;}
        /** 任务需求 */
        public ImmutableArray<int> Require {get;}
        /** 任务参数 */
        public ImmutableArray<int> Param {get;}
        /** 奖励 */
        public ImmutableArray<ImmutableArray<long>> Reward {get;}
        /** 任务最大阶段数 */
        public int Stage {get;}

        public CaptainMissionTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Rank=TableTool.ToInt(cols[Array.IndexOf(fields, "rank")]);
			Kind=TableTool.ToInt(cols[Array.IndexOf(fields, "kind")]);
			Require=TableTool.ToIntArr(cols[Array.IndexOf(fields, "require")]);
			Param=TableTool.ToIntArr(cols[Array.IndexOf(fields, "param")]);
			Reward=TableTool.ToLongMatrix(cols[Array.IndexOf(fields, "reward")]);
			Stage=TableTool.ToInt(cols[Array.IndexOf(fields, "stage")]);
        }
    }
    public class CaptainBuffTbl
    {
        /** 不读 */
        public int Id {get;}
        /** 庇护所阶数 */
        public int Rank {get;}
        /** 建筑等级上限 */
        public int LevelLimit {get;}
        /** 建筑星级上限 */
        public int StarLimit {get;}
        /** 整体建筑产量buff */
        public int ProduceBuff {get;}
        /** 特定建筑产量buff */
        public ImmutableArray<ImmutableArray<int>> SpecialProduceBuff {get;}
        /** 员工属性buff */
        public int AttackBuff {get;}
        /** 解锁建筑 */
        public ImmutableArray<int> UnlockFacility {get;}

        public CaptainBuffTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Rank=TableTool.ToInt(cols[Array.IndexOf(fields, "rank")]);
			LevelLimit=TableTool.ToInt(cols[Array.IndexOf(fields, "levelLimit")]);
			StarLimit=TableTool.ToInt(cols[Array.IndexOf(fields, "starLimit")]);
			ProduceBuff=TableTool.ToInt(cols[Array.IndexOf(fields, "produceBuff")]);
			SpecialProduceBuff=TableTool.ToIntMatrix(cols[Array.IndexOf(fields, "specialProduceBuff")]);
			AttackBuff=TableTool.ToInt(cols[Array.IndexOf(fields, "attackBuff")]);
			UnlockFacility=TableTool.ToIntArr(cols[Array.IndexOf(fields, "unlockFacility")]);
        }
    }
    public class WarOrderTbl
    {
        /** 唯一id，与充值表id对应 */
        public int Id {get;}
        /** 战令类型 */
        public int OrderKind {get;}
        /** 图片资源 */
        public string Img {get;}
        /** 任务类型 */
        public int Kind {get;}
        /** 任务参数 */
        public ImmutableArray<int> Param {get;}
        /** 进度文本 */
        public string Text {get;}
        /** 标题文本 */
        public string TitleText {get;}
        /** 免费文本 */
        public string FreeText {get;}
        /** 付费文本 */
        public string ChargeText {get;}
        /** 菜单 */
        public string MenuText {get;}
        /** 战令类型 */
        public int WarOrderType {get;}

        public WarOrderTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			OrderKind=TableTool.ToInt(cols[Array.IndexOf(fields, "orderKind")]);
			Img=TableTool.ToString(cols[Array.IndexOf(fields, "img")]);
			Kind=TableTool.ToInt(cols[Array.IndexOf(fields, "kind")]);
			Param=TableTool.ToIntArr(cols[Array.IndexOf(fields, "param")]);
			Text=TableTool.ToString(cols[Array.IndexOf(fields, "text")]);
			TitleText=TableTool.ToString(cols[Array.IndexOf(fields, "titleText")]);
			FreeText=TableTool.ToString(cols[Array.IndexOf(fields, "freeText")]);
			ChargeText=TableTool.ToString(cols[Array.IndexOf(fields, "chargeText")]);
			MenuText=TableTool.ToString(cols[Array.IndexOf(fields, "menuText")]);
			WarOrderType=TableTool.ToInt(cols[Array.IndexOf(fields, "WarOrderType")]);
        }
    }
    public class WarOrderRewardTbl
    {
        /** 唯一id */
        public int Id {get;}
        /** 战令id */
        public int WarOrderId {get;}
        /** 任务需求 */
        public int Require {get;}
        /** 免费奖励 */
        public ImmutableArray<ImmutableArray<string>> FreeReward {get;}
        /** 付费奖励 */
        public ImmutableArray<ImmutableArray<string>> Reward {get;}

        public WarOrderRewardTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			WarOrderId=TableTool.ToInt(cols[Array.IndexOf(fields, "warOrderId")]);
			Require=TableTool.ToInt(cols[Array.IndexOf(fields, "require")]);
			FreeReward=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "freeReward")]);
			Reward=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "reward")]);
        }
    }
    public class RuleTextTbl
    {
        /** 唯一id */
        public int Id {get;}
        /** 规则文本 */
        public string Text {get;}
        /** 多语言备注 */
        public string Title {get;}

        public RuleTextTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Text=TableTool.ToString(cols[Array.IndexOf(fields, "text")]);
			Title=TableTool.ToString(cols[Array.IndexOf(fields, "title")]);
        }
    }
    public class RankMissionTbl:BaseMissionTbl
    {
        /** 唯一id */
        public int Id {get;}
        /** 任务类型 */
        public int Kind {get;}
        /** 任务需求 */
        public ImmutableArray<int> Require {get;}
        /** 任务参数 */
        public ImmutableArray<int> Param {get;}
        /** 奖励 */
        public ImmutableArray<ImmutableArray<long>> Reward {get;}
        /** 任务最大阶段数 */
        public int Stage {get;}
        /** 挑战或招募 */
        public int Page {get;}
        /** 轮次 */
        public int Round {get;}

        public RankMissionTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Kind=TableTool.ToInt(cols[Array.IndexOf(fields, "kind")]);
			Require=TableTool.ToIntArr(cols[Array.IndexOf(fields, "require")]);
			Param=TableTool.ToIntArr(cols[Array.IndexOf(fields, "param")]);
			Reward=TableTool.ToLongMatrix(cols[Array.IndexOf(fields, "reward")]);
			Stage=TableTool.ToInt(cols[Array.IndexOf(fields, "stage")]);
			Page=TableTool.ToInt(cols[Array.IndexOf(fields, "page")]);
			Round=TableTool.ToInt(cols[Array.IndexOf(fields, "round")]);
        }
    }
    public class RankPackTbl
    {
        /** 唯一id，与充值id对应 */
        public int Id {get;}
        /** 奖励 */
        public ImmutableArray<ImmutableArray<long>> Reward {get;}
        /** 限购 */
        public int Limit {get;}
        /** 挑战或招募 */
        public int Page {get;}

        public RankPackTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Reward=TableTool.ToLongMatrix(cols[Array.IndexOf(fields, "reward")]);
			Limit=TableTool.ToInt(cols[Array.IndexOf(fields, "limit")]);
			Page=TableTool.ToInt(cols[Array.IndexOf(fields, "page")]);
        }
    }
    public class RankRewardTbl
    {
        /** ID */
        public int Id {get;}
        /** 奖励 */
        public ImmutableArray<ImmutableArray<long>> Reward {get;}
        /** 排名范围 */
        public ImmutableArray<int> Rank {get;}
        /** 挑战或招募 */
        public int Page {get;}

        public RankRewardTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Reward=TableTool.ToLongMatrix(cols[Array.IndexOf(fields, "reward")]);
			Rank=TableTool.ToIntArr(cols[Array.IndexOf(fields, "rank")]);
			Page=TableTool.ToInt(cols[Array.IndexOf(fields, "page")]);
        }
    }
    public class VideoGroupPurchaseTbl
    {
        /** 唯一id,不可删除 */
        public int Id {get;}
        /** 奖励 */
        public ImmutableArray<ImmutableArray<long>> Reward {get;}
        /** 人数限制 */
        public int Limit {get;}
        /** 时间限制（分钟） */
        public int Time {get;}

        public VideoGroupPurchaseTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Reward=TableTool.ToLongMatrix(cols[Array.IndexOf(fields, "reward")]);
			Limit=TableTool.ToInt(cols[Array.IndexOf(fields, "limit")]);
			Time=TableTool.ToInt(cols[Array.IndexOf(fields, "time")]);
        }
    }
    public class BanquetLevelTbl
    {
        /** 不读 */
        public int Id {get;}
        /** 宴会等级 */
        public int Level {get;}
        /** 菜肴名字 */
        public string Name {get;}
        /** 升级所需 */
        public int Require {get;}
        /** 奖励 */
        public ImmutableArray<ImmutableArray<long>> Reward {get;}
        /** 不同等级下的图片 */
        public string Img {get;}

        public BanquetLevelTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Level=TableTool.ToInt(cols[Array.IndexOf(fields, "level")]);
			Name=TableTool.ToString(cols[Array.IndexOf(fields, "name")]);
			Require=TableTool.ToInt(cols[Array.IndexOf(fields, "require")]);
			Reward=TableTool.ToLongMatrix(cols[Array.IndexOf(fields, "reward")]);
			Img=TableTool.ToString(cols[Array.IndexOf(fields, "img")]);
        }
    }
    public class BanquetPointRewardTbl
    {
        /** ID */
        public int Id {get;}
        /** 积分区间 */
        public ImmutableArray<int> Point {get;}
        /** 奖励 */
        public ImmutableArray<ImmutableArray<long>> Reward {get;}

        public BanquetPointRewardTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Point=TableTool.ToIntArr(cols[Array.IndexOf(fields, "point")]);
			Reward=TableTool.ToLongMatrix(cols[Array.IndexOf(fields, "reward")]);
        }
    }
    public class BanquetMissionTbl:BaseMissionTbl
    {
        /** 唯一id */
        public int Id {get;}
        /** 任务类型 */
        public int Kind {get;}
        /** 任务需求 */
        public ImmutableArray<int> Require {get;}
        /** 任务参数 */
        public ImmutableArray<int> Param {get;}
        /** 奖励 */
        public ImmutableArray<ImmutableArray<long>> Reward {get;}
        /** 任务最大阶段数 */
        public int Stage {get;}
        /** 天数 */
        public int Day {get;}

        public BanquetMissionTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Kind=TableTool.ToInt(cols[Array.IndexOf(fields, "kind")]);
			Require=TableTool.ToIntArr(cols[Array.IndexOf(fields, "require")]);
			Param=TableTool.ToIntArr(cols[Array.IndexOf(fields, "param")]);
			Reward=TableTool.ToLongMatrix(cols[Array.IndexOf(fields, "reward")]);
			Stage=TableTool.ToInt(cols[Array.IndexOf(fields, "stage")]);
			Day=TableTool.ToInt(cols[Array.IndexOf(fields, "day")]);
        }
    }
    public class BanquetShopTbl
    {
        /** 唯一id（不可修改） */
        public int Id {get;}
        /** 物品|数量 */
        public ImmutableArray<long> Item {get;}
        /** 商店分页编号 */
        public int Page {get;}
        /** 购买次数限制 */
        public int Storage {get;}
        /** 购买价格 */
        public ImmutableArray<long> Price {get;}
        /** 积分解锁条件 */
        public int Unlock {get;}

        public BanquetShopTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Item=TableTool.ToLongArr(cols[Array.IndexOf(fields, "item")]);
			Page=TableTool.ToInt(cols[Array.IndexOf(fields, "page")]);
			Storage=TableTool.ToInt(cols[Array.IndexOf(fields, "storage")]);
			Price=TableTool.ToLongArr(cols[Array.IndexOf(fields, "price")]);
			Unlock=TableTool.ToInt(cols[Array.IndexOf(fields, "unlock")]);
        }
    }
    public class BanquetPackTbl
    {
        /** 唯一id，与充值id对应 */
        public int Id {get;}
        /** 奖励 */
        public ImmutableArray<ImmutableArray<long>> Reward {get;}
        /** 限购 */
        public int Limit {get;}
        /** 购买价格 */
        public ImmutableArray<long> Price {get;}

        public BanquetPackTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Reward=TableTool.ToLongMatrix(cols[Array.IndexOf(fields, "reward")]);
			Limit=TableTool.ToInt(cols[Array.IndexOf(fields, "limit")]);
			Price=TableTool.ToLongArr(cols[Array.IndexOf(fields, "price")]);
        }
    }
    public class BanquetGroupTbl
    {
        /** ID */
        public int Id {get;}
        /** 类型 */
        public int Kind {get;}
        /** 消耗 */
        public ImmutableArray<long> Cost {get;}
        /** 天数 */
        public int Day {get;}
        /** 开启时间 */
        public long StartTime {get;}
        /** 结束时间 */
        public long EndTime {get;}
        /** 折扣 */
        public int Discount {get;}
        /** 获得 */
        public ImmutableArray<long> Reward {get;}

        public BanquetGroupTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Kind=TableTool.ToInt(cols[Array.IndexOf(fields, "kind")]);
			Cost=TableTool.ToLongArr(cols[Array.IndexOf(fields, "cost")]);
			Day=TableTool.ToInt(cols[Array.IndexOf(fields, "day")]);
			StartTime=TableTool.ToLong(cols[Array.IndexOf(fields, "startTime")]);
			EndTime=TableTool.ToLong(cols[Array.IndexOf(fields, "endTime")]);
			Discount=TableTool.ToInt(cols[Array.IndexOf(fields, "discount")]);
			Reward=TableTool.ToLongArr(cols[Array.IndexOf(fields, "reward")]);
        }
    }
    public class TowerStrengthenTbl
    {
        /** 主键 */
        public int Id {get;}
        /** 等级 */
        public int Level {get;}
        /** 消耗 */
        public ImmutableArray<ImmutableArray<int>> Cost {get;}
        /** 属性，攻防血加点数，其它加百分比 */
        public ImmutableArray<ImmutableArray<string>> Property {get;}

        public TowerStrengthenTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Level=TableTool.ToInt(cols[Array.IndexOf(fields, "level")]);
			Cost=TableTool.ToIntMatrix(cols[Array.IndexOf(fields, "cost")]);
			Property=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "property")]);
        }
    }
    public class TowerWashTbl
    {
        /** 唯一id */
        public int Id {get;}
        /** 词条id */
        public int Pid {get;}
        /** 属性 */
        public string Property {get;}
        /** 最小属性 */
        public string Min {get;}
        /** 最大属性 */
        public string Max {get;}
        /** 品质 */
        public int Quailty {get;}

        public TowerWashTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Pid=TableTool.ToInt(cols[Array.IndexOf(fields, "pid")]);
			Property=TableTool.ToString(cols[Array.IndexOf(fields, "property")]);
			Min=TableTool.ToString(cols[Array.IndexOf(fields, "min")]);
			Max=TableTool.ToString(cols[Array.IndexOf(fields, "max")]);
			Quailty=TableTool.ToInt(cols[Array.IndexOf(fields, "quailty")]);
        }
    }
    public class TowerWashRareTbl
    {
        /** 唯一id */
        public int Id {get;}
        /** 等级 */
        public int Level {get;}
        /** 升级消耗 */
        public int Exp {get;}
        /** 词条 */
        public ImmutableArray<int> Pool {get;}
        /** 词条权重 */
        public ImmutableArray<int> Weight {get;}
        /** 品质权重 */
        public ImmutableArray<int> Rare {get;}

        public TowerWashRareTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Level=TableTool.ToInt(cols[Array.IndexOf(fields, "level")]);
			Exp=TableTool.ToInt(cols[Array.IndexOf(fields, "exp")]);
			Pool=TableTool.ToIntArr(cols[Array.IndexOf(fields, "pool")]);
			Weight=TableTool.ToIntArr(cols[Array.IndexOf(fields, "weight")]);
			Rare=TableTool.ToIntArr(cols[Array.IndexOf(fields, "rare")]);
        }
    }
    public class EquipmentTbl
    {
        /** 唯一id */
        public int Id {get;}
        /** 品质 */
        public int Quality {get;}
        /** 装备名称 */
        public string Name {get;}
        /** 装备类型 */
        public string Type {get;}
        /** 图片资源 */
        public string Img {get;}
        /** 部位 */
        public int Part {get;}
        /** 固定属性 */
        public ImmutableArray<ImmutableArray<string>> Property {get;}
        /** 额外词条1 */
        public int Stat1 {get;}
        /** 额外词条2 */
        public int Stat2 {get;}
        /** 词条池 */
        public ImmutableArray<int> StatPool {get;}
        /** 词条权重 */
        public ImmutableArray<int> StatWeight {get;}
        /** 金币 */
        public long Coin {get;}
        /** 经验 */
        public long Exp {get;}
        /** 关联技能天赋 */
        public int SkillTalent {get;}
        /** 生命系数 */
        public string Life {get;}
        /** 防御系数 */
        public string Armor {get;}
        /** 伤害系数 */
        public string Damage {get;}

        public EquipmentTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Quality=TableTool.ToInt(cols[Array.IndexOf(fields, "quality")]);
			Name=TableTool.ToString(cols[Array.IndexOf(fields, "name")]);
			Type=TableTool.ToString(cols[Array.IndexOf(fields, "type")]);
			Img=TableTool.ToString(cols[Array.IndexOf(fields, "img")]);
			Part=TableTool.ToInt(cols[Array.IndexOf(fields, "part")]);
			Property=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "property")]);
			Stat1=TableTool.ToInt(cols[Array.IndexOf(fields, "stat1")]);
			Stat2=TableTool.ToInt(cols[Array.IndexOf(fields, "stat2")]);
			StatPool=TableTool.ToIntArr(cols[Array.IndexOf(fields, "statPool")]);
			StatWeight=TableTool.ToIntArr(cols[Array.IndexOf(fields, "statWeight")]);
			Coin=TableTool.ToLong(cols[Array.IndexOf(fields, "coin")]);
			Exp=TableTool.ToLong(cols[Array.IndexOf(fields, "exp")]);
			SkillTalent=TableTool.ToInt(cols[Array.IndexOf(fields, "skillTalent")]);
			Life=TableTool.ToString(cols[Array.IndexOf(fields, "life")]);
			Armor=TableTool.ToString(cols[Array.IndexOf(fields, "armor")]);
			Damage=TableTool.ToString(cols[Array.IndexOf(fields, "damage")]);
        }
    }
    public class EquipmentStatTbl
    {
        /** 唯一id */
        public int Id {get;}
        /** 属性 */
        public string Property {get;}
        /** 最小属性 */
        public string Min {get;}
        /** 最大属性 */
        public string Max {get;}

        public EquipmentStatTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Property=TableTool.ToString(cols[Array.IndexOf(fields, "property")]);
			Min=TableTool.ToString(cols[Array.IndexOf(fields, "min")]);
			Max=TableTool.ToString(cols[Array.IndexOf(fields, "max")]);
        }
    }
    public class StoneLevelTbl
    {
        /** 唯一id */
        public int Id {get;}
        /** 等级 */
        public int Level {get;}
        /** 品质0概率 */
        public int Rare0 {get;}
        /** 品质1概率 */
        public int Rare1 {get;}
        /** 品质2概率 */
        public int Rare2 {get;}
        /** 品质3概率 */
        public int Rare3 {get;}
        /** 品质4概率 */
        public int Rare4 {get;}
        /** 品质5概率 */
        public int Rare5 {get;}
        /** 品质6概率 */
        public int Rare6 {get;}
        /** 品质7概率 */
        public int Rare7 {get;}
        /** 品质8概率 */
        public int Rare8 {get;}
        /** 升级时间（分钟） */
        public int UpgradeTime {get;}
        /** 升级次数 */
        public int UpgradeCount {get;}
        /** 升级消耗 */
        public long UpgradeCost {get;}
        /** 同时开箱数量 */
        public int OpenCount {get;}

        public StoneLevelTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Level=TableTool.ToInt(cols[Array.IndexOf(fields, "level")]);
			Rare0=TableTool.ToInt(cols[Array.IndexOf(fields, "rare0")]);
			Rare1=TableTool.ToInt(cols[Array.IndexOf(fields, "rare1")]);
			Rare2=TableTool.ToInt(cols[Array.IndexOf(fields, "rare2")]);
			Rare3=TableTool.ToInt(cols[Array.IndexOf(fields, "rare3")]);
			Rare4=TableTool.ToInt(cols[Array.IndexOf(fields, "rare4")]);
			Rare5=TableTool.ToInt(cols[Array.IndexOf(fields, "rare5")]);
			Rare6=TableTool.ToInt(cols[Array.IndexOf(fields, "rare6")]);
			Rare7=TableTool.ToInt(cols[Array.IndexOf(fields, "rare7")]);
			Rare8=TableTool.ToInt(cols[Array.IndexOf(fields, "rare8")]);
			UpgradeTime=TableTool.ToInt(cols[Array.IndexOf(fields, "upgradeTime")]);
			UpgradeCount=TableTool.ToInt(cols[Array.IndexOf(fields, "upgradeCount")]);
			UpgradeCost=TableTool.ToLong(cols[Array.IndexOf(fields, "upgradeCost")]);
			OpenCount=TableTool.ToInt(cols[Array.IndexOf(fields, "openCount")]);
        }
    }
    public class PlayerSkillTbl
    {
        /** 唯一id */
        public int Id {get;}
        /** 品质 */
        public int Quality {get;}
        /** 图片资源 */
        public string Img {get;}
        /** 技能名称 */
        public string Name {get;}
        /** 技能描述 */
        public string Description {get;}
        /** 技能描述参数 */
        public ImmutableArray<string> DescriptionParam {get;}
        /** 战斗技能 */
        public ImmutableArray<int> BattleSkill {get;}
        /** 冷却时间(毫秒) */
        public int ColdDown {get;}
        /** 关联装备部位 */
        public int Part {get;}

        public PlayerSkillTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Quality=TableTool.ToInt(cols[Array.IndexOf(fields, "quality")]);
			Img=TableTool.ToString(cols[Array.IndexOf(fields, "img")]);
			Name=TableTool.ToString(cols[Array.IndexOf(fields, "name")]);
			Description=TableTool.ToString(cols[Array.IndexOf(fields, "description")]);
			DescriptionParam=TableTool.ToStringArr(cols[Array.IndexOf(fields, "descriptionParam")]);
			BattleSkill=TableTool.ToIntArr(cols[Array.IndexOf(fields, "battleSkill")]);
			ColdDown=TableTool.ToInt(cols[Array.IndexOf(fields, "coldDown")]);
			Part=TableTool.ToInt(cols[Array.IndexOf(fields, "part")]);
        }
    }
    public class PlayerSkillLevelTbl
    {
        /** 不读 */
        public int Id {get;}
        /** 技能等级 */
        public int Level {get;}
        /** 升级所需碎片数（按品质） */
        public ImmutableArray<int> Require {get;}

        public PlayerSkillLevelTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Level=TableTool.ToInt(cols[Array.IndexOf(fields, "level")]);
			Require=TableTool.ToIntArr(cols[Array.IndexOf(fields, "require")]);
        }
    }
    public class PlayerSkillTalentTbl
    {
        /** 唯一id */
        public int Id {get;}
        /** 关联部位 */
        public int Part {get;}
        /** 格子编号 */
        public ImmutableArray<int> Grid {get;}
        /** 前置ID */
        public ImmutableArray<int> Pre {get;}
        /** 天赋位置 */
        public int Index {get;}
        /** 天赋级别 */
        public int Rank {get;}
        /** 技能名称 */
        public string Name {get;}
        /** 天赋描述 */
        public string Description {get;}
        /** 属性加成 */
        public ImmutableArray<ImmutableArray<string>> Property {get;}
        /** 战斗技能 */
        public ImmutableArray<int> BattleSkill {get;}
        /** 技能脚本片段 */
        public string ScriptFrag {get;}
        /** 使用脚本插槽 */
        public string Slot {get;}
        /** 模板限制 */
        public ImmutableArray<string> TemplateLimit {get;}
        /** 解锁品质 */
        public int NeedQuality {get;}
        /** 解锁条件 */
        public int Unlock {get;}

        public PlayerSkillTalentTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Part=TableTool.ToInt(cols[Array.IndexOf(fields, "part")]);
			Grid=TableTool.ToIntArr(cols[Array.IndexOf(fields, "grid")]);
			Pre=TableTool.ToIntArr(cols[Array.IndexOf(fields, "pre")]);
			Index=TableTool.ToInt(cols[Array.IndexOf(fields, "index")]);
			Rank=TableTool.ToInt(cols[Array.IndexOf(fields, "rank")]);
			Name=TableTool.ToString(cols[Array.IndexOf(fields, "name")]);
			Description=TableTool.ToString(cols[Array.IndexOf(fields, "description")]);
			Property=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "property")]);
			BattleSkill=TableTool.ToIntArr(cols[Array.IndexOf(fields, "battleSkill")]);
			ScriptFrag=TableTool.ToString(cols[Array.IndexOf(fields, "scriptFrag")]);
			Slot=TableTool.ToString(cols[Array.IndexOf(fields, "slot")]);
			TemplateLimit=TableTool.ToStringArr(cols[Array.IndexOf(fields, "templateLimit")]);
			NeedQuality=TableTool.ToInt(cols[Array.IndexOf(fields, "needQuality")]);
			Unlock=TableTool.ToInt(cols[Array.IndexOf(fields, "unlock")]);
        }
    }
    public class PetTbl
    {
        /** 唯一id */
        public int Id {get;}
        /** 品质 */
        public int Quality {get;}
        /** 图片资源 */
        public string Img {get;}
        /** 同伴名称 */
        public string Name {get;}
        /** 上阵效果描述 */
        public string Description {get;}
        /** 技能描述参数 */
        public ImmutableArray<string> DescriptionParam {get;}
        /** 战斗属性 */
        public ImmutableArray<ImmutableArray<string>> BattleProperty {get;}
        /** 战斗技能 */
        public ImmutableArray<int> BattleSkill {get;}
        /** 攻击速度 */
        public double AttackSpeed {get;}
        /** 伤害系数 */
        public string Damage {get;}
        /** 普攻战斗技能 */
        public int NormalAttack {get;}
        /** 普攻范围(像素) */
        public int NormalAttackRange {get;}
        /** 移动速度 */
        public int MoveSpeed {get;}

        public PetTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Quality=TableTool.ToInt(cols[Array.IndexOf(fields, "quality")]);
			Img=TableTool.ToString(cols[Array.IndexOf(fields, "img")]);
			Name=TableTool.ToString(cols[Array.IndexOf(fields, "name")]);
			Description=TableTool.ToString(cols[Array.IndexOf(fields, "description")]);
			DescriptionParam=TableTool.ToStringArr(cols[Array.IndexOf(fields, "descriptionParam")]);
			BattleProperty=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "battleProperty")]);
			BattleSkill=TableTool.ToIntArr(cols[Array.IndexOf(fields, "battleSkill")]);
			AttackSpeed=TableTool.ToDouble(cols[Array.IndexOf(fields, "attackSpeed")]);
			Damage=TableTool.ToString(cols[Array.IndexOf(fields, "damage")]);
			NormalAttack=TableTool.ToInt(cols[Array.IndexOf(fields, "normalAttack")]);
			NormalAttackRange=TableTool.ToInt(cols[Array.IndexOf(fields, "normalAttackRange")]);
			MoveSpeed=TableTool.ToInt(cols[Array.IndexOf(fields, "moveSpeed")]);
        }
    }
    public class PetLevelTbl
    {
        /** 不读 */
        public int Id {get;}
        /** 技能等级 */
        public int Level {get;}
        /** 升级所需碎片数（按品质） */
        public ImmutableArray<int> Require {get;}

        public PetLevelTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Level=TableTool.ToInt(cols[Array.IndexOf(fields, "level")]);
			Require=TableTool.ToIntArr(cols[Array.IndexOf(fields, "require")]);
        }
    }
    public class FossilTbl
    {
        /** 唯一id，跟物品表中的化石物品对应 */
        public int Id {get;}
        /** 颜色 */
        public int Color {get;}
        /** 属性 */
        public ImmutableArray<ImmutableArray<string>> Property {get;}
        /** 出售价格 */
        public ImmutableArray<long> Price {get;}
        /** 出现权重 */
        public int Weight {get;}

        public FossilTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Color=TableTool.ToInt(cols[Array.IndexOf(fields, "color")]);
			Property=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "property")]);
			Price=TableTool.ToLongArr(cols[Array.IndexOf(fields, "price")]);
			Weight=TableTool.ToInt(cols[Array.IndexOf(fields, "weight")]);
        }
    }
    public class FossilComboTbl
    {
        /** 唯一id */
        public int Id {get;}
        /** 命星id */
        public int ItemId {get;}
        /** 品质 */
        public int Quality {get;}
        /** 颜色组合 */
        public ImmutableArray<int> Combo {get;}
        /** 属性 */
        public ImmutableArray<ImmutableArray<string>> Property {get;}

        public FossilComboTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			ItemId=TableTool.ToInt(cols[Array.IndexOf(fields, "itemId")]);
			Quality=TableTool.ToInt(cols[Array.IndexOf(fields, "quality")]);
			Combo=TableTool.ToIntArr(cols[Array.IndexOf(fields, "combo")]);
			Property=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "property")]);
        }
    }
    public class ManorFacilityTbl
    {
        /** 唯一id */
        public int Id {get;}
        /** 设施类型 */
        public int Kind {get;}
        /** 庄园建筑名称 */
        public string Name {get;}
        /** 庄园建筑描述 */
        public string Description {get;}
        /** 图片资源 */
        public string Img {get;}
        /** 大小 */
        public ImmutableArray<int> Area {get;}
        /** 解锁等级 */
        public int Unlock {get;}
        /** 初始位置 */
        public ImmutableArray<int> InitPosition {get;}
        /** 背景缩放 */
        public double Scale {get;}

        public ManorFacilityTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Kind=TableTool.ToInt(cols[Array.IndexOf(fields, "kind")]);
			Name=TableTool.ToString(cols[Array.IndexOf(fields, "name")]);
			Description=TableTool.ToString(cols[Array.IndexOf(fields, "description")]);
			Img=TableTool.ToString(cols[Array.IndexOf(fields, "img")]);
			Area=TableTool.ToIntArr(cols[Array.IndexOf(fields, "area")]);
			Unlock=TableTool.ToInt(cols[Array.IndexOf(fields, "unlock")]);
			InitPosition=TableTool.ToIntArr(cols[Array.IndexOf(fields, "initPosition")]);
			Scale=TableTool.ToDouble(cols[Array.IndexOf(fields, "scale")]);
        }
    }
    public class ManorDecorationTbl
    {
        /** 唯一id，跟物品表中的装饰品id对应 */
        public int Id {get;}
        /** 图片偏移量 */
        public ImmutableArray<int> ImgOffset {get;}
        /** 大小 */
        public ImmutableArray<int> Area {get;}
        /** 属性加成 */
        public ImmutableArray<ImmutableArray<string>> Property {get;}
        /** 出售价格 */
        public ImmutableArray<long> Price {get;}
        /** 背景缩放 */
        public double Scale {get;}

        public ManorDecorationTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			ImgOffset=TableTool.ToIntArr(cols[Array.IndexOf(fields, "imgOffset")]);
			Area=TableTool.ToIntArr(cols[Array.IndexOf(fields, "area")]);
			Property=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "property")]);
			Price=TableTool.ToLongArr(cols[Array.IndexOf(fields, "price")]);
			Scale=TableTool.ToDouble(cols[Array.IndexOf(fields, "scale")]);
        }
    }
    public class ManorPlantTbl
    {
        /** 唯一id，跟物品表中的种子或幼崽id对应 */
        public int Id {get;}
        /** 生长时间(秒) */
        public long Time {get;}
        /** 产出权重 */
        public ImmutableArray<int> Weight {get;}
        /** 产出物品 */
        public ImmutableArray<ImmutableArray<long>> Reward {get;}

        public ManorPlantTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Time=TableTool.ToLong(cols[Array.IndexOf(fields, "time")]);
			Weight=TableTool.ToIntArr(cols[Array.IndexOf(fields, "weight")]);
			Reward=TableTool.ToLongMatrix(cols[Array.IndexOf(fields, "reward")]);
        }
    }
    public class JobChangeTbl
    {
        /** 唯一id，确定后不可修改 */
        public int Id {get;}
        /** 职业名称 */
        public string Name {get;}
        /** 头像 */
        public string Avatar {get;}
        /** 图片资源 */
        public string Img {get;}
        /** 动画皮肤 */
        public string Skin {get;}
        /** 职业描述 */
        public string Description {get;}
        /** 职业分支 */
        public int Branch {get;}
        /** 职业阶数 */
        public int Rank {get;}
        /** 技能解锁等级需求 */
        public int LevelRequire {get;}
        /** 普攻 */
        public int NormalAttack {get;}
        /** 主动技能 */
        public int MainSkill {get;}
        /** 被动技能 */
        public ImmutableArray<int> Skill {get;}
        /** 攻击 */
        public string Attack {get;}
        /** 防御 */
        public string Armor {get;}
        /** 生命 */
        public string MaxHp {get;}
        /** 普攻间隔(毫秒) */
        public int NormalAttackInterval {get;}
        /** 普攻范围(像素) */
        public int NormalAttackRange {get;}

        public JobChangeTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Name=TableTool.ToString(cols[Array.IndexOf(fields, "name")]);
			Avatar=TableTool.ToString(cols[Array.IndexOf(fields, "avatar")]);
			Img=TableTool.ToString(cols[Array.IndexOf(fields, "img")]);
			Skin=TableTool.ToString(cols[Array.IndexOf(fields, "skin")]);
			Description=TableTool.ToString(cols[Array.IndexOf(fields, "description")]);
			Branch=TableTool.ToInt(cols[Array.IndexOf(fields, "branch")]);
			Rank=TableTool.ToInt(cols[Array.IndexOf(fields, "rank")]);
			LevelRequire=TableTool.ToInt(cols[Array.IndexOf(fields, "levelRequire")]);
			NormalAttack=TableTool.ToInt(cols[Array.IndexOf(fields, "normalAttack")]);
			MainSkill=TableTool.ToInt(cols[Array.IndexOf(fields, "mainSkill")]);
			Skill=TableTool.ToIntArr(cols[Array.IndexOf(fields, "skill")]);
			Attack=TableTool.ToString(cols[Array.IndexOf(fields, "attack")]);
			Armor=TableTool.ToString(cols[Array.IndexOf(fields, "armor")]);
			MaxHp=TableTool.ToString(cols[Array.IndexOf(fields, "maxHp")]);
			NormalAttackInterval=TableTool.ToInt(cols[Array.IndexOf(fields, "normalAttackInterval")]);
			NormalAttackRange=TableTool.ToInt(cols[Array.IndexOf(fields, "normalAttackRange")]);
        }
    }
    public class JobSkillTbl
    {
        /** 唯一id，确定后不可修改 */
        public int Id {get;}
        /** 图标 */
        public string Img {get;}
        /** 技能名称 */
        public string Name {get;}
        /** 技能描述 */
        public string Description {get;}
        /** 战斗技能 */
        public ImmutableArray<int> BattleSkill {get;}
        /** 附加属性 */
        public ImmutableArray<ImmutableArray<string>> Property {get;}

        public JobSkillTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Img=TableTool.ToString(cols[Array.IndexOf(fields, "img")]);
			Name=TableTool.ToString(cols[Array.IndexOf(fields, "name")]);
			Description=TableTool.ToString(cols[Array.IndexOf(fields, "description")]);
			BattleSkill=TableTool.ToIntArr(cols[Array.IndexOf(fields, "battleSkill")]);
			Property=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "property")]);
        }
    }
    public class JobTalentTbl
    {
        /** 唯一id，不读 */
        public int Id {get;}
        /** 赋能效果，万分比 */
        public ImmutableArray<ImmutableArray<string>> Property {get;}
        /** 图标 */
        public string Img {get;}
        /** 名字 */
        public string TalentName {get;}
        /** 赋能描述 */
        public string Description {get;}
        /** 权重 */
        public string Weight {get;}
        /** 等级上限 */
        public int Limit {get;}

        public JobTalentTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Property=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "property")]);
			Img=TableTool.ToString(cols[Array.IndexOf(fields, "img")]);
			TalentName=TableTool.ToString(cols[Array.IndexOf(fields, "talentName")]);
			Description=TableTool.ToString(cols[Array.IndexOf(fields, "description")]);
			Weight=TableTool.ToString(cols[Array.IndexOf(fields, "weight")]);
			Limit=TableTool.ToInt(cols[Array.IndexOf(fields, "limit")]);
        }
    }
    public class JobTalentLevelTbl
    {
        /** 唯一id，不读 */
        public int Id {get;}
        /** 等级 */
        public int Level {get;}
        /** 需要次数 */
        public long Require {get;}

        public JobTalentLevelTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Level=TableTool.ToInt(cols[Array.IndexOf(fields, "level")]);
			Require=TableTool.ToLong(cols[Array.IndexOf(fields, "require")]);
        }
    }
    public class DamageChallengeTbl
    {
        /** 唯一id，确定后不可修改 */
        public int Id {get;}
        /** 挑战类型 */
        public int Kind {get;}
        /** 伤害数值 */
        public long Damage {get;}
        /** 奖励 */
        public ImmutableArray<ImmutableArray<long>> Reward {get;}
        /** 称号 */
        public string Name {get;}

        public DamageChallengeTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Kind=TableTool.ToInt(cols[Array.IndexOf(fields, "kind")]);
			Damage=TableTool.ToLong(cols[Array.IndexOf(fields, "damage")]);
			Reward=TableTool.ToLongMatrix(cols[Array.IndexOf(fields, "reward")]);
			Name=TableTool.ToString(cols[Array.IndexOf(fields, "name")]);
        }
    }
    public class DamageMonsterTbl
    {
        /** 唯一id，与关卡波次对应 */
        public int Id {get;}
        /** 标题 */
        public string Title {get;}
        /** 怪物名称 */
        public string BossName {get;}
        /** 怪物 */
        public ImmutableArray<int> Monsters {get;}
        /** 描述 */
        public string Description {get;}
        /** 开放限制描述 */
        public string LimitDesc {get;}
        /** 挑战类型 */
        public int Kind {get;}
        /** 缩放 */
        public double Scale {get;}

        public DamageMonsterTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Title=TableTool.ToString(cols[Array.IndexOf(fields, "title")]);
			BossName=TableTool.ToString(cols[Array.IndexOf(fields, "bossName")]);
			Monsters=TableTool.ToIntArr(cols[Array.IndexOf(fields, "monsters")]);
			Description=TableTool.ToString(cols[Array.IndexOf(fields, "description")]);
			LimitDesc=TableTool.ToString(cols[Array.IndexOf(fields, "limitDesc")]);
			Kind=TableTool.ToInt(cols[Array.IndexOf(fields, "kind")]);
			Scale=TableTool.ToDouble(cols[Array.IndexOf(fields, "scale")]);
        }
    }
    public class HeroSoulTbl
    {
        /** 唯一id，确定后不可修改 */
        public int Id {get;}
        /** 品质 */
        public int Quality {get;}
        /** 英魂类型 */
        public int Kind {get;}
        /** 分组 */
        public int Group {get;}
        /** 英魂名称 */
        public string Name {get;}
        /** 描述 */
        public string Description {get;}
        /** 描述参数 */
        public ImmutableArray<string> DescriptionParam {get;}
        /** 战斗技能 */
        public ImmutableArray<int> BattleSkill {get;}
        /** 属性加成 */
        public ImmutableArray<ImmutableArray<string>> Property {get;}

        public HeroSoulTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Quality=TableTool.ToInt(cols[Array.IndexOf(fields, "quality")]);
			Kind=TableTool.ToInt(cols[Array.IndexOf(fields, "kind")]);
			Group=TableTool.ToInt(cols[Array.IndexOf(fields, "group")]);
			Name=TableTool.ToString(cols[Array.IndexOf(fields, "name")]);
			Description=TableTool.ToString(cols[Array.IndexOf(fields, "description")]);
			DescriptionParam=TableTool.ToStringArr(cols[Array.IndexOf(fields, "descriptionParam")]);
			BattleSkill=TableTool.ToIntArr(cols[Array.IndexOf(fields, "battleSkill")]);
			Property=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "property")]);
        }
    }
    public class HeroSoulValueTbl
    {
        /** 主键，不读 */
        public int Id {get;}
        /** 品质 */
        public int Quality {get;}
        /** 升级价值 */
        public int Value {get;}

        public HeroSoulValueTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Quality=TableTool.ToInt(cols[Array.IndexOf(fields, "quality")]);
			Value=TableTool.ToInt(cols[Array.IndexOf(fields, "value")]);
        }
    }
    public class HeroSoulLevelTbl
    {
        /** 主键，不读 */
        public int Id {get;}
        /** 等级 */
        public int Level {get;}
        /** 升级消耗 */
        public int Require {get;}

        public HeroSoulLevelTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Level=TableTool.ToInt(cols[Array.IndexOf(fields, "level")]);
			Require=TableTool.ToInt(cols[Array.IndexOf(fields, "require")]);
        }
    }
    public class HeroSoulBreakTbl
    {
        /** 主键，不读 */
        public int Id {get;}
        /** 突破等级 */
        public int Level {get;}
        /** 升级经验需求 */
        public long Exp {get;}
        /** 突破消耗 */
        public ImmutableArray<ImmutableArray<long>> Require {get;}
        /** 属性万分比 */
        public int Buff {get;}

        public HeroSoulBreakTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Level=TableTool.ToInt(cols[Array.IndexOf(fields, "level")]);
			Exp=TableTool.ToLong(cols[Array.IndexOf(fields, "exp")]);
			Require=TableTool.ToLongMatrix(cols[Array.IndexOf(fields, "require")]);
			Buff=TableTool.ToInt(cols[Array.IndexOf(fields, "buff")]);
        }
    }
    public class DefendTowerTbl
    {
        /** 唯一id */
        public int Id {get;}
        /** 图片资源 */
        public string Img {get;}
        /** 防御塔名称 */
        public string Name {get;}
        /** 战斗技能 */
        public ImmutableArray<int> BattleSkill {get;}
        /** 关联装备部位 */
        public int Part {get;}
        /** 普攻间隔(毫秒) */
        public int NormalAttackInterval {get;}
        /** 生命系数 */
        public string Life {get;}
        /** 防御系数 */
        public string Armor {get;}
        /** 伤害系数 */
        public string Damage {get;}
        /** 普攻战斗技能 */
        public int NormalAttack {get;}
        /** 普攻范围(像素) */
        public int NormalAttackRange {get;}

        public DefendTowerTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Img=TableTool.ToString(cols[Array.IndexOf(fields, "img")]);
			Name=TableTool.ToString(cols[Array.IndexOf(fields, "name")]);
			BattleSkill=TableTool.ToIntArr(cols[Array.IndexOf(fields, "battleSkill")]);
			Part=TableTool.ToInt(cols[Array.IndexOf(fields, "part")]);
			NormalAttackInterval=TableTool.ToInt(cols[Array.IndexOf(fields, "normalAttackInterval")]);
			Life=TableTool.ToString(cols[Array.IndexOf(fields, "life")]);
			Armor=TableTool.ToString(cols[Array.IndexOf(fields, "armor")]);
			Damage=TableTool.ToString(cols[Array.IndexOf(fields, "damage")]);
			NormalAttack=TableTool.ToInt(cols[Array.IndexOf(fields, "normalAttack")]);
			NormalAttackRange=TableTool.ToInt(cols[Array.IndexOf(fields, "normalAttackRange")]);
        }
    }
    public class InfiniteBattleTbl
    {
        /** 唯一id */
        public int Id {get;}
        /** 波数 */
        public ImmutableArray<int> Lv {get;}
        /** 回退记录点 */
        public int RecordPoint {get;}
        /** 出现boss的关卡 */
        public int Boss {get;}
        /** 守卫怪物阵容 */
        public int Guard {get;}
        /** 波数附加等级 */
        public string WaveLevel {get;}
        /** 波次奖励 */
        public ImmutableArray<ImmutableArray<string>> Reward {get;}
        /** 特殊通关奖励 */
        public ImmutableArray<ImmutableArray<string>> SpecialReward {get;}

        public InfiniteBattleTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Lv=TableTool.ToIntArr(cols[Array.IndexOf(fields, "lv")]);
			RecordPoint=TableTool.ToInt(cols[Array.IndexOf(fields, "recordPoint")]);
			Boss=TableTool.ToInt(cols[Array.IndexOf(fields, "boss")]);
			Guard=TableTool.ToInt(cols[Array.IndexOf(fields, "guard")]);
			WaveLevel=TableTool.ToString(cols[Array.IndexOf(fields, "waveLevel")]);
			Reward=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "reward")]);
			SpecialReward=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "specialReward")]);
        }
    }
    public class RogueSkillTbl
    {
        /** 唯一id */
        public int Id {get;}
        /** 被动 */
        public int Passive {get;}
        /** 伤害类型 */
        public int Kind {get;}
        /** 技能名称 */
        public string Name {get;}
        /** 基本描述 */
        public string Description {get;}
        /** 条件 */
        public ImmutableArray<int> Condition {get;}
        /** 基本描述参数 */
        public ImmutableArray<string> DescriptionParam {get;}
        /** 属性 */
        public ImmutableArray<ImmutableArray<string>> Property {get;}
        /** 图片资源 */
        public string Img {get;}

        public RogueSkillTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Passive=TableTool.ToInt(cols[Array.IndexOf(fields, "passive")]);
			Kind=TableTool.ToInt(cols[Array.IndexOf(fields, "kind")]);
			Name=TableTool.ToString(cols[Array.IndexOf(fields, "name")]);
			Description=TableTool.ToString(cols[Array.IndexOf(fields, "description")]);
			Condition=TableTool.ToIntArr(cols[Array.IndexOf(fields, "condition")]);
			DescriptionParam=TableTool.ToStringArr(cols[Array.IndexOf(fields, "descriptionParam")]);
			Property=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "property")]);
			Img=TableTool.ToString(cols[Array.IndexOf(fields, "img")]);
        }
    }
    public class RogueSkillDetailTbl
    {
        /** 不读 */
        public int Id {get;}
        /** 技能id */
        public int SkillId {get;}
        /** 等级 */
        public int Level {get;}
        /** 技能描述 */
        public string Description {get;}
        /** 战斗技能 */
        public ImmutableArray<int> BattleSkill {get;}
        /** 图片资源 */
        public string Img {get;}
        /** 出售价格 */
        public int Price {get;}

        public RogueSkillDetailTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			SkillId=TableTool.ToInt(cols[Array.IndexOf(fields, "skillId")]);
			Level=TableTool.ToInt(cols[Array.IndexOf(fields, "level")]);
			Description=TableTool.ToString(cols[Array.IndexOf(fields, "description")]);
			BattleSkill=TableTool.ToIntArr(cols[Array.IndexOf(fields, "battleSkill")]);
			Img=TableTool.ToString(cols[Array.IndexOf(fields, "img")]);
			Price=TableTool.ToInt(cols[Array.IndexOf(fields, "price")]);
        }
    }
    public class RogueSkillEnhanceTbl
    {
        /** 唯一id */
        public int Id {get;}
        /** 技能id */
        public int SkillId {get;}
        /** 秘籍名称 */
        public string Name {get;}
        /** 描述 */
        public string Description {get;}
        /** 描述参数 */
        public ImmutableArray<string> DescriptionParam {get;}
        /** 属性 */
        public ImmutableArray<ImmutableArray<string>> Property {get;}
        /** 消耗 */
        public string Cost {get;}
        /** 最大等级 */
        public int MaxLevel {get;}
        /** 图片资源 */
        public string Img {get;}

        public RogueSkillEnhanceTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			SkillId=TableTool.ToInt(cols[Array.IndexOf(fields, "skillId")]);
			Name=TableTool.ToString(cols[Array.IndexOf(fields, "name")]);
			Description=TableTool.ToString(cols[Array.IndexOf(fields, "description")]);
			DescriptionParam=TableTool.ToStringArr(cols[Array.IndexOf(fields, "descriptionParam")]);
			Property=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "property")]);
			Cost=TableTool.ToString(cols[Array.IndexOf(fields, "cost")]);
			MaxLevel=TableTool.ToInt(cols[Array.IndexOf(fields, "maxLevel")]);
			Img=TableTool.ToString(cols[Array.IndexOf(fields, "img")]);
        }
    }
    public class RogueBlessTbl
    {
        /** 唯一id */
        public int Id {get;}
        /** 名称 */
        public string Name {get;}
        /** 多语言备注 */
        public string Title {get;}
        /** 描述 */
        public string Description {get;}
        /** 图片资源 */
        public string Img {get;}
        /** 是否核心 */
        public int Core {get;}
        /** 技能脚本 */
        public string Script {get;}
        /** 流派编号 */
        public int Series {get;}
        /** 流派名称 */
        public string SeriesName {get;}

        public RogueBlessTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Name=TableTool.ToString(cols[Array.IndexOf(fields, "name")]);
			Title=TableTool.ToString(cols[Array.IndexOf(fields, "title")]);
			Description=TableTool.ToString(cols[Array.IndexOf(fields, "description")]);
			Img=TableTool.ToString(cols[Array.IndexOf(fields, "img")]);
			Core=TableTool.ToInt(cols[Array.IndexOf(fields, "core")]);
			Script=TableTool.ToString(cols[Array.IndexOf(fields, "script")]);
			Series=TableTool.ToInt(cols[Array.IndexOf(fields, "series")]);
			SeriesName=TableTool.ToString(cols[Array.IndexOf(fields, "seriesName")]);
        }
    }
    public class RogueEquipmentTbl
    {
        /** 唯一id */
        public int Id {get;}
        /** 品质 */
        public int Quality {get;}
        /** 物品类型 */
        public int Kind {get;}
        /** 物品系列 */
        public int Series {get;}
        /** 额外参数 */
        public ImmutableArray<int> Extra {get;}
        /** 名称 */
        public string Name {get;}
        /** 描述 */
        public string Description {get;}
        /** 图片资源 */
        public string Img {get;}
        /** 属性 */
        public ImmutableArray<ImmutableArray<string>> Property {get;}
        /** 普通商店权重 */
        public int Weight {get;}
        /** 高级商店权重 */
        public int Weight2 {get;}

        public RogueEquipmentTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Quality=TableTool.ToInt(cols[Array.IndexOf(fields, "quality")]);
			Kind=TableTool.ToInt(cols[Array.IndexOf(fields, "kind")]);
			Series=TableTool.ToInt(cols[Array.IndexOf(fields, "series")]);
			Extra=TableTool.ToIntArr(cols[Array.IndexOf(fields, "extra")]);
			Name=TableTool.ToString(cols[Array.IndexOf(fields, "name")]);
			Description=TableTool.ToString(cols[Array.IndexOf(fields, "description")]);
			Img=TableTool.ToString(cols[Array.IndexOf(fields, "img")]);
			Property=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "property")]);
			Weight=TableTool.ToInt(cols[Array.IndexOf(fields, "weight")]);
			Weight2=TableTool.ToInt(cols[Array.IndexOf(fields, "weight2")]);
        }
    }
    public class RogueExSkillTbl
    {
        /** 唯一id */
        public int Id {get;}
        /** 伤害类型 */
        public int Kind {get;}
        /** 技能名称 */
        public string Name {get;}
        /** 技能描述 */
        public string Description {get;}
        /** 战斗技能 */
        public ImmutableArray<int> BattleSkill {get;}
        /** 图片资源 */
        public string Img {get;}

        public RogueExSkillTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Kind=TableTool.ToInt(cols[Array.IndexOf(fields, "kind")]);
			Name=TableTool.ToString(cols[Array.IndexOf(fields, "name")]);
			Description=TableTool.ToString(cols[Array.IndexOf(fields, "description")]);
			BattleSkill=TableTool.ToIntArr(cols[Array.IndexOf(fields, "battleSkill")]);
			Img=TableTool.ToString(cols[Array.IndexOf(fields, "img")]);
        }
    }
    public class RogueExSkillEnhanceTbl
    {
        /** 唯一id */
        public int Id {get;}
        /** 神通id */
        public int SkillId {get;}
        /** 等级 */
        public int Level {get;}
        /** 描述 */
        public string Description {get;}
        /** 属性 */
        public ImmutableArray<ImmutableArray<string>> Property {get;}
        /** 隐藏属性 */
        public ImmutableArray<ImmutableArray<string>> HiddenProperty {get;}
        /** 解锁 */
        public ImmutableArray<ImmutableArray<int>> Unlock {get;}

        public RogueExSkillEnhanceTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			SkillId=TableTool.ToInt(cols[Array.IndexOf(fields, "skillId")]);
			Level=TableTool.ToInt(cols[Array.IndexOf(fields, "level")]);
			Description=TableTool.ToString(cols[Array.IndexOf(fields, "description")]);
			Property=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "property")]);
			HiddenProperty=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "hiddenProperty")]);
			Unlock=TableTool.ToIntMatrix(cols[Array.IndexOf(fields, "unlock")]);
        }
    }
    public class TechTreeTbl
    {
        /** 唯一id */
        public int Id {get;}
        /** 解锁等级需求 */
        public int Unlock {get;}
        /** 最大等级 */
        public int MaxLevel {get;}
        /** 图片资源 */
        public string Img {get;}
        /** 知识等级 */
        public ImmutableArray<int> LevelRange {get;}
        /** 对应品质 */
        public ImmutableArray<int> Quality {get;}
        /** 科技名称 */
        public string Name {get;}
        /** 升级物品消耗 */
        public ImmutableArray<ImmutableArray<string>> Cost {get;}
        /** 主角属性加成 */
        public ImmutableArray<ImmutableArray<string>> Property {get;}
        /** 全局buff */
        public ImmutableArray<ImmutableArray<string>> GlobalBuff {get;}
        /** 科技描述 */
        public string Description {get;}
        /** 描述参数 */
        public ImmutableArray<string> DescriptionParam {get;}
        /** 排序 */
        public int Sort {get;}

        public TechTreeTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Unlock=TableTool.ToInt(cols[Array.IndexOf(fields, "unlock")]);
			MaxLevel=TableTool.ToInt(cols[Array.IndexOf(fields, "maxLevel")]);
			Img=TableTool.ToString(cols[Array.IndexOf(fields, "img")]);
			LevelRange=TableTool.ToIntArr(cols[Array.IndexOf(fields, "levelRange")]);
			Quality=TableTool.ToIntArr(cols[Array.IndexOf(fields, "quality")]);
			Name=TableTool.ToString(cols[Array.IndexOf(fields, "name")]);
			Cost=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "cost")]);
			Property=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "property")]);
			GlobalBuff=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "globalBuff")]);
			Description=TableTool.ToString(cols[Array.IndexOf(fields, "description")]);
			DescriptionParam=TableTool.ToStringArr(cols[Array.IndexOf(fields, "descriptionParam")]);
			Sort=TableTool.ToInt(cols[Array.IndexOf(fields, "sort")]);
        }
    }
    public class MountTbl
    {
        /** 唯一id，与物品表的坐骑对应 */
        public int Id {get;}
        /** 部位 */
        public int Part {get;}
        /** 上阵效果 */
        public ImmutableArray<ImmutableArray<string>> FormateProperty {get;}
        /** 碎片 */
        public int Frag {get;}

        public MountTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Part=TableTool.ToInt(cols[Array.IndexOf(fields, "part")]);
			FormateProperty=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "formateProperty")]);
			Frag=TableTool.ToInt(cols[Array.IndexOf(fields, "frag")]);
        }
    }
    public class MountRankTbl
    {
        /** 唯一id，不读 */
        public int Id {get;}
        /** 坐骑队数 */
        public int Level {get;}
        /** 需要道具数量 */
        public long Require {get;}

        public MountRankTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Level=TableTool.ToInt(cols[Array.IndexOf(fields, "level")]);
			Require=TableTool.ToLong(cols[Array.IndexOf(fields, "require")]);
        }
    }
    public class MountPoolTbl
    {
        /** 卡池id，不可修改 */
        public int Id {get;}
        /** 单抽基础价格 */
        public ImmutableArray<int> SinglePrice {get;}
        /** 十连抽基础价格 */
        public ImmutableArray<int> TenPrice {get;}
        /** 每日上限 */
        public int DailyLimit {get;}
        /** 保底抽数 */
        public int Guarantee {get;}
        /** 固定投放物品出现频率 */
        public int Fix {get;}

        public MountPoolTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			SinglePrice=TableTool.ToIntArr(cols[Array.IndexOf(fields, "singlePrice")]);
			TenPrice=TableTool.ToIntArr(cols[Array.IndexOf(fields, "tenPrice")]);
			DailyLimit=TableTool.ToInt(cols[Array.IndexOf(fields, "dailyLimit")]);
			Guarantee=TableTool.ToInt(cols[Array.IndexOf(fields, "guarantee")]);
			Fix=TableTool.ToInt(cols[Array.IndexOf(fields, "fix")]);
        }
    }
    public class MountPoolRewardTbl
    {
        /** 主键 */
        public int Id {get;}
        /** 奖励ID */
        public int RewardId {get;}
        /** 奖励最小数量 */
        public int MinCount {get;}
        /** 奖励最大数量 */
        public int MaxCount {get;}
        /** 出现权重 */
        public int Weight {get;}
        /** 是否属于保底 */
        public int Rare {get;}
        /** 解锁抽数 */
        public int Unlock {get;}

        public MountPoolRewardTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			RewardId=TableTool.ToInt(cols[Array.IndexOf(fields, "rewardId")]);
			MinCount=TableTool.ToInt(cols[Array.IndexOf(fields, "minCount")]);
			MaxCount=TableTool.ToInt(cols[Array.IndexOf(fields, "maxCount")]);
			Weight=TableTool.ToInt(cols[Array.IndexOf(fields, "weight")]);
			Rare=TableTool.ToInt(cols[Array.IndexOf(fields, "rare")]);
			Unlock=TableTool.ToInt(cols[Array.IndexOf(fields, "unlock")]);
        }
    }
    public class PlayerSkinTbl
    {
        /** 唯一id，与物品表的坐骑对应 */
        public int Id {get;}
        /** 初始拥有 */
        public int BaseMount {get;}
        /** 角色spine */
        public string Spine {get;}
        /** spine皮肤 */
        public string Skin {get;}
        /** 拥有效果 */
        public ImmutableArray<ImmutableArray<string>> Property {get;}
        /** 上阵效果 */
        public ImmutableArray<ImmutableArray<string>> FormateProperty {get;}
        /** 额外技能名称 */
        public string SkillName {get;}
        /** 额外技能描述 */
        public string SkillDescription {get;}
        /** 战斗技能 */
        public ImmutableArray<int> BattleSkill {get;}

        public PlayerSkinTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			BaseMount=TableTool.ToInt(cols[Array.IndexOf(fields, "baseMount")]);
			Spine=TableTool.ToString(cols[Array.IndexOf(fields, "spine")]);
			Skin=TableTool.ToString(cols[Array.IndexOf(fields, "skin")]);
			Property=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "property")]);
			FormateProperty=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "formateProperty")]);
			SkillName=TableTool.ToString(cols[Array.IndexOf(fields, "skillName")]);
			SkillDescription=TableTool.ToString(cols[Array.IndexOf(fields, "skillDescription")]);
			BattleSkill=TableTool.ToIntArr(cols[Array.IndexOf(fields, "battleSkill")]);
        }
    }
    public class PlayerMountTbl
    {
        /** 唯一id，与物品表的坐骑对应 */
        public int Id {get;}
        /** 初始拥有 */
        public int BaseMount {get;}
        /** 坐骑spine */
        public string Spine {get;}
        /** spine皮肤 */
        public string Skin {get;}
        /** 拥有效果 */
        public ImmutableArray<ImmutableArray<string>> Property {get;}
        /** 上阵效果 */
        public ImmutableArray<ImmutableArray<string>> FormateProperty {get;}
        /** 额外技能名称 */
        public string SkillName {get;}
        /** 额外技能描述 */
        public string SkillDescription {get;}
        /** 战斗技能 */
        public ImmutableArray<int> BattleSkill {get;}

        public PlayerMountTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			BaseMount=TableTool.ToInt(cols[Array.IndexOf(fields, "baseMount")]);
			Spine=TableTool.ToString(cols[Array.IndexOf(fields, "spine")]);
			Skin=TableTool.ToString(cols[Array.IndexOf(fields, "skin")]);
			Property=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "property")]);
			FormateProperty=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "formateProperty")]);
			SkillName=TableTool.ToString(cols[Array.IndexOf(fields, "skillName")]);
			SkillDescription=TableTool.ToString(cols[Array.IndexOf(fields, "skillDescription")]);
			BattleSkill=TableTool.ToIntArr(cols[Array.IndexOf(fields, "battleSkill")]);
        }
    }
    public class BattleRogueBossTbl
    {
        /** 唯一id */
        public int Id {get;}
        /** 图片资源 */
        public string Img {get;}
        /** 名称 */
        public string Name {get;}
        /** 描述 */
        public string Description {get;}
        /** 技能配置 */
        public ImmutableArray<ImmutableArray<int>> Skill {get;}

        public BattleRogueBossTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Img=TableTool.ToString(cols[Array.IndexOf(fields, "img")]);
			Name=TableTool.ToString(cols[Array.IndexOf(fields, "name")]);
			Description=TableTool.ToString(cols[Array.IndexOf(fields, "description")]);
			Skill=TableTool.ToIntMatrix(cols[Array.IndexOf(fields, "skill")]);
        }
    }
    public class BattleRogueBossSkillTbl
    {
        /** 唯一id */
        public int Id {get;}
        /** 技能图标 */
        public string Img {get;}
        /** 技能名称 */
        public string Name {get;}
        /** 技能描述 */
        public string Description {get;}
        /** boss台词 */
        public string Word {get;}
        /** 特效 */
        public string Effect {get;}
        /** 效果配置 */
        public ImmutableArray<ImmutableArray<string>> Config {get;}

        public BattleRogueBossSkillTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Img=TableTool.ToString(cols[Array.IndexOf(fields, "img")]);
			Name=TableTool.ToString(cols[Array.IndexOf(fields, "name")]);
			Description=TableTool.ToString(cols[Array.IndexOf(fields, "description")]);
			Word=TableTool.ToString(cols[Array.IndexOf(fields, "word")]);
			Effect=TableTool.ToString(cols[Array.IndexOf(fields, "effect")]);
			Config=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "config")]);
        }
    }
    public class ChargeTbl
    {
        /** 唯一id，一经确定不可修改 */
        public int Id {get;}
        /** 类型 */
        public int Kind {get;}
        /** 商品名 */
        public string Name {get;}
        /** 商品描述 */
        public string Description {get;}
        /** 人民币价格（单位为分） */
        public int Cny {get;}
        /** 美元价格（单位为分） */
        public int Usd {get;}
        /** 易美商品id */
        public string MarSku {get;}

        public ChargeTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Kind=TableTool.ToInt(cols[Array.IndexOf(fields, "kind")]);
			Name=TableTool.ToString(cols[Array.IndexOf(fields, "name")]);
			Description=TableTool.ToString(cols[Array.IndexOf(fields, "description")]);
			Cny=TableTool.ToInt(cols[Array.IndexOf(fields, "cny")]);
			Usd=TableTool.ToInt(cols[Array.IndexOf(fields, "usd")]);
			MarSku=TableTool.ToString(cols[Array.IndexOf(fields, "marSku")]);
        }
    }
    public class ActivitiesTbl
    {
        /** 唯一id,不可修改,与ui绑定表对应 */
        public int Id {get;}
        /** 活动名 */
        public string ActivityName {get;}
        /** 活动天数 */
        public int LastDay {get;}
        /** 延迟开启活动天数 */
        public int Delay {get;}
        /** 活动类型 */
        public int Kind {get;}
        /** 邮件模板 */
        public int EmailId {get;}
        /** 排行榜编号 */
        public int RankingIndex {get;}

        public ActivitiesTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			ActivityName=TableTool.ToString(cols[Array.IndexOf(fields, "activityName")]);
			LastDay=TableTool.ToInt(cols[Array.IndexOf(fields, "lastDay")]);
			Delay=TableTool.ToInt(cols[Array.IndexOf(fields, "delay")]);
			Kind=TableTool.ToInt(cols[Array.IndexOf(fields, "kind")]);
			EmailId=TableTool.ToInt(cols[Array.IndexOf(fields, "emailId")]);
			RankingIndex=TableTool.ToInt(cols[Array.IndexOf(fields, "rankingIndex")]);
        }
    }
    public class MetaTableExtendTbl
    {
        /** 索引 */
        public int Id {get;}
        /** 基类名称 */
        public string Name {get;}
        /** 字段 */
        public ImmutableArray<ImmutableArray<string>> Fields {get;}
        /** 子类 */
        public ImmutableArray<string> ChildClass {get;}

        public MetaTableExtendTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Name=TableTool.ToString(cols[Array.IndexOf(fields, "name")]);
			Fields=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "fields")]);
			ChildClass=TableTool.ToStringArr(cols[Array.IndexOf(fields, "childClass")]);
        }
    }
    public class EnumTbl
    {
        /** 索引 */
        public int Id {get;}
        /** 枚举名称 */
        public string Name {get;}
        /** 枚举值 */
        public ImmutableArray<string> Value {get;}

        public EnumTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Name=TableTool.ToString(cols[Array.IndexOf(fields, "name")]);
			Value=TableTool.ToStringArr(cols[Array.IndexOf(fields, "value")]);
        }
    }
    public class UIBindTbl
    {
        /** 不读 */
        public int Id {get;}
        /** 预制体 */
        public string Prefab {get;}
        /** 节点 */
        public string Node {get;}
        /** 组件 */
        public string Component {get;}
        /** 组件属性 */
        public string Property {get;}
        /** 绑定类型 */
        public string BindType {get;}
        /** 绑定逻辑 */
        public string Logic {get;}

        public UIBindTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Prefab=TableTool.ToString(cols[Array.IndexOf(fields, "prefab")]);
			Node=TableTool.ToString(cols[Array.IndexOf(fields, "node")]);
			Component=TableTool.ToString(cols[Array.IndexOf(fields, "component")]);
			Property=TableTool.ToString(cols[Array.IndexOf(fields, "property")]);
			BindType=TableTool.ToString(cols[Array.IndexOf(fields, "bindType")]);
			Logic=TableTool.ToString(cols[Array.IndexOf(fields, "logic")]);
        }
    }
    public class UIMainSceneTbl
    {
        /** 主键，可以修改 */
        public int Id {get;}
        /** 位置 */
        public int Position {get;}
        /** 文本 */
        public string Text {get;}
        /** 图标 */
        public string Img {get;}
        /** 打开的窗口 */
        public string Window {get;}
        /** 打开窗口的参数 */
        public string WindowParam {get;}
        /** 解锁等级 */
        public int UnlockLevel {get;}
        /** 功能id */
        public int SystemId {get;}
        /** 红点 */
        public int RedTip {get;}

        public UIMainSceneTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Position=TableTool.ToInt(cols[Array.IndexOf(fields, "position")]);
			Text=TableTool.ToString(cols[Array.IndexOf(fields, "text")]);
			Img=TableTool.ToString(cols[Array.IndexOf(fields, "img")]);
			Window=TableTool.ToString(cols[Array.IndexOf(fields, "window")]);
			WindowParam=TableTool.ToString(cols[Array.IndexOf(fields, "windowParam")]);
			UnlockLevel=TableTool.ToInt(cols[Array.IndexOf(fields, "unlockLevel")]);
			SystemId=TableTool.ToInt(cols[Array.IndexOf(fields, "systemId")]);
			RedTip=TableTool.ToInt(cols[Array.IndexOf(fields, "redTip")]);
        }
    }
    public class ClientLangTbl
    {
        /** 主键，可以随便改 */
        public int Id {get;}
        /** 多语言key路径 */
        public string ConfigPath {get;}
        /** 简体 */
        public string Zh_chs {get;}
        /** 繁体 */
        public string Zh_cht {get;}
        /** 英文 */
        public string En {get;}

        public ClientLangTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			ConfigPath=TableTool.ToString(cols[Array.IndexOf(fields, "configPath")]);
			Zh_chs=TableTool.ToString(cols[Array.IndexOf(fields, "zh_chs")]);
			Zh_cht=TableTool.ToString(cols[Array.IndexOf(fields, "zh_cht")]);
			En=TableTool.ToString(cols[Array.IndexOf(fields, "en")]);
        }
    }
    public class MissionKindTbl
    {
        /** 主键，任务类型 */
        public int Id {get;}
        /** 分类 */
        public int Kind {get;}
        /** 基本描述文本 */
        public string Description {get;}
        /** 附加描述文本 */
        public ImmutableArray<string> DescriptionParam {get;}
        /** 跳转逻辑 */
        public ImmutableArray<string> Guide {get;}

        public MissionKindTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Kind=TableTool.ToInt(cols[Array.IndexOf(fields, "kind")]);
			Description=TableTool.ToString(cols[Array.IndexOf(fields, "description")]);
			DescriptionParam=TableTool.ToStringArr(cols[Array.IndexOf(fields, "descriptionParam")]);
			Guide=TableTool.ToStringArr(cols[Array.IndexOf(fields, "guide")]);
        }
    }
    public class UIRedTipTbl
    {
        /** 唯一id */
        public int Id {get;}
        /** 处理函数 */
        public ImmutableArray<string> Func {get;}
        /** 依赖的状态key */
        public ImmutableArray<string> StateKey {get;}
        /** 依赖的额外事件 */
        public ImmutableArray<string> ExtraEvent {get;}
        /** 功能id */
        public int SystemId {get;}
        /** 子节点 */
        public ImmutableArray<int> Child {get;}

        public UIRedTipTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Func=TableTool.ToStringArr(cols[Array.IndexOf(fields, "func")]);
			StateKey=TableTool.ToStringArr(cols[Array.IndexOf(fields, "stateKey")]);
			ExtraEvent=TableTool.ToStringArr(cols[Array.IndexOf(fields, "extraEvent")]);
			SystemId=TableTool.ToInt(cols[Array.IndexOf(fields, "systemId")]);
			Child=TableTool.ToIntArr(cols[Array.IndexOf(fields, "child")]);
        }
    }
    public class BattlePropertyTbl
    {
        /** 唯一id */
        public int Id {get;}
        /** 符号 */
        public string Key {get;}
        /** 展示名称 */
        public string DisplayName {get;}
        /** 展示描述 */
        public string DisplayDesc {get;}
        /** 战斗力计算 */
        public double BattlePoint {get;}
        /** 展示方式 */
        public int DisplayMethod {get;}
        /** 默认值 */
        public int DefaultValue {get;}
        /** 详情展示 */
        public ImmutableArray<int> TipWindow {get;}

        public BattlePropertyTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Key=TableTool.ToString(cols[Array.IndexOf(fields, "key")]);
			DisplayName=TableTool.ToString(cols[Array.IndexOf(fields, "displayName")]);
			DisplayDesc=TableTool.ToString(cols[Array.IndexOf(fields, "displayDesc")]);
			BattlePoint=TableTool.ToDouble(cols[Array.IndexOf(fields, "battlePoint")]);
			DisplayMethod=TableTool.ToInt(cols[Array.IndexOf(fields, "displayMethod")]);
			DefaultValue=TableTool.ToInt(cols[Array.IndexOf(fields, "defaultValue")]);
			TipWindow=TableTool.ToIntArr(cols[Array.IndexOf(fields, "tipWindow")]);
        }
    }
    public class ServerLangTbl
    {
        /** 主键，可以随便改 */
        public int Id {get;}
        /** 错误码 */
        public int Code {get;}
        /** 多语言key路径 */
        public string ConfigPath {get;}
        /** 简体 */
        public string Zh_chs {get;}
        /** 繁体 */
        public string Zh_cht {get;}
        /** 英文 */
        public string En {get;}

        public ServerLangTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Code=TableTool.ToInt(cols[Array.IndexOf(fields, "code")]);
			ConfigPath=TableTool.ToString(cols[Array.IndexOf(fields, "configPath")]);
			Zh_chs=TableTool.ToString(cols[Array.IndexOf(fields, "zh_chs")]);
			Zh_cht=TableTool.ToString(cols[Array.IndexOf(fields, "zh_cht")]);
			En=TableTool.ToString(cols[Array.IndexOf(fields, "en")]);
        }
    }
    public class ServerAnnouncementTbl
    {
        /** 主键，不读 */
        public int Id {get;}
        /** 标题 */
        public string Title {get;}
        /** 内容 */
        public string Content {get;}
        /** 开始时间 */
        public long Begin_time {get;}
        /** 结束时间 */
        public long End_time {get;}
        /** 优先级 */
        public int Priority {get;}
        /** 规则 */
        public ImmutableArray<ImmutableArray<string>> Rule {get;}

        public ServerAnnouncementTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Title=TableTool.ToString(cols[Array.IndexOf(fields, "title")]);
			Content=TableTool.ToString(cols[Array.IndexOf(fields, "content")]);
			Begin_time=TableTool.ToLong(cols[Array.IndexOf(fields, "begin_time")]);
			End_time=TableTool.ToLong(cols[Array.IndexOf(fields, "end_time")]);
			Priority=TableTool.ToInt(cols[Array.IndexOf(fields, "priority")]);
			Rule=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "rule")]);
        }
    }
    public class ServerEmailTemplateTbl
    {
        /** 确定后不可修改，不可删除 */
        public int Id {get;}
        /** 标题 */
        public string Title {get;}
        /** 内容 */
        public string Content {get;}
        /** 奖励 */
        public string Reward {get;}

        public ServerEmailTemplateTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Title=TableTool.ToString(cols[Array.IndexOf(fields, "title")]);
			Content=TableTool.ToString(cols[Array.IndexOf(fields, "content")]);
			Reward=TableTool.ToString(cols[Array.IndexOf(fields, "reward")]);
        }
    }
    public class ServerGroupEmailTbl
    {
        /** 确定后不可修改，不可删除 */
        public int Id {get;}
        /** 标题 */
        public string Title {get;}
        /** 内容 */
        public string Content {get;}
        /** 奖励 */
        public ImmutableArray<ImmutableArray<long>> Reward {get;}
        /** 开始时间 */
        public long Begin_time {get;}
        /** 结束时间 */
        public long End_time {get;}
        /** 规则 */
        public ImmutableArray<ImmutableArray<string>> Rule {get;}

        public ServerGroupEmailTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Title=TableTool.ToString(cols[Array.IndexOf(fields, "title")]);
			Content=TableTool.ToString(cols[Array.IndexOf(fields, "content")]);
			Reward=TableTool.ToLongMatrix(cols[Array.IndexOf(fields, "reward")]);
			Begin_time=TableTool.ToLong(cols[Array.IndexOf(fields, "begin_time")]);
			End_time=TableTool.ToLong(cols[Array.IndexOf(fields, "end_time")]);
			Rule=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "rule")]);
        }
    }
    public class ServerCdKeyTbl
    {
        /** 主键，不读 */
        public int Id {get;}
        /** 兑换的key */
        public string Key {get;}
        /** 奖励 */
        public ImmutableArray<ImmutableArray<long>> Reward {get;}
        /** 开始时间 */
        public long Begin_time {get;}
        /** 结束时间 */
        public long End_time {get;}
        /** 规则 */
        public ImmutableArray<ImmutableArray<string>> Rule {get;}

        public ServerCdKeyTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Key=TableTool.ToString(cols[Array.IndexOf(fields, "key")]);
			Reward=TableTool.ToLongMatrix(cols[Array.IndexOf(fields, "reward")]);
			Begin_time=TableTool.ToLong(cols[Array.IndexOf(fields, "begin_time")]);
			End_time=TableTool.ToLong(cols[Array.IndexOf(fields, "end_time")]);
			Rule=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "rule")]);
        }
    }
    public class ServerCdKeyOnceConfigTbl
    {
        /** 主键，不可修改，一旦创建不可删除 */
        public int Id {get;}
        /** 奖励 */
        public ImmutableArray<ImmutableArray<long>> Reward {get;}
        /** 规则 */
        public ImmutableArray<ImmutableArray<string>> Rule {get;}
        /** 该类型每个玩家只能领取一次 */
        public int Once {get;}

        public ServerCdKeyOnceConfigTbl(string row, string[] fields)
        {
            var cols = row.Split('\t');
			Id=TableTool.ToInt(cols[Array.IndexOf(fields, "id")]);
			Reward=TableTool.ToLongMatrix(cols[Array.IndexOf(fields, "reward")]);
			Rule=TableTool.ToStringeMatrix(cols[Array.IndexOf(fields, "rule")]);
			Once=TableTool.ToInt(cols[Array.IndexOf(fields, "once")]);
        }
    }
}


        