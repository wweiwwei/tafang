import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIWindow from "../../../framework/ui/UIWindow";
import EventName from "../../event/EventName";
import ResourceLoader from "../../../framework/ResourceLoader";
import UIList from "../../../framework/ui/UIList";
import ListItemCost from "../hero/ListItemCost";
import UILabel from "../../../framework/ui/UILabel";
import Item from "../../entity/Item";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import ListItemEquipProperty from "../hero/ListItemEquipProperty";
import ListItemTowerPlace from "./ListItemTowerPlace";
import ListItemWashProperty from "./ListItemWashProperty";
import WindowRare from "./WindowRare";
import WindowEquipPlaceInfo from "./WindowEquipPlaceInfo";
import UIImage from "../../../framework/ui/UIImage";
import EventBus from "../../../framework/event/EventBus";

const { ccclass, property } = cc._decorator;
@registerClass("WindowStrengthen", { preloadPrefab: ["ListItemTowerPlace"] })
@ccclass
export default class WindowStrengthen extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.no,
    };
    _windowParam: any;
    _returnValue: any;
    @autowired(UIButton) closeBtn: UIButton = null;
    @autowired(UIButton) page1: UIButton = null;
    @autowired(UIButton) page2: UIButton = null;
    @autowired(UIImage) tip1: UIImage = null;
    @autowired(UIImage) tip2: UIImage = null;
    @autowired(UILabel) titleLabel: UILabel = null;
    /**----------------强化节点--------------- */
    @autowired(cc.Node) strengthen: cc.Node = null;
    /**强化 */
    @autowired(UIButton) strengthenBtn: UIButton = null;
    @autowired(UIButton) strengthenAllBtn: UIButton = null;
    @autowired(UIImage) tip3: UIImage = null;
    /**所有塔位的父节点 */
    @autowired(cc.Node) nodes: cc.Node = null;
    @autowired(UILabel) rank: UILabel = null;
    /**塔位强化增加的属性 */
    @autowired(UIList) property: UIList<ListItemEquipProperty> = null;
    /**消耗物品 */
    @autowired(UIList) oneCost: UIList<ListItemCost> = null;
    @autowired(UIList) autoCost: UIList<ListItemCost> = null;

    /**----------------洗练节点--------------- */
    @autowired(cc.Node) wash: cc.Node = null;
    /**洗练 */
    @autowired(UIButton) washBtn: UIButton = null;
    @autowired(UIImage) tip4: UIImage = null;
    /**消耗物品 */
    @autowired(UIList) cost: UIList<ListItemCost> = null;
    /**塔位洗练属性词条 */
    @autowired(UIList) property2: UIList<ListItemWashProperty> = null;
    @autowired(UIList) list: UIList<ListItemTowerPlace> = null;
    @autowired(cc.ProgressBar) progress: cc.ProgressBar = null;
    @autowired(UILabel) progressLabel: UILabel = null;
    @autowired(UIButton) rare: UIButton = null;
    @autowired(UILabel) level: UILabel = null;
    @autowired(UILabel) nextlevel: UILabel = null;

    private page = 0;
    private index = 0;
    private comps: ListItemTowerPlace[] = [];

    private isPlayEffect = false;

    protected onInited(): void {
        EventBus.emit(EventName.hideMainSceneLeftMenuUi, false);
        this.node.zIndex = -1;
        this.closeBtn.setTransition(false);
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.node.getComponent(UIButton).onClick = () => {
            this.close();
        };
        this.node.getComponent(UIButton).setTransition(false);
        this.rare.onClick = () => {
            GWindow.open(WindowRare);
        };
        // this.nodes.children.forEach((node, i) => {
        //     const comp = ResourceLoader.getNodeSyncWithPreload(ListItemTowerPlace);
        //     node.addChild(comp.node);
        //     this.comps.push(comp);
        // });
        this.washBtn.onClick = async () => {
            // const origin = GModel.battle.getBattlePoint();
            await GModel.playerEquipment.washTower(this.index);
            // const after = GModel.battle.getBattlePoint();
            // GTip.showBattlePointChange(origin, after, [], [], false);
            this.isPlayEffect = true;
            this.windowInit();
        };
        this.strengthenBtn.onClick = async () => {
            if (this.auto) return;
            const place = GModel.playerEquipment.getTowerPlace()[this.index];
            if (place.isMaxLevel()) return;
            this.list.getItems()[this.index].playAni();
            // this.comps[this.index].playAni();
            await GModel.playerEquipment.strengthenTower(this.index);
            // this.index = GModel.playerEquipment.getNextIndex();
            this.windowInit();
        };
        this.strengthenAllBtn.onClick = () => {
            this.autoStrengthen();
        };
        this.page1.bg.imgName = "cultivate_chosen";
        this.page1.onClick = () => {
            this.page = 0;
            this.page2.bg.imgName = "cultivate_unchosen";
            this.page1.bg.imgName = "cultivate_chosen";
            this.titleLabel.setText([GLang.code.ui.strengthen]);
            this.wash.active = false;
            this.strengthen.active = true;
        };
        this.page2.onClick = async () => {
            this.stopAuto();
            await GModel.playerEquipment.activateTowerPlace();
            this.page = 1;
            this.wash.active = true;
            this.strengthen.active = false;
            this.page1.bg.imgName = "cultivate_unchosen";
            this.page2.bg.imgName = "cultivate_chosen";
            this.titleLabel.setText([GLang.code.ui.wash]);
        };
        // this.index = GModel.playerEquipment.getNextIndex();
        this.initStrengthen();
        this.windowInit();
    }

    async strengthenCallBack() {
        if (this.auto) {
            // this.comps[this.index].playAni();
            this.index = GModel.playerEquipment.getNextIndex();
            this.list.getItems()[this.index].playAni();
            await GModel.playerEquipment.strengthenAllTower();
            this.windowInit();
        }
    }

    private auto = false;

    stopAuto() {
        this.auto = false;
        this.strengthenAllBtn.bg.node.getChildByName("UIImage").getComponent(cc.Animation).stop();
    }

    openAuto() {
        this.auto = true;
        this.strengthenAllBtn.bg.node.getChildByName("UIImage").getComponent(cc.Animation).play();
        this.strengthenCallBack();
        this.schedule(this.strengthenCallBack, 1);
    }
    autoStrengthen() {
        this.unschedule(this.strengthenCallBack);
        this.auto = !this.auto;
        if (this.auto) this.openAuto();
        else this.stopAuto();
        this.strengthenBtn.setGrey(this.auto);
    }

    @message([EventName.stateKey.playerEquipmentPlace, EventName.stateKey.towerWashData])
    windowInit() {
        this.initWash();
        this.initProperty();
        this.initWashProperty();
        this.initTree();
        this.initStrengthen();
    }

    initProperty() {
        const place = GModel.playerEquipment.getTowerPlace()[this.index];
        this.property.setState(
            place
                .getNextLevel()
                .propertyString()
                .base.map((p, i) => {
                    const propertyString = place.propertyString().base;
                    if (i < propertyString.length) {
                        return {
                            property: propertyString[i].property,
                            value: GIndex.battle.propertyShowMethod(propertyString[i].property)(
                                propertyString[i].value
                            ),
                            plus: GIndex.battle.propertyShowMethod(propertyString[i].property)(
                                p.value - propertyString[i].value
                            ),
                        };
                    } else {
                        return {
                            property: p.property,
                            value: GIndex.battle.propertyShowMethod(p.property)(p.value),
                            plus: 0,
                            next: true,
                        };
                    }
                })
        );
    }

    initWashProperty() {
        const place = GModel.playerEquipment.getTowerPlace()[this.index];
        let state: {
            max: string;
            string: string[][];
            quality: number;
            locked: boolean;
            cb?: () => void;
            isPlayAni?: boolean;
        }[] = [];
        for (let i = 0; i < GConfig.equipment.washPropertyCount.length - 1; i++) {
            if (place.stat.length > i) {
                let tbl = GTable.getById("TowerWashTbl", place.stat[i].id);
                let obj = place.propertyString().stat[i];
                state.push({
                    max: Number(tbl.max) / 100 + "%",
                    string: [[GIndex.battle.propertyText(obj.property)], ["_rs:" + obj.value]],
                    quality: tbl.quailty,
                    locked: place.stat[i].locked,
                    cb: () => {
                        GModel.playerEquipment.lockProperty(this.index, i);
                    },
                    isPlayAni: this.isPlayEffect,
                });
            } else {
                state.push({
                    max: "",
                    string: [
                        [
                            GLang.code.ui.facility_unlock_tip1,
                            // GModel.playerEquipment.equipment()[this.index].tbl().name,
                            "_rs该家电",
                            "_rs" + GConfig.equipment.washPropertyCount[i],
                        ],
                    ],
                    quality: 0,
                    locked: true,
                });
            }
        }
        this.property2.setState(state);
        this.isPlayEffect = false;
    }

    @message([EventName.stateKey.playerEquipmentPlace])
    initStrengthen() {
        const place = GModel.playerEquipment.getTowerPlace()[this.index];
        const curPlace = GModel.playerEquipment.getTowerPlace()[GModel.playerEquipment.getNextIndex()];
        let cost = place.upgradeCost();
        this.oneCost.node.active = cost != null;
        if (cost) {
            this.oneCost.setState(
                cost.map((item) => {
                    return { item, require: item.count, storage: GModel.knapsack.getStorageById(item.id) };
                })
            );
        }
        this.autoCost.setState(
            curPlace.upgradeCost().map((item) => {
                return { item, require: item.count, storage: GModel.knapsack.getStorageById(item.id) };
            })
        );
        this.tip1.node.active = !place.isMaxLevel() && GModel.knapsack.checkStorage(place.upgradeCost(), false);
        this.tip3.node.active = this.tip1.node.active;
    }

    @message([EventName.stateKey.playerEquipmentPlace])
    initWash() {
        let count = GConfig.equipment.washCost[1];
        let cost = new Item(GConfig.equipment.washCost[0], count);
        let storage = GModel.knapsack.getStorageById(cost.id);
        this.cost.setState([
            {
                item: cost,
                require:
                    count *
                    (GModel.playerEquipment.getTowerPlace()[this.index].stat.filter((s) => s.locked).length + 1),
                storage,
            },
        ]);
        this.level.setText(["_rslv." + GState.data.towerWashData.washLevel]);
        this.nextlevel.setText(["_rslv." + (GState.data.towerWashData.washLevel + 1)]);
        const require = GTable.getList("TowerWashRareTbl").find(
            (t) => t.level === GState.data.towerWashData.washLevel
        ).exp;
        this.progress.progress = GState.data.towerWashData.exp / require;
        this.progressLabel.setText([`_rs${GState.data.towerWashData.exp}/${require}`]);
        this.progress.node.active = !GModel.playerEquipment.isMaxWashLevel();
        this.initWashList();
        this.tip2.node.active = GModel.playerEquipment.canWash();
        this.tip4.node.active = this.tip2.node.active;
    }

    @message([EventName.stateKey.playerEquipmentPlace])
    initWashList() {
        const list = GModel.playerEquipment.getTowerPlace();
        this.list.setState(
            list.map((p, i) => {
                return {
                    index: i,
                    status: 1,
                    chosen: i === this.index,
                    cb: () => {
                        this.index = i;
                        this.windowInit();
                    },
                };
            })
        );
    }

    @message([EventName.stateKey.playerEquipmentPlace])
    initTree() {
        this.comps.forEach((comp, i) => {
            comp.setState({
                index: i,
                status: 0,
                chosen: i === this.index,
                cb: () => {
                    // GWindow.open(WindowEquipPlaceInfo, { index: i });
                    this.index = i;
                    this.windowInit();
                },
            });
        });
    }

    protected onRecycle(): void {
        this.comps.forEach((element) => {
            element.recycle();
        });
        this.unscheduleAllCallbacks();
    }

    protected onDisable(): void {
        EventBus.emit(EventName.hideMainSceneLeftMenuUi, true);
    }
}
