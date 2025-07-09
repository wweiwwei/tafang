import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemGift")
@ccclass
export default class ListItemGift extends UIListItem {
    /**英雄类型的图片 */
    @autowired(UIImage) icon: UIImage = null;
    @autowired(UIButton) btn: UIButton = null;
    @autowired(UIImage) bg: UIImage = null;

    state: {
        imgName: string;
        cb: () => void;
        selected: boolean;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.icon.imgName = GConstant.getHeroKindIcon(this.state.imgName);
        this.btn.onClick = this.state.cb;
        this.bg.node.active = this.state.selected;
    }
}
