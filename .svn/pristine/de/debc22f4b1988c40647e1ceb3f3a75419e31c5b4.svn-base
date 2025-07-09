import { memory } from "../../framework/Decorator";
import BattleFactory from "../battleLogic/Utils/BattleFactory";
import { EnumFacilityType, EnumHeroProperty } from "../config/GEnum";
import { EquipmentWrapper } from "./Equipment";
import Item from "./Item";

export default class Hero {
    /** 英雄的唯一id */
    uniqueId: number;
    /** 英雄id */
    id: number;
    /** 英雄等级 */
    level: number;
    /** 英雄阶数 */
    rank: number;
    /** 英雄星数 */
    star: number;
    /** 英雄装备，如果这一栏没有装备，则数值为null */
    equipment: { id: number; level: number; rank: number }[];
    /** 使用的皮肤id（逻辑待定） */
    skinId: number;

    /**获取下一阶数 */
    getNextRankHero() {
        const res = GUtils.ts.shallowCopy(this);
        res.rank += 1;
        return res;
    }
    /**获取下一等级 */
    getNextLevelHero() {
        const res = GUtils.ts.shallowCopy(this);
        res.level += 1;
        return res;
    }
    /**获取下一星级 */
    getNextStarHero() {
        const res = GUtils.ts.shallowCopy(this);
        res.star += 1;
        return res;
    }
    /** 战斗力 */
    getBattlePoint(): number {
        const info = BattleFactory.getBattleObjectInfo(GState.data, this, 0);
        return BattleFactory.getBattlePoint(info);
    }
    /**是否上阵 */
    isFormated(): boolean {
        return !(GModel.hero.getFormation().findIndex((t) => t === this.uniqueId) === -1);
    }
    /**获取表数据 */
    getTbl() {
        const tbl = GTable.getById("HeroTbl", this.id);
        return tbl;
    }
    /**获取职业 */
    getKind(): string {
        return this.getTbl().kind;
    }
    /**获取图片资源 */
    getImg(): string {
        return this.getTbl().img;
    }
    /**获取品质 */
    getQuality(): number {
        return this.getTbl().quality;
    }

    /** 升星需求材料，包括碎片和金币，满星的时候返回null */
    getUpgradeStarCost(): Item[] {
        const starTbl = GTable.getList("HeroStarTbl").find((t) => t.level === this.star);
        if (starTbl.fragCost < 0) return null;
        const fragId = this.getTbl().frag;
        return [new Item(fragId, starTbl.fragCost), new Item(GIndex.id.coinId, starTbl.coinCost)];
    }
    // /**获取升星所需同名卡星级 */
    // getStarOfSameId(): number {
    //     let tbl = GTable.getList("HeroStarTbl").find((t) => t.level === this.star);
    //     return tbl.fixIdCost;
    // }
    // /**获取升星所需同品质卡星级 */
    // getStarOfSameQuality(): number {
    //     let tbl = GTable.getList("HeroStarTbl").find((t) => t.level === this.star);
    //     return tbl.qualityCost;
    // }
    // /**获取升星所需金币数量 */
    // getStarOfCoinCost(): number {
    //     let tbl = GTable.getList("HeroStarTbl").find((t) => t.level === this.star);
    //     return tbl.coinCost;
    // }
    /** 英雄是否达到了达到了当前阶数的等级上限 */
    isRankLevelLimit(): boolean {
        return this.level >= GConfig.hero.rankLevelLimit[this.rank];
    }
    getRankMaxLevel(): number {
        return GConfig.hero.rankLevelLimit[this.rank];
    }
    /** 英雄当前星级的等级上限 */
    getStarMaxLevel(): number {
        return GConfig.hero.starLevelLimit[this.star];
    }

    /** 英雄是否达到了当前星级的等级上限 */
    isStarLevelLimit(): boolean {
        return this.level >= GConfig.hero.starLevelLimit[this.star];
    }

    /** 英雄是否达到了最大等级 */
    isMaxLevel(): boolean {
        return this.level >= GConfig.hero.rankLevelLimit[GConfig.hero.rankLevelLimit.length - 1];
    }

