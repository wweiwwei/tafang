import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
import { CarEquipmentWrapper } from "../../entity/CarEquipment";
import { EquipmentWrapper } from "../../entity/Equipment";
import Item from "../../entity/Item";
import WindowEquipmentDescription from "../hero/WindowEquipmentDescription";
import WindowExchangeHero from "../hero/WindowExchangeHero";
import WindowItemDescription from "./WindowItemDescription";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemItem2")
@ccclass
export default class ListItemItem2 extends UIListItem {
    @autowired(UIButton) btn: UIButton = null;
    @autowired(UIImage) bg: UIImage = null;
    @autowired(UIImage) image: UIImage = null;
    /**选中高亮 */
    @autowired(UIImage) selected1: UIImage = null;
    @autowired(UIImage) selected2: UIImage = null;
    // /**选中图标 */
    // @autowired(UIImage) select: UIImage = null;

    state: {
        id: number;
        // uid: number;
        bg: string;
        image: string;
        cb?: Function;
        /**高亮 */
        selected1?: boolean;
        /**高亮 */
        selected2?: boolean;
        imgScale: number;
    };

    setState(state: this["state"]): void {
        this.state = state;
        // this.image.node.scale = state.imgScale;
        this.image.imgName = state.image;
        this.bg.imgName = state.bg;
        this.selected2.node.active = state.selected2;
        this.selected1.node.active = state.selected1;
        this.btn.onClick = () => {
            if (state.cb) {
                state.cb(state.id);
            }
        };
    }
}
