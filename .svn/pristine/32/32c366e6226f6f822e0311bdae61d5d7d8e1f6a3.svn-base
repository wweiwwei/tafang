import { memory } from "../../framework/Decorator";

export class PlayerEquipment {
    uid: number;
    id: number;
    level: number;
    baseProperty: { property: string; value: number }[];
    stat: PlayerEquipmentStat[];

    tbl() {
        return GTable.getById("EquipmentTbl", this.id);
    }

    private env() {
        return {
            lv: this.level,
        };
    }

    /** 获取属性 */
    @memory
    property(): {
        base: { property: string; value: number }[];
        stat: { property: string; value: number }[];
    } {
        const base = this.baseProperty;
        const stat = this.stat.map((s) => {
            const t = GTable.getById("EquipmentStatTbl", s.id);
            return {
                property: t.property,
                value: Math.round(s.value),
            };
        });
        return { base, stat };
    }

    /** 获取属性的文本 */
    @memory
    propertyString(): {
        base: { property: string; value: string }[];
        stat: { property: string; value: string }[];
    } {
        const p = this.property();
        return {
            base: p.base.map((t) => {
                return {
                    property: t.property,
                    value: GIndex.battle.propertyShowMethod(t.property)(t.value),
                };
            }),
            stat: p.stat.map((t) => {
                return {
                    property: t.property,
                    value: GIndex.battle.propertyShowMethod(t.property)(t.value),
                };
            }),
        };
    }
    /** 装备战斗力 */
    @memory
    bp() {
        const p = this.property();
        let res = 0;
        p.base.forEach((t) => {
            res += t.value * GIndex.battle.battlePoint(t.property);
        });
        p.stat.forEach((t) => {
            res += t.value * GIndex.battle.battlePoint(t.property);
        });
        return Math.round(res);
    }
}

export class PlayerEquipmentStat {
    id: number;
    value: number;
}
