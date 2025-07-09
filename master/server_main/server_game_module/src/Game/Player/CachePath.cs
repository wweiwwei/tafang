namespace GamePlay
{
    public class UpdateKey
    {
        public readonly string Path;
        public UpdateKey(string path)
        {
            Path = path;
        }
    }

    public class PartialUpdateKey
    {
        public readonly string Path;
        public PartialUpdateKey(string path)
        {
            Path = path;
        }
    }

    public static class CachePath
    {
        public static readonly PartialUpdateKey storage = new("storage");
        public static readonly PartialUpdateKey hero = new("hero");
        public static readonly PartialUpdateKey equipment = new("equipment");
        public static readonly PartialUpdateKey formation = new("formation");
        public static readonly PartialUpdateKey stage = new("stage");
        public static readonly UpdateKey stageAfkMap = new("stageAfkMap");
        public static readonly UpdateKey stageAchievementRewardHasGet = new("stageAchievementRewardHasGet");
        public static readonly UpdateKey lastStageBattleTime = new("lastStageBattleTime");
        public static readonly UpdateKey time = new("time");
        public static readonly UpdateKey email = new("email");
        public static readonly UpdateKey charge = new("charge");
        public static readonly PartialUpdateKey cardPool = new("cardPool");
        public static readonly PartialUpdateKey mainMission = new("mainMission");
        public static readonly UpdateKey mainMissionTask = new("mainMissionTask");
        public static readonly UpdateKey battleCar = new("battleCar");
        public static readonly PartialUpdateKey battleCarEquipment = new("battleCarEquipment");
        public static readonly PartialUpdateKey relation = new("relation");
        public static readonly UpdateKey enemyData = new("enemyData");
        public static readonly UpdateKey mineData = new("mineData");
        public static readonly PartialUpdateKey mineBrick = new("mineBrick");
        public static readonly UpdateKey collectionData = new("collectionData");
        public static readonly UpdateKey towerData = new("towerData");
        public static readonly UpdateKey towerAfkReward = new("towerAfkReward");
        public static readonly UpdateKey guideData = new("guideData");
        public static readonly UpdateKey magicStaff = new("magicStaff");
        public static readonly UpdateKey turntableData = new("turntableData");
        public static readonly PartialUpdateKey giftPack = new("giftPack");
        public static readonly UpdateKey chargeData = new("chargeData");
        public static readonly UpdateKey playerData = new("playerData");
        public static readonly UpdateKey playerEquipment = new("playerEquipment");
        public static readonly UpdateKey tempEquipment = new("tempEquipment");
        public static readonly PartialUpdateKey playerEquipmentStorage = new("playerEquipmentStorage");
        public static readonly PartialUpdateKey playerEquipmentPlace = new("playerEquipmentPlace");
        public static readonly UpdateKey towerWashData = new("towerWashData");
        public static readonly UpdateKey stone = new("stone");
        public static readonly UpdateKey level = new("level");
        public static readonly UpdateKey rank = new("rank");
        public static readonly UpdateKey stoneAuto = new("stoneAuto");
        public static readonly UpdateKey currentSkillFormation = new("currentSkillFormation");
        public static readonly PartialUpdateKey playerSkill = new("playerSkill");
        public static readonly PartialUpdateKey skillFormation = new("skillFormation");
        public static readonly UpdateKey currentPetFormation = new("currentPetFormation");
        public static readonly PartialUpdateKey playerPet = new("playerPet");
        public static readonly PartialUpdateKey petFormation = new("petFormation");
        public static readonly PartialUpdateKey sprites = new("sprites");
        public static readonly UpdateKey spriteFormation = new("spriteFormation");
        public static readonly UpdateKey spritePool = new("spritePool");
        public static readonly UpdateKey fossilData = new("fossilData");
        public static readonly PartialUpdateKey manorData = new("manorData");
        public static readonly UpdateKey techData = new("techData");
        public static readonly PartialUpdateKey techTree = new("techTree");
        public static readonly PartialUpdateKey playerMission = new("playerMission");
        public static readonly UpdateKey damageData = new("damageData");
        public static readonly UpdateKey careerData = new("careerData");
        public static readonly PartialUpdateKey careerTalent = new("careerTalent");
        public static readonly UpdateKey equipmentCollection = new("equipmentCollection");
        public static readonly UpdateKey towerFormation = new("towerFormation");
        public static readonly PartialUpdateKey towerTalent = new("towerTalent");
        public static readonly UpdateKey videoGroupPurchaseData = new("videoGroupPurchaseData");
        public static readonly PartialUpdateKey equipmentMonster = new("equipmentMonster");
        public static readonly UpdateKey infiniteData = new("infiniteData");
        public static readonly UpdateKey banquetData = new("banquetData");
        public static readonly PartialUpdateKey banquetMission = new("banquetMission");
        public static readonly UpdateKey impactData = new("impactData");
        public static readonly PartialUpdateKey warOrder = new("warOrder");
        // public static readonly UpdateKey shopData = new("shopData");
        public static readonly PartialUpdateKey challengeMission = new("challengeMission");
        public static readonly PartialUpdateKey skillLv = new("skillLv");
        public static readonly PartialUpdateKey exSkillLv = new("exSkillLv");
        public static readonly UpdateKey curExSkill = new("curExSkill");
        public static readonly UpdateKey skinStorage = new("skinStorage");
        public static readonly UpdateKey skinCurrent = new("skinCurrent");
        public static readonly UpdateKey mountStorage = new("mountStorage");
        public static readonly UpdateKey mountCurrent = new("mountCurrent");
        public static readonly UpdateKey powerData = new("powerData");
        public static readonly UpdateKey stageAdInfo = new("stageAdInfo");
        public static readonly UpdateKey stageFirstReward = new("stageFirstReward");
        public static readonly UpdateKey stageWaveRecord = new("stageWaveRecord");
    }
}