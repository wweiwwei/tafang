import { autowired, message, registerClass } from "../../../framework/Decorator";
import ResourceLoader from "../../../framework/ResourceLoader";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UISpine from "../../../framework/ui/UISpine";
import UIWindow from "../../../framework/ui/UIWindow";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import Hero from "../../entity/Hero";
import EventName from "../../event/EventName";
import ListItemDebris from "../common/ListItemDebris";
import ListItemHero from "../common/ListItemHero";
import ListItemGift from "./ListItemGift";
import WindowHeroDetail from "./WindowHeroDetail";
import ListItemDragItem from "../common/ListItemDragItem";
import ListItemHeroItem from "../common/ListItemHeroItem";
import EventBus from "../../../framework/event/EventBus";

const { ccclass, property } = cc._decorator;

@registerClass("WindowHero", {
    preloadPrefab: ["ListItemSceneHero"],
})
@ccclass
export default class WindowHero extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
        hideMainScene: true,
    };
    _windowParam: any;
    _returnValue: any;
    /**类型容器 */
    @autowired(UIList) giftItemContainer: UIList<ListItemGift> = null;
    /**英雄容器 */
    @autowired(UIScrollList) heroContainer: UIScrollList<ListItemHero> = null;
    /**碎片容器 */
    @autowired(UIScrollList) debrisContainer: UIScrollList<ListItemDebris> = null;
    /**上阵英雄容器 */
    @autowired(UIScrollList) heroAboardContainer: UIScrollList<ListItemHeroItem> = null;
    @autowired(UIButton) return: UIButton = null;
    /**列表按钮 */
    @autowired(UIButton) btn_list: UIButton = null;
    /**碎片按钮 */
    @autowired(UIButton) btn_debris: UIButton = null;
    /**全部类型按钮 */
    @autowired(UIButton) allGift: UIButton = null;
    /**一键合成按钮 */
    @autowired(UIButton) combineAll: UIButton = null;
    /**一键合成感叹 */
    @autowired(UIImage) combineAllExclamation: UIImage = null;
    /**空军 */
    @autowired(UISpine) herofly: UISpine = null;
    /**坦克 */
    @autowired(UISpine) herotank: UISpine = null;
    /**后排1 */
    @autowired(UISpine) hero1: UISpine = null;
    /**后排2 */
    @autowired(UISpine) hero2: UISpine = null;
    /**后排3 */
    @autowired(UISpine) hero3: UISpine = null;
    /**后排4 */
    @autowired(UISpine) hero4: UISpine = null;
    // /**坦克 */
    // @autowired(UIImage) tankbg: UIImage = null;
    // /**空军 */
    // @autowired(UIImage) flybg: UIImage = null;
    // /**后排1 */
    // @autowired(UIImage) bg1: UIImage = null;
    // /**后排2 */
    // @autowired(UIImage) bg2: UIImage = null;
    // /**后排3 */
    // @autowired(UIImage) bg3: UIImage = null;
    // /**后排4 */
    // @autowired(UIImage) bg4: UIImage = null;
    /**空军 */
    @autowired(UIButton) fly: UIButton = null;
    /**坦克 */
    @autowired(UIButton) tank: UIButton = null;
    /**后排1 */
    @autowired(UIButton) back1: UIButton = null;
    /**后排2 */
    @autowired(UIButton) back2: UIButton = null;
    /**后排3 */
    @autowired(UIButton) back3: UIButton = null;
    /**后排4 */
    @autowired(UIButton) back4: UIButton = null;
    /**战力 */
    @autowired(UILabel) power: UILabel = null;
    /**标题栏 */
    @autowired(UILabel) titleLabel: UILabel = null;
    /**一键上阵 */
    @autowired(UIButton) btn_aboard_all: UIButton = null;
    /**一键升级 */
    @autowired(UIButton) btn_upgrade_all: UIButton = null;
    /**上阵按钮 */
    @autowired(UIButton) btn_aboard: UIButton = null;
    /**全类型背景 */
    @autowired(UIImage) chooseAll: UIImage = null;
    /**类型背景 */
    @autowired(UIImage) giftsbg: UIImage = null;
    /**升级感叹号 */
    @autowired(UIImage) upgrade_all_exclamation: UIImage = null;
    /**上阵感叹号 */
    @autowired(UIImage) exclamation3: UIImage = null;
    /**碎片感叹号 */
    @autowired(UIImage) exclamation2: UIImage = null;
    /**列表感叹号 */
    @autowired(UIImage) exclamation: UIImage = null;
    /**列表节点 */
    @autowired(cc.Node) listPage: cc.Node = null;
    /**碎片节点 */
    @autowired(cc.Node) fragPage: cc.Node = null;
    /**英雄节点 */
    @autowired(cc.Node) heroList: cc.Node = null;
    /**上阵节点 */
    @autowired(cc.Node) aboardList: cc.Node = null;

    private nodeList: UIButton[];
    protected onInjected(): void {
        this.nodeList = [this.tank, this.fly, this.back1, this.back2, this.back3];
        let btn = this.node.getComponent(UIButton);
        btn.setTransition(false);
        btn.onClick = () => {
            this.clearArrowBg();
        };
        this.return.onClick = () => {
            this.close();
        };
        this.allGift.onClick = () => {
            this.kind = "";
            this.refreshGifts();
            this.refreshHero();
            this.refreshFormation();
        };
        this.btn_list.onClick = () => {
            this.changeList();
            this.clearArrowBg();
        };
        this.btn_debris.onClick = () => {
            this.changeDebris();
            this.clearArrowBg();
        };
        this.combineAll.onClick = () => {
            this.autoCombine();
        };
        this.btn_aboard.onClick = () => {
            this.changeAboard();
            this.clearArrowBg();
        };
        this.btn_aboard_all.onClick = () => {
            this.formateAll();
        };
        this.btn_upgrade_all.onClick = () => {
            this.upgradeAll();
        };
        this.nodelistClick(null);
        this.fragPage.active = false;
        this.aboardList.active = false;
        this.exclamation.node.active = false;
        this.exclamation2.node.active = false;
        this.kind = "";
        this.refreshDebris();
        this.refreshGifts();
        this.refreshHero();
        this.refreshFormation();
    }
    @message([EventName.chosenHero])
    nodelistClick(hero: Hero) {
        this.nodeList.forEach((v, i) => {
            v.onClick = () => {
                let format = GModel.hero.getFormation();
                if (format[i] != -1) {
                    if (hero) {
                        if (GConstant.formationLimit[hero.getKind()].some((limit) => limit === i)) {
                            format[i] = hero.id;
                            GModel.hero.setFormation(format);
                            this.clearArrowBg();
                        } else {
                            GTip.showTip([GLang.code.ui.format_not_match]);
                        }
                    } else {
                        if (format.filter((t) => t !== -1).length !== 1) {
                            format[i] = -1;
                            GModel.hero.setFormation(format);
                        } else {
                            GTip.showTip([GLang.code.ui.at_least_one]);
                        }
                    }
                }
            };
        });
    }
    clearArrowBg() {
        this.nodeList.forEach((node) => {
            node.node.getChildByName(`canformatebg`).getComponent(UIImage).imgName = "";
        });
        EventBus.emit(EventName.chosenHero, null);
    }
    async upgradeAll() {
        let heros = GModel.hero
            .getFormation()
            .filter((f) => f !== -1)
            .map((f) => GModel.hero.getHeroByUniqueId(f));
        // let expStorage = GModel.knapsack.getStorageById(GIndex.id.heroExpId);
        // let coinStorage = GModel.knapsack.getStorageById(GIndex.id.coinId);
        //     .filter((h) => h.canUpgrade())
        //     .sort((a, b) => a.level - b.level);
        // let heroMap = heros.map((h) => {
        //     return { count: 0, h };
        // });
        if (heros.every((e) => !e.canUpgrade())) {
            GTip.showTip(["_rs没有英雄可以升级"]);
            return;
        }
        // while (heros.some((h) => h.canUpgrade())) {
        //     let expTemp = expStorage - heros[0].upgradeRequire().find((r) => r.id === GIndex.id.heroExpId).count;
        //     let coinTemp = coinStorage - heros[0].upgradeRequire().find((r) => r.id === GIndex.id.coinId).count;
        //     if (expTemp >= 0 && coinTemp >= 0) {
        //         expStorage = expTemp;
        //         coinStorage = coinTemp;
        //         heros[0] = heros[0].getNextLevelHero();
        //         heroMap.find((h) => h.h.id === heros[0].id).count++;
        //         heros = heros.filter((h) => h.canUpgrade()).sort((a, b) => a.level - b.level);
        //     } else {
        //         break;
        //     }
        // }
        // heroMap.forEach(async (element) => {
        //     console.log(element.h);

        //     await GModel.hero.upgradeHeroLevel(element.h.uniqueId, element.count);
        // });
        GModel.hero.upgradeAllHero();
    }
    protected onRecycle(): void {}
    /**类型 */
    private kind = "";
    async formateAll() {
        let allhero = GModel.hero.getAllHero();
        let format = GModel.hero.getFormation();
        let need = format.findIndex((t) => t === -1);
        if (need !== -1) {
            let filter: Hero[];
            switch (need) {
                case 0:
                    filter = allhero.filter((t) => t.getKind() === "tank");
                    break;
                case 1:
                    filter = allhero.filter((t) => t.getKind() === "air");
                    break;
                default:
                    filter = allhero.filter(
                        (t) =>
                            t.getKind() !== "air" &&
                            t.getKind() !== "tank" &&
                            format.find((v) => v === t.uniqueId) === undefined
                    );
                    break;
            }
            if (filter.length > 0) {
                format[need] = filter.sort((a, b) => b.getBattlePoint() - a.getBattlePoint())[0].uniqueId;
                await GModel.hero.setFormation(format);
                this.formateAll();
            }
            GTip.showTip([GLang.code.ui.format_success]);
        }
    }
    /**自动合成 */
    async autoCombine() {
        const heroList = await GModel.hero.batchComposeHero();
        heroList.length > 0 && GTip.showTip([GLang.code.ui.hero_combine_success]);
    }
    changeAboard() {
        this.titleLabel.setText([GLang.code.ui.hero_formate]);
        this.refreshGifts();
        this.refreshFormation();
        this.btn_debris.bg.imgName = "hero_list_unchosen";
        this.btn_list.bg.imgName = "hero_list_unchosen";
        this.btn_aboard.bg.imgName = "hero_list_chosen";
        this.fragPage.active = false;
        this.listPage.active = true;
        this.heroList.active = false;
        this.aboardList.active = true;
    }
    /**更换到列表 */
    changeList() {
        this.titleLabel.setText([GLang.code.ui.partners]);
        this.refreshGifts();
        this.refreshHero();
        this.btn_debris.bg.imgName = "hero_list_unchosen";
        this.btn_aboard.bg.imgName = "hero_list_unchosen";
        this.btn_list.bg.imgName = "hero_list_chosen";
        this.fragPage.active = false;
        this.aboardList.active = false;
        this.heroList.active = true;
        this.listPage.active = true;
    }

    /**更换到碎片 */
    changeDebris() {
        this.titleLabel.setText([GLang.code.ui.partners]);
        this.refreshDebris();
        this.btn_list.bg.imgName = "hero_list_unchosen";
        this.btn_aboard.bg.imgName = "hero_list_unchosen";
        this.btn_debris.bg.imgName = "hero_list_chosen";
        this.listPage.active = false;
        this.fragPage.active = true;
    }

    /**刷新碎片 */
    @message([EventName.stateKey.storage])
    refreshDebris() {
        let tbl = GModel.knapsack.getAllHeroFrag();
        let show = GModel.knapsack.isCanComposeFlag();
        tbl.sort((a, b) => {
            return GTable.getById("ItemTbl", b.id).quality - GTable.getById("ItemTbl", a.id).quality;
        });
        let state = tbl.map((t) => {
            let item = t;
            return { item };
        });
        this.debrisContainer.setState(state);
        this.combineAllExclamation.node.active = show;
        this.exclamation2.node.active = show;
    }

    /**刷新英雄 */
    @message([EventName.stateKey.hero, EventName.stateKey.storage, EventName.stateKey.formation])
    refreshHero() {
        let show = false;
        let tbl = GModel.hero.getAllHero();
        let t = tbl;
        if (this.kind != "") {
            t = tbl.filter((i) => i.getKind() === this.kind);
        }
        t.sort((a, b) => {
            if (a.getQuality() === b.getQuality()) {
                return b.getBattlePoint() - a.getBattlePoint();
            } else {
                return b.getQuality() - a.getQuality();
            }
        });
        let state = t.map((v) => {
            let hero = v;
            let cb = () => {
                GWindow.open(WindowHeroDetail, { hero: v, arr: t });
            };
            ((hero.isFormated() && (hero.canUpgrade() || hero.canUprank() || hero.canEquip())) || hero.canUpstar()) &&
                (show = true);
            return {
                hero,
                show:
                    (hero.isFormated() && (hero.canUpgrade() || hero.canUprank() || hero.canEquip())) ||
                    hero.canUpstar(),
                cb,
                formated: hero.isFormated() ? 1 : -1,
                status: 0,
            };
        });
        this.heroContainer.setState(state);
        this.exclamation.node.active = show;
    }
    /**切换图片和等级文本 */
    changeImg(heroId: number, spine: UISpine, node: UIButton, state: number) {
        let hero = GModel.hero.getHeroByUniqueId(heroId);
        let nameplate = node.node.getChildByName("nameplate");
        let label = nameplate.getChildByName("level").getComponent(UILabel);
        let gift = nameplate.getChildByName("gift").getComponent(UIImage);
        let notaboard = node.node.getChildByName("notAboard");
        if (state === 0) {
            nameplate.active = true;
            node.bg.node.active = false;
            notaboard.active = false;
            if (ResourceLoader.isSpineExist(hero.getImg())) {
                spine.setSpine(hero.getImg(), "default", "idle");
                spine.node.scale = hero.getKind() === "tank" ? 0.45 : hero.getKind() === "air" ? 0.35 : 0.22;
                spine.node.active = true;
                // img.node.active = false;0
            } else {
                // img.imgName = hero.getImg();
                // img.node.active = true;
                spine.node.active = false;
            }
            gift.imgName = "hero_kind_" + hero.getKind();
            label.setText([GLang.code.ui.map_unlock_level, "_rs" + hero.level]);
        } else {
            node.bg.node.active = true;
            // img.node.active = false;
            spine.node.active = false;
            nameplate.active = false;
            notaboard.active = true;
        }
    }

    @message([EventName.stateKey.formation, EventName.stateKey.hero, EventName.stateKey.storage])
    refreshUpgradeAllbtn() {
        let formation = GModel.hero.getFormation();
        let heros = formation.filter((f) => f !== -1).map((f) => GModel.hero.getHeroByUniqueId(f));
        // console.log(heros.some((h) => h.canUpgrade()));

        this.upgrade_all_exclamation.node.active = heros.some((h) => h.canUpgrade());
        this.exclamation3.node.active = GModel.hero.canFormate() || heros.some((h) => h.canUpgrade());
    }
    /**刷新上阵英雄 */
    @message([EventName.stateKey.formation, EventName.stateKey.hero])
    refreshFormation() {
        this.refreshUpgradeAllbtn();
        let formation = GModel.hero.getFormation();
        let powerCount = 0;
        formation.map((t, i) => {
            if (t != -1) {
                powerCount += GModel.hero.getHeroByUniqueId(t).getBattlePoint();
                switch (i) {
                    case 0:
                        this.changeImg(t, this.herotank, this.tank, 0);
                        break;
                    case 1:
                        this.changeImg(t, this.herofly, this.fly, 0);
                        break;
                    case 2:
                        this.changeImg(t, this.hero1, this.back1, 0);
                        break;
                    case 3:
                        this.changeImg(t, this.hero2, this.back2, 0);
                        break;
                    case 4:
                        this.changeImg(t, this.hero3, this.back3, 0);
                        break;
                    // case 5:
                    //     this.changeImg(t, this.hero4, this.back4, this.bg4, 0);
                    //     break;
                    default:
                        break;
                }
            } else {
                switch (i) {
                    case 0:
                        this.changeImg(t, this.herotank, this.tank, 1);
                        break;
                    case 1:
                        this.changeImg(t, this.herofly, this.fly, 1);
                        break;
                    case 2:
                        this.changeImg(t, this.hero1, this.back1, 1);
                        break;
                    case 3:
                        this.changeImg(t, this.hero2, this.back2, 1);
                        break;
                    case 4:
                        this.changeImg(t, this.hero3, this.back3, 1);
                        break;
                    // case 5:
                    //     this.changeImg(t, this.hero4, this.back4, this.bg4, 1);
                    //     break;
                    default:
                        break;
                }
            }
        });
        let tbl = GModel.hero.getAllHero();
        let t = tbl;
        if (this.kind != "") {
            t = tbl.filter((i) => i.getKind() === this.kind);
        }
        t.sort((a, b) => {
            if (a.getQuality() === b.getQuality()) {
                return b.getBattlePoint() - a.getBattlePoint();
            } else {
                return b.getQuality() - a.getQuality();
            }
        });
        let formationUnlock = GConfig.hero.formationUnlock;
        let facility = GModel.facility.getFacilityById(GConstant.captainId);
        formationUnlock.map((lock, i) => {
            if (lock > 0) {
                this.nodeList[i].getComponent(UIButton).bg.sizeMode =
                    facility.rank >= lock ? cc.Sprite.SizeMode.CUSTOM : cc.Sprite.SizeMode.TRIMMED;
                this.nodeList[i].getComponent(UIButton).bg.imgName =
                    facility.rank >= lock ? "common_plus" : "battlescene_map_locked";
                this.nodeList[i]
                    .getComponent(UIButton)
                    .text.setText([facility.rank >= lock ? GLang.code.ui.notformated : GLang.code.ui.map_notfound]);
            }
        });
        // let state = t.map((v) => {
        //     return { id: v.id, uniqueId: v.uniqueId, nodeList, scroll: this.heroAboardContainer };
        // });
        let state = t.map((v) => {
            let cb = () => {
                let enableList = GConstant.formationLimit[v.getKind()];
                let exist = formation.findIndex((t) => t === v.uniqueId);
                this.clearArrowBg();
                if (exist == -1) {
                    let arr = formation.filter(
                        (f, i) => enableList.some((e) => e === i) && facility.rank >= formationUnlock[i]
                    );
                    if (arr.length > 0 && arr.every((f) => f !== -1)) {
                        console.log(v);

                        EventBus.emit(EventName.chosenHero, v);
                        enableList.forEach((i) => {
                            this.nodeList[i].node.getChildByName(`canformatebg`).getComponent(UIImage).imgName =
                                formationUnlock[i] > 0
                                    ? facility.rank < formationUnlock[i]
                                        ? ""
                                        : "hero_canformat_arrow"
                                    : "hero_canformat_arrow";
                        });
                    } else {
                        let show = 0;
                        for (let i = 0; i < enableList.length; i++) {
                            if (facility.rank >= formationUnlock[enableList[i]]) {
                                if (formation[enableList[i]] == -1) {
                                    formation[enableList[i]] = v.uniqueId;
                                    GModel.hero.setFormation(formation);
                                    show = 0;
                                    break;
                                } else if (i === enableList.length - 1 && show >= 0) {
                                    GTip.showTip([GLang.code.ui.hero_formated_same]);
                                }
                            } else {
                                show--;
                            }
                        }
                        show < 0 && GTip.showTip([GLang.code.ui.format_update_captain]);
                    }
                } else {
                    if (formation.filter((t) => t !== -1).length !== 1) {
                        formation[exist] = -1;
                        GModel.hero.setFormation(formation);
                    } else {
                        GTip.showTip([GLang.code.ui.at_least_one]);
                    }
                }
            };
            return { id: v.id, uniqueId: v.uniqueId, status: 2, cb };
        });
        this.heroAboardContainer.setState(state);
        this.power.setText(["_rs" + powerCount]);
    }
    /**刷新类型 */
    refreshGifts() {
        this.clearArrowBg();
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
                this.refreshHero();
                this.refreshFormation();
            };
            return { imgName, selected, cb };
        });
        this.giftItemContainer.setState(state);
    }
}
