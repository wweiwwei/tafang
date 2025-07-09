import { autowired, message, registerClass } from "../../../framework/Decorator";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
const { ccclass, property } = cc._decorator;
@registerClass("ListItemDialogue")
@ccclass
export default class ListItemDialogue extends UIListItem {
    @autowired(UILabel) text: UILabel = null;
    @autowired(cc.Node) nameBg: cc.Node = null;
    @autowired(cc.Node) dialogueBg: cc.Node = null;
    @autowired(UILabel) nameLabel: UILabel = null;

    state: { id: number };
    setState(state: this["state"]): void {
        this.state = state;
        const tbl = GTable.getById("DialogueContentTbl", state.id);
        this.text.setText([tbl.content]);
        const roleName = GTable.getList("HeroTbl").find((v) => v.img === tbl.role).name;
        this.nameLabel.setText([roleName]);
        if (tbl.rolePos === 1) {
            this.dialogueBg.scaleX = -1;
            this.nameBg.x = -105;
            this.node.x = -150;
        } else {
            this.dialogueBg.scaleX = 1;
            this.nameBg.x = 105;
            this.node.x = 150;
        }
    }
}
