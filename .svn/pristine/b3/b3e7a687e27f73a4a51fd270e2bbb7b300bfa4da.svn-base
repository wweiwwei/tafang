import { autowired, registerClass } from "../../../framework/Decorator";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import ListItemUserInfoItem from "../common/ListItemUserInfoItem";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemRecordItem")
@ccclass
export default class ListItemRecordItem extends UIListItem {
    /**攻防状态 */
    @autowired(UIImage) status: UIImage = null;
    /**积分变化 */
    @autowired(UILabel) point: UILabel = null;
    /**用户信息 */
    @autowired(UIList) userInfo: UIList<ListItemUserInfoItem> = null;
    state: any;
    setState(state: this["state"]): void {
        this.state = state;
    }
}
