import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIWindow from "../../../framework/ui/UIWindow";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";

const { ccclass, property } = cc._decorator;

@registerClass("WindowCommonTip")
@ccclass
export default class WindowCommonTip extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: { tip: string[] };
    _returnValue: null;

    @autowired(UILabel) tip: UILabel = null;
    @autowired(UIButton) confirm: UIButton = null;

    protected onInited(): void {
        this.confirm.onClick = () => {
            this.close();
        };
        this.tip.setText(this._windowParam.tip);
    }
}
