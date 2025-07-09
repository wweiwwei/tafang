import { autowired, registerClass } from "../../../framework/Decorator";
import UIWindow from "../../../framework/ui/UIWindow";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import { CardInfo } from "../../entity/CardInfo";

const { ccclass } = cc._decorator;

@registerClass("WindowCardPoolAnimation")
@ccclass
export default class WindowCardPoolAnimation extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.no,
    };
    @autowired(cc.Node) content: cc.Node = null;
    private animation: cc.Animation = null;
    _windowParam: {
        cardArr: CardInfo[];
    };
    _returnValue: any;

    protected onInited(): void {
        this.animation = this.content.getComponent(cc.Animation);
        if (this._windowParam.cardArr.length > 1) {
            this.animation.play("WindowCardList_Ani", 0);
        } else {
            // this.animation.play("WindowCardList_Ani", 0);
        }
        this.animation.on("stop", this.stopFunc, this);
    }

    stopFunc() {
        GWindow.hide(WindowCardPoolAnimation);
    }
}
