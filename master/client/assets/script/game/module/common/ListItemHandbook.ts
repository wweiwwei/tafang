import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemHandbook")
@ccclass
export default class ListItemHandbook extends UIListItem {
    @autowired(UIButton) btn: UIButton = null;
    @autowired(UIImage) exclamation: UIImage = null;
    @autowired(UIImage) item: UIImage = null;
    @autowired(UILabel) itemName: UILabel = null;
    state: {
        equipment: number;
        carequipment: number;
    };
    setState(state: this["state"]): void {
        this.state = state;
        if (this.state.carequipment === null) {
            let own = GModel.hero.getAllEquipment().find((t) => t.id === this.state.equipment);
            this.item.imgName = own !== undefined ? own.getTbl().img : "";
            this.itemName.setText([own !== undefined ? own.getTbl().name : "_rs???"]);
        } else {
            let own = GModel.car.getAllCarEquipment().find((t) => t.id === this.state.carequipment);
            this.item.imgName = own !== undefined ? own.getTbl().img : "";
            this.itemName.setText([own !== undefined ? own.getTbl().name : "_rs???"]);
        }
    }
}
