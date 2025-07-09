import { autowired, message, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIWindow from "../../../framework/ui/UIWindow";
import Item from "../../entity/Item";
import EventName from "../../event/EventName";
import ListItemItem from "../common/ListItemItem";
import WindowCongratulation from "../common/WindowCongratulation";
import ListItemClearAd from "./ListItemClearAd";

const { ccclass, property } = cc._decorator;

@registerClass("WindowRaid")
@ccclass
export default class WindowRaid extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: any;
    _returnValue: any;
    @autowired(UIButton) closeBtn: UIButton = null;
    @autowired(UIButton) sweepBtn: UIButton = null;
    @autowired(UIButton) adSweepBtn: UIButton = null;
    @autowired(UILabel) cost: UILabel = null;
    @autowired(UILabel) videoRemain: UILabel = null;
    @autowired(UIList) rewardList: UIList<ListItemItem> = null;

    protected onInited(): void {
        this.closeBtn.setTransition(false);
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.sweepBtn.onClick = async () => {
            const prestage = GModel.stage.preStage();
            if (prestage) {
                GModel.stage.sweep(prestage.mapIndex, prestage.stageIndex);
            }
        };
        this.adSweepBtn.onClick = () => {
            GModel.stage.adSweep();
        };
        this.refresh();
    }

    @message([EventName.stateKey.stage, EventName.stateKey.stageAdInfo, , EventName.stateKey.powerData])
    refresh() {
        this.refreshBtn();
        this.refreshReward();
    }

    refreshBtn() {
        this.adSweepBtn.setGrey(GModel.stage.remainAdSweep() <= 0);
        this.sweepBtn.setGrey(GModel.power.powerInfo().power < GConfig.player.powerCost);
        this.cost.setText(["_rsx" + GConfig.player.powerCost]);
        this.videoRemain.setText([`_rs${GModel.stage.remainAdSweep()}/${GConfig.stage.sweepDaily}`]);
    }

    refreshReward() {
        const prestage = GModel.stage.preStage();
        if (prestage) {
            const tbl = GTable.getList("StageTbl").find(
                (t) => t.mapIndex === prestage.mapIndex && t.stageIndex === prestage.stageIndex
            );
            const reward = Item.fromItemArray(tbl.sweepReward);
            this.rewardList.setState(
                reward.map((d) => {
                    return { item: d, status: 0 };
                })
            );
        }
    }
}
