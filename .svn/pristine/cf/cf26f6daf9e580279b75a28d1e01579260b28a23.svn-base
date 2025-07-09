import { autowired, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIWindow from "../../../framework/ui/UIWindow";
import WindowPrivacy from "./WindowPrivacy";

const { ccclass, property } = cc._decorator;

@registerClass("WindowUserTip")
@ccclass
export default class WindowUserTip extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: any;
    _returnValue: any;

    @autowired(UIButton) no: UIButton = null;
    @autowired(UIButton) yes: UIButton = null;
    @autowired(UIButton) agreement: UIButton = null;
    @autowired(UIButton) privacy: UIButton = null;
    @autowired(cc.Node) okNode: cc.Node = null;
    @autowired(UIButton) confirm: UIButton = null;
    protected async onInited() {
        this.no.onClick = () => {
            cc.game.end();
        };
        this.yes.onClick = () => {
            if (GModel.localStorage.confirmPrivacy) {
                this.close();
            } else {
                GTip.showTip(["_rs请先阅读并同意《用户协议》《隐私协议》"]);
            }
        };
        this.agreement.onClick = () => {
            GWindow.open(WindowPrivacy, { kind: 2 });
        };
        this.privacy.onClick = () => {
            GWindow.open(WindowPrivacy, { kind: 1 });
        };
        this.confirm.onClick = () => {
            GModel.localStorage.confirmPrivacy = !GModel.localStorage.confirmPrivacy;
            this.refreshOkNode();
        };
        this.refreshOkNode();
    }

    refreshOkNode() {
        if (GModel.localStorage.confirmPrivacy) {
            this.okNode.active = true;
        } else {
            this.okNode.active = false;
        }
    }
}
