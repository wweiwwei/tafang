using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public record MainStage(
        /** 地图序号 */
        int mapIndex,

        /** 关卡序号 */
        int stageIndex,

        /** 通关所有关卡 */
        bool clear
    )
    {
        public StageMapTbl MapTbl(PlayerDataManager Ctx)
        {
            return Ctx.Table.StageMapTblList.First(t => t.MapIndex == mapIndex);
        }

        public StageTbl Tbl(PlayerDataManager Ctx)
        {
            return Ctx.Table.StageTblList.First(t => t.MapIndex == mapIndex && stageIndex == t.StageIndex);
        }

        /** 地图产出物品id */
        public int ProduceId(PlayerDataManager Ctx)
        {
            return 0;
        }

        /** 首次通关奖励 */
        public ImmutableArray<Item> FirstClearReward(PlayerDataManager Ctx)
        {
            var tbl = Tbl(Ctx);
            return Item.FromItemArray(tbl.FirstReward);
        }

        /** 常规通关奖励 */
        public ImmutableArray<Item> SweepReward(PlayerDataManager Ctx, int challengeStageIndex)
        {
            var tbl = Ctx.Table.StageTblList.First(t => t.MapIndex == mapIndex && t.StageIndex == challengeStageIndex);
            return Item.FromItemArray(tbl.SweepReward);
        }

        public static MainStage Empty(int mapIndex)
        {
            return new MainStage(
                mapIndex: mapIndex,
                stageIndex: 1,
                clear: false
            );
        }
    }

}