using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace GamePlay;

public class PlayerEquipmentManager : AbstractManager<PlayerEquipmentData>, IBaseManager
{
    public PlayerEquipmentManager(JToken saveData, PlayerDataManager ctx) : base(saveData, ctx)
    {
    }

    public override void DailyRefresh()
    {

    }

    public override void InitData()
    {
        if (Data.equipmentPlace.IsEmpty)
        {
            var partCount = Ctx.Table.EquipmentTblList.Select(t => t.Part).ToHashSet().Count;
            // 初始化塔位
            var newPlace = new Dictionary<int, PlayerEquipmentPlace>();
            for (var i = 0; i < partCount; i++)
            {
                newPlace.Add(i, new PlayerEquipmentPlace(i, 0, ImmutableArray<PlayerEquipmentWashStat>.Empty));
            }
            Data = Data with
            {
                equipmentPlace = newPlace.ToImmutableDictionary(),
                equipment = Enumerable.Range(0, partCount).Select(e => -1L).ToImmutableArray(),
                // equipmentStorage = initEquipment.ToImmutableDictionary(e => e.uniqueId, e => e),
                formation = Enumerable.Range(0, Ctx.Config.Equipment.TowerPlaceCount).Select(i => -1).ToImmutableArray(),
                // hasActiveCollection = ImmutableArray<int>.Empty,
                activeTalent = Enumerable.Range(0, partCount).ToImmutableDictionary(p => p, p =>
                {
                    var indexList = Ctx.Table.PlayerSkillTalentTblList.Where(t => t.Part == p).Select(t => t.Index).Distinct().ToList();
                    return indexList.ToImmutableDictionary(i => i, i => -1);
                }),
            };
        }

    }

    [Update("playerEquipment")]
    public ImmutableArray<long> PlayerEquipment()
    {
        return Data.equipment;
    }

    [Update("tempEquipment")]
    public ImmutableArray<long> TempEquipment()
    {
        return Data.tempEquipment;
    }

    [PartialUpdate("playerEquipmentStorage")]
    public ImmutableDictionary<long, PlayerEquipment> PlayerEquipmentStorage()
    {
        return Data.equipmentStorage;
    }

    [PartialUpdate("playerEquipmentPlace")]
    public ImmutableDictionary<int, PlayerEquipmentPlace> PlayerEquipmentPlace()
    {
        return Data.equipmentPlace;
    }

    [Update("equipmentCollection")]
    public Dictionary<string, object> EquipmentCollection()
    {
        return new Dictionary<string, object>
        {
            {"canActive",Data.canActiveCollection},
            {"hasActive",Data.hasActiveCollection}
        };
    }
    [Update("towerFormation")]
    public ImmutableArray<int> TowerFormation()
    {
        return Data.formation;
    }

    [PartialUpdate("towerTalent")]
    public ImmutableDictionary<int, ImmutableDictionary<int, int>> TowerTalent()
    {
        return Data.activeTalent;
    }

    [Update("towerWashData")]
    public Dictionary<string, object> TowerWashData()
    {
        return new Dictionary<string, object>
        {
            {"exp",Data.exp},
            {"washLevel",Data.washLevel}
        };
    }

    [Handle("playerEquipment/activateTowerPlace")]
    public void ActivateTowerPlace()
    {
        if (Data.equipmentPlace.Any(d => d.Value.stat.IsEmpty))
        {
            var partCount = Ctx.Table.EquipmentTblList.Select(t => t.Part).ToHashSet().Count;
            // 初始化塔位
            var newPlace = new Dictionary<int, PlayerEquipmentPlace>();
            for (var i = 0; i < partCount; i++)
            {
                newPlace.Add(i, new PlayerEquipmentPlace(i, 0, new List<PlayerEquipmentWashStat>() { new(-1, 0, false) }.ToImmutableArray()));
            }
            Data = Data with { equipmentPlace = newPlace.ToImmutableDictionary(pair => pair.Key, pair => DoWash(pair.Value)) };
            Ctx.EmitMany(CachePath.playerEquipmentPlace, Data.equipmentPlace.Keys);
        }
    }


