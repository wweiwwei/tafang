import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import ListItemItem from "./ListItemItem";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemAdPointItem")
@ccclass
export default class ListItemAdPointItem extends UIListItem {
    /**获得积分描述 */
    @autowired(UILabel) mission: UILabel = null;
    /**进度 */
    @autowired(UILabel) count: UILabel = null;
    /**领取进度 */
    @autowired(cc.ProgressBar) progress: cc.ProgressBar = null;
    /**领取按钮 */
    @autowired(UIButton) get: UIButton = null;
    /**奖励列表 */
    @autowired(UIList) rewardList: UIList<ListItemItem> = null;
    state: any;
    setState(state: this["state"]): void {
        this.state = state;
    }
}
