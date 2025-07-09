import { memory } from "../../framework/Decorator";
import { EnumFacilityProperty, EnumFacilityType } from "../config/GEnum";
import Item from "./Item";

export default class Facility {
    /** 建筑的id */
    id: number;
    /** 建筑是否已解锁 */
    unlock: boolean;
    /** 建筑等级 */
    lv: number;
    /** 建筑星级 */
    star: number;
    /** 建筑阶数 */
    rank: number;
    /** 入驻建筑的英雄uniqueId */
    hero: number;

    getNextFacility() {
        const res = GUtils.ts.shallowCopy(this);
        res.lv += 1;
        return res;
    }

    /** ast环境 */
    private env(): any {
        return {
            lv: this.lv,
            rank: this.rank,
            star: this.star,
        };
    }

    /** buff环境 */
    private buffEnv(buffKind: number): any {
        const tbl = this.getTbl();
        const levelTblList = GTable.getList("FacilityLevelTbl").filter(
            (t) => t.facilityId === this.id && t.level[0] <= this.lv
        );
        const starTblList = GTable.getList("FacilityStarTbl").filter(
            (t) => t.facilityId === this.id && t.star <= this.star
        );
        const list = levelTblList.filter((t) => t.facilityId === this.id && Number(t.value[0]) === buffKind);
        let baseValue = 0;
        if (list.length > 0) {
            baseValue = AstUtil.eval(list[list.length - 1].value[1], [this.env()]);
        } else {
            const d = tbl.baseProperty.find((l) => l[0] === buffKind);
            baseValue = d ? d[1] : 0;
        }
        const levelAddBuff = GUtils.array
            .chain(levelTblList)
            .filter((t) => t.level[0] < this.lv && t.maxValue[0] === buffKind && t.maxValue[1] === 1)
            .map((t) => {
                const maxScale = Math.round((t.level[1] - t.level[0]) / 10);
                const floorLv = Math.floor(this.lv / 10) * 10;
                const buffScale = Math.min(maxScale, Math.round((floorLv - t.level[0]) / 10));
                return t.maxValue[2] * buffScale;
            })
            .sum();
        const levelMulBuff = GUtils.array
            .chain(levelTblList)
            .filter((t) => t.level[0] < this.lv && t.maxValue[0] === buffKind && t.maxValue[1] === 2)
            .map((t) => {
                const maxScale = Math.round((t.level[1] - t.level[0]) / 10);
                const floorLv = Math.floor(this.lv / 10) * 10;
                const buffScale = Math.min(maxScale, Math.round((floorLv - t.level[0]) / 10));
                return t.maxValue[2] * buffScale;
            })
            .sum();
        const starAddBuff = GUtils.array.sum(
            starTblList.filter((t) => t.reward[0] === buffKind && t.reward[1] === 1).map((t) => t.reward[2])
        );
        const starMulBuff = GUtils.array.sum(
            starTblList.filter((t) => t.reward[0] === buffKind && t.reward[1] === 2).map((t) => t.reward[2])
        );
        const h = GModel.hero.getHeroByUniqueId(this.hero);
        let heroBuff = 0;
        if (buffKind === EnumFacilityProperty.produce) {
            heroBuff = h ? h.getFacilityBuff(this.id) : 1;
        } else if (buffKind === EnumFacilityProperty.illnessRecover) {
            heroBuff = h ? h.getFacilityBuff(this.id) : 0;
        } else if (buffKind === EnumFacilityProperty.satietyRecover) {
            heroBuff = h ? h.getFacilityBuff(this.id) : 0;
        }
        return {
            base: baseValue,
            lvAdd: levelAddBuff,
            starAdd: starAddBuff,
            lvMul: levelMulBuff * 0.0001,
            starMul: starMulBuff * 0.0001,
            hero: heroBuff,
        };
    }
    /**建筑类型 */
    getKind(): number {
        return this.getTbl().kind;
    }
    /**建筑表格 */
    getTbl(): FacilityTbl {
        return GTable.getById("FacilityTbl", this.id);
    }

