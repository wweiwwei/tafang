using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public record PlayerArenaData(
        /** 挑战列表 */
        ImmutableArray<long> challenge,
        /** 今日已刷新次数 */
        int todayRefresh,
        /**今日购买次数*/
        int todayBuy
    )
    {
        public PlayerArenaData() : this(
            challenge: ImmutableArray<long>.Empty,
            todayRefresh: 0,
            todayBuy: 0
        )
        {

        }
    };
}