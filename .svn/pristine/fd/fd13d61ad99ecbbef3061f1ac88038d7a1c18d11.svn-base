
        
using System.Linq;
using System.Collections.Immutable;

#pragma warning disable CS8618

namespace GamePlay
{
    class GConfig
    {
        public static TableConfigData Ins;

    }

    internal class TableConfigTool
    {
        public static int aInt(ImmutableArray<string> origin)
        {
            return int.Parse(origin[0]);
        }

        public static ImmutableArray<int> aIntArr(ImmutableArray<string> origin)
        {
            return origin.Select(o => int.Parse(o)).ToImmutableArray();
        }

        public static ImmutableArray<ImmutableArray<int>> aIntMatrix(ImmutableArray<string> origin)
        {
            return origin.Select(o => aIntArr(o.Split(",").ToImmutableArray())).ToImmutableArray();
        }

        public static long aLong(ImmutableArray<string> origin)
        {
            return long.Parse(origin[0]);
        }

        public static ImmutableArray<long> aLongArr(ImmutableArray<string> origin)
        {
            return origin.Select(o => long.Parse(o)).ToImmutableArray();
        }

        public static ImmutableArray<ImmutableArray<long>> alongMatrix(ImmutableArray<string> origin)
        {
            return origin.Select(o => aLongArr(o.Split(",").ToImmutableArray())).ToImmutableArray();
        }

        public static double aDouble(ImmutableArray<string> origin)
        {
            return double.Parse(origin[0]);
        }

        public static ImmutableArray<double> aDoubleArr(ImmutableArray<string> origin)
        {
            return origin.Select(o => double.Parse(o)).ToImmutableArray();
        }

        public static ImmutableArray<ImmutableArray<double>> aDoubleMatrix(ImmutableArray<string> origin)
        {
            return origin.Select(o => aDoubleArr(o.Split(",").ToImmutableArray())).ToImmutableArray();
        }

        public static string aString(ImmutableArray<string> origin)
        {
            return origin[0];
        }

        public static ImmutableArray<string> aStringArr(ImmutableArray<string> origin)
        {
            return origin;
        }

        public static ImmutableArray<ImmutableArray<string>> aStringMatrix(ImmutableArray<string> origin)
        {
            return origin.Select(o => o.Split(",").ToImmutableArray()).ToImmutableArray();
        }

        public static Item aItem(ImmutableArray<string> origin)
        {
            return new Item(int.Parse(origin[0]), long.Parse(origin[1]));
        }

        public static ImmutableArray<Item> aItemArr(ImmutableArray<string> origin)
        {
            return origin.Select(o => aItem(o.Split(",").ToImmutableArray())).ToImmutableArray();
        }

        public static ImmutableArray<string> getConfig(TableData data, string path)
        {
            return data.GameConfigTblList.First(t => t.ConfigPath == path).Config;
        }
    }

    public class TableConfigData
    {
        public readonly TableConfigItemFacility Facility;
        public readonly TableConfigItemHero Hero;
        public readonly TableConfigItemStage Stage;
        public readonly TableConfigItemKnapsack Knapsack;
        public readonly TableConfigItemEnemy Enemy;
        public readonly TableConfigItemBattle Battle;
        public readonly TableConfigItemMine Mine;
        public readonly TableConfigItemSurvivor Survivor;
        public readonly TableConfigItemCardPool CardPool;
        public readonly TableConfigItemStory Story;
        public readonly TableConfigItemArena Arena;
        public readonly TableConfigItemTurntable Turntable;
        public readonly TableConfigItemSurvivorTick SurvivorTick;
        public readonly TableConfigItemTower Tower;
        public readonly TableConfigItemPlayer Player;
        public readonly TableConfigItemManor Manor;
        public readonly TableConfigItemTechTree TechTree;
        public readonly TableConfigItemJob Job;
        public readonly TableConfigItemDamageChallenge DamageChallenge;
        public readonly TableConfigItemCareer Career;
        public readonly TableConfigItemEquipment Equipment;
        public readonly TableConfigItemVideoGroupPurchase VideoGroupPurchase;
        public readonly TableConfigItemStone Stone;
        public readonly TableConfigItemSprite Sprite;
        public readonly TableConfigItemBanquet Banquet;
        public readonly TableConfigItemImpactRank ImpactRank;

