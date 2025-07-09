import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIWindow from "../../../framework/ui/UIWindow";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";

const { ccclass, property } = cc._decorator;

@registerClass("WindowCommonConfirm")
@ccclass
export default class WindowCommonConfirm extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: { tip: string[]; zIndex?: number };
    _returnValue: boolean = false;
    @autowired(UILabel) tip: UILabel = null;
    @autowired(UIButton) confirm: UIButton = null;
    @autowired(UIButton) cancel: UIButton = null;

    protected onInited(): void {
        this.node.zIndex = this._windowParam.zIndex || 0;
        this.confirm.ignoreGuide = true;
        this.cancel.ignoreGuide = true;
        this.confirm.onClick = () => {
            this.close();
            this._returnValue = true;
        };
        this.cancel.onClick = () => {
            this.close();
            this._returnValue = false;
        };
        this.tip.setText(this._windowParam.tip);
    }
}
