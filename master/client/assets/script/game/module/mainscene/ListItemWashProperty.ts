import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemWashProperty")
@ccclass
export default class ListItemWashProperty extends UIListItem {
    @autowired(UILabel) property: UILabel = null;
    /**最大值 */
    @autowired(UILabel) max: UILabel = null;
    /**品质 */
    @autowired(UIImage) quality: UIImage = null;
    /**背景 */
    @autowired(UIImage) bg: UIImage = null;
    /**锁定按钮 */
    @autowired(UIButton) lock: UIButton = null;

    private color = [
        cc.color(193, 193, 193),
        cc.color(107, 218, 159),
        cc.color(168, 203, 233),
        cc.color(242, 185, 240),
        cc.color(255, 235, 88),
        cc.color(255, 186, 88),
        cc.color(246, 112, 85),
        cc.color(245, 57, 101),
        cc.color(152, 135, 223),
    ];
    state: {
        max: string;
        string: string[][];
        quality: number;
        locked: boolean;
        isPlayAni?: boolean;
        cb?: () => void;
    };
    setState(state: this["state"]): void {
        this.state = state;
        if (this.state.max === "") {
            this.max.setText([]);
        } else {
            this.quality.imgName = GConstant.towerPropertyQuality[this.state.quality];
            this.max.setText([`_rs（${this.state.max}）`]);
            this.max.node.color = this.color[this.state.quality];
        }
        this.property.setText(...this.state.string);
        this.lock.onClick = this.state.cb;
        this.quality.node.active = this.state.max !== "";
        this.bg.imgName = this.state.locked ? "tower_place_property_bg_locked" : "tower_place_property_bg";

        let btn = this.node.getComponent(UIButton);
        btn.setTransition(false);
        btn.onClick = () => {
            if (this.state.locked) {
                GTip.showTip(["_rs词条已锁定"]);
            }
        };
        this.lock.bg.imgName = this.state.locked ? "common_locked" : "common_unlock";
        if (state.isPlayAni) this.playAni();
    }

    playAni() {
        this.node.getChildByName("Wash_Effect").getComponent(cc.Animation).play();
        this.node.getChildByName("WashAll_Effect").getComponent(cc.Animation).play();
    }
}
