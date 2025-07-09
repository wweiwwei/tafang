import { memory } from "../../framework/Decorator";
import Item from "./Item";

export class PlayerEquipmentPlace {
    index: number;
    level: number;
    stat: PlayerEquipmentPlaceStat[];

    tbl() {
        return GTable.getList("TowerStrengthenTbl").find((t) => t.level === this.level);
    }

    getNextLevel() {
        const res = GUtils.ts.shallowCopy(this);
        res.level += 1;
        return res;
    }

    /** 获取属性 */
    @memory
    property(): {
        base: { property: string; value: number }[];
        stat: { property: string; value: number }[];
    } {
        const tbl = GTable.getList("TowerStrengthenTbl").filter((t) => t.level <= this.level);
        let arr = tbl
            .map((t) =>
                t.property.map((d) => {
                    return {
                        property: d[0],
                        value: Number(d[1]),
                    };
                })
            )
            .reduce((p, c) => p.concat(c), []);
        const map = new Map<string, number>();
        for (let p of arr) {
            if (!map.has(p.property)) {
                map.set(p.property, p.value);
            } else {
                map.set(p.property, p.value + map.get(p.property));
            }
        }
        const base = GUtils.map.mapToArray(map, (v, k) => {
            return { property: k, value: v };
        });
        const stat = this.stat.map((s) => {
            const t = GTable.getById("TowerWashTbl", s.id);
            if (t)
                return {
                    property: t.property,
                    value: s.value,
                };
            else return null;
        });
        return { base, stat };
    }

    /** 获取属性的文本 */
    @memory
    propertyString(): {
        base: { property: string; value: number }[];
        stat: { property: string; value: string }[];
    } {
        const p = this.property();
        return {
            base: p.base.map((t) => {
                return {
                    property: t.property,
                    value: t.value,
                };
            }),
            stat: p.stat.map((t) => {
                if (t)
                    return {
                        property: t.property,
                        value: t.value / 100 + "%",
                    };
                else return null;
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

    isMaxLevel() {
        return this.level >= GTable.getList("TowerStrengthenTbl").length;
    }

    upgradeCost() {
        const tbl = GTable.getList("TowerStrengthenTbl").find((t) => t.level === this.level + 1);
        if (tbl) return Item.fromItemArray(tbl.cost);
        else return null;
    }
}

export class PlayerEquipmentPlaceStat {
    id: number;
    value: number;
    locked: boolean;
}
