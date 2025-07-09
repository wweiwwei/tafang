import { autowired, message, registerClass } from "../../../framework/Decorator";
import ResourceLoader from "../../../framework/ResourceLoader";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import Hero from "../../entity/Hero";
import EventName from "../../event/EventName";
import ListItemStarItem from "./ListItemStarItem";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemHeroItem")
@ccclass
export default class ListItemHeroItem extends UIListItem {
    @autowired(UIButton) bg_btn: UIButton = null;
    @autowired(UIImage) image: UIImage = null;
    @autowired(UIImage) gift: UIImage = null;
    @autowired(UIImage) chosen: UIImage = null;
    @autowired(UIImage) check: UIImage = null;
    @autowired(UIImage) formated: UIImage = null;
    @autowired(UIImage) formatChosen: UIImage = null;
    @autowired(UIImage) gift2: UIImage = null;
    /**碎片 */
    @autowired(UIImage) debris: UIImage = null;
    /**等级或数量 */
    @autowired(UILabel) label: UILabel = null;
    @autowired(UIList) star: UIList<ListItemStarItem> = null;
    @autowired(UILabel) rightBottomLabel: UILabel = null;
    @autowired(UILabel) owned: UILabel = null;

    state: {
        uniqueId: number;
        id: number;
        status: number; //0-英雄,1-碎片,2-上阵,3-图鉴
        /** 右下角的文本 */
        rightBottomText?: string[];
        formated?: number;
        cb: () => void;
        /** 使按钮失效 */
        diableButton?: boolean;
    };
    setState(state: this["state"]): void {
        this.state = state;
        if (this.state.formated) this.formated.node.active = this.state.formated === 1;
        if (this.state.diableButton) {
            this.bg_btn.setEnable(false);
        } else {
            this.bg_btn.setEnable(true);
        }
        this.node.name = this.state.id.toString();
        let tbl = GTable.getById("HeroTbl", this.state.id);
        let hero = GModel.hero.getHeroByUniqueId(this.state.uniqueId);
        this.image.imgName = tbl.img + "_head";
        this.gift.imgName = "hero_kind_" + tbl.kind;
        this.gift2.imgName = "hero_kind_" + tbl.kind;
        this.bg_btn.bg.imgName =
            hero === undefined ? GConstant.heroQuality[tbl.quality] : GConstant.heroQuality[tbl.quality];
        //  + (hero.rank > 0 ? "+" + hero.rank : "");
        this.debris.node.active = false;
        this.chosen.node.active = false;
        this.check.node.active = false;
        this.label.node.active = false;
        this.formatChosen.node.active = false;
        this.owned.node.active = false;
        this.bg_btn.interactable = false;
        if (this.state.rightBottomText) {
            this.rightBottomLabel.setText(this.state.rightBottomText);
        } else {
            this.rightBottomLabel.setText(["_rs"]);
        }
        if (this.state.status === 3) this.node.scale = 0.8;
        if (this.state.status == 1) {
            this.debris.node.active = true;
            this.bg_btn.onClick = () => {
                this.state.cb();
            };
        } else {
            if (hero === undefined) {
                this.owned.node.active = true;
                GUtils.ui.setAllChildSpGray(this.bg_btn.node);
                // this.bg_btn.bg.imgName = "item_hero_grey";
                // this.image.node.color=cc.color()
            } else {
                GUtils.ui.setAllChildSpNormal(this.bg_btn.node);
                this.label.node.active = true;
                this.label.setText(["_rslv." + hero.level]);
                this.star.setState(hero.getStarItem(0));
                if (this.state.status == 2) {
                    this.chosen.node.active = hero.isFormated();
                    this.check.node.active = hero.isFormated();
                    this.bg_btn.interactable = true;
                    this.bg_btn.onClick = () => {
                        this.state.cb();
                    };
                }
            }
        }
    }
    @message([EventName.chosenHero])
    showFormatChosen(hero: Hero) {
        this.formatChosen.node.active = hero && this.state.id === hero.id;
    }
}
