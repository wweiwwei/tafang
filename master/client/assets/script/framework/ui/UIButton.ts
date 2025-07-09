import UIImage from "./UIImage";
import UILabel from "./UILabel";

const { ccclass, property, menu } = cc._decorator;
@ccclass
@menu("UI/UIButton")
export default class UIButton extends cc.Component {
    @property(cc.String) param: string = "";
    @property(cc.String) buttonId: string = "";
    @property(UIImage) bg: UIImage = null;
    @property(UILabel) text: UILabel = null;
    /** 节流时间，单位毫秒 */
    @property(cc.Integer) throttle = 100;

    protected onLoad(): void {
        if (CC_EDITOR) return;
        this.getButton();
    }

    private getButton(): cc.Button {
        const b = this.getComponent(cc.Button);
        if (!b) {
            const btn = this.addComponent(cc.Button);
            btn.transition = cc.Button.Transition.SCALE;
            btn.duration = 0.1;
            btn.zoomScale = 0.9;
            const handler = new cc.Component.EventHandler();
            handler.handler = "handleClick";
            handler.target = this.node;
            handler.component = "UIButton";
            handler.customEventData = this.param;
            btn.clickEvents.push(handler);
        }
        return this.getComponent(cc.Button);
    }

    private handleClick(e: cc.Event.EventTouch, param: string): void {
        if (!this.interactable) return;
        if (Date.now() - this.lastClickTime < this.throttle) return;
        if (!this.ignoreGuide && GWindow.buttonBlock && this !== GWindow.guideBtn) {
            return;
        }
        GModel.weakGuide.btnClick(this);
        GAudio.playEffect("click");
        this.lastClickTime = Date.now();
        // todo 根据id屏蔽点击逻辑

        if (this.onClick) {
            this.onClick(param, e);
        }
    }

    private lastClickTime = 0;

    ignoreGuide: boolean = false;
    /** 点击回调函数 */
    onClick: (param: string, e: cc.Event.EventTouch) => void = null;
    private _interactable = true;
    /** 按钮是否可交互 */
    get interactable(): boolean {
        return this._interactable;
    }
    set interactable(b: boolean) {
        this._interactable = b;
        this.getButton().interactable = b;
    }
    /** 开启或关闭按钮过渡 */
    setTransition(enable: boolean) {
        this.getButton().transition = enable ? cc.Button.Transition.SCALE : cc.Button.Transition.NONE;
    }
    /** 设置为灰色 */
    setGrey(isGrey: boolean) {
        if (isGrey) {
            GUtils.ui.setAllChildSpGray(this.node);
        } else {
            GUtils.ui.setAllChildSpNormal(this.node);
        }
    }

    /** 设置按钮组件可用 */
    setEnable(b: boolean) {
        this.getButton().enabled = b;
    }
}
