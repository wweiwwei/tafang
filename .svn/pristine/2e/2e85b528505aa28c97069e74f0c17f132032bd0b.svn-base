import { autowired, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIWindow from "../../../framework/ui/UIWindow";

const { ccclass, property } = cc._decorator;

@registerClass("WindowPrivacy")
@ccclass
export default class WindowPrivacy extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: { kind: number };
    _returnValue: any;

    @autowired(cc.Node) web1: cc.Node = null;
    @autowired(cc.Node) web2: cc.Node = null;
    @autowired(UIButton) closeBtn: UIButton = null;
    @autowired(UILabel) title: UILabel = null;
    protected async onInited() {
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.title.setText([this._windowParam.kind === 1 ? "_rs隐私协议" : "_rs用户协议"]);
        this.web1.active = this._windowParam.kind === 1;
        this.web2.active = this._windowParam.kind === 2;
    }
}