        public TableConfigData(TableData data)
        {
            Facility = new TableConfigItemFacility(data);
            Hero = new TableConfigItemHero(data);
            Stage = new TableConfigItemStage(data);
            Knapsack = new TableConfigItemKnapsack(data);
            Enemy = new TableConfigItemEnemy(data);
            Battle = new TableConfigItemBattle(data);
            Mine = new TableConfigItemMine(data);
            Survivor = new TableConfigItemSurvivor(data);
            CardPool = new TableConfigItemCardPool(data);
            Story = new TableConfigItemStory(data);
            Arena = new TableConfigItemArena(data);
            Turntable = new TableConfigItemTurntable(data);
            SurvivorTick = new TableConfigItemSurvivorTick(data);
            Tower = new TableConfigItemTower(data);
            Player = new TableConfigItemPlayer(data);
            Manor = new TableConfigItemManor(data);
            TechTree = new TableConfigItemTechTree(data);
            Job = new TableConfigItemJob(data);
            DamageChallenge = new TableConfigItemDamageChallenge(data);
            Career = new TableConfigItemCareer(data);
            Equipment = new TableConfigItemEquipment(data);
            VideoGroupPurchase = new TableConfigItemVideoGroupPurchase(data);
            Stone = new TableConfigItemStone(data);
            Sprite = new TableConfigItemSprite(data);
            Banquet = new TableConfigItemBanquet(data);
            ImpactRank = new TableConfigItemImpactRank(data);
        }
    }


    public class TableConfigItemFacility
    {
        /** 每层楼梯位置 */
        public readonly ImmutableArray<int> Stairs;
        /** 建筑阶数等级上限 */
        public readonly ImmutableArray<int> RankLevelLimit;
        /** 建筑英雄入驻品质系数 */
        public readonly ImmutableArray<int> HeroQualityBuff;
        /** 玩家初始建筑 */
        public readonly ImmutableArray<int> InitFacility;
        /** 建筑升星等级限制 */
        public readonly ImmutableArray<int> FacilityUpgradeStarRequire;
        /** 建筑挂机最大收益时间（分钟） */
        public readonly int MaxAfkTime;
        /** 建筑升星需达到阶数 */
        public readonly int FacilityUpstarPremise;

        public TableConfigItemFacility(TableData data)
        {
            Stairs = TableConfigTool.aIntArr(TableConfigTool.getConfig(data, "facility/stairs"));
            RankLevelLimit = TableConfigTool.aIntArr(TableConfigTool.getConfig(data, "facility/rankLevelLimit"));
            HeroQualityBuff = TableConfigTool.aIntArr(TableConfigTool.getConfig(data, "facility/heroQualityBuff"));
            InitFacility = TableConfigTool.aIntArr(TableConfigTool.getConfig(data, "facility/initFacility"));
            FacilityUpgradeStarRequire = TableConfigTool.aIntArr(TableConfigTool.getConfig(data, "facility/facilityUpgradeStarRequire"));
            MaxAfkTime = TableConfigTool.aInt(TableConfigTool.getConfig(data, "facility/maxAfkTime"));
            FacilityUpstarPremise = TableConfigTool.aInt(TableConfigTool.getConfig(data, "facility/facilityUpstarPremise"));
        }
    }

    public class TableConfigItemHero
    {
        /** 英雄各阶等级上限 */
        public readonly ImmutableArray<int> RankLevelLimit;
        /** 英雄各星级等级上限 */
        public readonly ImmutableArray<int> StarLevelLimit;
        /** 英雄装备各阶等级上限 */
        public readonly ImmutableArray<int> EquipmentRankLevelLimit;
        /** 英雄技能解锁所需星级 */
        public readonly ImmutableArray<int> SkillUnlockStar;
        /** 不同品质英雄合成所需碎片数量 */
        public readonly ImmutableArray<int> ComposeRequire;
        /** 重置英雄钻石消耗 */
        public readonly int ResetHeroDiamond;
        /** 玩家初始英雄 */
        public readonly ImmutableArray<int> InitHero;
        /** 玩家初始编队(前锋，空军，后排，留空填-1) */
        public readonly ImmutableArray<int> InitFormation;
        /** 编队位置解锁（船长室阶数） */
        public readonly ImmutableArray<int> FormationUnlock;
        /** 通关1-1时获得英雄 */
        public readonly int StageReward;

