import { autowired, message, registerClass } from "../../../framework/Decorator";
import EventBus from "../../../framework/event/EventBus";
import ResourceLoader from "../../../framework/ResourceLoader";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UIWindow from "../../../framework/ui/UIWindow";
import UISpine from "../../../framework/ui/UISpine";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import { EnumFacilityType } from "../../config/GEnum";
import Facility from "../../entity/Facility";
import Item from "../../entity/Item";
import EventName from "../../event/EventName";
import ListItemBuildThumb from "../build/ListItemBuildThumb";
import ListItemPeople from "../common/ListItemPeople";
import ListItemProduct from "./ListItemProduct";
import WindowBuildingUpdate from "./WindowBuildingUpdate";
import WindowItemDescription from "../common/WindowItemDescription";
import WindowAppointHero from "../build/WindowAppointHero";

const { ccclass, property } = cc._decorator;

@registerClass("WindowBuildingDetail")
@ccclass
export default class WindowBuildingDetail extends UIWindow {
    // static defaultOpentOption: Partial<WindowOpenOption> = {
    //     animation: WindowOpenAnimationEnum.default,
    // };
    _windowParam: {
        id: number;
    };
    _returnValue: any;
    @autowired(UIButton) leftArrow: UIButton = null;
    @autowired(UIButton) rightArrow: UIButton = null;
    /**选择英雄 */
    @autowired(UIButton) set_hero: UIButton = null;
    /** 英雄等级*/
    @autowired(UILabel) heroLevel: UILabel = null;
    /** 英雄产量*/
    @autowired(UILabel) heroProduction: UILabel = null;
    /** 英雄产出物品*/
    @autowired(UIImage) heroGain: UIImage = null;
    /**建筑图标 */
    @autowired(UIImage) buildingImg: UIImage = null;
    /** 建筑名*/
    @autowired(UILabel) buildingName: UILabel = null;
    /** 建筑阶数*/
    @autowired(UILabel) buildingRank: UILabel = null;
    /**建筑升阶按钮 */
    @autowired(UIButton) upRank: UIButton = null;
    /**感叹号 */
    @autowired(UIImage) exclamation: UIImage = null;
    /** 成本列表容器*/
    @autowired(UIList) productList: UIList<ListItemProduct> = null;
    /** 增加工作员工数量按钮*/
    @autowired(UIButton) plus: UIButton = null;
    /** 减少工作员工数量按钮*/
    @autowired(UIButton) decrease: UIButton = null;
    /** 工作员工列表容器*/
    @autowired(UIList) peopleList: UIList<ListItemPeople> = null;
    /** 工作员工区域*/
    @autowired(cc.Node) surivivor: cc.Node = null;
    /** 建筑功能描述 */
    @autowired(cc.Node) buildNote: cc.Node = null;
    /** 船长建筑描述 */
    @autowired(cc.Node) captain: cc.Node = null;
    /**船长室升级 */
    @autowired(cc.Node) captainUp: cc.Node = null;
    /**船长室升级红点 */
    @autowired(UIImage) captainExclamation: UIImage = null;
    /**船长室可解锁建筑列表 */
    @autowired(UIScrollList) captainUpBuildList: UIScrollList<ListItemBuildThumb> = null;
    /**船长室升阶所需建筑列表 */
    @autowired(UIScrollList) captainUpBuildList2: UIScrollList<ListItemBuildThumb> = null;
    /**船长室升阶消耗 */
    @autowired(cc.Node) captainCost: cc.Node = null;
    @autowired(UIImage) powerbg: UIImage = null;
    /** 产出节点*/
    @autowired(cc.Node) productBg: cc.Node = null;
    /**进阶进度条 */
    @autowired(cc.ProgressBar) uprankProgress: cc.ProgressBar = null;
    /** 任命员工 */
    @autowired(UIButton) appointHero: UIButton = null;
    /** 英雄spine */
    @autowired(UISpine) heroSpine: UISpine = null;
    /** 幸存者感叹号*/
    @autowired(UIImage) plusExclamation: UIImage = null;
    /** 可安排*/
    @autowired(UILabel) canAppoint: UILabel = null;
    /** 等级*/
    @autowired(UILabel) locked: UILabel = null;
    @autowired(cc.Node) level: cc.Node = null;
    show(): Promise<void> {
        return new Promise((resolve, reject) => {
            const node = this.node.getChildByName("content").getChildByName("node");
            const winSize = CC_EDITOR ? GConstant.designSize : cc.winSize;
            node.setPosition(0, -1000);
            node.opacity = 0;
            cc.tween(node)
                .to(0.12, { y: -winSize.height / 2, opacity: 255 }, { easing: "sineInOut" })
                .to(0.16, { y: -winSize.height / 2 - 12 }, { easing: "sineInOut" })
                .call(resolve)
                .start();
        });
    }
    hide(): Promise<void> {
        return new Promise((resolve, reject) => {
            const node = this.node.getChildByName("content").getChildByName("node");
            const winSize = CC_EDITOR ? GConstant.designSize : cc.winSize;
            cc.tween(node)
                .to(0.12, { y: -winSize.height / 2 }, { easing: "sineInOut" })
                .to(0.16, { y: -1000, opacity: 0 }, { easing: "sineInOut" })
                .call(resolve)
                .start();
        });
    }
    private facility: Facility;
    private peopleaArr: { empty: boolean }[] = [];
    private count: number = 2;
    private __curBuildNote: cc.Node = null;
    protected onInited(): void {
        this.windowInit();
        // this.refreshProduct();
        this.btnInit();
        this.showNote();
    }
    @message([EventName.stateKey.facility])
    windowInit() {
        this.refreshSurivivor();
        let facility = GModel.facility.getFacilityById(this._windowParam.id);
        this.uprankProgress.node.active = facility.getKind() !== EnumFacilityType.captain;
        this.uprankProgress.progress =
            facility.rank > 0
                ? (facility.lv - GConfig.facility.rankLevelLimit[facility.rank - 1]) /
                  (GConfig.facility.rankLevelLimit[facility.rank] - GConfig.facility.rankLevelLimit[facility.rank - 1])
                : facility.lv / GConfig.facility.rankLevelLimit[facility.rank];
        this.heroSpine.node.active = false;
        this.appointHero.onClick = () => {
            // GWindow.open(WindowAppointHero, { build: facility });
        };
        //左上角的英雄处理
        if (facility.getTbl().enableHero) {
            this.heroLevel.setText(["_rs0"]);
            this.appointHero.node.children[0].active = true;
            if (facility.hero != -1) {
                let hero = GModel.hero.getHeroByUniqueId(facility.hero);
                this.heroLevel.setText(["_rs" + GModel.hero.getHeroByUniqueId(facility.hero).level]);
                if (ResourceLoader.isSpineExist(hero.getImg())) {
                    this.appointHero.node.children[0].active = false;
                    this.heroSpine.setSpine(hero.getTbl().img, "default", "idle");
                    this.heroSpine.node.scale = 0.5;
                    this.heroSpine.node.active = true;
                } else {
                    this.appointHero.node.children[0].getComponent(UIImage).imgName = hero.getImg();
                    this.heroSpine.node.active = false;
                }
            }
            this.set_hero.onClick = () => {
                GModel.player.checkSystemUnlock(GConstant.systemId.facilityAppointHero, true, facility.rank) &&
                    GWindow.open(WindowAppointHero, { build: facility });
            };
        }
        this.buildingImg.imgName = GConstant.facility_icon[facility.getKind()];
        //建筑标题
        this.buildingName.setText([facility.getTbl().name]);
        //建筑升阶等级
        this.buildingRank.setText(["_rs+" + facility.rank]);
        this.buildingRank.node.active = facility.rank > 0;
    }
    btnInit() {
        this.upRank.onClick = () => {
            GWindow.open(WindowBuildingUpdate, { id: this._windowParam.id });
        };
        this.leftArrow.onClick = () => {
            const list = GModel.facility
                .getAllFacility()
                .filter((f) => f.unlock && f.getKind() !== EnumFacilityType.entrance);
            const current = list.findIndex((f) => f.id === this._windowParam.id);
            if (current - 1 !== -1) {
                this._windowParam.id = list[current - 1].id;
            } else {
                this._windowParam.id = list[list.length - 1].id;
            }
            this.windowInit();
            // this.refreshProduct();
            this.btnInit();
            this.showNote();
            EventBus.emit(EventName.focusFacility, this._windowParam.id);
        };
        this.rightArrow.onClick = () => {
            const list = GModel.facility
                .getAllFacility()
                .filter((f) => f.unlock && f.getKind() !== EnumFacilityType.entrance);
            const current = list.findIndex((f) => f.id === this._windowParam.id);
            if (current + 1 !== list.length) {
                this._windowParam.id = list[current + 1].id;
            } else {
                this._windowParam.id = list[0].id;
            }
            this.windowInit();
            // this.refreshProduct();
            this.btnInit();
            this.showNote();
            EventBus.emit(EventName.focusFacility, this._windowParam.id);
        };
        this.plus.onClick = () => {
            GModel.facility.addSurvivorToWork(this._windowParam.id, 1);
        };
        this.decrease.onClick = () => {
            GModel.facility.subSurvivorToWork(this._windowParam.id, 1);
        };
        this.node.getComponent(UIButton).onClick = () => {
            this.close();
        };
        this.node.getComponent(UIButton).setTransition(false);
    }
    refreshProduct() {
        let tbl = GTable.getList("FacilityStarTbl").filter((t) => t.facilityId === this._windowParam.id);
        let arr = [{ index: 1, id: this._windowParam.id }];
        tbl.length > 0 && arr.push({ index: 2, id: this._windowParam.id });
        this.productList.setState(arr);
    }

