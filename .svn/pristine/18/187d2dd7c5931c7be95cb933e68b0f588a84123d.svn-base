import { autowired, registerClass } from "../../../framework/Decorator";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemDescription")
@ccclass
export default class ListItemDescription extends UIListItem {
    @autowired(UILabel) level: UILabel = null;
    @autowired(UILabel) description: UILabel = null;

    state: {
        level: number;
        description: string;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.level.setText([GLang.code.ui.hero_skill_level, "_rs" + this.state.level]);
        this.description.setText([this.state.description]);
    }
}
