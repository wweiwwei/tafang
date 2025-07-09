using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public record PlayerEquipmentData(
        /** 已装备的装备列表 */
        ImmutableArray<long> equipment,
        /** 临时装备列表 */
        ImmutableArray<long> tempEquipment,
        /** 装备库存 */
        ImmutableDictionary<long, PlayerEquipment> equipmentStorage,
        /**装备位数据*/
        ImmutableDictionary<int, PlayerEquipmentPlace> equipmentPlace,
        /** 可激活图鉴 */
        ImmutableArray<int> canActiveCollection,
        /** 已激活图鉴 */
        ImmutableArray<int> hasActiveCollection,
        /** 当前塔阵容 */
        ImmutableArray<int> formation,
        /** 激活的塔天赋 */
        ImmutableDictionary<int, ImmutableDictionary<int, int>> activeTalent,
        /*洗练消耗*/
        long exp,
        /**洗练等级*/
        int washLevel
    )
    {
        public PlayerEquipmentData() : this(
                   equipment: ImmutableArray<long>.Empty,
                   tempEquipment: ImmutableArray<long>.Empty,
                   equipmentStorage: ImmutableDictionary<long, PlayerEquipment>.Empty,
                   equipmentPlace: ImmutableDictionary<int, PlayerEquipmentPlace>.Empty,
                   canActiveCollection: ImmutableArray<int>.Empty,
                   hasActiveCollection: ImmutableArray<int>.Empty,
                   formation: ImmutableArray<int>.Empty,
                   activeTalent: ImmutableDictionary<int, ImmutableDictionary<int, int>>.Empty,
                   exp: 0,
                   washLevel: 1
               )
        { }
    }
}