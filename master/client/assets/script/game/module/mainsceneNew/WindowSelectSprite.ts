import { autowired, message, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UIWindow from "../../../framework/ui/UIWindow";
import ListItemSkill from "./ListItemSkill";

const { ccclass, property } = cc._decorator;
@registerClass("WindowSelectSprite")
@ccclass
export default class WindowSelectSprite extends UIWindow {
    _windowParam: { id: number };
    _returnValue: { id: number };
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    /**last部件内容 */
    @autowired(UIScrollList) UIScrollList: UIScrollList<ListItemSkill> = null;
    @autowired(UIButton) closeBtn: UIButton = null;

    protected onInited(): void {
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.closeBtn.setTransition(false);
        this.UIScrollList.setState(
            GModel.sprite
                .getSprites()
                .filter((s) => s.level > 0)
                .map((s) => {
                    return {
                        id: s.id,
                        chosen: this._windowParam.id === s.id,
                        cb: () => {
                            this._returnValue = { id: s.id };
                            this.close();
                        },
                    };
                })
        );
    }
}
