import { autowired, message, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIEditBox from "../../../framework/ui/UIEditBox";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UIWindow from "../../../framework/ui/UIWindow";
import { FriendData } from "../../server/GApi";
import ListItemFriendItem from "./ListItemFriendItem";

const { ccclass, property } = cc._decorator;
@registerClass("WindowFriendManagement")
@ccclass
export default class WindowFriendManagement extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    //-------------------------公共----------------------------
    @autowired(UIButton) closeBtn: UIButton = null;
    /**添加好友 */
    @autowired(UIButton) add: UIButton = null;
    /**好友申请 */
    @autowired(UIButton) apply: UIButton = null;
    /**黑名单 */
    @autowired(UIButton) blackList: UIButton = null;
    /**好友申请感叹号 */
    @autowired(UIImage) exclamation: UIImage = null;
    /**标题 */
    @autowired(UILabel) title: UILabel = null;
    /**好友人数 */
    @autowired(UILabel) friendCount: UILabel = null;
    /**添加好友节点 */
    @autowired(cc.Node) addfriend: cc.Node = null;
    /**好友申请节点 */
    @autowired(cc.Node) friendApply: cc.Node = null;
    /**黑名单节点 */
    @autowired(cc.Node) black: cc.Node = null;
    //-------------------------添加----------------------------
    /**好友推荐列表 */
    @autowired(UIScrollList) friendsList: UIScrollList<ListItemFriendItem> = null;
    /**换一批按钮 */
    @autowired(UIButton) change: UIButton = null;
    /**查询按钮 */
    @autowired(UIButton) search: UIButton = null;
    /**查询 */
    @autowired(UIEditBox) searchName: UIEditBox = null;
    //-------------------------申请----------------------------
    /**无申请 */
    @autowired(UILabel) noApplyment: UILabel = null;
    /**申请列表 */
    @autowired(UIScrollList) applyList: UIScrollList<ListItemFriendItem> = null;
    /**全部忽略按钮 */
    @autowired(UIButton) ignoreAll: UIButton = null;
    /**全部同意按钮 */
    @autowired(UIButton) applyAll: UIButton = null;
    //-------------------------黑名单----------------------------
    /**无黑名单 */
    @autowired(UILabel) noBlackList: UILabel = null;
    /**黑名单列表 */
    @autowired(UIScrollList) blockList: UIScrollList<ListItemFriendItem> = null;
    _windowParam: any;
    _returnValue: any;
    private page = 0;
    protected onInited(): void {
        this.changePage();
        this.clickEven();
    }
    clickEven() {
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.add.onClick = () => {
            this.page = 0;
            this.changePage();
        };
        this.apply.onClick = () => {
            this.page = 1;
            this.changePage();
        };
        this.blackList.onClick = () => {
            this.page = 2;
            this.changePage();
        };
        this.change.onClick = () => {
            this.refreshAddList();
        };
        this.search.onClick = () => {
            GModel.friend.searchPlayer(this.searchName.string);
        };
        this.ignoreAll.onClick = () => {
            GModel.friend.rejectAllFriendApplication();
        };
        this.applyAll.onClick = () => {
            GModel.friend.acceptAllFriendApplication();
        };
    }
    changePage() {
        this.addfriend.active = this.page === 0;
        this.friendApply.active = this.page === 1;
        this.black.active = this.page === 2;
        this.apply.bg.imgName = this.page === 0 ? GConstant.friendChosen.chosen : GConstant.friendChosen.unchosen;
        this.add.bg.imgName = this.page === 1 ? GConstant.friendChosen.chosen : GConstant.friendChosen.unchosen;
        this.blackList.bg.imgName = this.page === 2 ? GConstant.friendChosen.chosen : GConstant.friendChosen.unchosen;
        if (this.page === 0) {
            this.title.setText([GLang.code.ui.friends_add_friend]);
            this.refreshAddList();
        } else if (this.page === 1) {
            this.title.setText([GLang.code.ui.friends_applyment]);
            this.refreshApplication();
        } else {
            this.title.setText([GLang.code.ui.friends_black_list]);
            this.refreshBlockList();
        }
    }
    // @message([])
    async refreshCount() {
        this.page === 2
            ? this.friendCount.setText([GLang.code.ui.friends_black_list_count], ["_rs0/0"])
            : this.friendCount.setText(
                  [GLang.code.ui.friends],
                  ["_rs" + (await GModel.friend.onlineFriend()) + "/" + (await GModel.friend.friendList()).length]
              );
    }
    // @message([])
    async refreshAddList() {
        let state = await GModel.friend.friendRecommend();
        this.friendsList.setState(
            state.map((s) => {
                return { status: this.page, info: s };
            })
        );
    }
    // @message([])
    async refreshApplication() {
        let applicationList = await GModel.friend.friendApplicationList();
        this.exclamation.node.active = applicationList.length > 0;
        this.noApplyment.node.active = applicationList.length === 0;
        this.applyList.setState(
            applicationList.map((s) => {
                return { status: this.page, info: s };
            })
        );
    }
    // @message([])
    async refreshBlockList() {
        this.blockList.node.active = true;
    }
}
