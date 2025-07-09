using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace GamePlay
{
    public class TowerManager : AbstractManager<TowerData>, IBaseManager
    {
        public TowerManager(JToken saveData, PlayerDataManager Ctx) : base(saveData, Ctx)
        {
        }

        public override void DailyRefresh()
        {

        }

        public override void InitData()
        {

        }

        public override void Tick()
        {
            Refresh();
        }

        private void Refresh()
        {
            if (Data.level == 0) return;
            var now = Ctx.Now();
            if (Data.afkBattleReward.IsNeedSettle(now, Ctx))
            {
                Data = Data with { afkBattleReward = Data.afkBattleReward.BattleProduce(now, Ctx) };
                Ctx.Emit(CachePath.towerAfkReward);
            }
        }

        [Handle("tower/challengeTower")]
        public IEnumerable<Item> ChallengeTower()
        {
            GameAssert.Expect(Ctx.Table.TowerChallengeTblList.Any(e => e.TowerLv == Data.level + 1), 14001);
            Data = Data with
            {
                level = Data.level + 1,
                levelTime = Ctx.Now(),
            };
            if (Data.level == 1)
            {
                var now = Ctx.Now();
                Data = Data with { afkBattleReward = TowerAfkData.Empty(now, Ctx) };
                Ctx.Emit(CachePath.towerAfkReward);
            }
            var reward = Item.FromItemArray(Ctx.Table.TowerChallengeTblList.First(e => e.TowerLv == Data.level).Reward).ToImmutableArray();
            var finalReward = Ctx.KnapsackManager.AddItem(reward);
            Ctx.Emit(CachePath.towerData);
            Ctx.MissionManager.UpdateMissionProgress(18, 1);
            return finalReward;
        }

        [Handle("tower/collectAfkReward")]
        public IEnumerable<Item> CollectAfkReward()
        {
            if (Data.level == 0) return Enumerable.Empty<Item>();
            var reward = Data.afkBattleReward.reward;
            var finalReward = Ctx.KnapsackManager.AddItem(reward);
            var now = Ctx.Now();
            Data = Data with { afkBattleReward = TowerAfkData.Empty(now, Ctx) };
            Ctx.Emit(CachePath.towerAfkReward);
            return finalReward;
        }

        [Handle("tower/obtainLevelReward")]
        public IEnumerable<Item> ObtainLevelReward(int level)
        {
            var tbl = Ctx.Table.TowerLevelRewardTblList.First(e => e.TowerLv == level);
            GameAssert.Expect(Data.level >= level, 14002);
            GameAssert.Expect(!Data.hasGet.Contains(level), 14003);
            var reward = Item.FromItemArray(tbl.Reward);
            var finalReward = Ctx.KnapsackManager.AddItem(reward);
            Data = Data with { hasGet = Data.hasGet.Add(level) };
            Ctx.Emit(CachePath.towerData);
            return finalReward;
        }

        [Update("towerData")]
        public Dictionary<string, object> TowerData()
        {
            return new Dictionary<string, object>()
            {
                ["level"] = Data.level,
                ["hasGet"] = Data.hasGet,
            };
        }

        public int TowerLevel => Data.level;

        [Update("towerAfkReward")]
        public TowerAfkData TowerAfkReward()
        {
            return Data.afkBattleReward;
        }

    }
}