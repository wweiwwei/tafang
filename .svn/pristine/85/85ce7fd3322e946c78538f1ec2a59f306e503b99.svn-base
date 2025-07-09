using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public record Mission(
        /** 任务 */
        int id,
        /** 任务进度 */
        long progress,
        /** 任务是否已获取奖励 */
        bool hasGet,
        /** 任务阶段 */
        int stage
    )
    {
        public BaseMissionTbl Tbl(PlayerDataManager Ctx)
        {
            return Ctx.Index.Mission.MissionTblMap[id];
        }
        public MissionKindTbl KindTbl(PlayerDataManager Ctx)
        {
            var tbl = Tbl(Ctx);
            return Ctx.Table.MissionKindTblMap[tbl.Kind];
        }
        /** 获取任务进度 */
        public static long GetInitProgress(PlayerDataManager Ctx, int Kind, ImmutableArray<int> Param)
        {
            switch (Kind)
            {
                case 1:
                    return Ctx.TechTreeManager.InitTechTree()[Param[0]].level;
                case 2:
                    return Ctx.PlayerEquipmentManager.PlayerEquipmentStorage().Values.Where(e => e.Tbl(Ctx).Quality >= Param[0]).Count();
                case 3:
                    return Ctx.PlayerEquipmentManager.PlayerEquipmentPlace().Values.Sum(e => e.level);
                case 4:
                    {
                        if (!Ctx.StageManager.AllStage().ContainsKey(Param[0]))
                        {
                            return 0;
                        }
                        var s = Ctx.StageManager.AllStage()[Param[0]];
                        var count = s.clear ? s.stageIndex : s.stageIndex - 1;
                        return count;
                    }
                case 18:
                    {
                        var count = Ctx.TowerManager.TowerLevel;
                        return count;
                    }
                case 21:
                    {
                        var count = Ctx.PlayerManager.AccLogin;
                        return count;
                    }
                // case 28:
                //     {
                //         var count = Ctx.MineManager.CurrentFloor;
                //         return count;
                //     }
                // case 31:
                //     {
                //         var count = Ctx.ImpactManager.arenaTotal;
                //         return count;
                //     }
                case 32:
                    {
                        var count = Ctx.PlayerManager.Level();
                        return count;
                    }
                case 33:
                    {
                        var count = Ctx.PlayerManager.Rank();
                        return count;
                    }
                case 36:
                    {
                        var count = Ctx.PlayerEquipmentManager.TowerFormation().Count(x => x >= 0);
                        return count;
                    }
                case 37:
                    {
                        var count = Ctx.StoneManager.Level();
                        return count;
                    }
                case 43:
                    {
                        var count = Ctx.PlayerEquipmentManager.PlayerEquipmentPlace().Count(x => x.Value.level >= Param[0]);
                        return count;
                    }
                default:
                    {
                        return 0;
                    }
            }
        }
        public Mission InitProgress(PlayerDataManager Ctx)
        {
            if (hasGet) return this;
            var tbl = Tbl(Ctx);
            var newProgress = GetInitProgress(Ctx, tbl.Kind, tbl.Param);
            if (progress >= newProgress) return this;
            return this with { progress = newProgress };
        }


        public long Require(PlayerDataManager Ctx)
        {
            var tbl = Tbl(Ctx);
            if (stage == 1)
            {
                return tbl.Require[0];
            }
            else
            {
                return tbl.Require[0] + tbl.Require[1] * (stage - 1);
            }
        }

        public int State(PlayerDataManager Ctx)
        {
            var tbl = Tbl(Ctx);
            if (hasGet)
            {
                return Mission.HasGet;
            }
            else if (progress >= Require(Ctx))
            {
                return Mission.Complete;
            }
            else
            {
                return Mission.NotComplete;
            }
        }

        public (ImmutableArray<Item>, Mission) Obtain(PlayerDataManager Ctx)
        {
            var s = State(Ctx);
            GameAssert.Expect(s != Mission.HasGet, 8002);
            GameAssert.Expect(s != Mission.NotComplete, 8001);
            var tbl = Tbl(Ctx);
            var reward = tbl.Reward;
            var maxStage = tbl.Stage;
            if (stage < maxStage || maxStage == -1)
            {
                return (Item.FromItemArray(reward), this with { stage = stage + 1 });
            }
            else
            {
                return (Item.FromItemArray(reward), this with { hasGet = true });
            }
        }

        public Mission UpdateMissionProgress(int kind, long count, int[] param, PlayerDataManager Ctx)
        {
            var tbl = Tbl(Ctx);
            if (hasGet) return this;
            if (tbl.Kind != kind) return this;
            var kindTbl = KindTbl(Ctx);
            if (kindTbl.Kind == 1)
            {
                return InitProgress(Ctx);
            }
            else if (kindTbl.Kind == 2)
            {
                if (progress >= Require(Ctx)) return this;
                return this with { progress = progress + count };
            }
            else if (kindTbl.Kind == 3)
            {
                if (param[0] != tbl.Param[0]) return this;
                if (progress >= Require(Ctx)) return this;
                return this with { progress = progress + count };
            }
            return this;
        }

        public Mission RefreshProgress(PlayerDataManager Ctx)
        {
            var tbl = Tbl(Ctx);
            if (tbl.Kind == 10)
            {
                return this;
            }
            else
            {
                return InitProgress(Ctx);
            }
        }

        public const int HasGet = 1;
        public const int Complete = 2;
        public const int NotComplete = 3;
    }
}