        public TableConfigItemHero(TableData data)
        {
            RankLevelLimit = TableConfigTool.aIntArr(TableConfigTool.getConfig(data, "hero/rankLevelLimit"));
            StarLevelLimit = TableConfigTool.aIntArr(TableConfigTool.getConfig(data, "hero/starLevelLimit"));
            EquipmentRankLevelLimit = TableConfigTool.aIntArr(TableConfigTool.getConfig(data, "hero/equipmentRankLevelLimit"));
            SkillUnlockStar = TableConfigTool.aIntArr(TableConfigTool.getConfig(data, "hero/skillUnlockStar"));
            ComposeRequire = TableConfigTool.aIntArr(TableConfigTool.getConfig(data, "hero/composeRequire"));
            ResetHeroDiamond = TableConfigTool.aInt(TableConfigTool.getConfig(data, "hero/resetHeroDiamond"));
            InitHero = TableConfigTool.aIntArr(TableConfigTool.getConfig(data, "hero/initHero"));
            InitFormation = TableConfigTool.aIntArr(TableConfigTool.getConfig(data, "hero/initFormation"));
            FormationUnlock = TableConfigTool.aIntArr(TableConfigTool.getConfig(data, "hero/formationUnlock"));
            StageReward = TableConfigTool.aInt(TableConfigTool.getConfig(data, "hero/stageReward"));
        }
    }

    public class TableConfigItemStage
    {
        /** 关卡各声望等级的需求 */
        public readonly ImmutableArray<int> ReputationLevelRequire;
        /** 关卡挂机宝箱最大挂机收益时间（分钟） */
        public readonly int BattleMaxAfkTime;
        /** 关卡地图最大挂机收益时间（分钟） */
        public readonly int MapMaxAfkTime;
        /** 每日视频扫荡次数限制 */
        public readonly int SweepDaily;
        /** 每日关卡视频双倍次数限制 */
        public readonly int DoubleDaily;

        public TableConfigItemStage(TableData data)
        {
            ReputationLevelRequire = TableConfigTool.aIntArr(TableConfigTool.getConfig(data, "stage/reputationLevelRequire"));
            BattleMaxAfkTime = TableConfigTool.aInt(TableConfigTool.getConfig(data, "stage/battleMaxAfkTime"));
            MapMaxAfkTime = TableConfigTool.aInt(TableConfigTool.getConfig(data, "stage/mapMaxAfkTime"));
            SweepDaily = TableConfigTool.aInt(TableConfigTool.getConfig(data, "stage/sweepDaily"));
            DoubleDaily = TableConfigTool.aInt(TableConfigTool.getConfig(data, "stage/doubleDaily"));
        }
    }

    public class TableConfigItemKnapsack
    {
        /** 玩家初始物品 */
        public readonly ImmutableArray<Item> InitItem;

        public TableConfigItemKnapsack(TableData data)
        {
            InitItem = TableConfigTool.aItemArr(TableConfigTool.getConfig(data, "knapsack/initItem"));
        }
    }

    public class TableConfigItemEnemy
    {
        /** 每日外敌入侵免费刷新次数 */
        public readonly int FreeRefresh;
        /** 每日外敌入侵挑战次数 */
        public readonly int ChallengeLimit;
        /** 外敌入侵每日可购买挑战次数 */
        public readonly int BuyChallengeLimit;
        /** 外敌入侵购买挑战次数消耗 */
        public readonly int BuyChallengeCost;

        public TableConfigItemEnemy(TableData data)
        {
            FreeRefresh = TableConfigTool.aInt(TableConfigTool.getConfig(data, "enemy/freeRefresh"));
            ChallengeLimit = TableConfigTool.aInt(TableConfigTool.getConfig(data, "enemy/challengeLimit"));
            BuyChallengeLimit = TableConfigTool.aInt(TableConfigTool.getConfig(data, "enemy/buyChallengeLimit"));
            BuyChallengeCost = TableConfigTool.aInt(TableConfigTool.getConfig(data, "enemy/buyChallengeCost"));
        }
    }

