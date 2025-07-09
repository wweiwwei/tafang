import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
import Item from "../../entity/Item";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemSprite")
@ccclass
export default class ListItemSprite extends UIListItem {
    @autowired(UIButton) btn: UIButton = null;
    @autowired(UIImage) plus: UIImage = null;

    state: {
        id: number;
        cb: () => void;
    };
    setState(state: this["state"]): void {
        this.state = state;
        let sprite = GModel.sprite.getSpriteById(this.state.id);
        this.btn.bg.imgName = sprite ? GTable.getById("ItemTbl", sprite.id).img : "sprite_formate";
        this.plus.node.active = sprite === undefined;
        this.btn.text.node.active = sprite !== undefined;
        this.btn.text.setText([GLang.code.ui.map_unlock_level, "_rs" + (sprite ? sprite.level : 0)]);
        this.btn.onClick = this.state.cb;
    }
}
