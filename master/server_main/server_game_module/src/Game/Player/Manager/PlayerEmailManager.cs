using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace GamePlay
{
    public class PlayerEmailManager : AbstractManager<PlayerEmailData>, IBaseManager
    {
        public PlayerEmailManager(JToken saveData, PlayerDataManager ctx) : base(saveData, ctx)
        {
        }

        public override void DailyRefresh()
        {

        }

        public override void InitData()
        {

        }

        public ImmutableDictionary<long, EmailInfo> EmailCache = ImmutableDictionary<long, EmailInfo>.Empty;

        [Update("email")]
        public Dictionary<long, EmailInfo> Email()
        {
            var now = Ctx.Now();
            var hasGetSet = Data.hasGetEmail.Select(t => t.id).ToHashSet();
            return EmailCache
            .Concat(GetGroup())
            .Where(t => !hasGetSet.Contains(t.Key))
            .Where(t => t.Value.endTime > now)
            .ToDictionary(t => t.Key, t => t.Value);
        }

        private EmailInfo FromGroupEmailTbl(ServerGroupEmailTbl tbl, ImmutableHashSet<long> hasGet)
        {
            return new EmailInfo(
                id: tbl.Id,
                title: tbl.Title,
                content: tbl.Content,
                endTime: tbl.End_time,
                hasGet: hasGet.Contains(tbl.Id),
                reward: Item.FromItemArray(tbl.Reward)
            );
        }


        private ImmutableDictionary<long, EmailInfo> GetGroup()
        {
            var now = Ctx.Now();
            return Ctx.Table.ServerGroupEmailTblList
            .Where(t => t.Begin_time <= now && t.End_time >= now)
            .Select(t => FromGroupEmailTbl(t, Data.hasGetEmail.Select(t => t.id).ToImmutableHashSet()))
            .ToImmutableDictionary(t => t.id, t => t);
        }


        [Handle("email/getEmailReward")]
        public object? GetEmailReward(long id)
        {
            var allEmail = EmailCache
            .Concat(GetGroup())
            .ToDictionary(
                t => t.Key,
                t => t.Value
            );
            GameAssert.Expect(allEmail.ContainsKey(id), 5003);
            GameAssert.Expect(Data.hasGetEmail.All(t => t.id != id), 5001);
            var e = allEmail[id];
            var now = Ctx.Now();
            GameAssert.Expect(e.endTime > now, 5002);
            Data = Data with { hasGetEmail = Data.hasGetEmail.Add(new HasGetEmail(id, now)) };
            var finalReward = Ctx.KnapsackManager.AddItem(e.reward);
            Ctx.Emit(CachePath.email);
            return finalReward;
        }

        [Handle("email/getAllEmailReward")]
        public object? GetAllEmailReward()
        {
            var allEmail = Email();
            var now = Ctx.Now();
            var reward = allEmail
            .SelectMany(t =>
            {
                var (id, email) = t;
                Data = Data with { hasGetEmail = Data.hasGetEmail.Add(new HasGetEmail(id, now)) };
                var finalReward = Ctx.KnapsackManager.AddItem(email.reward);
                return finalReward;
            })
            .Where(t => t != null)
            .Select(t => t!)
            .ToList();
            Ctx.Emit(CachePath.email);
            return Item.CombineItem(reward);
        }

        [Handle("cdKey/getCdKeyReward")]
        public object? GetCdKeyReward(string key)
        {
            GameAssert.Expect(Data.hasGetCdKey.All(t => t.key != key), 5006);
            var tblList = Ctx.Table.ServerCdKeyTblList;
            var tbl = tblList.FirstOrDefault(t => t.Key == key);
            GameAssert.Expect(tbl != null, 5004);
            var now = Ctx.Now();
            GameAssert.Expect(tbl!.Begin_time < now, 5004);
            GameAssert.Expect(tbl.End_time > now, 5005);
            // todo area
            GameAssert.Expect(AreaUtil.HandleRule(Ctx.PlayerInfo.playerName, "test", tbl.Rule), 5004);
            var reward = Ctx.KnapsackManager.AddItem(Item.FromItemArray(tbl.Reward));
            Data = Data with { hasGetCdKey = Data.hasGetCdKey.Add(new HasGetCdKey(key, now)) };
            return reward;
        }

    }
}