import { autowired, registerClass } from "../../../framework/Decorator";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
import UIWindow from "../../../framework/ui/UIWindow";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemPropDetailsSkillTips")
@ccclass
export default class ListItemPropDetailsSkillTips extends UIListItem {
    @autowired(UILabel) skillTips: UILabel = null;
    state: {
        text: string;
    };
    setState(state: this["state"]): void {
        this.state = state;

        if (state) this.skillTips.setText([state.text]);
        else {
            this.skillTips.setText([]);
        }
    }
}
