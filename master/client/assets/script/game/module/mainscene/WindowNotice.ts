import { autowired, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIRichText from "../../../framework/ui/UIRichText";
import UIWindow from "../../../framework/ui/UIWindow";
import ListItemNotice from "./ListItemNotice";

const { ccclass, property } = cc._decorator;
@registerClass("WindowNotice")
@ccclass
export default class WindowNotice extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    /**公告列表 */
    @autowired(UIList) noticeList: UIList<ListItemNotice> = null;
    /**确认按钮 */
    @autowired(UIButton) confirm: UIButton = null;
    @autowired(UIButton) closeBtn: UIButton = null;
    _windowParam: any;
    _returnValue: any;
    protected async onInited() {
        this.closeBtn.setTransition(false);
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.confirm.onClick = () => {
            this.close();
        };
        const { list } = await HttpServer.request("game/announcement", {});
        console.log(list);
        this.noticeList.setState(list);
    }
}
