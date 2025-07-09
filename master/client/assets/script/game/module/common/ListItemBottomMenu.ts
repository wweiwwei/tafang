import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemBottomMenu")
@ccclass
export default class ListItemBottomMenu extends UIListItem {
    @autowired(UIImage) icon: UIImage = null;
    @autowired(UIButton) btn: UIButton = null;
    @autowired(UIImage) bg: UIImage = null;
    @autowired(UIImage) effect: UIImage = null;
    @autowired(UIImage) exclamation: UIImage = null;
    @autowired(UILabel) label: UILabel = null;

    state: {
        id: number;
        cb: () => void;
        selected: boolean;
        /**是否置灰 */
        status: boolean;
        show: number;
        info?: { img: string; text: string; currentWarId: number; cb: Function };
    };
    setState(state: this["state"]): void {
        this.state = state;
        let tbl = GTable.getById("UIMainSceneTbl", this.state.id);
        this.exclamation.node.active = this.state.show === 1;
        this.bg.imgName = "new_common_bg2";
        this.bg.node.setPosition(cc.v2(0, -3));
        this.btn.setGrey(this.state.status);
        this.node.name = this.state.id.toString();
        this.btn.onClick = this.state.cb;
        this.bg.imgName = this.state.selected ? "new_common_bg2" : "new_common_bg2";

        if (!state.info) {
            this.node.name = this.state.id.toString();
            let img = GTable.getById("UIMainSceneTbl", this.state.id).img;
            let label = GTable.getById("UIMainSceneTbl", this.state.id).text;
            this.icon.imgName = img;
            this.label.setText([label]);

            this.btn.onClick = () => {
                this.state.cb();
            };
            this.effect.imgName = this.state.selected ? "mainscene_btn_bgchosen2" : "";
        } else {
            this.icon.imgName = this.state.info.img;
            this.label.setText([this.state.info.text]);
            this.btn.onClick = () => {
                state.info.cb(this.state.id);
            };
            this.effect.imgName = this.state.id == state.info.currentWarId ? "mainscene_btn_bgchosen2" : "";
        }
    }

    // @message([EventName.redTipRefresh])
    // refreshRedTip() {
    //     const tbl = GTable.getById("UIMainSceneTbl", this.state.id);
    //     this.exclamation.active = GModel.redTip.getRed(tbl.redTip) > 0;
    // }
}
