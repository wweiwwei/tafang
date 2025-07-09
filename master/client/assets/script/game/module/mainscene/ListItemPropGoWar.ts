import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import ListItemPropItem from "../mainsceneNew/ListItemPropItem";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemPropGoWar")
@ccclass
export default class ListItemPropGoWar extends UIListItem {
    /**触碰节点 */
    @autowired(UIButton) clickBtn: UIButton = null;
    /**item */
    @autowired(UIList) uiList: UIList<ListItemPropItem> = null;
    /**出战提示 */
    @autowired(UILabel) isGoPwarTips: UILabel = null;
    /**名称 */
    @autowired(UILabel) nameLab: UILabel = null;
    /**高亮 */
    @autowired(UIImage) high: UIImage = null;

    state: {
        part: number;
        index: number;
        clickFunc: Function;
        isShowHigh?: boolean;
    };
    setState(state: this["state"]): void {
        this.state = state;

        this.clickBtn.onClick = () => {
            if (state.clickFunc) state.clickFunc(state.part, state.index);
        };
        this.high.node.active = state.isShowHigh ? true : false;

        if (state.part < 0) {
            this.nameLab.setText([""]);
            this.isGoPwarTips.setText([""]);
            return;
        }

        this.clickBtn.bg.imgName = state.isShowHigh ? "common_tower_formate2" : "common_tower_formate1";

        let pe = GModel.playerEquipment.equipment()[state.part];

        this.nameLab.setText([pe.tbl().name]);
        this.nameLab.node.color = GConstant.qualityColor[pe.tbl().quality];
        this.isGoPwarTips.setText(["_rs出战"]);

        this.uiList.setState([
            {
                playerEquipment: pe,
                // part: state.part,
                tempIndex: this.state.part,
            },
        ]);
    }
}
