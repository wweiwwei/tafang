using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace GamePlay
{
    public class ImpactManager : AbstractManager<ImpactData>, IBaseManager
    {
        public ImpactManager(JToken saveData, PlayerDataManager ctx) : base(saveData, ctx)
        {
        }

        public override void DailyRefresh()
        {
            CheckResetActivity();
        }

        public override void InitData()
        {
            CheckResetActivity();
        }

        private void CheckResetActivity()
        {
            GameAssert.Must(Ctx.Table.ActivitiesTblMap.ContainsKey(GameConstant.ImpactChallengeId), "impact challenge activity is not exist");
            // GameAssert.Must(Ctx.Table.ActivitiesTblMap.ContainsKey(GameConstant.ImpactEquipId), "impact equipment activity is not exist");
            // GameAssert.Must(Ctx.Table.ActivitiesTblMap.ContainsKey(GameConstant.ImpactRecruitId), "impact recruit activity is not exist");
            // GameAssert.Must(Ctx.Table.ActivitiesTblMap.ContainsKey(GameConstant.ImpactArenaId), "impact arena activity is not exist");
            var configTime = Ctx.PlayerRankingManager.ServerStartTime();
            if (configTime != Data.beginTime)
            {
                var newCMission = Ctx.Table.RankMissionTblList.Where(t => t.Page == 0).ToImmutableDictionary(
                tbl => tbl.Id,
                tbl => new Mission(id: tbl.Id, progress: 0, hasGet: false, stage: tbl.Stage).InitProgress(Ctx)
                );
                var newRMission = Ctx.Table.RankMissionTblList.Where(t => t.Page == 1).ToImmutableDictionary(
                tbl => tbl.Id,
                tbl => new Mission(id: tbl.Id, progress: 0, hasGet: false, stage: tbl.Stage).InitProgress(Ctx)
                );
                var newEMission = Ctx.Table.RankMissionTblList.Where(t => t.Page == 2).ToImmutableDictionary(
                tbl => tbl.Id,
                tbl => new Mission(id: tbl.Id, progress: 0, hasGet: false, stage: tbl.Stage).InitProgress(Ctx)
                );
                var newAMission = Ctx.Table.RankMissionTblList.Where(t => t.Page == 3).ToImmutableDictionary(
                tbl => tbl.Id,
                tbl => new Mission(id: tbl.Id, progress: 0, hasGet: false, stage: tbl.Stage).InitProgress(Ctx)
                );
                Data = Data with
                {
                    beginTime = configTime,
                    hasGetPackage = ImmutableArray<int>.Empty,
                    challengeMission = newCMission,
                    recruitMission = newRMission,
                    equipMission = newEMission,
                    arenaMission = newAMission,
                    challengeRound = 1,
                    recruitRound = 1,
                    equipRound = 1,
                    arenaRound = 1,
                    heroTotal = 0,
                    equipTotal = 0,
                    arenaTotal = 0,
                };
                Ctx.Emit(CachePath.impactData);
            }
        }

        [PartialUpdate("challengeMission")]
        public ImmutableDictionary<int, Mission> InitChallengeMission()
        {
            return Data.challengeMission;
        }
        // [PartialUpdate("recruitMission")]
        // public ImmutableDictionary<int, Mission> InitRecruitMission()
        // {
        //     return Data.recruitMission;
        // }
        // [PartialUpdate("equipMission")]
        // public ImmutableDictionary<int, Mission> InitEquipMission()
        // {
        //     return Data.equipMission;
        // }
        // [PartialUpdate("arenaMission")]
        // public ImmutableDictionary<int, Mission> InitArenaMission()
        // {
        //     return Data.arenaMission;
        // }

        [Update("impactData")]
        public Dictionary<string, object> InitImpactData()
        {
            return new Dictionary<string, object>{
                {"beginTime",Data.beginTime},
                {"hasGetPackage",Data.hasGetPackage},
                {"challengeRound",Data.challengeRound},
                {"recruitRound",Data.recruitRound},
                {"equipRound",Data.equipRound},
                {"arenaRound",Data.arenaRound},
                {"heroTotal",Data.heroTotal},
                {"equipTotal",Data.equipTotal},
                {"arenaTotal",Data.arenaTotal},
            };
        }

        /**增加抽卡数*/
        // public void AddTotal(int CardPool, int count)
        // {
        //     var tbl = Ctx.Table.ActivitiesTblMap[CardPool == 1 ? GameConstant.ImpactRecruitId : GameConstant.ImpactEquipId];
        //     var beginTime = Data.beginTime + tbl.Delay * DateUtils.OneDay;
        //     if (Ctx.FacilityManager.GetCaptain().rank < Ctx.Config.ImpactRank.Condition || Ctx.Now() > beginTime + tbl.LastDay * DateUtils.OneDay || Ctx.Now() < beginTime) return;
        //     Data = Data with
        //     {
        //         heroTotal = CardPool == 1 ? Data.heroTotal + count : Data.heroTotal,
        //         equipTotal = CardPool == 2 ? Data.equipTotal + count : Data.equipTotal
        //     };
        //     Ctx.Emit(CachePath.impactData);
        //     Ctx.PlayerRankingManager.Report(CardPool == 1 ? 29 : 30);
        //     Ctx.MissionManager.UpdateMissionProgress(CardPool == 1 ? 29 : 30, 0);
        // }

        /**增加竞技场积分*/
        // public void AddArena(int count)
        // {
        //     var tbl = Ctx.Table.ActivitiesTblMap[GameConstant.ImpactArenaId];
        //     var beginTime = Data.beginTime + tbl.Delay * DateUtils.OneDay;
        //     if (Ctx.FacilityManager.GetCaptain().rank < Ctx.Config.ImpactRank.Condition || Ctx.Now() > beginTime + tbl.LastDay * DateUtils.OneDay || Ctx.Now() < beginTime) return;
        //     Data = Data with { arenaTotal = Data.arenaTotal + count };
        //     Ctx.Emit(CachePath.impactData);
        //     Ctx.MissionManager.UpdateMissionProgress(31, count);
        // }

        [Handle("impact/obtainMissionReward")]
        public ImmutableArray<Item> ObtainMissionReward(int id)
        {
            var challenge = Data.challengeMission.ContainsKey(id);
            var recruit = Data.recruitMission.ContainsKey(id);
            var equip = Data.equipMission.ContainsKey(id);
            var arena = Data.arenaMission.ContainsKey(id);
            GameAssert.Must(challenge || recruit || equip || arena, $"can not find mission id:{id}");
            Mission mission;
            if (challenge) mission = Data.challengeMission[id];
            else if (recruit) mission = Data.recruitMission[id];
            else if (equip) mission = Data.equipMission[id];
            else mission = Data.arenaMission[id];
            var (reward, m) = mission.Obtain(Ctx);
            var finalReward = Ctx.KnapsackManager.AddItem(reward);
            if (challenge)
            {
                Data = Data with { challengeMission = Data.challengeMission.SetItem(id, m) };
                Ctx.Emit(CachePath.challengeMission, id);
            }
            // else if (recruit)
            // {
            //     Data = Data with { recruitMission = Data.recruitMission.SetItem(id, m) };
            //     Ctx.Emit(CachePath.recruitMission, id);
            // }
            // else if (equip)
            // {
            //     Data = Data with { equipMission = Data.equipMission.SetItem(id, m) };
            //     Ctx.Emit(CachePath.equipMission, id);
            // }
            // else
            // {
            //     Data = Data with { arenaMission = Data.arenaMission.SetItem(id, m) };
            //     Ctx.Emit(CachePath.arenaMission, id);
            // }
            CheckRound();
            return finalReward;
        }
        public void CheckRound()
        {
            if (Data.challengeMission.Values.Where(m => Ctx.Table.RankMissionTblMap[m.id].Round == Data.challengeRound).All(m => m.hasGet) && Ctx.Table.RankMissionTblList.Where(t => t.Page == 0).MaxBy(t => t.Round)?.Round > Data.challengeRound)
                Data = Data with { challengeRound = Data.challengeRound + 1 };
            if (Data.recruitMission.Values.Where(m => Ctx.Table.RankMissionTblMap[m.id].Round == Data.recruitRound).All(m => m.hasGet) && Ctx.Table.RankMissionTblList.Where(t => t.Page == 1).MaxBy(t => t.Round)?.Round > Data.recruitRound)
                Data = Data with { recruitRound = Data.recruitRound + 1 };
            if (Data.equipMission.Values.Where(m => Ctx.Table.RankMissionTblMap[m.id].Round == Data.equipRound).All(m => m.hasGet) && Ctx.Table.RankMissionTblList.Where(t => t.Page == 2).MaxBy(t => t.Round)?.Round > Data.equipRound)
                Data = Data with { equipRound = Data.equipRound + 1 };
            if (Data.arenaMission.Values.Where(m => Ctx.Table.RankMissionTblMap[m.id].Round == Data.arenaRound).All(m => m.hasGet) && Ctx.Table.RankMissionTblList.Where(t => t.Page == 3).MaxBy(t => t.Round)?.Round > Data.arenaRound)
                Data = Data with { arenaRound = Data.arenaRound + 1 };
            Ctx.Emit(CachePath.impactData);
        }
        public void UpdateImpactMissionProgress(int kind, long count, int[] param)
        {
            int id;
            switch (kind)
            {
                case 4:
                    id = GameConstant.ImpactChallengeId;
                    break;
                // case 29:
                //     id = GameConstant.ImpactRecruitId;
                //     break;
                // case 30:
                //     id = GameConstant.ImpactEquipId;
                //     break;
                // case 31:
                //     id = GameConstant.ImpactArenaId;
                //     break;
                default:
                    return;
            }
            var tbl = Ctx.Table.ActivitiesTblMap[id];
            if (Ctx.PlayerManager.Level() < Ctx.Config.ImpactRank.Condition || Ctx.Now() > Data.beginTime + tbl.Delay * DateUtils.OneDay + tbl.LastDay * DateUtils.OneDay || Ctx.Now() < Data.beginTime + tbl.Delay * DateUtils.OneDay) return;
            var newChallenge = Data.challengeMission.ToImmutableDictionary(e => e.Key, e =>
            {
                return e.Value.UpdateMissionProgress(kind, count, param, Ctx);
            });
            var newRecruit = Data.recruitMission.ToImmutableDictionary(e => e.Key, e =>
            {
                return e.Value.UpdateMissionProgress(kind, count, param, Ctx);
            });
            var newEquip = Data.equipMission.ToImmutableDictionary(e => e.Key, e =>
            {
                return e.Value.UpdateMissionProgress(kind, count, param, Ctx);
            });
            var newArena = Data.arenaMission.ToImmutableDictionary(e => e.Key, e =>
            {
                return e.Value.UpdateMissionProgress(kind, count, param, Ctx);
            });
            var originChallenge = Data.challengeMission;
            var originRecruit = Data.recruitMission;
            var originEquip = Data.equipMission;
            var originArena = Data.arenaMission;
            Data = Data with { challengeMission = newChallenge, recruitMission = newRecruit, equipMission = newEquip, arenaMission = newArena };
            var diff1 = newChallenge.Where(e => e.Value != originChallenge[e.Key]).Select(e => e.Key);
            var diff2 = newRecruit.Where(e => e.Value != originRecruit[e.Key]).Select(e => e.Key);
            var diff3 = newEquip.Where(e => e.Value != originEquip[e.Key]).Select(e => e.Key);
            var diff4 = newArena.Where(e => e.Value != originArena[e.Key]).Select(e => e.Key);
            Ctx.EmitMany(CachePath.challengeMission, diff1);
            // Ctx.EmitMany(CachePath.recruitMission, diff2);
            // Ctx.EmitMany(CachePath.equipMission, diff3);
            // Ctx.EmitMany(CachePath.arenaMission, diff4);
        }

        public ImmutableArray<Item> BuyImpactPack(DBPlayerOrder order)
        {
            GameAssert.Expect(Ctx.Table.RankPackTblMap[order.itemId].Limit == -1 || Ctx.Table.RankPackTblMap[order.itemId].Limit > Data.hasGetPackage.Count(id => id == order.itemId), 17002);
            var reward = Ctx.KnapsackManager.AddItem(Item.FromItemArray(Ctx.Table.RankPackTblMap[order.itemId].Reward));
            Data = Data with { hasGetPackage = Data.hasGetPackage.Add(order.itemId) };
            Ctx.Emit(CachePath.impactData);
            return reward;
        }

        public int heroTotal => Data.heroTotal;
        public int equipTotal => Data.equipTotal;
        public long arenaTotal => Data.arenaTotal;
    }
}