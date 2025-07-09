import { registerClass } from "../../../framework/Decorator";
import UIWindow from "../../../framework/ui/UIWindow";

const { ccclass, property } = cc._decorator;

@registerClass("WindowTestServerLogin")
@ccclass
export default class WindowTestServerLogin extends UIWindow {
    _windowParam: null = null;
    _returnValue: { sdkChannel: string; sdkUid: string; sdkExtra: string };
}
