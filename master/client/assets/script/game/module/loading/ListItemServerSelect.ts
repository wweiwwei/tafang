import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemServerSelect")
@ccclass
export default class ListItemServerSelect extends UIListItem {
    @autowired(UIButton) btn: UIButton = null;
    // @autowired(UILabel) serverCode: UILabel = null;
    @autowired(UILabel) serverName: UILabel = null;
    @autowired(UILabel) serverState: UILabel = null;
    @autowired(UIImage) serverMark: UIImage = null;
    @autowired(UIImage) stateBg: UIImage = null;
    @autowired(UIImage) bg: UIImage = null;

    state: {
        serverName: string;
        serverState: number;
        serverCode: string;
        cb: Function;
        checked: boolean;
    };

    setState(state: this["state"]) {
        this.state = state;
        // this.serverCode.setText(["_rs" + state.serverCode]);
        this.serverName.setText(["_rs" + state.serverName]);
        const serverStateName = ["_rs无", "_rs畅通", "_rs爆满", "_rs维护"];
        this.serverState.setText([serverStateName[state.serverState]]);
        if (state.serverState > 1) {
            this.stateBg.imgName = "server_select_bg_red";
        } else {
            this.stateBg.imgName = "server_select_bg_green";
        }
        if (state.serverState === 2) {
            this.serverMark.imgName = "server_select_hot";
        } else {
            this.serverMark.imgName = "server_select_new";
        }

        this.bg.imgName = state.checked ? "common_encounter_bg3" : "common_encounter_bg2";
        this.btn.onClick = () => {
            this.state.cb();
        };
    }
}
