import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIWindow from "../../../framework/ui/UIWindow";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";

const { ccclass, property } = cc._decorator;

@registerClass("WindowConfirmReplace")
@ccclass
export default class WindowConfirmReplace extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: { tips: string };
    _returnValue: { change: boolean };
    @autowired(UILabel) tips: UILabel = null;
    @autowired(UIButton) confirm: UIButton = null;
    @autowired(UIButton) cancel: UIButton = null;
    @autowired(UIButton) closeBtn: UIButton = null;
    @autowired(UIButton) autoSellBtn: UIButton = null;
    private auto = false;

    protected onInited(): void {
        this.tips.setText([this._windowParam.tips]);
        this.auto = GModel.localStorage.autoSell;
        this._returnValue = { change: false };
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.closeBtn.setTransition(false);
        this.autoSellBtn.bg.node.active = GModel.localStorage.autoSell;
        this.autoSellBtn.onClick = () => {
            this.auto = !this.auto;
            this.autoSellBtn.bg.node.active = this.auto;
            GModel.localStorage.autoSell = this.auto;
        };
        //取消
        this.cancel.onClick = () => {
            this._returnValue = { change: true };
            this.close();
        };
        this.confirm.onClick = () => {
            this.close();
        };
    }
}
