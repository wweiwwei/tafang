import EventBus from "../../framework/event/EventBus";
import Facility from "../entity/Facility";
import Item from "../entity/Item";
import EventName from "../event/EventName";
import WindowBattleScene from "../module/battle/WindowBattleScene";
import WindowSettlement from "../module/battle/WindowSettlement";
import WindowCongratulation from "../module/common/WindowCongratulation";
import WindowStory2 from "../module/story/WindowStory2";

export default class FacilityModel {
    /** 建筑位置信息 */
    positionInfo: Map<
        number,
        {
            pos: number[];
            rect: cc.Rect;
            obstacle: cc.Rect[];
        }
    > = new Map();

    /** 设置建筑位置信息 */
    setPositionInfo(id: number, pos: number[], rect: cc.Rect, obstacle: cc.Rect[]) {
        this.positionInfo.set(id, { pos, rect, obstacle });
    }

    /** 获取建筑位置信息 */
    getPositionInfo(id: number): { pos: number[]; rect: cc.Rect; obstacle: cc.Rect[] } {
        return this.positionInfo.get(id);
    }

    /** 占领建筑 */
    async occupyFacility(id: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const processor = GModel.battle.createFacilityBattle(id);
            GWindow.open(WindowBattleScene, {
                startOnInit: true,
                processor,
                battleType: "facility",
                disableAutoClose: true,
                battleEndCallBack: async (win) => {
                    GAudio.playMusic("main");
                    if (win) {
                        const { reward, survivor } = await GApi.facility.occupyFacility({ id });
                        if (id === GConstant.build.ID_BUILD_CANTEEN) {
                            GWindow.get(WindowBattleScene)["bulletMap"].forEach((b) => b.recycle());
                            GWindow.get(WindowBattleScene)["bulletMap"].clear();
                            GWindow.open(WindowStory2).then((v) => {
                                GModel.guide.triggerDialogue(6, id);
                                GWindow.close(WindowBattleScene);
                            });
                            resolve(true);
                        } else {
                            GWindow.open(WindowSettlement, {
                                isWin: win,
                                reward,
                                text: [
                                    [GLang.code.ui.victory_conclusion],
                                    survivor > 0 && [GLang.code.ui.victory_conclusion2, "_rs" + survivor],
                                ],
                            }).then((v) => {
                                GModel.guide.triggerDialogue(6, id);
                                GWindow.close(WindowBattleScene);
                            });
                            resolve(true);
                        }
                    } else {
                        GWindow.open(WindowSettlement, { isWin: win }).then((v) => {
                            GWindow.close(WindowBattleScene);
                        });
                        resolve(false);
                    }
                },
            });
        });
    }

    /** 建筑守卫战斗力 */
    getFacilityGuardBattlePoint(id: number) {
        const tbl = GTable.getById("FacilityTbl", id);
        const waveTbl = GTable.getById("MonsterWaveTbl", tbl.guard);
        const env = [{ lv: tbl.monsterLv }];
        return GModel.battle.getMonsterBattlePointByWave(waveTbl, env);
    }

    /** 建筑升级 */
    async upgradeFacility(id: number): Promise<void> {
        await GApi.facility.upgradeFacility({ id });
    }

    /** 建筑升阶 */
    async upgradeFacilityRank(id: number): Promise<void> {
        const reward = await GApi.facility.upgradeFacilityRank({ id });
        let facility = GModel.facility.getFacilityById(id);
        if (id === GConstant.captainId) {
            GSDK.report({ kind: "captainRank", data: { lv: facility.rank } });
        }
        GModel.giftPack.packTrigger(2, [facility.id, facility.rank]);
        reward.length > 0 && reward.forEach((r) => GTip.showRewardItem(r));
    }

    /** 建筑升星 */
    upgradeFacilityStar(id: number): Promise<void> {
        const facility = this.getFacilityById(id);
        const lvRequire = GConfig.facility.facilityUpgradeStarRequire[facility.star];
        if (facility.lv < lvRequire) {
            GTip.showTip([GLang.code.ui.facility_upStar_require, facility.getTbl().level1Name, "_rs" + lvRequire]);
            return;
        }
        return GApi.facility.upgradeFacilityStar({ id });
    }

    /** 获取所有建筑 */
    getAllFacility(): Facility[] {
        return Object.keys(GState.data.facility).map((id) => {
            let facility: Facility = GState.data.facility[id];
            return facility;
        });
    }

    /** 根据id获取建筑数据 */
    getFacilityById(id: number): Facility {
        return GState.data.facility[id];
    }

    getFacilityStorageById(id: number): number {
        return GState.data.facilityStorage[id] || 0;
    }

    /** 收获建筑产出 */
    harvest(id: number): Promise<Item[]> {
        return GApi.facility.harvest({ id });
    }

    /** 在线结算 */
    onlineSettle(produce: { [id: number]: number }, stamp: number): Promise<{ success: boolean }> {
        return GApi.facility.onlineSettle({ produce: { data: produce }, stamp });
    }

    /** 生存者记录 */
    saveSurvivor(data: string): Promise<void> {
        return GApi.facility.saveSurvivor({ data });
    }

    /** 更换建筑入驻的英雄 */
    async changeHero(facilityId: number, heroUniqueId: number): Promise<void> {
        const originHero = this.getFacilityById(facilityId).hero;
        await GApi.facility.changeHero({ facilityId, heroUniqueId });
        EventBus.emit(EventName.removeSceneHero, originHero);
        if (heroUniqueId !== -1) {
            EventBus.emit(EventName.addSceneHero, heroUniqueId);
        }
    }

    /** 增加建筑的工人数量 */
    async addSurvivorToWork(facilityId: number, count: number) {
        const { idle } = GModel.survivor.getSurvivorWorkingState();
        if (idle < count) {
            const ok = await GModel.survivor.videoAddSurvivor();
            if (ok) {
                await GApi.facility.addSurvivorToWork({ facilityId, count });
            }
        } else {
            await GApi.facility.addSurvivorToWork({ facilityId, count });
        }
    }

    /** 减少建筑的工人数量 */
    async subSurvivorToWork(facilityId: number, count: number) {
        await GApi.facility.subSurvivorToWork({ facilityId, count });
    }

    /**
     * 获取生产物品信息
     * itemId 物品id
     * storage 库存
     * produce 生产速度
     * cost 消耗
     * */
    getProduceInfo(): { itemId: number; storage: number; produce: number; cost: number }[] {
        const costMap: Map<number, number> = new Map();
        const list1 = this.getAllFacility()
            .filter((f) => f.unlock && f.produce())
            .map((f) => {
                const produce = f.finalProduce();
                const cost = f.finalMaterialCost();
                if (cost) {
                    costMap.set(cost.id, cost.count * f.getProduceCount());
                }
                let itemCost: number = 0;
                if (GConstant.build.ID_BUILD_WATER === f.id) {
                    itemCost = this.getWaterInfo().cost * 2;
                } else if (GConstant.build.ID_BUILD_GREENHOUSE === f.id) {
                    itemCost = this.getFacilityById(GConstant.build.ID_BUILD_CANTEEN).materialCost().count * 2;
                }
                return {
                    itemId: produce.id,
                    storage: GModel.knapsack.getStorageById(produce.id),
                    produce: produce.count * 2 * f.getProduceCount(),
                    cost: itemCost,
                };
            });

        const list2 = GModel.stage
            .getAllStage()
            .filter((s) => s.stageIndex > 0)
            .map((s) => {
                return {
                    itemId: s.produceId(),
                    storage: GModel.knapsack.getStorageById(s.produceId()),
                    produce: s.produce().count,
                    cost: costMap.get(s.produceId()) * 2 || 0,
                };
            });
        return list1.concat(list2);
    }

    /**
     * 获取建筑维持消耗专题太
     * foodIngredients 食材
     * food 食物
     * water 水
     * 0 绿色，1 黄色，2 红色
     * */
    getMaintainInfo(): { foodIngredients: number; food: number; water: number } {
        const getTypeNum = (ratio: number) => {
            if (ratio >= 1) {
                return 0;
            } else if (ratio >= 0.7) {
                return 1;
            } else {
                return 2;
            }
        };
        const waterInfo = this.getWaterInfo();
        const waterRatio = waterInfo.produce / waterInfo.cost;
        const foodCount = this.getFacilityStorageById(GConstant.build.ID_BUILD_CANTEEN);
        const foodRatio = foodCount / GModel.survivor.getAllSurvivor().length;
        // const fiFacility = this.getFacilityById(GConstant.build.ID_BUILD_GREENHOUSE);
        // const foodIngredientsProduce = fiFacility.produce().count * fiFacility.workCount();
        const foodFacility = this.getFacilityById(GConstant.build.ID_BUILD_CANTEEN);
        const foodProduce = foodFacility.produce().count * foodFacility.workCount();
        const fiRatio =
            GModel.knapsack.getStorageById(GConstant.foodIngredientsId) /
            (foodProduce * foodFacility.getTbl().materialCost);
        return { foodIngredients: getTypeNum(fiRatio), food: getTypeNum(foodRatio), water: getTypeNum(waterRatio) };
    }

    /** 获取水的产量和消耗信息 */
    getWaterInfo(): { produce: number; cost: number } {
        const wf = this.getFacilityById(GConstant.build.ID_BUILD_WATER);
        const produce = wf.finalProduce().count;
        const cost = GUtils.array
            .chain(this.getAllFacility())
            .filter((f) => f.unlock)
            .sumBy((f) => f.waterCost().count);
        return { produce, cost };
    }

    /** 船长室等级 */
    captainRank() {
        return this.getFacilityById(GConstant.build.ID_BUILD_CAPTAIN).rank;
    }
}
