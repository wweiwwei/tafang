import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import Item from "../../entity/Item";
import ListItemStarItem from "../common/ListItemStarItem";
import { CardPoolMenuType } from "./WindowCardPool";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemCardPoolItem")
@ccclass
export default class ListItemCardPoolItem extends UIListItem {
    state: {
        id: number;
        CardPoolWishType?: number;
        type: "gather" | "card" | "switchWish" | "wish" | "wishThree" | "homeWish"; //图鉴显示 小抽卡页面 心愿 主页左三个心愿
        itemType?: "hero" | "equipment" | "item"; //英雄 战甲 机车部件
        CardPoolMenuType?: CardPoolMenuType;
        isShowRightBottomCount?: number;
        index?: number;
        isSetGrey?: boolean; //是否置灰
        cb?: Function;
    };
    @autowired(UILabel) titleTipsLab: UILabel = null;
    @autowired(UIButton) bg_btn: UIButton = null;
    @autowired(UIImage) bgImg: UIImage = null;
    @autowired(UIImage) iconImg: UIImage = null;
    @autowired(UILabel) nameLab: UILabel = null;
    @autowired(cc.Node) switchNode: cc.Node = null;

    @autowired(UILabel) rightBottomLab: UILabel = null;
    @autowired(UIImage) debris: UIImage = null;
    @autowired(UIList) star: UIList<ListItemStarItem> = null;
    //左上角显示法师
    @autowired(UIImage) gift: UIImage = null;
    @autowired(cc.Node) addNode: cc.Node = null;

    private bgNameArr = [];

    setState(state: this["state"]): void {
        this.initItem(state);
    }

    public setSwitchImgIsShow(isShow: boolean) {
        this.switchNode.active = isShow;
    }

    initUi() {
        switch (this.state.type) {
            case "gather":
                this.initGatherItem();
                break;
            case "card":
                this.initCardItem();
                break;
            case "switchWish":
                this.initSwitchWishItem();
                break;
            case "wish":
                this.initWishItem();
                break;
            case "wishThree":
                this.initWishThreeItem();
                break;
            case "homeWish":
                this.initHomeWishItem();
                break;
        }
    }

    initGatherItem() {
        this.debris.node.active = false;
        this.rightBottomLab.node.active = false;

        let HeroTbl = GTable.getById("HeroTbl", this.state.id);
        this.gift.imgName = "hero_kind_" + HeroTbl.kind;
        this.iconImg.imgName = HeroTbl.img + "_head";
        this.nameLab.setText([HeroTbl.name]);
        this.gift.imgName = "hero_kind_" + HeroTbl.kind;

        this.bgImg.imgName = GConstant.heroQuality[HeroTbl.quality];
        this.bg_btn.onClick = () => {
            this.state.cb(this.state.id);
        };
    }

    initCardItem() {
        this.nameLab.node.active = false;
        //资质背景
        let ItemTbl: ItemTbl = GTable.getById("ItemTbl", this.state.id);
        this.bgImg.imgName = GConstant.heroQuality[ItemTbl.quality];
        let HeroTblAll = GTable.getList("HeroTbl");

        HeroTblAll.filter((tbl) => {
            tbl.frag == this.state.id;
        });
        this.gift.imgName = "hero_kind_" + HeroTblAll[0].kind;
        this.iconImg.imgName = Item.getImg(new Item(this.state.id, 1));
        this.nameLab.setText(Item.getName(new Item(this.state.id, 1)));
        this.rightBottomLab.setText(["_rsX" + this.state.isShowRightBottomCount]);

        this.bg_btn.onClick = () => {
            if (this.state.cb) this.state.cb(this.state.id);
        };
    }

    initSwitchWishItem() {
        this.gift.node.active = false;
        this.debris.node.active = false;
        this.rightBottomLab.node.active = false;

        let CardPoolRewardTbl = GTable.getById("CardPoolRewardTbl", this.state.id);
        let HeroTbl = GTable.getById("HeroTbl", CardPoolRewardTbl.rewardId);
        this.gift.imgName = "hero_kind_" + HeroTbl.kind;
        let qualityImgName: string = "";
        //资质背景1是橙色 2是红色
        switch (CardPoolRewardTbl.wishList) {
            case 1:
                qualityImgName = GConstant.heroQuality[GConstant.heroQuality.length - 2];
                break;
            case 2:
                qualityImgName = GConstant.heroQuality[GConstant.heroQuality.length - 1];
                break;
        }
        this.bgImg.imgName = qualityImgName;

        this.iconImg.imgName = HeroTbl.img + "_head";
        this.nameLab.setText([HeroTbl.name]);
        this.bg_btn.onClick = () => {
            this.state.cb(this, this.state.id);
        };
    }

