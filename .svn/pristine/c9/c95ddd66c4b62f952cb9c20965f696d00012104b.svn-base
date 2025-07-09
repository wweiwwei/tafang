import { autowired, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIWindow from "../../../framework/ui/UIWindow";
import Item from "../../entity/Item";
import WindowFullCardHeroDetail from "../hero/WindowFullCardHeroDetail";
import WindowItemDescription from "./WindowItemDescription";
const { ccclass, property } = cc._decorator;
@registerClass("WindowCongratulation_Drifting_bottle")
@ccclass
export default class WindowCongratulation_Drifting_bottle extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    @autowired(UIImage) reward: UIImage = null;
    _windowParam: Item[];
    _returnValue: boolean = false;
    protected onInited(): void {
        // console.log("open");
        this.openHeroInde = 0;
        let btn = this.node.getComponent(UIButton);
        btn.setTransition(false);
        btn.onClick = () => {
            this.openHero();
            this._returnValue = true;
            this.close();
        };
        let content = this.node.getChildByName("content");
        let ani = content.getComponent(cc.Animation);
        let rewardNodes = [];
        let length = this._windowParam.length;
        for (let i = 1; i <= 5; i++) {
            rewardNodes.push(content.getChildByName(`ReWard_0${i}`));
        }
        let herotbl = GTable.getList("HeroTbl");
        rewardNodes.forEach((node, i) => {
            // if (length === 1) {
            //     if (i === 2) {
            //         if (herotbl.some((h) => h.id === this._windowParam[0].id)) {
            //             let hero = herotbl.find((h) => h.id === this._windowParam[0].id);
            //             node.getChildByName("bg").getComponent(UIImage).imgName = GConstant.heroQuality[hero.quality];
            //             node.getChildByName("icon").getComponent(UIImage).imgName = hero.img + "_head";
            //             node.getChildByName("icon").getComponent(UIImage).fixHeight = 70;
            //             node.getChildByName("number").active = false;
            //         } else {
            //             node.getChildByName("debris").active = herotbl.some((h) => h.frag === this._windowParam[0].id);
            //             node.getChildByName("debris").active &&
            //                 (node.getChildByName("icon").getComponent(UIImage).fixHeight = 70);
            //             node.getChildByName("bg").getComponent(UIImage).imgName =
            //                 GConstant.quality[Item.getQuality(this._windowParam[0])];
            //             node.getChildByName("icon").getComponent(UIImage).imgName = Item.getImg(this._windowParam[0]);
            //             node.getChildByName("number")
            //                 .getComponent(UILabel)
            //                 .setText(["_rs" + GUtils.ui.getNumberString(this._windowParam[0].count, 1)]);
            //             node.getComponent(UIButton).onClick = () => {
            //                 GWindow.open(WindowItemDescription, { item: this._windowParam[0] });
            //             };
            //         }
            //     } else {
            //         node.active = false;
            //     }
            // } else if (length === 3) {
            //     if (i > 0 && i < 4) {
            //         if (herotbl.some((h) => h.id === this._windowParam[i - 1].id)) {
            //             let hero = herotbl.find((h) => h.id === this._windowParam[i - 1].id);
            //             node.getChildByName("bg").getComponent(UIImage).imgName = GConstant.heroQuality[hero.quality];
            //             node.getChildByName("icon").getComponent(UIImage).imgName = hero.img + "_head";
            //             node.getChildByName("icon").getComponent(UIImage).fixHeight = 70;
            //             node.getChildByName("number").active = false;
            //         } else {
            //             node.getChildByName("debris").active = herotbl.some(
            //                 (h) => h.frag === this._windowParam[i - 1].id
            //             );
            //             node.getChildByName("debris").active &&
            //                 (node.getChildByName("icon").getComponent(UIImage).fixHeight = 70);
            //             node.getChildByName("bg").getComponent(UIImage).imgName =
            //                 GConstant.quality[Item.getQuality(this._windowParam[i - 1])];
            //             node.getChildByName("icon").getComponent(UIImage).imgName = Item.getImg(
            //                 this._windowParam[i - 1]
            //             );
            //             node.getChildByName("number")
            //                 .getComponent(UILabel)
            //                 .setText(["_rs" + GUtils.ui.getNumberString(this._windowParam[i - 1].count, 1)]);
            //             node.getComponent(UIButton).onClick = () => {
            //                 GWindow.open(WindowItemDescription, { item: this._windowParam[i - 1] });
            //             };
            //         }
            //     } else {
            //         node.active = false;
            //     }
            // } else {
            //     if (herotbl.some((h) => h.id === this._windowParam[i].id)) {
            //         let hero = herotbl.find((h) => h.id === this._windowParam[i].id);
            //         node.getChildByName("bg").getComponent(UIImage).imgName = GConstant.heroQuality[hero.quality];
            //         node.getChildByName("icon").getComponent(UIImage).imgName = hero.img + "_head";
            //         node.getChildByName("icon").getComponent(UIImage).fixHeight = 70;
            //         node.getChildByName("number").active = false;
            //     } else {
            //         node.getChildByName("debris").active = herotbl.some((h) => h.frag === this._windowParam[i].id);
            //         node.getChildByName("debris").active &&
            //             (node.getChildByName("icon").getComponent(UIImage).fixHeight = 70);
            //         node.getChildByName("bg").getComponent(UIImage).imgName =
            //             GConstant.quality[Item.getQuality(this._windowParam[i])];
            //         node.getChildByName("icon").getComponent(UIImage).imgName = Item.getImg(this._windowParam[i]);
            //         node.getChildByName("number")
            //             .getComponent(UILabel)
            //             .setText(["_rs" + GUtils.ui.getNumberString(this._windowParam[i].count, 1)]);
            //         node.getComponent(UIButton).onClick = () => {
            //             GWindow.open(WindowItemDescription, { item: this._windowParam[i] });
            //         };
            //     }
            // }
            node.active = i < length;
            if (i < length) {
                // console.log(node.name);

                if (herotbl.some((h) => h.id === this._windowParam[i].id)) {
                    let hero = herotbl.find((h) => h.id === this._windowParam[i].id);
                    node.getChildByName("bg").getComponent(UIImage).imgName = GConstant.heroQuality[hero.quality];
                    node.getChildByName("icon").getComponent(UIImage).imgName = hero.img + "_head";
                    node.getChildByName("icon").getComponent(UIImage).fixHeight = 70;
                    node.getChildByName("number").active = false;
                } else {
                    node.getChildByName("debris").active = herotbl.some((h) => h.frag === this._windowParam[i].id);
                    node.getChildByName("debris").active &&
                        (node.getChildByName("icon").getComponent(UIImage).fixHeight = 70);
                    node.getChildByName("bg").getComponent(UIImage).imgName =
                        GConstant.quality[Item.getQuality(this._windowParam[i])];
                    node.getChildByName("icon").getComponent(UIImage).imgName = Item.getImg(this._windowParam[i]);
                    node.getChildByName("number")
                        .getComponent(UILabel)
                        .setText(["_rs" + GUtils.ui.getNumberString(this._windowParam[i].count, 1)]);
                    node.getComponent(UIButton).onClick = () => {
                        GWindow.open(WindowItemDescription, { item: this._windowParam[i] });
                    };
                }
                // node.getChildByName("bg").getComponent(UIImage).imgName =
                //     GConstant.quality[Item.getQuality(this._windowParam[i])];
                // node.getChildByName("icon").getComponent(UIImage).imgName = Item.getImg(this._windowParam[i]);
                // node.getChildByName("number").getComponent(UILabel).imgName = this._windowParam[i].count;
                // node.getComponent(UIButton).onClick = () => {
                //     GWindow.open(WindowItemDescription, { item: this._windowParam[i] });
                // };
            }
        });
        ani.play();
        ani.on("stop", () => {
            this.openHero();
        });
    }
    private openHeroInde = 0;
    openHero() {
        if (this._windowParam === null) return;
        let heros = this._windowParam.filter((item) => GTable.getById("HeroTbl", item.id));
        if (heros.length <= 0) {
            return;
        }
        let info = heros[this.openHeroInde];
        if (heros[this.openHeroInde]) {
            this.openHeroInde++;
            GWindow.open(WindowFullCardHeroDetail, {
                hero: GModel.hero.getHeroByUniqueId(info.id),
                endFunc: () => {
                    // console.log("再次调用openHero func");
                    this.scheduleOnce(() => {
                        this.openHero();
                    }, 0.5);
                },
            });
        }
    }
    protected onDestroy(): void {
        this.unscheduleAllCallbacks();
    }
}
