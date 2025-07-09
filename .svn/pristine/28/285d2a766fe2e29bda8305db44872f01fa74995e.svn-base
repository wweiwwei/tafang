using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace GamePlay
{
    public class ManorManager : AbstractManager<ManorData>, IBaseManager
    {
        public ManorManager(JToken saveData, PlayerDataManager ctx) : base(saveData, ctx)
        {
        }

        public override void DailyRefresh()
        {

        }

        public override void InitData()
        {
            if (Data.map.Count == 0)
            {
                Ctx.Table.ManorFacilityTblList.ForEach(tbl =>
                {
                    SetMap(tbl.Id, tbl.InitPosition[0], tbl.InitPosition[1]);
                });
            }
        }

        [PartialUpdate("manorData")]
        public ImmutableDictionary<int, ImmutableArray<ImmutableArray<int>>> InitManor()
        {
            return Data.map;
        }

        [Handle("manor/setMap")]
        public void SetMap(int id, int x, int y)
        {
            var facility = Ctx.Table.ManorFacilityTblMap.ContainsKey(id);
            var decoration = Ctx.Table.ManorDecorationTblMap.ContainsKey(id);
            var contain = Data.map.ContainsKey(id);
            GameAssert.Must(facility || decoration, $"id:{id} is not exist");
            GameAssert.Expect(CheckSetable(id, x, y), 60001);
            var pos = new int[] { x, y }.ToImmutableArray();
            if (facility)
            {
                if (contain)
                {
                    var newPosList = Data.map[id].Add(pos);
                    Data = Data with
                    {
                        map = Data.map.SetItem(id, newPosList)
                    };
                }
                else
                {
                    var posList = new ImmutableArray<int>[] { pos }.ToImmutableArray();
                    Data = Data with
                    {
                        map = Data.map.Add(id, posList)
                    };
                }
            }
            else
            {
                var storage = Ctx.KnapsackManager.GetStorageById(id);
                int hasUse = contain ? Data.map[id].Length : 0;
                GameAssert.Expect(hasUse < storage, 60003);
                if (hasUse > 0)
                {
                    var newList = Data.map[id].Add(new ImmutableArray<int> { x, y });
                    Data = Data with
                    {
                        map = Data.map.SetItem(id, newList)
                    };
                }
                else
                {
                    var newList = new ImmutableArray<int>[] { pos }.ToImmutableArray();
                    Data = Data with
                    {
                        map = Data.map.Add(id, newList)
                    };
                }
            }
            Ctx.Emit(CachePath.manorData, id);
        }

        [Handle("manor/removeMapItem")]
        public void RemoveMapItem(int id, int index)
        {
            var facility = Ctx.Table.ManorFacilityTblMap.ContainsKey(id);
            var decoration = Ctx.Table.ManorDecorationTblMap.ContainsKey(id);
            GameAssert.Must(facility || (decoration && Ctx.Table.ItemTblMap.ContainsKey(id)), $"id:{id} is not exist");
            GameAssert.Must(Data.map.ContainsKey(id), $"id:{id} is not planted");
            GameAssert.Must(Data.map[id].Length > index, $"index:{index} is not exist");
            var items = Data.map[id];
            var x = items[index][0];
            var y = items[index][1];
            var newList = items.Where(pos => pos[0] != x && pos[1] != y).ToImmutableArray();
            Data = Data with { map = newList.Length <= 0 ? Data.map.Remove(id) : Data.map.SetItem(id, newList) };
            Ctx.Emit(CachePath.manorData, id);
        }

        /**获取地图二维数组*/
        public ImmutableArray<ImmutableArray<int>> GetMapMatrix()
        {
            var map = Data.map;
            var mapArr = new List<List<int>>();
            for (var i = 0; i < ManorConfig.vertical; i++)
            {
                int[] arr = new int[ManorConfig.horizontal];
                Array.Fill(arr, -1);
                mapArr.Add(arr.ToList());
            }
            map.Keys.ToImmutableArray().ForEach(id =>
            {
                ImmutableArray<int> area;
                if (Ctx.Table.ManorFacilityTblMap.ContainsKey(id))
                {
                    area = Ctx.Table.ManorFacilityTblMap[id].Area;
                }
                else
                {
                    area = Ctx.Table.ManorDecorationTblMap[id].Area;
                }
                /*[[1,1],[2,2]]*/
                var pos = map[id];
                pos.ForEach(list =>
                {
                    for (var y = 0; y < area[1]; y++)
                    {
                        for (var x = 0; x < area[0]; x++)
                        {
                            mapArr[list[1] + y][list[0] + x] = id;
                        }
                    }
                });
            });
            mapArr.ForEach(list =>
            {
                // Console.WriteLine(JsonUtils.Stringify(list));
            });
            return mapArr.Select(arr => arr.ToImmutableArray()).ToImmutableArray();
        }

        /**空闲二维数组*/
        public ImmutableArray<ImmutableArray<bool>> GetIdleMatrix()
        {
            var newArr = GetMapMatrix().Select(arr => arr.Select(i => i == -1).ToImmutableArray()).ToImmutableArray();
            newArr.ForEach(list =>
            {
                // Console.WriteLine(JsonUtils.Stringify(list));
            });
            return newArr;
        }

        /*检查是否可放置*/
        public bool CheckSetable(int id, int x, int y)
        {
            var idleMatrix = GetIdleMatrix();
            GameAssert.Expect(x >= 0 && x < ManorConfig.horizontal && y >= 0 && y < ManorConfig.vertical, 60002);
            var ok = true;
            ImmutableArray<int> area;
            if (Ctx.Table.ManorFacilityTblMap.ContainsKey(id))
            {
                area = Ctx.Table.ManorFacilityTblMap[id].Area;
            }
            else
            {
                area = Ctx.Table.ManorDecorationTblMap[id].Area;
            }
            var pos = new int[] { x, y };
            for (var a = 0; a < area[0]; a++)
            {
                for (var b = 0; b < area[1]; b++)
                {
                    GameAssert.Expect(pos[0] + a >= 0 && pos[0] + a < ManorConfig.horizontal && pos[1] + b >= 0 && pos[1] + b < ManorConfig.vertical, 60002);
                    if (!idleMatrix[pos[1] + b][pos[0] + a])
                    {
                        // Console.WriteLine("y:" + (pos[1] + b));
                        // Console.WriteLine("x:" + (pos[0] + a));
                        ok = false;
                        break;
                    }
                }
            }
            return ok;
        }

    }
}