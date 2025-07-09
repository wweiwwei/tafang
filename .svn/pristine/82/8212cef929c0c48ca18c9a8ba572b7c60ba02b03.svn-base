import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemSkill")
@ccclass()
export default class ListItemSkill extends UIListItem {
    @autowired(UIImage) bg: UIImage = null;
    @autowired(UIImage) img: UIImage = null;
    @autowired(UILabel) level: UILabel = null;
    @autowired(UIImage) formated: UIImage = null;
    @autowired(UILabel) progressLabel: UILabel = null;
    @autowired(cc.ProgressBar) progress: cc.ProgressBar = null;
    state: {
        id: number;
        gray?: boolean;
        progress?: boolean;
        cb?: () => void;
        chosen?: boolean;
        disableBtn?: boolean;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.level.node.active = !this.state.gray;
        const sprite = GModel.sprite.getSpriteById(this.state.id);
        this.bg.imgName = GConstant.itemQualityBg[GTable.getById("ItemTbl", sprite.id).quality];
        this.bg.node.getComponent(UIButton).onClick = this.state.cb;
        this.bg.node.getComponent(UIButton).setEnable(!this.state.disableBtn);
        this.img.imgName = GTable.getById("ItemTbl", sprite.id).img;
        this.level.setText([GLang.code.ui.map_unlock_level, "_rs" + sprite.level]);
        this.formated.node.active = this.state.chosen;
        this.bg.node.color = this.state.chosen ? cc.color().fromHEX("#C1C1C1") : cc.color().fromHEX("#FFFFFF");
        this.img.node.color = this.bg.node.color;
        const uprankCost = sprite.uprankCost();
        this.progress.node.active = this.state.progress && uprankCost !== null;
        this.progress.progress = sprite.exp / (uprankCost ? uprankCost : 1);
        this.progressLabel.setText([`_rs${sprite.exp}/${uprankCost ? uprankCost : 1}`]);
        if (this.state.gray) {
            GUtils.ui.setAllChildSpGray(this.bg.node);
        } else {
            GUtils.ui.setAllChildSpNormal(this.bg.node);
        }
    }
}
