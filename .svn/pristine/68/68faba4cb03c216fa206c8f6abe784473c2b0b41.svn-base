import { autowired, registerClass } from "../../../framework/Decorator";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemLevelItem")
@ccclass
export default class ListItemLevelItem extends UIListItem {
    @autowired(UIImage) rankImg: UIImage = null;
    @autowired(UIImage) level: UIImage = null;
    @autowired(UILabel) progress: UILabel = null;
    state: { index: number };
    setState(state: this["state"]): void {
        this.state = state;
        let count = (GModel.tower.level() % 10) + 1;
        this.rankImg.imgName = count > this.state.index ? "pata_level_challenged" : "pata_level_not_challenged";
        this.rankImg.node.scaleX = this.state.index % 2 === 1 ? -1 : 1;
        this.level.node.active = count === this.state.index;
        this.progress.setText(["_rs" + count + "/10"]);
    }
}
