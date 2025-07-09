using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public class MissionIndex
    {

        public readonly ImmutableDictionary<int, BaseMissionTbl> MissionTblMap;
        public MissionIndex(TableData Table, TableConfigData Config)
        {
            var dic = new Dictionary<int, BaseMissionTbl>();
            Table.MainMissionTblList.ForEach((tbl) =>
            {
                dic[tbl.Id] = tbl;
            });
            Table.PlayerMissionTblList.ForEach((tbl) =>
            {
                dic[tbl.Id] = tbl;
            });
            Table.RankMissionTblList.ForEach((tbl) =>
            {
                dic[tbl.Id] = tbl;
            });
            Table.BanquetMissionTblList.ForEach((tbl) =>
            {
                dic[tbl.Id] = tbl;
            });
            // Table.CaptainMissionTblList.ForEach((tbl) =>
            // {
            //     dic[tbl.Id] = tbl;
            // });
            MissionTblMap = dic.ToImmutableDictionary();
        }

    }
}