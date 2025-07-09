import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UIWindow from "../../../framework/ui/UIWindow";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import EventName from "../../event/EventName";
import ListItemHandbook from "./ListItemHandbook";
import ListItemTrammels from "./ListItemTrammels";

const { ccclass, property } = cc._decorator;
@registerClass("WindowHandbook")
@ccclass
export default class WindowHandbook extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    @autowired(UIScrollList) ItemsContainer: UIScrollList<ListItemHandbook> = null;
    @autowired(UIScrollList) TrammelsContainer: UIScrollList<ListItemTrammels> = null;
    @autowired(cc.Slider) slider: cc.Slider = null;
    @autowired(UIButton) hero: UIButton = null;
    @autowired(UIButton) equipments: UIButton = null;
    @autowired(UIButton) carComponents: UIButton = null;
    @autowired(UIButton) return: UIButton = null;
    @autowired(UIImage) exclamation1: UIImage = null;
    @autowired(UIImage) exclamation2: UIImage = null;
    @autowired(UIImage) exclamation3: UIImage = null;
    _windowParam: any;
    _returnValue: any;
    protected onInited(): void {
        this.heroInit();
        this.return.onClick = () => {
            this.close();
        };
        this.hero.onClick = () => {
            this.heroInit();
            this.hero.bg.imgName = "hero_list_chosen";
            this.equipments.bg.imgName = "hero_list_unchosen";
            this.carComponents.bg.imgName = "hero_list_unchosen";
        };
        this.equipments.onClick = () => {
            this.equipmentInit();
            this.hero.bg.imgName = "hero_list_unchosen";
            this.equipments.bg.imgName = "hero_list_chosen";
            this.carComponents.bg.imgName = "hero_list_unchosen";
        };
        this.carComponents.onClick = () => {
            this.carInit();
            this.hero.bg.imgName = "hero_list_unchosen";
            this.equipments.bg.imgName = "hero_list_unchosen";
            this.carComponents.bg.imgName = "hero_list_chosen";
        };
    }
    protected onRecycle(): void {}
    @message([EventName.stateKey.relation])
    heroInit() {
        this.ItemsContainer.node.active = false;
        this.TrammelsContainer.node.active = true;
        let state = GTable.getList("RelationBuffTbl").map((t) => {
            return { id: t.id };
        });
        this.TrammelsContainer.setState(state);
    }
    equipmentInit() {
        this.ItemsContainer.node.active = true;
        this.TrammelsContainer.node.active = false;
        let state = GTable.getList("HeroEquipmentTbl").map((t) => {
            return { equipment: t.id, carequipment: null };
        });
        this.ItemsContainer.setState(state);
        this.TrammelsContainer.setState([]);
    }
    carInit() {
        this.ItemsContainer.node.active = true;
        this.TrammelsContainer.node.active = false;
        let state = GTable.getList("CarEquipmentTbl").map((t) => {
            return { carequipment: t.id, equipment: null };
        });
        this.ItemsContainer.setState(state);
        this.TrammelsContainer.setState([]);
    }
}
