import { autowired, message, registerClass } from "../../../framework/Decorator";
import IocContainer from "../../../framework/IocContainer";
import { GameDate } from "../../../framework/date/GameDate";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIRichText from "../../../framework/ui/UIRichText";
import UIWindow from "../../../framework/ui/UIWindow";
import { PlayerEquipment } from "../../entity/PlayerEquipment";
import EventName from "../../event/EventName";
import WindowClock from "../build/WindowClock";
import WindowSurvivorManagement from "../build/WindowSurvivorManagement";
import ListItemBtn from "../common/ListItemBtn";
import WindowCommonConfirm from "../common/WindowCommonConfirm";
import WindowMission from "../common/WindowMission";
import ListItemMainSceneMenu from "../mainscene/ListItemMainSceneMenu";
import ListItemPropItem from "./ListItemPropItem";

const { ccclass, property } = cc._decorator;
@registerClass("WindowEquipDetails", {})
@ccclass
export default class WindowEquipDetails extends UIWindow {
    static _poolSize: number = 1;
    _windowParam: {
        part: number;
    };
    _returnValue: any;
    @autowired(UIButton) closeBtn: UIButton = null;
    /**装备**/
    @autowired(UIList) UIList: UIList<ListItemPropItem> = null;
    /**品质**/
    @autowired(UILabel) quality: UILabel = null;
    /**装备名称**/
    @autowired(UILabel) nameLabel: UILabel = null;
    /**box */
    @autowired(cc.Node) box2: cc.Node = null;

    //GModel.playerEquipment.equipment[this._windowParam.partIndex];
    protected onInited(): void {
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.closeBtn.setTransition(false);
        this.box2.getChildByName("base").children.forEach((node) => {
            node.active = false;
        });
        this.box2.getChildByName("stat").children.forEach((node) => {
            node.active = false;
        });

        let e: PlayerEquipment = GModel.playerEquipment.equipment()[this._windowParam.part];
        this.UIList.setState([{ playerEquipment: e }]);
        this.quality.setText(["_rs" + e.tbl().quality]);
        this.nameLabel.setText([e.tbl().name]);

        e.propertyString().base.forEach((element, index) => {
            let node: cc.Node = this.box2.getChildByName("base").children[index];
            node.active = true;
            node.getChildByName("oneLabel")
                .getChildByName("left")
                .getComponent(UILabel)
                .setText([GIndex.battle.propertyText(element.property)]);

            node.getChildByName("oneLabel")
                .getChildByName("right")
                .getComponent(UILabel)
                .setText(["_rs" + element.value]);
        });
        if (e.propertyString().stat.length > 0) {
            this.box2.getChildByName("stat").active = true;
            this.box2.getChildByName("line").active = true;
        } else {
            this.box2.getChildByName("stat").active = false;
            this.box2.getChildByName("line").active = false;
            return;
        }
        e.propertyString().stat.forEach((element, index) => {
            let node: cc.Node = this.box2.getChildByName("stat").children[index];
            node.active = true;
            node.getChildByName("oneLabel")
                .getChildByName("left")
                .getComponent(UILabel)
                .setText([GIndex.battle.propertyText(element.property)]);

            node.getChildByName("oneLabel")
                .getChildByName("right")
                .getComponent(UILabel)
                .setText(["_rs" + element.value]);
        });
    }
}
