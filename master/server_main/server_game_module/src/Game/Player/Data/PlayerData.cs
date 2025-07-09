using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public record PlayerData(
        bool freeChangeName,
        int power,
        long lastPowerRefresh,
        int todayVideoPower,
        int todayDiamondPower,
        /** 玩家任务 */
        ImmutableDictionary<int, Mission> playerMission,
        int level,
        int rank,
        long exp,
        int accLogin
    )
    {
        public PlayerData() : this(
            freeChangeName: true,
            power: 0,
            lastPowerRefresh: 0L,
            todayVideoPower: 0,
            todayDiamondPower: 0,
            playerMission: ImmutableDictionary<int, Mission>.Empty,
            level: 1,
            rank: 0,
            exp: 0L,
            accLogin: 0
        )
        {

        }
    }
}