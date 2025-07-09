using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace GamePlay
{
    public class CareerManager : AbstractManager<CareerData>, IBaseManager
    {
        public CareerManager(JToken saveData, PlayerDataManager ctx) : base(saveData, ctx)
        {
        }

        public override void DailyRefresh()
        {
            Data = Data with { video = 2 };
            Ctx.Emit(CachePath.careerData);
        }

        public override void InitData()
        {
            if (Data.currentCareer == 0)
            {
                Data = Data with
                {
                    currentCareer = Ctx.Table.JobChangeTblList[0].Id
                };
                Ctx.Emit(CachePath.careerData);
            }
            if (Data.talent.IsEmpty)
            {
                Data = Data with
                {
                    talent = Ctx.Table.JobTalentTblList.ToImmutableDictionary(t => t.Id, t => new CareerTalent(t.Id, 0, 0))
                };
            }
        }

        [Handle("career/transfer")]
        public void Transfer(int id)
        {
            GameAssert.Must(Ctx.Table.JobChangeTblMap.ContainsKey(id), $"id:{id} is not exist");
            /**var curtbl = Ctx.Table.JobChangeTblMap[Data.currentCareer];
            GameAssert.Must(tbl.Rank == curtbl.Rank + 1, $"id:{id} career rank is not valid");
            if (curtbl.Branch != -1)
            {
                GameAssert.Must(tbl.Branch == curtbl.Branch, $"id:{id} branch not match");
            }*/
            // GameAssert.Expect(tbl.LevelRequire <= Ctx.PlayerManager.Level(), 90002);
            Ctx.KnapsackManager.SubItem(new Item(GameConstant.DiamondId, Ctx.Config.Job.ResetCost));
            Data = Data with { currentCareer = id };
            Ctx.Emit(CachePath.careerData);
        }

        [Handle("career/reset")]
        public void Reset()
        {
            GameAssert.Expect(Data.currentCareer != Ctx.Table.JobChangeTblList[0].Id, 90001);
            Ctx.KnapsackManager.SubItem(new Item((int)Ctx.Config.Career.Reset[0], Ctx.Config.Career.Reset[1]));
            Data = Data with
            {
                currentCareer = Ctx.Table.JobChangeTblList[0].Id
            };
            Ctx.Emit(CachePath.careerData);
        }
        private Dictionary<string, double> Env(int level)
        {
            var m = new Dictionary<string, double>
            {
                { "lv", level }
            };
            return m;
        }

        [Handle("career/studyTalent")]
        public int StudyTalent(bool free)
        {
            GameAssert.Expect(Data.talent.Values.Any(t => !t.IsMaxLevel(Ctx)), 90003);
            if (!free)
                Ctx.KnapsackManager.SubItem(new Item(Ctx.Config.Career.TalentCost[0], Ctx.Config.Career.TalentCost[1]));
            else GameAssert.Expect(Data.video > 0, 13002);
            var index = RandomUtils.GetHappenedIndexDouble(Ctx.Table.JobTalentTblList.Select(t =>
            {
                if (!Data.talent[t.Id].IsMaxLevel(Ctx))
                    return AstUtil.Eval(t.Weight, Env(Data.talent[t.Id].level));
                else return 0;
            }));
            var id = Ctx.Table.JobTalentTblList[index].Id;
            var talent = Data.talent[id];
            var newExp = talent.exp + 1;
            var require = talent.UpdateExp(Ctx);
            Data = Data with
            {
                talent = Data.talent.SetItem(id, talent with
                {
                    exp = newExp >= require ? 0 : newExp,
                    level = newExp >= require ? talent.level + 1 : talent.level
                }),
                video = free ? Data.video - 1 : Data.video
            };
            Ctx.Emit(CachePath.careerTalent, id);
            return id;
        }

        [Update("careerData")]
        public Dictionary<string, object> InitCareerData()
        {
            return new Dictionary<string, object>{
                {"currentCareer",Data.currentCareer},
                {"video",Data.video},
            };
        }
        [PartialUpdate("careerTalent")]
        public ImmutableDictionary<int, CareerTalent> InitCareerTalent()
        {
            return Data.talent;
        }
    }
}