using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public record AfkData(
        /** 地图编号 */
        int mapIndex,

        /** 起始时间戳 */
        long beginStamp,

        /** 最后更新时间戳 */
        long lastRefreshStamp,

        /** 挂机奖励 */
        ImmutableArray<Item> reward
    )
    {
        public bool IsNeedSettle(long now, PlayerDataManager Ctx)
        {
            var settleNow = Math.Min(now, lastRefreshStamp + Ctx.Config.Stage.BattleMaxAfkTime * 60 * 1000L);
            var offset = settleNow - lastRefreshStamp;
            return offset >= GameConstant.StageAfkInterval;
        }


        public static AfkData Empty(int mapIndex, PlayerDataManager Ctx)
        {
            return new AfkData(
                mapIndex: mapIndex,
                beginStamp: Ctx.Now(),
                lastRefreshStamp: Ctx.Now(),
                reward: ImmutableArray<Item>.Empty
            );
        }

        public static AfkData InitEmpty()
        {
            return new AfkData(
                mapIndex: 1,
                beginStamp: 0,
                lastRefreshStamp: 0,
                reward: ImmutableArray<Item>.Empty
            );
        }

    }

}