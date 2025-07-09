import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import Item from "../../entity/Item";
import Mission from "../../entity/Mission";
import ListItemItem from "./ListItemItem";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemMissionItem")
@ccclass
export default class ListItemMissionItem extends UIListItem {
    /**任务进度条 */
    @autowired(cc.ProgressBar) progress: cc.ProgressBar = null;
    /**任务描述 */
    @autowired(UILabel) missionContent: UILabel = null;
    /**任务进度 */
    @autowired(UILabel) progressLabel: UILabel = null;
    /**按钮文本 */
    @autowired(UILabel) label: UILabel = null;
    /**奖励物品 */
    @autowired(UIList) missionItem: UIList<ListItemItem> = null;
    /**前往 */
    @autowired(UIButton) goto: UIButton = null;
    state: { mission: Mission };
    setState(state: this["state"]): void {
        this.state = state;
        this.node.name = this.state.mission.id.toString();
        let arr = this.state.mission.getReward().map((t) => {
            return { carEquipment: null, equipment: null, item: t, status: 0 };
        });
        this.missionItem.setState(arr);
        this.progress.progress = this.state.mission.progress / this.state.mission.getRequire();
        this.missionContent.setText(...this.state.mission.getDescription());
        this.progressLabel.setText(["_rs" + this.state.mission.progress + "/" + this.state.mission.getRequire()]);
        if (this.state.mission.progress >= this.state.mission.getRequire()) {
            this.goto.bg.imgName = "common_btn8";
            //this.label.setText([GLang.code.ui.get]);
            this.label.setText([GLang.code.ui.lingqu]);
            this.goto.onClick = async () => {
                const reward = await GModel.mission.obtainMissionReward(this.state.mission.id);
                GTip.showTip([GLang.code.ui.get_success]);
                reward.forEach((t) => {
                    GTip.showRewardItem(t);
                    if (this.missionItem && this.missionItem.node) {
                        // 异步报错规避
                        GTip.showFlyReward(this.missionItem.node.convertToWorldSpaceAR(cc.v2()), t);
                    }
                });
            };
        } else {
            this.goto.bg.imgName = "common_btn11";
            //this.label.setText([GLang.code.ui.map_goto]);
            this.label.setText([GLang.code.ui.weidacheng]);
            this.goto.onClick = () => {
                this.state.mission.goto();
            };
        }
    }
}