    public class TableConfigItemBattle
    {
        /** 外敌入侵战斗时间限制（秒） */
        public readonly int EnemyTimeLimit;
        /** 战斗中火球伤害(受庇护所等级影响) */
        public readonly ImmutableArray<int> FireballDamage;
        /** 战斗属性计算公式 */
        public readonly string PropertyFormula;
        /** 竞技场战斗时间限制（秒） */
        public readonly int ArenaTimeLimit;
        /** 离线关卡战斗最大时间限制（分钟） */
        public readonly int OfflineStageTimeMax;
        /** 离线最少多久之后可以触发离线战斗窗口（分钟） */
        public readonly int OfflineStageTimeMin;
        /** 关卡战斗时间限制（秒）超过时间限制怪物未被全部消灭认为是失败 */
        public readonly int StageTimeLimit;
        /** 爬塔战斗时间限制（秒） */
        public readonly int TowerTimeLimit;
        /** 挖矿战斗时间限制（秒） */
        public readonly int MineTimeLimit;
        /** 建筑战斗时间限制（秒） */
        public readonly int FacilityTimeLimit;
        /** 玩家技能基础属性提升 */
        public readonly string PlayerSkillBuff;
        /** 同伴基础属性提升 */
        public readonly string PetBuff;
        /** 主角属性公式（钱袋子） */
        public readonly string PlayerPropertyFormula;
        /** 防御塔继承属性公式（钱袋子） */
        public readonly string TowerPropertyFormula;
        /** 战斗掉落物（id，概率） */
        public readonly ImmutableArray<double> DropItem;
        /** 掉落物数量 */
        public readonly ImmutableArray<int> DropItemCount;
        /** 掉落物留存时间 */
        public readonly ImmutableArray<int> DropItemTime;
        /** 防御塔基础属性公式 */
        public readonly string TowerBaseFormula;
        /** 知识基础属性公式 */
        public readonly string TechnologyBaseFormula;
        /** 机械矩阵属性公式 */
        public readonly string MountFormula;
        /** 数据要塞属性公式 */
        public readonly string FossilFormula;
        /** 伤害挑战战斗时间限制（秒） */
        public readonly int DamageChallengeTimeLimit;

        public TableConfigItemBattle(TableData data)
        {
            EnemyTimeLimit = TableConfigTool.aInt(TableConfigTool.getConfig(data, "battle/enemyTimeLimit"));
            FireballDamage = TableConfigTool.aIntArr(TableConfigTool.getConfig(data, "battle/fireballDamage"));
            PropertyFormula = TableConfigTool.aString(TableConfigTool.getConfig(data, "battle/propertyFormula"));
            ArenaTimeLimit = TableConfigTool.aInt(TableConfigTool.getConfig(data, "battle/arenaTimeLimit"));
            OfflineStageTimeMax = TableConfigTool.aInt(TableConfigTool.getConfig(data, "battle/offlineStageTimeMax"));
            OfflineStageTimeMin = TableConfigTool.aInt(TableConfigTool.getConfig(data, "battle/offlineStageTimeMin"));
            StageTimeLimit = TableConfigTool.aInt(TableConfigTool.getConfig(data, "battle/stageTimeLimit"));
            TowerTimeLimit = TableConfigTool.aInt(TableConfigTool.getConfig(data, "battle/towerTimeLimit"));
            MineTimeLimit = TableConfigTool.aInt(TableConfigTool.getConfig(data, "battle/mineTimeLimit"));
            FacilityTimeLimit = TableConfigTool.aInt(TableConfigTool.getConfig(data, "battle/facilityTimeLimit"));
            PlayerSkillBuff = TableConfigTool.aString(TableConfigTool.getConfig(data, "battle/playerSkillBuff"));
            PetBuff = TableConfigTool.aString(TableConfigTool.getConfig(data, "battle/petBuff"));
            PlayerPropertyFormula = TableConfigTool.aString(TableConfigTool.getConfig(data, "battle/playerPropertyFormula"));
            TowerPropertyFormula = TableConfigTool.aString(TableConfigTool.getConfig(data, "battle/towerPropertyFormula"));
            DropItem = TableConfigTool.aDoubleArr(TableConfigTool.getConfig(data, "battle/dropItem"));
            DropItemCount = TableConfigTool.aIntArr(TableConfigTool.getConfig(data, "battle/dropItemCount"));
            DropItemTime = TableConfigTool.aIntArr(TableConfigTool.getConfig(data, "battle/dropItemTime"));
            TowerBaseFormula = TableConfigTool.aString(TableConfigTool.getConfig(data, "battle/towerBaseFormula"));
            TechnologyBaseFormula = TableConfigTool.aString(TableConfigTool.getConfig(data, "battle/technologyBaseFormula"));
            MountFormula = TableConfigTool.aString(TableConfigTool.getConfig(data, "battle/mountFormula"));
            FossilFormula = TableConfigTool.aString(TableConfigTool.getConfig(data, "battle/fossilFormula"));
            DamageChallengeTimeLimit = TableConfigTool.aInt(TableConfigTool.getConfig(data, "battle/damageChallengeTimeLimit"));
        }
    }

