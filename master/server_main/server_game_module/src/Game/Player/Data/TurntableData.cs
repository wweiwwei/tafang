
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public record TurntableData(
    /** 总转盘次数 */
    int total,
    /** 今日视频次数 */
    int video,
    /** 上次看视频的时间戳 */
    long videoStamp,
    /** 保底计数 */
    int guarantee
    )
    {
        public TurntableData() : this(
            total: 0,
            video: 0,
            videoStamp: 0L,
            guarantee: 0
        )
        { }
    }
}