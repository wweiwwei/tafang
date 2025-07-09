import { autowired, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIRichText from "../../../framework/ui/UIRichText";
import UIWindow from "../../../framework/ui/UIWindow";

const { ccclass, property } = cc._decorator;
@registerClass("WindowAdvertisement")
@ccclass
export default class WindowAdvertisement extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    /**标题 */
    @autowired(UILabel) tittle: UILabel = null;
    /**内容 */
    @autowired(UIRichText) content: UIRichText = null;
    /**取消 */
    @autowired(UIButton) cancel: UIButton = null;
    /**观看 */
    @autowired(UIButton) confirm: UIButton = null;
    @autowired(UIButton) closeBtn: UIButton = null;
    _windowParam: { title: string[]; content: string[][]; text: string[]; cb: () => void };
    _returnValue: boolean = false;
    protected onInited(): void {
        this.closeBtn.onClick = () => {
            this.close();
            this._returnValue = false;
        };
        this.cancel.onClick = () => {
            this.close();
            this._returnValue = false;
        };
        this.confirm.onClick = () => {
            this._windowParam.cb();
            this._returnValue = true;
            this.close();
        };
        this.tittle.setText(this._windowParam.title);
        this.content.setText(...this._windowParam.content);
        this.confirm.text.setText(this._windowParam.text);
    }
}
