import { autowired, registerClass } from "../../../../framework/Decorator";
import UIButton from "../../../../framework/ui/UIButton";
import UIImage from "../../../../framework/ui/UIImage";
import UILabel from "../../../../framework/ui/UILabel";
import UIListItem from "../../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemBattleExSkill")
@ccclass
export default class ListItemBattleExSkill extends UIListItem {
    @autowired(UIImage) img: UIImage = null;
    @autowired(UIImage) kind: UIImage = null;
    @autowired(UIImage) kindBg: UIImage = null;
    @autowired(UILabel) progress: UILabel = null;
    @autowired(UIImage) mask: UIImage = null;
    /** 特效节点 */
    @autowired(cc.Node) effect: cc.Node = null;
    state: {
        id: number;
        img: string;
        progress: number;
        require: number;
        cb: Function;
    };
    setState(state: this["state"]): void {
        this.state = state;
        const tbl = GTable.getById("RogueExSkillTbl", this.state.id);
        // 当前有技能
        const kind = tbl.kind;
        this.kind.imgName = GConstant.kindIcon[kind - 1];
        this.kindBg.imgName = "battle_ExSkill_bg"; //GConstant.kindBg[kind - 1];
        this.node.getComponent(UIButton).onClick = () => {
            this.state.cb();
        };
        this.img.imgName = this.state.img;
        this.mask.fillRange = 0;
        this.progress.setText([
            `_rs${this.state.progress > this.state.require ? this.state.require : this.state.progress}/${
                this.state.require
            }`,
        ]);
        this.effect.active = this.state.progress >= this.state.require;
    }
}
