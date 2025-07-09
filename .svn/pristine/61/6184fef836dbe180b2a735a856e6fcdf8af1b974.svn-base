import { autowired, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIWindow from "../../../framework/ui/UIWindow";
import ListItemPropItem from "./ListItemPropItem";

const { ccclass, property } = cc._decorator;
@registerClass("WindowSetSpiritualStone")
@ccclass
export default class WindowSetSpiritualStone extends UIWindow {
    _windowParam: any;
    _returnValue: any;
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    /**last部件内容 */
    @autowired(UIList) UIList1: UIList<ListItemPropItem> = null;
}
