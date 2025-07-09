import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
import { EquipmentWrapper } from "../../entity/Equipment";
import Hero from "../../entity/Hero";
import WindowChangeEquipment from "./WindowChangeEquipment";
import WindowEquipmentDescription from "./WindowEquipmentDescription";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemHeroSkillItem")
@ccclass
export default class ListItemHeroSkillItem extends UIListItem {
    /**技能或装备 */
    @autowired(UIImage) skill: UIImage = null;
    /**技能装备品质 */
    @autowired(UIImage) skillbg: UIImage = null;
    @autowired(UIButton) btn: UIButton = null;
    /**锁的图片 */
    @autowired(UIImage) locked: UIImage = null;
    /**装备或技能等级 */
    @autowired(UILabel) level: UILabel = null;
    /**阶数 */
    @autowired(UILabel) rank: UILabel = null;
    /**感叹号 */
    @autowired(UIImage) exclamation: UIImage = null;
    /**新增装备按钮 */
    @autowired(UIImage) add: UIImage = null;

    state: {
        equipment: EquipmentWrapper;
        hero: Hero;
        index: number;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.node.name = this.state.index.toString();
        let allequipment = GModel.hero.getAllEquipment().filter((t) => t.getPart() === this.state.index);
        if (this.state.equipment !== null) {
            let equipment = this.state.equipment;
            let tbl = equipment.getTbl();
            //可升级、升阶或找到战力更高的装备时显示
            this.exclamation.node.active =
                equipment.canUpgrade() || equipment.canUprank() || equipment.getBetterEquip().length > 0;
            this.skill.imgName = tbl.img;
            this.skillbg.imgName = GConstant.quality[tbl.quality];
            this.rank.setText(["_rs+" + equipment.rank]);
            this.add.node.active = false;
            this.rank.node.active = equipment.rank > 0;
            this.level.node.active = true;
            this.level.setText([GLang.code.ui.map_unlock_level, "_rs" + this.state.equipment.level]);
            this.btn.onClick = () => {
                GWindow.open(WindowEquipmentDescription, {
                    equipment: equipment,
                    carEquipment: null,
                    status: 0,
                });
            };
        } else {
            //有装备可使用时显示
            // allequipment.map((t) => {
            //     for (let key in t.getAvailableCount()) {
            //         if (t.getAvailableCount()[key] > 0) {
            //             this.exclamation.node.active = true;
            //             break;
            //         }
            //     }
            // });
            this.exclamation.node.active = allequipment.some((e) => e.hasAvailable());
            this.skillbg.imgName = "item_bg_gray";
            this.skill.imgName = "";
            this.level.node.active = false;
            this.add.node.active = true;
            this.rank.node.active = false;
            this.btn.onClick = async () => {
                let data = await GWindow.open(WindowChangeEquipment, {
                    uniqueId: this.state.hero.uniqueId,
                    index: this.state.index,
                });
                data.equipment !== null &&
                    this.node.getChildByName("add_equipment_effect").getComponent(cc.Animation).play();
            };
        }
    }
}
