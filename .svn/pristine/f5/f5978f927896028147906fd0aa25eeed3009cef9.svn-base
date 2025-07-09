import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIWindow from "../../../framework/ui/UIWindow";
import Item from "../../entity/Item";
import ListItemItem from "../common/ListItemItem";

const { ccclass, property } = cc._decorator;

@registerClass("WindowEncounter")
@ccclass
export default class WindowEncounter extends UIWindow {
    _windowParam: any;
    _returnValue: any;
    /**通关奖励列表容器 */
    @autowired(UIList) droppedList: UIList<ListItemItem> = null;
    @autowired(UILabel) bossName: UILabel = null;
    @autowired(UIButton) accept: UIButton = null;
    @autowired(UIButton) closeBtn: UIButton = null;

    protected onInited(): void {
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.refreshList();
    }
    /**刷新通关奖励 */
    refreshList() {}
}
