import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import { FriendData } from "../../server/GApi";
import ListItemUserInfoItem from "../common/ListItemUserInfoItem";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemFriendItem")
@ccclass
export default class ListItemFriendItem extends UIListItem {
    /**用户信息 */
    @autowired(UIList) userInfo: UIList<ListItemUserInfoItem> = null;
    /**申请 */
    @autowired(UIButton) apply: UIButton = null;
    /**拒绝 */
    @autowired(UIButton) decline: UIButton = null;
    /**接受 */
    @autowired(UIButton) accept: UIButton = null;
    /**移除 */
    @autowired(UIButton) remove: UIButton = null;
    state: {
        /**0-添加，1-申请，2-黑名单 */
        status: number;
        info: FriendData;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.apply.onClick = () => {
            GModel.friend.sendFriendApplication(this.state.info.roleId);
        };
        this.decline.onClick = () => {
            GModel.friend.rejectFriendApplication(this.state.info.roleId);
        };
        this.accept.onClick = () => {
            GModel.friend.acceptFriendApplication(this.state.info.roleId);
        };
        this.remove.onClick = () => {};
        this.apply.node.active = this.state.status === 0;
        this.decline.node.active = this.state.status === 1;
        this.accept.node.active = this.state.status === 1;
        this.remove.node.active = this.state.status === 2;
        this.userInfo.setState([
            {
                status: 1,
                roleIcon: this.state.info.roleIcon,
                roleName: this.state.info.roleName,
                battlePoint: this.state.info.battlePoint,
                headFrame: this.state.info.headFrame,
            },
        ]);
    }
}
