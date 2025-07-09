import { autowired, message, registerClass } from "../../../framework/Decorator";
import { GameDate } from "../../../framework/date/GameDate";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UIListItem from "../../../framework/ui/UIListItem";
import EventName from "../../event/EventName";

const { ccclass } = cc._decorator;
@registerClass("ListItemBanquetGroupDayBtn")
@ccclass
export default class ListItemBanquetGroupDayBtn extends UIListItem {
    @autowired(UIButton) btn: UIButton = null;

    state: {
        day: number;
        curDay: number;
        cb: Function;
    };
    setState(state: this["state"]): void {
        this.state = state;

        this.btn.text.setText([GLang.code.ui.banquet_dnt, "_rs" + state.day]);
        let color1: cc.Color = new cc.Color().fromHEX("#BAAF00");
        let color2: cc.Color = new cc.Color().fromHEX("#FFFFFF");
        if (state.day == state.curDay) {
            this.btn.bg.imgName = ""; //高亮选中
            this.btn.text.node.color = color1;
        } else {
            this.btn.bg.imgName = ""; //未选中
            this.btn.text.node.color = color2;
        }

        this.btn.onClick = () => {
            if (this.state.cb) state.cb(this.state.day);
        };
    }
}
