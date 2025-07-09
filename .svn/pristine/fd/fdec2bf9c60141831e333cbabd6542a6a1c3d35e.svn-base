using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;

namespace GamePlay;

public record StoneData(
    /** 石头的等级 */
    int level,
    /** 已升级的阶段 */
    int stage,
    /** 是否正在升级石头 */
    bool upgrade,
    /** 升级完成时间 */
    long upgradeEndTime,
    /** 自动设置 */
    StoneAutoSetting autoSetting,
    /** 装备唯一id */
    long uniqueId,
    /** 总召唤次数 */
    long totalSummon,
    /** 总抽取次数 */
    long totalDraw,
    /** 场上的装备怪 */
    ImmutableDictionary<long, EquipmentMonster> equipmentMonster
)
{
    public StoneData() : this(
        level: 1,
        stage: 0,
        upgrade: false,
        upgradeEndTime: -1,
        autoSetting: new StoneAutoSetting(),
        uniqueId: 0,
        totalSummon: 0,
        totalDraw: 0,
        equipmentMonster: ImmutableDictionary<long, EquipmentMonster>.Empty
    )
    { }
}

public record StoneAutoSetting
(
    /** 自动出售保留品质 */
    int autoSellQuality,
    /** 高战力自动停止 */
    bool highBpStop,
    /** 启动筛选1 */
    bool filter1Open,
    /** 启动筛选2 */
    bool filter2Open,
    /** 筛选1 */
    ImmutableArray<string> filter1,
    /** 筛选2 */
    ImmutableArray<string> filter2,
    /** 单次开启数量 */
    int openCount,
    /** 加速 */
    bool accelerate
)
{
    public StoneAutoSetting() : this(
            autoSellQuality: 0,
            highBpStop: true,
            filter1Open: true,
            filter2Open: true,
            filter1: new string[] { "any", "any" }.ToImmutableArray(),
            filter2: new string[] { "any", "any" }.ToImmutableArray(),
            openCount: 1,
            accelerate: false
    )
    { }

};
