import { autowired, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIRichText from "../../../framework/ui/UIRichText";
import UIWindow from "../../../framework/ui/UIWindow";

const { ccclass, property } = cc._decorator;
@registerClass("WindowRule")
@ccclass
export default class WindowRule extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };

    _windowParam: { ruleId?: number; info?: { title: string; RichText: string } };
    _returnValue: any;

    @autowired(UIButton) closeBtn: UIButton = null;
    /**标题 */
    @autowired(UILabel) title: UILabel = null;
    /**富文本 */
    @autowired(UIRichText) RichText: UIRichText = null;

    protected onInited(): void {
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.closeBtn.setTransition(false);
        if (this._windowParam.ruleId) {
            let tbl = GTable.getById("RuleTextTbl", this._windowParam.ruleId);
            this.title.setText([tbl.title]);
            this.RichText.setText([tbl.text]);
        } else {
            this.title.setText([this._windowParam.info.title]);
            this.RichText.setText([this._windowParam.info.RichText]);
        }
    }
}