    @message([EventName.stateKey.survivor])
    refreshSurivivor() {
        let facility = GModel.facility.getFacilityById(this._windowParam.id);
        if (facility.getKind() == EnumFacilityType.entrance || facility.getKind() == EnumFacilityType.dormitory) return;
        const isFull = facility.workCount() >= facility.workerLimit();
        this.plus.setGrey(isFull);
        // this.plus.interactable = !isFull;
        // this.surivivor.active = this.facility.getKind() != EnumFacilityType.dormitory;
        const workerNum = facility.workCount();
        let surivivorLimit = facility.workerLimit();
        this.peopleaArr = [];
        for (let i = 0; i < surivivorLimit; i++) {
            let workerSlot = workerNum ? i < workerNum : false;
            this.peopleaArr.push({ empty: workerSlot });
        }
        this.peopleList.setState(this.peopleaArr);
        this.plusExclamation.node.active =
            GModel.survivor.getSurvivorWorkingState().idle > 0 && workerNum < surivivorLimit;
        this.decrease.setGrey(workerNum === 0);
    }

    //根据facility的key自动更新
    @message([EventName.stateKey.facility, EventName.stateKey.survivor])
    showNote() {
        this.set_hero.node.active = false;
        let facility = GModel.facility.getFacilityById(this._windowParam.id);
        let buildKind = facility.getKind();
        let effect = false;
        // let aniNode = this.node.getChildByName("content").getChildByName("Vfx_Upgrade");
        if (buildKind == EnumFacilityType.entrance) {
            this.powerbg.node.active = false;
            this.productBg.active = false;
            this.appointHero.node.active = false;
            this.buildNote.active = false;
            this.productList.node.active = false;
            this.surivivor.active = false;
            this.captain.active = false;
            this.node.getChildByName("black").active = false;
            GTip.showTip(["_rs正在开发中"]);
            return;
        }
        this.powerbg.node.active = true;
        this.productBg.active = true;
        this.appointHero.node.active = false;
        this.buildNote.active = true;
        this.productList.node.active = true;
        this.surivivor.active = true;
        this.node.getChildByName("black").active = true;
        if (buildKind == EnumFacilityType.captain) {
            this.powerbg.node.setPosition(-2, 655);
            this.buildingName.node.setPosition(0, -10);
            this.buildingRank.node.setPosition(0, -10);
            // let rankUpConfig = GTable.getList("FacilityRankTbl").filter((t) => t.facilityId === facility.id);
            // let rankUpNext = rankUpConfig.find((cfg) => cfg.rank == this.facility.rank);
            this.upRank.node.active = false;
            this.captainCost.children.map((child) => {
                child.active = false;
            });
            let isLimit = facility.isMaxRank();
            if (!isLimit) {
                let upCost: Item[] = facility.upgradeRankCost();
                for (let i: number = 0; i < upCost.length; i++) {
                    let layout = this.captainCost.getChildByName("layout_" + i);
                    let costEntity = layout.getChildByName("cost_" + i);
                    let storage = layout.getChildByName("storage");
                    let costCount = layout.getChildByName("count");
                    let costItem = upCost[i];
                    let storageCount = GModel.knapsack.getStorageById(costItem.id);
                    costEntity.getComponent(UIImage).imgName = Item.getImg(costItem);
                    costEntity.getComponent(UIButton).onClick = () => {
                        GWindow.open(WindowItemDescription, { item: costItem });
                    };
                    costCount.getComponent(UILabel).setText(["_rs/" + GUtils.ui.getNumberString(costItem.count, 1)]);
                    storage.getComponent(UILabel).setText(["_rs" + GUtils.ui.getNumberString(storageCount, 1)]);
                    storage.color =
                        storageCount >= costItem.count ? GConstant.costLabelColor.green : GConstant.costLabelColor.red;
                    costEntity.active = true;
                    layout.active = true;
                }
            }
            this.captainExclamation.node.active =
                !GModel.facility
                    .getAllFacility()
                    .some(
                        (f) => f.id !== GConstant.captainId && f.rank < facility.rank && f.isFacilityUnlockable(false)
                    ) && facility.upgradeRankCost().every((c) => c.count < GModel.knapsack.getStorageById(c.id));
            this.captainUp.getComponent(UIButton).onClick = () => {
                GModel.facility.upgradeFacilityRank(facility.id).then(() => {
                    let facilityrank = GModel.facility.getFacilityById(facility.id).rank;
                    let arr: string[][] = [];
                    GTable.getList("FacilityTbl")
                        .filter((v) => v.captainRankRequire === facilityrank)
                        .forEach((v, i) => {
                            i > 0 && arr.push(["_rs、"]);
                            arr.push([v.name]);
                        });
                    GTip.showUpgradeTip(
                        [[GLang.code.ui.building_unlockable], ...arr],
                        [[GLang.code.ui.building_level_limit, "_rs" + facilityrank]]
                    );
                });
            };
            //建筑可升级列表
            const captainUpFaci: ListItemBuildThumb["state"][] = facility.getUnlockableFacility().map((buildId) => {
                return { checkBuildId: buildId, status: 0 };
            });
            this.captainUpBuildList.setState(captainUpFaci);
            let captainUpFaci2: ListItemBuildThumb["state"][] = GModel.facility
                .getAllFacility()
                .filter(
                    (f) =>
                        f.isFacilityUnlockable(false) &&
                        f.getKind() !== EnumFacilityType.dormitory &&
                        f.getKind() !== EnumFacilityType.captain &&
                        f.getKind() !== EnumFacilityType.entrance
                )
                .map((f) => {
                    return { checkBuildId: f.id, status: 1 };
                });
            this.captainUpBuildList2.setState(captainUpFaci2);
            // this.captainUp.getComponent(UIButton).interactable = !isLimit;
            this.captainUp.getComponent(UIButton).setGrey(isLimit);
            this.captain.active = true;
        } else {
            this.buildingName.node.setPosition(0, -1);
            this.buildingRank.node.setPosition(0, -1);
            this.powerbg.node.setPosition(-2, 585);
            this.refreshProduct();
            this.upRank.node.active = true;
            this.exclamation.node.active = facility.canUprank();
            this.captain.active = false;
            let noteChildren: cc.Node[] = this.buildNote.children;
            noteChildren.map((node) => (node.active = false));
            this.__curBuildNote = this.buildNote.getChildByName("notice_" + buildKind);
            //建筑生产属性刷新
            if (this.__curBuildNote) {
                this.__curBuildNote.active = true;
                let buildMaterialCost = facility.materialCost();
                let buildWaterCost = facility.waterCost();
                let buildProduct = facility.produce();
                this.facility &&
                    this.facility.id === facility.id &&
                    facility.produce() &&
                    (effect =
                        GUtils.ui.getFixed(facility.produce().count, 0) !==
                        GUtils.ui.getFixed(this.facility.produce().count, 0));
                //材料建筑
                if (buildKind == EnumFacilityType.material || buildKind == EnumFacilityType.greenhouse) {
                    let cost = this.__curBuildNote.getChildByName("cost");
                    cost.children.map((node) => (node.active = false));
                    //消耗
                    if (buildMaterialCost) {
                        let materialCost = cost.getChildByName("cost_0");
                        let materialCount = materialCost.getChildByName("count");
                        materialCost.getComponent(UIButton).onClick = () => {
                            GWindow.open(WindowItemDescription, { item: buildMaterialCost });
                        };
                        materialCost.active = true;
                        materialCost.getComponent(UIImage).imgName = Item.getImg(buildMaterialCost);
                        materialCount
                            .getComponent(UILabel)
                            .setText(["_rs" + buildMaterialCost.count * facility.workCount()]);
                    }
                    if (buildWaterCost) {
                        let waterCost = cost.getChildByName("cost_1");
                        let waterCount = waterCost.getChildByName("count");
                        waterCost.active = this._windowParam.id !== GConstant.waterRoomId;
                        waterCost.getComponent(UIButton).onClick = () => {
                            GWindow.open(WindowItemDescription, { item: buildWaterCost });
                        };
                        if (facility.id === GConstant.waterRoomId) {
                            this.__curBuildNote.getChildByName("material").active = false;
                            this.__curBuildNote.getChildByName("others").setPosition(0, -204.414);
                        } else {
                            this.__curBuildNote.getChildByName("material").active = true;
                            this.__curBuildNote.getChildByName("others").setPosition(103.1, -204.414);
                        }
                        waterCost.getComponent(UIImage).imgName = Item.getImg(buildWaterCost);
                        waterCount.getComponent(UILabel).setText(["_rs" + buildWaterCost.count]);
                    }
                    //产生
                    let minute = this.__curBuildNote
                        .getChildByName("others")
                        .getChildByName("minute")
                        .getComponent(UILabel);
                    facility.getTbl().produceCount !== -1 &&
                        minute.setText(["_rs" + 30 / facility.getTbl().produceCount]);
                    let product = this.__curBuildNote.getChildByName("others").getChildByName("product");
                    let productCount = product.getChildByName("count");
                    product.getComponent(UIImage).imgName = Item.getImg(buildProduct);
                    product.getComponent(UIButton).onClick = () => [
                        GWindow.open(WindowItemDescription, { item: buildProduct }),
                    ];
                    productCount.getComponent(UILabel).setText(["_rs" + buildProduct.count * facility.workCount()]);
                    // (facility.id === GConstant.GreenHouseId ||
                    //     facility.id === GConstant.baozangId ||
                    //     facility.id === GConstant.waterRoomId) &&
                    // aniNode.setPosition(107, -224.997);
                    effect && productCount.getComponent(cc.Animation).play();
                }
                //宿舍（服务人数/减少服务人疲劳值）
                if (buildKind == EnumFacilityType.dormitory) {
                    this.surivivor.active = false;
                    let surivivorNum = facility.clientLimit();
                    this.__curBuildNote
                        .getChildByName("peopleCount")
                        .getComponent(UILabel)
                        .setText(["_rs" + facility.clientCount() + "/" + surivivorNum]);
                    let surivivorList = this.__curBuildNote.getChildByName("UIList");
                    let listItemNum = surivivorList.childrenCount;
                    for (let i: number = 0; i < listItemNum; i++) {
                        let personSign = surivivorList.getChildByName("personsign_" + i);
                        personSign.active = false;
                        personSign.getChildByName("personzero").active = false;
                        personSign.getChildByName("personwill").active = false;
                        personSign.getChildByName("personten").active = false;
                        if (i < surivivorNum) {
                            personSign.active = true;
                            personSign.getChildByName("personzero").active = true;
                        }
                        if (i < facility.clientCount()) {
                            personSign.getChildByName("personten").active = true;
                            continue;
                        }
                        // if (perLimit - surivivorNum < 10) {
                        //     personSign.getChildByName("personzero").active = false;
                        //     personSign.getChildByName("personwill").active = true;
                        //     personSign.getChildByName("personten").active = false;
                        //     continue;
                        // }
                    }
                    let fatigue = this.__curBuildNote.getChildByName("fatigue");
                    let fatigueCount = fatigue.getChildByName("count");
                    let fatigueProduct = GUtils.ui.getFixed(facility.fatigueRecover(), 2);
                    this.facility &&
                        this.facility.id === facility.id &&
                        (effect =
                            GUtils.ui.getFixed(facility.fatigueRecover(), 2) !==
                            GUtils.ui.getFixed(this.facility.fatigueRecover(), 2));
                    fatigueCount.getComponent(UILabel).setText(["_rs+" + fatigueProduct]);
                    // aniNode.setPosition(260, -224.997);
                    effect && fatigueCount.getComponent(cc.Animation).play();
                }
                //医院（工作人数=服务人数/增加服务人医疗值）
                if (buildKind == EnumFacilityType.hospital) {
                    this.surivivor.active = false;
                    let surivivorNum = facility.clientLimit();
                    let surivivorList = this.__curBuildNote.getChildByName("UIList");
                    let listItemNum = surivivorList.childrenCount;
                    this.__curBuildNote
                        .getChildByName("peopleCount")
                        .getComponent(UILabel)
                        .setText(["_rs" + facility.clientCount() + "/" + surivivorNum]);
                    // let stepNum = surivivorNum / 10;
                    for (let i: number = 0; i < listItemNum; i++) {
                        let personSign = surivivorList.getChildByName("personsign_" + i);
                        personSign.active = false;
                        personSign.getChildByName("personzero").active = false;
                        personSign.getChildByName("personwill").active = false;
                        personSign.getChildByName("personten").active = false;
                        if (i < surivivorNum) {
                            personSign.active = true;
                            personSign.getChildByName("personzero").active = true;
                        }
                        if (i < facility.clientCount()) {
                            personSign.getChildByName("personten").active = true;
                            continue;
                        }
                        // if (perLimit - surivivorNum < 10) {
                        //     personSign.getChildByName("personzero").active = false;
                        //     personSign.getChildByName("personwill").active = true;
                        //     personSign.getChildByName("personten").active = false;
                        //     continue;
                        // }
                    }
                    let health = this.__curBuildNote.getChildByName("health");
                    let healthCount = health.getChildByName("count");
                    let healthProduct = GUtils.ui.getFixed(facility.illnessRecover(), 2);
                    this.facility &&
                        this.facility.id === facility.id &&
                        (effect =
                            GUtils.ui.getFixed(facility.illnessRecover(), 2) !==
                            GUtils.ui.getFixed(this.facility.illnessRecover(), 2));
                    healthCount.getComponent(UILabel).setText(["_rs+" + healthProduct]);
                    // aniNode.setPosition(260, -224.997);
                    effect && healthCount.getComponent(cc.Animation).play();
                }
                //餐厅(工作人数=服务人数/消耗食材/产出食物/增加服务人饱食度)
                if (buildKind == EnumFacilityType.restaurant) {
                    let cost = this.__curBuildNote.getChildByName("cost");
                    cost.children.map((node) => (node.active = false));
                    if (buildMaterialCost) {
                        let materialCost = cost.getChildByName("cost_0");
                        let materialCount = materialCost.getChildByName("count");
                        materialCost.getComponent(UIButton).onClick = () => {
                            GWindow.open(WindowItemDescription, { item: buildMaterialCost });
                        };
                        materialCost.active = true;
                        materialCost.getComponent(UIImage).imgName = Item.getImg(buildMaterialCost);
                        materialCount.getComponent(UILabel).setText(["_rs" + buildMaterialCost.count]);
                    }
                    let waterCost = cost.getChildByName("cost_1");
                    let waterCount = waterCost.getChildByName("count");
                    waterCost.active = true;
                    waterCost.getComponent(UIButton).onClick = () => {
                        GWindow.open(WindowItemDescription, { item: buildWaterCost });
                    };
                    waterCost.getComponent(UIImage).imgName = Item.getImg(buildWaterCost);
                    waterCount.getComponent(UILabel).setText(["_rs" + buildWaterCost.count]);
                    //产生
                    let product = this.__curBuildNote.getChildByName("product");
                    let productCount = product.getChildByName("count");
                    let foodCount = facility.produce();
                    product.getComponent(UIImage).imgName = Item.getImg(foodCount);
                    product.getComponent(UIButton).onClick = () => [
                        GWindow.open(WindowItemDescription, { item: foodCount }),
                    ];
                    productCount.getComponent(UILabel).setText(["_rs" + foodCount.count]);
                    //饱食度
                    let satiety = this.__curBuildNote.getChildByName("satiety");
                    let satietyCount = satiety.getChildByName("count");
                    let satietyProduct = GUtils.ui.getFixed(facility.satietyRecover(), 2);
                    this.facility &&
                        this.facility.id === facility.id &&
                        (effect =
                            GUtils.ui.getFixed(facility.satietyRecover(), 2) !==
                            GUtils.ui.getFixed(this.facility.satietyRecover(), 2));
                    satietyCount.getComponent(UILabel).setText(["_rs+" + satietyProduct]);
                    // aniNode.setPosition(290, -224.997);
                    effect && satietyCount.getComponent(cc.Animation).play();
                }
            }
        }
        //相关属性刷新
        if (facility.getTbl().enableHero) {
            this.set_hero.node.active = true;
            this.heroGain.node.active = facility.hero > 0;
            if (facility.hero > 0) {
                this.heroLevel.setText(["_rs" + GModel.hero.getHeroByUniqueId(facility.hero).rank]);
                this.heroGain.imgName =
                    buildKind === EnumFacilityType.hospital ? "building_add__health" : Item.getImg(facility.produce());
                let allHero = GModel.hero.getAllHero();
                let buildHero = allHero.filter((hero) => hero.uniqueId == facility.hero)[0];
                this.heroProduction.setText(...buildHero.getFacilityBuffString(facility.id));
                this.heroProduction.node.active = true;
                this.canAppoint.node.active = false;
                this.level.active = true;
            } else {
                this.heroProduction.node.active = false;
                this.canAppoint.node.active = GModel.player.checkSystemUnlock(
                    GConstant.systemId.facilityAppointHero,
                    false,
                    facility.rank
                );
                this.level.active = false;
            }
            this.locked.node.active = !GModel.player.checkSystemUnlock(
                GConstant.systemId.facilityAppointHero,
                false,
                facility.rank
            );
            this.locked.setText([
                GLang.code.ui.map_unlock_level,
                "_rs" + GTable.getById("SystemUnlockTbl", GConstant.systemId.facilityAppointHero).condition[1],
            ]);
        }
        // this.set_hero.node.active &&
        // GModel.player.checkSystemUnlock(GConstant.systemId.facilityAppointHero, false, facility.rank);
        // effect && aniNode.getComponent(cc.Animation).play();
        this.facility = facility;
    }
}
