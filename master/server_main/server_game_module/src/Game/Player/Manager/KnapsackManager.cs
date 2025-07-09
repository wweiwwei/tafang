using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace GamePlay
{
    public class KnapsackManager : AbstractManager<KnapsackData>, IBaseManager
    {
        public KnapsackManager(JToken saveData, PlayerDataManager ctx) : base(saveData, ctx)
        {
        }

        public override void DailyRefresh()
        {

        }

        public override void InitData()
        {
            if (Data.acc.IsEmpty)
            {
                Ctx.Config.Knapsack.InitItem.ForEach(t => AddItem(t));
            }
        }

        /** 添加物品 */
        public ImmutableArray<Item> AddItem(Item item)
        {
            if (Ctx.Table.ItemTblMap.ContainsKey(item.id))
            {
                if (item.count == 0L) return [item];
                var tbl = Ctx.Table.ItemTblMap[item.id];
                if (tbl.Kind == 121)
                {
                    return HandleChest(item);
                }
                else if (tbl.Kind == 1031)
                {
                    // 装备
                    return Ctx.SpriteManager.AddSprite(item.id, item.count);
                }
                else if (tbl.Kind == 1041)
                {
                    // 坐骑
                    Ctx.PlayerMountManager.AddMount(item.id);
                    return [item];
                }
                else if (tbl.Kind == 1051)
                {
                    // 时装
                    Ctx.PlayerSkinManager.AddSkin(item.id);
                    return [item];
                }
                else
                {
                    DoAdd(item);
                    return [item];
                }
            }
            else
            {
                GameAssert.Crash($"addItem not support item type id:{item.id} count:{item.count}");
                return ImmutableArray<Item>.Empty;
            }
        }

        private ImmutableArray<Item> HandleChest(Item item)
        {
            return Enumerable.Range(1, (int)item.count).Select(i =>
            {
                var chestReward = Ctx.Table.ChestItemPoolTblList.Where(t => t.ItemId == item.id).ToImmutableArray();
                var index = RandomUtils.GetHappenedIndex(chestReward.Select(t => t.Weight).ToImmutableArray());
                var reward = chestReward[index].Reward;
                var isHero = Ctx.Table.HeroTblList.FirstOrDefault(hero => hero.Id == (int)reward[0]);
                if (isHero != null)
                {
                    var res = Ctx.HeroManager.AddHero(isHero.Id);
                    if (res.IsLeft)
                    {
                        // 抽到了英雄，略过最终的添加步骤
                        return new Item(res.Value1.id, 1);
                    }
                    else
                    {
                        DoAdd(res.Value2);
                        return res.Value2;
                    }
                }
                else
                {
                    var finalReward = new Item((int)reward[0], reward[1]);
                    DoAdd(finalReward);
                    return finalReward;
                }
            }).ToImmutableArray();
        }

        private void DoAdd(Item item)
        {
            GameAssert.Must(Ctx.Table.ItemTblMap.ContainsKey(item.id), $"item id {item.id} not exist");
            Ctx.MissionManager.UpdateMissionProgress(34, item.count, new int[] { item.id });
            if (Data.storage.ContainsKey(item.id))
            {
                var newStorage = Data.storage[item.id] + item.count;
                var newAcc = Data.acc[item.id] + item.count;
                Data = Data with
                {
                    storage = Data.storage.SetItem(item.id, newStorage),
                    acc = Data.acc.SetItem(item.id, newAcc)
                };
            }
            else
            {
                Data = Data with
                {
                    storage = Data.storage.SetItem(item.id, item.count),
                    acc = Data.acc.SetItem(item.id, item.count),
                    accCost = Data.accCost.SetItem(item.id, 0L)
                };
            }
            Ctx.Emit(CachePath.storage, item.id);
        }


        /** 批量添加物品 */
        public ImmutableArray<Item> AddItem(IEnumerable<Item> itemList)
        {
            return itemList.SelectMany(i => AddItem(i)).ToImmutableArray();
        }

        /** 检查库存是否足够 */
        public bool CheckStorage(Item item)
        {
            return GetStorageById(item.id) >= item.count;
        }

        /** 检查库存是否足够，参数为列表 */
        public bool CheckStorage(ImmutableArray<Item> itemList)
        {
            return itemList.All(i => CheckStorage(i));
        }

        /** 消耗物品 */
        public void SubItem(Item item)
        {
            if (item.count == 0L) return;
            GameAssert.Must(Ctx.Table.ItemTblMap.ContainsKey(item.id), "SubItem not support item type id:{item.id} count:{item.count}");
            if (!CheckStorage(item))
            {
                var (code, name) = GetItemError(item.id);
                GameAssert.Raise(code, new[] { name });
            }
            var newStorage = Data.storage[item.id] - item.count;
            var newAccCost = Data.accCost[item.id] + item.count;
            Data = Data with
            {
                storage = Data.storage.SetItem(item.id, newStorage),
                accCost = Data.accCost.SetItem(item.id, newAccCost)
            };
            Ctx.Emit(CachePath.storage, item.id);
        }

        private (int, string) GetItemError(int id)
        {
            var tbl = Ctx.Table.ItemTblMap[id];
            if (tbl.Kind != 21)
            {
                return (1001, tbl.Name);
            }
            else
            {
                var heroTbl = Ctx.Table.HeroTblList.First(hero => hero.Frag == id);
                return (1002, heroTbl.Name);
            }
        }

        /** 批量消耗物品 */
        public void SubItem(IEnumerable<Item> itemList)
        {
            var combineItem = Item.CombineItem(itemList);
            if (combineItem.Any(i => !CheckStorage(i)))
            {
                var item = combineItem.First(i => !CheckStorage(i));
                var (code, name) = GetItemError(item.id);
                GameAssert.Raise(code, new[] { name });
            }
            combineItem.ForEach(i => SubItem(i));
        }

        /** 获取库存 */
        public long GetStorageById(int id)
        {
            return Data.storage.GetValueOrDefault(id, 0L);
        }

        /** 获取累计消耗 */
        public long GetAccCostById(int id)
        {
            return Data.accCost.GetValueOrDefault(id, 0L);
        }

        /** 获取累计获取 */
        public long GetAccById(int id)
        {
            return Data.acc.GetValueOrDefault(id, 0L);
        }

        /** 获取库存数据 */
        [PartialUpdate("storage")]
        public ImmutableDictionary<int, long> GetAllStorage()
        {
            return Data.storage;
        }

        [Handle("knapsack/openChest")]
        public ImmutableArray<Item> OpenChest(int id, int chestCount, int itemId)
        {
            var tbl = Ctx.Table.OptionalChestPoolTblMap[id];
            GameAssert.Must(tbl.ItemId == itemId, $"itemId not exist {itemId}");
            SubItem(new Item(itemId, chestCount));
            var reward = new Item((int)tbl.Reward[0], tbl.Reward[1]).Mul(chestCount);
            var finalReward = AddItem(reward);
            return finalReward;
        }



    }
}