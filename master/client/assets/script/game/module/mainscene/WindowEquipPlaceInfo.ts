import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIWindow from "../../../framework/ui/UIWindow";
import EventName from "../../event/EventName";
import UIList from "../../../framework/ui/UIList";
import UILabel from "../../../framework/ui/UILabel";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import ListItemEquipProperty from "../hero/ListItemEquipProperty";
import ListItemTowerPlace from "./ListItemTowerPlace";

const { ccclass, property } = cc._decorator;
@registerClass("WindowEquipPlaceInfo")
@ccclass
export default class WindowEquipPlaceInfo extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: { index: number };
    _returnValue: any;

    /**塔位强化增加的属性 */
    @autowired(UIList) property: UIList<ListItemEquipProperty> = null;
    @autowired(UIList) item: UIList<ListItemTowerPlace> = null;
    @autowired(UIButton) return: UIButton = null;
    @autowired(UILabel) itemName: UILabel = null;
    @autowired(UILabel) kind: UILabel = null;
    @autowired(UILabel) quality: UILabel = null;
    @autowired(UILabel) level: UILabel = null;

    protected onInited(): void {
        this.return.onClick = () => {
            this.close();
        };
        this.initWindow();
    }
    @message([EventName.stateKey.playerEquipmentPlace])
    initWindow() {
        const place = GModel.playerEquipment.getTowerPlace()[this._windowParam.index];
        const equip = GModel.playerEquipment.equipment()[this._windowParam.index];
        const equipTbl = equip.tbl();
        this.property.setState(
            place.propertyString().base.map((p) => {
                return { property: p.property, value: p.value, plus: 0 };
            })
        );
        this.level.setText(["_rs" + place.level]);
        this.quality.setText([GConstant.qualityLabel[equipTbl.quality]]);
        this.quality.node.color = GConstant.qualityColor[equipTbl.quality];
        this.kind.setText([GConstant.equipmentKind[equipTbl.part]]);
        this.itemName.setText([equipTbl.name]);
        this.itemName.node.color = GConstant.qualityColor[equipTbl.quality];
        this.item.setState([{ index: this._windowParam.index, status: 0 }]);
    }
}
