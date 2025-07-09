import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIWindow from "../../../framework/ui/UIWindow";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import { CardInfo } from "../../entity/CardInfo";
import Item from "../../entity/Item";
import EventName from "../../event/EventName";
import WindowChestReward from "../common/WindowChestReward";
import ListItemCost from "./ListItemCost";
import WindowCardPoolGather from "./WindowCardPoolGather";
import WindowCardPoolMoveAnimation from "./WindowCardPoolAnimation";
import WindowCardPoolWish from "./WindowCardPoolWish";
import WindowDrawCard from "./WindowDrawCard";
import ListItemHeroItemClone from "../common/ListItemHeroItemClone";
import WindowCongratulation from "../common/WindowCongratulation";
import UIRichText from "../../../framework/ui/UIRichText";

const { ccclass, property } = cc._decorator;
export enum CardPoolMenuType {
    /**英雄 */
    hero = 1,
    /**装备 */
    equipment = 2,
    /**机甲部件 */
    vehicleParts = 3,
}
export enum CardPoolWishType {
    /**红 */
    red = 2,
    /**橙 */
    orange = 1,
}
@registerClass("WindowCardPool")
@ccclass
export default class WindowCardPool extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
        hideMainScene: true,
    };
    _windowParam: {
        cardPoolMenuType: CardPoolMenuType;
    };
    _returnValue: any;

    @autowired(UILabel) progressBarLabel: UILabel = null;
    @autowired(cc.ProgressBar) progressBar: cc.ProgressBar = null;
    @autowired(UIButton) progressBarBxBtn: UIButton = null;

    @autowired(UIButton) leftBtn: UIButton = null;
    @autowired(UIButton) rightBtn: UIButton = null;

    /**心愿list */
    @autowired(UIList) wishList: UIList<ListItemHeroItemClone> = null;
    @autowired(UIList) oneUiList: UIList<ListItemCost> = null;
    @autowired(UIList) tenUIList: UIList<ListItemCost> = null;

    /** 关闭按钮 */
    @autowired(UIButton) closeBtn: UIButton = null;
    /**概率按钮 */
    @autowired(UIButton) exclamation: UIButton = null;
    /**概率节点 */
    @autowired(UIImage) rules: UIImage = null;
    /**英雄概率列表 */
    @autowired(cc.Node) heroRare: cc.Node = null;
    /**装备概率列表 */
    @autowired(cc.Node) equipRare: cc.Node = null;

    @autowired(UIButton) aKeyBtn: UIButton = null;
    @autowired(UIButton) tanKeyBtn: UIButton = null;
    @autowired(UIButton) gatherBtn: UIButton = null;
    @autowired(cc.Toggle) menuToggle1: cc.Toggle = null;
    @autowired(cc.Toggle) menuToggle2: cc.Toggle = null;
    @autowired(cc.Toggle) menuToggle3: cc.Toggle = null;
    @autowired(UIButton) refreshBtn: UIButton = null;
    @autowired(UIRichText) dayAllMaximums: UIRichText = null;
    @autowired(cc.Node) consumables: cc.Node = null;
    /**背景 */
    @autowired(cc.Node) background: cc.Node = null;
    private cardPoolMenuType: CardPoolMenuType = CardPoolMenuType.hero;

    protected onInited(): void {
        // if (this._windowParam && this._windowParam.cardPoolMenuType) {
        // switch (this._windowParam.cardPoolMenuType) {
        //     case CardPoolMenuType.hero:
        //         this.onToggle1();
        //         break;
        //     case CardPoolMenuType.equipment:
        //         this.onToggle2();
        //         break;
        //     case CardPoolMenuType.vehicleParts:
        //         this.onToggle3();
        //         break;
        // }
        // }
        this.heroRare.active = true;
        this.equipRare.active = false;
        this.clickEven();
        this.initUi();
        this.refreshLeftWishList();
    }

    protected onRecycle(): void {}
    clickEven() {
        this.node.getComponent(UIButton).setTransition(false);
        this.node.getComponent(UIButton).onClick = () => {
            this.rules.node.active = false;
        };
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.leftBtn.onClick = () => {
            this.onLeftBtn();
        };
        this.rightBtn.onClick = () => {
            this.onRightBtn();
        };
        this.aKeyBtn.onClick = () => {
            this.onAKeyBtn();
        };
        this.tanKeyBtn.onClick = () => {
            this.onTanKeyBtn();
        };
        this.gatherBtn.onClick = () => {
            GWindow.open(WindowCardPoolGather);
        };
        this.menuToggle1.node.on("toggle", () => {
            this.rules.node.active = false;
            this.heroRare.active = true;
            this.equipRare.active = false;
            console.log(this.menuToggle2.checkMark);

            this.onToggle1();
        });
        this.menuToggle2.node.on("toggle", () => {
            this.rules.node.active = false;
            this.heroRare.active = false;
            this.equipRare.active = true;
            // console.log(this.menuToggle2.checkMark);
            // GTip.showTip(["_rs" + "开发中！！！"]);
            this.onToggle2();
        });
        this.menuToggle3.node.on("toggle", () => {
            GTip.showTip(["_rs" + "开发中！！！"]);
            // this.onToggle3();
        });

        this.refreshBtn.onClick = () => {
            this.refreshLeftWishList();
        };

        this.progressBarBxBtn.onClick = async () => {
            const cardPoolInfo = GModel.cardPool.getCardPoolById(this.cardPoolMenuType);
            if (cardPoolInfo.point >= cardPoolInfo.pointRequire()) {
                const reward = await GModel.cardPool.obtainPointReward(this.cardPoolMenuType);
                let rewardId = cardPoolInfo.getPointMissionReward();
                // console.log("Item.getName(rewardId) =", Item.getName(rewardId));
                // GTip.showReward(Item.getImg(rewardId), [Item.getName(rewardId)]);

                GWindow.open(WindowCongratulation, { items: reward });
            } else {
                GWindow.open(WindowChestReward, {
                    reward: [cardPoolInfo.getPointMissionReward()],
                });
            }
        };
        this.exclamation.onClick = () => {
            this.rules.node.active = !this.rules.node.active;
        };
    }

    @message([EventName.stateKey.storage])
    initConsumables() {
        let data: { item: Item; storage: number }[] = [];
        const cost1 = GModel.cardPool.getCardPoolById(CardPoolMenuType.hero).singlePrice();
        const cost2 = GModel.cardPool.getCardPoolById(CardPoolMenuType.equipment).singlePrice();
        const cost3 = GModel.cardPool.getCardPoolById(CardPoolMenuType.vehicleParts).singlePrice();
        data.push({ item: cost1, storage: Item.getStorage(cost1) });
        if (cost1.id != cost2.id) {
            data.push({ item: cost2, storage: Item.getStorage(cost2) });
            if (cost2.id != cost3.id) {
                data.push({ item: cost3, storage: Item.getStorage(cost3) });
            }
        }

        let initNode = (node: cc.Node, imgName: string, haveNum: number, isShowAdd: boolean = false) => {
            node.getChildByName("icon").getComponent(UIImage).imgName = imgName;
            node.getChildByName("addNode").active = isShowAdd;
            node.getChildByName("numLabel")
                .getComponent(UILabel)
                .setText(["_rs" + GUtils.ui.getNumberString(haveNum, 2)]);
        };

        this.consumables.children.forEach((node, index) => {
            node.active = false;
            if (data[index]) {
                initNode(node, Item.getImg(data[index].item), data[index].storage);
                node.active = true;
            }
        });
    }

    initUi() {
        this.showTimes();
        this.initConsumables();
        this.refreshCost();
    }
    showTimes() {
        const cardPoolInfo = GModel.cardPool.getCardPoolById(this.cardPoolMenuType);
        this.dayAllMaximums.setText(
            [GLang.code.ui.dayAllMaximums],
            [
                "_rs<color=#34ff72>" +
                    cardPoolInfo.today +
                    "/" +
                    GTable.getById("CardPoolTbl", this.cardPoolMenuType).dailyLimit +
                    "</color>",
            ]
        );
    }
    onToggle1() {
        if (this.background.position.x < -cc.winSize.width / 2) {
            cc.tween(this.background).to(0.2, { x: 0 }).start();
        }
        if (this.cardPoolMenuType == CardPoolMenuType.hero) return;
        // this.wishList.node.parent.parent.parent.active = true;
        this.progressBar.node.parent.active = true;
        this.cardPoolMenuType = CardPoolMenuType.hero;
        this.refreshLeftWishList();
        this.refreshCost();
        this.showTimes();
    }
    onToggle2() {
        if (
            !GModel.player.checkSystemUnlock(GConstant.systemId.equipment, true) ||
            this.cardPoolMenuType == CardPoolMenuType.equipment
        )
            return;
        if (this.background.position.x > -cc.winSize.width / 2) {
            cc.tween(this.background).to(0.2, { x: -cc.winSize.width }).start();
        }
        this.wishList.node.parent.parent.parent.active = false;
        this.progressBar.node.parent.active = false;
        this.cardPoolMenuType = CardPoolMenuType.equipment;
        this.refreshCost();
        this.showTimes();
        // this.refreshLeftWishList();
    }
    onToggle3() {
        if (this.cardPoolMenuType == CardPoolMenuType.vehicleParts) return;
        this.wishList.node.parent.parent.parent.active = false;
        this.progressBar.node.parent.active = false;
        this.cardPoolMenuType = CardPoolMenuType.vehicleParts;
        this.refreshCost();
        this.showTimes();
        // this.refreshLeftWishList();
    }

    onAKeyBtn() {
        this.drawFrequency(1);
    }

    onTanKeyBtn() {
        this.drawFrequency(10);
    }

    private againDraw(drawNum: number) {
        GWindow.close(WindowDrawCard);
        GWindow.close(WindowCardPoolMoveAnimation);
        this.drawFrequency(drawNum);
    }

    async drawFrequency(frequency: number) {
        if (frequency == 1) {
            const cardArr: CardInfo[] = await GModel.cardPool.drawCard(this.cardPoolMenuType, frequency);
            await GWindow.open(WindowDrawCard, {
                cardArr: cardArr,
                cardPoolMenuType: this.cardPoolMenuType,
                againFunc: (num) => {
                    this.againDraw(num);
                },
            });
            this.showTimes();
            return;
        }
        const cardArr: CardInfo[] = await GModel.cardPool.drawCard(this.cardPoolMenuType, frequency);
        GWindow.open(WindowDrawCard, {
            cardArr: cardArr,
            cardPoolMenuType: this.cardPoolMenuType,
            againFunc: (num) => {
                this.againDraw(num);
            },
        });
        GWindow.open(WindowCardPoolMoveAnimation, {
            cardArr: cardArr,
        });
    }

    updatProgressBar(num: number, leftNum: number, rightNum: number) {
        this.progressBar.progress = num;
        this.progressBarLabel.setText(["_rs" + leftNum + "/" + rightNum]);
    }

    @message([EventName.stateKey.cardPool])
    refreshLeftWishList() {
        this.wishList.clear();

        let dataArr: {
            uniqueId: number;
            rewardUniqueId: number;
            index: number;
            isSetGrey: boolean;
            isShowAddNode: boolean;
            fixBgImgName: string;
            cb: Function;
        }[] = [];
        let index = 0;
        const cardPoolInfo = GModel.cardPool.getCardPoolById(this.cardPoolMenuType);
        this.updatProgressBar(
            cardPoolInfo.point / cardPoolInfo.pointRequire(),
            cardPoolInfo.point,
            cardPoolInfo.pointRequire()
        );

        let getHeroUniqueId = (cardPoolRewardTblId: number) => {
            let cardPoolRewardTbl = GTable.getById("CardPoolRewardTbl", cardPoolRewardTblId);
            if (!cardPoolRewardTbl) return -1;
            return GTable.getById("HeroTbl", cardPoolRewardTbl.rewardId).id;
        };

        cardPoolInfo.wishList1.forEach((element) => {
            let isSetGrey: boolean = element.hasGet;
            dataArr.push({
                uniqueId: getHeroUniqueId(element.id),
                rewardUniqueId: element.id,
                index: index,
                isSetGrey: isSetGrey,
                isShowAddNode: true,
                fixBgImgName: "item_hero_orange",
                cb: (data: { index: number; rewardUniqueId: number }) => {
                    this.onClickWishItem(index, data.rewardUniqueId);
                },
            });
            index++;
        });
        index = 0;
        cardPoolInfo.wishList2.forEach((element) => {
            let isSetGrey: boolean = element.hasGet;
            dataArr.push({
                uniqueId: getHeroUniqueId(element.id),
                rewardUniqueId: element.id,
                index: index,
                isSetGrey: isSetGrey,
                isShowAddNode: true,
                fixBgImgName: "item_hero_red",
                cb: (data: { index: number; rewardUniqueId: number }) => {
                    this.onClickWishItem(data.index, data.rewardUniqueId);
                },
            });
            index++;
        });
        if (dataArr.length > 0) {
            this.wishList.setState(dataArr);
        }
    }

    onLeftBtn() {}
    onRightBtn() {}

    onClickWishItem(index: number, rewardUniqueId: number) {
        let cardPoolWishType: CardPoolWishType = null;
        if (rewardUniqueId != -1) cardPoolWishType = GTable.getById("CardPoolRewardTbl", rewardUniqueId).wishList;
        GWindow.open(WindowCardPoolWish, {
            openIndex: index,
            CardPoolMenuType: this.cardPoolMenuType,
            CardPoolWishType: cardPoolWishType,
        });
    }

    @message([EventName.stateKey.storage])
    refreshCost() {
        const cost1 = GModel.cardPool.getCardPoolById(this.cardPoolMenuType).singlePrice();
        this.oneUiList.setState([{ item: cost1, require: cost1.count, storage: Item.getStorage(cost1) }]);
        const cost2 = GModel.cardPool.getCardPoolById(this.cardPoolMenuType).tenPrice();
        this.tenUIList.setState([{ item: cost2, require: cost2.count, storage: Item.getStorage(cost2) }]);
    }
}
