import { autowired, registerClass } from "../../../framework/Decorator";
import { GameDate } from "../../../framework/date/GameDate";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import ListItemUserInfoItem from "../common/ListItemUserInfoItem";
import WindowFriendDetail from "./WindowFriendDetail";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemPropSwitemDetails")
@ccclass
export default class ListItemPropSwitemDetails extends UIListItem {
    /** */
    @autowired(UIButton) clickNode: UIButton = null;
    @autowired(UIButton) active: UIButton = null;
    @autowired(UIImage) upgrade: UIImage = null;
    /**技能图片 */
    @autowired(UIImage) icon: UIImage = null;
    /**技能名字 */
    @autowired(UILabel) nameLab: UILabel = null;
    /**升级提示 */
    @autowired(UILabel) updateTips: UILabel = null;
    @autowired(UILabel) updateTips2: UILabel = null;
    /**天赋描述 */
    @autowired(UILabel) tips: UILabel = null;
    @autowired(UILabel) lv: UILabel = null;
    @autowired(UIImage) switch: UIImage = null;

    private touchIndex: number = 0;
    private data: any = null;

    state: {
        part: number;
        index: number;
    };

    setState(state: this["state"]): void {
        this.active.setTransition(false);
        this.state = state;
        this.clickNode.onClick = () => {
            if (this.data.state == "hasActive") {
                GTip.showTip(["_rs该天赋已激活"]);
                return;
            }
            GModel.defendTower.upgradeTalent(this.state.part, this.touchIndex);
        };
        this.refUi();
    }

    refUi() {
        this.active.node.active = false;
        let data = GModel.defendTower.getTowerTalentData(this.state.part)[this.state.index];
        this.data = data;
        let tbl = GTable.getById("PlayerSkillTalentTbl", data.talentId);
        let eTbl = GTable.getById("EquipmentTbl", data.equipmentId);
        let nextTbl = GTable.getList("PlayerSkillTalentTbl").find(
            (t) => t.rank === (data.state === "canActive" || data.state === "notActive" ? 0 : tbl.rank) + 1
        );

        this.touchIndex = data.index;
        this.icon.imgName = eTbl.img;
        this.lv.setText(["_rsLv." + tbl.rank]);
        this.nameLab.setText([tbl.name]);
        this.updateTips.setText(
            nextTbl
                ? [
                      data.state === "canActive" || data.state === "notActive"
                          ? GLang.code.ui.PropSwitemDetails_unlockTips
                          : GLang.code.ui.PropSwitemDetails_updateTips,
                      GConstant.qualityLabel[nextTbl.needQuality],
                      eTbl.name,
                  ]
                : [GLang.code.ui.maxlevel]
        );
        this.updateTips2.setText([this.updateTips.multiLanguageKey]);
        this.tips.setText([tbl.description]);
        this.clickNode.getComponent(UIImage).imgName =
            data.state == "notActive" || data.state === "canActive"
                ? "new_common_talent_bg_lock"
                : "new_common_talent_bg_unlock";

        if (data.state === "canActive") {
            this.active.node.active = true;
            this.active.bg.imgName = "common_green_title";
            this.active.text.setText(["_rs可激活"]);
        } else if (data.state == "hasActive") {
            this.active.node.active = true;
            this.active.bg.imgName = "common_green_title";
            this.active.text.setText(["_rs已激活"]);
        }

        this.upgrade.node.active = data.state === "canUpgrade";
        // this.switch.node.active = data.state == "hasActive" ? true : false;
    }
}
