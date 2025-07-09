import { autowired, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UIWindow from "../../../framework/ui/UIWindow";
import ListItemAdPointItem from "./ListItemAdPointItem";

const { ccclass, property } = cc._decorator;
@registerClass("WindowAdvertisementPoint")
@ccclass
export default class WindowAdvertisementPoint extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    /**宝箱按钮 */
    @autowired(UIButton) chest: UIButton = null;
    /**观看按钮 */
    @autowired(UIButton) watch: UIButton = null;
    @autowired(UIButton) closeBtn: UIButton = null;
    /**视频次数 */
    @autowired(UILabel) adLimit: UILabel = null;
    /**时间 */
    @autowired(UILabel) time: UILabel = null;
    /**积分 */
    @autowired(UILabel) point: UILabel = null;
    /**积分进度 */
    @autowired(cc.ProgressBar) pointProgress: cc.ProgressBar = null;
    /**积分列表 */
    @autowired(UIScrollList) adRewardList: UIScrollList<ListItemAdPointItem> = null;
    _windowParam: any;
    _returnValue: any;
    protected onInited(): void {}
}
