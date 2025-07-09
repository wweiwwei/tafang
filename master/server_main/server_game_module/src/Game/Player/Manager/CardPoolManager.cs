using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace GamePlay;

public class CardPoolManager : AbstractManager<CardPoolData>, IBaseManager
{
    public CardPoolManager(JToken saveData, PlayerDataManager ctx) : base(saveData, ctx)
    {
    }

    public override void DailyRefresh()
    {
        Data = Data with
        {
            cardPool = Data.cardPool.Select(kv => kv.Value
            .DailyRefresh(Ctx))
            .ToImmutableDictionary(
            kv => kv.id,
            kv => kv)
        };
    }

    public override void InitData()
    {
        Ctx.Table.CardPoolTblList.ForEach(t =>
        {
            if (!Data.cardPool.ContainsKey(t.Id))
            {

                Data = Data with { cardPool = Data.cardPool.SetItem(t.Id, new CardPool(t.Id, 0, 0, 0, 0)) };
            }
        });
    }

    [PartialUpdate("cardPool")]
    public ImmutableDictionary<int, CardPool> CardPoolInfo()
    {
        return Data.cardPool;
    }

    [Handle("cardPool/drawCard")]
    public ImmutableArray<CardInfo> DrawCard(int id, int kind)
    {
        var count = 15;
        var cardPool = Data.cardPool[id];
        var tbl = Ctx.Table.CardPoolTblMap[id];
        if (kind == 1)
        {
            // 视频
            // todo 达到今天视频抽卡上限错误码
            GameAssert.Expect(cardPool.todayVideo < Ctx.Config.CardPool.VideoLimit, 7001);
            count = cardPool.VideoCount(Ctx);
            // 修改视频次数
            cardPool = cardPool with
            {
                todayVideo = cardPool.todayVideo + 1,
                totalVideo = cardPool.totalVideo + 1
            };
            Data = Data with
            {
                cardPool = Data.cardPool.SetItem(id, cardPool)
            };
        }
        else if (kind == 2)
        {
            // 15抽
            count = 15;
            var tCount = Ctx.KnapsackManager.GetStorageById(tbl.Ticket);
            if (tCount >= 15)
            {
                Ctx.KnapsackManager.SubItem(new Item(tbl.Ticket, 15));
            }
            else
            {
                Ctx.KnapsackManager.SubItem(new Item(tbl.Ticket, tCount));
                var remainCard = 15 - tCount;
                var diamondRequire = (long)Math.Round(tbl.Price15 * remainCard / 15.0);
                Ctx.KnapsackManager.SubItem(new Item(GameConstant.DiamondId, diamondRequire));
            }
        }
        else if (kind == 3)
        {
            // 35抽
            count = 35;
            var tCount = Ctx.KnapsackManager.GetStorageById(tbl.Ticket);
            if (tCount >= 35)
            {
                Ctx.KnapsackManager.SubItem(new Item(tbl.Ticket, 35));
            }
            else
            {
                Ctx.KnapsackManager.SubItem(new Item(tbl.Ticket, tCount));
                var remainCard = 35 - tCount;
                var diamondRequire = (long)Math.Round(tbl.Price35 * remainCard / 35.0);
                Ctx.KnapsackManager.SubItem(new Item(GameConstant.DiamondId, diamondRequire));
            }
        }
        var (newCardPool, cardList) = cardPool.DrawCard(count, Ctx);
        Data = Data with { cardPool = Data.cardPool.SetItem(id, newCardPool) };
        Ctx.Emit(CachePath.cardPool, id);
        return cardList.ToImmutableArray();
    }

}
