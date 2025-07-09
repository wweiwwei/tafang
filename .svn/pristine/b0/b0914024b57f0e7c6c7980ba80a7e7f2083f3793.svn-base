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
@registerClass("ListItemBanquetStore")
@ccclass
export default class ListItemBanquetStore extends UIListItem {
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
    /**限购次数 */
    @autowired(UILabel) storage: UILabel = null;

    state: {
        id: number;
    };
    setState(state: this["state"]): void {
        this.state = state;
        let tbl = GTable.getById("BanquetShopTbl", state.id);

        let item = new Item(tbl.item[0], tbl.item[1]);
        let price = new Item(tbl.price[0], tbl.price[1]);

        this.itemList.setState([{ item: item, status: 0 }]);
        this.nameLab.setText(Item.getName(item));

        this.buyIcon.imgName = Item.getImg(price);
        this.buyNum.setText(["_rs" + price.count]);

        let haveNum = 0;
        if (tbl.storage > 0) this.storage.setText([GLang.code.ui.banquet_xg], ["_rs[" + haveNum + "/" + tbl.storage]);
        else this.storage.setText(["_rs"]);

        if (tbl.storage > 0 && haveNum >= tbl.storage) {
            this.buyBtn.setGrey(true);
            this.buyBtn.setEnable(false);
        }

        this.buyBtn.onClick = async () => {
            if (tbl.storage > 0 && haveNum >= tbl.storage) {
                GTip.showTip([GLang.code.ui.banquet_xgTips]);
                return;
            }
            let reward = await GModel.banquet.buyItem(state.id, item);
            if (reward.length > 0) GWindow.open(WindowCongratulation, { items: reward });
        };
    }
}
