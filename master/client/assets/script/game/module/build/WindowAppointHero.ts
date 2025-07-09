import { autowired, message, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIRichText from "../../../framework/ui/UIRichText";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UIWindow from "../../../framework/ui/UIWindow";
import Facility from "../../entity/Facility";
import EventName from "../../event/EventName";
import ListItemAppointHero from "./ListItemAppointHero";

const { ccclass, property } = cc._decorator;

@registerClass("WindowAppointHero")
@ccclass
export default class WindowAppointHero extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    // @autowired(cc.Node) heroLitle: cc.Node = null;
    @autowired(cc.Node) ownHeroHead: cc.Node = null;
    @autowired(UIRichText) ownHeroProduct: UIRichText = null;
    @autowired(UIScrollList) heroList: UIScrollList<ListItemAppointHero> = null;
    @autowired(UIButton) btnclose: UIButton = null;
    @autowired(UIImage) image: UIImage = null;
    @autowired(UIImage) gift: UIImage = null;
    @autowired(UIImage) bg: UIImage = null;

    _windowParam: {
        build: Facility;
    };
    _returnValue: any;

    protected onInited(): void {
        this.ownHeroHead.active = false;
        this.ownHeroProduct.node.active = false;
        this.btnclose.onClick = () => {
            this.close();
        };
        this.initWindow();
    }

    @message([EventName.stateKey.facility])
    initWindow() {
        let allHero = GModel.hero.getAllHero();
        let buildHero = allHero.filter((hero) => hero.uniqueId == this._windowParam.build.hero);
        //入驻英雄信息
        this.ownHeroHead.active = buildHero.length > 0;
        this.ownHeroProduct.node.active = !this.ownHeroHead.active;
        if (this.ownHeroHead.active) {
            let inBuildHero = buildHero[0];
            // let ownBuildHeroHead = this.ownHeroHead.getChildByName("image").getComponent(UIList);
            let ownBuildHeroCount = this.ownHeroHead.getChildByName("count").getComponent(UILabel);
            this.image.imgName = inBuildHero.getImg() + "_head";
            this.gift.imgName = GConstant.getHeroKindIcon(inBuildHero.getKind());
            this.bg.imgName = GConstant.heroQuality[inBuildHero.getQuality()];
            //  + (inBuildHero.rank > 0 ? "+" + inBuildHero.rank : "");
            // ownBuildHeroHead.imgName = inBuildHero.getImg();
            // let ownState: ListItemHeroItem["state"] = {
            //     uniqueId: inBuildHero.uniqueId,
            //     id: inBuildHero.id,
            //     status: 0, //0-英雄,1-碎片,2-上阵
            //     cb: () => {},
            // };
            // ownBuildHeroHead.setState([ownState]);
            ownBuildHeroCount.setText(...inBuildHero.getFacilityBuffString(this._windowParam.build.id));
        }
        //所有英雄列表
        let heroState: ListItemAppointHero["state"][] = [];
        allHero.map((hero) => {
            let itemHeroState: ListItemAppointHero["state"] = {
                data: hero,
                facility: this._windowParam.build,
                selectedCb: this.itemCb.bind(this),
            };
            heroState.push(itemHeroState);
        });
        this.heroList.setState(heroState);
    }

    //替换或者任命
    async itemCb(facilityId: number, heroUniqueId: number) {
        await GModel.facility.changeHero(facilityId, heroUniqueId);
        this._windowParam.build.hero = heroUniqueId;
        this.initWindow();
    }
}
