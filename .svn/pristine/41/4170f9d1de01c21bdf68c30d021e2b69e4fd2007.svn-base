import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIList from "../../../framework/ui/UIList";
import UIWindow from "../../../framework/ui/UIWindow";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import { CarEquipmentWrapper } from "../../entity/CarEquipment";
import { EquipmentWrapper } from "../../entity/Equipment";
import Item from "../../entity/Item";
import { CardPoolMenuType } from "../hero/WindowCardPool";
import ListItemItem from "./ListItemItem";

const { ccclass, property } = cc._decorator;
@registerClass("WindowChestReward")
@ccclass
export default class WindowChestReward extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: {
        /**显示的奖励 */
        reward: Item[];
    };
    _returnValue: any;
    @autowired(UIList) rewardList: UIList<ListItemItem> = null;
    @autowired(UIButton) closeBtn: UIButton = null;
    protected onInited(): void {
        let state = null;
        state = this._windowParam.reward.map((t) => {
            return { status: 0, item: t, equipment: null };
        });

        this.rewardList.setState(state);
        this.closeBtn.onClick = () => {
            this.close();
        };
    }
}
