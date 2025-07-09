import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import ListItemUserInfoItem from "../common/ListItemUserInfoItem";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemChallengeItem")
@ccclass
export default class ListItemChallengeItem extends UIListItem {
    @autowired(UILabel) points: UILabel = null;
    @autowired(UIButton) challenge: UIButton = null;
    @autowired(UIList) userInfo: UIList<ListItemUserInfoItem> = null;
    state: any;
    setState(state: this["state"]): void {
        this.state = state;
    }
}
