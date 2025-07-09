import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemTowerPlace")
@ccclass
export default class ListItemTowerPlace extends UIListItem {
    @autowired(UIImage) icon: UIImage = null;
    @autowired(UIImage) quality: UIImage = null;
    @autowired(UIImage) chosen: UIImage = null;
    @autowired(UIButton) btn: UIButton = null;

    state: {
        index: number;
        chosen?: boolean;
        /**0-强化，1-洗练 */
        status: number;
        cb?: () => void;
    };
    setState(state: this["state"]): void {
        this.state = state;
        const equip = GModel.playerEquipment.equipment()[this.state.index];
        if (equip) {
            this.icon.imgName = equip.tbl().img;
            this.quality.imgName = GConstant.towerQualityBg[equip.tbl().quality];
            this.btn.text.setText([
                // this.state.status === 0?
                "_rs+" + GModel.playerEquipment.getTowerPlace()[this.state.index].level,
                // : equip.tbl().name,
            ]);
        } else {
            this.icon.node.active = false;
            this.quality.imgName = GConstant.towerQualityBg[0];
            this.btn.text.setText(["_rs+" + GModel.playerEquipment.getTowerPlace()[this.state.index].level]);
        }

        this.btn.onClick = this.state.cb;
        this.chosen.node.active = this.state.chosen;
        this.quality.node.active = this.state.status === 0;
    }

    playAni() {
        this.node.getChildByName("strengthen_effect").getComponent(cc.Animation).play();
    }
}
