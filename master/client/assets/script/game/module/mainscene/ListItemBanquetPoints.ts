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

const { ccclass } = cc._decorator;
@registerClass("ListItemBanquetPoints")
@ccclass
export default class ListItemBanquetPoints extends UIListItem {
    /**奖励 */
    @autowired(UIList) rewardList: UIList<ListItemItem> = null;
    /**秒杀折扣 */
    @autowired(UILabel) point: UILabel = null;

    state: {
        id: number;
    };
    setState(state: this["state"]): void {
        let tbl = GTable.getById("BanquetPointRewardTbl", state.id);
        // console.log("test 1=", tbl.point[0], "2 =", tbl.point[1] == -1 ? "+" : "|", "3 =", tbl.point[1]);
        let str = "_rs" + tbl.point[0] + (tbl.point[1] == -1 ? "+" : "|" + tbl.point[1]);
        this.point.setText([str]);

        let a = Item.fromItemArray(tbl.reward).map((a) => {
            return { item: a, status: 0 };
        });
        this.rewardList.setState(a);
    }
}