    propertyByKind(kind: number): number {
        let res = 0;
        const tbl = this.getTbl();
        if (tbl.kind === EnumFacilityType.captain || tbl.kind === EnumFacilityType.entrance) {
            return 0;
        } else {
            const buffEnv = this.buffEnv(kind);
            const formula = GTable.getList("FacilityBuffTbl").find((t) => t.buffKind == kind).config;
            res = AstUtil.eval(formula, [buffEnv]);
            if (GTest.fDebug) {
                GLog.debug(
                    `建筑属性计算:\nid:${this.id} buff类型:${kind}\n计算公式:${formula}\n计算结果:${res}\n各项buff详情:`,
                    buffEnv,
                    `\n公式代入:${Object.keys(buffEnv).reduce((p, c) => {
                        return p.replace(new RegExp(c, "g"), buffEnv[c]);
                    }, formula)}`
                );
            }
            return res;
        }
    }

    /** 工作人数上限，生产建筑，食堂有这个数值 */
    @memory
    workerLimit(): number {
        return Math.floor(this.propertyByKind(EnumFacilityProperty.workerLimit));
    }

    /** 当前建筑的工作人数 */
    workCount() {
        return GModel.survivor.getAllSurvivor().filter((s) => s.info.buildId === this.id && s.isALive()).length;
    }

    getFacilityWorkingInfo(): { facilityId: number; working: number; canNotWork: number; wokerLimit: number } {
        return {
            facilityId: this.id,
            working: this.workCount(),
            canNotWork: 0,
            wokerLimit: this.workerLimit(),
        };
    }

    /** 可服务客户上限（医院，宿舍，食堂有这个数值） */
    @memory
    clientLimit(): number {
        const tbl = GTable.getById("FacilityTbl", this.id);
        if (tbl.kind === EnumFacilityType.dormitory) {
            return Math.floor(this.propertyByKind(EnumFacilityProperty.dormClientLimit));
        } else if (tbl.kind === EnumFacilityType.hospital) {
            return Math.floor(this.propertyByKind(EnumFacilityProperty.hospitalClientLimit));
        } else if (tbl.kind === EnumFacilityType.restaurant) {
            return Math.floor(this.propertyByKind(EnumFacilityProperty.mealClientLimit));
        }
        return 0;
    }

    /** 当前建筑的服务客户数量，宿舍为当前入住人数，医院为当前治疗人数，食堂为当前吃饭人数 */
    clientCount() {
        const tbl = GTable.getById("FacilityTbl", this.id);
        if (tbl.kind === EnumFacilityType.dormitory) {
            return GModel.survivor.getAllSurvivor().filter((s) => s.info.dormId === this.id && s.isALive()).length;
        } else if (tbl.kind === EnumFacilityType.hospital) {
            // todo 排队逻辑
            return GModel.survivor.getAllSurvivor().filter((s) => s.fsm.state === "heal").length;
        } else if (tbl.kind === EnumFacilityType.restaurant) {
            // todo 排队逻辑
            return GModel.survivor.getAllSurvivor().filter((s) => s.fsm.state === "eat").length;
        }
        return 0;
    }

    /** 食物份数生产上限，食堂有这个数值 */
    @memory
    mealLimit(): number {
        return Math.floor(this.propertyByKind(EnumFacilityProperty.mealLimit));
    }

    /** 疲劳值恢复速度，宿舍有这个数值 */
    @memory
    fatigueRecover(): number {
        return this.propertyByKind(EnumFacilityProperty.fatigueRecover);
    }

    /** 饱足度恢复速度，食堂有这个数值 */
    @memory
    satietyRecover(): number {
        return this.propertyByKind(EnumFacilityProperty.satietyRecover);
    }

    /** 疾病度恢复速度，医院有这个数值 */
    @memory
    illnessRecover(): number {
        return this.propertyByKind(EnumFacilityProperty.illnessRecover);
    }

    /** 每分钟产量 */
    @memory
    produce(): Item | null {
        const tbl = this.getTbl();
        if (tbl.produceId > 0) {
            return new Item(tbl.produceId, Math.floor(this.propertyByKind(EnumFacilityProperty.produce)));
        } else {
            return null;
        }
    }

    /** 一个游戏小时产出多少次 */
    getProduceCount() {
        const res = this.getTbl().produceCount;
        return res > 0 ? res : 1;
    }

    /** 最终产量，计算了工作人数 */
    finalProduce(): Item | null {
        const workCount = GModel.survivor
            .getAllSurvivor()
            .filter((s) => s.info.buildId === this.id && s.info.state !== "heal").length;
        const produce = this.produce();
        if (!produce) return null;
        return new Item(produce.id, produce.count * workCount);
    }

