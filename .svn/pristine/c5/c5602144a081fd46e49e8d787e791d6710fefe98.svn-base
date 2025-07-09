using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay;

public record CardPool(
    /** id */
    int id,

    /** 总计抽卡 */
    int total,

    /** 今日抽卡 */
    int today,

    /** 今天已经进行的视频抽卡数 */
    int todayVideo,

    /** 总计进行过的视频抽卡数 */
    int totalVideo

)
{

    /** 视频抽卡次数 */
    public int VideoCount(PlayerDataManager Ctx)
    {
        var baseCount = Ctx.Config.CardPool.VideoConfig[0];
        var countGroup = Ctx.Config.CardPool.VideoConfig[1];
        var countLimit = Ctx.Config.CardPool.VideoConfig[2];
        return Math.Min(countLimit, baseCount + countGroup * totalVideo);
    }

    /** 抽卡 */
    public (CardPool, CardInfo[]) DrawCard(int count, PlayerDataManager Ctx)
    {
        // 抽卡
        var buffer = new List<CardInfo>();
        CardPool res = this;
        for (int i = 0; i < count; i++)
        {
            var (newCardPool, cardInfo) = res.DrawCard(Ctx);
            res = newCardPool;
            buffer.Add(cardInfo);
        }
        return (res, buffer.ToArray());
    }
    /** 单次抽卡 */
    private (CardPool, CardInfo) DrawCard(PlayerDataManager Ctx)
    {
        var tbl = Ctx.Table.CardPoolTblMap[id];
        var level = PoolLevel(Ctx);
        var levelTbl = Ctx.Table.CardPoolLevelTblList.First(t => t.Level == level);
        var weight = new int[] { levelTbl.Rare0, levelTbl.Rare1, levelTbl.Rare2, levelTbl.Rare3, levelTbl.Rare4, levelTbl.Rare5, levelTbl.Rare6, levelTbl.Rare7, levelTbl.Rare8 };
        var quality = RandomUtils.GetHappenedIndex(weight);
        var tblList = Ctx.Table.EquipmentTblList.Where(t => t.Quality == quality);
        var eTbl = RandomUtils.RandomElement(tblList);
        // todo 添加物品逻辑
        var cardInfo = new CardInfo(id == 1 ? "playerSkill" : "pet", eTbl.Id, false);
        var newCardPool = this with { today = today + 1, total = total + 1 };
        return (newCardPool, cardInfo);
    }

    public CardPool DailyRefresh(PlayerDataManager Ctx)
    {
        return this with
        {
            today = 0,
            todayVideo = 0
        };
    }

    public int PoolLevel(PlayerDataManager Ctx)
    {
        return Ctx.Index.CardPool.GetLevel(total);
    }


}

