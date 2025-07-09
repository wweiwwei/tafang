import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UIListItem from "../../../framework/ui/UIListItem";
import EventName from "../../event/EventName";
import WindowPropHandbookDetails from "./WindowPropHandbookDetails";
import WindowPropHandbook from "./WindowPropHandbook";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemPropHandbook")
@ccclass
export default class ListItemPropHandbook extends UIListItem {
    @autowired(UIButton) iconBtn: UIButton = null;
    /**星星 */
    @autowired(cc.Node) star: cc.Node = null;
    /**可解锁提示 */
    @autowired(cc.Node) unlock: cc.Node = null;
    /**锁 */
    @autowired(UIImage) lock: UIImage = null;

    state: {
        part: number;
        id: number;
        isSetPos: boolean;
        isClick?: boolean;
    };

    private playerSkillTalentTbl: PlayerSkillTalentTbl = null;
    private equipment: EquipmentTbl = null;
    private colletionData: any = null;

    setState(state: this["state"]): void {
        this.state = state;
        this.colletionData = GModel.defendTower.getColletionData(state.part).find((d) => {
            return d.talentId == state.id;
        });
        this.equipment = GTable.getById("EquipmentTbl", this.colletionData.equipmentId);

        this.iconBtn.bg.imgName = this.equipment.img;

        this.iconBtn.node.parent.getComponent(UIButton).setGrey(this.colletionData.state == "notActive" ? true : false);
        this.unlock.active = this.colletionData.state == "canActive" ? true : false;
        this.lock.node.active = this.colletionData.state == "notActive" ? true : false;

        this.playerSkillTalentTbl = GTable.getById("PlayerSkillTalentTbl", state.id);

        this.iconBtn.onClick = () => {
            if (this.colletionData.state == "canActive") GModel.defendTower.activateColletion(this.equipment.id);
            else
                GWindow.open(WindowPropHandbookDetails, {
                    part: this.state.part,
                    equipmentId: this.equipment.id,
                    skillTalentTblId: state.id,
                });
        };

        if (state.isSetPos) this.inifItemPos();
        this.star.children.map((a, i) => {
            a.active = false;
            if (this.playerSkillTalentTbl.rank - 1 >= i) {
                a.active = true;
            }
        });
    }

    @message([EventName.stateKey.equipmentCollection])
    init() {
        this.colletionData = GModel.defendTower.getColletionData(this.state.part).find((d) => {
            return d.talentId == this.state.id;
        });
        this.iconBtn.setGrey(this.colletionData.state == "notActive" ? true : false);
        this.unlock.active = this.colletionData.state == "canActive" ? true : false;
    }

    inifItemPos() {
        const row = this.playerSkillTalentTbl.grid[0];
        const col = this.playerSkillTalentTbl.grid[1];

        this.node.y = -WindowPropHandbook.talentTree.height * (row - 1) - WindowPropHandbook.talentTree.top;
        this.node.x = WindowPropHandbook.talentTree.width * (col - 3);
        this.node.zIndex = this.node.y - 0.1 * this.node.x;
    }
}
