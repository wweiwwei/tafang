import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
import UIRichText from "../../../framework/ui/UIRichText";
import UIWindow from "../../../framework/ui/UIWindow";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemCareerSkill")
@ccclass
export default class ListItemCareerSkill extends UIListItem {
    @autowired(UIImage) icon: UIImage = null;
    @autowired(UILabel) skillName: UILabel = null;
    @autowired(UILabel) kind: UILabel = null;
    @autowired(UIRichText) description: UIRichText = null;
    state: {
        id: number;
        kind: string;
    };
    setState(state: this["state"]): void {
        this.state = state;
        const tbl = GTable.getById("JobSkillTbl", this.state.id);
        this.icon.imgName = tbl.img;
        this.skillName.setText([tbl.name]);
        this.kind.setText([`ui/hero_skill_${this.state.kind}`]);
        this.description.setText([tbl.description]);
    }
}
