using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace GamePlay
{
    public class TechTreeManager : AbstractManager<TechData>, IBaseManager
    {
        public TechTreeManager(JToken saveData, PlayerDataManager ctx) : base(saveData, ctx)
        {
        }

        public override void DailyRefresh()
        {
        }

        public override void InitData()
        {
            if (Data.techTree.IsEmpty)
            {
                var tbl = Ctx.Table.TechTreeTblList.Sort((a, b) => a.Sort - b.Sort);
                var newTech = tbl.ToImmutableDictionary(tbl => tbl.Id,
                tbl => Data.techTree.ContainsKey(tbl.Id) ? Data.techTree[tbl.Id] : new Technology(tbl.Id, 0));
                Data = Data with { techTree = newTech, nextTech = tbl[0].Id };
            }
        }

        public override void Tick()
        {
        }

        [PartialUpdate("techTree")]
        public ImmutableDictionary<int, Technology> InitTechTree()
        {
            return Data.techTree;
        }

        [Update("techData")]
        public Dictionary<string, object> InitTechData()
        {
            return new Dictionary<string, object> {
                { "nextTech", Data.nextTech },
            };
        }

        [Handle("technology/updateTech")]
        public void UpdateTech()
        {
            GameAssert.Must(Data.techTree.ContainsKey(Data.nextTech), $"id:{Data.nextTech} is not exist");
            var technology = Data.techTree[Data.nextTech];
            // GameAssert.Must(technology.level < Ctx.PlayerManager.Level(), $"id:{Data.nextTech} can not be upgraded");
            GameAssert.Expect(!technology.IsMaxLevel(Ctx), 70002);
            // GameAssert.Expect(Ctx.PlayerManager.Level() >= technology.Tbl(Ctx).Unlock, 70004, new string[] { $"_rs{technology.Tbl(Ctx).Unlock}" });
            Ctx.KnapsackManager.SubItem(technology.UpdateCost(Ctx));
            var index = Ctx.Table.TechTreeTblMap[technology.id].Sort;
            var newNext = Ctx.Table.TechTreeTblList.FirstOrDefault(t => index >= Ctx.Table.TechTreeTblList.Length ? t.Sort == 1 : (t.Sort == index + 1));
            Data = Data with
            {
                techTree = Data.techTree.SetItem(Data.nextTech, technology with { level = technology.level + 1 }),
                nextTech = newNext.Id
            };
            Ctx.Emit(CachePath.techTree, technology.id);
            Ctx.Emit(CachePath.techData);
            Ctx.MissionManager.UpdateMissionProgress(1, 1);
        }

    }
}