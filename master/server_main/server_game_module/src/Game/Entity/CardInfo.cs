using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay;

public record CardInfo(
    /** 卡的类型 */
    string itemType,
    /** 卡的id */
    int id,
    /** 是否为新卡 */
    bool isNew
);

