using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace GamePlay
{
    public class DailyManager : AbstractManager<DailyData>, IBaseManager
    {
        public DailyManager(JToken saveData, PlayerDataManager ctx) : base(saveData, ctx)
        {
        }

        public override void DailyRefresh()
        {

        }

        public override void InitData()
        {

        }

        public long GetDayStamp()
        {
            return Data.stamp;
        }

        public void SetDayStamp(long newStamp)
        {
            Data = Data with { stamp = newStamp };
        }
    }
}