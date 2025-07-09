import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UIWindow from "../../../framework/ui/UIWindow";
import ListItemHandbookProperty from "../hero/ListItemHandbookProperty";
import ListItemGift from "../hero/ListItemGift";
import ListItemHandbook2 from "./ListItemHandbook2";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import WindowPropertyList from "../hero/WindowPropertyList";
import WindowHandbookReward from "./WindowHandbookReward";
import EventName from "../../event/EventName";

const { ccclass, property } = cc._decorator;
@registerClass("WindowHandbook2")
@ccclass
export default class WindowHandbook2 extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
        hideMainScene: true,
    };
    @autowired(UIScrollList) HeroDebrisContainer: UIScrollList<ListItemHandbook2> = null;
    @autowired(UIButton) equipments: UIButton = null;
    @autowired(UIButton) carComponents: UIButton = null;
    @autowired(UIButton) debris: UIButton = null;
    @autowired(UIButton) return: UIButton = null;
    @autowired(UIButton) allGift: UIButton = null;
    @autowired(UIButton) debrisActiveBtn: UIButton = null;
    @autowired(UIButton) obtainReward: UIButton = null;
    /**感叹号 */
    @autowired(UIButton) exclamation: UIButton = null;
    @autowired(UIImage) exclamation2: UIImage = null;
    @autowired(UIImage) exclamation3: UIImage = null;
    @autowired(UIImage) exclamation4: UIImage = null;
    @autowired(UIImage) pointExclamation: UIImage = null;
    @autowired(UIImage) giftsbg: UIImage = null;
    @autowired(UIImage) debrisActiveExclamation: UIImage = null;
    /**全类型背景 */
    @autowired(UIImage) chooseAll: UIImage = null;
    @autowired(UIList) giftItemContainer: UIList<ListItemGift> = null;
    @autowired(UIList) debrisPropertyList: UIList<ListItemHandbookProperty> = null;
    @autowired(cc.ProgressBar) progressBar: cc.ProgressBar = null;
    @autowired(UILabel) levelLabel: UILabel = null;
    @autowired(UILabel) handbookExp: UILabel = null;

    _windowParam: any;
    _returnValue: any;
    /**类型 */
    private kind = "";
    private page = 0;
    private collectionLevelInfo = null;
    @autowired(cc.Node)
    private collectionContainer: cc.Node = null;
    protected onInited(): void {
        this.origin = GModel.collection.getCollectionLevelInfo(this.page).level;
        this.changeWindow();
        this.debris.bg.imgName = "hero_list_chosen";
        this.debrisInit();
        this.return.onClick = () => {
            this.close();
        };
        this.debrisActiveBtn.onClick = () => {
            this.upgradeHandbook();
        };
        this.equipments.onClick = () => {
            this.page = 1;
            this.changeWindow();
            this.equipments.bg.imgName = "hero_list_chosen";
            this.carComponents.bg.imgName = "hero_list_unchosen";
            this.debris.bg.imgName = "hero_list_unchosen";
        };
        this.carComponents.onClick = () => {
            this.page = 2;
            this.changeWindow();
            this.equipments.bg.imgName = "hero_list_unchosen";
            this.carComponents.bg.imgName = "hero_list_chosen";
            this.debris.bg.imgName = "hero_list_unchosen";
        };
        this.debris.onClick = () => {
            this.page = 0;
            this.changeWindow();
            this.equipments.bg.imgName = "hero_list_unchosen";
            this.carComponents.bg.imgName = "hero_list_unchosen";
            this.debris.bg.imgName = "hero_list_chosen";
        };
    }
    private origin: number = 0;
    @message([EventName.stateKey.collectionData])
    /**上方图鉴容器初始化 */
    collectionInfoInit(): void {
        this.exclamation.onClick = () => {
            GWindow.open(WindowPropertyList, { status: 1, handbookPage: this.page });
        };
        this.obtainReward.onClick = () => {
            GWindow.open(WindowHandbookReward, { status: 1, handbookPage: this.page });
        };
        if (this.page === 0) this.obtainReward.bg.imgName = "hero_Point coin";
        else this.obtainReward.bg.imgName = "hero_Point coin2";
        this.collectionLevelInfo = GModel.collection.getCollectionLevelInfo(this.page);
        // console.log(this.origin);

        let arr = GTable.getList("HeroCollectionLevelRewardTbl")
            .filter((t) => t.level <= this.collectionLevelInfo.level)
            .map((t) => this.collectionLevelInfo.levelRewardHasGet.some((l) => l === t.level));
        this.pointExclamation.node.active = arr.some((a) => !a);
        this.updatProgressBar(
            this.collectionLevelInfo.exp / this.collectionLevelInfo.nextLevel,
            this.collectionLevelInfo.exp,
            this.collectionLevelInfo.nextLevel
        );
        this.levelLabel.setText(["_rs等级：" + this.collectionLevelInfo.level]);
        this.debrisPropertyList.setState(GModel.collection.getCollectionNextLevelBuffString(this.page));
        this.debrisActiveBtn.setGrey(this.collectionLevelInfo.exp < this.collectionLevelInfo.nextLevel);
    }
    updatProgressBar(num: number, leftNum: number, rightNum: number) {
        this.progressBar.progress = num;
        this.handbookExp.setText(["_rs" + leftNum + "/" + rightNum]);
    }
    /**手动升级英雄图鉴 */
    upgradeHandbook(): void {
        // if (this.collectionLevelInfo.exp >= this.collectionLevelInfo.nextLevel) {
        //     GTip.showTip(["ui/hero_update_success"]);
        // } else {
        //     GTip.showTip(["ui/handbookUpdateFail"]);
        // }
    }
    protected onRecycle(): void {}
    equipmentInit() {
        this.refreshItems();
    }
    carInit() {
        this.refreshItems();
    }
    debrisInit() {
        this.collectionContainer.active = true;
        this.page = 0;
        this.refreshItems();
        this.refreshGifts();
        this.allGift.onClick = () => {
            this.kind = "";
            this.refreshGifts();
            this.refreshItems();
            // this.refreshFormation();
        };
    }
    changeWindow() {
        this.HeroDebrisContainer.setState([]);
        this.collectionInfoInit();
        this.refreshItems();
        if (this.page === 0) {
            this.giftsbg.node.active = true;
        } else {
            this.giftsbg.node.active = false;
        }
        // this[name].node.active = true;
    }

    refreshItems() {
        let collection = null;
        let tbl = null;
        let t = null;
        if (this.page === 0) {
            collection = GModel.hero.getAllHero();
            tbl = GTable.getList("HeroTbl");
            t = JSON.parse(JSON.stringify(tbl));
            if (this.kind != "") {
                t = t.filter((i) => i.kind === this.kind);
            }
            /**警告显示 */
            this.exclamation4.node.active = t.some(
                (v) =>
                    GModel.hero.getHeroByUniqueId(v.id) &&
                    GModel.hero.getHeroByUniqueId(v.id).star > GModel.collection.getCollectionHasGet(v.id)
            );
        } else if (this.page === 1) {
            collection = GModel.hero.getAllEquipment();
            tbl = GTable.getList("HeroEquipmentTbl");
            t = JSON.parse(JSON.stringify(tbl));
            this.exclamation2.node.active = t.some((v) => {
                let own = GModel.hero.getEquipmentById(v.id);
                let rank: number = 0;

                if (own) {
                    own.storage.forEach((t) => {
                        if (t.count !== 0 && t.rank > rank) rank = t.rank;
                    });
                    return rank > GModel.collection.getCollectionHasGet(v.id);
                } else {
                    return false;
                }
            });
        } else if (this.page === 2) {
            collection = GModel.car.getAllCarEquipment();
            tbl = GTable.getList("CarEquipmentTbl");
            t = JSON.parse(JSON.stringify(tbl));
        }
        let state = this.itemsSort(t, collection, this.page);
        this.HeroDebrisContainer.setState(state);
    }
    itemsSort(t: any[], collection: any[], page: number) {
        /**品质高的排前面 */
        t.sort((a, b) => {
            if (a.quality === b.quality) {
                return b.quality - a.quality;
            } else {
                return b.quality - a.quality;
            }
        });
        /**已收集的英雄排前面 */
        let temp1 = [];
        const temp2 = [];
        t.forEach((v) => {
            if (collection.some((t) => t.id === v.id)) temp1.push(v);
            else temp2.push(v);
        });
        /**可领取积分的排前面 */
        const temp3 = [];
        const temp4 = [];
        let own = null;
        let hasGet: number = -1;
        temp1.forEach((t) => {
            hasGet = GModel.collection.getCollectionHasGet(t.id);
            if (page === 0) {
                own = GModel.hero.getHeroByUniqueId(t.id);
                if (own.star > hasGet) temp3.push(t);
                else temp4.push(t);
            } else if (page === 1) {
                own = GModel.hero.getEquipmentById(t.id);
                let rank: number = 0;
                own.storage.forEach((t) => {
                    if (t.count !== 0 && t.rank > rank) rank = t.rank;
                });
                if (rank > hasGet) temp3.push(t);
                else temp4.push(t);
            } else if (page === 2) {
                own = GModel.car.getCarEquipmentById(t.id);
                let rank: number = 0;
                own.storage.forEach((t) => {
                    if (t.count !== 0 && t.rank > rank) rank = t.rank;
                });
                if (rank > hasGet) temp3.push(t);
                else temp4.push(t);
            }
        });

        t = temp3.concat(temp4).concat(temp2);
        let state = t.map((v) => {
            return {
                id: v.id,
                page: page,
                item: v,
                refreshFunc: () => {
                    // console.log(this.origin, this.collectionLevelInfo.level);
                    this.refreshItems();
                    this.collectionInfoInit();
                    // let arr = GTable.getList("HeroCollectionLevelRewardTbl").filter(
                    //     (t) => t.level <= this.collectionLevelInfo.level
                    // );
                    if (
                        this.origin !== this.collectionLevelInfo.level
                        //  &&arr.some((a) => a.level === this.collectionLevelInfo.level)
                    )
                        this.node
                            .getChildByName("content")
                            .getChildByName("HandBook2_Effect")
                            .getComponent(cc.Animation)
                            .play();
                    this.origin = this.collectionLevelInfo.level;
                },
            };
        });
        return state;
    }
    refreshEquipment() {
        // /**警告显示 */
        // this.exclamation4.node.active = t.some(
        //     (v) =>
        //         GModel.hero.getHeroByUniqueId(v.id) &&
        //         GModel.hero.getHeroByUniqueId(v.id).star > GModel.collection.getCollectionHasGet(v.id)
        // );
    }
    /**刷新类型 */
    refreshGifts() {
        if (this.kind !== "") {
            this.chooseAll.node.active = false;
        } else {
            this.chooseAll.node.active = true;
        }
        const kinds = Array.from(new Set(GTable.getList("HeroTbl").map((t) => t.kind)));
        let state = kinds.map((imgName) => {
            const selected = this.kind === imgName;
            const cb = () => {
                this.kind = imgName;
                this.refreshGifts();
                this.refreshItems();
                // this.refreshFormation();
            };
            return { imgName, selected, cb };
        });
        this.giftItemContainer.setState(state);
    }
}
