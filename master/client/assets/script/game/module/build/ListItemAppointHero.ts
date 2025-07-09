import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import Facility from "../../entity/Facility";
import Hero from "../../entity/Hero";
import Item from "../../entity/Item";
import EventName from "../../event/EventName";
import ListItemHeroItem from "../common/ListItemHeroItem";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemAppointHero")
@ccclass
export default class ListItemAppointHero extends UIListItem {
    @autowired(UILabel) heroInfo: UILabel = null;
    @autowired(UILabel) heroProduct: UILabel = null;
    @autowired(UIList) heroImg: UIList<ListItemHeroItem> = null;
    @autowired(UIButton) btnAppoint: UIButton = null;
    @autowired(UIImage) working: UIImage = null;
    @autowired(UILabel) somewhere: UILabel = null;

    private __state: this["state"] = null;
    state: {
        data: Hero;
        facility: Facility;
        selectedCb: (facilityId: number, heroUniqueId: number) => void;
    };
    setState(state: this["state"]): void {
        this.__state = state;
        this.initItem();
    }
    @message([EventName.stateKey.facility])
    initItem() {
        let allFacility = GModel.facility.getAllFacility();
        let facility = allFacility.find((t) => t.hero === this.__state.data.uniqueId);
        this.working.node.active = facility !== undefined;
        this.btnAppoint.onClick = () => {
            this.__state.selectedCb(this.__state.facility.id, this.__state.data.uniqueId);
        };
        if (facility !== undefined) {
            this.somewhere.setText([GLang.code.ui.working_somewhere, facility.getTbl().name]);
            this.btnAppoint.node.setPosition(150, -20);
            this.btnAppoint.node
                .getChildByName("UILabel")
                .getComponent(UILabel)
                .setText([GLang.code.ui.equipment_change]);
            this.btnAppoint.onClick = () => {
                this.__state.selectedCb(facility.id, this.__state.facility.hero);
                this.__state.selectedCb(this.__state.facility.id, this.__state.data.uniqueId);
            };
        } else {
            this.btnAppoint.node.getChildByName("UILabel").getComponent(UILabel).setText([GLang.code.ui.commission]);
            this.btnAppoint.node.setPosition(150, -2);
        }
        if (this.__state.facility.hero === this.__state.data.uniqueId) {
            this.btnAppoint.node
                .getChildByName("UILabel")
                .getComponent(UILabel)
                .setText([GLang.code.ui.cancel], [GLang.code.ui.commission]);
            this.btnAppoint.onClick = () => {
                this.__state.selectedCb(this.__state.facility.id, -1);
            };
        }
        let heroTblData = this.__state.data.getTbl();
        let heroNas = GLang.getText(heroTblData.name) + "Lv." + this.__state.data.level;
        this.heroInfo.setText(["_rs" + heroNas]);
        this.heroProduct.setText(...this.__state.data.getFacilityBuffString(this.__state.facility.id));
        // this.heroImg.imgName = this.__state.data.getImg();
        let showState: ListItemHeroItem["state"] = {
            uniqueId: this.__state.data.uniqueId,
            id: this.__state.data.id,
            status: 0, //0-英雄,1-碎片,2-上阵
            cb: () => {},
        };
        this.heroImg.setState([showState]);
    }
}
