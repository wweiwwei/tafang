using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace GamePlay
{
    public class HeroManager : AbstractManager<HeroData>, IBaseManager
    {
        public HeroManager(JToken saveData, PlayerDataManager ctx) : base(saveData, ctx)
        {
        }

        public override void DailyRefresh()
        {

        }

        public override void InitData()
        {
            if (Data.hero.IsEmpty)
            {
                Ctx.Config.Hero.InitHero.ForEach(t => AddHero(t));
                SetFormation("default", Ctx.Config.Hero.InitFormation.ToArray());
            }
        }

        [Handle("hero/batchComposeHero")]
        public List<Hero> BatchComposeHero()
        {
            var res = new List<Hero>();
            Ctx.Table.HeroTblList.ForEach(t =>
            {
                var fRequire = Ctx.Config.Hero.ComposeRequire[t.Quality];
                var fStorage = Ctx.KnapsackManager.GetStorageById(t.Frag);
                if (fStorage >= fRequire && !Data.hero.ContainsKey(t.Id))
                {
                    var h = ComposeHero(t.Frag);
                    res.Add(h);
                }
            });
            return res;
        }

        [Handle("hero/composeHero")]
        public Hero ComposeHero(int id)
        {
            var heroId = Ctx.Table.HeroTblList.First(t => t.Frag == id).Id;
            GameAssert.Expect(!Data.hero.ContainsKey(heroId), 2014);
            var heroTbl = Ctx.Table.HeroTblMap[heroId];
            var cost = new Item(heroTbl.Frag, Ctx.Config.Hero.ComposeRequire[heroTbl.Quality]);
            Ctx.KnapsackManager.SubItem(cost);
            var newH = new Hero(
                uniqueId: heroId,
                id: heroId,
                level: 1,
                rank: 0,
                star: 0,
                equipment: (new HeroEquipment?[] { null, null, null, null }).ToImmutableArray(),
                skinId: 0
            );
            Data = Data with { hero = Data.hero.SetItem(newH.uniqueId, newH) };
            Ctx.Emit(CachePath.hero, newH.uniqueId);
            return newH;
        }

        public Either<Hero, Item> AddHero(int heroId)
        {
            if (Data.hero.ContainsKey(heroId))
            {
                var heroTbl = Ctx.Table.HeroTblMap[heroId];
                var cost = new Item(heroTbl.Frag, Ctx.Config.Hero.ComposeRequire[heroTbl.Quality]);
                Ctx.KnapsackManager.AddItem(cost);
                return new Right<Hero, Item>(cost);
            }
            else
            {
                var newH = new Hero(
                    uniqueId: heroId,
                    id: heroId,
                    level: 1,
                    rank: 0,
                    star: 0,
                    equipment: (new HeroEquipment?[] { null, null, null, null }).ToImmutableArray(),
                    skinId: 0
                );
                Data = Data with { hero = Data.hero.SetItem(newH.uniqueId, newH) };
                Ctx.Emit(CachePath.hero, newH.uniqueId);
                return new Left<Hero, Item>(newH);
            }
        }

        [Handle("hero/upgradeAllHero")]
        public void UpgradeAllHero()
        {
            var coinId = GameConstant.CoinId;
            var expId = GameConstant.HeroExpId;
            var heroList = Data.formation["default"]
            .Where(uid => uid != -1)
            .Select(uid => new HeroTemp(uid: uid, levelLimit: Ctx.Config.Hero.RankLevelLimit[Data.hero[uid].rank], level: Data.hero[uid].level))
            .ToImmutableArray();
            var costItem = Ctx.Index.Hero.UpgradeAllCost(Ctx.KnapsackManager.GetStorageById(coinId), Ctx.KnapsackManager.GetStorageById(expId), heroList);
            if (costItem.Count(i => i.count > 0) > 0)
            {
                Ctx.KnapsackManager.SubItem(costItem);
                var upgradeHero = heroList.Select(temp =>
                {
                    var h = Data.hero[temp.Uid];
                    return (temp.Uid, h with { level = temp.Level });
                }).ToImmutableDictionary(
                    pair => pair.Uid,
                    pair => pair.Item2
                );
                Data = Data with { hero = Data.hero.SetItems(upgradeHero) };
                Ctx.MissionManager.UpdateMissionProgress(7, 1);
                Ctx.MissionManager.UpdateMissionProgress(9, 1);
                Ctx.EmitMany(CachePath.hero, upgradeHero.Keys);
            }
        }

        [Handle("hero/upgradeHeroLevel")]
        public void UpgradeHeroLevel(int uniqueId, int count)
        {
            for (int i = 0; i < count; i++)
            {
                _upgradeHeroLevel(uniqueId);
            }
        }

        private void _upgradeHeroLevel(int uniqueId)
        {
            GameAssert.Expect(Data.hero.ContainsKey(uniqueId), 2001);
            var h = Data.hero[uniqueId];
            GameAssert.Expect(!h.IsMaxLevel(Ctx), 2004);
            GameAssert.Expect(!h.IsRankLevelLimit(Ctx), 2002);
            GameAssert.Expect(!h.IsStarLevelLimit(Ctx), 2003);
            var cost = h.UpgradeRequire(Ctx);
            Ctx.KnapsackManager.SubItem(cost);
            var newH = h with { level = h.level + 1 };
            Data = Data with { hero = Data.hero.SetItem(uniqueId, newH) };
            Ctx.MissionManager.UpdateMissionProgress(7, 1);
            Ctx.MissionManager.UpdateMissionProgress(9, 1);
            Ctx.Emit(CachePath.hero, uniqueId);
        }

        [Handle("hero/upgradeHeroRank")]
        public void UpgradeHeroRank(int uniqueId)
        {
            GameAssert.Expect(Data.hero.ContainsKey(uniqueId), 2001);
            var h = Data.hero[uniqueId];
            GameAssert.Expect(!h.IsMaxRank(Ctx), 2006);
            GameAssert.Expect(h.IsRankLevelLimit(Ctx), 2005);
            var captainRank = Ctx.PlayerManager.Level();
            GameAssert.Expect(captainRank >= h.rank + 1, 2015);
            var cost = h.UpgradeRankRequire(Ctx);
            Ctx.KnapsackManager.SubItem(cost);
            var newH = h with { rank = h.rank + 1 };
            Data = Data with { hero = Data.hero.SetItem(uniqueId, newH) };
            Ctx.MissionManager.UpdateMissionProgress(12, 1);
            Ctx.MissionManager.UpdateMissionProgress(13, 1);
            Ctx.Emit(CachePath.hero, uniqueId);
        }

        [Handle("hero/upgradeHeroStar")]
        public void UpgradeHeroStar(int uniqueId)
        {
            GameAssert.Expect(Data.hero.ContainsKey(uniqueId), 2001);
            var h = Data.hero[uniqueId];
            GameAssert.Expect(!h.IsMaxStar(Ctx), 2007);
            var cost = h.UpgradeStarRequire(Ctx);
            Ctx.KnapsackManager.SubItem(cost);
            var newH = h with { star = h.star + 1 };
            Data = Data with { hero = Data.hero.SetItem(uniqueId, newH) };
            Ctx.Emit(CachePath.hero, uniqueId);
        }

        [Handle("hero/upgradeAllEquipmentLevel")]
        public void UpgradeAllEquipmentLevel(int uniqueId)
        {
            GameAssert.Expect(Data.hero.ContainsKey(uniqueId), 2001);
            var h = Data.hero[uniqueId];
            var tempEquip = h.equipment.Where(e => e != null).Select(e => new TempEquipment(e.id, e.level, e.rank)).ToImmutableArray();
            var originLevel = h.equipment.Where(e => e != null)
            .Select(o => (o!.id, o!.level))
            .ToImmutableDictionary(
                pair => pair.id,
                pair => pair.level
            );
            var expId = GameConstant.HeroEquipmentExpId;
            var costItem = Ctx.Index.Equipment
            .UpgradeAllCost(
                Ctx.KnapsackManager.GetStorageById(expId),
                tempEquip,
                Ctx.Table.HeroEquipmentLevelTblList.Last().Level[1]
            );
            if (costItem.count > 0L)
            {
                Ctx.KnapsackManager.SubItem(costItem);
                tempEquip.ForEach(t =>
                {
                    var originHero = Data.hero[uniqueId];
                    var equip = Data.equipment[t.Id];
                    var newE = equip.SubCount(originLevel[t.Id], t.Rank, 1).AddCount(t.Level, t.Rank, 1);
                    Data = Data with { equipment = Data.equipment.SetItem(equip.id, newE) };
                    var newH = originHero with { equipment = originHero.equipment.SetItem(equip.Part(Ctx), originHero.equipment[equip.Part(Ctx)] with { level = t.Level }) };
                    Data = Data with { hero = Data.hero.SetItem(uniqueId, newH) };
                });
                Ctx.MissionManager.UpdateMissionProgress(14, 1);
                Ctx.Emit(CachePath.hero, uniqueId);
                Ctx.EmitMany(CachePath.equipment, originLevel.Keys);
            }
        }

        [Handle("hero/upgradeEquipmentLevel")]
        public void UpgradeEquipmentLevel(int id, int level, int rank, int count)
        {
            for (int i = 0; i < count; i++)
            {
                _upgradeEquipmentLevel(id, level + i, rank);
            }
            Ctx.MissionManager.UpdateMissionProgress(14, 1);
            Ctx.Emit(CachePath.equipment, id);
        }

        private void _upgradeEquipmentLevel(int id, int level, int rank)
        {
            var e = Data.equipment[id];
            var newE = e.Upgrade(level, rank, Ctx);
            Data = Data with { equipment = Data.equipment.SetItem(id, newE) };
            Ctx.Emit(CachePath.equipment, id);
        }

        [Handle("hero/upgradeHeroEquipmentLevel")]
        public void UpgradeHeroEquipmentLevel(int uniqueId, int part, int count)
        {
            for (int i = 0; i < count; i++)
            {
                _upgradeHeroEquipmentLevel(uniqueId, part);
            }
            var h = Data.hero[uniqueId];
            var equip = h.equipment[part];
            Ctx.MissionManager.UpdateMissionProgress(14, 1);
            Ctx.Emit(CachePath.hero, uniqueId);
            Ctx.Emit(CachePath.equipment, equip.id);
        }

        private void _upgradeHeroEquipmentLevel(int uniqueId, int part)
        {
            GameAssert.Expect(Data.hero.ContainsKey(uniqueId), 2001);
            var h = Data.hero[uniqueId];
            GameAssert.Must(h.equipment[part] != null, "equipment not exist");
            var equip = h.equipment[part];
            var e = Data.equipment[equip.id];
            var newE = e.Upgrade(equip.level, equip.rank, Ctx);
            Data = Data with { equipment = Data.equipment.SetItem(equip.id, newE) };
            var newH = h with { equipment = h.equipment.SetItem(part, equip with { level = equip.level + 1 }) };
            Data = Data with { hero = Data.hero.SetItem(uniqueId, newH) };
        }

        [Handle("hero/upgradeEquipmentRank")]
        public void UpgradeEquipmentRank(int id, int level, int rank)
        {
            var e = Data.equipment[id];
            var newE = e.UpgradeRank(level, rank, Ctx);
            Data = Data with { equipment = Data.equipment.SetItem(id, newE) };
            Ctx.MissionManager.UpdateMissionProgress(15, 1);
            Ctx.Emit(CachePath.equipment, id);
        }

        [Handle("hero/upgradeHeroEquipmentRank")]
        public void UpgradeHeroEquipmentRank(int uniqueId, int part)
        {
            GameAssert.Expect(Data.hero.ContainsKey(uniqueId), 2001);
            var h = Data.hero[uniqueId];
            GameAssert.Must(h.equipment[part] != null, "equipment not exist");
            var equip = h.equipment[part];
            var e = Data.equipment[equip.id];
            var newE = e.UpgradeRank(equip.level, equip.rank, Ctx);
            Data = Data with { equipment = Data.equipment.SetItem(equip.id, newE) };
            var newH = h with { equipment = h.equipment.SetItem(part, equip with { rank = equip.rank + 1 }) };
            Data = Data with { hero = Data.hero.SetItem(uniqueId, newH) };
            Ctx.MissionManager.UpdateMissionProgress(15, 1);
            Ctx.Emit(CachePath.hero, uniqueId);
            Ctx.Emit(CachePath.equipment, equip.id);
        }

        [Handle("hero/setHeroEquipment")]
        public void SetHeroEquipment(int uniqueId, HeroEquipment[] equipment)
        {
            GameAssert.Must(equipment.Length == 4, "equipment size error");
            GameAssert.Expect(Data.hero.ContainsKey(uniqueId), 2001);
            var h = Data.hero[uniqueId];
            var newH = h with { equipment = (new HeroEquipment?[] { null, null, null, null }).ToImmutableArray() };
            Data = Data with { hero = Data.hero.SetItem(uniqueId, newH) };
            var ok = equipment.Select((e, i) => (e, i)).All(ee =>
            {
                var (e, i) = ee;
                if (e == null)
                {
                    return true;
                }
                else
                {
                    var tbl = Ctx.Table.HeroEquipmentTblMap[e.id];
                    var equip = Data.equipment[e.id];
                    return tbl.Part == i && equip.HasAvailable(e.level, e.rank, Ctx);
                }
            });
            GameAssert.Must(ok, "equipment error");
            var finalH = h with { equipment = equipment.ToImmutableArray() };
            Data = Data with { hero = Data.hero.SetItem(uniqueId, finalH) };
            Ctx.Emit(CachePath.hero, uniqueId);
        }

        [Handle("hero/replaceEquipment")]
        public void ReplaceEquipment(int uniqueId, int part, HeroEquipment equipment, int fromHero)
        {
            GameAssert.Must(part >= 0 && part < 4, "part error");
            GameAssert.Expect(Data.hero.ContainsKey(uniqueId), 2001);
            if (fromHero == uniqueId && equipment == null)
            {
                // 兼容脱下装备的情况
                var h = Data.hero[uniqueId];
                var newH = h with { equipment = h.equipment.SetItem(part, null) };
                Data = Data with { hero = Data.hero.SetItem(uniqueId, newH) };
                Ctx.Emit(CachePath.hero, uniqueId);
            }
            else if (fromHero > 0)
            {
                // 从其他英雄身上脱下装备的情况
                GameAssert.Expect(Data.hero.ContainsKey(fromHero), 2001);
                var h = Data.hero[uniqueId];
                var f = Data.hero[fromHero];
                var origin1 = h.equipment[part];
                var origin2 = f.equipment[part];
                var newH = h with { equipment = h.equipment.SetItem(part, origin2) };
                var newFrom = f with { equipment = f.equipment.SetItem(part, origin1) };
                Data = Data with { hero = Data.hero.SetItem(uniqueId, newH).SetItem(fromHero, newFrom) };
                Ctx.Emit(CachePath.hero, uniqueId);
                Ctx.Emit(CachePath.hero, fromHero);
            }
            else
            {
                // 空闲装备
                var h = Data.hero[uniqueId];
                if (equipment == null)
                {
                    var newH = h with { equipment = h.equipment.SetItem(part, null) };
                    Data = Data with { hero = Data.hero.SetItem(uniqueId, newH) };
                }
                else
                {
                    var equipmentData = Data.equipment[equipment.id];
                    if (equipmentData.HasAvailable(equipment.level, equipment.rank, Ctx))
                    {
                        var newH = h with { equipment = h.equipment.SetItem(part, equipment) };
                        Data = Data with { hero = Data.hero.SetItem(uniqueId, newH) };
                    }
                    else
                    {
                        var newH = h with { equipment = h.equipment.SetItem(part, null) };
                        Data = Data with { hero = Data.hero.SetItem(uniqueId, newH) };
                    }
                }
                Ctx.Emit(CachePath.hero, uniqueId);
            }
        }

        [Handle("hero/replaceEquipment2")]
        public void ReplaceEquipment2(int uniqueId, int part, HeroEquipment equipment, int fromHero, bool change)
        {
            if (change && equipment != null)
            {
                GameAssert.Expect(Data.hero.ContainsKey(uniqueId), 2001);
                var h = Data.hero[uniqueId];
                var origin1 = h.equipment[part];
                var e1 = Data.equipment[origin1.id];
                if (fromHero > 0)
                {
                    GameAssert.Expect(Data.hero.ContainsKey(fromHero), 2001);
                    var fromh = Data.hero[fromHero];
                    var origin2 = fromh.equipment[part];
                    var e2 = Data.equipment[origin2.id];
                    var storE1 = e1.SubCount(origin1.level, origin1.rank, 1).AddCount(origin2.level, origin1.rank, 1);
                    var storE2 = e2.SubCount(origin2.level, origin2.rank, 1).AddCount(origin1.level, origin2.rank, 1);
                    Data = Data with { equipment = Data.equipment.SetItem(e1.id, storE1).SetItem(e2.id, storE2) };
                    Ctx.Emit(CachePath.equipment, e1.id);
                    Ctx.Emit(CachePath.equipment, e2.id);
                    var newE1 = origin1 with { level = origin2.level };
                    var newE2 = origin2 with { level = origin1.level };
                    var newH = h with { equipment = h.equipment.SetItem(part, newE1) };
                    var newFrom = fromh with { equipment = fromh.equipment.SetItem(part, newE2) };
                    Data = Data with { hero = Data.hero.SetItem(uniqueId, newH).SetItem(fromHero, newFrom) };
                    ReplaceEquipment(uniqueId, part, newE2, fromHero);
                }
                else
                {
                    var e2 = Data.equipment[equipment.id];
                    var storE1 = e1.SubCount(origin1.level, origin1.rank, 1).AddCount(equipment.level, origin1.rank, 1);
                    var storE2 = e2.SubCount(equipment.level, equipment.rank, 1).AddCount(origin1.level, equipment.rank, 1);
                    Data = Data with { equipment = Data.equipment.SetItem(e1.id, storE1).SetItem(e2.id, storE2) };
                    Ctx.Emit(CachePath.equipment, e1.id);
                    Ctx.Emit(CachePath.equipment, e2.id);
                    var newE1 = origin1 with { level = equipment.level };
                    var newE2 = equipment with { level = origin1.level };
                    var newH = h with { equipment = h.equipment.SetItem(part, newE1) };
                    Data = Data with { hero = Data.hero.SetItem(uniqueId, newH) };
                    ReplaceEquipment(uniqueId, part, newE2, fromHero);
                }
            }
            else
            {
                ReplaceEquipment(uniqueId, part, equipment, fromHero);
            }
        }

        public void AddEquipment(int id, int level, int rank, long count)
        {
            if (!Data.equipment.ContainsKey(id))
            {
                var e = new Equipment(id, ImmutableArray.Create(new EquipmentStorage(id, level, rank, count)));
                Data = Data with { equipment = Data.equipment.SetItem(id, e) };
            }
            else
            {
                var e = Data.equipment[id];
                var newE = e.AddCount(level, rank, count);
                Data = Data with { equipment = Data.equipment.SetItem(id, newE) };
            }
            Ctx.Emit(CachePath.equipment, id);
        }

        public void SetFormation(string key, int[] formation)
        {
            GameAssert.Must(formation.All(uid => uid == -1 || Data.hero.ContainsKey(uid)), "hero not exist");
            GameAssert.Must(formation.Length == 5, "formation size error");
            GameAssert.Must(key == "default", "current only support default formation");
            GameAssert.Must(formation.Zip(Enumerable.Range(0, 5), (uid, index) =>
            {
                if (uid == -1)
                {
                    return true;
                }
                else
                {
                    var h = Data.hero[uid];
                    var tbl = Ctx.Table.HeroTblMap[h.id];
                    var limit = GameConstant.FormationLimit[tbl.Kind];
                    return limit.Contains(index);
                }
            }).All(b => b), "invalid formation");
            Data = Data with { formation = Data.formation.SetItem(key, formation.ToImmutableArray()) };
            Ctx.Emit(CachePath.formation, key);
        }

        [Handle("hero/setFormation2")]
        public void SetFormation2(string key, int[] formation, bool change)
        {
            if (change)
            {
                var origin = Data.formation[key];
                var needReset = formation.Select((uid, index) =>
                {
                    if (origin[index] == -1 || uid == -1 || uid == origin[index])
                    {
                        return (-999, -999);
                    }
                    else
                    {
                        return (origin[index], uid);
                    }
                }).Where(e => e.Item1 != -999).ToImmutableArray();
                SetFormation(key, formation);
                needReset.ForEach(e =>
                {
                    var (f, to) = e;
                    var fromH = Data.hero[f];
                    var toH = Data.hero[to];
                    var newFrom = fromH with
                    {
                        equipment = toH.equipment,
                        level = toH.level,
                        rank = toH.rank,
                    };
                    var newTo = toH with
                    {
                        equipment = fromH.equipment,
                        level = fromH.level,
                        rank = fromH.rank,
                    };
                    Data = Data with { hero = Data.hero.SetItem(f, newFrom).SetItem(to, newTo) };
                    Ctx.Emit(CachePath.hero, f);
                    Ctx.Emit(CachePath.hero, to);
                });
            }
            else
            {
                SetFormation(key, formation);
            }
            Ctx.Emit(CachePath.formation, key);
        }

        [PartialUpdate("hero")]
        public ImmutableDictionary<int, Hero> AllHero()
        {
            return Data.hero;
        }

        [PartialUpdate("formation")]
        public ImmutableDictionary<string, ImmutableArray<int>> AllFormation()
        {
            return Data.formation;
        }

        [PartialUpdate("equipment")]
        public ImmutableDictionary<int, Equipment> AllEquipment()
        {
            return Data.equipment;
        }

    }
}