    [Handle("playerEquipment/replace")]
    public Dictionary<string, object> Replace(int tempIndex, bool sell)
    {
        var uid = Data.tempEquipment[tempIndex];
        var e = Data.equipmentStorage[uid];
        var origin = Data.equipment[Ctx.Table.EquipmentTblMap[e.id].Part];
        // 原装备为空
        if (origin == -1)
        {
            var part = Ctx.Table.EquipmentTblMap[e.id].Part;
            var newEquip = Data.equipment.SetItem(part, uid);
            var newTemp = Data.tempEquipment.RemoveAt(tempIndex);
            Data = Data with
            {
                equipment = newEquip,
                tempEquipment = newTemp
            };
            Ctx.Emit(CachePath.playerEquipment);
            Ctx.Emit(CachePath.tempEquipment);
            Ctx.MissionManager.UpdateMissionProgress(2, 1);
            return new Dictionary<string, object>(){
                {"exp",0},
                {"reward",ImmutableArray<Item>.Empty}
            };
        }
        // 原装备非空
        var newEquip2 = Data.equipment.SetItem(Ctx.Table.EquipmentTblMap[e.id].Part, uid);
        var newTemp2 = Data.tempEquipment.SetItem(tempIndex, origin);
        Data = Data with
        {
            equipment = newEquip2,
            tempEquipment = newTemp2
        };

        var res = new Dictionary<string, object>(){
                {"exp",0},
                {"reward",ImmutableArray<Item>.Empty}
            };
        if (sell)
        {
            res = Sell(tempIndex);
        }
        Ctx.Emit(CachePath.playerEquipment);
        Ctx.Emit(CachePath.tempEquipment);
        Ctx.MissionManager.UpdateMissionProgress(2, 1);
        return res;
    }

    [Handle("playerEquipment/sell")]
    public Dictionary<string, object> Sell(int tempIndex)
    {
        var uid = Data.tempEquipment[tempIndex];
        var e = Data.equipmentStorage[uid];
        var newTemp = Data.tempEquipment.RemoveAt(tempIndex);
        Data = Data with
        {
            tempEquipment = newTemp
        };
        Ctx.Emit(CachePath.tempEquipment);
        var (expAdd, reward) = _sell(e);
        return new Dictionary<string, object>(){
                {"exp",expAdd},
                {"reward",reward}
            };
    }


    [Handle("playerEquipment/sellAll")]
    public Dictionary<string, object> SellAll()
    {
        var finalExpAdd = 0L;
        var finalReward = ImmutableArray<Item>.Empty;
        Data.tempEquipment.ForEach(uid =>
        {
            var e = Data.equipmentStorage[uid];
            var (expAdd, reward) = _sell(e);
            finalExpAdd += expAdd;
            finalReward = finalReward.AddRange(reward);
        });

        Data = Data with
        {
            tempEquipment = ImmutableArray<long>.Empty
        };
        Ctx.Emit(CachePath.tempEquipment);
        return new Dictionary<string, object>(){
                {"exp",finalExpAdd},
                {"reward",finalReward}
            };
    }

    private (long, ImmutableArray<Item>) _sell(PlayerEquipment e)
    {
        Ctx.MissionManager.UpdateMissionProgress(35, 1);
        var tbl = Ctx.Table.EquipmentTblMap[e.id];
        var exp = tbl.Exp;
        var coin = tbl.Coin;
        var finalReward = Ctx.KnapsackManager.AddItem(new Item(GameConstant.CoinId, coin));
        if (Data.equipmentStorage.ContainsKey(e.uniqueId))
        {
            Data = Data with
            {
                equipmentStorage = Data.equipmentStorage.Remove(e.uniqueId)
            };
            Ctx.Emit(CachePath.playerEquipmentStorage, e.uniqueId);
        }
        return (exp, finalReward);

    }

    public (long, ImmutableArray<Item>) AddTemp(PlayerEquipment e, bool sell)
    {

        if (!Data.canActiveCollection.Contains(e.id) && !Data.hasActiveCollection.Contains(e.id))
        {
            // 更新图鉴
            Data = Data with
            {
                canActiveCollection = Data.canActiveCollection.Add(e.id),
            };
            Ctx.Emit(CachePath.equipmentCollection);
        }
        if (sell)
        {
            return _sell(e);
        }
        else
        {
            var newTemp = Data.tempEquipment.Add(e.uniqueId);
            Data = Data with
            {
                tempEquipment = newTemp,
                equipmentStorage = Data.equipmentStorage.SetItem(e.uniqueId, e)
            };
            Ctx.Emit(CachePath.playerEquipmentStorage, e.uniqueId);
            Ctx.Emit(CachePath.tempEquipment);
            return (0, ImmutableArray<Item>.Empty);
        }
    }

    public bool IsMaxWashLevel()
    {
        return Data.washLevel >= Ctx.Table.TowerWashRareTblList.Length;
    }

