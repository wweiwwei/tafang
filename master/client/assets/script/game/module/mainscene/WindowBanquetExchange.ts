import { autowired, message, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIList from "../../../framework/ui/UIList";
import UIWindow from "../../../framework/ui/UIWindow";
import Item from "../../entity/Item";
import EventName from "../../event/EventName";
import ListItemBanquetExchange from "./ListItemBanquetExchange";

const { ccclass, property } = cc._decorator;
@registerClass("WindowBanquetExchange")
@ccclass
export default class WindowBanquetExchange extends UIWindow {
    // static defaultOpentOption: Partial<WindowOpenOption> = {
    //     animation: WindowOpenAnimationEnum.default,
    // };

    _windowParam: any;
    _returnValue: any;
    @autowired(UIList) uiList: UIList<ListItemBanquetExchange> = null;

    /**返回按钮 */
    @autowired(UIButton) closeBtn: UIButton = null;

    @autowired(UIButton) diamond: UIButton = null;

    protected onInited(): void {
        this.refD();
        this.refList();
        this.closeBtn.onClick = () => {
            this.close();
        };
    }

    @message([EventName.stateKey.storage])
    refD() {
        let i = new Item(10002, 0);
        this.diamond.bg.imgName = Item.getImg(i);
        this.diamond.text.setText([
            "_rs" + GUtils.ui.getNumberString(GModel.knapsack.getStorageById(GIndex.id.pinkDiamondId), 2),
        ]);
    }

    refList() {
        let a = GTable.getList("BanquetPackTbl").map((t) => {
            return { id: t.id };
        });
        this.uiList.setState(a);
    }
}
