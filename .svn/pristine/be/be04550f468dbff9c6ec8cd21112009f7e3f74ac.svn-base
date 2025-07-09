using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public record Hero(
        int uniqueId,
        int id,
        int level,
        int rank,
        int star,
        ImmutableArray<HeroEquipment?> equipment,
        int skinId
    )
    {

        /** ast环境 */
        private Dictionary<string, double> Env()
        {
            var m = new Dictionary<string, double>
            {
                { "lv", level }
            };
            return m;
        }

        /** 英雄是否达到了达到了当前阶数的等级上限 */
        public bool IsRankLevelLimit(PlayerDataManager Ctx)
        {
            return level >= Ctx.Config.Hero.RankLevelLimit[rank];
        }

        /** 英雄是否达到了当前星级的等级上限 */
        public bool IsStarLevelLimit(PlayerDataManager Ctx)
        {
            return level >= Ctx.Config.Hero.StarLevelLimit[star];
        }

        /** 英雄是否达到了最大等级 */
        public bool IsMaxLevel(PlayerDataManager Ctx)
        {
            return level >= Ctx.Config.Hero.RankLevelLimit.Last();
        }

        /** 英雄升级所需的材料数量 */
        public ImmutableArray<Item> UpgradeRequire(PlayerDataManager Ctx)
        {
            var tbl = Ctx.Table.HeroLevelTblList.FirstOrDefault(t => level >= t.Level[0] && level <= t.Level[1]);
            if (tbl == null) return ImmutableArray<Item>.Empty;
            return ImmutableArray<Item>.Empty.Add(new Item(GameConstant.HeroExpId, (long)AstUtil.Eval(tbl.Require, Env())));
        }

        /** 英雄是否达到最大阶数 */
        public bool IsMaxRank(PlayerDataManager Ctx)
        {
            return rank >= Ctx.Table.HeroRankBuffTblList.Select(t => t.Rank).Concat(Ctx.Table.HeroRankSpecialTblList.Select(t => t.Rank)).Max();
        }

        /** 英雄升阶所需材料 */
        public ImmutableArray<Item> UpgradeRankRequire(PlayerDataManager Ctx)
        {
            var tbl = Ctx.Table.HeroRankTblList.FirstOrDefault(t => t.Level == rank);
            if (tbl == null) return ImmutableArray<Item>.Empty;
            return ImmutableArray<Item>.Empty.Add(new Item(GameConstant.HeroRankId, tbl.Require)).Add(new Item(GameConstant.CoinId, tbl.CoinCost));
        }

        /** 英雄是否达到最大星级 */
        public bool IsMaxStar(PlayerDataManager Ctx)
        {
            return star >= Ctx.Table.HeroStarTblList.Select(t => t.Level).Max();
        }

        public ImmutableArray<Item>? UpgradeStarRequire(PlayerDataManager Ctx)
        {
            var starTbl = Ctx.Table.HeroStarTblList.FirstOrDefault(t => t.Level == star);
            if (starTbl == null) return null;
            if (starTbl.FragCost < 0) return null;
            var fragId = Ctx.Table.HeroTblMap[id].Frag;
            return ImmutableArray<Item>.Empty.Add(new Item(fragId, starTbl.FragCost)).Add(new Item(GameConstant.CoinId, starTbl.CoinCost));
        }

        public double GetFacilityBuff(int facilityId, PlayerDataManager Ctx)
        {
            return 0;
        }
    }

    public record HeroEquipment(int id, int level, int rank);
}