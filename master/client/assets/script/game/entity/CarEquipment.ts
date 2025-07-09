import Item from "./Item";

export default class CarEquipment {
    /** 战车装备id */
    id: number;

    storage: { level: number; count: number }[];

    /** 获取装备所属部位 */
    getPart(): number {
        return this.getTbl().part;
    }

    /** 获取装备表 */
    getTbl() {
        return GTable.getById("CarEquipmentTbl", this.id);
    }

    getMaxLevel() {
        return GTable.getList("CarEquipmentLevelTbl").length;
    }
    /** 是否有空闲的装备 */
    hasAvailable(): boolean {
        return this.storage.some((t) => t.count > 0);
    }

    /** 获取包装过后的装备类 */
    getEquipmentWrapperList(): CarEquipmentWrapper[] {
        const car = GModel.car.getBattleCar();
        const res: CarEquipmentWrapper[] = [];
        const part = this.getPart();
        const e = car.equipment[part];
        this.storage.forEach((t) => {
            if (e && e.id === this.id && e.level === t.level) {
                res.push(new CarEquipmentWrapper(this.id, t.level, 1, true));
                res.push(new CarEquipmentWrapper(this.id, t.level, t.count - 1, false));
            } else {
                res.push(new CarEquipmentWrapper(this.id, t.level, t.count, false));
            }
        });
        return res.filter((t) => t.count > 0);
    }

    /** 装备是否达到了最大等级 */
    isEquipmentMaxLevel(level: number): boolean {
        return level >= GTable.getList("CarEquipmentLevelTbl").length;
    }

    /** 升级所需的经验值，满阶时返回-1 */
    getUpgradeExpRequire(level: number): number {
        if (this.isEquipmentMaxLevel(level)) return -1;
        return GTable.getList("CarEquipmentLevelTbl").find((t) => t.level === level).require;
    }

    /** 升级所需的金币，满阶时返回count为-1 */
    getUpgradeCoinRequire(level: number): Item {
        let tbl = GTable.getList("CarEquipmentLevelTbl").find((t) => t.level === level);
        if (this.isEquipmentMaxLevel(level)) return new Item(GIndex.id.coinId, -1);
        return new Item(GIndex.id.coinId, tbl.coinCost);
    }

    /** 获取装备升阶的经验值信息 */
    getExpInfo(level: number): {
        exp: number;
        require: number;
    } {
        const lv1 = this.getEquipmentWrapperList().find((t) => t.level === 1 && !t.equiped);
        const levelOneCount = lv1 ? lv1.count : 0;
        return {
            exp: levelOneCount,
            require: this.getUpgradeExpRequire(level),
        };
    }

    /** 获取装备的map */
    private getEquipmentPorpertyMap(level: number): {
        addMap: { [property: string]: number };
        mulMap: { [property: string]: number };
    } {
        // todo 升阶属性
        const tbl = this.getTbl();
        const p = tbl.property.filter((t) => Number(t[0]) <= level);
        const env = [{ rank: level }];
        const addMap: { [property: string]: number } = {};
        const mulMap: { [property: string]: number } = {};
        p.forEach((t) => {
            const [_, attr, value] = t;
            if (value.endsWith("%")) {
                const v = Number(value.replace("%", ""));
                mulMap[attr] = (mulMap[attr] || 0) + v;
            } else {
                const v = AstUtil.eval(value, env);
                addMap[attr] = (addMap[attr] || 0) + v;
            }
        });
        return { addMap, mulMap };
    }

    /** 获取装备的属性 */
    getEquipmentProperty(level: number): { property: string; value: number }[] {
        const res: { property: string; value: number }[] = [];
        const { addMap, mulMap } = this.getEquipmentPorpertyMap(level);
        for (let attr in addMap) {
            res.push({
                property: attr,
                value: Math.round(addMap[attr]),
            });
        }
        for (let attr in mulMap) {
            const p = res.find((t) => t.property === attr);
            if (p) {
                p.value = Math.round(p.value * (1 + mulMap[attr] / 100));
            }
        }
        return res;
    }
    /** 获取装备的属性字符串 */
    getEquipmentPropertyString(level: number): { property: string; value: string }[] {
        const res: { property: string; value: string }[] = [];
        const { addMap, mulMap } = this.getEquipmentPorpertyMap(level);
        for (let attr in addMap) {
            res.push({
                property: attr,
                value: Math.round(addMap[attr]).toString(),
            });
        }
        for (let attr in mulMap) {
            res.push({
                property: attr,
                value: Math.round(mulMap[attr]).toString() + "%",
            });
        }
        return res;
    }

    /** 获取装备的战力 */
    getBattlePoint(level: number): number {
        const p = this.getEquipmentProperty(level);
        let res = 0;
        p.forEach((t) => {
            res += t.value * GIndex.battle.battlePoint(t.property);
        });
        return Math.round(res);
    }

    /**获取已有战车部件的最大等级 */
    getHasGetMaxLevel(id: number): number {
        const own = GModel.car.getCarEquipmentById(id);
        if (own) {
            let level: number = 0;
            own.storage.forEach((t) => {
                if (t.count !== 0 && t.level > level) level = t.level;
            });
            return level;
        } else {
            return 0;
        }
    }
}

/** 装备包装类 */
export class CarEquipmentWrapper {
    constructor(public id: number, public level: number, public count: number, public equiped: boolean) {}

    /** 获取装备类，如果不存在，则返回一个构造出来的装备类 */
    private getEquipment(): CarEquipment {
        const res = GModel.car.getCarEquipmentById(this.id);
        if (res) return res;
        const e = new CarEquipment();
        e.id = this.id;
        e.storage = [];
        return e;
    }
    /** 获取装备所属部位 */
    getPart(): number {
        return this.getTbl().part;
    }

    /** 获取装备表 */
    getTbl() {
        return GTable.getById("CarEquipmentTbl", this.id);
    }
    /**获取下一等级 */
    getNextLevel() {
        const res = GUtils.ts.shallowCopy(this);
        res.level += 1;
        return res;
    }
    /** 获取装备升阶的经验值信息 */
    getExpInfo(): {
        exp: number;
        require: number;
    } {
        const info = this.getEquipment().getExpInfo(this.level);
        if (this.level === 1 && !this.equiped) {
            info.exp - 1;
        }
        return info;
    }

    /** 装备是否达到了最大等级 */
    isEquipmentMaxLevel(): boolean {
        return this.getEquipment().isEquipmentMaxLevel(this.level);
    }

    /** 升级所需的金币，满级时返回count为-1 */
    upgradeCoinRequire(): Item {
        return this.getEquipment().getUpgradeCoinRequire(this.level);
    }

    /** 获取装备的属性 */
    getEquipmentProperty(): { property: string; value: number }[] {
        return this.getEquipment().getEquipmentProperty(this.level);
    }

    /** 获取装备的属性字符串 */
    getEquipmentPropertyString(): { property: string; value: string }[] {
        return this.getEquipment().getEquipmentPropertyString(this.level);
    }

    /** 获取装备的战力 */
    getBattlePoint(): number {
        return this.getEquipment().getBattlePoint(this.level);
    }
}
