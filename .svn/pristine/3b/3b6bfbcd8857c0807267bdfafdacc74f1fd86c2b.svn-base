import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UIWindow from "../../../framework/ui/UIWindow";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import Item from "../../entity/Item";
import EventName from "../../event/EventName";
import ListItemShop from "./ListItemShop";

const { ccclass, property } = cc._decorator;

@registerClass("WindowShop")
@ccclass
export default class WindowShop extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: { mapIndex?: number };
    _returnValue: any;

    @autowired(UIButton) closeBtn: UIButton = null;
    @autowired(UILabel) shopLabel: UILabel = null;
    @autowired(UIScrollList) itemContainer: UIScrollList<ListItemShop> = null;
    @message([EventName.stateKey.stageShopHasBuy])
    protected onInited(): void {
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.shopLabel.setText([this._windowParam.mapIndex ? GLang.code.ui.reputation_shop : GLang.code.ui.shop]);
        let tbl = GTable.getList("StageReputationShopTbl").filter((t) => t.mapIndex === this._windowParam.mapIndex);
        let state = tbl.map((t) => {
            return { item: new Item(t.item[0], t.item[1]), id: t.id, status: 0 };
        });
        this.itemContainer.setState(state);
    }
}
