import { autowired, registerClass } from "../../../../framework/Decorator";
import UIButton from "../../../../framework/ui/UIButton";
import UIImage from "../../../../framework/ui/UIImage";
import UILabel from "../../../../framework/ui/UILabel";
import UIListItem from "../../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemRogueBless")
@ccclass
export default class ListItemRogueBless extends UIListItem {
    /** */
    @autowired(UIButton) click: UIButton = null;
    @autowired(UILabel) nameLab: UILabel = null;
    @autowired(UILabel) desc: UILabel = null;
    @autowired(UIImage) img: UIImage = null;
    /**确认 */
    @autowired(UIButton) confirm: UIButton = null;
    /**高亮*/
    @autowired(UIImage) high: UIImage = null;
    /**流派 */
    @autowired(UIImage) series: UIImage = null;
    @autowired(UILabel) seriesName: UILabel = null;

    state: {
        index: number;
        id: number;
        cb: Function;
        playAnim?: boolean;
        touchIndex: number;
        touchCb: Function;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.high.node.active = false;
        this.confirm.node.active = false;

        const tbl = GTable.getById("RogueBlessTbl", this.state.id);
        this.img.imgName = tbl.img;
        this.series.imgName = "battle_bless_type" + tbl.series;
        this.seriesName.setText([tbl.seriesName]);
        if (state.touchIndex == state.index) {
            this.high.node.active = true;
            this.confirm.node.active = true;
        }
        this.click.onClick = () => {
            state.touchCb(state.index);
        };
        this.confirm.onClick = () => {
            this.state.cb();
            this.high.node.active = true;
        };

        this.nameLab.setText([tbl.name]);
        this.desc.setText([tbl.description]);
    }
}