    /** 英雄升级所需的材料数量，如果英雄已经达到满级，则返回null */
    upgradeRequire(): Item[] {
        const tbl = GTable.getList("HeroLevelTbl").find((t) => t.level[0] <= this.level && t.level[1] >= this.level);
        if (tbl) {
            const env = [{ lv: this.level }];
            return [
                new Item(GIndex.id.heroExpId, AstUtil.eval(tbl.require, env)),
                new Item(GIndex.id.coinId, AstUtil.eval(tbl.coinCost, env)),
            ];
        } else {
            return null;
        }
    }

    /** 英雄是否达到最大阶数 */
    isMaxRank(): boolean {
        return this.rank >= GConfig.hero.rankLevelLimit.length - 1;
    }

    /** 英雄升阶所需材料 */
    upgradeRankRequire(): Item[] {
        const tbl = GTable.getList("HeroRankTbl").find((t) => t.level === this.rank);
        if (tbl) {
            return [new Item(GIndex.id.heroRankExpId, tbl.require), new Item(GIndex.id.coinId, tbl.coinCost)];
        } else {
            return null;
        }
    }

    /** 英雄是否达到最大星级 */
    isMaxStar(): boolean {
        return this.star >= GTable.getList("HeroStarTbl").length - 1;
    }

    /** 获取当前技能等级 */
    getSkillLevel(): number[] {
        return BattleFactory.heroGetSkillLevel(this);
    }

    /** 获取属性 */
    getProperty(key: EnumHeroProperty): number {
        return BattleFactory.getProperty(GState.data, this, key);
    }

    /** 星级加成，属性万分比 */
    getStarBuff(): number {
        return GTable.getList("HeroStarTbl").find((t) => t.level === this.star).property;
    }

    /** 装备加成 */
    getEquipmentBuff(): { property: string; value: number }[] {
        const warpper = this.equipment
            .filter((t) => t)
            .map((t) => new EquipmentWrapper(t.id, t.level, t.rank, 1, this.uniqueId));
        const list = warpper.map((t) => t.getEquipmentProperty());
        const map: { [property: string]: number } = {};
        list.forEach((t) => {
            t.forEach((p) => {
                map[p.property] = (map[p.property] || 0) + p.value;
            });
        });
        const res = Object.keys(map).map((k) => {
            return { property: k, value: map[k] };
        });
        return res;
    }

    /** 阶数天赋的描述 */
    getRankTalent(rank: number): string[][] {
        const specialTbl = GTable.getList("HeroRankSpecialTbl").find((t) => t.rank === rank && t.heroId === this.id);
        if (specialTbl) {
            if (specialTbl.description.length > 0) return [[specialTbl.description]];
            const res = specialTbl.property
                .map((t) => {
                    return [[GIndex.battle.propertyText(t[0])], ["_rs+" + t[1] + " "]];
                })
                .reduce((p, c) => p.concat(c), []);
            return res;
        }
        const tbl = GTable.getList("HeroRankBuffTbl").find((t) => t.rank === rank && t.kind === this.getKind());
        if (tbl.description.length > 0) return [[tbl.description]];
        const res = tbl["quality" + this.getTbl().quality]
            .map((t) => {
                return [[GIndex.battle.propertyText(t[0])], ["_rs+" + t[1] + " "]];
            })
            .reduce((p, c) => p.concat(c), []);
        return res;
    }

    /** 普攻表格 */
    getNormalAttackTbl(): HeroSkillTbl {
        return BattleFactory.heroGetNormalAttackTbl(this);
    }

    /** 主技能表格 */
    getMainSkillTbl(): HeroSkillTbl {
        return BattleFactory.heroGetMainSkillTbl(this);
    }

    /** 主技能描述 */
    getMainSkillDescription(): string[] {
        const tbl = this.getMainSkillTbl();
        const skillLevel = this.getSkillLevel()[1];
        console.log([tbl.description].concat(tbl.descriptionParam[skillLevel - 1].map((t) => "_rs" + t)));

        return [tbl.description].concat(tbl.descriptionParam[skillLevel - 1].map((t) => "_rs" + t));
    }

    /** 普攻描述 */
    getNormalAttackDescription(): string[] {
        const tbl = this.getNormalAttackTbl();
        const skillLevel = this.getSkillLevel()[0];
        return [tbl.description].concat(tbl.descriptionParam[skillLevel - 1].map((t) => "_rs" + t));
    }

    /** 获取装备列表 */
    getEquipmentWrapper(): EquipmentWrapper[] {
        return this.equipment.map((e) => (e ? new EquipmentWrapper(e.id, e.level, e.rank, 1, this.uniqueId) : null));
    }

