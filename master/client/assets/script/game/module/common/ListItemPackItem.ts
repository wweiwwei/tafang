import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import Item from "../../entity/Item";
import ListItemItem from "./ListItemItem";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemPackItem")
@ccclass
export default class ListItemPackItem extends UIListItem {
    /**礼包描述 */
    @autowired(UILabel) packName: UILabel = null;
    /**限购 */
    @autowired(UILabel) limit: UILabel = null;
    /**售罄 */
    @autowired(UILabel) soldout: UILabel = null;
    /**奖励物品 */
    @autowired(UIList) reward: UIList<ListItemItem> = null;
    /**购买 */
    @autowired(UIButton) purchase: UIButton = null;
    state: { id: number };
    setState(state: this["state"]): void {
        this.state = state;
        let rtbl = GTable.getById("RankPackTbl", this.state.id);
        let ctbl = GTable.getById("ChargeTbl", this.state.id);
        this.packName.setText([ctbl.name]);
        let count = GState.data.impactData.hasGetPackage.filter((p) => p === ctbl.id).length;
        this.limit.setText([GLang.code.ui.giftpack_limit, `_rs${rtbl.limit - count}`, `_rs${rtbl.limit}`]);
        this.limit.node.active = rtbl.limit !== -1;
        this.soldout.node.active = rtbl.limit !== -1 && count >= rtbl.limit;
        this.purchase.node.active = rtbl.limit === -1 || count < rtbl.limit;
        this.purchase.text.setText([GLang.code.ui.cost_money, "_rs" + ctbl.cny / 100]);
        this.purchase.onClick = () => {
            if (count >= rtbl.limit) return GTip.showTip([GLang.code.ui.charge_limited]);
            GModel.charge.pay(this.state.id, "");
        };
        let items = Item.fromItemArray(rtbl.reward).map((item) => {
            return { item, status: 0 };
        });
        this.reward.setState(items);
    }
}
