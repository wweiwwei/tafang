using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public record MineData(
    /** 当前地图 */
    ImmutableDictionary<int, MineBrick> currentMap,
    /** 唯一id */
    int uniqueId,
    /** 当前区域id */
    int currentAreaId,
    /** 当前区域行数 */
    int currentAreaRowIndex,
    /** 矿工位置 */
    ImmutableArray<int> minerPos,
    /** 上次体力刷新的时间 */
    long lastPowerRefreshTime,
    /** 当前体力 */
    int currentPower,
    /** 当前楼层 */
    int currentFloor,
    /** 自动是否已可用 */
    bool auto,
    /** 当天已进行的视频恢复体力次数 */
    int videoRecoverCount,
    /** 当天已进行的视频添加钻头次数 */
    int videoDrillCount,
    /** 当天已进行的视频添加炸弹次数 */
    int videoBombCount,
    /** 当前是否有boss阻挡 */
    bool boss,
    /** 已经打败过的boss */
    ImmutableArray<int> bossConquer
    )
    {
        public MineData() : this(
            currentMap: ImmutableDictionary<int, MineBrick>.Empty,
            uniqueId: 1,
            currentAreaId: 0,
            currentAreaRowIndex: 0,
            minerPos: new int[] { 3, 1 }.ToImmutableArray(),
            lastPowerRefreshTime: 0L,
            currentPower: 0,
            currentFloor: 0,
            auto: false,
            videoRecoverCount: 0,
            videoDrillCount: 0,
            videoBombCount: 0,
            boss: false,
            bossConquer: ImmutableArray<int>.Empty
        )
        { }

    }
}