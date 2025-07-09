import { autowired, message, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UIWindow from "../../../framework/ui/UIWindow";
import EventName from "../../event/EventName";
import ListItemItem from "../common/ListItemItem";
import ListItemEmailItem from "./ListItemEmailItem";

const { ccclass, property } = cc._decorator;
@registerClass("WindowEmail")
@ccclass
export default class WindowEmail extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    /**邮件列表 */
    @autowired(UIScrollList) emailList: UIScrollList<ListItemEmailItem> = null;
    /**奖励列表 */
    @autowired(UIList) rewardList: UIList<ListItemItem> = null;
    /**邮件内容 */
    @autowired(cc.Node) containar: cc.Node = null;
    /**暂无邮件 */
    @autowired(UILabel) none: UILabel = null;
    @autowired(UILabel) emailName: UILabel = null;
    @autowired(UILabel) detail: UILabel = null;
    @autowired(UILabel) sender: UILabel = null;
    @autowired(UILabel) date: UILabel = null;
    @autowired(UIButton) getAll: UIButton = null;
    @autowired(UIButton) closeBtn: UIButton = null;
    @autowired(UIImage) exclamation: UIImage = null;
    /**有邮件 */
    @autowired(UIButton) getAll2: UIButton = null;
    @autowired(UIButton) newClose2: UIButton = null;
    @autowired(UIImage) exclamation2: UIImage = null;
    /**右上角退出按钮 */
    @autowired(UIButton) newClose: UIButton = null;
    _windowParam: { cb: Function };
    _returnValue: any;
    protected onInited(): void {
        this.windowInit();
    }
    windowInit() {
        this.closeBtn.setTransition(false);
        this.closeBtn.onClick = () => {
            if (this._windowParam.cb) this._windowParam.cb();
            this.close();
        };
        this.newClose.onClick = () => {
            this.close();
        };
        this.getAll.onClick = async () => {
            let data = await GModel.email.getAllEmailReward();
            data.forEach((d) => GTip.showRewardItem(d));
        };
        this.none.node.active = false;
        this.containar.active = false;
        this.getAll.setGrey(GModel.email.emailList().length === 0);
        this.getAll.text.setText([GLang.code.ui.get_all]);
        console.log(GModel.email.emailList());
        this.refreshEmail();
    }
    @message([EventName.stateKey.email])
    refreshEmail() {
        let emailarr = GModel.email.emailList().map((t) => {
            let cb = () => {
                this.containar.active = true;
                this.emailList.node.active = false;
                this.emailName.setText(["_rs" + t.title]);
                this.detail.setText(["_rs" + t.content]);
                this.date.setText(["_rs" + new Date(t.endTime).toLocaleDateString()]);
                this.rewardList.setState(
                    t.reward.map((v) => {
                        return { item: v, status: 0 };
                    })
                );
                this.getAll.text.setText([GLang.code.ui.get_and_delete]);
                this.getAll.onClick = async () => {
                    let data = await GModel.email.getEmailReward(t.id);
                    this.windowInit();
                    data.forEach((d) => GTip.showRewardItem(d));
                };
                this.closeBtn.onClick = () => {
                    this.windowInit();
                };
            };
            return { email: t, cb };
        });
        this.emailList.setState(emailarr);
        this.none.node.active = emailarr.length === 0;
        this.emailList.node.active = emailarr.length > 0;
        this.exclamation.node.active = emailarr.find((t) => !t.email.hasGet) !== undefined;
    }
}
