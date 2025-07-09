import { autowired, registerClass } from "../../../framework/Decorator";
import UIImage from "../../../framework/ui/UIImage";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemWorking")
@ccclass
export default class ListItemWorking extends UIListItem {
    @autowired(UIImage) person: UIImage = null;
    state: number;
    setState(state: this["state"]): void {
        this.state = state;
        this.person.imgName = this.state === 0 ? "personzero" : "facility_survivor_working";
    }
}
