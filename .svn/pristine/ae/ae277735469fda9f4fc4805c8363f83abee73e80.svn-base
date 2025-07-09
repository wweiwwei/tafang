using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay;

public record InfiniteData(
    /** 历史最高记录 */
    int historyRecord,
    /** 今日最高记录 */
    int todayRecord,
    /** 今天已领取关卡数 */
    int todayHasGet,
    /** 上次结算离线奖励的时间戳 */
    long lastSettleOffLineStamp,
    /** 奖励邮件 */
    ImmutableArray<InfiniteRewardMail> rewardMail
)
{
    public InfiniteData() : this(
        historyRecord: 0,
        todayRecord: 0,
        todayHasGet: 0,
        lastSettleOffLineStamp: 0,
        rewardMail: ImmutableArray<InfiniteRewardMail>.Empty
    )
    { }
}
