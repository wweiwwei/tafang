import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import Item from "../../entity/Item";
import ListItemItem from "../common/ListItemItem";
import WindowCongratulation from "../common/WindowCongratulation";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemTower")
@ccclass
export default class ListItemTower extends UIListItem {
    // @autowired(UIButton) challenge: UIButton = null;
    /**楼层背景 */
    @autowired(UIImage) floor: UIImage = null;
    /**选择效果 */
    @autowired(UIImage) selected: UIImage = null;
    @autowired(UIButton) challenge: UIButton = null;
    @autowired(UIImage) sea: UIImage = null;
    /**已通关 */
    @autowired(UIImage) clear: UIImage = null;
    @autowired(UIImage) title: UIImage = null;
    @autowired(UILabel) level: UILabel = null;
    @autowired(UIList) rewardList: UIList<ListItemItem> = null;
    state: { towerLv: number; reward: Item[]; index: number };
    setState(state: this["state"]): void {
        this.state = state;
        this.node.name = this.state.towerLv.toString();
        let afklevel = GModel.tower.level();
        this.level.setText([GLang.code.ui.tower_level, "_rs" + this.state.towerLv]);
        this.rewardList.node.active = afklevel < this.state.towerLv;
        // this.selected.node.active = this.state.towerLv === afklevel + 1;
        this.clear.node.active = afklevel >= this.state.towerLv;
        // this.challenge.node.active = afklevel + 1 === this.state.towerLv;
        this.challenge.node.active = false;
        this.challenge.onClick = async () => {
            if (this.state.towerLv === -1) {
                GWindow.open(WindowCongratulation, { items: await GModel.tower.obtainLevelReward(afklevel) });
            } else if (afklevel + 1 === this.state.towerLv) {
                GModel.tower.challengeTower();
            }
            // else if (afklevel >= this.state.towerLv) {
            //     GTip.showTip([GLang.code.ui.clear]);
            // } else {
            //     GTip.showTip([GLang.code.ui.tower_challenge_order]);
            // }
        };
        if (this.state.towerLv === -1) {
            //this.floor.imgName = "pata_tower01";
            //改
            this.floor.imgName = "fuben_towerhome3";

            this.level.setText([GLang.code.ui.chest_level]);
            // this.challenge.node.active =
            //     afklevel >= this.state.index && !GState.data.towerData.hasGet.includes(GModel.tower.getMaxTower());
            this.challenge.node.active = false;
            this.challenge.text.setText([GLang.code.ui.get]);
            this.rewardList.node.active = !GState.data.towerData.hasGet.includes(GModel.tower.getMaxTower());
            this.clear.node.active = GState.data.towerData.hasGet.includes(GModel.tower.getMaxTower());
            this.clear.node.getChildByName("UILabel").getComponent(UILabel).setText([GLang.code.ui.get2]);
        }
        // else if (this.state.towerLv === 1) {
        // this.floor.imgName = "pata_tower01";
        // this.floor.node.setPosition(0, -65);
        // this.title.node.setPosition(0, 150);
        // this.rewardList.node.setPosition(0, 90);
        // this.sea.node.active = true;
        // this.challenge.node.setPosition(0, 0);
        // }
        else if (this.state.towerLv <= afklevel) {
            //this.floor.imgName = "pata_tower02";

            //改
            this.floor.imgName = "fuben_towerhome2";

            this.clear.node.active = true;
        } else {
            //this.floor.imgName = "pata_tower03";
            this.floor.imgName = "fuben_towerhome1";
        }
        // this.challenge.node.active = this.state.tower.towerLv === afklevel + 1;
        this.node.setContentSize(this.floor.node.getContentSize());
        this.node.getChildByName("content").setContentSize(this.floor.node.getContentSize());
        let arr = this.state.reward.map((t) => {
            return { carEquipment: null, equipment: null, item: t, status: 0 };
        });
        this.rewardList.setState(arr);
    }
}
