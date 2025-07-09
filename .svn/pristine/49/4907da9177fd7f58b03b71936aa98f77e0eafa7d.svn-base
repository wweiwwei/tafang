import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import Item from "../../entity/Item";
import ListItemHeroItem from "./ListItemHeroItem";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemDebris")
@ccclass
export default class ListItemDebris extends UIListItem {
    static _poolSize: number = 20;
    /**碎片容器 */
    @autowired(UIList) itemContainer: UIList<ListItemHeroItem> = null;
    @autowired(UIButton) btn: UIButton = null;
    /**是否可合成 */
    @autowired(UIImage) redDot: UIImage = null;
    @autowired(UILabel) hero_name: UILabel = null;
    /**库存 */
    @autowired(UILabel) storage: UILabel = null;
    /**进度条 */
    @autowired(UIImage) progressbar: UIImage = null;
    /**进度条 */
    @autowired(UIImage) progress: UIImage = null;
    /**可合成 */
    @autowired(UIImage) combinable: UIImage = null;

    state: {
        item: Item;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.btn.onClick = () => {
            GModel.hero.composeHero(this.state.item.id);
            GTip.showTip(["ui/hero_combine_success"]);
        };
        let hero = GTable.getList("HeroTbl").find((t) => t.frag === this.state.item.id);
        if (GModel.hero.getAllHero().find((t) => t.uniqueId === hero.id)) {
            this.redDot.node.active = false;
            this.combinable.node.active = false;
            this.progress.node.active = false;
            this.storage.node.active = false;
            this.hero_name.node.setPosition(cc.v2(0, -61));
        } else {
            let require = GConfig.hero.composeRequire[GTable.getById("HeroTbl", hero.id).quality];
            if (this.state.item.count >= require) {
                this.redDot.node.active = true;
                this.combinable.node.active = true;
            } else {
                this.redDot.node.active = false;
                this.combinable.node.active = false;
            }
            this.storage.setText(["_rs" + this.state.item.count + "/" + require]);
            let perWidth = 120 / require;
            let wid = perWidth * this.state.item.count;
            this.progressbar.node.width = wid > 120 ? 120 : wid;
            this.hero_name.node.setPosition(cc.v2(0, -71.535));
            this.progress.node.active = true;
            this.storage.node.active = true;
        }
        this.hero_name.setText([GLang.code.ui.frag_name, hero.name]);
        this.itemContainer.setState([
            {
                id: hero.id,
                uniqueId: -1,
                cb: () => {},
                status: 1,
                rightBottomText: ["_rsx" + GModel.knapsack.getStorageById(hero.frag)],
            },
        ]);
    }
}
