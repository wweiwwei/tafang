import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
import UIRichText from "../../../framework/ui/UIRichText";
import UIWindow from "../../../framework/ui/UIWindow";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemTalent")
@ccclass
export default class ListItemTalent extends UIListItem {
    @autowired(UIImage) bg: UIImage = null;
    @autowired(UIImage) chosen: UIImage = null;
    @autowired(UIImage) icon: UIImage = null;
    @autowired(UILabel) level: UILabel = null;
    @autowired(UILabel) talentName: UILabel = null;
    state: {
        id: number;
        cb: () => void;
        chosen: boolean;
    };
    setState(state: this["state"]): void {
        this.state = state;
        const talent = GState.data.careerTalent[this.state.id];
        this.bg.imgName = talent.level > 0 ? "item_bg_gold" : "item_bg_gray";
        this.icon.imgName = talent.getTbl().img;
        talent.level <= 0 && GUtils.ui.setAllChildSpGray(this.icon.node);
        talent.level > 0 && GUtils.ui.setAllChildSpNormal(this.icon.node);
        this.talentName.setText([talent.getTbl().talentName]);
        this.level.setText([`_rs${talent.level}/${talent.getTbl().limit}`]);
        this.node.getComponent(UIButton).onClick = this.state.cb;
        this.chosen.node.active = this.state.chosen;
    }
    setChosen() {
        this.chosen.node.active = true;
        this.scheduleOnce(() => {
            this.chosen.node.active = false;
        }, 0.4);
    }
    playAni() {
        this.chosen.node.active = true;
        this.chosen.node.getComponent(cc.Animation).play();
    }
}
