using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public record TowerAfkData(
        long beginStamp,
        long lastRefreshStamp,
        ImmutableArray<Item> reward
    )
    {
        public bool IsNeedSettle(long now, PlayerDataManager Ctx)
        {
            var settleNow = Math.Min(now, lastRefreshStamp + Ctx.Config.Tower.MaxAfkTime * 60 * 1000L);
            var offset = settleNow - lastRefreshStamp;
            return offset >= GameConstant.TowerAfkInterval;
        }

        public TowerAfkData BattleProduce(long now, PlayerDataManager Ctx)
        {
            var settleNow = Math.Min(now, lastRefreshStamp + Ctx.Config.Tower.MaxAfkTime * 60 * 1000L);
            var offset = settleNow - lastRefreshStamp;
            var times = offset / GameConstant.TowerAfkInterval;
            var stamp = lastRefreshStamp + GameConstant.TowerAfkInterval * times;
            var p = Item.CombineItem(BattleReward(times, Ctx).Concat(reward));
            return new TowerAfkData(
                beginStamp: beginStamp,
                lastRefreshStamp: stamp,
                reward: p
            );
        }

        public List<Item> BattleReward(long times, PlayerDataManager Ctx)
        {
            var ab = new List<Item>();
            var tbl = Ctx.Table.TowerChallengeTblList.First(t => t.TowerLv == Ctx.TowerManager.TowerLevel);
            var env = new Dictionary<string, double>();
            env["lv"] = tbl.TowerLv;
            tbl.AfkReward.ForEach(arr =>
            {
                var p = int.Parse(arr[0]);
                var id = int.Parse(arr[1]);
                var count = (long)Math.Round(AstUtil.Eval(arr[2], env));
                var c = 0L;
                for (var i = 1; i <= times; i++)
                {
                    if (p > RandomUtils.RandomInt(0, 10000))
                    {
                        c += count;
                    }
                }
                if (c > 0)
                {
                    ab.Add(new Item(id, c));
                }
            });
            return ab;
        }

        public static TowerAfkData Empty(long now, PlayerDataManager Ctx)
        {
            return new TowerAfkData(
                beginStamp: now,
                lastRefreshStamp: now,
                reward: ImmutableArray<Item>.Empty
            );
        }

    }
}