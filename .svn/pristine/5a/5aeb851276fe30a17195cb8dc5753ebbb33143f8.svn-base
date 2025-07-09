import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
const { ccclass, property } = cc._decorator;
@registerClass("ListItemHeroDetailDrag")
@ccclass
export default class ListItemHeroDetailDrag extends UIListItem {
    @autowired(UIImage) icon: UIImage = null;

    state: {
        /**图标 */
        icon: string;
    };

    setState(state: this["state"]): void {
        this.state = state;
        this.icon.imgName = state.icon;
    }
}
