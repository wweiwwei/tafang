import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
import Item from "../../entity/Item";
import WindowCongratulation from "../common/WindowCongratulation";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemYuanBaoItem")
@ccclass
export default class ListItemYuanBaoItem extends UIListItem {
    @autowired(UIImage) icon: UIImage = null;
    @autowired(UILabel) count: UILabel = null;
    @autowired(UILabel) name1: UILabel = null;
    @autowired(UIButton) sellBtn: UIButton = null;
    @autowired(UIImage) adImg: UIImage = null;
    @autowired(UIImage) jodeImg: UIImage = null;
    @autowired(UILabel) jodeText: UILabel = null;

    state: { id: number; index: number };
    setState(state: this["state"]): void {
        this.state = state;
        this.jodeImg.node.parent.active = false;
        this.adImg.node.parent.active = false;
        let tbl = GTable.getById("MallTbl", state.id);

        this.icon.imgName = tbl.Img;
        let item = new Item(tbl.item[0], tbl.item[1]);
        this.name1.setText([GTable.getById("ItemTbl", item.id).name + "x" + item.count]);

        if (tbl.kind == 1) {
            this.adImg.node.parent.active = true;
        } else {
            this.jodeText.setText(["_rs" + tbl.price[1]]);
            this.jodeImg.node.parent.active = true;
        }
        this.count.setText(["_rs" + item.count]);

        this.sellBtn.onClick = async () => {
            let items = await GModel.mall.buy(state.id);
            if (items.length > 0) GWindow.open(WindowCongratulation, { items: items });
        };
    }
}