    /** 每分钟消耗水 */
    @memory
    waterCost(): Item {
        const levelTbl = GTable.getList("FacilityLevelTbl").find(
            (t) => t.facilityId === this.id && t.level[0] <= this.lv && t.level[1] >= this.lv
        );
        if (!levelTbl) return new Item(GConstant.waterId, 0);
        if (levelTbl.maintenance === "") return new Item(GConstant.waterId, 0);
        return new Item(GConstant.waterId, Math.ceil(AstUtil.eval(levelTbl.maintenance, [this.env()])));
    }

    /** 每分钟消耗材料 */
    @memory
    materialCost(): Item | null {
        const tbl = GTable.getById("FacilityTbl", this.id);
        if (tbl.materialId <= 0) return null;
        const produce = this.produce();
        return new Item(tbl.materialId, Math.ceil(produce.count * tbl.materialCost));
    }

    /** 最终材料消耗，计算了工作人数 */
    finalMaterialCost(): Item | null {
        const tbl = GTable.getById("FacilityTbl", this.id);
        if (tbl.materialId <= 0) return null;
        const produce = this.finalProduce();
        return new Item(tbl.materialId, Math.ceil(produce.count * tbl.materialCost));
    }

    /** 等级是否达到上限 */
    isLvLimit(): boolean {
        return this.lv >= this.rankLevelLimit();
    }

    /** 升级消耗，满级时返回null */
    lvUpgradeCost(): Item[] | null {
        const levelTbl = GTable.getList("FacilityLevelTbl").find(
            (t) => t.facilityId === this.id && t.level[0] <= this.lv + 1 && t.level[1] >= this.lv + 1
        );
        if (!levelTbl) return null;
        return levelTbl.cost.map((list) => new Item(Number(list[0]), Math.round(AstUtil.eval(list[1], [this.env()]))));
    }

    /** 当前阶数等级的上限 */
    rankLevelLimit(): number {
        return GConfig.facility.rankLevelLimit[this.rank];
    }

    /** 升阶是否需要提升船长室阶数 */
    isNeedUpgradeCaptainRank(): boolean {
        const tbl = GTable.getById("FacilityTbl", this.id);
        if (tbl.kind === EnumFacilityType.captain) {
            return false;
        }
        const captainId = GConstant.captainId;
        const captainRank = GModel.facility.getFacilityById(captainId).rank;
        return captainRank <= this.rank;
    }

    /** 是否达到最大阶数 */
    isMaxRank(): boolean {
        return this.rank >= GTable.getList("FacilityRankTbl").filter((v) => v.facilityId === this.id).length - 1;
    }

    /** 升阶消耗，满阶时返回null */
    upgradeRankCost(): Item[] | null {
        if (this.isMaxRank()) {
            return null;
        }
        const rankTbl = GTable.getList("FacilityRankTbl").find((t) => t.facilityId === this.id && t.rank === this.rank);
        return Item.fromItemArray(rankTbl.cost);
    }

    /** 升星消耗，满星时返回null */
    upgradeStartCost(): Item[] | null {
        if (this.isMaxStar()) {
            return null;
        }
        const starTbl = GTable.getList("FacilityStarTbl").find((t) => t.star === this.star + 1);
        return Item.fromItemArray(starTbl.cost);
    }

    /** 是否达到最大星级 */
    isMaxStar(): boolean {
        return !GTable.getList("FacilityStarTbl").some((t) => t.star === this.star + 1);
    }

    // /** 库存物品 */
    // storageItem(): Item | null {
    //     const tbl = GTable.getById("FacilityTbl", this.id);
    //     if (tbl.kind === EnumFacilityType.captain || tbl.kind === EnumFacilityType.material) {
    //         return new Item(this.getTbl().produceId, this.storage);
    //     } else {
    //         return null;
    //     }
    // }

