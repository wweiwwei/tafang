import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import UIRichText from "../../../framework/ui/UIRichText";
import ListItemItem from "../common/ListItemItem";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemCareerMission")
@ccclass
export default class ListItemCareerMission extends UIListItem {
    @autowired(UILabel) status: UILabel = null;
    @autowired(UIImage) effect: UIImage = null;
    @autowired(UIImage) redTips: UIImage = null;
    @autowired(UIImage) isGet: UIImage = null;
    @autowired(UIImage) bg: UIImage = null;
    @autowired(UIRichText) level: UIRichText = null;
    @autowired(UILabel) progressBarLabel: UILabel = null;
    @autowired(cc.ProgressBar) progressBar: cc.ProgressBar = null;
    @autowired(UIList) reward: UIList<ListItemItem> = null;
    state: { id: number };
    setState(state: this["state"]): void {
        this.state = state;
        let mission = GModel.player.getMission().find((m) => m.id === this.state.id);
        if (mission) {
            this.status.setText([GConstant.missionState[mission.getStateIndex()]]);
            this.level.setText(...mission.getDescription());
            this.progressBarLabel.setText(["_rs" + mission.progress + "/" + mission.getRequire()]);
            this.progressBar.progress = mission.progress / mission.getRequire();
            let arr = mission.getReward().map((r) => {
                return { item: r, status: 0 };
            });
            this.reward.setState(arr);
            this.bg.imgName =
                mission.getStateIndex() === 0
                    ? "common_tower_formate2"
                    : mission.getStateIndex() === 2
                    ? "common_tower_formate3"
                    : "common_tower_formate1";
            this.isGet.node.active = mission.getStateIndex() === 2;
            this.redTips.node.active = mission.getStateIndex() === 0;
            // this.effect.node.active = mission.getStateIndex() === 0;
            this.node.getComponent(UIButton).onClick = async () => {
                let data = await GModel.player.obtainMissionReward(mission.id);
                data.forEach((item) => GTip.showRewardItem(item));
            };
        }
    }
}
