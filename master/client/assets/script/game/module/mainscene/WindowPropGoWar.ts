import { autowired, message, registerClass } from "../../../framework/Decorator";
import { GameDate } from "../../../framework/date/GameDate";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UIWindow from "../../../framework/ui/UIWindow";
import EventName from "../../event/EventName";
import ListItemItem from "../common/ListItemItem";
import ListItemPropItem from "../mainsceneNew/ListItemPropItem";
import ListItemPropGoWar from "./ListItemPropGoWar";
import WindowPropDetails from "./WindowPropDetails";

const { ccclass, property } = cc._decorator;

@registerClass("WindowPropGoWar", { preloadPrefab: ["ListItemPropGoWar"] })
@ccclass
export default class WindowPropGoWar extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    @autowired(UIButton) closeBtn: UIButton = null;
    /**取消 */
    @autowired(UIButton) cancel: UIButton = null;
    /**替换 */
    @autowired(UIButton) replace: UIButton = null;

    /**提示是否出战 */
    @autowired(UIImage) leftTips: UIImage = null;
    /** */
    @autowired(UIList) uiList1: UIList<ListItemPropItem> = null;
    /** */
    @autowired(UIList) uiList2: UIList<ListItemPropGoWar> = null;

    /**技能 */
    @autowired(UILabel) tips1: UILabel = null;
    /**描述 */
    @autowired(UILabel) tips2: UILabel = null;

    _windowParam: {
        /**部位 */
        part: number;
    };
    _returnValue: any;

    /**当前触碰到的id */
    private curPart: number = 0;
    /**当前选中的下标 */
    private curIndex: number = 0;

    protected onInited(): void {
        if (this.curPart == 0) {
            this.curPart = GModel.defendTower.getTowerFormation()[0];
        }
        this.closeBtn.onClick = () => {
            this.close();
            GWindow.close(WindowPropDetails);
        };
        this.closeBtn.setTransition(false);
        this.cancel.onClick = () => {
            this.close();
            GWindow.close(WindowPropDetails);
        };
        this.replace.onClick = () => {
            if (!GModel.defendTower.getTowerFormation().includes(this._windowParam.part)) {
                GModel.defendTower.replaceTower(this.curIndex, this._windowParam.part);
            } else {
                GTip.showTip(["_rs已出战"]);
                return;
            }
            this.close();
            GWindow.close(WindowPropDetails);
        };

        this.refUiList2();
        this.refUi();
    }

    // @message([EventName.stateKey.towerTalent])
    refUi() {
        this.tips1.setText(GModel.defendTower.getPartDescription(this._windowParam.part));
        this.refTips2();

        let pe = GModel.playerEquipment.equipment()[this._windowParam.part];
        this.uiList1.setState([
            {
                playerEquipment: pe,
                tempIndex: this._windowParam.part,
                showBottonName: true,
            },
        ]);
    }

    refTips2() {
        this.tips2.setText(GModel.defendTower.getPartDescription(this.curPart));
    }

    // @message([EventName.stateKey.towerFormation])
    refUiList2() {
        let state = GModel.defendTower.getTowerFormation().map((t, index) => {
            return {
                part: t,
                index: index,
                clickFunc: (part: number, index: number) => {
                    this.curPart = part;
                    this.curIndex = index;
                    this.refUiList2();
                    this.refTips2();
                },
                isShowHigh: this.curIndex == index,
            };
        });
        this.uiList2.setState(state);
    }
}
