import { autowired, registerClass } from "../../../framework/Decorator";
import { GameDate } from "../../../framework/date/GameDate";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import { EmailInfo } from "../../entity/EmailInfo";
import ListItemItem from "../common/ListItemItem";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemEmailItem")
@ccclass
export default class ListItemEmailItem extends UIListItem {
    /**奖励列表 */
    @autowired(UIList) rewardList: UIList<ListItemItem> = null;
    @autowired(UILabel) emailName: UILabel = null;
    @autowired(UILabel) lastday: UILabel = null;
    @autowired(UIImage) exclamation: UIImage = null;
    @autowired(UIButton) get: UIButton = null;
    state: {
        email: EmailInfo;
        cb: () => void;
    };

    setState(state: this["state"]): void {
        this.state = state;
        this.node.getComponent(UIButton).onClick = this.state.cb;
        this.rewardList.setState(
            this.state.email.reward.map((t) => {
                return { item: t, status: 0 };
            })
        );
        this.emailName.setText(["_rs" + this.state.email.title]);
        this.exclamation.node.active = !this.state.email.hasGet;
        this.get.onClick = async () => {
            let data = await GModel.email.getEmailReward(this.state.email.id);
            data.forEach((d) => GTip.showRewardItem(d));
        };
        this.lastday.setText(["_rs" + new GameDate(this.state.email.endTime).format("MM-DD hh:mm:ss")]);
    }
}
