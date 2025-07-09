import { autowired, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIWindow from "../../../framework/ui/UIWindow";
const { ccclass, property } = cc._decorator;
@registerClass("WindowSellSkill")
@ccclass
export default class WindowSellSkill extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: {
        id: number;
    };
    _returnValue: {
        state: boolean;
    } = {
        state: false,
    };
    /** */
    @autowired(UIButton) closeBtn: UIButton = null;
    /**出售 */
    @autowired(UIButton) sell: UIButton = null;
    /**取消 */
    @autowired(UIButton) cancel: UIButton = null;
    /**描述 */
    @autowired(UILabel) tips: UILabel = null;
    /** 价格 */
    @autowired(UILabel) price: UILabel = null;

    onInited() {
        const tbl = GTable.getById("RogueSkillDetailTbl", this._windowParam.id);
        this.closeBtn.setTransition(false);
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.sell.onClick = () => {
            this._returnValue.state = true;
            this.close();
        };
        this.cancel.onClick = () => {
            this._returnValue.state = false;
            this.close();
        };
        this.price.setText(["_rs" + tbl.price]);
        // this.tips.setText([]);
    }
}
