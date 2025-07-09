import { autowired, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIWindow from "../../../framework/ui/UIWindow";
import Item from "../../entity/Item";
import ListItemItem from "../common/ListItemItem";

const { ccclass, property } = cc._decorator;
@registerClass("WindowTowerExplore")
@ccclass
export default class WindowTowerExplore extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    @autowired(UILabel) time: UILabel = null;
    @autowired(UIButton) getIncome: UIButton = null;
    @autowired(UIButton) closeBtn: UIButton = null;
    @autowired(UIList) incomeList: UIList<ListItemItem> = null;
    _windowParam: any;
    _returnValue: any;
    protected onInited(): void {
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.getIncome.onClick = async () => {
            let reward = await GModel.tower.collectAfkReward();
            reward.map((t) => {
                GTip.showFlyReward(this.incomeList.node.children[0].convertToWorldSpaceAR(cc.v2()), new Item(t.id, 10));
            });
            this.close();
        };
        this.refreshTime();
        this.schedule(this.refreshTime, 1);
        let arr = GModel.tower.afkData().reward.map((t) => {
            return { item: t, equipment: null, carEquipment: null, status: 0 };
        });
        this.incomeList.setState(arr);
    }
    protected onRecycle(): void {
        this.unscheduleAllCallbacks();
    }
    /**刷新时间 */
    refreshTime() {
        this.time.setText([GLang.code.ui.map_income_title, "_rs" + GModel.tower.getAfkTime()]);
    }
}
