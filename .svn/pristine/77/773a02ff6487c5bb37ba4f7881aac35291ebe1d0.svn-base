import { autowired, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UIWindow from "../../../framework/ui/UIWindow";
import ListItemChallengeItem from "./ListItemChallengeItem";

const { ccclass, property } = cc._decorator;
@registerClass("WindowArenaChallenge")
@ccclass
export default class WindowArenaChallenge extends UIWindow {
    _windowParam: any;
    _returnValue: any;
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    @autowired(UIButton) closeBtn: UIButton = null;
    /**刷新挑战列表 */
    @autowired(UIButton) refresh: UIButton = null;
    /**添加挑战券 */
    @autowired(UIButton) addTicket: UIButton = null;
    /**挑战券数量 */
    @autowired(UILabel) ticket: UILabel = null;
    /**挑战列表 */
    @autowired(UIScrollList) challengeList: UIScrollList<ListItemChallengeItem> = null;
    protected onInited(): void {}
}
