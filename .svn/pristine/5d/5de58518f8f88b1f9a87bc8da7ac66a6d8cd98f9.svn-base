import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIWindow from "../../../framework/ui/UIWindow";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import { CarEquipmentWrapper } from "../../entity/CarEquipment";
import { EquipmentWrapper } from "../../entity/Equipment";
import Item from "../../entity/Item";
import ListItemCost from "./ListItemCost";
import ListItemImprove from "./ListItemImprove";

const { ccclass, property } = cc._decorator;
@registerClass("WindowConfirmUprank")
@ccclass
export default class WindowConfirmUprank extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: {
        equipment: EquipmentWrapper;
        carEquipment: CarEquipmentWrapper;
    };
    _returnValue: { equipment: EquipmentWrapper; carEquipment: CarEquipmentWrapper } = {
        equipment: null,
        carEquipment: null,
    };
    @autowired(UIImage) image: UIImage = null;
    @autowired(UIImage) bg: UIImage = null;
    @autowired(UILabel) storage: UILabel = null;
    @autowired(UILabel) require: UILabel = null;
    @autowired(UIButton) confirm: UIButton = null;
    @autowired(UIButton) closeBtn: UIButton = null;
    @autowired(UIList) costList: UIList<ListItemCost> = null;
    @autowired(UIList) uprankProperty: UIList<ListItemImprove> = null;
    @autowired(UILabel) equipname: UILabel = null;
    @autowired(UILabel) property: UILabel = null;
    @autowired(UILabel) oldval: UILabel = null;
    @autowired(UILabel) newval: UILabel = null;
    /**装备阶数 */
    @autowired(UILabel) rank: UILabel = null;

    protected onInited(): void {
        let equipment =
            this._windowParam.equipment !== null ? this._windowParam.equipment : this._windowParam.carEquipment;
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.equipname.setText([equipment.getTbl().name]);
        if (this._windowParam.equipment !== null) {
            this.rank.setText(["_rs+" + this._windowParam.equipment.rank]);
            this.rank.node.active = this._windowParam.equipment.rank > 0;
            let state: {
                property: string;
                oldval: number | string;
                newval: number | string;
            }[] = [];
            if (this._windowParam.equipment.rank > 0) {
                this._windowParam.equipment.getRankPropertyString().map((t) => {
                    let obj = {
                        property: t.property,
                        oldval: t.value,
                        newval: 0,
                    };
                    state.push(obj);
                });
                this._windowParam.equipment
                    .getNextRank()
                    .getRankPropertyString()
                    .forEach((t, i) => {
                        state[i].newval = t.value;
                    });
            } else {
                this._windowParam.equipment
                    .getNextRank()
                    .getRankPropertyString()
                    .map((t) => {
                        let obj = {
                            property: t.property,
                            oldval: 0,
                            newval: t.value,
                        };
                        state.push(obj);
                    });
            }
            this.property.setText([GLang.code.ui.hero_upstage], [GLang.code.ui.hero_level]);
            this.oldval.setText(["_rs:" + this._windowParam.equipment.rank]);
            this.newval.setText(["_rs" + (this._windowParam.equipment.rank + 1)]);
            this.uprankProperty.setState(state);
            this.image.imgName = equipment.getTbl().img;
            this.bg.imgName = GConstant.quality[equipment.getTbl().quality];
            let expinfo = equipment.getExpInfo();
            this.storage.setText(["_rs" + expinfo.exp]);
            this.require.setText(["_rs/" + expinfo.require]);
            this.storage.node.color =
                expinfo.exp >= expinfo.require ? GConstant.costLabelColor.green : GConstant.costLabelColor.red;
            let cost = this._windowParam.equipment.getUpgradeRankCoinRequire();
            this.costList.setState([
                {
                    item: cost,
                    require: cost.count,
                    storage: GModel.knapsack.getStorageById(GIndex.id.coinId),
                },
            ]);
            this.confirm.onClick = async () => {
                if (this._windowParam.equipment.heroUniqueId === -1) {
                    await GModel.hero.upgradeEquipmentRank(
                        equipment.id,
                        equipment.level,
                        this._windowParam.equipment.rank
                    );
                    this._returnValue.equipment = GModel.hero
                        .getEquipmentById(equipment.id)
                        .getEquipmentWrapperList()
                        .reduce((acc, cur) => acc.concat(cur), [])
                        .find((t) => t.level === equipment.level && t.rank === this._windowParam.equipment.rank + 1);
                } else {
                    await GModel.hero.upgradeHeroEquipmentRank(
                        this._windowParam.equipment.heroUniqueId,
                        equipment.getPart()
                    );
                    this._returnValue.equipment = GModel.hero
                        .getHeroByUniqueId(this._windowParam.equipment.heroUniqueId)
                        .getEquipmentWrapperByPart(equipment.getPart());
                }
                GTip.showTip([GLang.code.ui.hero_upstage_success]);
                this.close();
            };
            // this.refreshProperty();
        }
    }
    // refreshProperty() {
    //     let state;
    // }
}
