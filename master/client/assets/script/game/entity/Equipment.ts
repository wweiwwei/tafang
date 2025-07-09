import Table2D from "../../framework/collection/Table2D";
import BattleFactory from "../battleLogic/Utils/BattleFactory";
import Item from "./Item";

export default class Equipment {
    /** 装备id */
    id: number;

    storage: { level: number; rank: number; count: number }[];

    /** 获取装备所属部位 */
    getPart(): number {
        return this.getTbl().part;
    }

    /** 获取装备表 */
    getTbl() {
        return GTable.getById("HeroEquipmentTbl", this.id);
    }

    /** 是否有空闲的装备 */
    hasAvailable(): boolean {
        let hasAvailable = false;
        this.getAvailableCount().forEach((count, rank, level) => {
            if (count > 0) hasAvailable = true;
        });
        return hasAvailable;
    }

    /** 获取各等级可装备数量（排除了已装备在英雄身上的），key分别为rank和level */
    private getAvailableCount(): Table2D<number, number, number> {
        const part = this.getPart();
        const heroList = GModel.hero.getAllHero();
        const eUse: Table2D<number, number, number> = new Table2D();
        heroList.forEach((hero) => {
            const e = hero.equipment[part];
            if (e && e.id === this.id) {
                eUse.set(e.rank, e.level, (eUse.get(e.rank, e.level) || 0) + 1);
            }
        });
        const eCount = this.getCountTable();
        const eAvailableCount: Table2D<number, number, number> = new Table2D();
        eCount.forEach((count, rank, level) => {
            eAvailableCount.set(rank, level, count - (eUse.get(rank, level) || 0));
        });
        return eAvailableCount;
    }

    private getCountTable(): Table2D<number, number, number> {
        const res = new Table2D<number, number, number>();
        this.storage.forEach((t) => {
            res.set(t.rank, t.level, t.count);
        });
        return res;
    }

    /** 获取包装过后的装备类 */
    getEquipmentWrapperList(): EquipmentWrapper[] {
        const res: EquipmentWrapper[] = [];
        const part = this.getPart();
        const heroList = GModel.hero.getAllHero();
        const eUse: Table2D<number, number, number> = new Table2D();
        heroList.forEach((hero) => {
            const e = hero.equipment[part];
            if (e && e.id === this.id) {
                res.push(new EquipmentWrapper(this.id, e.level, e.rank, 1, hero.uniqueId));
                eUse.set(e.rank, e.level, (eUse.get(e.rank, e.level) || 0) + 1);
            }
        });
        const eCount = this.getCountTable();
        const eAvailableCount: Table2D<number, number, number> = new Table2D();
        eCount.forEach((count, rank, level) => {
            eAvailableCount.set(rank, level, count - (eUse.get(rank, level) || 0));
        });
        eAvailableCount.forEach((count, rank, level) => {
            res.push(new EquipmentWrapper(this.id, level, rank, count, -1));
        });
        return res.filter((t) => t.count !== 0);
    }

    /** 装备是否达到了最大等级 */
    isEquipmentMaxLevel(level: number): boolean {
        const maxLevel = GUtils.array.maxBy(GTable.getList("HeroEquipmentLevelTbl"), (t) => t.level[1]);
        return level >= maxLevel.level[1];
    }

    /** 升级所需的金币，满级时返回count为-1 */
    upgradeCoinRequire(level: number): Item {
        const tbl = GTable.getList("HeroEquipmentLevelTbl").find((t) => t.level[0] <= level && t.level[1] >= level);
        if (tbl) {
            const env = [{ lv: level }];
            return new Item(GIndex.id.heroEquipmentExpId, AstUtil.eval(tbl.coinCost, env));
        } else {
            return new Item(GIndex.id.heroEquipmentExpId, -1);
        }
    }

    /** 装备是否达到最大阶数 */
    isEquipmentMaxRank(rank: number): boolean {
        return rank >= GTable.getList("HeroEquipmentRankTbl").length - 1;
    }

    /** 升阶所需的经验值，满阶时返回-1 */
    getUpgradeRankExpRequire(rank: number): number {
        if (this.isEquipmentMaxRank(rank)) return -1;
        return GTable.getList("HeroEquipmentRankTbl").find((t) => t.level === rank).require;
    }

    /** 升阶所需的金币，满阶时返回count为-1 */
    getUpgradeRankCoinRequire(rank: number): Item {
        let tbl = GTable.getList("HeroEquipmentRankTbl").find((t) => t.level === rank);
        if (this.isEquipmentMaxRank(rank)) return new Item(GIndex.id.coinId, -1);
        return new Item(GIndex.id.coinId, tbl.coinCost);
    }

    /** 获取装备升阶的经验值信息 */
    getExpInfo(rank: number): {
        exp: number;
        require: number;
    } {
        const levelOneCount = this.getAvailableCount().get(0, 1) || 0;
        return {
            exp: levelOneCount,
            require: this.getUpgradeRankExpRequire(rank),
        };
    }

