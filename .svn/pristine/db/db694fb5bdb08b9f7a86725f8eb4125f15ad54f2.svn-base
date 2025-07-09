import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIWindow from "../../../framework/ui/UIWindow";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import BattleFactory from "../../battleLogic/Utils/BattleFactory";
import WindowPvpView from "../mainscene/WindowPvpView";

const { ccclass, property } = cc._decorator;

@registerClass("WindowMatchWaiting")
@ccclass
export default class WindowMatchWaiting extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.no,
    };
    _windowParam: null;
    _returnValue: null;

    @autowired(UILabel) tip: UILabel = null;
    @autowired(UIButton) confirm: UIButton = null;

    private time = 0;
    protected async onInited() {
        this.confirm.onClick = () => {
            RoomServer.close();
            this.close();
        };
        this.tip.setText([`_rs匹配中，已等待${this.time}秒`]);
        this.schedule(() => {
            this.time++;
            this.tip.setText([`_rs匹配中，已等待${this.time}秒`]);
        }, 1);
        await GBattlePvpManager.match();
        this.close();
    }
}
