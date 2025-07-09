import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIWindow from "../../../framework/ui/UIWindow";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import { CarEquipmentWrapper } from "../../entity/CarEquipment";
import { EquipmentWrapper } from "../../entity/Equipment";
import Item from "../../entity/Item";
import EventName from "../../event/EventName";
import ListItemCost from "./ListItemCost";
import ListItemEquipProperty from "./ListItemEquipProperty";
import WindowChangeEquipment from "./WindowChangeEquipment";
import WindowConfirmUprank from "./WindowConfirmUprank";
import UILongTouchButton from "../../../framework/ui/UILongTouchButton";

const { ccclass, property } = cc._decorator;

@registerClass("WindowEquipmentDescription")
@ccclass
export default class WindowEquipmentDescription extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: {
        status: number;
        equipment: EquipmentWrapper;
        carEquipment: CarEquipmentWrapper;
    };
    _returnValue: any;
    @autowired(UIButton) closeBtn: UIButton = null;
    /**装备替换按钮 */
    @autowired(UIButton) change: UIButton = null;
    /**装备升级按钮 */
    @autowired(UILongTouchButton) upDate: UILongTouchButton = null;
    /**装备升阶按钮 */
    @autowired(UIButton) upRank: UIButton = null;
    /**升阶感叹号图片 */
    @autowired(UIImage) uprankExclamation: UIImage = null;
    /**装备图片 */
    @autowired(UIImage) equipment: UIImage = null;
    /**装备可升级经验进度条 */
    @autowired(UIImage) progressbar: UIImage = null;
    /**装备可升级经验 */
    @autowired(UILabel) exp: UILabel = null;
    /**装备框 */
    @autowired(UIImage) equipmentbg: UIImage = null;
    @autowired(UILabel) equipname: UILabel = null;
    /**装备阶数属性节点 */
    @autowired(cc.Node) rankNode: cc.Node = null;
    @autowired(cc.Node) levelNode: cc.Node = null;
    @autowired(cc.Node) descriptionNode: cc.Node = null;
    /**装备阶数 */
    @autowired(UILabel) rank: UILabel = null;
    @autowired(UILabel) level: UILabel = null;
    @autowired(UILabel) newlevel: UILabel = null;
    /**装备描述 */
    @autowired(UILabel) description: UILabel = null;
    /**金币消耗 */
    @autowired(UIList) costList: UIList<ListItemCost> = null;
    // @autowired(UILabel) part: UILabel = null;
    /**升级装备数值变化容器 */
    @autowired(UIList) updateProperty: UIList<ListItemEquipProperty> = null;
    /**升阶装备数值变化容器 */
    @autowired(UIList) uprankProperty: UIList<ListItemEquipProperty> = null;

    protected onInited(): void {
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.upRank.onClick = async () => {
            if (
                GModel.player.checkSystemUnlock(
                    GConstant.systemId.equipmentUpstar,
                    true,
                    this._windowParam.equipment.level
                )
            ) {
                if (!this._windowParam.equipment.isEquipmentMaxRank()) {
                    let data = await GWindow.open(WindowConfirmUprank, {
                        equipment: this._windowParam.equipment,
                        carEquipment: this._windowParam.carEquipment,
                    });
                    this._windowParam.equipment = data.equipment ? data.equipment : this._windowParam.equipment;
                    this._windowParam.carEquipment = data.carEquipment
                        ? data.carEquipment
                        : this._windowParam.carEquipment;
                    if (
                        (data.equipment && data.equipment === this._windowParam.equipment) ||
                        (data.carEquipment && data.carEquipment === this._windowParam.carEquipment)
                    ) {
                        this.node
                            .getChildByName("content")
                            .getChildByName("UpgradeEquipment_Effect")
                            .getComponent(cc.Animation)
                            .play();
                    }
                } else {
                    GTip.showTip([GLang.code.ui.maxrank]);
                }
                this.WindowInit();
            }
        };
        this.change.onClick = async () => {
            if (this._windowParam.equipment !== null) {
                let res = await GWindow.open(WindowChangeEquipment, {
                    uniqueId: this._windowParam.equipment.heroUniqueId,
                    index: this._windowParam.equipment.getPart(),
                });
                if (res.equipment === null) this.close();
                this._windowParam.equipment = res.equipment;
            } else {
                let res = await GWindow.open(WindowChangeEquipment, {
                    uniqueId: -1,
                    index: this._windowParam.carEquipment.getPart(),
                });
                this._windowParam.carEquipment = res.carEquipment;
            }
            this.WindowInit();
        };
        this.WindowInit();
    }

    /**刷新装备升级材料消耗 */
    refreshCost(equip: EquipmentWrapper | CarEquipmentWrapper) {
        // let perlength = 400 / this._windowParam.equipment.getExpInfo().require;
        // let enough = this._windowParam.equipment.getExpInfo().exp >= this._windowParam.equipment.getExpInfo().require;
        // this.progressbar.node.width = enough ? 400 : this._windowParam.equipment.getExpInfo().exp * perlength;
        this.exp.setText(["_rs" + equip.getExpInfo().exp + "/" + equip.getExpInfo().require]);
        let require = equip.upgradeCoinRequire().count;
        let storage = GModel.knapsack.getStorageById(GIndex.id.heroEquipmentExpId);
        this.costList.setState([
            {
                item: new Item(GIndex.id.heroEquipmentExpId, 0),
                require,
                storage,
            },
        ]);
        if (equip.canUpgrade()) {
            this.upDate.setGrey(false);
            // this.upDate.interactable = true;
        } else {
            this.upDate.setGrey(true);
            this.costList.node.active = !equip.isEquipmentMaxLevel();
            // this.upDate.interactable = false;
        }
        this.upDate.onClick = async () => {
            if (this._windowParam.equipment !== null) {
                if (GModel.player.checkSystemUnlock(GConstant.systemId.equipmentUpgrade, true)) {
                    if (this._windowParam.equipment.heroUniqueId === -1) {
                        await GModel.hero.upgradeEquipmentLevel(
                            this._windowParam.equipment.id,
                            this._windowParam.equipment.level,
                            this._windowParam.equipment.rank,
                            this.countTimes().times
                        );
                        this._windowParam.equipment = GModel.hero
                            .getEquipmentById(this._windowParam.equipment.id)
                            .getEquipmentWrapperList()
                            .reduce((acc, cur) => acc.concat(cur), [])
                            .find((t) => {
                                return (
                                    t.level === this._windowParam.equipment.level + 1 &&
                                    t.rank === this._windowParam.equipment.rank
                                );
                            });
                    } else {
                        await GModel.hero.upgradeHeroEquipmentLevel(
                            this._windowParam.equipment.heroUniqueId,
                            this._windowParam.equipment.getPart(),
                            this.countTimes().times
                        );
                        this._windowParam.equipment = GModel.hero
                            .getHeroByUniqueId(this._windowParam.equipment.heroUniqueId)
                            .getEquipmentWrapperByPart(this._windowParam.equipment.getPart());
                    }
                }
            } else {
                if (this._windowParam.carEquipment.equiped) {
                    await GModel.car.upgradeCarEquipment(this._windowParam.carEquipment.getPart());
                } else {
                    await GModel.car.upgradeCarEquipmentInKnapsack(
                        this._windowParam.carEquipment.id,
                        this._windowParam.carEquipment.level
                    );
                }
                this._windowParam.carEquipment = GModel.car
                    .getCarEquipmentById(this._windowParam.carEquipment.id)
                    .getEquipmentWrapperList()
                    .find((t) => {
                        return t.level === this._windowParam.carEquipment.level + 1;
                    });
            }
            this.node
                .getChildByName("content")
                .getChildByName("UpgradeEquipment_Effect")
                .getComponent(cc.Animation)
                .play();
            this.WindowInit();
            GTip.showTip([GLang.code.ui.hero_update_success]);
        };
    }
    countTimes(): { times: number; expCost: number } {
        let equip = this._windowParam.equipment;
        let obj = { expCost: 0, times: 1 };
        let temp = { expCost: 0, times: 1 };
        for (let i = 1; i <= 50; i++) {
            if (equip !== null && !equip.isEquipmentMaxLevel()) {
                obj.expCost += equip.upgradeCoinRequire().count;
                let enough = GModel.knapsack.getStorageById(GIndex.id.heroEquipmentExpId) >= obj.expCost;
                if (i >= 5 && i < 10 && enough) {
                    if (i === 5) temp = JSON.parse(JSON.stringify(obj));
                    temp.times = 5;
                }
                if (i >= 10 && i < 50 && enough) {
                    if (i === 10) temp = JSON.parse(JSON.stringify(obj));
                    temp.times = 10;
                }
                if (i == 50 && enough) {
                    temp = JSON.parse(JSON.stringify(obj));
                    temp.times = 50;
                }
                equip = equip.getNextLevel();
            }
        }
        return temp;
    }

    /**窗口数值展示初始化 */
    @message([EventName.stateKey.hero])
    WindowInit() {
        this.change.node.active = true;
        this.upDate.node.setPosition(cc.v2(170, -300));
        this.levelNode.setPosition(0, -50);
        this.descriptionNode.setPosition(0, 50);
        this.rank.node.active = false;
        this.rankNode.active = false;
        this.upDate.text.setText([GLang.code.ui.update_times, "_rs" + this.countTimes().times]);
        if (this._windowParam.equipment === null && this._windowParam.carEquipment === null) {
            this.close();
        } else {
            let equip: EquipmentWrapper | CarEquipmentWrapper;
            if (this._windowParam.equipment !== null) {
                equip = this._windowParam.equipment;
                this.upRank.node.active = equip.canUprank();
                this.uprankExclamation.node.active = equip.canUprank();
                if (equip.heroUniqueId === -1) {
                    this.change.node.active = false;
                    this.costList.node.setPosition(cc.v2(100, -240));
                    this.upDate.node.setPosition(cc.v2(100, -300));
                    this.upRank.node.setPosition(cc.v2(-100, -300));
                }
                if (equip.rank > 0) {
                    this.levelNode.setPosition(0, 0);
                    this.descriptionNode.setPosition(0, 0);
                    this.rankNode.active = true;
                    this.rank.node.active = true;
                    this.refreshRank();
                }
                this.rank.setText(["_rs+" + equip.rank]);
                this.newlevel.setText([GLang.code.ui.map_unlock_level, "_rs" + equip.rank]);
                this.upRank.setGrey(equip.isEquipmentMaxRank());
            } else {
                equip = this._windowParam.carEquipment;
                this.newlevel.node.active = false;
                this.change.node.setPosition(cc.v2(-100, -300));
                this.costList.node.setPosition(cc.v2(100, -240));
                this.upDate.node.setPosition(cc.v2(100, -300));
            }
            this.equipment.imgName = equip.getTbl().img;
            this.equipmentbg.imgName = GConstant.quality[equip.getTbl().quality];
            this.equipname.setText([equip.getTbl().name]);
            // this.part.setText([tbl.part]);
            this.level.setText([GLang.code.ui.map_unlock_level, "_rs" + equip.level]);
            this.description.setText([equip.getTbl().description]);
            this.refreshCost(equip);
            this.refreshProperty(equip);
        }
        if (this._windowParam.status === 1) {
            this.upDate.node.active = false;
            this.change.node.active = false;
            this.costList.node.active = false;
        }
    }
    refreshRank() {
        let state = this._windowParam.equipment.getRankPropertyString().map((t) => {
            return { property: t.property, value: t.value, plus: 0 };
        });
        this.uprankProperty.setState(state);
    }
    /**刷新装备属性 */
    refreshProperty(equip: EquipmentWrapper | CarEquipmentWrapper) {
        let property = equip.getEquipmentProperty().map((t, i) => {
            let value = t.value;
            let property = t.property;
            let plus = equip.getNextLevel().getEquipmentProperty()[i].value - value;
            return { value, property, plus: 0 };
        });
        this.updateProperty.setState(property);
    }
}
