import { autowired, registerClass } from "../../../framework/Decorator";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
import UIWindow from "../../../framework/ui/UIWindow";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemPvpSkill")
@ccclass
export default class ListItemPvpSkill extends UIListItem {
    @autowired(UIImage) progress: UIImage = null;
    @autowired(UILabel) skillCount: UILabel = null;
    state: {
        progress: number;
        count: number;
    };
    setState(state: this["state"]): void {
        this.state = state;

        this.progress.fillRange = 0.8;
        this.skillCount.setText(["_rs" + state.count]);
    }
}
