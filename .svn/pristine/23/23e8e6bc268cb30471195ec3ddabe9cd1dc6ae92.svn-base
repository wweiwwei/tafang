import { autowired, registerClass } from "../../../framework/Decorator";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
import Item from "../../entity/Item";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemPeople")
@ccclass
export default class ListItemPeople extends UIListItem {
    @autowired(UIImage) people: UIImage = null;

    state: {
        empty: boolean;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.state.empty ? (this.people.imgName = "common_people3") : (this.people.imgName = "common_people2");
    }
}