    public class TableConfigItemMine
    {
        /** 古井挖矿层数系数 */
        public readonly ImmutableArray<int> LevelBuff;
        /** 古井挖矿体力上限 */
        public readonly int PowerLimit;
        /** 古井挖矿体力恢复间隔（毫秒） */
        public readonly long PowerRecoverInterval;
        /** 古井挖矿重置所需层数 */
        public readonly int ResetFloorRequire;
        /** 古井挖矿重置钻石消耗 */
        public readonly int ResetCost;
        /** 古井挖矿每日看广告恢复道具和体力次数限制 */
        public readonly int VideoPowerLimit;
        /** 古井挖矿看广告恢复体力点数 */
        public readonly int VideoPowerRecover;

        public TableConfigItemMine(TableData data)
        {
            LevelBuff = TableConfigTool.aIntArr(TableConfigTool.getConfig(data, "mine/levelBuff"));
            PowerLimit = TableConfigTool.aInt(TableConfigTool.getConfig(data, "mine/powerLimit"));
            PowerRecoverInterval = TableConfigTool.aLong(TableConfigTool.getConfig(data, "mine/powerRecoverInterval"));
            ResetFloorRequire = TableConfigTool.aInt(TableConfigTool.getConfig(data, "mine/resetFloorRequire"));
            ResetCost = TableConfigTool.aInt(TableConfigTool.getConfig(data, "mine/resetCost"));
            VideoPowerLimit = TableConfigTool.aInt(TableConfigTool.getConfig(data, "mine/videoPowerLimit"));
            VideoPowerRecover = TableConfigTool.aInt(TableConfigTool.getConfig(data, "mine/videoPowerRecover"));
        }
    }

    public class TableConfigItemSurvivor
    {
        /** 看视频获得的幸存者人数 */
        public readonly int VideoAddSurvivor;

        public TableConfigItemSurvivor(TableData data)
        {
            VideoAddSurvivor = TableConfigTool.aInt(TableConfigTool.getConfig(data, "survivor/videoAddSurvivor"));
        }
    }

    public class TableConfigItemCardPool
    {
        /** 英雄卡池第一抽固定奖励（填写CardPoolReward的id） */
        public readonly int FirstHero;
        /** 装备卡池第一抽固定奖励（填写CardPoolReward的id） */
        public readonly int FirstEquipment;
        /** 卡池每日广告抽卡次数 */
        public readonly int VideoLimit;
        /** 卡池广告抽卡初始抽数|抽数增长|抽数上限 */
        public readonly ImmutableArray<int> VideoConfig;

        public TableConfigItemCardPool(TableData data)
        {
            FirstHero = TableConfigTool.aInt(TableConfigTool.getConfig(data, "cardPool/firstHero"));
            FirstEquipment = TableConfigTool.aInt(TableConfigTool.getConfig(data, "cardPool/firstEquipment"));
            VideoLimit = TableConfigTool.aInt(TableConfigTool.getConfig(data, "cardPool/videoLimit"));
            VideoConfig = TableConfigTool.aIntArr(TableConfigTool.getConfig(data, "cardPool/videoConfig"));
        }
    }

    public class TableConfigItemStory
    {
        /** 新手剧情-暴风雨字幕 */
        public readonly string Subtitling;
        /** 新手剧情-黑屏提示 */
        public readonly string EnterTip;

        public TableConfigItemStory(TableData data)
        {
            Subtitling = TableConfigTool.aString(TableConfigTool.getConfig(data, "story/subtitling"));
            EnterTip = TableConfigTool.aString(TableConfigTool.getConfig(data, "story/enterTip"));
        }
    }