    /** 获取装备的属性字符串 */
    getEquipmentPropertyString(level: number): { property: string; value: string }[] {
        const res: { property: string; value: string }[] = [];
        const { addMap, mulMap } = BattleFactory.getEquipmentPorpertyMap(this.id, level);
        for (let attr in addMap) {
            const v = Math.round(addMap[attr]);
            res.push({
                property: attr,
                value: GIndex.battle.propertyShowMethod(attr)(v),
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
        const p = BattleFactory.getEquipmentProperty(this.id, level);
        let res = 0;
        p.forEach((t) => {
            res += t.value * GIndex.battle.battlePoint(t.property);
        });
        return Math.round(res);
    }

    /**获取已获得装备的最大阶数 */
    getHasGetMaxRank(id: number): number {
        const own = GModel.hero.getEquipmentById(id);
        if (own) {
            let rank: number = 0;
            own.storage.forEach((t) => {
                if (t.count !== 0 && t.rank > rank) rank = t.rank;
            });
            return rank;
        } else {
            return 0;
        }
    }

    /** 获取阶数属性字符串 */
    getRankPropertyString(rank: number): { property: string; value: string }[] {
        const list = BattleFactory.getEquipmentRankProperty(this.id, rank);
        return list.map((t) => {
            return {
                property: t.property,
                value: GIndex.battle.propertyShowMethod(t.property)(t.value),
            };
        });
    }
}

/** 装备包装类 */
export class EquipmentWrapper {
    constructor(
        public id: number,
        public level: number,
        public rank: number,
        public count: number,
        public heroUniqueId: number
    ) {}

    /** 获取装备所属部位 */
    getPart(): number {
        return this.getTbl().part;
    }

    /** 获取装备表 */
    getTbl() {
        return GTable.getById("HeroEquipmentTbl", this.id);
    }
    /**获取下一等级 */
    getNextLevel() {
        const res = GUtils.ts.shallowCopy(this);
        res.level += 1;
        return res;
    }
    getNextRank() {
        const res = GUtils.ts.shallowCopy(this);
        res.rank += 1;
        return res;
    }
    /** 获取装备类，如果不存在，则返回一个构造出来的装备类 */
    private getEquipment(): Equipment {
        const res = GModel.hero.getEquipmentById(this.id);
        if (res) return res;
        const e = new Equipment();
        e.id = this.id;
        e.storage = [];
        return e;
    }

    /** 获取装备升阶的经验值信息 */
    getExpInfo(): {
        exp: number;
        require: number;
    } {
        const info = this.getEquipment().getExpInfo(this.rank);
        if (this.level === 1 && this.rank === 0 && this.heroUniqueId <= 0) {
            info.exp - 1;
        }
        return info;
    }

    /** 装备是否达到了最大等级 */
    isEquipmentMaxLevel(): boolean {
        return this.getEquipment().isEquipmentMaxLevel(this.level);
    }
    /** 装备是否达到了最大阶数 */
    isEquipmentMaxRank(): boolean {
        return this.getEquipment().isEquipmentMaxRank(this.rank);
    }

    /** 升级所需的金币，满级时返回count为-1 */
    upgradeCoinRequire(): Item {
        return this.getEquipment().upgradeCoinRequire(this.level);
    }

    /** 升阶所需的经验值，满阶时返回-1 */
    getUpgradeRankExpRequire(): number {
        return this.getEquipment().getUpgradeRankExpRequire(this.rank);
    }

    /** 升阶所需的金币，满阶时返回count为-1 */
    getUpgradeRankCoinRequire(): Item {
        return this.getEquipment().getUpgradeRankCoinRequire(this.rank);
    }

    /** 获取装备的属性 */
    getEquipmentProperty(): { property: string; value: number }[] {
        return BattleFactory.getEquipmentProperty(this.id, this.level);
    }

    /** 获取装备的属性字符串 */
    getEquipmentPropertyString(): { property: string; value: string }[] {
        return this.getEquipment().getEquipmentPropertyString(this.level);
    }

    /** 获取装备的战力 */
    getBattlePoint(): number {
        return this.getEquipment().getBattlePoint(this.level);
    }

    /** 获取阶数属性 */
    getRankProperty(): { property: string; value: number }[] {
        return BattleFactory.getEquipmentRankProperty(this.id, this.rank);
    }

    /** 获取阶数属性字符串 */
    getRankPropertyString(): { property: string; value: string }[] {
        return this.getEquipment().getRankPropertyString(this.rank);
    }
    /**获取战力更高的空闲装备 */
    getBetterEquip(): EquipmentWrapper[] {
        return GModel.hero
            .getIdleEquipment()
            .filter((t) => t.getPart() === this.getPart() && t.getBattlePoint() > this.getBattlePoint())
            .sort((a, b) => b.getBattlePoint() - a.getBattlePoint());
    }
    /**是否可升级 */
    canUpgrade(storage?: number) {
        return (
            !this.isEquipmentMaxLevel() &&
            this.upgradeCoinRequire().count <=
                (storage ? storage : GModel.knapsack.getStorageById(GIndex.id.heroEquipmentExpId))
        );
    }
    /**是否可升阶 */
    canUprank() {
        return (
            !this.isEquipmentMaxRank() &&
            this.getExpInfo().exp >= this.getExpInfo().require &&
            this.getUpgradeRankCoinRequire().count <= GModel.knapsack.getStorageById(GIndex.id.coinId) &&
            GModel.player.checkSystemUnlock(GConstant.systemId.equipmentUpstar, false, this.level)
        );
    }
}
