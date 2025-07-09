import { autowired, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIWindow from "../../../framework/ui/UIWindow";
import ListItemSwitchAddPower from "./ListItemSwitchAddPower";

const { ccclass, property } = cc._decorator;
@registerClass("WindowUpdateEquipment")
@ccclass
export default class WindowUpdateEquipment extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: any;
    _returnValue: {
        id: number;
    } = { id: -1 };

    @autowired(UILabel) title: UILabel = null;
    @autowired(UILabel) tips: UILabel = null;
    @autowired(UIList) uiList: UIList<ListItemSwitchAddPower> = null;
    @autowired(UIButton) refresh: UIButton = null;
    @autowired(UIButton) refreshAd: UIButton = null;

    protected onInited(): void {
        this.refresh.onClick = () => {
            const api = GBattleApiManager.getBattleStageApi(0);
            if (api) {
                const property = api.globalProperty();
                property.reRoll();
                this.refreshUI(false);
            }
        };
        this.refreshAd.onClick = () => {
            const api = GBattleApiManager.getBattleStageApi(0);
            if (api) {
                const property = api.globalProperty();
                property.reRoll();
                this.refreshUI(false);
            }
        };
        this.refreshUI(true);
    }

    private touchId: number = -1;
    refreshUI(playAnim: boolean) {
        const api = GBattleApiManager.getBattleStageApi(0);
        if (api) {
            const property = api.globalProperty();
            const infoList = property.getCurrentCardInfo();
            const state = infoList.map((info, index) => {
                const id = GTable.getList("RogueSkillDetailTbl").find(
                    (t) => t.skillId === info.rogueId && t.level === info.level
                ).id;
                return {
                    index,
                    id,
                    cb: (touchId?: number) => {
                        if (touchId == -1) {
                            this.touchId = touchId;
                            this.refreshUI(false);
                            return;
                        }
                        this._returnValue.id = info.rogueId;
                        this.close();
                        this.refreshUI(false);
                    },
                    playAnim,
                    touchId: this.touchId,
                };
            });
            this.uiList.setState(state);
        }
    }
}