    public class TableConfigItemArena
    {
        /** 竞技场开放时间（开启和关闭时间，例如8-22点） */
        public readonly ImmutableArray<int> OpenTime;
        /** 竞技场单场战斗结算基础分数 */
        public readonly int PointBase;
        /** 竞技场单场战斗结算分数计算公式 */
        public readonly string PointFormula;
        /** 竞技场单场结算分数上限 */
        public readonly int PointLimit;
        /** 竞技场每日挑战次数 */
        public readonly int ChallengeDaily;
        /** 竞技场购买挑战次数价格（钻石） */
        public readonly int ChallengeCost;
        /** 竞技场每次购买挑战次数限制 */
        public readonly int ChallengeBuyLimit;
        /** 竞技场购买刷新对手价格（钻石） */
        public readonly int RefreshCost;
        /** 竞技场每次刷新对手人数 */
        public readonly int RefreshCount;
        /** 竞技场挑战券价格配置 */
        public readonly ImmutableArray<long> Cost;

        public TableConfigItemArena(TableData data)
        {
            OpenTime = TableConfigTool.aIntArr(TableConfigTool.getConfig(data, "arena/openTime"));
            PointBase = TableConfigTool.aInt(TableConfigTool.getConfig(data, "arena/pointBase"));
            PointFormula = TableConfigTool.aString(TableConfigTool.getConfig(data, "arena/pointFormula"));
            PointLimit = TableConfigTool.aInt(TableConfigTool.getConfig(data, "arena/pointLimit"));
            ChallengeDaily = TableConfigTool.aInt(TableConfigTool.getConfig(data, "arena/challengeDaily"));
            ChallengeCost = TableConfigTool.aInt(TableConfigTool.getConfig(data, "arena/challengeCost"));
            ChallengeBuyLimit = TableConfigTool.aInt(TableConfigTool.getConfig(data, "arena/challengeBuyLimit"));
            RefreshCost = TableConfigTool.aInt(TableConfigTool.getConfig(data, "arena/refreshCost"));
            RefreshCount = TableConfigTool.aInt(TableConfigTool.getConfig(data, "arena/refreshCount"));
            Cost = TableConfigTool.aLongArr(TableConfigTool.getConfig(data, "arena/cost"));
        }
    }

    public class TableConfigItemTurntable
    {
        /** 转盘3件/5件奖励概率 */
        public readonly ImmutableArray<double> Rare;
        /** 转盘庇护所等级系数 */
        public readonly ImmutableArray<int> CaptainReward;
        /** 转盘每日视频限制 */
        public readonly int VideoLimit;
        /** 转盘视频冷却（毫秒） */
        public readonly long VideoColdDown;
        /** 看视频获得转盘消耗物数量 */
        public readonly int VideoAddStorage;
        /** 转盘第一次固定奖励（转盘表id） */
        public readonly int FirstReward;
        /** 漂流瓶保底奖励所需次数 */
        public readonly int Guarantee;
        /** 漂流瓶不同等级可开数量 */
        public readonly ImmutableArray<ImmutableArray<int>> LevelCount;

        public TableConfigItemTurntable(TableData data)
        {
            Rare = TableConfigTool.aDoubleArr(TableConfigTool.getConfig(data, "turntable/rare"));
            CaptainReward = TableConfigTool.aIntArr(TableConfigTool.getConfig(data, "turntable/captainReward"));
            VideoLimit = TableConfigTool.aInt(TableConfigTool.getConfig(data, "turntable/videoLimit"));
            VideoColdDown = TableConfigTool.aLong(TableConfigTool.getConfig(data, "turntable/videoColdDown"));
            VideoAddStorage = TableConfigTool.aInt(TableConfigTool.getConfig(data, "turntable/videoAddStorage"));
            FirstReward = TableConfigTool.aInt(TableConfigTool.getConfig(data, "turntable/firstReward"));
            Guarantee = TableConfigTool.aInt(TableConfigTool.getConfig(data, "turntable/guarantee"));
            LevelCount = TableConfigTool.aIntMatrix(TableConfigTool.getConfig(data, "turntable/levelCount"));
        }
    }

    public class TableConfigItemSurvivorTick
    {
        /** 幸存者跨建筑跑步移动速度（像素/帧） */
        public readonly double SpeedRun;

        public TableConfigItemSurvivorTick(TableData data)
        {
            SpeedRun = TableConfigTool.aDouble(TableConfigTool.getConfig(data, "survivorTick/speedRun"));
        }
    }

    public class TableConfigItemTower
    {
        /** 爬塔挂机最大挂机收益时间（分钟） */
        public readonly int MaxAfkTime;

