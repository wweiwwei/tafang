import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIWindow from "../../../framework/ui/UIWindow";
import WindowClearAd from "./WindowClearAd";

const { ccclass, property } = cc._decorator;

@registerClass("WindowGiftPack")
@ccclass
export default class WindowGiftPack extends UIWindow {
    _windowParam: any;
    _returnValue: any;

    @autowired(UIImage) img2: UIImage = null;
    @autowired(UILabel) label1: UILabel = null;
    @autowired(UIButton) btn1: UIButton = null;
    @autowired(UILabel) label2: UILabel = null;

    protected onInited(): void {
        console.log("hxz - onInited run");
        const state = {
            label1: "_rs大礼包",
        };
        this.label2.setText([state.label1]);
        this.btn1.onClick = () => {};
    }
}
