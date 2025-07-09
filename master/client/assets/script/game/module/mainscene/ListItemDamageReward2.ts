import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import Item from "../../entity/Item";
import ListItemItem from "../common/ListItemItem";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemDamageReward2")
@ccclass
export default class ListItemDamageReward2 extends UIListItem {
    @autowired(UIButton) get: UIButton = null;
    @autowired(UILabel) require: UILabel = null;
    @autowired(UILabel) hasGet: UILabel = null;
    @autowired(UIList) reward: UIList<ListItemItem> = null;
    state: {
        id: number;
    };
    setState(state: this["state"]): void {
        this.state = state;
        const tbl = GTable.getById("DamageChallengeTbl", this.state.id);
        const damage = tbl.kind === 1 ? GState.data.damageData.myDamage : GState.data.damageData.myMulDamage;
        let rewardItem = Item.fromItemArray(tbl.reward).map((item) => {
            return { item, status: 0 };
        });
        this.reward.setState(rewardItem);
        this.require.setText([GLang.code.ui.damage_require, "_rs" + GUtils.ui.getNumberString(tbl.damage, 1)]);
        this.hasGet.node.active = GState.data.damageData.hasGetReward.includes(this.state.id);
        this.get.node.active = !GState.data.damageData.hasGetReward.includes(this.state.id);
        this.get.setGrey(damage < tbl.damage);
        this.get.text.setText([damage >= tbl.damage ? GLang.code.ui.get : GLang.code.ui.noAchieve]);
        this.get.onClick = () => {
            if (damage >= tbl.damage) {
                GModel.damage.getReward([this.state.id]);
            } else {
                GTip.showTip([GLang.code.ui.damage_not_achieve]);
            }
        };
    }
}
