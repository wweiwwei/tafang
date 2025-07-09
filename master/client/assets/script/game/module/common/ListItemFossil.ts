import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
import Item from "../../entity/Item";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemFossil")
@ccclass
export default class ListItemFossil extends UIListItem {
    @autowired(UIButton) btn: UIButton = null;
    @autowired(UIImage) bg: UIImage = null;
    @autowired(UIImage) image: UIImage = null;
    @autowired(UILabel) count: UILabel = null;
    @autowired(UIImage) equiped: UIImage = null;
    @autowired(UILabel) fossilName: UILabel = null;
    @autowired(cc.Node) bottom: cc.Node = null;

    state: {
        item: Item;
        cb: () => void;
        bottom?: boolean;
        color?: number;
        chosen?: boolean;
    };
    private addBg = ["fossil_add_blue", "fossil_add_purple", "fossil_add_red", "fossil_add_gold"];
    setState(state: this["state"]): void {
        this.state = state;
        this.count.node.active = this.state.item.count !== 0;
        this.btn.onClick = this.state.cb;
        this.bottom.active = this.state.bottom && this.state.item.id !== -1;
        this.equiped.node.active = this.state.chosen;
        if (this.state.item.id === -1) {
            this.bg.imgName = GConstant.itemQualityBg[0];
            if (this.state.color >= 0) {
                this.image.imgName = this.addBg[this.state.color];
            } else {
                this.image.imgName = "";
            }
            return;
        }
        this.count.setText(Item.getCountString(this.state.item));
        this.image.imgName = Item.getImg(this.state.item);
        this.bg.imgName = GConstant.itemQualityBg[Item.getQuality(this.state.item)];
        this.fossilName.setText(Item.getName(this.state.item));
    }
}
