import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import MainStage from "../../entity/MainStage";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemStageSelect")
@ccclass
export default class ListItemStageSelect extends UIListItem {
    @autowired(UIButton) enter: UIButton = null;
    @autowired(UILabel) label: UILabel = null;
    @autowired(cc.Node) selected: cc.Node = null;

    state: { stage: MainStage; mapIndex: number; stageIndex: number; selected: boolean; cb: Function };
    setState(state: this["state"]): void {
        this.state = state;
        this.refresh();
    }

    refresh() {
        this.enter.setGrey(this.state.stage.stageIndex < this.state.stageIndex);
        this.label.setText(["_rs" + this.state.stageIndex]);
        this.enter.onClick = () => {
            this.state.cb();
        };
        this.selected.active = this.state.selected;
    }
}
