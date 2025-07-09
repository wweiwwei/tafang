import { autowired, registerClass } from "../../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../../framework/ui/GWindow";
import UILabel from "../../../../framework/ui/UILabel";
import UIWindow from "../../../../framework/ui/UIWindow";

const { ccclass, property } = cc._decorator;
@registerClass("WindowWarning")
@ccclass
export default class WindowWarning extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.no,
        hideMainScene: true,
    };
    _windowParam: any;
    _returnValue: any;

    /** 动画 */
    @autowired(UILabel) limitLabel: UILabel = null;

    protected onInited(): void {}

    protected update(dt: number): void {
        const api = GBattleApiManager.getBattleStageApi(0);
        if (api) {
            const limitTick = api.getOverLimitTick();
            if (limitTick > 0) {
                this.limitLabel.setText([
                    `_rs金鹏将在${Math.ceil((GConstant.battle.failTick - limitTick) / 60)}秒后来袭，请尽快消灭敌人....`,
                ]);
            } else {
                this.close();
            }
        } else {
            this.close();
        }
    }
}
