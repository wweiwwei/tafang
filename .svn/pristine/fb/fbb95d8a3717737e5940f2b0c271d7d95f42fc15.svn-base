import { autowired, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIList from "../../../framework/ui/UIList";
import UIWindow from "../../../framework/ui/UIWindow";
import ListItemPvpSkill from "./ListItemPvpSkill";
import ListItemPvpSwitchBoss from "./ListItemPvpSwitchBoss";

const { ccclass, property } = cc._decorator;
@registerClass("WindowPvpSwitchBoss")
@ccclass
export default class WindowPvpSwitchBoss extends UIWindow {
    _windowParam: any;
    _returnValue: any;

    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };

    @autowired(UIList) uiList: UIList<ListItemPvpSwitchBoss> = null;

    onInited(): void {
        this.uiList.setState();
    }
}
