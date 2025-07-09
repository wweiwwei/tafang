using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public static class GameConstant
    {
        public static readonly int ApiVersion = 1;
        public static readonly long SaveDataInterval = 1000L * 60 * 10;
        public static readonly long TerminateDuration = 60L * 1000;
        public static readonly long StageAfkInterval = 1000L * 60;
        public static readonly long MaxStageAfkTime = 1000L * 60 * 60 * 8;
        public static readonly long TowerAfkInterval = 1000L * 60;
        public static readonly long MaxTowerAfkTime = 1000L * 60 * 60 * 8;
        public static readonly bool FDebug = false;
        public static readonly Dictionary<string, List<int>> FormationLimit = new Dictionary<string, List<int>>()
        {
            { "tank", new List<int>() { 0 } },
            { "warrior", new List<int>() { 2, 0 } },
            { "air", new List<int>() { 1 } },
            { "wizard", new List<int>() { 4, 3 } },
            { "archer", new List<int>() { 4, 3 } },
            { "bard", new List<int>() { 3, 2, 4 } },
            { "cleric", new List<int>() { 3, 2, 4 } },
        };
        /** 金币id */
        public static int CoinId { get => GTable.Ins.ItemTblList.First(x => x.Kind == 1).Id; }
        /** 钻石id */
        public static int DiamondId { get => GTable.Ins.ItemTblList.First(x => x.Kind == 2).Id; }
        /** 粉钻id */
        public static int PinkDiamondId { get => GTable.Ins.ItemTblList.First(x => x.Kind == 3).Id; }
        /** 英雄经验石 */
        public static int HeroExpId { get => GTable.Ins.ItemTblList.First(x => x.Kind == 11).Id; }
        /** 英雄升阶突破书 */
        public static int HeroRankId { get => GTable.Ins.ItemTblList.First(x => x.Kind == 12).Id; }
        /** 英雄装备经验 */
        public static int HeroEquipmentExpId { get => GTable.Ins.ItemTblList.First(x => x.Kind == 31).Id; }
        /** 英雄升阶突破书 */
        public static int HeroEquipmentRankId { get => GTable.Ins.ItemTblList.First(x => x.Kind == 32).Id; }
        public static int CarExpId { get => GTable.Ins.ItemTblList.First(x => x.Kind == 71).Id; }
        /** 挖矿体力 */
        public static int MinePowerId { get => GTable.Ins.ItemTblList.First(x => x.Kind == 91).Id; }
        /** 挖矿积分 */
        public static int MinePointId { get => GTable.Ins.ItemTblList.First(x => x.Kind == 92).Id; }
        /** 挖矿钻头 */
        public static int MineDrillId { get => GTable.Ins.ItemTblList.First(x => x.Kind == 93).Id; }
        /** 挖矿炸弹 */
        public static int MineBombId { get => GTable.Ins.ItemTblList.First(x => x.Kind == 94).Id; }
        /** 竞技场挑战券 */
        public static int ChallengeTicket { get => GTable.Ins.ItemTblList.First(x => x.Kind == 141).Id; }
        /** 转盘消耗物 */
        public static int TurntableStorageId { get => GTable.Ins.ItemTblList.First(x => x.Kind == 131).Id; }
        /** 餐厅id */
        public static readonly int RestaurantId = 10008;
        /** 医院id */
        public static readonly int HospitalId = 10010;
        /** 水建筑id */
        public static readonly int WaterFacilityId = 10002;
        /** 食堂id */
        public static readonly int FoodFacilityId = 10008;
        /** 温室id */
        public static readonly int GreenHouseFacilityId = 10009;
        /** 船长室 */
        public static readonly int CaptainId = 10001;
        public static readonly long GameHourDuration = 1000L * 30L;
        public static readonly long GameMinuteDuration = GameHourDuration / 60;
        public static readonly long GameDayDuration = GameHourDuration * 24;
        public static readonly int ImpactChallengeId = 1029;
        public static readonly int BanquetId = 1033;
        public static readonly Dictionary<int, int> FacilityTime = new()
        {
            { 0, 1 },
            { 1, 1 },
            { 2, 1 },
            { 3, 1 },
            { 4, 1 },
            { 5, 1 },
            { 6, 3 },
            { 7, 3 },
            { 8, 3 },
            { 9, 3 },
            { 10, 3 },
            { 11, 3 },
            { 12, 2 },
            { 13, 2 },
            { 14, 2 },
            { 15, 3 },
            { 16, 3 },
            { 17, 3 },
            { 18, 3 },
            { 19, 3 },
            { 20, 3 },
            { 21, 2 },
            { 22, 2 },
            { 23, 2 },
        };
        public static int GameMinute(long stamp)
        {
            var minute = stamp % GameHourDuration / GameMinuteDuration;
            return (int)minute;
        }

        public static int GameHour(long stamp)
        {
            var hour = stamp % GameDayDuration / GameHourDuration;
            return (int)hour;
        }

        public static int HourType(long stamp)
        {
            var hour = GameHour(stamp);
            return FacilityTime[hour];
        }

        public static readonly ImmutableDictionary<int, ImmutableArray<int>> MicroSettleMap = new Dictionary<int, ImmutableArray<int>>()
        {
            { 2, new int[] { 30 }.ToImmutableArray() },
            { 3, new int[] { 20, 40 }.ToImmutableArray() },
            { 4, new int[] { 15, 30, 45 }.ToImmutableArray() },
            { 5, new int[] { 12, 24, 36, 48 }.ToImmutableArray()},
            { 6, new int[] { 10, 20, 30, 40, 50 }.ToImmutableArray() },
            { 10, new int[] { 6, 12, 18, 24, 30, 36, 42, 48, 54 }.ToImmutableArray() },
        }.ToImmutableDictionary();

        public static int MonthCardId { get => GTable.Ins.ChargeTblList.First(t => t.Kind == 4).Id; }

        public static int PermanentCardId { get => GTable.Ins.ChargeTblList.First(t => t.Kind == 5).Id; }
        public static int MountRequireId { get => GTable.Ins.ItemTblList.First(t => t.Kind == 1032).Id; }
        public static int MountPowerRequireId { get => GTable.Ins.ItemTblList.First(t => t.Kind == 1033).Id; }
        public static int BanquetFreeId { get => GTable.Ins.ItemTblList.First(t => t.Kind == 171).Id; }
        public static int BanquetSpendId { get => GTable.Ins.ItemTblList.First(t => t.Kind == 172).Id; }
        public static int BanquetPointId { get => GTable.Ins.ItemTblList.First(t => t.Kind == 173).Id; }


        public const string MarSDKKey = "d5b1b38ab5d94a039a382ff8ad4d94ae";
    }
}