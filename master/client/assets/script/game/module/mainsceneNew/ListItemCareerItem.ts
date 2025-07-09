import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
import UIWindow from "../../../framework/ui/UIWindow";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemCareerItem")
@ccclass
export default class ListItemCareerItem extends UIListItem {
    @autowired(UIImage) avatar: UIImage = null;
    @autowired(UIImage) chosen: UIImage = null;
    @autowired(UILabel) careerName: UILabel = null;
    state: {
        id: number;
        chosen: boolean;
        cb: () => void;
    };
    setState(state: this["state"]): void {
        this.state = state;
        const tbl = GTable.getById("JobChangeTbl", this.state.id);
        this.node.getComponent(UIButton).onClick = this.state.cb;
        this.chosen.node.active = this.state.chosen;
        this.avatar.imgName = tbl.avatar;
        this.careerName.setText([tbl.name]);
    }
}