        public TableConfigItemTower(TableData data)
        {
            MaxAfkTime = TableConfigTool.aInt(TableConfigTool.getConfig(data, "tower/maxAfkTime"));
        }
    }

    public class TableConfigItemPlayer
    {
        /** 玩家改名钻石消耗 */
        public readonly long ChangeNameCost;
        /** 玩家最大体力 */
        public readonly int PowerMax;
        /** 玩家挑战关卡体力消耗 */
        public readonly int PowerCost;
        /** 玩家体力恢复间隔(毫秒) */
        public readonly long PowerRecoverInterval;
        /** 视频观看恢复体力|每日限制次数 */
        public readonly ImmutableArray<int> PowerVideo;
        /** 钻石购买体力恢复|钻石消耗|每日限制次数 */
        public readonly ImmutableArray<int> PowerDiamond;

        public TableConfigItemPlayer(TableData data)
        {
            ChangeNameCost = TableConfigTool.aLong(TableConfigTool.getConfig(data, "player/changeNameCost"));
            PowerMax = TableConfigTool.aInt(TableConfigTool.getConfig(data, "player/powerMax"));
            PowerCost = TableConfigTool.aInt(TableConfigTool.getConfig(data, "player/powerCost"));
            PowerRecoverInterval = TableConfigTool.aLong(TableConfigTool.getConfig(data, "player/powerRecoverInterval"));
            PowerVideo = TableConfigTool.aIntArr(TableConfigTool.getConfig(data, "player/powerVideo"));
            PowerDiamond = TableConfigTool.aIntArr(TableConfigTool.getConfig(data, "player/powerDiamond"));
        }
    }

    public class TableConfigItemManor
    {
        /** 庄园格子配置（xx行|xx列） */
        public readonly ImmutableArray<int> GridConfig;

        public TableConfigItemManor(TableData data)
        {
            GridConfig = TableConfigTool.aIntArr(TableConfigTool.getConfig(data, "manor/gridConfig"));
        }
    }

    public class TableConfigItemTechTree
    {
        /** 科技树每日视频加速（次数|分钟） */
        public readonly ImmutableArray<int> VideoTime;
        /** 科技树加速1次消耗物品数量（id|数量） */
        public readonly ImmutableArray<int> Accelerate;
        /** 科技树加速1次减少的时间（分钟） */
        public readonly int SubTime;

        public TableConfigItemTechTree(TableData data)
        {
            VideoTime = TableConfigTool.aIntArr(TableConfigTool.getConfig(data, "techTree/videoTime"));
            Accelerate = TableConfigTool.aIntArr(TableConfigTool.getConfig(data, "techTree/accelerate"));
            SubTime = TableConfigTool.aInt(TableConfigTool.getConfig(data, "techTree/subTime"));
        }
    }

    public class TableConfigItemJob
    {
        /** 转职重置消耗(钻石) */
        public readonly long ResetCost;

        public TableConfigItemJob(TableData data)
        {
            ResetCost = TableConfigTool.aLong(TableConfigTool.getConfig(data, "job/resetCost"));
        }
    }

    public class TableConfigItemDamageChallenge
    {
        /** 伤害挑战类型(单体|群体) */
        public readonly ImmutableArray<ImmutableArray<int>> DayOfWeek;
        /** 伤害挑战boss(单体|群体) */
        public readonly ImmutableArray<int> Boss;

        public TableConfigItemDamageChallenge(TableData data)
        {
            DayOfWeek = TableConfigTool.aIntMatrix(TableConfigTool.getConfig(data, "damageChallenge/dayOfWeek"));
            Boss = TableConfigTool.aIntArr(TableConfigTool.getConfig(data, "damageChallenge/boss"));
        }
    }

    public class TableConfigItemCareer
    {
        /** 重置职业消耗 */
        public readonly ImmutableArray<long> Reset;
        /** 职业被动技能解锁条件(等级大于等于时) */
        public readonly ImmutableArray<int> PassiveUnlock;
        /** 职业天赋升级消耗 */
        public readonly ImmutableArray<int> TalentCost;

        public TableConfigItemCareer(TableData data)
        {
            Reset = TableConfigTool.aLongArr(TableConfigTool.getConfig(data, "career/reset"));
            PassiveUnlock = TableConfigTool.aIntArr(TableConfigTool.getConfig(data, "career/passiveUnlock"));
            TalentCost = TableConfigTool.aIntArr(TableConfigTool.getConfig(data, "career/talentCost"));
        }
    }

