import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIWindow from "../../../framework/ui/UIWindow";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import { CardInfo } from "../../entity/CardInfo";
import Item from "../../entity/Item";
import ListItemCardPoolSingleCard from "./ListItemCardPoolSingleCard";
import { CardPoolMenuType } from "./WindowCardPool";
import WindowCardPoolMoveAnimation from "./WindowCardPoolAnimation";
import Hero from "../../entity/Hero";
import WindowFullCardHeroDetail from "./WindowFullCardHeroDetail";

const { ccclass } = cc._decorator;

@registerClass("WindowDrawCard")
@ccclass
export default class WindowDrawCard extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.no,
    };
    @autowired(cc.Node) closeNode: cc.Node = null;
    @autowired(UIButton) closeBtn: UIButton = null;
    @autowired(UILabel) closeBtnLabel: UILabel = null;
    @autowired(UIButton) opneCardBtn: UIButton = null;
    @autowired(cc.Node) requireNode: cc.Node = null;
    @autowired(UIImage) costItemImg: UIImage = null;
    @autowired(UILabel) requireLabel: UILabel = null;

    @autowired(UIList) cardList: UIList<ListItemCardPoolSingleCard> = null;
    /**0手动翻卡 1快速翻卡 2一键全开 */
    private openCardType = 0;
    private heroInfoArr: { hero: Hero; index: number }[] = [];
    private openHeroInde: number = 0;

    _windowParam: {
        cardArr: CardInfo[];
        cardPoolMenuType: CardPoolMenuType;
        againFunc?: Function;
    };
    _returnValue: any;

    private autoOpenIndex: number = 0; //自动翻卡
    private openIndex: number = 0; //手动翻卡
    private openCardIntervalTime: number = 0;

    private openCardIndexArr: boolean[] = [];

    protected onInited(): void {
        this.openHeroInde = 0;
        this.requireNode.active = false;
        this.openCardType = 0;
        this.showList();
        this.closeBtn.onClick = () => {
            this.close();
            GWindow.close(WindowCardPoolMoveAnimation);
        };

        if (this._windowParam.cardArr.length > 1) this.opneCardBtn.node.active = true;
        else this.opneCardBtn.node.active = false;

        this.closeBtnLabel.setText(["_rs" + "快速翻卡"]);

        this.opneCardBtn.onClick = async () => {
            if (this.openCardType == 0) {
                this.openCardType = 1;
                if (this._windowParam.cardArr.length > 1) this.closeBtnLabel.setText(["_rs" + "一键全开"]);

                this.fastOpen();
            } else if (this.openCardType == 1) {
                this.openCardType = 2;
                this.openAllCard();
                this.opneCardBtn.node.active = false;
            } else if (this.openCardType == 3) {
                //再次抽卡
                if (this._windowParam.againFunc) {
                    this._windowParam.againFunc(this._windowParam.cardArr.length > 1 ? 10 : 1);
                }
                return;
            }
        };

        this._windowParam.cardArr.forEach(() => {
            this.openCardIndexArr.push(false);
        });
    }

    fastOpen() {
        let arr = [];
        arr.push(cc.callFunc(() => {}));
        let itemArr = this.cardList.getItems();
        for (let i = this.autoOpenIndex; i < itemArr.length; i++) {
            if (this.openCardIndexArr[i]) {
            } else {
                arr.push(
                    cc.callFunc(() => {
                        itemArr[i].openCard();
                    })
                );
                arr.push(cc.delayTime(0.25));
            }
        }

        arr.push(
            cc.callFunc(() => {
                this.allCardOpenEnd();
            })
        );

        this.cardList.node.runAction(cc.sequence(arr, cc.easeOut(0.1)));
    }

    allCardOpenEnd() {
        this.closeNode.active = true;
        this.openCardType = 3;
        this.closeBtnLabel.setText(["_rs" + "再次抽卡"]);
        this.opneCardBtn.node.active = true;
        this.setRequire(true);
    }

    setRequire(isShowRequire: boolean) {
        this.requireNode.active = isShowRequire;
        if (!isShowRequire) return;

        let state: {
            img: string;
            require: number;
            storage: number;
        } = { img: "", require: 0, storage: 0 };

        let tempItem: Item = null;
        let cardPoolInfo = GModel.cardPool.getCardPoolById(this._windowParam.cardPoolMenuType);
        if (this._windowParam.cardArr.length > 1) {
            tempItem = cardPoolInfo.tenPrice();
        } else {
            tempItem = cardPoolInfo.singlePrice();
        }
        state.img = Item.getImg(tempItem);
        state.require = tempItem.count;
        state.storage = Item.getStorage(tempItem);

        this.costItemImg.imgName = state.img;
        this.requireLabel.setText(["_rs" + GUtils.ui.getNumberString(state.require, 2)]);
    }

    openAllCard() {
        let itemArr = this.cardList.getItems();
        for (let i = this.autoOpenIndex; i < itemArr.length; i++) {
            itemArr[i].openCard();
            this.autoOpenIndex++;
        }
    }

    openHero() {
        if (!this.heroInfoArr && this.heroInfoArr.length <= 0) {
            return;
        }
        console.log("openHero func");
        let info = this.heroInfoArr[this.openHeroInde];
        console.log("openHeroInde =", this.openHeroInde);

        if (this.heroInfoArr[this.openHeroInde]) {
            console.log("this.heroInfoArr[this.openHeroInde]");
            this.openHeroInde++;
            GWindow.open(WindowFullCardHeroDetail, {
                hero: info.hero,
                endFunc: () => {
                    console.log("再次调用openHero func");
                    this.scheduleOnce(() => {
                        this.openHero();
                    }, 0.5);
                },
            });
        }
    }

    showList() {
        let arr: {
            id: number;
            level: number;
            itemType: "hero" | "equipment" | "item";
            index: number;
            maxCount: number;
            count: CardPoolMenuType;
            openEndFunc: Function;
        }[] = [];
        this._windowParam.cardArr.forEach((info: CardInfo, index) => {
            let id: number = 0;
            let count: number = 0;
            let itemType: any = null;
            if (info.fragId == -1) {
                id = info.id;
                count = info.count;
                itemType = info.itemType;
            } else {
                id = info.fragId;
                count = info.fragCount;
                itemType = "item";
            }
            arr.push({
                id: id,
                level: info.level,
                itemType: itemType,
                index: index,
                maxCount: this._windowParam.cardArr.length,
                count: count,
                openEndFunc: (info) => {
                    console.log("info =", info);
                    if (info.singleAnimEnd) {
                        this.allCardOpenEnd();
                    } else {
                        if (info.index) this.openCardIndexArr[index] = true;
                        if (info.hero) {
                            this.cardList.getItems()[info.index].playRedCardLoopAnim();
                            this.heroInfoArr.push(info);
                            if (this.heroInfoArr.length == 1) this.openHero();
                        }
                    }
                    // this.singleCardOpenEnd(isOpenCard);
                },
            });
        });

        this.cardList.setState(arr);
    }
}
