import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import Mission from "../../entity/Mission";
import ListItemItem from "../common/ListItemItem";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemImpactMission")
@ccclass
export default class ListItemImpactMission extends UIListItem {
    /**任务进度 */
    @autowired(cc.ProgressBar) progressBar: cc.ProgressBar = null;
    /**任务描述 */
    @autowired(UILabel) missionDes: UILabel = null;
    /**进度文本 */
    @autowired(UILabel) progressBarLabel: UILabel = null;
    /**奖励 */
    @autowired(UIList) reward: UIList<ListItemItem> = null;
    /**领取 */
    @autowired(UIButton) get: UIButton = null;
    /**领取红点 */
    @autowired(UIImage) exclamation: UIImage = null;
    /**已领取 */
    @autowired(UILabel) finish: UILabel = null;

    state: {
        mission: Mission;
        cb: () => void;
    };

    setState(state: this["state"]): void {
        this.state = state;
        console.log("this.state.mission =", this.state.mission);
        this.missionDes.setText(...this.state.mission.getDescription());
        this.progressBar.progress = this.state.mission.progress / this.state.mission.getRequire();
        this.progressBarLabel.setText(["_rs" + this.state.mission.progress + "/" + this.state.mission.getRequire()]);
        if (this.state.mission.progress >= this.state.mission.getRequire()) {
            this.get.bg.imgName = "common_btn6";
            this.get.text.setText([GLang.code.ui.get]);
            this.get.onClick = async () => {
                const reward = await GModel.impact.obtainMissionReward(this.state.mission.id);
                reward.forEach((t) => {
                    GTip.showRewardItem(t);
                    if (this.reward && this.reward.node) {
                        // 异步报错规避
                        GTip.showFlyReward(this.reward.node.convertToWorldSpaceAR(cc.v2()), t);
                    }
                });
            };
        } else {
            this.get.bg.imgName = "common_btn5";
            this.get.text.setText([GLang.code.ui.map_goto]);
            this.get.onClick = () => {
                this.state.mission.goto();
                this.state.cb();
            };
        }
        let items = this.state.mission.getReward().map((item) => {
            return { item, status: 0 };
        });
        this.reward.setState(items);
        this.exclamation.node.active = this.state.mission.getState() === "complete";
        this.get.node.active = this.state.mission.getState() !== "hasGet";
        this.finish.node.active = this.state.mission.getState() === "hasGet";
    }
}
