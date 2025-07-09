import { autowired, registerClass } from "../../../framework/Decorator";
import UIWindow from "../../../framework/ui/UIWindow";

const { ccclass, property } = cc._decorator;

@registerClass("WindowGMConsole")
@ccclass
export default class WindowGMConsole extends UIWindow {
    _windowParam: any;
    _returnValue: any;
    static _poolSize: number = 1;

    @autowired(cc.EditBox)
    commandEditBox: cc.EditBox = null;

    protected onInjected(): void {
        this.commandEditBox.node.on("editing-did-ended", this.submit, this);
    }

    onShown(): void {
        this.commandEditBox.string = "";
        this.commandEditBox.focus();
    }

    submit() {
        const cmd = this.commandEditBox.string;
        GTest.gmCommand(cmd);
        GTest.gmToggle();
    }
}
