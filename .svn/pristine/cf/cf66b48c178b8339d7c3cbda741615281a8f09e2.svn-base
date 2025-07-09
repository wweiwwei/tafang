import { autowired, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UIWindow from "../../../framework/ui/UIWindow";
import ListItemItem from "../common/ListItemItem";
import ListItemRankRewardItem from "./ListItemRankRewardItem";

const { ccclass, property } = cc._decorator;
@registerClass("WindowArenaReward")
@ccclass
export default class WindowArenaReward extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    /**赛季时间 */
    @autowired(UILabel) restTime: UILabel = null;
    /** 排行*/
    @autowired(UILabel) ranklabel: UILabel = null;
    /**前三排行 */
    @autowired(UIImage) rankimg: UIImage = null;
    /**今日奖励 */
    @autowired(UIImage) today: UIImage = null;
    /**赛季奖励 */
    @autowired(UIImage) season: UIImage = null;
    /**奖励切换按钮 */
    @autowired(UIButton) change: UIButton = null;
    /**无奖励 */
    @autowired(UIImage) noreward: UIImage = null;
    /**未上榜 */
    @autowired(UIImage) norank: UIImage = null;
    @autowired(UIButton) closeBtn: UIButton = null;
    /**当前奖励 */
    @autowired(UIList) rewards: UIList<ListItemItem> = null;
    /**排行奖励列表 */
    @autowired(UIScrollList) rankRewardList: UIScrollList<ListItemRankRewardItem> = null;
    _windowParam: any;
    _returnValue: any;
    private chosenToday = true;
    protected onInited(): void {
        this.today.node.active = true;
        this.season.node.active = true;
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.change.onClick = () => {
            this.chosenToday = !this.chosenToday;
            this.today.node.active = this.chosenToday;
            this.season.node.active = !this.chosenToday;
        };
    }
}
