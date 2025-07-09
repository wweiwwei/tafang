import { autowired, message, registerClass } from "../../../framework/Decorator";

import UIWindow from "../../../framework/ui/UIWindow";

const { ccclass, property } = cc._decorator;
@registerClass("WindowOfflineRewardProcess")
@ccclass
export default class WindowOfflineRewardProcess extends UIWindow {
    _windowParam: any;
    _returnValue: any;
    protected onInited(): void {}
}
