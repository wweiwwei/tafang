import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemRare")
@ccclass
export default class ListItemRare extends UIListItem {
    /**品质 */
    @autowired(UIImage) quality: UIImage = null;
    @autowired(UILabel) rare: UILabel = null;
    @autowired(UILabel) nextRare: UILabel = null;

    state: {
        rare: string;
        nextRare: string;
        quality: number;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.quality.imgName = GConstant.towerPropertyQuality[this.state.quality];
        this.rare.setText(["_rs" + this.state.rare]);
        this.nextRare.setText(["_rs" + this.state.nextRare]);
    }
}
