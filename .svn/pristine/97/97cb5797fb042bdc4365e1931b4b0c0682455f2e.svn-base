import { autowired, message, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UIWindow from "../../../framework/ui/UIWindow";
import ListItemDamageReward2 from "./ListItemDamageReward2";

const { ccclass, property } = cc._decorator;
@registerClass("WindowDamageReward")
@ccclass
export default class WindowDamageReward extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    @autowired(UIButton) closeBtn: UIButton = null;
    /**奖励 */
    @autowired(UIScrollList) scrollList: UIScrollList<ListItemDamageReward2> = null;
    _windowParam: { kind: number };
    _returnValue: any;
    protected onInited(): void {
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.scrollList.setState(
            GTable.getList("DamageChallengeTbl")
                .filter((t) => t.kind === this._windowParam.kind)
                .map((t) => {
                    return { id: t.id };
                })
        );
    }
}
