import { autowired, registerClass } from "../../../framework/Decorator";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import ListItemPropDetailsSkillTips from "../mainscene/ListItemPropDetailsSkillTips";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemEquipTalent")
@ccclass
export default class ListItemEquipTalent extends UIListItem {
    /**技能名 */
    @autowired(UILabel) skillName: UILabel = null;
    /**技能描述 */
    @autowired(UIList) skillTips: UIList<ListItemPropDetailsSkillTips> = null;
    state: {
        talentId: number;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.initBox();
    }
    initBox() {
        let tbl = GTable.getById("PlayerSkillTalentTbl", this.state.talentId);
        this.skillName.setText(["_rs天赋技能:"], [tbl.name]);
        this.skillTips.setState([{ text: tbl.description }]);
    }
}
