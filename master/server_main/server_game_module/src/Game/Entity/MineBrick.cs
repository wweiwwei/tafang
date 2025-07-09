using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public record MineBrick(
        int uniqueId,
        int mapType,
        int rewardId,
        int life,
        int x,
        int y
    )
    { }

    public static class MineMapType
    {
        public const int BRICK_1 = 1;
        public const int BRICK_3 = 2;
        public const int NOREWARD1 = 3;
        public const int MAP_BOMB = 4;
        public const int RANDOM_BRICK = 5;
        public const int NOREWARD2 = 6;
    }

    public static class MineMapRewardType
    {
        public const int NO = 0;
        public const int ITEM = 1;
        public const int POWER = 2;
        public const int AD_CHEST = 3;
    }

}
