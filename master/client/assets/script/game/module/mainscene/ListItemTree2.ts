import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
import UIWindow from "../../../framework/ui/UIWindow";
import { Technology } from "../../entity/Technology";
import EventName from "../../event/EventName";
import WindowTree from "./WindowTree";
import WindowTreeNodeInfo from "./WindowTreeNodeInfo";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemTree2")
@ccclass
export default class ListItemTree2 extends UIListItem {
    @autowired(cc.Node) tips: cc.Node = null;
    @autowired(UIImage) icon: UIImage = null;
    @autowired(UILabel) nameLabel: UILabel = null;
    @autowired(UILabel) lv: UILabel = null;
    @autowired(UIButton) itemBtn: UIButton = null;
    /**最搞等级图标*/
    @autowired(cc.Node) max: cc.Node = null;
    /**等级进度 */
    @autowired(cc.Sprite) pbIcon: cc.Sprite = null;

    private technology: Technology = null;

    state: {
        id: number;
        isSetPos?: boolean;
    };

    inifItemPos() {
        const row = this.technology.getTbl().grid[0];
        const col = this.technology.getTbl().grid[1];

        this.node.y = -WindowTree.talentTree.height * (row - 1) - WindowTree.talentTree.top;
        this.node.x = WindowTree.talentTree.width * (col - 3);
        this.node.zIndex = this.node.y - 0.1 * this.node.x;
    }

    setState(state: this["state"]): void {
        this.state = state;
        this.technology = GState.data.techTree[this.state.id];

        this.itemBtn.onClick = () => {
            GWindow.open(WindowTreeNodeInfo, { id: this.state.id });
        };

        if (state.isSetPos) this.inifItemPos();
        this.icon.imgName = "";
        this.nameLabel.setText(["_rs" + this.state.id]);
        this.nameLabel.node.active = false;
        this.refItem();
    }

    @message([EventName.stateKey.techData, EventName.stateKey.techTree])
    refItem() {
        this.technology = GState.data.techTree[this.state.id];
        let unlock = this.technology.canUnlock();
        this.itemBtn.setGrey(!unlock);
        let isMaxLv = this.technology.isMaxLevel();

        this.tips.active = this.technology.canUnlock() && !isMaxLv;
        this.max.active = isMaxLv;
        this.lv.setText(["_rs" + this.technology.level + "/" + this.technology.getTbl().maxLevel]);

        let pbNum = this.technology.level / this.technology.getTbl().maxLevel;
        this.pbIcon.fillRange = pbNum * 0.8;
    }
}
