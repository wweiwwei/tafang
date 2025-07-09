import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import { CarEquipmentWrapper } from "../../entity/CarEquipment";
import Equipment, { EquipmentWrapper } from "../../entity/Equipment";
import ListItemStarItem from "../common/ListItemStarItem";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemEquipment")
@ccclass
export default class ListItemEquipment extends UIListItem {
    @autowired(UILabel) equipmentName: UILabel = null;
    @autowired(UIImage) equipmentbg: UIImage = null;
    @autowired(UIImage) equipment: UIImage = null;
    @autowired(UIImage) equiped: UIImage = null;
    @autowired(UILabel) power: UILabel = null;
    @autowired(UILabel) count: UILabel = null;
    /**英雄 */
    @autowired(UIImage) image: UIImage = null;
    @autowired(UIImage) bg: UIImage = null;
    @autowired(UIImage) gift: UIImage = null;
    @autowired(UILabel) level: UILabel = null;
    @autowired(UILabel) rank: UILabel = null;
    @autowired(cc.Node) heroItem: cc.Node = null;
    @autowired(UIList) star: UIList<ListItemStarItem> = null;
    /**替换按钮 */
    @autowired(UIButton) change: UIButton = null;
    /**替换按钮文本 */
    @autowired(UILabel) btn_label: UILabel = null;
    state: {
        herouid: number;
        equipmentWrapper: EquipmentWrapper;
        carEquipment: CarEquipmentWrapper;
        cb: () => void;
        status: boolean;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.node.name = this.state.equipmentWrapper.id.toString();
        let equip: EquipmentWrapper | CarEquipmentWrapper;
        equip = this.state.equipmentWrapper !== null ? this.state.equipmentWrapper : this.state.carEquipment;
        this.power.setText(["_rs" + equip.getBattlePoint()]);
        this.btn_label.setText([this.state.status ? GLang.code.ui.wear : GLang.code.ui.equipment_change]);
        this.equipmentName.setText([equip.getTbl().name], ["_rs（lv." + equip.level + "）"]);
        this.equipment.imgName = equip.getTbl().img;
        this.equipmentbg.imgName = GConstant.quality[equip.getTbl().quality];
        this.count.setText(["_rsx" + GUtils.ui.getFixed(equip.count, 1)]);
        if (this.state.equipmentWrapper !== null) {
            this.rank.node.active = this.state.equipmentWrapper.rank > 0;
            this.rank.setText(["_rs+" + this.state.equipmentWrapper.rank]);
            if (this.state.equipmentWrapper.heroUniqueId === -1) {
                this.heroItem.active = false;
                this.equiped.node.active = false;
                this.change.node.setPosition(cc.v2(168.443, -5));
            } else {
                this.state.equipmentWrapper.heroUniqueId === this.state.herouid &&
                    this.btn_label.setText([GLang.code.ui.remove]);
                this.heroItem.active = true;
                let hero = GModel.hero.getHeroByUniqueId(this.state.equipmentWrapper.heroUniqueId);
                this.level.setText(["_rs" + hero.level]);
                this.gift.imgName = "hero_kind_" + hero.getKind();
                this.image.imgName = hero.getImg() + "_head";
                this.bg.imgName = GConstant.heroQuality[hero.getQuality()];
                // + (hero.rank > 0 ? "+" + hero.rank : "");
                this.change.node.setPosition(cc.v2(168.443, -23.39));
                this.star.setState(hero.getStarItem(0));
            }
        } else {
            if (this.state.carEquipment.equiped) {
                this.equiped.node.active = true;
                this.btn_label.setText([GLang.code.ui.remove]);
                this.change.node.setPosition(cc.v2(168.443, -23.39));
            } else {
                this.equiped.node.active = false;
                this.change.node.setPosition(cc.v2(168.443, -5));
            }
            this.rank.node.active = false;
            this.heroItem.active = false;
        }
        this.change.onClick = this.state.cb;
    }
}
