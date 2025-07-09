import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIToggle from "../../../framework/ui/UIToggle";
import UIWindow from "../../../framework/ui/UIWindow";
import EventName from "../../event/EventName";
import ListItemItem from "../common/ListItemItem";

const { ccclass, property } = cc._decorator;

@registerClass("WindowBattleStageInfo", {
    sceneWindow: {
        kind: "battle",
        openIndex: 4,
    },
})
@ccclass
export default class WindowBattleStageInfo extends UIWindow {
    _windowParam: any;
    _returnValue: any;

    @autowired(UILabel) stageLabel: UILabel = null;
    @autowired(UILabel) progressLabel: UILabel = null;
    @autowired(cc.ProgressBar) waveBar: cc.ProgressBar = null;
    @autowired(UIButton) returnBtn: UIButton = null;
    @autowired(UIToggle) failReChallenge: UIToggle = null;
    @autowired(UIToggle) autoNext: UIToggle = null;
    /** 奖励 */
    @autowired(cc.Node) reward: cc.Node = null;
    /** 奖励列表 */
    @autowired(UIList) rewardList: UIList<ListItemItem> = null;
    @autowired(UIButton) rewardToggle: UIButton = null;
    @autowired(cc.Node) rewardArrow: cc.Node = null;
    @autowired(cc.Node) rewardPanel: cc.Node = null;

    private openReward = false;

    protected onInited(): void {
        this.node.zIndex = -1;
        // this.returnBtn.onClick = () => {
        //     GModel.stage.switchToPeaceMode();
        // };
        this.refreshLabel();
        this.toStageMode();

        this.failReChallenge.checked = GModel.localStorage.failReChallenge;
        this.failReChallenge.onToggle = (checked) => {
            GModel.localStorage.failReChallenge = checked;
        };
        this.failReChallenge.setTransition(false);

        this.autoNext.checked = GModel.localStorage.autoNext;
        this.autoNext.onToggle = (checked) => {
            GModel.localStorage.autoNext = checked;
        };
        this.autoNext.setTransition(false);

        this.refreshProgress();
        this.schedule(this.refreshProgress, 0.2);

        this.rewardToggle.onClick = () => {
            this.openReward = !this.openReward;
            if (this.openReward) {
                this.rewardToggle.node.x = 153;
                this.rewardArrow.scaleX = Math.abs(this.rewardArrow.scaleX);
                this.rewardPanel.active = true;
            } else {
                this.rewardToggle.node.x = -80;
                this.rewardArrow.scaleX = -Math.abs(this.rewardArrow.scaleX);
                this.rewardPanel.active = false;
            }
        };
    }

    @message([EventName.stateKey.stage, EventName.battleStart])
    refreshLabel() {
        const api = GBattleApiManager.getBattleStageApi(0);
        if (!api) {
            let d = GModel.stage.getCurrentStage();
            this.stageLabel.setText([GLang.code.ui.challengeStage, "_rs" + d.stageIndex]);
            return;
        }
        this.stageLabel.setText(...api.getStageLabel());
    }

    refreshProgress() {
        const api = GBattleApiManager.getBattleStageApi(0);
        if (!api) return;
        this.refreshLabel();
        const { progress, text } = api.getStageProgress();
        this.progressLabel.setText(...text);
        this.waveBar.progress = progress;
        this.refreshInfiniteReward();
    }

    toStageMode() {
        this.returnBtn.node.active = false;
        this.reward.active = false;
    }

    toInfiniteMode(cb: () => void) {
        this.returnBtn.node.active = true;
        this.returnBtn.onClick = cb;
        this.reward.active = true;
    }
    toDamageMode(cb: () => void) {
        this.returnBtn.node.active = true;
        this.returnBtn.onClick = cb;
        this.reward.active = false;
    }
    toTowerMode(cb: () => void) {
        this.returnBtn.node.active = true;
        this.returnBtn.onClick = cb;
        this.reward.active = false;
    }

    refreshInfiniteReward() {
        if (!this.reward.active) return;
        const api = GBattleApiManager.getBattleStageApi(0);
        if (!api) return;
        // 只有无尽模式才使用
        const wave = api.getInfiniteWave();
        const reward = GModel.infiniteBattle.getRewardByWave(wave);
        this.rewardList.setState(
            reward.map((r) => {
                return {
                    item: r,
                    status: 0,
                };
            })
        );
    }
}
