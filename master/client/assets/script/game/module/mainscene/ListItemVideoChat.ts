import { autowired, message, registerClass } from "../../../framework/Decorator";
import { GameDate } from "../../../framework/date/GameDate";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import UIWindow from "../../../framework/ui/UIWindow";
import { FriendInfo } from "../../entity/FriendInfo";
import Item from "../../entity/Item";
import { PlayerChatMessage } from "../../entity/PlayerChatMessage";
import { VideoGroupPurchase } from "../../entity/sharedData/VideoGroupPurchase";
import EventName from "../../event/EventName";
import ListItemItem from "../common/ListItemItem";
import WindowChatPlayerInfo from "./WindowChatPlayerInfo";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemVideoChat")
@ccclass
export default class ListItemVideoChat extends UIListItem {
    static _poolSize: number = 1;
    /**聊天根节点 */
    @autowired(cc.Node) leftChatNode: cc.Node = null;
    /**头像 */
    @autowired(UIImage) leftAvatar: UIImage = null;
    /**名字 */
    @autowired(UILabel) leftNameLabel: UILabel = null;

    /**title */
    @autowired(UILabel) lTitle: UILabel = null;
    /**奖励 */
    @autowired(UIList) lUiList: UIList<ListItemItem> = null;
    /**提示2 */
    @autowired(UILabel) lTips: UILabel = null;

    /**聊天根节点 */
    @autowired(cc.Node) rightChatNode: cc.Node = null;
    /**头像 */
    @autowired(UIImage) rightAvatar: UIImage = null;
    /**名字 */
    @autowired(UILabel) rightNameLabel: UILabel = null;

    /**title */
    @autowired(UILabel) rTitle: UILabel = null;
    /**奖励 */
    @autowired(UIList) rUiList: UIList<ListItemItem> = null;
    /**提示2 */
    @autowired(UILabel) rTips: UILabel = null;

    /**左 点击 */
    private lPayBtn: UIButton = null;
    /**又 点击 */
    private rPayBtn: UIButton = null;

    private tbl: VideoGroupPurchaseTbl = null;

    state: {
        status: "word" | "friend" | "privateChatList" | "privateChat";
        info: { data: VideoGroupPurchase; info: FriendInfo };
        headClickCB?: Function;
        endCB?: Function;
    };

    setState(state: this["state"]): void {
        this.unschedule(this.ref);
        this.state = state;
        this.tbl = GTable.getById("VideoGroupPurchaseTbl", this.state.info.data.rewardId);
        this.lPayBtn = this.lUiList.node.parent.parent.getComponent(UIButton);
        this.rPayBtn = this.rUiList.node.parent.parent.getComponent(UIButton);
        this.lPayBtn.setGrey(false);
        this.rPayBtn.setGrey(false);
        this.node.active = false;

        if (
            GState.sharedData.videoGroupPurchaseShared[this.state.info.data.uniqueId].roleIdList.length >=
            this.tbl.limit
        ) {
            //已满人
        }

        this.leftNameLabel.setText(["_rs" + this.state.info.info.roleName]);
        this.rightNameLabel.setText(["_rs" + this.state.info.info.roleName]);
        this.leftAvatar.imgName = GTable.getById("HeroTbl", state.info.info.roleIcon).img + "_head";
        this.rightAvatar.imgName = GTable.getById("HeroTbl", state.info.info.roleIcon).img + "_head";
        // let tbl=GTable.getById("VideoGroupPurchaseTbl",this.state.info.data.uniqueId)
        this.lTitle.setText([GLang.code.ui.videoGroup_title]);
        this.rTitle.setText([GLang.code.ui.videoGroup_title]);

        if (state.info.info.roleId != HttpServer.roleId) {
            this.leftChatNode.active = true;
            this.rightChatNode.active = false;
        } else {
            this.leftChatNode.active = false;
            this.rightChatNode.active = true;
        }

        this.node.active = true;
        if (state.endCB) state.endCB();

        this.leftAvatar.getComponent(UIButton).onClick = () => {
            GWindow.open(WindowChatPlayerInfo, {
                friendInfo: state.info.info,
                headClickCB: (id: number, name: string) => {
                    if (this.state.headClickCB) this.state.headClickCB(id, name);
                },
            });
        };

        this.lPayBtn.onClick = () => {
            this.playVideo();
        };
        this.rPayBtn.onClick = () => {
            this.playVideo();
        };
        this.showReword();

        this.schedule(this.ref, 1);
    }

    async playVideo() {
        if (
            GState.sharedData.videoGroupPurchaseShared[this.state.info.data.uniqueId] &&
            GState.sharedData.videoGroupPurchaseShared[this.state.info.data.uniqueId].roleIdList.includes(
                HttpServer.roleId
            )
        ) {
            GTip.showTip([GLang.code.ui.videoGroup_pay]); //已购买
            return;
        }

        if (GModel.videoGroupPurchase.todayRemainJoin() <= 0) {
            GTip.showTip([GLang.code.ui.videoGroup_noDayGroup]); //今日加入团购次数不足
            return;
        }

        if (
            GState.sharedData.videoGroupPurchaseShared[this.state.info.data.uniqueId].roleIdList.length >=
            this.tbl.limit
        ) {
            GTip.showTip([GLang.code.ui.videoGroup_ymr]); //已满人
            return;
        }

        if (GameDate.now() > this.state.info.data.endTime) {
            GTip.showTip([GLang.code.ui.videoGroup_expire]); //已过期
            this.lPayBtn.setGrey(true);
            this.rPayBtn.setGrey(true);
            return;
        }

        await GModel.videoGroupPurchase.joinGroupPurchase(this.state.info.data.uniqueId);
        await GModel.videoGroupPurchase.reportVideo();
    }

    // @message([EventName.sharedDataKey.videoGroupPurchaseShared])
    ref() {
        let a: string[][] = [];
        if (GameDate.nowUpdated() > this.state.info.data.endTime) {
            a.push([GLang.code.ui.videoGroup_expire]);

            this.lPayBtn.setGrey(true);
            this.rPayBtn.setGrey(true);
            this.unschedule(this.ref);
        } else {
            if (
                GState.sharedData.videoGroupPurchaseShared[this.state.info.data.uniqueId] &&
                GState.sharedData.videoGroupPurchaseShared[this.state.info.data.uniqueId].roleIdList.includes(
                    HttpServer.roleId
                )
            ) {
                a.push([GLang.code.ui.videoGroup_pay]);
            }
            let alltime = this.state.info.data.endTime - this.state.info.data.beginTime;
            if (GameDate.nowUpdated() - this.state.info.data.beginTime < alltime) {
                a.push(
                    [
                        "_rs" +
                            GUtils.date.formatRemainTime(
                                alltime - (GameDate.nowUpdated() - this.state.info.data.beginTime),
                                "hh:mm:ss"
                            ),
                    ],
                    [GLang.code.ui.videoGroup_tips2]
                );
            }
        }
        this.lTips.setText(...a);
        this.rTips.setText(...a);
    }

    showReword() {
        let a = Item.fromItemArray(this.tbl.reward).map((a) => {
            return { item: a, status: 0 };
        });
        this.lUiList.setState(a);
        this.rUiList.setState(a);
    }
}
