import { autowired, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIWindow from "../../../framework/ui/UIWindow";

const { ccclass, property } = cc._decorator;
@registerClass("WindowPause")
@ccclass
export default class WindowPause extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: any;
    _returnValue: {
        exitBattle: boolean;
    } = {
        exitBattle: false,
    };

    @autowired(UIButton) closeBtn: UIButton = null;

    /**退出 */
    @autowired(UIButton) left: UIButton = null;
    /**继续 */
    @autowired(UIButton) right: UIButton = null;
    @autowired(UILabel) tips: UILabel = null;

    protected onInited(): void {
        this.closeBtn.setTransition(false);
        this.left.onClick = () => {
            this._returnValue.exitBattle = true;
            this.close();
        };
        this.right.onClick = () => {
            this._returnValue.exitBattle = false;
            this.close();
        };
    }
}
