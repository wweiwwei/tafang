import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIEditBox from "../../../framework/ui/UIEditBox";
import UIImage from "../../../framework/ui/UIImage";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import ListItemSkill from "./ListItemSkill";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemPlan")
@ccclass()
export default class ListItemPlan extends UIListItem {
    @autowired(UIImage) planName: UIImage = null;
    @autowired(UIEditBox) editName: UIEditBox = null;
    @autowired(UIButton) share: UIButton = null;
    @autowired(UIButton) change: UIButton = null;
    @autowired(UIList) itemList: UIList<ListItemSkill> = null;
    state: {
        formations: number[];
        label: string[];
        cb: () => void;
        chosen: boolean;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.editName.setText(this.state.label);
        this.change.onClick = this.state.cb;
        this.change.node.active = !this.state.chosen;
        let list = this.state.formations.map((id) => {
            let chosen = this.state.formations.some((f) => f === id);
            return { status: 0, id, chosen, cb: () => {} };
        });
        this.itemList.setState(list);
    }
}
