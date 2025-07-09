using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace GamePlay
{
    public class MineManager : AbstractManager<MineData>, IBaseManager
    {
        public MineManager(JToken saveData, PlayerDataManager ctx) : base(saveData, ctx)
        {
        }

        public override void DailyRefresh()
        {
            RefreshPower();
            Data = Data with { videoRecoverCount = 0, videoDrillCount = 0, videoBombCount = 0, auto = false };
        }

        public override void InitData()
        {
            RefreshPower();
            if (Data.currentFloor == 0)
            {
                for (var i = 1; i <= 3; i++)
                {
                    NextRow();
                }
            }
        }

        public override void Tick()
        {
            RefreshPower();
        }

        private void NextRow()
        {
            var list = Ctx.Table.MineMapAreaTblList.Where(t => t.AreaId == Data.currentAreaId).ToList();
            var tbl = list[Data.currentAreaRowIndex];
            var y = Data.currentFloor;
            var brickSeq = new List<int>(){
                tbl.Col1, tbl.Col2, tbl.Col3, tbl.Col4, tbl.Col5, tbl.Col6
            }
            .Select((brickType, x) => (brickType, x))
            .Where(e => e.brickType != 0)
            .Select((e, i) =>
            {
                var (brickType, x) = e;
                if (brickType == MineMapType.RANDOM_BRICK)
                {
                    var index = RandomUtils.GetHappenedIndex(tbl.Weight);
                    return GenerateBrick(index == 0 ? 1 : 2, x, y + 1, Data.uniqueId + x);
                }
                else
                {
                    return GenerateBrick(brickType, x, y + 1, Data.uniqueId + x);
                }
            }).ToList();
            var newMapTemp = Data.currentMap.Concat(brickSeq.Select(b => new KeyValuePair<int, MineBrick>(b.uniqueId, b)));
            var newMap = newMapTemp.Where(e =>
            {
                var brick = e.Value;
                return brick.y >= y - 5 + 1;
            }).ToImmutableDictionary(e => e.Key, e => e.Value);
            if (Data.currentAreaRowIndex + 1 >= list.Count)
            {
                var areaList = Ctx.Table.MineMapAreaTblList
                    .Where(t => y >= t.UnlockFloor[0] && y < t.UnlockFloor[1])
                    .Select(t => t.AreaId)
                    .Distinct()
                    .ToList();
                var newAreaId = RandomUtils.RandomElement(areaList);
                Data = Data with
                {
                    currentMap = newMap,
                    currentAreaId = newAreaId,
                    currentAreaRowIndex = 0,
                    currentFloor = Data.currentFloor + 1,
                    uniqueId = Data.uniqueId + 6,
                };
            }
            else
            {
                Data = Data with
                {
                    currentMap = newMap,
                    currentAreaRowIndex = Data.currentAreaRowIndex + 1,
                    currentFloor = Data.currentFloor + 1,
                    uniqueId = Data.uniqueId + 6,
                };
            }
            Ctx.EmitMany(CachePath.mineBrick, brickSeq.Select(b => b.uniqueId));
            var boss = Ctx.Table.MineBattleMapTblList.Select(t => t.Boss).Where(t => t != -1).Contains(Data.currentFloor);
            if (boss)
            {
                Data = Data with { boss = true };
            }
        }

        private MineBrick GenerateBrick(int param, int x, int y, int uniqueId)
        {
            var rewardId = param switch
            {
                MineMapType.BRICK_1 or MineMapType.BRICK_3 => Ctx.Table.MineRewardTblList[RandomUtils.GetHappenedIndex(Ctx.Table.MineRewardTblList.Select(t => t.Weight))].Id,
                // MineMapType.BATTLE => RandomUtils.RandomElement(Ctx.Table.MineBattleMapTblList.Where(t => t.UnlockFloor.Any() && t.UnlockFloor[0] <= y && t.UnlockFloor[1] > y).Select(t => t.Id)),
                _ => 2001,
            };
            var res = new MineBrick(
                uniqueId: uniqueId,
                mapType: param,
                x: x,
                y: y,
                rewardId: rewardId,
                life: param switch
                {
                    MineMapType.BRICK_1 => 1,
                    MineMapType.BRICK_3 => 2,
                    MineMapType.NOREWARD1 => 1,
                    MineMapType.MAP_BOMB => 1,
                    MineMapType.NOREWARD2 => 2,
                    _ => 1,
                }
            );
            return res;
        }

        private void RefreshPower()
        {
            var now = Ctx.Now();
            var powerAdd = (now - Data.lastPowerRefreshTime) / Ctx.Config.Mine.PowerRecoverInterval;
            if (powerAdd > 0)
            {
                AddPower((int)powerAdd, video: false);
                Data = Data with { lastPowerRefreshTime = Data.lastPowerRefreshTime + powerAdd * Ctx.Config.Mine.PowerRecoverInterval };
            }
        }

        private void AddPower(int p, bool video)
        {
            if (video)
            {
                Data = Data with { currentPower = Data.currentPower + p };
            }
            else
            {
                if (Data.currentPower >= Ctx.Config.Mine.PowerLimit) return;
                var newPower = Data.currentPower + p > Ctx.Config.Mine.PowerLimit ? Ctx.Config.Mine.PowerLimit : Data.currentPower + p;
                Data = Data with { currentPower = newPower };
            }
            Ctx.Emit(CachePath.mineData);
        }

        [Handle("mine/videoAddPower")]
        public void VideoAddPower()
        {
            GameAssert.Expect(Data.videoRecoverCount < Ctx.Config.Mine.VideoPowerLimit, 13002);
            Data = Data with { videoRecoverCount = Data.videoRecoverCount + 1 };
            AddPower(Ctx.Config.Mine.VideoPowerRecover, video: true);
        }
        [Handle("mine/videoAddDrill")]
        public void videoAddDrill()
        {
            GameAssert.Expect(Data.videoDrillCount < Ctx.Config.Mine.VideoPowerLimit, 13002);
            Data = Data with { videoDrillCount = Data.videoDrillCount + 1 };
            Ctx.KnapsackManager.AddItem(new Item(GameConstant.MineDrillId, 1));
        }
        [Handle("mine/videoAddBomb")]
        public void videoAddBomb()
        {
            GameAssert.Expect(Data.videoBombCount < Ctx.Config.Mine.VideoPowerLimit, 13002);
            Data = Data with { videoBombCount = Data.videoBombCount + 1 };
            Ctx.KnapsackManager.AddItem(new Item(GameConstant.MineBombId, 1));
        }

        [Handle("mine/videoAuto")]
        public void VideoAuto()
        {
            Data = Data with { auto = true };
            Ctx.Emit(CachePath.mineData);
        }

        [Handle("mine/resetFloor")]
        public void ResetFloor()
        {
            GameAssert.Expect(Data.currentFloor >= Ctx.Config.Mine.ResetFloorRequire, 13003);
            Ctx.KnapsackManager.SubItem(new Item(GameConstant.DiamondId, Ctx.Config.Mine.ResetCost));
            Data = Data with { currentFloor = 1, boss = false };
            Ctx.Emit(CachePath.mineData);
        }

        private MineBrick[][] GetBrickMatrix()
        {
            var bricks = Data.currentMap;
            var matrix = new MineBrick[6][];
            for (var i = 0; i < 6; i++)
            {
                matrix[i] = new MineBrick[6];
            }
            var baseY = Data.currentFloor - 5;
            bricks.Values.ToList().ForEach(b =>
            {
                var x = b.x;
                var y = b.y - baseY;
                if (y >= 0)
                {
                    matrix[y][x] = b;
                }
            });
            return matrix;
        }

        private bool[][] GetRoadMatrix()
        {
            var bricks = GetBrickMatrix();
            var baseY = Data.currentFloor - 5;
            var minerPos = Data.minerPos;
            var minerMatrixPos = new int[] { minerPos[0], minerPos[1] - baseY };
            return PathSearchUtil.GetRoadMatrix(bricks, minerMatrixPos);
            // var matrix = new bool[6][];
            // for (var i = 0; i < 6; i++)
            // {
            //     matrix[i] = new bool[6];
            // }
            // bricks.Values.ToList().ForEach(b =>
            // {
            //     var x = b.x;
            //     var y = b.y - baseY;
            //     if (y >= 0)
            //     {
            //         matrix[y][x] = true;
            //     }
            // });
            // return matrix;
        }

        private bool[][] GetReachableMatrix()
        {
            var roads = GetRoadMatrix();
            return PathSearchUtil.GetReachableMatrix(roads);
        }

        private List<Tuple<int, int>> ExpandCoordinates(MineBrick[][] matrix, int x, int y, int distance)
        {
            if (distance <= 0 || x < 0 || y < 0 || x >= matrix.Length || y >= matrix[0].Length)
            {
                // 边界条件：距离小于等于0或坐标超出数组范围时返回空列表
                return new List<Tuple<int, int>>();
            }
            else
            {
                var currentCoordinate = Tuple.Create(x, y);
                var surroundingCoordinates = new List<Tuple<int, int>>
                {
                    Tuple.Create(x - 1, y), // 左侧
                    Tuple.Create(x + 1, y), // 右侧
                    Tuple.Create(x, y - 1), // 上方
                    Tuple.Create(x, y + 1)  // 下方
                };

                var validCoordinates = surroundingCoordinates.Where(coordinate =>
                    coordinate.Item1 >= 0 && coordinate.Item2 >= 0 && coordinate.Item1 < matrix.Length && coordinate.Item2 < matrix[0].Length)
                    .ToList();

                var result = new List<Tuple<int, int>>
                {
                    currentCoordinate
                };
                foreach (var coordinate in validCoordinates)
                {
                    result.AddRange(ExpandCoordinates(matrix, coordinate.Item1, coordinate.Item2, distance - 1));
                }

                return result;
            }
        }

        [Handle("mine/usePro")]
        public List<MineAction> UsePro(int propType, int x, int y)
        {
            var reachMatrix = GetRoadMatrix();
            GameAssert.Expect(reachMatrix[y][x], 13005);
            var brickMatrix = GetBrickMatrix();
            GameAssert.Expect(brickMatrix[y][x] == null, 13005);
            var baseY = Data.currentFloor - 5;
            // var pos = new int[] { x, y - baseY };
            // var goToPos = PathSearchUtil.GetGoToPos(reachMatrix, pos);
            // var minerPos = new int[] { goToPos![0], goToPos[1] + baseY }.ToImmutableArray();
            // Data = Data with { minerPos = minerPos };
            Ctx.Emit(CachePath.mineData);
            var res = new List<MineAction>();
            switch (propType)
            {
                case 1:
                    {
                        Ctx.KnapsackManager.SubItem(new Item(GameConstant.MineDrillId, 1));
                        var bricks = brickMatrix.Select(row => row[x]).ToList();
                        var pre = x - 1 >= 0 ? brickMatrix.Last()[x - 1] : null;
                        var next = x + 1 < brickMatrix[0].Length ? brickMatrix.Last()[x + 1] : null;
                        var brickSeq = bricks.Concat(new List<MineBrick> { pre, next }).Where(b => b != null).ToList();
                        var baseActions = new List<MineAction> {
                            // new MineActionMinerMove(minerPos[0], minerPos[1]).ToAction(),
                            new MineActionDelay(50).ToAction() };
                        for (int i = 0; i < brickSeq.Count; i++)
                        {
                            if (brickSeq[i].mapType == MineMapType.MAP_BOMB)
                            {
                                res.AddRange(HitStar(new int[] { brickSeq[i].x, brickSeq[i].y - baseY }, brickMatrix));
                                return res;
                            }
                            else
                            {
                                Data = Data with { currentMap = Data.currentMap.Remove(brickSeq[i].uniqueId) };
                                Ctx.Emit(CachePath.mineBrick, brickSeq[i].uniqueId);
                                baseActions.Add(new MineActionBrickDamage(brickSeq[i].uniqueId, 0).ToAction());
                                baseActions.AddRange(BrickReward(brickSeq[i].rewardId));
                            }
                        };
                        res.AddRange(baseActions);
                        break;
                    }
                case 2:
                    {
                        Ctx.KnapsackManager.SubItem(new Item(GameConstant.MineBombId, 1));
                        var expandedCoordinates = ExpandCoordinates(brickMatrix, x, y, 3);
                        var bricks = expandedCoordinates.Select(coord => brickMatrix[coord.Item2][coord.Item1])
                            .Where(b => b != null).Distinct().ToList();
                        var baseActions = new List<MineAction> {
                            // new MineActionMinerMove(minerPos[0], minerPos[1]).ToAction(),
                            new MineActionDelay(50).ToAction() };
                        for (int i = 0; i < bricks.Count; i++)
                        {
                            if (bricks[i].mapType == MineMapType.MAP_BOMB)
                            {
                                res.AddRange(HitStar(new int[] { bricks[i].x, bricks[i].y - baseY }, brickMatrix));
                                return res;
                            }
                            else
                            {
                                Data = Data with { currentMap = Data.currentMap.Remove(bricks[i].uniqueId) };
                                Ctx.Emit(CachePath.mineBrick, bricks[i].uniqueId);
                                baseActions.Add(new MineActionBrickDamage(bricks[i].uniqueId, 0).ToAction());
                                baseActions.AddRange(BrickReward(bricks[i].rewardId));
                            }
                        }
                        res.AddRange(baseActions);
                        break;
                    }
                default:
                    break;
            }
            res.AddRange(CheckNextFloor());
            Ctx.MissionManager.UpdateMissionProgress(25, 1);
            return res;
        }
        private List<MineAction> HitStar(int[] pos2, MineBrick[][] brickMatrix)
        {
            var hasBreak = new HashSet<int>();
            var baseAction = new List<MineAction>();
            for (var c = 1; c <= 6; c++)
            {
                // baseAction.Add(new MineActionDelay(50).ToAction());
                for (var y = pos2[1] - c; y <= pos2[1] + c; y++)
                {
                    for (var x = pos2[0] - c; x <= pos2[0] + c; x++)
                    {
                        if (x >= 0 && x < 6 && y >= 0 && y < 6)
                        {
                            var b = brickMatrix[x][y];
                            // if (b != null && b.mapType != MineMapType.UNBREAKABLE_BRICK)
                            if (b != null)
                            {
                                Ctx.Emit(CachePath.mineBrick, b.uniqueId);
                                if (!hasBreak.Contains(b.uniqueId))
                                {
                                    hasBreak.Add(b.uniqueId);
                                    if (b.mapType == MineMapType.BRICK_3 || b.mapType == MineMapType.BRICK_1)
                                    {
                                        Data = Data with { currentMap = Data.currentMap.Remove(b.uniqueId) };
                                        baseAction.Add(new MineActionBrickDamage(b.uniqueId, 0).ToAction());
                                        baseAction.AddRange(BrickReward(b.rewardId));
                                    }
                                    else
                                    {
                                        Data = Data with { currentMap = Data.currentMap.Remove(b.uniqueId) };
                                        baseAction.Add(new MineActionBrickDamage(b.uniqueId, 0).ToAction());
                                    }
                                }
                            }
                        }
                    }
                }
            }
            baseAction.AddRange(CheckNextFloor());
            var count = 0;
            var minerMove = new List<MineAction>();
            for (var i = 0; i < 2; i++)
            {
                count += 1;
                NextRow();
                var res = CheckMinerPos();
                minerMove.AddRange(res);
            }
            baseAction.Add(new MineActionFloorChange(count).ToAction());
            baseAction.AddRange(minerMove);
            return baseAction;
        }
        [Handle("mine/hitBrick")]
        public List<MineAction> HitBrick(int uniqueId, bool quick)
        {
            GameAssert.Must(Data.currentMap.ContainsKey(uniqueId), "hit a brick not exist");
            var brick = Data.currentMap[uniqueId];
            var reachMatrix = GetReachableMatrix();
            var baseY = Data.currentFloor - 5;
            var pos = new int[] { brick.x, brick.y - baseY };
            GameAssert.Expect(reachMatrix[pos[1]][pos[0]], 13005);
            var road = GetRoadMatrix();
            var goToPos = PathSearchUtil.GetGoToPos(road, pos);
            GameAssert.Expect(goToPos != null, 13005);
            var minerPos = new int[] { goToPos![0], goToPos[1] + baseY }.ToImmutableArray();
            Data = Data with { minerPos = minerPos };
            var direction = goToPos[0] >= pos[0] ? "right" : "left";
            Ctx.Emit(CachePath.mineData);
            var res = new List<MineAction>();
            switch (brick.mapType)
            {
                // case MineMapType.BATTLE:
                //     {
                //         var powerCost = Ctx.Table.MineBattleMapTblMap[brick.rewardId].PowerCost;
                //         GameAssert.Expect(Data.currentPower >= powerCost, 13001);
                //         Data = Data with
                //         {
                //             currentPower = Data.currentPower - powerCost,
                //             currentMap = Data.currentMap.Remove(uniqueId)
                //         };
                //         Ctx.Emit(CachePath.mineBrick, uniqueId);
                //         res.Add(new MineActionBrickDamage(uniqueId, 0).ToAction());
                //         res.AddRange(MineBattleReward(brick.rewardId));
                //         res.AddRange(CheckNextFloor());
                //         break;
                //     }
                // case MineMapType.UNBREAKABLE_BRICK:
                //     {
                //         GameAssert.Raise(13004);
                //         break;
                //     }
                case MineMapType.MAP_BOMB:
                    {
                        var powerCost = 1;
                        GameAssert.Expect(Data.currentPower >= powerCost, 13001);
                        Data = Data with
                        {
                            currentPower = Data.currentPower - powerCost,
                            currentMap = Data.currentMap.Remove(uniqueId)
                        };
                        var brickMatrix = GetBrickMatrix();
                        var baseY2 = Data.currentFloor - 5;
                        var pos2 = new int[] { brick.x, brick.y - baseY2 };
                        Ctx.Emit(CachePath.mineBrick, uniqueId);
                        var baseAction = new List<MineAction>
                        {
                            new MineActionMinerChangeDirection(direction).ToAction(),
                            new MineActionMinerMove(minerPos[0], minerPos[1]).ToAction(),
                            new MineActionMinerHitBrick(uniqueId).ToAction(),
                            new MineActionBrickDamage(uniqueId, brick.life - powerCost).ToAction(),
                        };
                        res.AddRange(baseAction);
                        res.AddRange(HitStar(pos2, brickMatrix));
                        break;
                    }
                default:
                    {
                        Ctx.Emit(CachePath.mineBrick, uniqueId);
                        var powerCost = quick ? brick.life : 1;
                        GameAssert.Expect(Data.currentPower >= powerCost, 13001);
                        var baseAction = new List<MineAction>
                        {
                            new MineActionMinerChangeDirection(direction).ToAction(),
                            new MineActionMinerMove(minerPos[0], minerPos[1]).ToAction(),
                            new MineActionMinerHitBrick(uniqueId).ToAction(),
                            new MineActionBrickDamage(uniqueId, brick.life - powerCost).ToAction(),
                        };
                        if (brick.life - powerCost <= 0)
                        {
                            Data = Data with
                            {
                                currentPower = Data.currentPower - powerCost,
                                currentMap = Data.currentMap.Remove(uniqueId)
                            };
                            res.AddRange(baseAction);
                            res.AddRange(BrickReward(brick.rewardId));
                            res.AddRange(CheckNextFloor());
                        }
                        else
                        {
                            Data = Data with
                            {
                                currentPower = Data.currentPower - powerCost,
                                currentMap = Data.currentMap.SetItem(uniqueId, brick with { life = brick.life - powerCost })
                            };
                            res.AddRange(baseAction);
                            res.AddRange(CheckNextFloor());
                        }
                        break;
                    }
            }
            Ctx.MissionManager.UpdateMissionProgress(25, 1);
            return res;
        }

        private List<MineAction> MineBattleReward(int id)
        {
            var tbl = Ctx.Table.MineBattleMapTblMap[id];
            var reward = Item.FromItemArray(tbl.Reward);
            var finalReward = Ctx.KnapsackManager.AddItem(reward);
            return new List<MineAction> { new MineActionShowBrickReward(id, finalReward.ToImmutableArray()).ToAction() };
        }
        private long videoDiamondCount = 0;
        private List<MineAction> BrickReward(int id)
        {
            var tbl = Ctx.Table.MineRewardTblMap[id];
            var res = new List<MineAction>();
            switch (tbl.RewardType)
            {
                case MineMapRewardType.NO:
                    break;
                case MineMapRewardType.ITEM:
                    {
                        Item item;
                        if (id == 2010 || id == 2011 || id == 2012)
                        {
                            var count = RandomUtils.RandomInt(tbl.Count[0], tbl.Count[1]);
                            var buff = Ctx.Config.Mine.LevelBuff[Data.currentFloor / 500] * 0.0001;
                            item = new Item(tbl.RewardId, (long)Math.Round(count * buff));
                        }
                        else
                        {
                            item = new Item(tbl.RewardId, RandomUtils.RandomInt(tbl.Count[0], tbl.Count[1]));
                        }
                        var finalReward = Ctx.KnapsackManager.AddItem(item);
                        res.Add(new MineActionShowBrickReward(id, finalReward.ToImmutableArray()).ToAction());
                        break;
                    }
                case MineMapRewardType.POWER:
                    {
                        var count = RandomUtils.RandomInt(tbl.Count[0], tbl.Count[1]);
                        AddPower(count, video: false);
                        res.Add(new MineActionShowBrickReward(id, new List<Item> { new Item(GameConstant.MinePowerId, count) }.ToImmutableArray()).ToAction());
                        break;
                    }
                case MineMapRewardType.AD_CHEST:
                    {
                        var count = RandomUtils.RandomInt(tbl.Count[0], tbl.Count[1]);
                        videoDiamondCount = count;
                        res.Add(new MineActionShowDiamondWindow(count).ToAction());
                        break;
                    }
            }
            return res;
        }

        private List<MineAction> CheckNextFloor()
        {
            var count = 0;
            var originPos = Data.minerPos;
            var minerMove = new List<MineAction>();
            while (!Data.boss && GetRoadMatrix().Last().Contains(true))
            {
                count += 1;
                NextRow();
                var res = CheckMinerPos();
                minerMove.AddRange(res);
            }
            var floorChange = new List<MineAction>();
            if (count > 0)
            {
                floorChange = new List<MineAction> { new MineActionFloorChange(count).ToAction() };
            }
            else
            {
                floorChange = new List<MineAction>();
            }
            floorChange.AddRange(minerMove);
            return floorChange;
        }

        private List<MineAction> CheckMinerPos()
        {
            var baseY = Data.currentFloor - 5;
            var playerMatrixPos = new int[] { Data.minerPos[0], Data.minerPos[1] - baseY };
            if (playerMatrixPos[1] < 0)
            {
                var road = GetBrickMatrix();
                for (var i = 0; i < 6; i++)
                {
                    if (road[0][i] == null)
                    {
                        Data = Data with { minerPos = new int[] { i, baseY }.ToImmutableArray() };
                        return new List<MineAction> { new MineActionMinerMove(i, baseY).ToAction() };
                    }
                }
            }
            return new List<MineAction>();
        }

        [Handle("mine/videoDiamond")]
        public ImmutableArray<Item> VideoDiamond()
        {
            GameAssert.Expect(videoDiamondCount > 0, 13006);
            var reward = Ctx.KnapsackManager.AddItem(new Item(GameConstant.DiamondId, videoDiamondCount));
            videoDiamondCount = 0;
            return reward;
        }

        [Handle("mine/challengeBoss")]
        public void ChallengeBoss()
        {
            GameAssert.Must(Data.boss, "boss not exist");
            Data = Data with { boss = false };
            var tbl = Ctx.Table.MineBattleMapTblList.FirstOrDefault(t => t.Boss == Data.currentFloor);
            Ctx.KnapsackManager.AddItem(Item.FromItemArray(tbl!.Reward));
            Ctx.Emit(CachePath.mineData);
        }

        [PartialUpdate("mineBrick")]
        public ImmutableDictionary<int, MineBrick> getAllMineBrick()
        {
            return Data.currentMap;
        }

        [Update("mineData")]
        public Dictionary<string, object> GetMineData()
        {
            return new Dictionary<string, object> {
                { "floor", Data.currentFloor },
                { "power", Data.currentPower },
                { "boss", Data.boss },
                { "minerPos", Data.minerPos },
                { "videoPower", Data.videoRecoverCount },
                { "videoDrill", Data.videoDrillCount },
                { "videoBomb", Data.videoBombCount },
                { "auto", Data.auto },
            };
        }


    }
}