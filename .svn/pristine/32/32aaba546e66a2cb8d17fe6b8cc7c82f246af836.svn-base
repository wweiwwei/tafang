import { autowired, message, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UIWindow from "../../../framework/ui/UIWindow";
import EventName from "../../event/EventName";
import ListItemPropSwitemDetails from "./ListItemPropSwitemDetails";

const { ccclass, property } = cc._decorator;

@registerClass("WindowPropSwitemDetails", { preloadPrefab: ["ListItemPropSwitemDetails"] })
@ccclass
export default class WindowPropSwitemDetails extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    @autowired(UIButton) closeBtn: UIButton = null;
    @autowired(UIScrollList) uiScrollList: UIScrollList<ListItemPropSwitemDetails> = null;
    @autowired(UILabel) num: UILabel = null;

    _windowParam: {
        /**部位 */
        part: number;
    };
    _returnValue: any;

    protected onInited(): void {
        this.refUi();

        this.closeBtn.onClick = () => {
            this.close();
        };
        this.closeBtn.setTransition(false);
    }

    @message([EventName.stateKey.towerTalent])
    refUi() {
        // this.num.setText([
        //     "_rs已选：" + GModel.defendTower.getTowerTalentHasActiveCount(this._windowParam.part) + "/3",
        // ]);

        let state = GModel.defendTower.getTowerTalentData(this._windowParam.part).map((data, index) => {
            return {
                part: this._windowParam.part,
                index: index,
            };
        });
        this.uiScrollList.setState(state);
    }
}
