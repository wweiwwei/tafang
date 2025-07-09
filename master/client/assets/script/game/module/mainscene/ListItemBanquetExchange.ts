import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import UISpine from "../../../framework/ui/UISpine";
import { FriendInfo } from "../../entity/FriendInfo";
import Item from "../../entity/Item";
import EventName from "../../event/EventName";
import ListItemItem from "../common/ListItemItem";
import WindowCongratulation from "../common/WindowCongratulation";

const { ccclass } = cc._decorator;
@registerClass("ListItemBanquetExchange")
@ccclass
export default class ListItemBanquetExchange extends UIListItem {
    /**奖励 */
    @autowired(UIList) itemList: UIList<ListItemItem> = null;
    /**名称 */
    @autowired(UILabel) nameLab: UILabel = null;

    /**购买按钮 */
    @autowired(UIButton) buyBtn: UIButton = null;
    /**购买图标 */
    @autowired(UIImage) buyIcon: UIImage = null;
    /**购买价格 */
    @autowired(UILabel) buyNum: UILabel = null;

    state: {
        id: number;
    };

    setState(state: this["state"]): void {
        let tbl = GTable.getById("BanquetPackTbl", state.id);

        let item = Item.fromItemArray(tbl.reward)[0];
        let price = new Item(tbl.price[0], tbl.price[1]);

        this.itemList.setState([{ item: item, status: 0 }]);
        this.nameLab.setText(Item.getName(item));

        this.buyIcon.imgName = Item.getImg(price);
        this.buyNum.setText(["_rs" + price.count]);

        this.buyBtn.onClick = async () => {
            let reward = await GModel.banquet.buyPack(state.id);
            if (reward.length > 0) GWindow.open(WindowCongratulation, { items: reward });
        };
    }
}
