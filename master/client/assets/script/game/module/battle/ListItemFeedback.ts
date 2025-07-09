import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import Item from "../../entity/Item";
import ListItemItem from "../common/ListItemItem";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemFeedback")
@ccclass
export default class ListItemFeedback extends UIListItem {
    /**条件 */
    @autowired(UILabel) condition: UILabel = null;
    /**获取奖励按钮 */
    @autowired(UIButton) getReward: UIButton = null;
    /**可领取 */
    @autowired(UIImage) completed: UIImage = null;
    /**奖励容器 */
    @autowired(UIList) itemContainer: UIList<ListItemItem> = null;

    state: {
        id: number;
    };
    setState(state: this["state"]): void {
        this.state = state;
        let tbl = GTable.getById("StageAchievementTbl", this.state.id);
        let complete = GModel.stage.getStageAchievementMission(this.state.id);
        this.completed.node.active = true;
        if (complete === "completed") {
            this.getReward.onClick = async () => {
                await GModel.stage.obtainAchievementReward(this.state.id);
                this.getReward.interactable = false;
                this.completed.imgName = "common_hint1";
            };
        } else if (complete === "uncompleted") {
            this.getReward.interactable = false;
            this.completed.node.active = false;
        } else {
            this.getReward.interactable = false;
            this.completed.imgName = "common_hint1";
        }
        let string = tbl.stage[0] + "-" + tbl.stage[1];
        this.condition.setText([GLang.code.ui.map_condition, "_rs" + string]);
        let items = Item.fromItemArray(tbl.reward).map((t) => {
            return { item: t, status: -1 };
        });
        this.itemContainer.setState(items);
    }
}
