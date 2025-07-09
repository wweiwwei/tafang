import { autowired, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIList from "../../../framework/ui/UIList";
import UIScrollList from "../../../framework/ui/UIScrollList";

import UIWindow from "../../../framework/ui/UIWindow";
import ListItemBanquetPoints from "./ListItemBanquetPoints";

const { ccclass, property } = cc._decorator;
@registerClass("WindowBanquetPoints")
@ccclass
export default class WindowBanquetPoints extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };

    _windowParam: any;
    _returnValue: any;

    /**返回按钮 */
    @autowired(UIButton) closeBtn: UIButton = null;
    @autowired(UIList) uiList: UIList<ListItemBanquetPoints> = null;
    protected onInited(): void {
        this.even();

        let d = GTable.getList("BanquetPointRewardTbl").map((t) => {
            return { id: t.id };
        });
        this.uiList.setState(d);
    }

    even() {
        this.closeBtn.onClick = () => {
            this.close();
        };
    }
}
