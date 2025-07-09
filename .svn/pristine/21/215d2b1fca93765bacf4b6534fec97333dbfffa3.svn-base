import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIWindow from "../../../framework/ui/UIWindow";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import Item from "../../entity/Item";
import EventName from "../../event/EventName";
import ListItemCost from "../hero/ListItemCost";
import ListItemImprove from "../hero/ListItemImprove";
import WindowChangeEquipment from "../hero/WindowChangeEquipment";
import WindowEquipmentDescription from "../hero/WindowEquipmentDescription";

const { ccclass, property } = cc._decorator;

@registerClass("WindowCarDetail")
@ccclass
export default class WindowCarDetail extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: any;
    _returnValue: any;
    /**属性提升容器 */
    @autowired(UIList) improveList: UIList<ListItemImprove> = null;
    /**返回按钮 */
    @autowired(UIButton) return: UIButton = null;
    /**感叹号 */
    @autowired(UIButton) exclamation: UIButton = null;
    /**普攻图 */
    @autowired(UIImage) skillbg: UIImage = null;
    /**英雄名 */
    @autowired(UILabel) carName: UILabel = null;
    /**英雄等级 */
    @autowired(UILabel) level1: UILabel = null;
    @autowired(UILabel) level2: UILabel = null;
    @autowired(UILabel) level3: UILabel = null;
    /**技能描述 */
    @autowired(UILabel) description: UILabel = null;
    /**升级按钮 */
    @autowired(UIButton) updateBtn: UIButton = null;
    /**升级按钮 */
    @autowired(UIButton) add1: UIButton = null;
    /**升级按钮 */
    @autowired(UIButton) add2: UIButton = null;
    /**升级按钮 */
    @autowired(UIButton) add3: UIButton = null;
    /**升级按钮 */
    @autowired(UIButton) add4: UIButton = null;
    /**升级按钮 */
    @autowired(UIButton) add5: UIButton = null;
    /**升级感叹 */
    @autowired(UIImage) updateExclamation: UIImage = null;
    /**消耗列表节点 */
    @autowired(UIList) costList: UIList<ListItemCost> = null;

    protected onInited(): void {
        this.return.onClick = () => {
            this.close();
        };
        this.updateBtn.onClick = async () => {
            await GModel.car.upgradeCar();
            GTip.showTip([GLang.code.ui.hero_update_success]);
        };
        this.windowInit();
    }
    protected onRecycle(): void {}
    async openWindow(index: number) {
        GModel.car.getBattleCar().equipment[index] === null
            ? await GWindow.open(WindowChangeEquipment, { uniqueId: -1, index: index })
            : await GWindow.open(WindowEquipmentDescription, {
                  equipment: null,
                  carEquipment: GModel.car
                      .getCarEquipmentById(GModel.car.getBattleCar().equipment[index].id)
                      .getEquipmentWrapperList()
                      .find((t) => t.equiped),
              });
        this.refreshButton();
    }
    refreshButton() {
        let carequipment = GModel.car.getBattleCar().equipment;
        this.add1.bg.imgName = carequipment[0]
            ? GModel.car.getCarEquipmentById(carequipment[0].id).getTbl().img
            : "common_btn_add";
        this.add2.bg.imgName = carequipment[1]
            ? GModel.car.getCarEquipmentById(carequipment[1].id).getTbl().img
            : "common_btn_add";
        this.add3.bg.imgName = carequipment[2]
            ? GModel.car.getCarEquipmentById(carequipment[2].id).getTbl().img
            : "common_btn_add";
        this.add4.bg.imgName = carequipment[3]
            ? GModel.car.getCarEquipmentById(carequipment[3].id).getTbl().img
            : "common_btn_add";
        this.add5.bg.imgName = carequipment[4]
            ? GModel.car.getCarEquipmentById(carequipment[4].id).getTbl().img
            : "common_btn_add";
        this.add1.onClick = () => {
            this.openWindow(0);
        };
        this.add2.onClick = () => {
            this.openWindow(1);
        };
        this.add3.onClick = () => {
            this.openWindow(2);
        };
        this.add4.onClick = () => {
            this.openWindow(3);
        };
        this.add5.onClick = () => {
            this.openWindow(4);
        };
    }
    @message([EventName.stateKey.battleCar])
    windowInit() {
        let car = GModel.car.getBattleCar();
        this.carName.setText([car.getName()]);
        this.level1.setText([GLang.code.ui.map_unlock_level, "_rs" + car.level]);
        this.level2.setText([GLang.code.ui.map_unlock_level, "_rs" + car.level]);
        this.level3.setText([GLang.code.ui.map_unlock_level, "_rs" + car.getNextLevel().level]);
        this.skillbg.imgName = car.getMainSkillTbl().img;
        this.description.setText([car.getMainSkillTbl().description]);
        this.refreshCost();
        this.refreshImprove();
        this.refreshButton();
    }
    refreshCost() {
        let car = GModel.car.getBattleCar();
        let state = car.getUpgradeRequire().map((t) => {
            let item = t;
            let require = t.count;
            let storage = GModel.knapsack.getStorageById(t.id);
            return { item, require, storage };
        });
        this.costList.setState(state);
    }
    refreshImprove() {
        let car = GModel.car.getBattleCar();
        let arr = ["attack", "armor", "maxHp"];
        let state = arr.map((t) => {
            return {
                property: t,
                oldval: car.getProperty(GConstant.propertyList[t]),
                newval: car.getNextLevel().getProperty(GConstant.propertyList[t]),
            };
        });
        this.improveList.setState(state);
    }
}
