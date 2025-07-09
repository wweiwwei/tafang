import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIWindow from "../../../framework/ui/UIWindow";
import { FriendInfo } from "../../entity/FriendInfo";
import EventName from "../../event/EventName";
import ListItemClearAd from "./ListItemClearAd";

const { ccclass, property } = cc._decorator;

@registerClass("WindowChatPlayerInfo")
@ccclass
export default class WindowChatPlayerInfo extends UIWindow {
    _windowParam: {
        friendInfo: FriendInfo;
        /**打开私聊 */
        headClickCB: Function;
    };
    _returnValue: any;

    @autowired(UIButton) closeBtn: UIButton = null;
    /**头像 */
    @autowired(UIImage) avatar: UIImage = null;
    /**挑战 */
    @autowired(UIButton) challenge: UIButton = null;
    /**私聊 */
    @autowired(UIButton) privateChat: UIButton = null;
    /**添加好友 */
    @autowired(UIButton) addPlayer: UIButton = null;
    /**加黑名单 */
    @autowired(UIButton) addBlacklist: UIButton = null;

    @autowired(UILabel) nameLabel: UILabel = null;
    @autowired(UILabel) userId: UILabel = null;
    @autowired(UILabel) power: UILabel = null;

    protected onInited(): void {
        this.addPlayer.node.active = false;
        this.addBlacklist.node.active = false;
        this.isHaveFriend(this._windowParam.friendInfo.roleId);
        this.isHaveBlock(this._windowParam.friendInfo.roleId);
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.challenge.onClick = () => {
            this.onChallenger();
        };
        this.privateChat.onClick = () => {
            this.onPrivateChat();
        };
        this.addPlayer.onClick = () => {
            this.onAddPlayer();
        };
        this.addBlacklist.onClick = () => {
            this.onAddBlacklist();
        };

        this.avatar.imgName = GTable.getById("HeroTbl", this._windowParam.friendInfo.roleIcon).img + "_head";
        this.nameLabel.setText(["_rs" + this._windowParam.friendInfo.roleName]);
        this.userId.setText(["_rs" + this._windowParam.friendInfo.roleId]);
        this.power.setText(["_rs" + this._windowParam.friendInfo.battlePoint]);
    }

    onChallenger() {
        GModel.friend.challenge(this._windowParam.friendInfo.roleId);
        this.close();
    }
    onPrivateChat() {
        if (this._windowParam.headClickCB)
            this._windowParam.headClickCB(this._windowParam.friendInfo.roleId, this._windowParam.friendInfo.roleName);
        this.close();
    }
    onAddPlayer() {
        if (HttpServer.roleId == this._windowParam.friendInfo.roleId) {
            this.addPlayer.node.active = false;
            this.addBlacklist.node.active = false;
            return;
        }
        GModel.friend.sendFriendApplication(this._windowParam.friendInfo.roleId);
        this.close();
    }
    onAddBlacklist() {
        GModel.friend.addBlackList(this._windowParam.friendInfo.roleId);
        this.close();
    }

    @message([EventName.refreshFriend])
    async isHaveFriend(roleId: number) {
        this.addPlayer.node.active = !(await GModel.friend.isFriend(roleId));
    }
    @message([EventName.refreshFriend])
    async isHaveBlock(roleId: number) {
        this.addBlacklist.node.active = !(await GModel.friend.isBlackList(roleId));
    }
}
