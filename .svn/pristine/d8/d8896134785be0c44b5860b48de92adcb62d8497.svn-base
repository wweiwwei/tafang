import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import Hero from "../../entity/Hero";
import Item from "../../entity/Item";
import ListItemHeroItemClone from "../common/ListItemHeroItemClone";
import WindowItemDescription from "../common/WindowItemDescription";
import { CardPoolMenuType } from "./WindowCardPool";
import WindowEquipmentDescription from "./WindowEquipmentDescription";
import WindowFullCardHeroDetail from "./WindowFullCardHeroDetail";

const { ccclass } = cc._decorator;

/**卡片的品质 */
export enum CardQualityType {
    green = 0, //绿色
    blue = 1, //蓝
    violet = 2, //紫色
    gold = 3, //金色
    red = 4, //红色
}

const pos = [
    [-205, 205],
    [-205, -52],
    [-205, -308],
    [0, -410],
    [205, -308],
    [205, -52],
    [205, 205],
    [0, 368],
    [0, 108],
    [0, -150],
];
@registerClass("ListItemCardPoolSingleCard")
@ccclass
export default class ListItemCardPoolSingleCard extends UIListItem {
    state: {
        id: number;
        level: number;
        itemType: "hero" | "equipment" | "item";
        count: CardPoolMenuType;
        index: number;
        maxCount: number;
        openEndFunc?: Function;
    };
    @autowired(cc.Animation) contentAnimation: cc.Animation = null;
    @autowired(cc.Node) backNode: cc.Node = null;
    @autowired(cc.Node) frontNode: cc.Node = null;
    @autowired(UILabel) newCardLab: UILabel = null;
    @autowired(cc.Node) updateLevelNode: cc.Node = null;
    @autowired(cc.ProgressBar) updateLevelPB: cc.ProgressBar = null;
    @autowired(UILabel) updateLevelLabel: UILabel = null;
    @autowired(UILabel) rightBottomLab: UILabel = null;
    /**卡片内容 */
    @autowired(UIImage) elementsImg: UIImage = null;
    @autowired(UILabel) nameLabel: UILabel = null;
    //左上角显示法师
    @autowired(UIImage) gift: UIImage = null;

    @autowired(UIList) debrisList: UIList<ListItemHeroItemClone> = null;

    private openCardAnimation: cc.Animation = null;
    private isOpenCard: boolean = false;

    /**品质bg */
    private qualityImg: UIImage = null;
    private quality: number = 0;
    async setState(state: this["state"]) {
        this.qualityImg = this.frontNode.getComponent(UIImage);
        this.state = state;
        this.initCard();
    }

    playRedCardLoopAnim() {
        this.openCardAnimation.play("OpenRedCardLoop_Ani");
    }

    openCard() {
        // console.log("openCard");
        // return;
        if (this.isOpenCard) {
            switch (this.state.itemType) {
                case "equipment":
                    this.elementsImg.node.scale = 2;
                    this.frontNode.zIndex = 999;
                    // this.elementsImg.node.addComponent(UIButton).onClick = () => {
                    // console.log("onClick");
                    let HeroEquipmentTbl: HeroEquipmentTbl = GTable.getById("HeroEquipmentTbl", this.state.id);
                    // GWindow.open(WindowItemDescription, {
                    //     item: null,
                    //     initItem: {
                    //         quality: HeroEquipmentTbl.quality,
                    //         imageName: HeroEquipmentTbl.img,
                    //         count: this.state.count,
                    //         itemName: HeroEquipmentTbl.name,
                    //         description: HeroEquipmentTbl.description,
                    //     },
                    // });
                    break;
            }
            // this.state.openEndFunc();
            return;
        } else {
            this.isOpenCard = true;
            console.log("this.quality =", this.quality);
            switch (this.quality) {
                case 0: //绿
                    this.openCardAnimation.play("OpenGreenCard_Ani");
                    this.openCardAnimation.on("stop", this.stop, this);
                    break;
                case 1: //蓝
                    this.openCardAnimation.play("OpenBlueCard_Ani");
                    this.openCardAnimation.on("stop", this.stop, this);
                    break;
                case 2: //紫
                    this.openCardAnimation.play("OpenPurpleCard_Ani");
                    this.openCardAnimation.on("stop", this.stop, this);
                    break;
                case 3:
                case 4: //橙
                    if (this.state.itemType == "hero") {
                        this.openCardAnimation.play("OpenHighCard01_Ani");
                        this.openCardAnimation.on(
                            "stop",
                            () => {
                                this.elementsImg.node.active = true;
                                let tbls = GModel.hero.getAllHero();
                                let hero: Hero = null;
                                tbls.forEach((tbl) => {
                                    if (tbl.id == this.state.id) hero = tbl;
                                });
                                let singleAnimEnd = false;
                                if (this.state.maxCount == 1) singleAnimEnd = true;
                                this.state.openEndFunc({
                                    hero: hero,
                                    index: this.state.index,
                                    singleAnimEnd: singleAnimEnd,
                                });
                            },
                            this
                        );
                    } else {
                        this.openCardAnimation.play("OpenRedCard_Ani");
                        this.openCardAnimation.on("stop", this.stop, this);
                    }
                    break;
                // case 4: //红
                //     this.openCardAnimation.play("OpenRedCard_Ani");
                //     break;
            }
        }
    }

