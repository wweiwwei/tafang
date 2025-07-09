using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public class CollectionIndex
    {
        public readonly ImmutableDictionary<int, ImmutableArray<int>> ExpRequireByLevel;
        public readonly ImmutableDictionary<int, ImmutableArray<int>> HeroIdAndStarToExp;
        public CollectionIndex(TableData Table, TableConfigData Config)
        {
            ExpRequireByLevel = Table.HeroCollectionTblList
                .GroupBy(tbl => tbl.Page)
                .ToImmutableDictionary(
                    group => group.Key,
                    group => new[] { 0 }
                        .Concat(group.Select(tbl => group.Where(t => t.Level <= tbl.Level)
                            .Sum(t => t.PointRequire)))
                        .ToImmutableArray());

            HeroIdAndStarToExp = Table.HeroTblList
                .Select(heroTbl =>
                {
                    int quality = heroTbl.Quality;
                    var list = Table.HeroCollectionPointTblList.Where(tbl => tbl.Page == 0);
                    var exp = list.Select(tbl => list.Where(t => t.Star <= tbl.Star)
                            .Sum(t => t.Point[quality]))
                        .ToImmutableArray();
                    return new { heroTbl.Id, Exp = exp };
                })
                .Concat(Table.HeroEquipmentTblList
                    .Select(equipmentTbl =>
                    {
                        int quality = equipmentTbl.Quality;
                        var list = Table.HeroCollectionPointTblList.Where(tbl => tbl.Page == 1);
                        var exp = list.Select(tbl => list.Where(t => t.Star <= tbl.Star)
                                .Sum(t => t.Point[quality]))
                            .ToImmutableArray();
                        return new { equipmentTbl.Id, Exp = exp };
                    }))
                .Concat(Table.CarEquipmentTblList
                    .Select(carEquipmentTbl =>
                    {
                        int quality = carEquipmentTbl.Quality;
                        var list = Table.HeroCollectionPointTblList.Where(tbl => tbl.Page == 2);
                        var exp = list.Select(tbl => list.Where(t => t.Star <= tbl.Star)
                                .Sum(t => t.Point[quality]))
                            .ToImmutableArray();
                        return new { carEquipmentTbl.Id, Exp = exp };
                    }))
                .ToImmutableDictionary(obj => obj.Id, obj => obj.Exp);
        }

    }
}