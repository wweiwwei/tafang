import { autowired, message, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIWindow from "../../../framework/ui/UIWindow";

const { ccclass, property } = cc._decorator;

@registerClass("WindowSpriitSummon_Ani")
@ccclass
export default class WindowSpriitSummon_Ani extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };

    _windowParam: any;
    _returnValue: any;

    private content: cc.Animation = null;

    protected onInited(): void {
        this.content = this.node.getChildByName("content").getComponent(cc.Animation);
        this.content.play();
        this.content.on("finished", this.finished, this);
    }

    finished() {
        this.close();
    }
}
