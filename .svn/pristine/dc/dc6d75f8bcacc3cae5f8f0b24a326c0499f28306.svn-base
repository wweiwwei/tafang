import { autowired, registerClass } from "../../../../framework/Decorator";
import UIButton from "../../../../framework/ui/UIButton";
import UIImage from "../../../../framework/ui/UIImage";
import UILabel from "../../../../framework/ui/UILabel";
import UIListItem from "../../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemBattleSkill")
@ccclass
export default class ListItemBattleSkill extends UIListItem {
    @autowired(UIImage) img: UIImage = null;
    @autowired(UIImage) kind: UIImage = null;
    @autowired(UIImage) kindBg: UIImage = null;
    @autowired(UILabel) lv: UILabel = null;
    @autowired(UIImage) mask: UIImage = null;
    @autowired(UIImage) imgBg: UIImage = null;
    @autowired(cc.Node) forbid: cc.Node = null;

    state: {
        id: number;
        img: string;
        progress: number;
        cb: Function;
        showImgBg?: boolean;
        forbid: boolean;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.forbid.active = state.forbid;
        this.imgBg.node.active = state.showImgBg;
        // console.log("state test=", state);
        const detailTbl = GTable.getById("RogueSkillDetailTbl", this.state.id);
        if (detailTbl) {
            // 当前有技能
            const tbl = GTable.getById("RogueSkillTbl", detailTbl.skillId);
            const kind = tbl.kind;

            this.kind.imgName = GConstant.kindIcon[kind - 1];
            this.kindBg.imgName = GConstant.kindBg[kind - 1];
            this.lv.setText(["_rsLv." + detailTbl.level]);
            // 伤害类型
        } else {
            // 当前这个位置没技能
            this.kindBg.imgName = "";
            this.img.imgName = "";
            this.kind.imgName = "";
            this.mask.fillRange = 0;
            this.lv.setText(["_rs"]);
            return;
        }
        this.node.getComponent(UIButton).onClick = () => {
            this.state.cb();
        };
        let progress = 1 - this.state.progress;
        if (progress > 1) {
            progress = 1;
        } else if (progress < 0) {
            progress = 0;
        }
        this.img.imgName = this.state.img;
        this.mask.fillRange = progress;
    }
}
