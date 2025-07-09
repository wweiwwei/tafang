import { autowired, message, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIRichText from "../../../framework/ui/UIRichText";
import UISpine from "../../../framework/ui/UISpine";
import UIWindow from "../../../framework/ui/UIWindow";
import { EquipmentWrapper } from "../../entity/Equipment";
import Item from "../../entity/Item";
import EventName from "../../event/EventName";
import ListItemItem from "../common/ListItemItem";
import WindowEquipmentDescription from "../hero/WindowEquipmentDescription";

const { ccclass, property } = cc._decorator;
@registerClass("WindowFirstCharge")
@ccclass
export default class WindowFirstCharge extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    /**礼包 */
    @autowired(UIList) itemList: UIList<ListItemItem> = null;
    /**赠送 */
    @autowired(UIRichText) give: UIRichText = null;
    /**剩余时间 */
    @autowired(UILabel) time: UILabel = null;
    /**奖励名 */
    @autowired(UIImage) rewardName: UIImage = null;
    @autowired(UIButton) closeBtn: UIButton = null;
    /**购买 */
    @autowired(UIButton) purchase: UIButton = null;
    /**物品图 */
    @autowired(UIButton) img: UIButton = null;
    _windowParam: any;
    _returnValue: any;
    protected onInited(): void {
        this.closeBtn.setTransition(false);
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.refreshPack();
    }
    private config = {
        31029: {
            img: "first_charge_weapon",
            pos: cc.v2(-23.189, 24.553),
            name: "first_charge_weapon_name",
        },
        31031: {
            img: "first_charge_armour",
            pos: cc.v2(13.64, 31.373),
            name: "first_charge_armour_name",
        },
        31032: {
            img: "first_charge_shoes",
            pos: cc.v2(-8.184, 50.47),
            name: "first_charge_shoes_name",
        },
    };
    @message([EventName.stateKey.chargeData])
    refreshPack() {
        let first = GState.data.chargeData.firstPackage;
        if (first.length < 3) {
            let tbl = GTable.getList("FirstPackageTbl")[first.length];
            let reward = Item.fromItemArray(tbl.reward);
            let equip = reward.find((t) => GTable.getById("HeroEquipmentTbl", t.id));
            let state = reward
                .filter((r) => r.id !== equip.id)
                .map((r) => {
                    return { item: r, status: 0 };
                });
            this.img.bg.imgName = this.config[equip.id].img;
            this.img.bg.node.setPosition(this.config[equip.id].pos);
            this.rewardName.imgName = this.config[equip.id].name;
            this.give.setText([GLang.code.ui.first_charge_give, "_rs999"]);
            this.itemList.setState(state);
            this.img.onClick = () => {
                GWindow.open(WindowEquipmentDescription, {
                    status: 1,
                    equipment: new EquipmentWrapper(equip.id, 1, 0, 1, -1),
                    carEquipment: null,
                });
            };
            this.purchase.onClick = () => {
                // GModel.charge.pay(id,"")
                GModel.charge.pay(tbl.id, "");
            };
        } else {
            this.close();
        }
    }
}
