import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemDamageReward")
@ccclass
export default class ListItemDamageReward extends UIListItem {
    @autowired(UIButton) chest: UIButton = null;
    @autowired(UILabel) damage: UILabel = null;
    @autowired(UIImage) exclamation: UIImage = null;
    state: {
        id: number;
        cb: () => void;
    };
    setState(state: this["state"]): void {
        this.state = state;
        const tbl = GTable.getById("DamageChallengeTbl", this.state.id);
        this.damage.setText(["_rs" + GUtils.ui.getNumberString(tbl.damage, 1)]);
        let damage = tbl.kind === 1 ? GState.data.damageData.myDamage : GState.data.damageData.myMulDamage;
        this.exclamation.node.active =
            damage >= tbl.damage && !GState.data.damageData.hasGetReward.includes(this.state.id);
        this.chest.text.node.active = GState.data.damageData.hasGetReward.includes(this.state.id);
        this.chest.onClick = () => {
            if (damage >= tbl.damage) this.state.cb();
            else GTip.showTip([GLang.code.ui.damage_not_enough]);
        };
    }
}
