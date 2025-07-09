import { autowired, registerClass } from "../../../framework/Decorator";
import { GameDate } from "../../../framework/date/GameDate";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import UIWindow from "../../../framework/ui/UIWindow";
import { DateUtil } from "../../../framework/utils/DateUtils";
import { FriendInfo } from "../../entity/FriendInfo";
import { PlayerChatMessage } from "../../entity/PlayerChatMessage";
import { DataModel } from "../../model/GModel";
import ListItemUserInfoItem from "../common/ListItemUserInfoItem";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemPrivateChat")
@ccclass
export default class ListItemPrivateChat extends UIListItem {
    /**头衔 */
    @autowired(UIImage) avatar: UIImage = null;
    /**左边label */
    @autowired(UILabel) leftLabel1: UILabel = null;
    @autowired(UILabel) leftLabel2: UILabel = null;
    @autowired(UILabel) leftLabel3: UILabel = null;
    /**右时间 */
    @autowired(UILabel) rightLabel1: UILabel = null;
    /**进入聊天 */
    @autowired(UIButton) chatIcon: UIButton = null;

    // private nodeButton: UIButton = null;
    protected onInited(): void {
        // this.nodeButton = this.node.getComponent(UIButton);
    }
    state: {
        status: "word" | "friend" | "privateChatList" | "privateChat";
        info: any;
        itemClickCB: Function;
        endCB?: Function;
    };

    private lastOnLineTime: number = 0;

    setState(state: this["state"]): void {
        this.state = state;
        if (state.status == "privateChatList") {
            this.setPrivateChat();
        } else if (state.status == "friend") {
            this.setFriend();
        }
        if (state.endCB) state.endCB();
    }

    private setPrivateChat() {
        let data: { info: FriendInfo; lastMsg: PlayerChatMessage } = this.state.info;
        this.lastOnLineTime = data.lastMsg.ts;
        this.leftLabel1.setText(["_rs" + data.info.roleName + "  Lv." + data.info.level]);
        this.leftLabel2.setText(["_rs" + data.lastMsg.msg]); //战力值
        this.avatar.imgName = GTable.getById("HeroTbl", data.info.roleIcon).img + "_head";
        this.setTime(this.rightLabel1);
        this.node.getComponent(UIButton).setEnable(true);
        this.node.getComponent(UIButton).onClick = () => {
            if (this.state.itemClickCB) this.state.itemClickCB(data.info.roleId, data.info.roleName);
        };
        this.chatIcon.node.active = false;
        this.rightLabel1.node.active = true;
        this.leftLabel3.node.active = false;
    }

    private setFriend() {
        let info: FriendInfo = this.state.info;
        this.lastOnLineTime = info.lastOnLineTime;
        this.leftLabel1.setText(["_rs" + info.roleName + "  Lv." + info.level]);
        this.leftLabel2.setText(["ui/chatBattlePoint"], ["_rs" + info.battlePoint]); //战力值
        this.avatar.imgName = GTable.getById("HeroTbl", info.roleIcon).img + "_head";
        this.setTime(this.leftLabel3);

        this.node.getComponent(UIButton).setEnable(false);
        this.chatIcon.node.active = true;
        this.rightLabel1.node.active = false;
        this.leftLabel3.node.active = true;

        this.chatIcon.onClick = () => {
            if (this.state.itemClickCB) this.state.itemClickCB(this.state.info.roleId, this.state.info.roleName);
        };
    }

    private setTime(label: UILabel) {
        let t = GameDate.now() - this.lastOnLineTime;
        if (t <= 0) t = 0;
        if (t < 24 * GameDate.OneHour) {
            let timeObj = GameDate.formatToHHMM(t);

            if (timeObj.hour == 0 && timeObj.minute < 1) {
                label.setText([GLang.code.ui.chatJust]); //刚刚
                return;
            }

            if (timeObj.hour > 0) {
                return label.setText(
                    ["_rs" + timeObj.hour],
                    [GLang.code.ui.chatHour],
                    ["_rs" + timeObj.minute],
                    [GLang.code.ui.chatMinute],
                    [GLang.code.ui.chatFront]
                );
            }
            return label.setText(["_rs" + timeObj.minute], [GLang.code.ui.chatMinute], [GLang.code.ui.chatFront]);
        } else {
            let func = (millisecond) => {
                const day = Math.floor(millisecond / GameDate.OneDay);
                return day;
            };
            label.setText(["_rs" + func(t)], [GLang.code.ui.chatDay], [GLang.code.ui.chatFront]); //多少天前
        }
    }
}
