import { autowired, message, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIWindow from "../../../framework/ui/UIWindow";

const { ccclass, property } = cc._decorator;
@registerClass("WindowDecomposeTips")
@ccclass
export default class WindowDecomposeTips extends UIWindow {
    _windowParam: {
        text: string[];
        tempIndex?: number;
        cb: Function;
    };
    _returnValue: any;
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };

    @autowired(UIButton) closeBtn: UIButton = null;
    /**分解 */
    @autowired(UIButton) leftBtn: UIButton = null;
    /**替换 */
    @autowired(UIButton) rightBtn: UIButton = null;
    /**切换自动分解 */
    @autowired(UIButton) autoSellBtn: UIButton = null;
    /**提示 */
    @autowired(UILabel) tipsText: UILabel = null;

    private ISAutoSell: boolean = false;

    protected onInited(): void {
        this.tipsText.setText(this._windowParam.text);
        this.ISAutoSell = GModel.localStorage.autoSell;
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.autoSellBtn.onClick = () => {
            this.onAutoSell();
        };

        this.leftBtn.onClick = () => {
            this.close();
        };
        this.rightBtn.onClick = () => {
            this.onConfirmBtn();
        };
    }

    //切换自动分解
    onAutoSell() {
        this.ISAutoSell = !this.ISAutoSell;
        GModel.localStorage.autoSell = this.ISAutoSell;

        this.autoSellBtn.bg.node.active = this.ISAutoSell;
    }

    onConfirmBtn() {
        if (this._windowParam.cb) this._windowParam.cb();
        this.close();
    }
}
