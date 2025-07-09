import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIWindow from "../../../framework/ui/UIWindow";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import Item from "../../entity/Item";
import EventName from "../../event/EventName";
import ListItemItem from "../common/ListItemItem";
import ListItemCostItem from "../hero/ListItemCostItem";
import UIList from "../../../framework/ui/UIList";
import UIScrollList from "../../../framework/ui/UIScrollList";

const { ccclass, property } = cc._decorator;

@registerClass("WindowExploreIncome")
@ccclass
export default class WindowExploreIncome extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: any;
    _returnValue: any;
    /**可能获取的道具列表 */
    @autowired(UIList) horizontaList: UIList<ListItemCostItem> = null;
    /**可获取的道具列表 */
    @autowired(UIScrollList) incomeList: UIScrollList<ListItemItem> = null;
    @autowired(UILabel) title: UILabel = null;
    /**立即获取按钮 */
    @autowired(UIButton) getIncome: UIButton = null;
    /**立即获取按钮 */
    @autowired(UIButton) double: UIButton = null;
    @autowired(UIButton) closeBtn: UIButton = null;

    protected onInited(): void {
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.getIncome.onClick = () => {
            this.collectReward(false);
        };
        this.double.onClick = () => {
            this.collectReward(true);
        };
        this.windowInit();
        this.refreshIncome();
        this.refreshTime();
        this.schedule(this.refreshTime, 1);
        this.refreshList();
    }

    protected onRecycle(): void {
        this.unscheduleAllCallbacks();
    }
    /**收集奖励 */
    async collectReward(video: boolean) {
        let reward = await GModel.stage.collectAfkReward2(video);
        let finalReward: Item[] = [];
        reward.reward.map((t) => {
            let same = finalReward.find((f) => f.id === t.id);
            if (same) {
                same.count += t.count;
            } else {
                finalReward.push(t);
            }
        });
        finalReward.map((f) => GTip.showRewardItem(f));
        // console.log(finalReward);
        // GTip.showFlyReward(this.incomeList.node.convertToWorldSpaceAR(cc.v2()), new Item(t.id, 10));
        this.close();
    }
    /**初始化窗口 */
    windowInit() {
        // this.title.setText([]);
    }
    /**刷新时间 */
    refreshTime() {
        this.title.setText([
            GLang.code.ui.map_income_title,
            "_rs" + GUtils.date.formatRemainTime(GModel.stage.getStageAfkBattleReward().getAfkTime(), "hh:mm:ss"),
        ]);
    }
    /**刷新收益 */
    @message([EventName.stateKey.stageAfkBattleReward, EventName.stateKey.stageAfkMapProduce])
    refreshIncome() {
        let state = GModel.stage
            .getStageAfkBattleReward()
            .getReward()
            .map((t) => {
                return { item: t, equipment: null, carEquipment: null, status: 0 };
            });
        this.incomeList.setState(state);
    }
    /**刷新可能获得的道具 */
    refreshList() {
        let state = GModel.stage
            .getStageByMapIndex(GModel.stage.getStageAfkMap())
            .afkReward()
            .map((t) => {
                return { item: t, status: 1 };
            });
        this.horizontaList.setState(state);
    }
}
