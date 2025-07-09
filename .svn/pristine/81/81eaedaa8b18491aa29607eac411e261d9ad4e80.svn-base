import { autowired, registerClass } from "../../../framework/Decorator";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import UIRichText from "../../../framework/ui/UIRichText";
import ListItemItem from "../common/ListItemItem";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemRankRewardItem")
@ccclass
export default class ListItemRankRewardItem extends UIListItem {
    /**前三排行 */
    @autowired(UIImage) rankImg: UIImage = null;
    /**排行 */
    @autowired(UIRichText) rankLabel: UIRichText = null;
    /**奖励 */
    @autowired(UIList) rewards: UIList<ListItemItem> = null;
    state: any;
    setState(state: this["state"]): void {
        this.state = state;
        if (this.state.rank[0] === this.state.rank[1]) {
            this.rankImg.node.active = true;
            this.rankImg.imgName = GConstant.rankImg[this.state.rank[0] - 1];
            this.rankLabel.setText(["_rs" + this.state.rank[0]]);
        } else {
            this.rankImg.node.active = false;
            this.rankLabel.setText([
                GLang.code.ui.arena_reward_rank,
                "_rs" + this.state.rank[0],
                "_rs" + this.state.rank[1],
            ]);
        }
        let arr = this.state.items.map((item) => {
            return { item, status: 0 };
        });
        this.rewards.setState(arr);
    }
}
