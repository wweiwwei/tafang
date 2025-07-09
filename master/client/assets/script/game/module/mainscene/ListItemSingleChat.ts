import { autowired, message, registerClass } from "../../../framework/Decorator";
import { GameDate } from "../../../framework/date/GameDate";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
import { FriendInfo } from "../../entity/FriendInfo";
import { PlayerChatMessage } from "../../entity/PlayerChatMessage";
import WindowChatPlayerInfo from "./WindowChatPlayerInfo";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemSingleChat")
@ccclass
export default class ListItemSingleChat extends UIListItem {
    static _poolSize: number = 1;
    /**聊天根节点 */
    @autowired(cc.Node) leftChatNode: cc.Node = null;
    /**头像 */
    @autowired(UIImage) leftAvatar: UIImage = null;
    /**内容 */
    @autowired(UILabel) leftText1: UILabel = null;
    /**名字 */
    @autowired(UILabel) leftNameLabel: UILabel = null;

    /**聊天根节点 */
    @autowired(cc.Node) rightChatNode: cc.Node = null;
    /**头像 */
    @autowired(UIImage) rightAvatar: UIImage = null;
    /**内容 */
    @autowired(UILabel) rightText1: UILabel = null;
    /**名字 */
    @autowired(UILabel) rightNameLabel: UILabel = null;
    /**间隔时间 */
    @autowired(UILabel) text2: UILabel = null;

    state: {
        lastTime: number;
        status?: "word" | "friend" | "privateChatList" | "privateChat";
        info: { data: PlayerChatMessage; info: FriendInfo };
        headClickCB?: Function;
        endCB?: Function;
    };

    setState(state: this["state"]): void {
        this.node.active = false;
        this.text2.node.parent.parent.active = false;
        // this.text1.node.parent.active = false;
        this.state = state;

        this.leftNameLabel.setText(["_rs" + this.state.info.info.roleName]);
        this.rightNameLabel.setText(["_rs" + this.state.info.info.roleName]);
        this.leftAvatar.imgName = GTable.getById("HeroTbl", state.info.info.roleIcon).img + "_head";
        this.rightAvatar.imgName = GTable.getById("HeroTbl", state.info.info.roleIcon).img + "_head";

        this.leftText1.setText(["_rs" + this.state.info.data.msg]);
        this.rightText1.setText(["_rs" + this.state.info.data.msg]);
        this.showTimeTips();
        if (state.info.info.roleId != HttpServer.roleId) {
            this.leftChatNode.active = true;
            this.rightChatNode.active = false;
        } else {
            this.leftChatNode.active = false;
            this.rightChatNode.active = true;
        }

        if (this.state.info.data.msg.length > 15) {
            this.leftText1.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
            this.leftText1.node.width = 236;
            this.leftText1.node.parent.getComponents(cc.Layout)[0].enabled = false;

            this.rightText1.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
            this.rightText1.node.width = 236;
            this.rightText1.node.parent.getComponents(cc.Layout)[0].enabled = false;
        } else {
            this.leftText1.overflow = cc.Label.Overflow.NONE;
            this.leftText1.node.parent.getComponents(cc.Layout)[0].enabled = true;

            this.rightText1.overflow = cc.Label.Overflow.NONE;
            this.rightText1.node.parent.getComponents(cc.Layout)[0].enabled = true;
        }
        // this.text1.node.parent.active = true;
        this.node.active = true;
        if (this.state.endCB) this.state.endCB();

        this.leftAvatar.getComponent(UIButton).onClick = () => {
            GWindow.open(WindowChatPlayerInfo, {
                friendInfo: state.info.info,
                headClickCB: (id: number, name: string) => {
                    if (this.state.headClickCB) this.state.headClickCB(id, name);
                },
            });
        };
    }

    showTimeTips() {
        if (this.state.lastTime == 0 || this.state.info.data.ts - this.state.lastTime > 5 * GameDate.OneMinute) {
            const chatDate = new GameDate(this.state.info.data.ts);
            const todayBegin = new GameDate().todayStartTime();
            this.text2.node.parent.parent.active = true;
            if (this.state.info.data.ts < todayBegin) {
                // 显示月日时分秒
                const str = chatDate.format("MM-DD hh:mm");
                this.text2.setText(["_rs" + str]);
            } else {
                // 时分秒
                const str = chatDate.format("hh:mm");
                this.text2.setText(["_rs" + str]);
            }
        }
    }
}
