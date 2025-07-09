import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemHeroDebris")
@ccclass
export default class ListItemHeroDebris extends UIListItem {
    @autowired(UIButton) btn: UIButton = null;
    @autowired(UIImage) exclamation: UIImage = null;
    @autowired(UIImage) item: UIImage = null;
    @autowired(UIList) debrisItem: UIImage = null;
    @autowired(UILabel) itemName: UILabel = null;
    state: {
        equipment: number;
        carequipment: number;
        debris: number;
    };
    setState(state: this["state"]): void {
        this.state = state;
        if (this.state.carequipment === null && this.state.equipment === null) {
            let own = GModel.hero.getAllHero();
            return;
        }
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
