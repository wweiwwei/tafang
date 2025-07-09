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

const { ccclass } = cc._decorator;
@registerClass("ListItemBanquetRank")
@ccclass
export default class ListItemBanquetRank extends UIListItem {
    /**秒杀折扣 */
    @autowired(UIImage) lvBg: UIImage = null;
    /**秒杀折扣 */
    @autowired(UILabel) lv: UILabel = null;
    /**秒杀折扣 */
    @autowired(UILabel) nameLab: UILabel = null;
    /**秒杀折扣 */
    @autowired(UILabel) point: UILabel = null;

    state: {
        rank: number;
        info: FriendInfo;
        point: number;
    };
    setState(state: this["state"]): void {
        // this.lvBg.imgName = state.rank > 3 ? "banqueRank4" : "banqueRank" + this.lv;
        this.lv.setText(["_rs" + state.rank]);
        this.nameLab.setText(["_rs" + state.info.roleName]);
        this.point.setText(["_rs" + state.point]);
    }
}
