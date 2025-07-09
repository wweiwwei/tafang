using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace GamePlay
{
    public class EnemyManager : AbstractManager<EnemyData>, IBaseManager
    {
        public EnemyManager(JToken saveData, PlayerDataManager ctx) : base(saveData, ctx)
        {
        }

        public override void DailyRefresh()
        {
            Data = Data with { hasWin = ImmutableArray<int>.Empty, refreshToday = 0, needRefresh = true, todayBuy = 0 };
            Ctx.Emit(CachePath.enemyData);
        }

        public override void InitData()
        {

        }

        /** ast环境 */
        private Dictionary<string, double> Env()
        {
            var m = new Dictionary<string, double>
            {
                { "lv", Ctx.PlayerManager.Level() }
            };
            return m;
        }

        [Handle("enemy/teamByRank")]
        public async Task<string> TeamByRank(int rank)
        {
            GameAssert.Must(Data.team.Any(t => t.rank == rank), "team rank not in list");
            var team = Data.team.First(t => t.rank == rank);
            if (team.uid == -1) return Data.mirror;
            return await Ctx.Remote.EnemyTeamFromUid(team.uid);
        }

        [Handle("enemy/challenge")]
        public ImmutableArray<Item> Challenge(int rank)
        {
            GameAssert.Expect(!Data.hasWin.Contains(rank), 12001);
            GameAssert.Expect(Data.hasChallengeToday < Ctx.Config.Enemy.ChallengeLimit, 12002);
            GameAssert.Must(Data.team.Any(t => t.rank == rank), "team uid not in list");
            var team = Data.team.First(t => t.rank == rank);
            Data = Data with { hasWin = Data.hasWin.Add(rank), hasChallengeToday = Data.hasChallengeToday + 1 };
            var tbl = Ctx.Table.EnemyBattleTblList.First(t => t.Rank == rank);
            var reward = new List<Item>();
            tbl.Reward.ForEach(re =>
            {
                reward.Add(new Item(int.Parse(re[0]), (long)Math.Round(AstUtil.Eval(re[1], Env()))));
            });
            var finalReward = Ctx.KnapsackManager.AddItem(reward);
            Ctx.Emit(CachePath.enemyData);
            return finalReward;
        }

        [Handle("enemy/refreshEnemy")]
        public async Task RefreshEnemy()
        {
            GameAssert.Expect(Data.refreshToday < 100, 12003);
            Data = Data with
            {
                refreshToday = Data.refreshToday + 1,
            };
            await NewEnemyTeam();
            Ctx.Emit(CachePath.enemyData);
        }


        public async Task NewEnemyTeam()
        {
            var selfMirror = await Ctx.Remote.SelfMirror();
            var responseData = JsonUtils.Parse<Dictionary<string, object>>(selfMirror);
            var bp = (long)responseData["bp"]; ;
            var list = await Ctx.Remote.GetEnemyGrain().EnemyList(bp);
            Data = Data with
            {
                mirror = selfMirror,
                hasWin = ImmutableArray<int>.Empty,
                needRefresh = false,
                team = list.Select((d, i) => new EnemyInfo(
                    uid: d.Id,
                    rank: i + 1,
                    iconId: RandomUtils.RandomElement(Ctx.Table.HeroTblList).Id,
                    name: "海盗",
                    bp: d.Bp
                )).ToImmutableArray()
            };
        }

        [Handle("enemy/enemyTeam")]
        public async Task<ImmutableArray<EnemyInfo>> EnemyTeam()
        {
            if (Data.needRefresh)
            {
                await NewEnemyTeam();
            }
            return Data.team;
        }

        [Handle("enemy/buyChallenge")]
        public void buyChallenge(int count)
        {
            GameAssert.Expect(Data.todayBuy + count <= Ctx.Config.Enemy.BuyChallengeLimit, 18002);
            Ctx.KnapsackManager.SubItem(new Item(GameConstant.DiamondId, Ctx.Config.Enemy.BuyChallengeCost * count));
            Data = Data with { todayBuy = Data.todayBuy + count };
            Ctx.Emit(CachePath.enemyData);
        }

        [Update("enemyData")]
        public Dictionary<string, object> EnemyData()
        {
            return new Dictionary<string, object> {
                { "hasWin", Data.hasWin },
                { "refreshToday", Data.refreshToday },
                { "hasChallengeToday", Data.hasChallengeToday },
                { "todayBuy", Data.todayBuy },
            };
        }
    }
}