import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UIWindow from "../../../framework/ui/UIWindow";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import { EquipmentWrapper } from "../../entity/Equipment";
import ListItemHeroItemClone from "../common/ListItemHeroItemClone";
import ListItemItem from "../common/ListItemItem";
import { CardPoolMenuType, CardPoolWishType } from "./WindowCardPool";

const { ccclass, property, menu } = cc._decorator;

@registerClass("WindowCardPoolWish") //选择心愿卡
@ccclass
export default class WindowCardPoolWish extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: {
        openIndex: number; //点击打开的下标
        CardPoolMenuType: CardPoolMenuType;
        CardPoolWishType: CardPoolWishType;
    };
    _returnValue: {
        wish1: number[];
        wish2: number[];
    };

    @autowired(UILabel) titleLabel: UILabel = null;
    /**心愿list */
    @autowired(UIList) wishList: UIList<ListItemHeroItemClone> = null;
    // @autowired(UIList) wishList2: UIList<ListItemItem> = null;
    @autowired(UIScrollList) scrollList: UIScrollList<ListItemHeroItemClone> = null;
    @autowired(UIScrollList) scrollList2: UIScrollList<ListItemItem> = null;
    @autowired(UIButton) closeBtn: UIButton = null;
    @autowired(cc.RichText) colorRichText: cc.RichText = null;

    private wish1: { id: number; hasGet: boolean }[] = [];
    private wish2: { id: number; hasGet: boolean }[] = [];
    private switchIndex: number = 0;

    private heroText =
        "<b><color=#40290D>获得</c><color=#FFA030>橙</color><color=#40290D>、</c><color=#FF5E5E>红</c><color=#40290D>将时，分别提升至</c><color=#FFA030> 30%</c><color=#40290D>、</c><color=#FF5E5E> 60%</c><color=#40290D>（总概率不变）\n每日最多选择</c><color=#1FA209>3</c><color=#40290D>名神将，各生效</c><color=#1FA209>1</c><color=#40290D>次</c></b>";

    private equipmentText =
        "<b><color=#40290D>获得</c><color=#FFA030>橙</color><color=#40290D>、</c><color=#FF5E5E>红</c><color=#40290D>装备时，分别提升至</c><color=#FFA030> 30%</c><color=#40290D>、</c><color=#FF5E5E> 60%</c><color=#40290D>（总概率不变）\n每日最多选择</c><color=#1FA209>3</c><color=#40290D>个装备，各生效</c><color=#1FA209>1</c><color=#40290D>次</c></b>";

    protected onInited(): void {
        this.closeBtn.onClick = async () => {
            await this.saveWish();
            this.close();
        };
        this.ininInfo();
        if (this._windowParam.CardPoolMenuType == 1) {
            this.scrollList.node.active = true;
            this.scrollList2.node.active = false;
            this.refreshList();
        } else if (this._windowParam.CardPoolMenuType == 2) {
            this.scrollList.node.active = false;
            this.scrollList2.node.active = true;
            this.refreshList2();
        }
        this.refreshLeftWishList();
    }

    async ininInfo() {
        if (this._windowParam.CardPoolMenuType == 1) {
            this.colorRichText.string = this.heroText;
        } else {
            this.colorRichText.string = this.equipmentText;
        }
        this.switchIndex = this._windowParam.openIndex;

        const info = GModel.cardPool.getCardPoolById(this._windowParam.CardPoolMenuType);
        this.wish1 = info.wishList1;
        this.wish2 = info.wishList2;
    }

    async saveWish() {
        let wish1: number[] = [];
        let wish2: number[] = [];
        wish1 = this.wish1.map((data) => {
            return data.id;
        });

        wish2 = this.wish2.map((data) => {
            return data.id;
        });
        let data = GModel.cardPool.setWishList(this._windowParam.CardPoolMenuType, wish1, wish2);
        this._returnValue = { wish1, wish2 };
    }

    public switchCallback(tag: ListItemHeroItemClone, id: number) {
        let tbl = GTable.getById("CardPoolRewardTbl", id);
        if (!tbl) {
            return;
        }

        //1 其中一个有就不能选
        //2下标点中有的，重选

        // let findIncludes = (wishArr: { id: number; hasGet: boolean }[], hasGet: boolean) => {
        //     let found = wishArr.find((data) => {
        //         return data.hasGet == hasGet && data.id == id;
        //     });
        //     return found ? true : false;
        // };

        // let judgmentSame = (wishArr: { id: number; hasGet: boolean }[]) => {
        //     if (findIncludes(wishArr, false)) {
        //         if (findIncludes(wishArr, true)) {
        //             GTip.showTip(["已招募的心愿神将，当日无法移除!"]);
        //             return true;
        //         } else {
        //             tag.setChosen(false, 2);
        //             // let info = { id: id, hasGet: false };
        //             let index = wishArr.findIndex((data) => {
        //                 return data.hasGet == false && data.id == id;
        //             });
        //             wishArr[index].id = -1;
        //             this.switchIndex = index;
        //             this.refreshLeftWishList();
        //             return true;
        //         }
        //     }
        //     return false;
        // };

        if (tbl.wishList == 1) {
            this.wishList1(tbl, id, tag);
        } else if (tbl.wishList == 2) {
            this.wishList2(tbl, id, tag);
        }

        if (this._windowParam.CardPoolMenuType == 1) {
            this.refreshList();
        } else if (this._windowParam.CardPoolMenuType == 2) {
            this.refreshList2();
        }
    }

    findIncludes(wishArr: { id: number; hasGet: boolean }[], hasGet: boolean, id: number) {
        let found = wishArr.find((data) => {
            return data.hasGet == hasGet && data.id == id;
        });
        return found ? true : false;
    }

    // hasGet(wishArr: { id: number; hasGet: boolean }[], hasGet: boolean) {
    //     let found = wishArr.find((data) => {
    //         return data.hasGet == hasGet;
    //     });
    //     return found ? true : false;
    // }

    judgmentSame(wishArr: { id: number; hasGet: boolean }[], id: number, tag) {
        if (this.findIncludes(wishArr, false, id)) {
            // if (this.findIncludes(wishArr, true, id)) {
            //     GTip.showTip(["_rs已招募的心愿神将，当日无法移除1!"]);
            //     return true;
            // } else
            {
                tag.setChosen(false, 2);
                let index = wishArr.findIndex((data) => {
                    return data.hasGet == false && data.id == id;
                });
                wishArr[index].id = -1;
                this.switchIndex = index;
                this.refreshLeftWishList();
                return true;
            }
        }
        if (this.findIncludes(wishArr, true, id)) {
            GTip.showTip(["_rs已招募的心愿神将，当日无法移除!"]);
            return true;
        }
        return false;
    }

    wishList1(tbl, id: number, tag) {
        if (this.judgmentSame(this.wish1, id, tag)) return;
        if (this.switchIndex >= this.wish1.length) {
            this.switchIndex = 0;
        }

        if (this.wish1[this.switchIndex] && !this.wish1[this.switchIndex].hasGet) {
            tag.setChosen(true, 3);
            this.wish1[this.switchIndex].id = tbl.id;
            this.refreshLeftWishList();
        } else if (this.findIncludes(this.wish1, true, id)) {
            this.switchIndex++;
            this.wishList1(tbl, id, tag);
        }
        this.switchIndex++;
    }

    wishList2(tbl, id: number, tag) {
        if (this.judgmentSame(this.wish2, id, tag)) return;
        if (this.switchIndex >= this.wish2.length) {
            this.switchIndex = 0;
        }
        if (this.wish2[this.switchIndex] && !this.wish2[this.switchIndex].hasGet) {
            this.wish2[this.switchIndex].id = tbl.id;
            tag.setChosen(true, 4);
            this.refreshLeftWishList();
        } else if (this.findIncludes(this.wish2, true, id)) {
            this.switchIndex++;
            this.wishList2(tbl, id, tag);
        }
        this.switchIndex++;
    }

    refreshList() {
        let data = null;
        data = this.getHeroList();
        if (data) this.scrollList.setState(data);
    }

    refreshList2() {
        let data = null;
        data = this.getEquipmentList();
        if (data) this.scrollList2.setState(data);
    }

    getEquipmentList() {
        let arr: { carEquipment?: null; item?: null; equipment: EquipmentWrapper; status?: 0 }[] = [];
        let tbls: CardPoolRewardTbl[];
        let tempTbls: CardPoolRewardTbl[];

        tbls = GTable.getList("CardPoolRewardTbl");
        tbls.filter((tbl) => {
            if (tbl.wishList > 0 && tbl.cardPool == this._windowParam.CardPoolMenuType)
                arr.push({
                    equipment: new EquipmentWrapper(tbl.rewardId, null, null, null, null),
                    status: 0,
                });
        });
        console.log("arr =", arr);
        return arr;
    }

    getHeroList() {
        let wishAllList = this.wish1.concat(this.wish2);
        let wishAllMap = new Map();
        let stateArr: {
            uniqueId: number;
            isShowNameText: boolean;
            cb: Function;
        }[];
        wishAllList.forEach((element) => {
            if (element.id > 0) wishAllMap.set(element.id, element.hasGet);
        });

        let tbls: CardPoolRewardTbl[];
        let tempTbls: CardPoolRewardTbl[];
        {
            tbls = GTable.getList("CardPoolRewardTbl");
            tempTbls = tbls.filter((tbl) => {
                if (tbl.wishList > 0 && tbl.cardPool == this._windowParam.CardPoolMenuType) return tbl;
            });
        }

        let tempArr: { CPRTbl: CardPoolRewardTbl; HeroTbl: HeroTbl; wish: number }[] = [];
        tempArr = tempTbls.map((CPRTbl) => {
            let HeroTbl = GTable.getById("HeroTbl", CPRTbl.rewardId);
            return { CPRTbl, HeroTbl: HeroTbl, wish: CPRTbl.wishList };
        });

        tempArr.sort((a, b) => {
            if (a.HeroTbl.quality != b.HeroTbl.quality) {
                return b.HeroTbl.quality - a.HeroTbl.quality; //品质优先
            } else if (a.wish != b.wish) {
                return a.wish - b.wish; //心愿类型第二
            }
        });

        let isHave = (id: number) => {
            let tempArr = this.wish1.filter((info) => {
                return info.id === id;
            });
            if (tempArr.length > 0) {
                return true;
            } else false;

            let tempArr2 = this.wish2.filter((info) => {
                return info.id === id;
            });
            if (tempArr2.length > 0) {
                return true;
            } else false;
        };

        stateArr = tempArr.map((info) => {
            return {
                uniqueId: info.HeroTbl.id,
                isChosen: isHave(info.CPRTbl.id),
                rewardUniqueId: info.CPRTbl.id,
                isShowNameText: true,
                cb: (data: { tag: ListItemHeroItemClone; rewardUniqueId: number }) => {
                    // console.log("rewardUniqueId =", data.rewardUniqueId);
                    this.switchCallback(data.tag, data.rewardUniqueId);
                },
            };
        });

        return stateArr;
    }

    refreshLeftWishList() {
        this.wishList.clear();

        let dataArr: {
            uniqueId: number;
            rewardUniqueId: number;
            index: number;
            isSetGrey: boolean;
            isShowAddNode: boolean;
            fixBgImgName: string;
            topTextInfo: { color: cc.Color; text: string[] };
        }[] = [];
        let index = 0;
        const cardPoolInfo = GModel.cardPool.getCardPoolById(this._windowParam.CardPoolMenuType);
        let getHeroId = (cardPoolRewardTblId: number) => {
            if (cardPoolRewardTblId == -1) return -1;
            let cardPoolRewardTbl = GTable.getById("CardPoolRewardTbl", cardPoolRewardTblId);
            return GTable.getById("HeroTbl", cardPoolRewardTbl.rewardId).id;
        };

        cardPoolInfo.wishList1.forEach((element) => {
            let isSetGrey: boolean = element.hasGet;
            dataArr.push({
                uniqueId: getHeroId(element.id),
                rewardUniqueId: element.id,
                index: index,
                isSetGrey: isSetGrey,
                isShowAddNode: true,
                fixBgImgName: "item_hero_orange",
                topTextInfo: { color: new cc.Color().fromHEX("#FFA030"), text: ["_rs橙将心愿:"] },
                // cb: (data: { tag: ListItemHeroItemClone; rewardUniqueId: number }) => {
                //     this.switchCallback(data.tag, data.rewardUniqueId);
                // },
            });
            index++;
        });
        index = 0;
        cardPoolInfo.wishList2.forEach((element) => {
            let isSetGrey: boolean = element.hasGet;
            dataArr.push({
                uniqueId: getHeroId(element.id),
                rewardUniqueId: element.id,
                index: index,
                isSetGrey: isSetGrey,
                isShowAddNode: true,
                fixBgImgName: "item_hero_red",
                topTextInfo: { color: new cc.Color().fromHEX("#FF5E5E"), text: ["_rs红将心愿:"] },
                // cb: (data: { tag: ListItemHeroItemClone; rewardUniqueId: number }) => {
                //     this.switchCallback(data.tag, data.rewardUniqueId);
                // },
            });
            index++;
        });
        if (dataArr.length > 0) {
            this.wishList.setState(dataArr);
        }
    }
}
