import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import { PlayerEquipment } from "../../entity/PlayerEquipment";
import ListItemPropItem from "./ListItemPropItem";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemRoleEquip")
@ccclass()
export default class ListItemRoleEquip extends UIListItem {
    @autowired(UIList) uiList: UIList<ListItemPropItem> = null;

    state: {
        playerEquipment: PlayerEquipment;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.refList();
    }

    refList() {
        this.uiList.setState([{ playerEquipment: this.state.playerEquipment }]);
    }
}
