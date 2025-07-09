import { autowired, message, registerClass } from "../../../framework/Decorator";
import ResourceLoader from "../../../framework/ResourceLoader";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UISpine from "../../../framework/ui/UISpine";
import UIWindow from "../../../framework/ui/UIWindow";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import EventName from "../../event/EventName";
import ListItemHeroDetail from "../mainscene/ListItemHeroDetail";
import ListItemTreeProperty2 from "../mainscene/ListItemTreeProperty2";
import UIScrollList from "../../../framework/ui/UIScrollList";
import WindowSkinDetails from "../mainscene/WindowSkinDetails";
import WindowEquipmentDetails from "../mainscene/WindowEquipmentDetails";
import WindowPropertyList from "./WindowPropertyList";
import ListItemCurrencyTop from "../mainscene/ListItemCurrencyTop";
import WindowStrangeKnapsack from "../mainsceneNew/WindowStrangeKnapsack";
import WindowStrangeProperty from "../mainsceneNew/WindowStrangeProperty";
import Item from "../../entity/Item";
import WindowStrangeDetails from "../mainscene/WindowStrangeDetails";
import ListItemPlayer from "../battle/core/ListItemPlayer";
import WindowStrangeDetails2 from "../mainscene/WindowStrangeDetails2";

const { ccclass, property } = cc._decorator;

