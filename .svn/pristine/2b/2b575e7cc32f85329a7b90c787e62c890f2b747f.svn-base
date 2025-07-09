import { autowired, message, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIEditBox from "../../../framework/ui/UIEditBox";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIWindow from "../../../framework/ui/UIWindow";
import EventName from "../../event/EventName";
import WindowCongratulation from "../common/WindowCongratulation";
import WindowServerSelect from "../loading/WindowServerSelect";
import WindowSetPlayerInfo from "./WindowSetPlayerInfo";

const { ccclass, property } = cc._decorator;
@registerClass("WindowOptions")
@ccclass
export default class WindowOptions extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    @autowired(cc.Node) touch: cc.Node = null;
    @autowired(UILabel) username: UILabel = null;
    @autowired(UILabel) userid: UILabel = null;
    @autowired(UILabel) userlv: UILabel = null;
    @autowired(UIImage) avatar: UIImage = null;
    /**编辑玩家信息按钮 */
    @autowired(UIButton) edit: UIButton = null;
    /**更换服务器按钮 */
    @autowired(UIButton) changeServer: UIButton = null;
    /**兑换按钮 */
    @autowired(UIButton) exchange: UIButton = null;
    @autowired(UIButton) simple: UIButton = null;
    @autowired(UIButton) traditional: UIButton = null;
    @autowired(UIButton) english: UIButton = null;
    @autowired(UIButton) closeBtn: UIButton = null;
    /**音乐开关 */
    @autowired(UIButton) musicSwitch: UIButton = null;
    /**音效开关 */
    @autowired(UIButton) soundSwitch: UIButton = null;
    @autowired(UIImage) musicOpen: UIImage = null;
    @autowired(UIImage) musicClose: UIImage = null;
    @autowired(UIImage) soundOpen: UIImage = null;
    @autowired(UIImage) soundClose: UIImage = null;
    /**官方群 */
    @autowired(UILabel) group: UILabel = null;
    /**点击复制 */
    @autowired(UILabel) copy: UILabel = null;
    /**隐私协议 */
    @autowired(UILabel) agreement: UILabel = null;
    /**兑换码输入框 */
    @autowired(UIEditBox) code: UIEditBox = null;
    /** 换服功能 */
    @autowired(cc.Node) changeServerNode: cc.Node = null;
    _windowParam: any;
    _returnValue: any;
    private touchCount = 0;
    protected onInited(): void {
        if (HttpServer.playerInfo.playerGroup === 99) {
            this.touch.on(cc.Node.EventType.TOUCH_END, (event: cc.Event.EventTouch) => {
                this.touchCount++;
                if (this.touchCount >= 3) {
                    GTest.gmToggle();
                }
            });
        }
        this.closeBtn.setTransition(false);
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.simple.onClick = () => {};
        this.traditional.onClick = () => {
            GTip.showTip(["_rs功能开发中，敬请期待"]);
        };
        this.english.onClick = () => {
            GTip.showTip(["_rs功能开发中，敬请期待"]);
        };
        this.edit.onClick = () => {
            // GTest.gmToggle();
            GWindow.open(WindowSetPlayerInfo, {
                closeCB: () => {
                    this.refPlayerInfo();
                },
            });
        };
        this.userid.setText([`_rsUserID:${HttpServer.roleId}`]);
        // this.userlv.setText(["_rslv." + GModel.facility.captainRank()]);
        this.refPlayerInfo();
        // if (HttpServer.packageInfo.packageInfo.cdkey) {
        //     this.exchange.onClick = async () => {
        //         const reward = await GModel.email.getCdKeyReward(this.code.string);
        //         GWindow.open(WindowCongratulation, { items: reward });
        //     };
        // } else {
        //     this.code.node.active = false;
        //     this.exchange.node.active = false;
        // }
        // if (HttpServer.packageInfo.packageInfo.showQQ) {
        //     this.group.node.active = true;
        //     this.copy.node.active = true;
        //     this.group.setText([GLang.code.ui.options_group, "_rs" + HttpServer.packageInfo.packageInfo.qq]);
        //     this.copy.node.getComponent(UIButton).onClick = () => {
        //         GSDK.copyToClipboard(HttpServer.packageInfo.packageInfo.qq);
        //     };
        // } else {
        //     this.group.node.active = false;
        //     this.copy.node.active = false;
        // }
        // this.changeServerNode.active = HttpServer.packageInfo.packageInfo.switchServer;
        this.changeServer.text.setText(["_rs" + HttpServer.gameServerName]);
        this.agreement.node.getComponent(UIButton).onClick = () => {};
        this.changeServer.onClick = () => {
            GWindow.open(WindowServerSelect, { changeMode: true });
        };
        this.musicSwitch.onClick = () => {
            GModel.setting.switchMusic();
            this.switchInit();
        };
        this.soundSwitch.onClick = () => {
            GModel.setting.switchSound();
            this.switchInit();
        };
        this.switchInit();
    }
    switchInit() {
        this.musicOpen.node.active = GModel.setting.musicSetting();
        this.musicClose.node.active = !GModel.setting.musicSetting();
        this.soundOpen.node.active = GModel.setting.soundSetting();
        this.soundClose.node.active = !GModel.setting.soundSetting();
    }

    @message([EventName.refreshUserInfo])
    refPlayerInfo() {
        this.avatar.imgName = GTable.getById("HeroTbl", HttpServer.roleIcon).img + "_head";
        this.username.setText(["_rs" + HttpServer.roleName]);
    }
}
