using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace GamePlay
{
    public class CollectionManager : AbstractManager<CollectionData>, IBaseManager
    {
        public CollectionManager(JToken saveData, PlayerDataManager ctx) : base(saveData, ctx)
        {
        }

        public override void DailyRefresh()
        {

        }

        public override void InitData()
        {
            if (Data.collectionLevelRewardHasGet.IsEmpty)
            {
                var initDic = new Dictionary<int, ImmutableList<int>>()
                {
                    { 0, ImmutableList<int>.Empty },
                    { 1, ImmutableList<int>.Empty },
                    { 2, ImmutableList<int>.Empty }
                };
                Data = Data with { collectionLevelRewardHasGet = initDic.ToImmutableDictionary() };
            }
            var relation = Ctx.Table.RelationBuffTblList.ToImmutableDictionary(
                t => t.Id,
                t => Data.relation.ContainsKey(t.Id) ? Data.relation[t.Id] : 0
            );
            var hasGetMap = Ctx.Table.HeroTblMap.Keys
                .Concat(Ctx.Table.HeroEquipmentTblMap.Keys)
                .Concat(Ctx.Table.CarEquipmentTblMap.Keys)
                .ToImmutableDictionary(
                    k => k,
                    k => Data.hasGetMap.ContainsKey(k) ? Data.hasGetMap[k] : -1
                );
            Data = Data with { relation = relation, hasGetMap = hasGetMap };
        }

        [PartialUpdate("relation")]
        public ImmutableDictionary<int, int> Relation()
        {
            return Data.relation;
        }

        [Handle("collection/activateRelation")]
        public void ActivateRelation(int id)
        {
            if (!Ctx.Table.RelationBuffTblMap.ContainsKey(id)) throw new Exception("relation code not exist");
            var tbl = Ctx.Table.RelationBuffTblMap[id];
            var nextLv = Data.relation.ContainsKey(id) ? Data.relation[id] + 1 : 1;
            switch (tbl.Page)
            {
                case 0:
                    // 英雄
                    var allMatch = tbl.RelationId.All(heroId =>
                    {
                        if (Ctx.HeroManager.AllHero().ContainsKey(heroId))
                        {
                            var h = Ctx.HeroManager.AllHero()[heroId];
                            return h.star >= nextLv;
                        }
                        else
                        {
                            return false;
                        }
                    });
                    if (!allMatch) throw new Exception("10002");
                    break;
                case 1:
                    // 装备
                    var allMatch2 = tbl.RelationId.All(equipmentId =>
                    {
                        if (Ctx.HeroManager.AllEquipment().ContainsKey(equipmentId))
                        {
                            var e = Ctx.HeroManager.AllEquipment()[equipmentId];
                            return e.storage.Any(s => s.rank >= nextLv && s.count > 0);
                        }
                        else
                        {
                            return false;
                        }
                    });
                    if (!allMatch2) throw new Exception("10002");
                    break;
                case 2:
                    // 战车部件
                    var allMatch3 = tbl.RelationId.All(ceId =>
                    {
                        if (Ctx.CarManager.AllCarEquipment().ContainsKey(ceId))
                        {
                            var ce = Ctx.CarManager.AllCarEquipment()[ceId];
                            return ce.storage.Any(s => s.level >= nextLv && s.count > 0);
                        }
                        else
                        {
                            return false;
                        }
                    });
                    if (!allMatch3) throw new Exception("10002");
                    break;
            }
            Data = Data with { relation = Data.relation.SetItem(id, nextLv) };
        }

        [Handle("collection/obtainPoint")]
        public void ObtainPoint(int id)
        {
            if (!Data.hasGetMap.ContainsKey(id)) throw new Exception("id not exist");
            if (Ctx.Table.HeroTblMap.ContainsKey(id))
            {
                var h = Ctx.HeroManager.AllHero()[id];
                if (h.star < Data.hasGetMap[id] + 1) throw new Exception("10003");
            }
            else if (Ctx.Table.HeroEquipmentTblMap.ContainsKey(id))
            {
                var e = Ctx.HeroManager.AllEquipment()[id];
                var s = e.storage.FirstOrDefault(s => s.rank >= Data.hasGetMap[id] + 1 && s.count > 0);
                if (s == null) throw new Exception("10003");
            }
            else if (Ctx.Table.CarEquipmentTblMap.ContainsKey(id))
            {
                var ce = Ctx.CarManager.AllCarEquipment()[id];
                var s = ce.storage.FirstOrDefault(s => s.level >= Data.hasGetMap[id] + 1 && s.count > 0);
                if (s == null) throw new Exception("10003");
            }
            Data = Data with { hasGetMap = Data.hasGetMap.SetItem(id, Data.hasGetMap[id] + 1) };
            Ctx.Emit(CachePath.collectionData);
        }

        [Handle("collection/obtainLevelReward")]
        public ImmutableArray<Item> ObtainLevelReward(int page, int level)
        {
            var tbl = Ctx.Table.HeroCollectionLevelRewardTblList.FirstOrDefault(t => t.Level == level && t.Page == page);
            if (tbl == null) throw new Exception("10004");
            var currentLevel = GetCurrentLevel(page);
            if (currentLevel < level) throw new Exception("10004");
            if (Data.collectionLevelRewardHasGet.ContainsKey(page) && Data.collectionLevelRewardHasGet[page].Contains(level)) throw new Exception("10005");
            var reward = Item.FromItemArray(tbl.Reward);
            var finalReward = Ctx.KnapsackManager.AddItem(reward);
            Data = Data with
            {
                collectionLevelRewardHasGet =
                Data.collectionLevelRewardHasGet.SetItem(page, Data.collectionLevelRewardHasGet[page].Add(level))
            };
            Ctx.Emit(CachePath.collectionData);
            return finalReward;
        }

        public int GetTotalExp(int page)
        {
            return Data.hasGetMap
                .Where(e =>
                {
                    var (id, lv) = e;
                    switch (page)
                    {
                        case 0:
                            return Ctx.Table.HeroTblMap.ContainsKey(id);
                        case 1:
                            return Ctx.Table.HeroEquipmentTblMap.ContainsKey(id);
                        case 2:
                            return Ctx.Table.CarEquipmentTblMap.ContainsKey(id);
                        default:
                            return false;
                    }
                })
                .Select(e =>
                {
                    var (id, lv) = e;
                    if (lv < 0)
                    {
                        return 0;
                    }
                    else
                    {
                        return Ctx.Index.Collection.HeroIdAndStarToExp[id][lv];
                    }
                }).Sum();
        }

        public int GetCurrentLevel(int page)
        {
            var e = GetTotalExp(page);
            return Ctx.Index.Collection.ExpRequireByLevel[page].LastIndexWhere(l => l <= e);
        }

        [Update("collectionData")]
        public Dictionary<string, object> GetCollectionData()
        {
            var info = Enumerable.Range(0, 3).Select(page =>
            {
                var lv = GetCurrentLevel(page);
                var e = GetTotalExp(page);
                var hasUse = Ctx.Table.HeroCollectionTblList
                    .Where(t => t.Page == page)
                    .Where(t => t.Level <= lv)
                    .Select(t => t.PointRequire)
                    .Sum();
                var remainExp = e - hasUse;
                var nextTbl = Ctx.Table.HeroCollectionTblList.FirstOrDefault(t => t.Level == lv + 1);
                var nextLevel = nextTbl != null ? nextTbl.PointRequire : -1;
                return (page, new Dictionary<string, object>()
                {
                    { "exp", remainExp },
                    { "level", lv },
                    { "nextLevel", nextLevel },
                    { "levelRewardHasGet", Data.collectionLevelRewardHasGet.ContainsKey(page) ? Data.collectionLevelRewardHasGet[page] : ImmutableArray<int>.Empty }
                });
            }).ToImmutableDictionary(
                k => k.Item1,
                v => v.Item2
            );
            return new Dictionary<string, object>()
            {
                { "info", info },
                { "hasGet", Data.hasGetMap }
            };
        }


    }
}