@registerClass("WindowHeroDetail", {
    preloadPrefab: ["ListItemHeroDetailDrag"],
})
@ccclass
export default class WindowHeroDetail extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.no,
    };
    _windowParam: {};
    _returnValue: {};
    /** */

    /**英雄名称 */
    @autowired(UILabel) heroName: UILabel = null;
    /**阶段 */
    @autowired(UILabel) stage: UILabel = null;
    @autowired(UIImage) shadow: UIImage = null;
    @autowired(UISpine) mount: UISpine = null;

    /**皮肤属性加成节点 */
    @autowired(cc.Node) skinProperty: cc.Node = null;
    /**皮肤属性加成 */
    @autowired(UIList) skinPropertyList: UIList<ListItemTreeProperty2> = null;
    /**装备按钮 */
    @autowired(UIButton) equipmentBtn: UIButton = null;
    /**皮肤按钮 */
    @autowired(UIButton) skinBtn: UIButton = null;
    /**坐骑按钮 */
    @autowired(UIButton) mountBtn: UIButton = null;

    /**上6件装备 */
    @autowired(UIList) equipmentList: UIList<ListItemHeroDetail> = null;
    /** */
    @autowired(UIScrollList) downList: UIScrollList<ListItemHeroDetail> = null;
    @autowired(UIList) player: UIList<ListItemPlayer> = null;
    @autowired(UIButton) showProertyView: UIButton = null;
    @autowired(UIList) currencyList: UIList<ListItemCurrencyTop> = null;

    @autowired(cc.Node) power: cc.Node = null;
    @autowired(cc.Node) name1: cc.Node = null;
    /**神器 */
    @autowired(UIButton) strangeStar: UIButton = null;
    @autowired(cc.Node) strange: cc.Node = null;
    @autowired(UIButton) strangeBtn: UIButton = null;
    @autowired(UIList) strangeList: UIList<ListItemHeroDetail> = null;

    @autowired(UILabel) battlePointLabel: UILabel = null;

    private touchMenu: number = 0;
    private touchItemId: number = 0;

    protected onInited(): void {
        this.node.zIndex = -1;
        this.even();
        this.refMenuBtn();
        this.refMenuTips();
        this.refTopEquipmentList();
        this.refTopStrangeList();
        this.refreshPlayer();
        this.refreshBattlePoint();
        this.currencyList.setState([{}]);
    }

    @message([EventName.stateKey.skinCurrent, EventName.stateKey.mountCurrent, EventName.stateKey.fossilData])
    refreshPlayer() {
        this.player.setState([{}]);
    }

    @message([EventName.stateKey.spriteFormation, EventName.stateKey.sprites])
    refTopEquipmentList() {
        let cb = (id) => {
            if (id == -1) {
                GTip.showTip(["_rs未装备"]);
                return;
            }
            GWindow.open(WindowEquipmentDetails, { id: id });
        };
        let equipStr = ["武器", "戒指", "上衣", "配饰", "下衣", "鞋子"];
        let state = GModel.sprite.getFormation().map((id, index) => {
            if (id == -1) {
                return {
                    id: -1,
                    quailtyImg: GConstant.itemQualityBg[0],
                    icon: "",
                    cb: cb,
                    name: "_rs" + equipStr[index],
                    isHave: true,
                };
            }
            let item = GTable.getById("ItemTbl", id);
            return {
                id: item.id,
                quailtyImg: GConstant.itemQualityBg[item.quality],
                icon: item.img,
                cb: cb,
                name: "",
                lv: "_rsLv." + GModel.sprite.getSpriteById(id).rank,
                isHave: true,
                up: GModel.sprite.getSpriteById(id).canUpRank(),
            };
        });

        this.equipmentList.setState(state);
    }

    @message([EventName.refreshBattlePoint])
    refreshBattlePoint() {
        const bp = GModel.battle.getBattlePoint();
        this.battlePointLabel.setText(["_rs" + GUtils.ui.getFixed(bp, 1)]);
    }

    @message([EventName.stateKey.fossilData])
    refTopStrangeList() {
        let formation = GModel.fossil.getFormation();
        let fossilStar = GModel.fossil.getStar();
        // let tbl = GTable.getList("FossilComboTbl").find((t) => t.itemId === fossilStar);
        let addBg = ["fossil_add_blue", "fossil_add_purple", "fossil_add_red", "fossil_add_gold"];
        let tbl = GTable.getList("FossilComboTbl").find((t) => t.itemId === fossilStar);
        let state: ListItemHeroDetail["state"][] = formation.map((id, i) => {
            let cb = () => {
                if (id === -1) {
                    GWindow.open(WindowStrangeKnapsack, { status: 1, index: i });
                } else {
                    GWindow.open(WindowStrangeProperty, { status: 1, id, index: i });
                }
            };

            if (id == -1) {
                return {
                    id: -1,
                    quailtyImg: GConstant.itemQualityBg[0],
                    icon: "",
                    cb: cb,
                    name: "ui/strangeText" + i,
                    isHave: true,
                    addImg: tbl ? addBg[tbl.combo[i]] : "",
                };
            }
            let item = new Item(id, 1);

            return {
                item: item,
                id: item.id,
                quailtyImg: GConstant.itemQualityBg[Item.getQuality(item)],
                icon: Item.getImg(item),
                lv: Item.getCountString(item)[0],
                cb: cb,
                switch: this.touchItemId == item.id,
                isHave: true,
                // addImg: tbl ? addBg[tbl.combo[i]] : "",
            };
            // return { item: new Item(id, 0), cb: cb, bottom: true, color: tbl ? tbl.combo[i] : null };
        });

        // console.log("state =", state);
        this.strangeList.setState(state);

        this.strangeStar.bg.imgName = fossilStar === -1 ? "hero_artifact_empty" : tbl.largeImg;

        this.strangeStar.onClick = () => {
            if (fossilStar === -1) {
                GWindow.open(WindowStrangeKnapsack, { status: 0 });
            } else {
                // this.refreshText(0, fossilStar);
                GWindow.open(WindowStrangeDetails2, { id: fossilStar });
                // GWindow.open(WindowStrangeProperty, { status: 0, id: fossilStar });
            }
        };
    }

    even() {
        this.showProertyView.onClick = () => {
            GWindow.open(WindowPropertyList);
        };

        this.equipmentBtn.onClick = () => {
            this.touchItemId = 0;
            this.touchMenu = 0;
            this.refMenuBtn();
        };
        this.skinBtn.onClick = () => {
            this.touchMenu = 1;
            this.touchItemId = 0;
            this.refMenuBtn();
        };
        this.mountBtn.onClick = () => {
            this.touchMenu = 2;
            this.touchItemId = 0;
            this.refMenuBtn();
        };

        this.strangeBtn.onClick = () => {
            this.touchMenu = 3;
            this.touchItemId = 0;
            this.refMenuBtn();
            this.refTopStrangeList();
        };
    }

    refMenuBtn() {
        this.downList.getComponent(cc.ScrollView).scrollToTop();
        if (this.touchMenu == 0) {
            this.refEquipmentList();
        } else if (this.touchMenu == 1) {
            this.refSkinList();
            // if(GModel.mountAndSkin.currentSkin())
            let tbl = GTable.getById("PlayerSkinTbl", GModel.mountAndSkin.currentSkin());
            let state = tbl?.formateProperty.map((d) => {
                return {
                    property: d[0],
                    value: "+" + GIndex.battle.propertyShowMethod(d[0])(Number(d[1])),
                    interval: 40,
                };
            });

            if (state) this.skinPropertyList.setState(state);
        } else if (this.touchMenu == 2) {
            this.refMountList();
        } else if (this.touchMenu == 3) {
            this.refStrangeList();
        }
        this.skinProperty.active = this.touchMenu == 1;

        this.equipmentBtn.node.getChildByName("high").active = this.touchMenu == 0;
        this.skinBtn.node.getChildByName("high").active = this.touchMenu == 1;
        this.mountBtn.node.getChildByName("high").active = this.touchMenu == 2;
        this.strangeBtn.node.getChildByName("high").active = this.touchMenu == 3;
        this.equipmentBtn.text.node.color = this.touchMenu == 0 ? GConstant.menuColor[0] : GConstant.menuColor[1];
        this.skinBtn.text.node.color = this.touchMenu == 1 ? GConstant.menuColor[0] : GConstant.menuColor[1];
        this.mountBtn.text.node.color = this.touchMenu == 2 ? GConstant.menuColor[0] : GConstant.menuColor[1];
        this.strangeBtn.text.node.color = this.touchMenu == 3 ? GConstant.menuColor[0] : GConstant.menuColor[1];

        if (this.touchMenu == 3) {
            this.name1.active = false;
            this.shadow.node.active = false;
            this.mount.node.active = false;
            this.equipmentList.node.active = false;
            this.power.active = false;
        } else {
            this.name1.active = true;
            this.shadow.node.active = true;
            this.mount.node.active = true;
            this.equipmentList.node.active = true;
            this.power.active = true;
        }
        this.strange.active = this.touchMenu == 3;
        this.strangeStar.node.active = this.touchMenu == 3;
    }

    refMenuTips() {
        this.equipmentBtn.node.getChildByName("tips").active = false;
        this.skinBtn.node.getChildByName("tips").active = false;
        this.mountBtn.node.getChildByName("tips").active = false;
        this.strangeBtn.node.getChildByName("tips").active = false;
    }

    @message([EventName.stateKey.spriteFormation, EventName.stateKey.sprites])
    refEquipmentList() {
        let cb = async (id) => {
            if (this.touchItemId == id) this.touchItemId = 0;
            this.touchItemId = id;
            GWindow.open(WindowEquipmentDetails, { id: this.touchItemId });

            this.refEquipmentList();
        };

        let state = GModel.sprite
            .getSprites()
            .filter((d) => {
                return !GModel.sprite.getFormation().includes(d.id) && GModel.sprite.getSpriteById(d.id).rank > 0;
            })
            .map((d) => {
                let item = GTable.getById("ItemTbl", d.id);
                return {
                    id: d.id,
                    quailtyImg: GConstant.itemQualityBg[item.quality],
                    icon: item.img,
                    cb: cb,
                    lv: "_rsLv." + GModel.sprite.getSpriteById(d.id).rank,
                    switch: this.touchItemId == d.id,
                    isHave: true,
                };
            });

        this.downList.setState(state);
    }

    @message([EventName.stateKey.skinStorage, EventName.stateKey.skinCurrent])
    refSkinList() {
        let cb = (id) => {
            if (this.touchItemId == id) this.touchItemId = 0;

            this.touchItemId = id;
            GWindow.open(WindowSkinDetails, { skinId: this.touchItemId });
            this.refSkinList();
        };
        let state = GModel.mountAndSkin.getAllSkin().map((d) => {
            let item = GTable.getById("ItemTbl", d.id);
            return {
                id: d.id,
                quailtyImg: GConstant.itemQualityBg[item.quality],
                icon: item.img,
                cb: cb,
                // name: "时装",
                switch: this.touchItemId == d.id,
                isHave: d.unlock,
                useIng: GModel.mountAndSkin.currentSkin() == d.id,
            };
        });
        this.downList.setState(state);
    }
    @message([EventName.stateKey.mountStorage, EventName.stateKey.mountCurrent])
    refMountList() {
        let cb = (id) => {
            if (this.touchItemId == id) this.touchItemId = 0;

            this.touchItemId = id;
            GWindow.open(WindowSkinDetails, { mountId: this.touchItemId });
            this.refMountList();
        };
        let state = GModel.mountAndSkin.getAllMount().map((d) => {
            let item = GTable.getById("ItemTbl", d.id);
            return {
                id: d.id,
                quailtyImg: GConstant.itemQualityBg[item.quality],
                icon: item.img,
                cb: cb,
                switch: this.touchItemId == d.id,
                isHave: d.unlock,
                useIng: GModel.mountAndSkin.currentMount() == d.id,
            };
        });
        // console.log("mount state =", state);
        this.downList.setState(state);
    }

    @message([EventName.stateKey.fossilData])
    refStrangeList() {
        let cb = (id: number) => {
            if (this.touchItemId == id) this.touchItemId = 0;
            this.touchItemId = id;
            const tbl = GTable.getById("ItemTbl", id);
            if (tbl.kind === 1001) {
                // 石头
                GWindow.open(WindowStrangeDetails, { id: id });
            } else if (tbl.kind === 1002) {
                // 神器
                GWindow.open(WindowStrangeDetails2, { id: id });
            }

            // GWindow.open(WindowSkinDetails, { mountId: this.touchItemId });
            // this.refStrangeList();
        };

        let state: ListItemHeroDetail["state"][] = GModel.knapsack
            .getAllStorage()
            .filter((item) => Item.getKind(item) === 1001 || Item.getKind(item) === 1002)
            .sort((a, b) => {
                const aKind = Item.getKind(a);
                const bKind = Item.getKind(b);
                if (aKind === bKind) {
                    return Item.getQuality(b) - Item.getQuality(a);
                } else {
                    return bKind - aKind;
                }
            })
            .map((item) => {
                if (Item.getKind(item) === 1001 && GState.data.fossilData.fossilFormation.some((f) => f === item.id)) {
                    item.count -= GState.data.fossilData.fossilFormation.filter((f) => f === item.id).length;
                }
                if (Item.getKind(item) === 1002 && GState.data.fossilData.fossilStar === item.id) {
                    item.count -= 1;
                }
                return {
                    item: item,
                    id: item.id,
                    quailtyImg: GConstant.itemQualityBg[Item.getQuality(item)],
                    icon: Item.getImg(item),
                    lv: Item.getCountString(item)[0],
                    cb: cb,
                    switch: this.touchItemId == item.id,
                    isHave: true,
                    dragInfo: {
                        container: this.node,
                        strangeNodeList: this.strangeList,
                        strangeNode2: this.strangeStar.node,
                        scrollView: this.downList,
                    },
                };
            })
            .filter((obj) => obj.item.count > 0);
        this.downList.setState(state);
    }
}
