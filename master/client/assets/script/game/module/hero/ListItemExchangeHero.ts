import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import ListItemHeroItem from "../common/ListItemHeroItem";
import ListItemHeroItemClone from "../common/ListItemHeroItemClone";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemExchangeHero")
@ccclass
export default class ListItemExchangeHero extends UIListItem {
    @autowired(UIImage) heroIcon: UIImage = null;
    @autowired(UIImage) heroIconsBg: UIImage = null;
    @autowired(UIImage) herobtn: UIImage = null;
    // @autowired(UIList) itemList: UIList<ListItemHeroItemClone> = null;
    @autowired(UIButton) switchBtn: UIButton = null;
    @autowired(UIImage) gImg: UIImage = null;
    @autowired(UILabel) nameLabel: UILabel = null;

    state: {
        tagIndex: number;
        index: number;
        chestId: number;
        fragId: number;
        count: number;
        clickCB: Function;
    };

    setState(state: this["state"]): void {
        this.state = state;
        if (state.tagIndex == state.index) this.switchState(true);
        else this.switchState(false);

        this.switchBtn.onClick = () => {
            if (state.clickCB) state.clickCB(state.index, state.chestId);
        };
        let heroTbl = GTable.getList("HeroTbl").find((tbl) => {
            return tbl.frag == state.fragId;
        });
        this.heroIcon.imgName = heroTbl.img + "_head";
        this.heroIconsBg.imgName = GConstant.heroQuality[heroTbl.quality];
        this.nameLabel.setText([heroTbl.name], ["_rs碎片"]);
        this.herobtn.node.on("click", () => {});
    }

    switchState(bool: boolean) {
        this.gImg.node.active = bool;
    }
}
