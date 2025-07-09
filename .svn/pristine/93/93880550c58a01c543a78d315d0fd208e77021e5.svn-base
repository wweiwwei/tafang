import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
import UIWindow from "../../../framework/ui/UIWindow";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemPvpItem1")
@ccclass
export default class ListItemPvpItem1 extends UIListItem {
    /** 按钮 */
    @autowired(UIButton) btn: UIButton = null;
    /** 技能图片 */
    @autowired(UIImage) icon: UIImage = null;
    /** 技能名字 */
    @autowired(UILabel) nameLab: UILabel = null;
    state: {
        id: number;
    };
    setState(state: this["state"]): void {
        this.state = state;
        const tbl = GTable.getById("PlayerSkillTalentTbl", this.state.id);
        const equipmentId = GIndex.id.talentToEquipmentId[tbl.id];
        let eTbl = GTable.getById("EquipmentTbl", equipmentId);
        this.nameLab.setText([tbl.name]);
        this.icon.imgName = eTbl.img;
        this.btn.onClick = () => {
            GBattlePvpManager.chooseCard(this.state.id);
        };
    }
}