    [Handle("playerEquipment/strengthenAllTower")]
    public void StrengthenAllTower()
    {
        // var keys = Data.equipmentPlace.Keys.Where(i => i < index);
        // if (keys.Count() <= 0)
        //     GameAssert.Must(Data.equipmentPlace.Keys.Except(new List<int>(index)).All(i => Data.equipmentPlace[i].level == Data.equipmentPlace[index].level), $"can not strengthen index:{index} tower");
        // else
        //     GameAssert.Must(keys.All(i => Data.equipmentPlace[i].level > Data.equipmentPlace[index].level), $"can not strengthen index:{index} tower");
        foreach (var index in Data.equipmentPlace.Keys)
        {
            StrengthenTower(index);
        }
    }

    [Handle("playerEquipment/strengthenTower")]
    public void StrengthenTower(int index)
    {
        GameAssert.Must(Data.equipmentPlace.ContainsKey(index), $"index:{index} is not exist");
        var place = Data.equipmentPlace[index];
        GameAssert.Expect(!place.IsMaxLevel(Ctx), 100001);
        // if (place.IsMaxLevel(Ctx)) return;
        Ctx.KnapsackManager.SubItem(place.strengthenCost(Ctx));
        var newPlace = place with
        {
            level = place.level + 1,
            stat = Ctx.Config.Equipment.WashPropertyCount.IndexWhere(l => l >= place.level + 1) != place.stat.Length ? place.stat.Add(new(-1, 0, false)) : place.stat
        };
        Data = Data with
        {
            equipmentPlace = Data.equipmentPlace.SetItem(index, DoWash(newPlace))
        };
        Ctx.Emit(CachePath.playerEquipmentPlace, index);
        Ctx.MissionManager.UpdateMissionProgress(3, 1);
        Ctx.MissionManager.UpdateMissionProgress(42, 1);
        Ctx.MissionManager.UpdateMissionProgress(43, 1);
    }

    [Handle("playerEquipment/towerWash")]
    public void TowerWash(int index)
    {
        GameAssert.Must(Data.equipmentPlace.ContainsKey(index), $"index:{index} is not exist");
        var place = Data.equipmentPlace[index];
        GameAssert.Expect(place.stat.Any(s => !s.locked), 100002);
        Ctx.KnapsackManager.SubItem(new Item(Ctx.Config.Equipment.WashCost[0], Ctx.Config.Equipment.WashCost[1] * (place.stat.Where(s => s.locked).Count() + 1)));
        var newExp = Data.exp + Ctx.Config.Equipment.WashCost[1] * (place.stat.Where(s => s.locked).Count() + 1);
        var require = Ctx.Table.TowerWashRareTblList.First(t => t.Level == Data.washLevel).Exp;
        Data = Data with
        {
            equipmentPlace = Data.equipmentPlace.SetItem(place.index, DoWash(place)),
            exp = newExp >= require && !IsMaxWashLevel() ? newExp - require : newExp,
            washLevel = newExp >= require && !IsMaxWashLevel() ? Data.washLevel + 1 : Data.washLevel
        };
        Ctx.Emit(CachePath.playerEquipmentPlace, place.index);
        Ctx.Emit(CachePath.towerWashData);
    }

    public PlayerEquipmentPlace DoWash(PlayerEquipmentPlace place)
    {
        var tbl = Ctx.Table.TowerWashRareTblList.First(t => t.Level == Data.washLevel);
        var newStat = place.stat.Select(s =>
        {

            if (!s.locked)
            {
                var quality = RandomUtils.GetHappenedIndex(tbl.Rare);
                var index = RandomUtils.GetHappenedIndex(tbl.Weight);
                var statTbl = Ctx.Table.TowerWashTblList.First(t => t.Pid == tbl.Pool[index] && t.Quailty == quality);
                return s with { id = statTbl.Id, value = RandomUtils.RandomInt(int.Parse(statTbl.Min), int.Parse(statTbl.Max)) };
            }
            else return s;
        }).ToImmutableArray();
        var newPlace = place with
        {
            stat = newStat,
        };
        return newPlace;
    }

    [Handle("playerEquipment/lockProperty")]
    public void LockProperty(int index, int number)
    {
        GameAssert.Must(Data.equipmentPlace.ContainsKey(index), $"index:{index} is not exist");
        var place = Data.equipmentPlace[index];
        var newStat = place.stat.Select((s, i) => { if (i == number) return s with { locked = !s.locked }; else return s; });
        Data = Data with { equipmentPlace = Data.equipmentPlace.SetItem(index, place with { stat = newStat.ToImmutableArray() }) };
        Ctx.Emit(CachePath.playerEquipmentPlace, index);
    }

