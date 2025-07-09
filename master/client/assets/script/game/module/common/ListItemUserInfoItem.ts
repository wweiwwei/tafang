import { autowired, registerClass } from "../../../framework/Decorator";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemUserInfoItem")
@ccclass
export default class ListItemUserInfoItem extends UIListItem {
    @autowired(UIImage) avatar: UIImage = null;
    @autowired(cc.Node) arena: cc.Node = null;
    @autowired(cc.Node) friend: cc.Node = null;
    state: {
        /**0-竞技场,1-好友*/
        status?: number;
        /** 角色头像 */
        roleIcon: number;
        /** 角色名字 */
        roleName: string;
        /** 角色战斗力 */
        battlePoint?: number;
        /** 角色头像 */
        headFrame?: number;
    };
    setState(state: this["state"]): void {
        this.state = state;
        let node: cc.Node = null;
        if (this.state.status === 0) {
            this.arena.active = true;
            node = this.arena;
        } else {
            this.friend.active = true;
            node = this.friend;
        }
        // this.avatar.imgName=this.state.headFrame/this.state.roleIcon
        node.getChildByName("userName")
            .getComponent(UILabel)
            .setText(["_rs" + this.state.roleName]);
        node.getChildByName("power")
            .getChildByName("label")
            .getComponent(UILabel)
            .setText(["_rs" + this.state.battlePoint]);
    }
}
