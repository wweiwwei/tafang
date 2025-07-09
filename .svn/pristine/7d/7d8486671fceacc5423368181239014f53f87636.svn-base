import { autowired, registerClass } from "../../../framework/Decorator";
import UISpine from "../../../framework/ui/UISpine";
import UIWindow from "../../../framework/ui/UIWindow";

const { ccclass, property } = cc._decorator;

@registerClass("WindowTest")
@ccclass
export default class WindowTest extends UIWindow {
    _windowParam: any;
    _returnValue: any;

    private time = 0;
    private total = 40 / 30;
    private keys = [13 / 30, 33 / 30];
    protected onInited() {}
    protected update(dt: number): void {
        this.time += dt;
        const remain = this.time - Math.floor(this.time / this.total) * this.total;
        if (remain < this.keys[0] || remain > this.keys[1]) {
            this.item.node.zIndex = 1;
        } else {
            this.item.node.zIndex = -1;
        }
    }
}