    [Handle("playerEquipment/replaceTower")]
    public void ReplaceTower(int originIndex, int replacePart)
    {
        GameAssert.Must(originIndex < Data.formation.Length, $"invalid originIndex {originIndex}");
        GameAssert.Must(replacePart < Data.equipment.Length, $"invalid replacePart {replacePart}");
        Data = Data with
        {
            formation = Data.formation.SetItem(originIndex, replacePart)
        };
        Ctx.MissionManager.UpdateMissionProgress(36, 1);
        Ctx.Emit(CachePath.towerFormation);
    }

    [Handle("playerEquipment/changeTowerPosition")]
    public void ChangeTowerPosition(int fromIndex, int toIndex)
    {
        var fromPart = Data.formation[fromIndex];
        var toPart = Data.formation[toIndex];
        Data = Data with
        {
            formation = Data.formation.SetItem(fromIndex, toPart).SetItem(toIndex, fromPart)
        };
        Ctx.MissionManager.UpdateMissionProgress(36, 1);
        Ctx.Emit(CachePath.towerFormation);
    }

    [Handle("playerEquipment/activateColletion")]
    public ImmutableArray<Item> ActivateColletion(int equipmentId)
    {
        GameAssert.Must(Data.canActiveCollection.Contains(equipmentId), $"invalid equipmentId {equipmentId}");
        Data = Data with
        {
            canActiveCollection = Data.canActiveCollection.Remove(equipmentId),
            hasActiveCollection = Data.hasActiveCollection.Add(equipmentId)
        };
        // 奖励100钻石，是否改为配表？
        var reward = new Item(GameConstant.DiamondId, 100);
        var res = Ctx.KnapsackManager.AddItem(reward);
        Ctx.Emit(CachePath.equipmentCollection);
        return res;
    }
    /**24.03.13废弃*/
    [Handle("playerEquipment/selectTalent")]
    public void SelectTalent(int part, int index)
    {
        // var origin = Data.activeTalent[part];
        // if (origin.Contains(index))
        // {
        //     var newList = origin.Remove(index);
        //     Data = Data with
        //     {
        //         activeTalent = Data.activeTalent.SetItem(part, newList)
        //     };
        // }
        // else
        // {
        //     var tbls = Ctx.Table.PlayerSkillTalentTblList.Where(t => t.Part == part && t.Index == index).ToList();
        //     var hasActive = tbls.Count > 0 && tbls.Any(t =>
        //     {
        //         var equipmentId = Ctx.Index.Id.TalentIdToEquipmentId[t.Id];
        //         // 改动，无论是否已经手动激活图鉴都可以选择
        //         return Data.hasActiveCollection.Concat(Data.canActiveCollection).Contains(equipmentId);
        //     });
        //     GameAssert.Expect(hasActive, 100003);
        //     GameAssert.Expect(origin.Length < Ctx.Config.Equipment.TalentSelectLimit, 100004);
        //     var newList = origin.Add(index);
        //     Data = Data with
        //     {
        //         activeTalent = Data.activeTalent.SetItem(part, newList)
        //     };
        // }
        // Ctx.MissionManager.UpdateMissionProgress(38, 1);
        // Ctx.Emit(CachePath.towerTalent, part);
    }

    [Handle("playerEquipment/upgradeTalent")]
    public void UpgradeTalent(int part, int index)
    {
        var tbl = Ctx.Table.PlayerSkillTalentTblList.Where(t => t.Part == part && t.Index == index).ToList();
        var talent = Data.activeTalent[part][index];
        GameAssert.Must(tbl.Count > 0, $"illegal part:{part} index:{index}");
        var lastTbl = tbl.LastOrDefault(t =>
        {
            var equipmentId = Ctx.Index.Id.TalentIdToEquipmentId[t.Id];
            // 改动，无论是否已经手动激活图鉴都可以选择
            return Data.hasActiveCollection.Concat(Data.canActiveCollection).Contains(equipmentId);
        });
        GameAssert.Expect(lastTbl != null, 10002);
        if (talent == -1)
        {
            var newTalent = Data.activeTalent[part].SetItem(index, tbl.First().Id);
            Data = Data with
            {
                activeTalent = Data.activeTalent.SetItem(part, newTalent)
            };
        }
        else
        {
            var nextTbl = tbl.FirstOrDefault(t => t.Rank == Ctx.Table.PlayerSkillTalentTblMap[talent].Rank + 1);
            GameAssert.Expect(nextTbl != null, 100005);
            if (lastTbl.Id == talent) return;
            var newTalent = Data.activeTalent[part].SetItem(index, nextTbl.Id);
            Data = Data with
            {
                activeTalent = Data.activeTalent.SetItem(part, newTalent)
            };
        }
        Ctx.Emit(CachePath.towerTalent, part);
    }
}