    initWishItem() {
        this.debris.node.active = false;
        this.rightBottomLab.node.active = false;
        let CardPoolRewardTbl = GTable.getById("CardPoolRewardTbl", this.state.id);
        let wish1: any = null;
        let wish2: any = null;
        let info = GModel.cardPool.getCardPoolById(this.state.CardPoolMenuType);

        wish1 = info.wishList1;
        wish2 = info.wishList2;
        if (CardPoolRewardTbl.wishList == 1) {
            let tempArr = wish1.filter((info) => {
                return info.id === this.state.id;
            });
            if (tempArr.length > 0) {
                this.setSwitchImgIsShow(true);
            }
        } else {
            let tempArr = wish2.filter((info) => {
                return info.id == this.state.id;
            });
            if (tempArr.length > 0) {
                this.setSwitchImgIsShow(true);
            }
        }

        let HeroTbl = GTable.getById("HeroTbl", CardPoolRewardTbl.rewardId);
        this.gift.imgName = "hero_kind_" + HeroTbl.kind;

        this.bgImg.imgName = GConstant.heroQuality[HeroTbl.quality];

        this.iconImg.imgName = HeroTbl.img + "_head";
        this.nameLab.setText([HeroTbl.name]);

        this.bg_btn.onClick = () => {
            this.state.cb(this, this.state.id);
        };
    }

    initWishThreeItem() {
        this.initHomeWishItem();
        let title: string = "";
        let color: cc.Color = new cc.Color();
        // let CardPoolRewardTbl = GTable.getById("CardPoolRewardTbl", this.state.id);
        // if (!CardPoolRewardTbl) {
        // } else {
        switch (this.state.CardPoolWishType) {
            case 1:
                title = "橙将心愿:";
                color.fromHEX("#FFA030");
                break;
            case 2:
                title = "红将心愿:";
                color.fromHEX("#FF5E5E");
                break;
        }
        this.titleTipsLab.node.color = color;
        // }

        this.titleTipsLab.node.active = true;
        this.titleTipsLab.setText(["_rs" + title]);
    }

    initHomeWishItem() {
        this.gift.node.active = false;
        this.debris.node.active = false;
        this.rightBottomLab.node.active = false;
        this.nameLab.node.active = false;
        this.iconImg.node.active = false;

        if (this.state.isSetGrey) {
            this.bg_btn.setGrey(true);
        }
        if (this.state.id === -1) this.addNode.active = true;

        let CardPoolRewardTbl = GTable.getById("CardPoolRewardTbl", this.state.id);
        this.bg_btn.onClick = () => {
            if (!this.state.isSetGrey) {
                this.state.cb(this.state.index, CardPoolRewardTbl ? CardPoolRewardTbl.wishList : -1); //
            } else {
                GTip.showTip(["_rs" + "已招募的心愿神将，当日无法移除。"]);
            }
        };

        let qualityImgName: string = "";
        //资质背景1是橙色 2是红色
        switch (this.state.CardPoolWishType) {
            case 1:
                qualityImgName = GConstant.heroQuality[GConstant.heroQuality.length - 2];
                break;
            case 2:
                qualityImgName = GConstant.heroQuality[GConstant.heroQuality.length - 1];
                break;
        }
        this.bgImg.imgName = qualityImgName;

        if (!CardPoolRewardTbl) return;

        let HeroTbl = GTable.getById("HeroTbl", CardPoolRewardTbl.rewardId);
        (this.gift.node.active = true), (this.gift.imgName = "hero_kind_" + HeroTbl.kind);

        this.iconImg.imgName = HeroTbl.img + "_head";
        this.iconImg.node.active = true;
    }

    initItem(state: this["state"]) {
        this.state = state;
        this.addNode.active = false;
        this.titleTipsLab.node.active = false;
        this.setSwitchImgIsShow(false);
        this.initUi();
    }
}
