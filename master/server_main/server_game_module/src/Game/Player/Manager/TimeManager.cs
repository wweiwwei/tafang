using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace GamePlay
{
    public class TimeManager : AbstractManager<TimeData>, IBaseManager
    {
        public TimeManager(JToken saveData, PlayerDataManager ctx) : base(saveData, ctx)
        {
        }

        public override void DailyRefresh()
        {

        }

        public override void InitData()
        {

        }

        public long Offset()
        {
            return Data.offset;
        }

        public void AddOffset(long time)
        {
            Data = Data with { offset = Data.offset + time };
        }

    }
}