import { autowired, registerClass } from "../../../framework/Decorator";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
const { ccclass, property } = cc._decorator;
@registerClass("ListItemRogueBlessSkill")
@ccclass
export default class ListItemRogueBlessSkill extends UIListItem {
    /** */
    @autowired(UIImage) img: UIImage = null;
    @autowired(UILabel) nameLab: UILabel = null;
    @autowired(cc.Node) core: cc.Node = null;
    @autowired(UILabel) desc: UILabel = null;
    @autowired(UILabel) hasget: UILabel = null;
    @autowired(UIImage) img1: UIImage = null;

    state: { id: number };
    setState(state: this["state"]): void {
        this.state = state;
        const tbl = GTable.getById("RogueBlessTbl", this.state.id);

        const api = GBattleApiManager.getBattleStageApi(0);

        let data = api.rogueBlessManager().getAllBless();

        this.hasget.node.active = data.includes(state.id);
        this.img.imgName = tbl.img;
        this.nameLab.setText([tbl.name]);
        this.desc.setText([tbl.description]);
        this.core.active = tbl.core > 0;

        if (this.state.id && this.core.active) {
            this.img1.node.active = true;
        }
    }
}
