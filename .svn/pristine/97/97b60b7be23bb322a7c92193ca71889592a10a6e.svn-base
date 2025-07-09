using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace GamePlay
{
    public class MissionManager : AbstractManager<MissionData>, IBaseManager
    {
        public MissionManager(JToken saveData, PlayerDataManager ctx) : base(saveData, ctx)
        {

        }

        public override void DailyRefresh()
        {

        }

        public override void InitData()
        {
            if (Data.taskId == 0)
            {
                var taskTbl = Ctx.Table.MainMissionTaskTblList.First();
                var taskId = taskTbl.Id;
                var taskHasGet = false;
                var mainMission = Ctx.Table.MainMissionTblList.Where(tbl => tbl.Unlock[0] == -1).ToImmutableDictionary(
                    tbl => tbl.Id,
                    tbl => new Mission(id: tbl.Id, progress: 0, hasGet: false, stage: 1).InitProgress(Ctx)
                );
                Data = Data with { taskId = taskId, taskHasGet = taskHasGet, mainMission = mainMission };
            }
        }

        public void UpdateMissionProgress(int kind, long count, int[] param)
        {
            Ctx.PlayerManager.UpdatePlayerMissionProgress(kind, count, param);
            Ctx.WarOrderManager.UpdateWarOrderProgress(kind, count, param);
            var newMap = Data.mainMission.ToImmutableDictionary(e => e.Key, e => e.Value.UpdateMissionProgress(kind, count, param, Ctx));
            var originMap = Data.mainMission;
            Data = Data with { mainMission = newMap };
            var diff = newMap.Where(e => e.Value != originMap[e.Key]).Select(e => e.Key);
            Ctx.EmitMany(CachePath.mainMission, diff);
        }

        public void UpdateMissionProgress(int kind, long count)
        {
            UpdateMissionProgress(kind, count, Array.Empty<int>());
        }

        [Update("mainMissionTask")]
        public Dictionary<string, object> TaskState()
        {
            return new Dictionary<string, object>()
            {
                ["id"] = Data.taskId,
                ["progress"] = TaskProgress(),
                ["hasGet"] = Data.taskHasGet,
            };
        }

        private int TaskProgress()
        {
            return Data.mainMission.Select(e =>
            {
                var hasGet = e.Value.hasGet ? 1 : 0;
                return e.Value.stage - 1 + hasGet;
            }).Sum();
        }

        [PartialUpdate("mainMission")]
        public ImmutableDictionary<int, Mission> AllMission()
        {
            return Data.mainMission;
        }

        [Handle("mission/obtainMissionReward")]
        public IEnumerable<Item> ObtainMissionReward(int id)
        {
            var mission = Data.mainMission[id];
            var (reward, m) = mission.Obtain(Ctx);
            var finalReward = Ctx.KnapsackManager.AddItem(reward);
            Data = Data with { mainMission = Data.mainMission.SetItem(id, m) };
            Ctx.Emit(CachePath.mainMission, id);
            CheckNewMission();
            Ctx.Emit(CachePath.mainMissionTask);
            return finalReward;
        }

        [Handle("mission/obtainTaskReward")]
        public IEnumerable<Item> ObtainTaskReward()
        {
            GameAssert.Expect(!Data.taskHasGet, 8002);
            var taskTbl = Ctx.Table.MainMissionTaskTblMap[Data.taskId];
            GameAssert.Expect(TaskProgress() >= taskTbl.Require, 8003);
            var reward = Item.FromItemArray(taskTbl.Reward);
            var finalReward = Ctx.KnapsackManager.AddItem(reward);
            Data = Data with { taskHasGet = true };
            Ctx.Emit(CachePath.mainMissionTask);
            CheckNextTask();
            CheckNewMission();
            return finalReward;
        }

        public bool CheckNextTask()
        {
            if (Data.taskHasGet)
            {
                var index = Ctx.Table.MainMissionTaskTblList.IndexWhere(e => e.Id == Data.taskId);
                if (index < Ctx.Table.MainMissionTaskTblList.Count() - 1)
                {
                    var tbl = Ctx.Table.MainMissionTaskTblList[index + 1];
                    var taskId = tbl.Id;
                    var taskHasGet = false;
                    Data = Data with { taskId = taskId, taskHasGet = taskHasGet };
                    return true;
                }
            }
            return false;
        }

        public bool MissionComplete(int id, int stage)
        {
            if (!Data.mainMission.ContainsKey(id)) return false;
            var m = Data.mainMission[id];
            return m.stage > stage || (m.stage == stage && m.hasGet);
        }

        public bool TaskComplete(int id)
        {
            return Data.taskId > id || (Data.taskId == id && Data.taskHasGet);
        }

        public bool CheckNewMission()
        {
            var hasUnlock = Data.mainMission.Keys;
            var notUnlock = Ctx.Table.MainMissionTblMap.Keys.Except(hasUnlock);
            var canUnlock = notUnlock.Where(id =>
            {
                var tbl = Ctx.Table.MainMissionTblMap[id];
                switch (tbl.Unlock[0])
                {
                    case -1: return true;
                    case 1: return MissionComplete(tbl.Unlock[1], tbl.Unlock[2]);
                    case 2: return TaskComplete(tbl.Unlock[1]);
                    case 3: return Ctx.PlayerManager.Level() >= tbl.Unlock[1];
                    case 4: return Ctx.StageManager.AllStage().ContainsKey(tbl.Unlock[1]);
                    default: return false;
                }
            });
            if (canUnlock.Any())
            {
                var newMission = canUnlock.ToDictionary(id => id, id => new Mission(id, 0, false, 1).InitProgress(Ctx));
                Data = Data with { mainMission = Data.mainMission.SetItems(newMission) };
                Ctx.EmitMany(CachePath.mainMission, newMission.Keys);
                return true;
            }
            else
            {
                return false;
            }
        }

        public void GmAllMission()
        {
            var hasUnlock = Data.mainMission.Keys;
            var notUnlock = Ctx.Table.MainMissionTblMap.Keys.Except(hasUnlock);
            if (notUnlock.Any())
            {
                var newMission = notUnlock.ToDictionary(id => id, id => new Mission(id, 0, false, 1).InitProgress(Ctx));
                Data = Data with { mainMission = Data.mainMission.SetItems(newMission) };
                Ctx.EmitMany(CachePath.mainMission, newMission.Keys);
            }
        }


    }
}