import { autowired, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UIWindow from "../../../framework/ui/UIWindow";
import ListItemRecordItem from "./ListItemRecordItem";

const { ccclass, property } = cc._decorator;
@registerClass("WindowArenaRecord")
@ccclass
export default class WindowArenaRecord extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    @autowired(UIButton) closeBtn: UIButton = null;
    /**对战记录列表 */
    @autowired(UIScrollList) rankRecordList: UIScrollList<ListItemRecordItem> = null;
    _windowParam: any;
    _returnValue: any;
    protected onInited(): void {}
}