    /**
     * 建筑是否可以解锁
     * @param tip 不可解锁的时候是否弹出提示
     * */
    isFacilityUnlockable(tip: boolean): boolean {
        const captain = GModel.facility.getFacilityById(GConstant.build.ID_BUILD_CAPTAIN);
        const tbl = this.getTbl();
        if (captain.rank < tbl.captainRankRequire) {
            if (tip) {
                GTip.showTip([GLang.code.ui.facility_can_not_unlock, "_rs" + tbl.captainRankRequire]);
            }
            return false;
        } else {
            return true;
        }
    }
    /**
     * 建筑是否可以解锁，添加额外判断条件
     * @param tip 不可解锁的时候是否弹出提示
     * */
    isFacilityUnlockableEx(tip: boolean): boolean {
        const isCaptainOk = this.isFacilityUnlockable(tip);
        if (!isCaptainOk) return false;
        const tbl = this.getTbl();
        if (tbl.pre.length > 0) {
            const preF = GModel.facility.getFacilityById(tbl.pre[1]);
            const preTbl = preF.getTbl();
            if (tbl.pre[0] === 1) {
                if (preF.rank < tbl.pre[2]) {
                    if (tip) {
                        GTip.showTip([GLang.code.ui.facility_unlock_tip1, preTbl.name, "_rs" + tbl.pre[2]]);
                    }
                    return false;
                }
            } else if (tbl.pre[0] === 2) {
                if (preF.lv < tbl.pre[2]) {
                    if (tip) {
                        GTip.showTip([
                            GLang.code.ui.facility_unlock_tip2,
                            preTbl.name,
                            preTbl.level1Name,
                            "_rs" + tbl.pre[2],
                        ]);
                    }
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * 获取下一阶可以解锁的建筑，船长室可用
     */
    getUnlockableFacility(): number[] {
        const tbl = this.getTbl();
        if (tbl.kind !== EnumFacilityType.captain) return null;
        const unlock = GTable.getList("FacilityTbl")
            .filter((t) => t.captainRankRequire === this.rank + 1)
            .map((t) => t.id);
        return unlock;
    }

    /** 获取等级数值 */
    getLevelValue(): number[] {
        const lvTbl = GTable.getList("FacilityLevelTbl").find(
            (t) => t.facilityId === this.id && t.level[0] <= this.lv && t.level[1] >= this.lv
        );
        if (!lvTbl) return [];
        return [Number(lvTbl.value[0]), this.propertyByKind(Number(lvTbl.value[0]))];
    }
    /** 获取最大等级 */
    getMaxLevel(): number[] {
        const lvTbl = GTable.getList("FacilityLevelTbl").find(
            (t) => t.facilityId === this.id && t.level[0] <= this.lv && t.level[1] >= this.lv
        );
        if (!lvTbl) return [];
        return lvTbl.maxValue;
    }
    /** 获取星级数值 */
    getStarValue(): number[] {
        const lvTbl = GTable.getList("FacilityStarTbl").find(
            (t) => t.facilityId === this.id && (this.isMaxStar() ? t.star === this.star : t.star === this.star + 1)
        );
        if (!lvTbl) return [];
        return lvTbl.reward;
    }

    /** 获取等级数值 */
    getUnlockReward(): Item[] {
        return Item.fromItemArray(this.getTbl().reward);
    }
    /**是否达到可升星阶数 */
    isRankToUpstar(): boolean {
        return this.rank >= GConfig.facility.facilityUpstarPremise;
    }
    /**可否升级 */
    canUpgrade(): boolean {
        if (this.getKind() === EnumFacilityType.captain || this.getKind() === EnumFacilityType.entrance) return false;
        return (
            this.unlock &&
            !this.isLvLimit() &&
            this.lvUpgradeCost().find((t) => GModel.knapsack.getStorageById(t.id) < t.count) === undefined
        );
    }
    /**可否升星 */
    canUpstar(): boolean {
        if (this.getKind() === EnumFacilityType.captain || this.getKind() === EnumFacilityType.entrance) return false;
        return (
            this.unlock &&
            !this.isMaxStar() &&
            this.upgradeStartCost().find((t) => GModel.knapsack.getStorageById(t.id) < t.count) === undefined &&
            this.isRankToUpstar() &&
            this.lv >= GConfig.facility.facilityUpgradeStarRequire[this.star]
        );
    }
    /**可否升阶 */
    canUprank(): boolean {
        if (this.getKind() !== EnumFacilityType.entrance) {
            if (this.getKind() === EnumFacilityType.captain)
                return (
                    !this.isMaxRank() &&
                    GModel.facility
                        .getAllFacility()
                        .filter(
                            (t) => t.getKind() !== EnumFacilityType.entrance && t.getKind() !== EnumFacilityType.captain
                        )
                        .find((t) => t.unlock && !t.isNeedUpgradeCaptainRank()) === undefined
                );
            return (
                this.unlock &&
                !this.isMaxRank() &&
                this.isLvLimit() &&
                !this.isNeedUpgradeCaptainRank() &&
                this.upgradeRankCost().find((t) => GModel.knapsack.getStorageById(t.id) < t.count) === undefined
            );
        }
    }
}
