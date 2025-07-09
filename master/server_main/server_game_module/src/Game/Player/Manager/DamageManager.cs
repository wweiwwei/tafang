using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace GamePlay
{
    public class DamageManager : AbstractManager<DamageData>, IBaseManager
    {
        public DamageManager(JToken saveData, PlayerDataManager ctx) : base(saveData, ctx)
        {
        }

        public override void DailyRefresh()
        {

        }

        public override void InitData()
        {

        }

        public long damage => Data.myDamage;
        public long mulDamage => Data.myMulDamage;

        [Handle("damageChallenge/getReward")]
        public ImmutableArray<Item> GetReward(int[] ids)
        {
            var finalReward = ImmutableArray<Item>.Empty;
            ids.ForEach(id =>
            {
                if (!Data.hasGetReward.Contains(id))
                {
                    GameAssert.Must(Ctx.Table.DamageChallengeTblMap.ContainsKey(id), $"id:{id} is not exist");
                    var tbl = Ctx.Table.DamageChallengeTblMap[id];
                    GameAssert.Expect((tbl.Kind == 1 ? Data.myDamage : Data.myMulDamage) >= tbl.Damage, 80002);
                    Data = Data with { hasGetReward = Data.hasGetReward.Add(id) };
                    finalReward = finalReward.AddRange(Ctx.KnapsackManager.AddItem(Item.FromItemArray(tbl.Reward)));
                }
            });
            Ctx.Emit(CachePath.damageData);
            return finalReward;
        }

        [Handle("damageChallenge/report")]
        public void Report(long count, int kind)
        {
            GameAssert.Must(kind == 1 || kind == 2, $"kind:{kind} is not valid");
            var day = DateUtils.GetDayOfWeek(Ctx.Now());
            var k = day == 7 ? 0 : -1;
            if (day != 7)
            {
                Ctx.Config.DamageChallenge.DayOfWeek.ForEach((list, index) =>
                {
                    if (list.Contains(day))
                    {
                        k = index + 1;
                    }
                });
                GameAssert.Expect(kind == k, 80001);
            }
            if (kind == 1)
            {
                Data = Data with { myDamage = count };
                Ctx.MissionManager.UpdateMissionProgress(40, 1);
            }
            else if (kind == 2)
            {
                Data = Data with { myMulDamage = count };
                Ctx.MissionManager.UpdateMissionProgress(41, 1);
            }
            Ctx.Emit(CachePath.damageData);
            Ctx.PlayerRankingManager.ReportDamage(kind == 1 ? 5 : 6);
        }

        [Update("damageData")]
        public Dictionary<string, object> InitDamageData()
        {
            return new Dictionary<string, object>{
                {"hasGetReward",Data.hasGetReward},
                {"myDamage",Data.myDamage},
                {"myMulDamage",Data.myMulDamage}
            };
        }
    }
}