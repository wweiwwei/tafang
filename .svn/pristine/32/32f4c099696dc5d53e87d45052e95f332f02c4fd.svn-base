using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace GamePlay
{
    public class GuideManager : AbstractManager<GuideData>, IBaseManager
    {
        public GuideManager(JToken saveData, PlayerDataManager ctx) : base(saveData, ctx)
        {
        }

        public override void DailyRefresh()
        {

        }

        public override void InitData()
        {

        }

        [Handle("guide/complete")]
        public void Complete(int id)
        {
            if (Data.hasComplete.Contains(id)) return;
            Data = Data with { hasComplete = Data.hasComplete.Add(id) };
            Ctx.Emit(CachePath.guideData);
            return;
        }

        [Update("guideData")]
        public Dictionary<string, object> HasComplete()
        {
            return new Dictionary<string, object> {
                { "hasComplete", Data.hasComplete }
            };
        }

    }
}