import { autowired, registerClass } from "../../../framework/Decorator";
import { GameDate } from "../../../framework/date/GameDate";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import ListItemUserInfoItem from "../common/ListItemUserInfoItem";
import WindowFriendDetail from "./WindowFriendDetail";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemFriend")
@ccclass
export default class ListItemFriend extends UIListItem {
    @autowired(UIList) userInfo: UIList<ListItemUserInfoItem> = null;
    @autowired(UILabel) dayBefore: UILabel = null;
    @autowired(UILabel) online: UILabel = null;
    state: {
        /** 角色头像 */
        roleIcon: number;
        /** 角色名字 */
        roleName: string;
        /** 角色id */
        roleId: number;
        /** 角色战斗力 */
        battlePoint: number;
        /** 角色等级 */
        level: number;
        /** 角色最后上线时间 */
        lastOnLineTime: number;
        /** 角色头像 */
        headFrame: number;
    };
    setState(state: this["state"]): void {
        this.state = state;
        let time = GameDate.now() - this.state.lastOnLineTime;
        this.online.node.active = time <= GameDate.OneMinute * 2;
        this.dayBefore.node.active = time > GameDate.OneMinute * 2;
        this.dayBefore.setText([GLang.code.ui.friends_day_before, "_rs" + Math.floor(time / GameDate.OneDay)]);
        this.userInfo.setState([
            {
                status: 1,
                roleIcon: this.state.roleIcon,
                roleName: this.state.roleName,
                battlePoint: this.state.battlePoint,
                headFrame: this.state.headFrame,
            },
        ]);
        let btn = this.node.getComponent(UIButton);
        btn.onClick = () => {
            GWindow.open(WindowFriendDetail, {
                roleIcon: this.state.roleIcon,
                roleName: this.state.roleName,
                battlePoint: this.state.battlePoint,
                roleId: this.state.roleId,
                headFrame: this.state.headFrame,
            });
        };
    }
}
