import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemSkill2")
@ccclass()
export default class ListItemSkill2 extends UIListItem {
    @autowired(UIImage) bg: UIImage = null;
    @autowired(UIImage) img: UIImage = null;
    @autowired(UILabel) level: UILabel = null;
    @autowired(UIImage) formated: UIImage = null;
    @autowired(UIButton) formate: UIButton = null;
    @autowired(UILabel) progressLabel: UILabel = null;
    @autowired(cc.ProgressBar) progress: cc.ProgressBar = null;
    state: {
        /**未解锁：-1，展示：0，方案：1，技能：2 */
        status: number;
        id: number;
        cb: () => void;
        chosen: boolean;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.level.node.active = this.state.status !== -1;
        this.formate.node.active = this.state.status !== -1 && this.state.status !== 0;
        this.img.node.active = this.state.status !== -1;
        this.progress.node.active = this.state.status === 2;
        if (this.state.status !== -1) {
            if (this.state.id === -1) {
                this.level.node.active = false;
                this.img.imgName = "";
                // this.bg.imgName=
                this.formate.bg.imgName = "new_common_+";
            } else {
                let skill = GModel.playerSkill.getSkillById(this.state.id);
                let pet = GModel.pet.getPetById(this.state.id);
                let item = skill ? skill : pet;
                // this.bg.imgName=GConstant.skillQuality[skill.getTbl().quality]
                this.img.imgName = item.getTbl().img + (skill ? "" : "_head");
                this.level.node.active = item.level > 0;
                this.level.setText(["_rslv." + item.level]);
                this.progress.progress = item.exp / item.nextLevelCost();
                this.progressLabel.setText([`_rs${item.exp}/${item.nextLevelCost()}`]);
                if (item.level > 0) {
                    this.formate.bg.imgName = this.state.chosen ? "new_common_-" : "new_common_+";
                    this.bg.node.color = cc.color(255, 255, 255, 255);
                    this.img.node.color = cc.color(255, 255, 255, 255);
                    this.formate.onClick = this.state.cb;
                } else {
                    this.formate.bg.imgName = "common_lock";
                    this.bg.node.color = cc.color(150, 150, 150, 255);
                    this.img.node.color = cc.color(150, 150, 150, 255);
                    this.formate.onClick = () => {
                        GTip.showTip([GLang.code.ui.notOwned]);
                    };
                }
            }
            this.formated.node.active = this.state.chosen && this.state.status === 2;
            this.node.getComponent(UIButton).onClick = () => {
                // GWindow.open(WindowSkillDescription);
            };
        } else {
            this.bg.imgName = "main_scene2_skill_lock";
        }
    }
}