    /** 获取特定部位的装备 */
    getEquipmentWrapperByPart(part: number): EquipmentWrapper {
        const e = this.equipment[part];
        if (!e) return null;
        return new EquipmentWrapper(e.id, e.level, e.rank, 1, this.uniqueId);
    }

    /** 上阵该角色到建筑时可以获取多少倍的buff */
    getFacilityBuff(facilityId: number): number {
        const tbl = GTable.getList("FacilityHeroLevelBuffTbl").find((t) => t.level === this.rank);
        const facilityTbl = GTable.getById("FacilityTbl", facilityId);
        if (tbl) {
            const qualityBuff = GConfig.facility.heroQualityBuff[this.getTbl().quality] * 0.0001;
            if (facilityTbl.kind === EnumFacilityType.restaurant) {
                return tbl.eat * qualityBuff;
            } else if (facilityTbl.kind === EnumFacilityType.hospital) {
                return tbl.heal * qualityBuff;
            } else {
                return tbl.produce * 0.0001 * qualityBuff;
            }
        } else {
            if (facilityTbl.kind === EnumFacilityType.restaurant) {
                return 0;
            } else if (facilityTbl.kind === EnumFacilityType.hospital) {
                return 0;
            } else {
                return 1;
            }
        }
    }

    /** 获取建筑buff的描述 */
    getFacilityBuffString(facilityId: number): string[][] {
        const value = this.getFacilityBuff(facilityId);
        const facilityTbl = GTable.getById("FacilityTbl", facilityId);
        if (facilityTbl.kind === EnumFacilityType.restaurant) {
            return [[GLang.code.ui.building_recovery_satiety], ["_rs+" + GUtils.ui.getFixed(value, 2)]];
        } else if (facilityTbl.kind === EnumFacilityType.hospital) {
            return [[GLang.code.ui.building_recovery_health], ["_rs+" + GUtils.ui.getFixed(value, 2)]];
        } else {
            return [[GLang.code.ui.facility_production], ["_rs+" + GUtils.ui.getFixed((value - 1) * 100, 2) + "%"]];
        }
    }

    /** 获取其他战斗技能 */
    getOtherBattleSkill(): number[] {
        return BattleFactory.heroGetOtherBattleSkill(this);
    }
    /**获取星级 */
    getStarItem(status: number): { level: number; status: number }[] {
        let starState: { level: number; status: number }[] = [];
        for (let i = 0; i < 5; i++) {
            starState.push({ level: 0, status: status });
        }
        for (let j = 0; j <= this.star; j++) {
            if (j > 0) {
                j % 5 === 0 ? starState[4].level++ : starState[(j % 5) - 1].level++;
            }
        }
        return starState;
    }
    /**能否升级 */
    canUpgrade(): boolean {
        return (
            !this.isRankLevelLimit() &&
            !this.isMaxLevel() &&
            !this.upgradeRequire().some((c) => c.count > GModel.knapsack.getStorageById(c.id))
        );
    }
    /**能否升星 */
    canUpstar(): boolean {
        return (
            !this.isMaxStar() &&
            GModel.player.checkSystemUnlock(GConstant.systemId.heroUpstar, false) &&
            !this.getUpgradeStarCost().some((c) => c.count > GModel.knapsack.getStorageById(c.id))
        );
    }
    /**能否升阶 */
    canUprank(): boolean {
        return (
            !this.isMaxRank() &&
            this.isRankLevelLimit() &&
            GModel.player.checkSystemUnlock(GConstant.systemId.heroUprank, false, this.level) &&
            !this.upgradeRankRequire().some((c) => c.count > GModel.knapsack.getStorageById(c.id))
        );
    }
    /**是否有装备可穿戴 */
    canEquip(): boolean {
        let noEquipPart = this.getEquipmentWrapper().findIndex((e) => e === null);
        return (
            noEquipPart !== -1 && GModel.hero.getIdleEquipment().filter((e) => e.getPart() === noEquipPart).length > 0
        );
    }
    /**是否可上阵 */
    canFormat(): boolean {
        let formatlimit = GConstant.formationLimit;
        let formationUnlock = GConfig.hero.formationUnlock;
        let facility = GModel.facility.captainRank();
        return formatlimit[this.getKind()].some(
            (limit) => formationUnlock[limit] <= facility && GModel.hero.getFormation()[limit] === -1
        );
    }
}
