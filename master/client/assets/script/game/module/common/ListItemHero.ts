import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import Hero from "../../entity/Hero";
import ListItemHeroItem from "./ListItemHeroItem";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemHero")
@ccclass
export default class ListItemHero extends UIListItem {
    static _poolSize: number = 20;
    /**英雄容器 */
    @autowired(UIList) itemContainer: UIList<ListItemHeroItem> = null;
    /**英雄按钮 */
    @autowired(UIButton) herobtn: UIButton = null;
    @autowired(UILabel) hero_name: UILabel = null;
    @autowired(UIImage) exclamation: UIImage = null;
    /**英雄是否选中 */
    // @autowired(UIImage) chosen: UIImage = null;

    state: {
        hero: Hero;
        show: boolean;
        cb: () => void;
        status: number;
        formated?: number;
    };
    setState(state: this["state"]): void {
        this.state = state;
        let hero = this.state.hero;
        this.exclamation.node.active = this.state.show;
        this.node.name = hero.id.toString();
        // if (this.state.selected) {
        //     this.chosen.node.active = true;
        // } else {
        //     this.chosen.node.active = false;
        // }
        this.herobtn.onClick = this.state.cb;
        this.hero_name.setText([hero.getTbl().name], hero.rank ? ["_rs+" + hero.rank] : ["_rs"]);
        let newState = {
            id: hero.id,
            uniqueId: hero.uniqueId,
            status: this.state.status,
            formated: this.state.formated,
            cb: () => {},
        };
        this.itemContainer.setState([newState]);
    }
}
