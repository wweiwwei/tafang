import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
import Item from "../../entity/Item";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemFossilItem")
@ccclass
export default class ListItemFossilItem extends UIListItem {
    @autowired(cc.Node) life: cc.Node = null;
    @autowired(UIImage) light: UIImage = null;
    @autowired(UIImage) gray: UIImage = null;
    @autowired(UIImage) bg: UIImage = null;
    @autowired(UILabel) label: UILabel = null;

    state: {
        id: number;
        cb: () => void;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.gray.node.active = this.state.id === -1;
        this.life.active = this.state.id !== -1;
        this.node.getComponent(UIButton).onClick = this.state.cb;
        if (this.state.id !== -1) {
            let fossil = new Item(this.state.id, 1);
            this.bg.imgName = Item.getImg(fossil);
            this.label.setText(Item.getName(fossil));
        }
    }
}
