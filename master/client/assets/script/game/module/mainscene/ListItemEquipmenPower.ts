import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import EventName from "../../event/EventName";
import ListItemBattlePointText from "../battle/ListItemBattlePointText";
import ListItemPropItem from "../mainsceneNew/ListItemPropItem";
import WindowEquipDetails from "../mainsceneNew/WindowEquipDetails";
import ListItemEquipmenPowerNode from "./ListItemEquipmenPowerNode";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemEquipmenPower")
@ccclass
export default class ListItemEquipmenPower extends UIListItem {
    /**属性列表 */
    @autowired(cc.Node) equipmentRoot: cc.Node = null;
    @autowired(cc.Node) contion: cc.Node = null;
    @autowired(UIList) sxUilist: UIList<ListItemEquipmenPowerNode> = null;
    @autowired(UIList) titleUilist: UIList<ListItemBattlePointText> = null;

    state: {
        /** 原来的战斗力 */
        origin: number;
        /** 最终的战斗力 */
        final: number;
        /**是否显示装备 */
        equip: boolean;
        /**原属性 */
        beforeProperty: { property: string; value: number }[];
        /**后属性 */
        afterProperty: { property: string; value: number }[];
    };

    private equipmentPropItemArr: Array<UIList<ListItemPropItem>> = [];
    setState(state: this["state"]): void {
        this.state = state;

        this.equipmentRoot.children.forEach((node) => {
            this.equipmentPropItemArr.push(node.getComponent(UIList));
        });

        this.refUi();
        this.show();
    }

    show() {
        this.scheduleOnce(() => {
            this.recycle();
        }, 3);
    }

    @message([EventName.hideAllPowerChange])
    hideAllPowerChange() {
        this.unscheduleAllCallbacks();
        this.recycle();
    }

    @message([EventName.stateKey.playerEquipment])
    refUi() {
        this.sxUilist.node.active = this.state.equip;
        this.equipmentRoot.active = this.state.equip;
        this.contion.active = this.state.equip;
        if (this.state.equip) {
            this.refEquipmentItem();
            this.refEquipmentNode();
        }
        this.refTitleUilist();
    }

    refTitleUilist() {
        this.titleUilist.setState([
            {
                origin: this.state.origin,
                final: this.state.final,
            },
        ]);
    }

    /**刷新属性列表 */
    refEquipmentItem() {
        GModel.playerEquipment.equipment().forEach((element, index) => {
            this.equipmentPropItemArr[index].setState([
                {
                    playerEquipment: element,
                    tempIndex: index,
                    clickCB: (clickIndex) => {
                        this.showEquipmentTips(clickIndex);
                    },
                },
            ]);
        });
    }

    showEquipmentTips(equipmentIndex) {
        let a = GModel.playerEquipment.equipment()[equipmentIndex];
        if (!a) {
            GTip.showTip(["_rs" + "未拥有该部件装备！"]);
            return;
        }
        GWindow.open(WindowEquipDetails, {
            part: equipmentIndex,
        });
    }

    /**刷新属性数值列表 */
    refEquipmentNode() {
        this.sxUilist.setState(
            this.state.beforeProperty.map((p) => {
                if (this.state.afterProperty.some((af) => af.property === p.property)) {
                    return {
                        property: p.property,
                        after: this.state.afterProperty.find((af) => af.property === p.property).value,
                        before: p.value,
                    };
                }
            })
        );
    }
}
