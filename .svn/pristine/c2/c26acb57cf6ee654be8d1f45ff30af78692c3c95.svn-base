import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIWindow from "../../../framework/ui/UIWindow";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";

const { ccclass, property } = cc._decorator;

@registerClass("WindowCardPoolRule") //规则
@ccclass
export default class WindowCardPoolRule extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: any;
    _returnValue: any;
    @autowired(UIButton) closeBtn: UIButton = null;

    onInited() {
        this.closeBtn.onClick = () => {
            this.close();
        };
    }
}
