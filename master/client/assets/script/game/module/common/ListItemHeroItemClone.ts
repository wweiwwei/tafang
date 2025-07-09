import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import Hero from "../../entity/Hero";
import ListItemStarItem from "./ListItemStarItem";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemHeroItemClone")
@ccclass
export default class ListItemHeroItemClone extends UIListItem {
    @autowired(UIButton) bg_btn: UIButton = null;
    @autowired(UIImage) image: UIImage = null;
    @autowired(UIImage) gift: UIImage = null;
    @autowired(UIImage) chosen: UIImage = null;
    /**碎片 */
    @autowired(UIImage) debris: UIImage = null;
    /**等级或数量 */
    @autowired(UILabel) rightTopLabel: UILabel = null;
    @autowired(UIList) starList: UIList<ListItemStarItem> = null;
    @autowired(UILabel) owned: UILabel = null;

    @autowired(UILabel) rightBottomLabel: UILabel = null;
    @autowired(UILabel) topLabel: UILabel = null;
    @autowired(UILabel) nameLabel: UILabel = null;
    @autowired(cc.Node) addNode: cc.Node = null;

    private heroTbl: HeroTbl = null;
    private hero: Hero = null;
    private index: number = 0;

    state: {
        uniqueId: number;
        rewardUniqueId?: number; //抽卡奖励表唯一id
        // heroId: number;
        // status?: string; //-1-空,0-英雄,1-碎片,2-上阵,3-图鉴,4-心愿池
        /** 右下角的文本 */
        rightBottomText?: string[];
        /**name */
        // isShowBottomName?: boolean;
        /**是否显示顶部提示 */
        topTextInfo?: { color: cc.Color; text: string[] };

        isShowNameText?: boolean;
        rightTopText?: string[];
        /**职业*/
        isShowKind?: boolean;
        /**+*/
        isShowAddNode?: boolean;
        /**星星*/
        isShowStars?: boolean;
        /**碎片*/
        isShowDebris?: boolean;
        /**固定背景颜色 */
        fixBgImgName?: string;
        index?: number;
        isSetGrey?: boolean; //是否置灰
        isChosen?: boolean;
        cb?: Function;
    };

    setState(state: this["state"]): void {
        this.state = state;

        this.init();
    }

    init() {
        this.heroTbl = GTable.getById("HeroTbl", this.state.uniqueId);
        this.hero = GModel.hero.getHeroByUniqueId(this.state.uniqueId);
        this.setChosen(false, "1");
        this.setImage();
        this.setTopLabel();
        this.setkind();
        this.setRightTopLabel();
        this.setDebris();
        this.setAddIcon();
        this.setOwnedLabel(["_rs"]);
        this.setRightBottomLabel();
        this.setStar();
        this.setName();
        this.setCallBack();
        this.setIndex();
        this.setBgImage();
        this.setGrey();

        if (this.state.isChosen) {
            this.chosen.node.active = true;
        }
    }

    setName() {
        if (!this.state.isShowNameText) {
            this.nameLabel.setText(["_rs"]);
            return;
        }
        if (!this.heroTbl) return;
        this.nameLabel.setText([this.heroTbl.name]);
        // this.nameLabel.fontSize = this.state.bottomName.fontSize;
        // this.nameLabel.node.setPosition(this.state.bottomName.x, this.state.bottomName.y);
    }

    /**种类 */
    setkind() {
        if (!this.heroTbl) {
            this.gift.node.active = false;
            return;
        }
        this.gift.imgName = "hero_kind_" + this.heroTbl.kind;
    }
    setImage() {
        if (!this.heroTbl) return;
        this.image.imgName = this.heroTbl.img + "_head";
    }
    setBgImage() {
        if (!this.state.fixBgImgName && this.heroTbl)
            this.bg_btn.bg.imgName = GConstant.heroQuality[this.heroTbl.quality];
        // + (this.hero.rank > 0 ? "+" + this.hero.rank : "");
        else {
            this.bg_btn.bg.imgName = this.state.fixBgImgName;
        }
    }
    setDebris() {
        if (this.state.isShowDebris) this.debris.node.active = true;
        else this.debris.node.active = false;
    }

    setStar() {
        if (this.state.isShowStars) {
            if (!this.hero) return;
            this.rightTopLabel.setText(["_rs" + this.hero.level]);
            this.starList.setState(this.hero.getStarItem(0));
        }
    }

    setTopLabel() {
        if (this.state.topTextInfo) this.topLabel.setText(this.state.topTextInfo.text);
        else this.topLabel.node.active = false;
    }

    setRightTopLabel() {
        if (this.state.rightTopText) {
            this.rightTopLabel.setText(this.state.rightTopText);
        } else {
            this.rightTopLabel.setText(["_rs"]);
        }
    }

    setRightBottomLabel() {
        if (this.state.rightBottomText) this.rightBottomLabel.setText(this.state.rightBottomText);
        else {
            this.rightBottomLabel.setText(["_rs"]);
        }
    }

    setOwnedLabel(str: string[]) {
        this.owned.setText(str);
    }
    //选中
    setChosen(isChosen: boolean, tets) {
        console.log("tets =", tets);
        this.chosen.node.active = isChosen;
    }
    /**+*/
    setAddIcon() {
        if (this.state.isShowAddNode) this.addNode.active = true;
        else this.addNode.active = false;
    }

    setCallBack() {
        if (!this.state.cb) {
            this.bg_btn.interactable = false;
            return;
        } else {
            this.bg_btn.interactable = true;
        }
        this.bg_btn.onClick = () => {
            this.state.cb({
                tag: this,
                uniqueId: this.state.uniqueId,
                index: this.index,
                rewardUniqueId: this.state.rewardUniqueId,
            });
        };
    }

    setIndex() {
        this.index = this.state.index;
    }

    /** 设置为灰色 */
    setGrey() {
        if (this.state.isSetGrey) {
            GUtils.ui.setAllChildSpGray(this.node);
        } else {
            GUtils.ui.setAllChildSpNormal(this.node);
        }
    }
}
