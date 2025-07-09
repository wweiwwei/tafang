import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import EventName from "../../event/EventName";
import ListItemWorking from "./ListItemWorking";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemBuildingState")
@ccclass
export default class ListItemBuildingState extends UIListItem {
    @autowired(UIImage) buildingIcon: UIImage = null;
    @autowired(UILabel) buildingName: UILabel = null;
    @autowired(UIList) workingList: UIList<ListItemWorking> = null;
    @autowired(UILabel) amount: UILabel = null;
    @autowired(UIButton) dec: UIButton = null;
    @autowired(UIButton) add: UIButton = null;
    state: {
        facilityId: number;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.node.name = this.state.facilityId.toString();
        this.dec.onClick = async () => {
            await GModel.facility.subSurvivorToWork(this.state.facilityId, 1);
            this.refresh();
        };
        this.add.onClick = async () => {
            await GModel.facility.addSurvivorToWork(this.state.facilityId, 1);
            this.refresh();
        };
        this.refresh();
    }

    refresh() {
        const f = GModel.facility.getFacilityById(this.state.facilityId);
        const name = GTable.getById("FacilityTbl", this.state.facilityId).name;
        this.buildingName.setText([name]);
        this.buildingIcon.imgName = f.getTbl().image2;
        let { working, wokerLimit, canNotWork } = f.getFacilityWorkingInfo();
        this.add.setGrey(working >= wokerLimit);
        this.add.interactable = working < wokerLimit;
        this.dec.setGrey(working <= 0);
        this.dec.interactable = working > 0;
        this.amount.setText(["_rs" + working + "/" + wokerLimit]);
        let arr: number[] = [];
        for (let i = 0; i < wokerLimit; i++) {
            arr.push(i < working ? 1 : 0);
        }
        this.workingList.setState(arr);
    }
}
