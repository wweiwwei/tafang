import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import Item from "../../entity/Item";
import ListItemItem from "./ListItemItem";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemHandbookReward")
@ccclass
export default class ListItemHandbookReward extends UIListItem {
    state: {
        id: number;
        level: number;
        btnStatus: string; // get-可领取，get2-已领取, noAchieve-未达成
        reward: { item: Item; status: number }[];
        page: number; // 1-图鉴等级奖励
    };
    @autowired(UIList) rewardItems: UIList<ListItemItem> = null;
    @autowired(UILabel) btnLabel: UILabel = null;
    @autowired(UILabel) get2: UILabel = null;
    @autowired(UILabel) levelLabel: UILabel = null;
    @autowired(UIButton) btn: UIButton = null;

    setState(state: this["state"]): void {
        this.state = state;
        if (this.state.btnStatus === "get2") {
            this.get2.node.active = true;
        } else {
            this.btnLabel.setText(["ui/" + this.state.btnStatus]);
        }
        this.state = state;
        this.levelLabel.setText([GLang.code.ui.map_unlock_level, "_rs" + this.state.level]);
        this.rewardItems.setState(this.state.reward);
        this.btn.node.active = this.state.btnStatus !== "get2";
        this.btn.setGrey(this.state.btnStatus === "noAchieve");
    }
    protected onInited(): void {
        this.btn.onClick = () => {
            this.handleBtnClick();
        };
    }
    async handleBtnClick() {
        if (this.state.btnStatus === "noAchieve") {
            await GModel.collection.obtainLevelReward(this.state.page, this.state.level);
        } else {
            await GModel.collection.obtainLevelReward(this.state.page, this.state.level);
            GTip.showTip([GLang.code.ui.get_success]);
        }
    }
}