    public class TableConfigItemEquipment
    {
        /** 洗练消耗 */
        public readonly ImmutableArray<int> WashCost;
        /** 洗练词条数量(等级小于等于时) */
        public readonly ImmutableArray<int> WashPropertyCount;
        /** 装备位数量 */
        public readonly int TowerPlaceCount;
        /** 可选天赋数量 */
        public readonly int TalentSelectLimit;

        public TableConfigItemEquipment(TableData data)
        {
            WashCost = TableConfigTool.aIntArr(TableConfigTool.getConfig(data, "equipment/washCost"));
            WashPropertyCount = TableConfigTool.aIntArr(TableConfigTool.getConfig(data, "equipment/washPropertyCount"));
            TowerPlaceCount = TableConfigTool.aInt(TableConfigTool.getConfig(data, "equipment/towerPlaceCount"));
            TalentSelectLimit = TableConfigTool.aInt(TableConfigTool.getConfig(data, "equipment/talentSelectLimit"));
        }
    }

    public class TableConfigItemVideoGroupPurchase
    {
        /** 发起视频团购需要消耗的广告次数 */
        public readonly int LaunchRequire;
        /** 每日参与视频团购的次数限制 */
        public readonly int DailyLimit;
        /** 每日发起视频团购的次数限制 */
        public readonly int LaunchDailyLimit;

        public TableConfigItemVideoGroupPurchase(TableData data)
        {
            LaunchRequire = TableConfigTool.aInt(TableConfigTool.getConfig(data, "videoGroupPurchase/launchRequire"));
            DailyLimit = TableConfigTool.aInt(TableConfigTool.getConfig(data, "videoGroupPurchase/dailyLimit"));
            LaunchDailyLimit = TableConfigTool.aInt(TableConfigTool.getConfig(data, "videoGroupPurchase/launchDailyLimit"));
        }
    }

    public class TableConfigItemStone
    {
        /** 初始装备（前几次抽取必定掉落） */
        public readonly ImmutableArray<int> InitEquipment;

        public TableConfigItemStone(TableData data)
        {
            InitEquipment = TableConfigTool.aIntArr(TableConfigTool.getConfig(data, "stone/initEquipment"));
        }
    }

    public class TableConfigItemSprite
    {
        /** 重复抽取到精灵的转化碎片数量 */
        public readonly int Debris_transfer;

        public TableConfigItemSprite(TableData data)
        {
            Debris_transfer = TableConfigTool.aInt(TableConfigTool.getConfig(data, "sprite/debris_transfer"));
        }
    }

    public class TableConfigItemBanquet
    {
        /** 宴会道具兑换积分数（免费|付费） */
        public readonly ImmutableArray<int> ExchangeCount;
        /** 宴会活动团购环节最大参与人数 */
        public readonly int GroupLimit;
        /** 宴会活动免费物品限制 */
        public readonly int FreeLimit;
        /** 宴会活动 */
        public readonly long StartTime;

        public TableConfigItemBanquet(TableData data)
        {
            ExchangeCount = TableConfigTool.aIntArr(TableConfigTool.getConfig(data, "banquet/exchangeCount"));
            GroupLimit = TableConfigTool.aInt(TableConfigTool.getConfig(data, "banquet/GroupLimit"));
            FreeLimit = TableConfigTool.aInt(TableConfigTool.getConfig(data, "banquet/freeLimit"));
            StartTime = TableConfigTool.aLong(TableConfigTool.getConfig(data, "banquet/startTime"));
        }
    }

    public class TableConfigItemImpactRank
    {
        /** 冲榜活动开始时间戳 */
        public readonly long BeginTime;
        /** 冲榜活动持续天数 */
        public readonly int LastDay;
        /** 冲榜活动开始条件 */
        public readonly int Condition;

        public TableConfigItemImpactRank(TableData data)
        {
            BeginTime = TableConfigTool.aLong(TableConfigTool.getConfig(data, "impactRank/beginTime"));
            LastDay = TableConfigTool.aInt(TableConfigTool.getConfig(data, "impactRank/lastDay"));
            Condition = TableConfigTool.aInt(TableConfigTool.getConfig(data, "impactRank/condition"));
        }
    }

}

