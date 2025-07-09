using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace GamePlay
{
    public class TurntableManager : AbstractManager<TurntableData>, IBaseManager
    {
        public TurntableManager(JToken saveData, PlayerDataManager ctx) : base(saveData, ctx)
        {
        }

        public override void DailyRefresh()
        {
            Data = Data with { video = Ctx.Config.Turntable.VideoLimit, videoStamp = 0 };
        }

        public override void InitData()
        {

        }

        [Handle("turntable/roll")]
        public Dictionary<string, object> Roll(int count)
        {
            GameAssert.Must(count < 5, "turntable count not valid");
            Ctx.KnapsackManager.SubItem(new Item(GameConstant.TurntableStorageId, 1 * count));
            var first = Data.total == 0;
            Data = Data with { total = Data.total + count };
            var idList = new List<int>();
            var rewardList = new List<Item>();
            Ctx.MissionManager.UpdateMissionProgress(10, count);
            for (var j = 0; j < count; j++)
            {
                var r = new Random().NextDouble();
                if (r < Ctx.Config.Turntable.Rare.Sum() && !first)
                {
                    var c = r < Ctx.Config.Turntable.Rare[1] ? 5 : 3;
                    for (var i = 1; i <= c; i++)
                    {
                        var (id, finalReward) = RollOne(first);
                        idList.Add(id);
                        rewardList.AddRange(finalReward);
                    }
                }
                else
                {
                    var (id, finalReward) = RollOne(first);
                    idList.Add(id);
                    rewardList.AddRange(finalReward);
                }
            }
            return new Dictionary<string, object>(){
                    { "idList", idList },
                    { "rewardList", rewardList }
                };
        }

        public (int, ImmutableArray<Item>) RollOne(bool first)
        {
            var preList = Ctx.Table.TurntableTblList.Where(t =>
            {
                return false;
            }).ToList();
            TurntableTbl tbl;
            if (first)
            {
                tbl = Ctx.Table.TurntableTblMap[Ctx.Config.Turntable.FirstReward];
            }
            else
            {
                if (Data.guarantee >= Ctx.Config.Turntable.Guarantee - 1 && preList.Any(t => t.Rare > 0))
                {
                    var list = preList.Where(t => t.Rare > 0).ToList();
                    var index = RandomUtils.GetHappenedIndex(list.Select(t => t.Weight));
                    tbl = list[index];
                }
                else
                {
                    var index = RandomUtils.GetHappenedIndex(preList.Select(t => t.Weight));
                    tbl = preList[index];
                }
            }
            var rewardCount = RandomUtils.RandomLong(tbl.RewardCount[0], tbl.RewardCount[1]);
            var baseReward = new Item(tbl.ItemId, rewardCount);
            var baseFinalReward = Ctx.KnapsackManager.AddItem(baseReward);
            var finalReward = baseFinalReward;
            if (tbl.Reward.Count() > 0)
            {
                var addition = Ctx.KnapsackManager.AddItem(new Item((int)tbl.Reward[0], tbl.Reward[1]));
                finalReward = baseFinalReward.AddRange(addition);
            }
            finalReward = Item.CombineItem(finalReward);
            var guarantee = tbl.Rare > 0 ? 0 : Data.guarantee + 1;
            Data = Data with { guarantee = guarantee };
            return (tbl.Id, finalReward);
        }

        [Update("turntableData")]
        public Dictionary<string, object> TurntableData() => new Dictionary<string, object> {
            { "video", Data.video },
            { "videoStamp", Data.videoStamp }
        };

        [Handle("turntable/videoAddItem")]
        public void VideoAddItem()
        {
            var now = Ctx.Now();
            GameAssert.Expect(Data.video > 0, 16002);
            GameAssert.Expect(now - Data.videoStamp >= Ctx.Config.Turntable.VideoColdDown, 16001);
            Ctx.KnapsackManager.AddItem(new Item(GameConstant.TurntableStorageId, Ctx.Config.Turntable.VideoAddStorage));
            Data = Data with { videoStamp = now, video = Data.video - 1 };
            Ctx.Emit(CachePath.turntableData);
        }

    }
}