    stop() {
        if (this.quality == 4 || this.quality == 3) {
            this.openCardAnimation.play("OpenRedCardLoop_Ani");
        }
        if (this.state.maxCount == 1) this.state.openEndFunc({ singleAnimEnd: true });
    }

    initCard() {
        this.openCardAnimation = this.contentAnimation; //this.contentBtn.node.getComponent(cc.Animation);
        this.gift.node.active = false;
        if (this.state.maxCount > 1) {
            let tempPos = pos[this.state.index];
            this.node.setPosition(new cc.Vec2(tempPos[0], tempPos[1]));
        } else {
            this.node.scale = 1.7;
        }

        this.backNode.active = true;
        this.newCardLab.node.active = false;
        this.updateLevelNode.active = false;

        let tbl = GModel.knapsack.getAllHeroFrag();
        let item = tbl.find((item) => {
            return item.id === this.state.id;
        });

        // this.contentBtn.onClick = () => {};
        this.backNode.on(cc.Node.EventType.TOUCH_END, () => {
            this.openCard();
        });
        let qualityImgName: string = "";
        let cardName: string = "";
        switch (this.state.itemType) {
            case "hero":
                this.elementsImg.node.scale = 1;
                this.gift.node.active = true;
                let HeroTbl: HeroTbl = GTable.getById("HeroTbl", this.state.id);
                this.gift.imgName = "hero_kind_" + HeroTbl.kind;
                qualityImgName = "card_bg_" + HeroTbl.quality;
                this.quality = HeroTbl.quality;
                cardName = HeroTbl.name;
                // console.log("HeroTbl =", HeroTbl);
                this.elementsImg.node.scale = 0.4;
                this.elementsImg.imgName = HeroTbl.img;
                // this.elementsImg.node.active = true;
                this.nameLabel.setText([cardName]);
                break;
            case "item":
                this.elementsImg.node.active = false;
                let ItemTbl: ItemTbl = GTable.getById("ItemTbl", this.state.id);
                qualityImgName = "card_bg_" + ItemTbl.quality;
                this.quality = ItemTbl.quality;
                this.nameLabel.setText(Item.getName(new Item(this.state.id, 1)));
                this.refList();

                let hero = GTable.getList("HeroTbl").find((t) => t.frag === this.state.id);
                if (GModel.hero.getAllHero().find((t) => t.uniqueId === hero.id)) {
                } else {
                    let require = GConfig.hero.composeRequire[GTable.getById("HeroTbl", hero.id).quality];
                    if (item.count >= require) {
                        this.newCardLab.node.active = true;
                        this.updateLevelLabel.node.active = true;
                        this.updateLevelLabel.setText([
                            "_rs" + GUtils.ui.getNumberString(item.count, 2) + "/" + require,
                        ]);
                        let perWidth = 120 / require;
                        let wid = perWidth * item.count;

                        this.updateLevelNode.active = true;
                        this.updateLevelPB.progress = wid;
                    } else {
                        this.newCardLab.node.active = false;
                        this.updateLevelLabel.node.active = false;
                        this.updateLevelPB.node.active = false;
                    }
                }
                break;
            case "equipment":
                let HeroEquipmentTbl: HeroEquipmentTbl = GTable.getById("HeroEquipmentTbl", this.state.id);
                qualityImgName = "card_bg_" + HeroEquipmentTbl.quality;
                this.quality = HeroEquipmentTbl.quality;
                cardName = HeroEquipmentTbl.name;
                this.elementsImg.imgName = HeroEquipmentTbl.img;
                this.nameLabel.setText([cardName]);

                this.elementsImg.node.scale = 2;
                this.rightBottomLab.node.active = true;
                this.rightBottomLab.setText(["_rsX" + this.state.count]);
                this.frontNode.getComponent(UIButton).onClick = () => {
                    console.log("onClick");
                    GWindow.open(WindowItemDescription, {
                        item: null,
                        initItem: {
                            quality: HeroEquipmentTbl.quality,
                            imageName: HeroEquipmentTbl.img,
                            count: this.state.count,
                            itemName: HeroEquipmentTbl.name,
                            description: HeroEquipmentTbl.description,
                        },
                    });
                };
                this.elementsImg.node.active = true;
                break;
        }
        this.qualityImg.imgName = qualityImgName;
        if (this.state.maxCount == 1) this.openCard();
    }

    /**显示碎片详细 */
    private showDetailed() {}

    refList() {
        let arr: {
            uniqueId: number;
            rightBottomText: string[];
            isShowKind: boolean;
            isShowDebris: boolean;
            cb: Function;
        }[] = [];

        let getHeroFragIdId = () => {
            let hero: HeroTbl = GTable.getList("HeroTbl").find((t) => t.frag === this.state.id);
            return hero.id;
        };

        arr.push({
            uniqueId: getHeroFragIdId(),
            // itemType: this.state.itemType,
            // type: "card",
            isShowKind: true,
            isShowDebris: true,
            rightBottomText: ["_rsx" + this.state.count.toString()],
            cb: () => {
                // this.showDetailed();
            },
        });

        this.debrisList.setState(arr);
    }

    onCallBack() {}
}
