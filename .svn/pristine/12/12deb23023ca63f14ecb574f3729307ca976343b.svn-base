import { autowired, registerClass } from "../../../framework/Decorator";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import ListItemPropertyTipsItem from "./ListItemPropertyTipsItem";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemPropertyTips")
@ccclass
export default class ListItemPropertyTips extends UIListItem {
    /** */
    @autowired(UILabel) nameLab: UILabel = null;
    /**限购 */
    @autowired(UIList) uIList: UIList<ListItemPropertyTipsItem> = null;

    state: { menuText: string; data: any };
    setState(state: this["state"]): void {
        this.state = state;
        this.nameLab.setText([state.menuText]);
        this.uIList.setState(
            state.data.map((d) => {
                return { name: d.name, num: d.num, key: d.key, isClick: true };
            })
        );
    }
}
