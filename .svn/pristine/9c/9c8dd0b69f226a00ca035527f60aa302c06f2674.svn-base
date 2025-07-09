import { autowired, message, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIRichText from "../../../framework/ui/UIRichText";
import UISpine from "../../../framework/ui/UISpine";
import UIWindow from "../../../framework/ui/UIWindow";
import Item from "../../entity/Item";
import EventName from "../../event/EventName";
import ListItemItem from "../common/ListItemItem";

const { ccclass, property } = cc._decorator;
@registerClass("WindowStageDetail")
@ccclass
export default class WindowStageDetail extends UIWindow {
    _windowParam: any;
    _returnValue: any;
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    @autowired(UIButton) closeBtn: UIButton = null;
    @autowired(UIButton) ruleBtn: UIButton = null;
    @autowired(UIButton) challengeBtn: UIButton = null;
    @autowired(UILabel) bpLabel: UILabel = null;
    @autowired(UILabel) stageLabel: UILabel = null;
    @autowired(UIList) stageRewardList: UIList<ListItemItem> = null;
    @autowired(UIList) targetRewardList: UIList<ListItemItem> = null;
    @autowired(UIRichText) targetTip: UIRichText = null;
    @autowired(UISpine) monster: UISpine = null;
    protected onInited(): void {
        this.closeBtn.setTransition(false);
        this.closeBtn.onClick = () => this.close();
        this.ruleBtn.onClick = () => {
            // todo 说明信息
        };
        this.challengeBtn.onClick = async () => {
            // GModel.stage.swithToChallenge();
            await GUtils.http.delay(1000);
            this.close();
        };
        this.refreshStage();
        this.refreshTarget();
    }

    @message([EventName.stateKey.stage])
    refreshStage() {
        let d = GModel.stage.getCurrentStage();
        this.stageLabel.setText([GLang.code.ui.challengeStage, "_rs" + d.stageIndex]);
        this.bpLabel.setText(["_rs" + d.getBattlePoint()]);
        const list = d.firstClearReward();
        this.stageRewardList.setState(
            list.map((item) => {
                return { item, status: 0 };
            })
        );
        const monsterTbl = GTable.getById("MonsterTbl", d.getShowMonsterId());
        this.monster.setSpine(monsterTbl.img, "default", "idle");
        const spineTbl = GTable.getList("SpineInfoTbl").find((t) => t.spine === monsterTbl.img);
        this.monster.node.scale = spineTbl.uiScale;
    }

    refreshTarget() {
        // todo 刷新目标奖励
        const tbl = GTable.getList("StageAchievementTbl")[0];
        this.targetTip.setText([GLang.code.ui.stage_target_tip, "_rs" + `${tbl.stage[0]}-${tbl.stage[1]}`]);
        const list = Item.fromItemArray(tbl.reward);
        this.targetRewardList.setState(
            list.map((item) => {
                return { item, status: 0 };
            })
        );
    }
}
