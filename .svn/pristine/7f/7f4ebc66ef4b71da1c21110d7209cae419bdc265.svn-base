import UIImage from "./UIImage";
import UILabel from "./UILabel";

const { ccclass, property, menu } = cc._decorator;
@ccclass
@menu("UI/UILongTouchButton")
export default class UILongTouchButton extends cc.Component {
    @property(cc.String) param: string = "";
    @property(cc.String) buttonId: string = "";
    @property(UIImage) bg: UIImage = null;
    @property(UILabel) text: UILabel = null;
    /** 初始时间，小于这个间隔不算长按，单位毫秒 */
    @property({
        tooltip: "初始时间，小于这个间隔不算长按，单位毫秒",
        type: cc.Integer,
    })
    baseInterval = 500;
    /** 每隔多少时间触发一次效果，单位毫秒 */
    @property({
        tooltip: "每隔多少时间触发一次效果，单位毫秒",
        type: cc.Integer,
    })
    interval = 100;
    protected onLoad(): void {
        if (CC_EDITOR) return;
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }

    private handleClick(event: cc.Event.EventTouch): void {
        if (this.onClick) {
            this.onClick(this.param, event);
        }
    }

    private acc = 0;

    private onTouchEnd(event: cc.Event.EventTouch) {
        this.unscheduleAllCallbacks();
        this.acc = 0;
        event.stopPropagation();
        if (!this.interactable) return;
        if (this._transition) {
            cc.tween(this.node).to(0.1, { scale: 1 }, { easing: "sineInOut" }).start();
        }
        if (GWindow.buttonBlock && this !== GWindow.guideBtn) {
            return;
        }
        if (this.onEnd) this.onEnd();
    }

    private onTouchStart(event: cc.Event.EventTouch) {
        if (!this.interactable) return;
        if (GWindow.buttonBlock && this !== GWindow.guideBtn) {
            return;
        }
        if (this.onStart) this.onStart();
        if (this._transition) {
            this.node.stopAllActions();
            this.node.scale = 1;
            cc.tween(this.node).to(0.1, { scale: 0.9 }, { easing: "sineInOut" }).start();
        }
        GAudio.playEffect("click");
        this.handleClick(event);
        this.schedule(() => {
            this.acc += this.interval;
            if (this.acc < this.baseInterval) return;
            this.handleClick(event);
        }, this.interval / 1000);
    }

    /** 点击回调函数 */
    onClick: (param: string, e: cc.Event.EventTouch) => void = null;
    /** 点击开始的触发（触发执行第一次点击事件之前） */
    onStart: () => void = null;
    /** 点击结束的触发 */
    onEnd: () => void = null;
    private _interactable = true;
    private _transition = true;
    /** 按钮是否可交互 */
    get interactable(): boolean {
        return this._interactable;
    }
    set interactable(b: boolean) {
        this._interactable = b;
    }
    /** 开启或关闭按钮过渡 */
    setTransition(enable: boolean) {
        this._transition = enable;
        // todo
        // this.getButton().transition = enable ? cc.Button.Transition.SCALE : cc.Button.Transition.NONE;
    }
    /** 设置为灰色 */
    setGrey(isGrey: boolean) {
        if (isGrey) {
            GUtils.ui.setAllChildSpGray(this.node);
        } else {
            GUtils.ui.setAllChildSpNormal(this.node);
        }
    }
}
