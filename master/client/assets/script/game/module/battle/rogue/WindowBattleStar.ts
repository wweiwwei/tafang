import { autowired, registerClass } from "../../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../../framework/ui/GWindow";
import UIWindow from "../../../../framework/ui/UIWindow";

const { ccclass, property } = cc._decorator;
@registerClass("WindowBattleStar")
@ccclass
export default class WindowBattleStar extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.no,
        hideMainScene: true,
    };
    _windowParam: any;
    _returnValue: any;

    /** 动画 */
    @autowired(cc.Animation) anim: cc.Animation = null;

    protected onInited(): void {
        this.anim.on("stop", () => {
            this.close();
        });
    }
}
