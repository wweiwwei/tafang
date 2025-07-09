import { autowired, message, registerClass } from "../../../framework/Decorator";
import { GameDate } from "../../../framework/date/GameDate";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UIListItem from "../../../framework/ui/UIListItem";
import EventName from "../../event/EventName";

const { ccclass } = cc._decorator;
@registerClass("ListItemBanquetMissionBtn")
@ccclass
export default class ListItemBanquetMissionBtn extends UIListItem {
    @autowired(UIButton) btn: UIButton = null;

    state: {
        num: number;
        curNum: number;
        text: string;
        cb: Function;
    };
    setState(state: this["state"]): void {
        this.state = state;

        this.btn.text.setText([state.text]);
        let color1: cc.Color = new cc.Color().fromHEX("#BAAF00");
        let color2: cc.Color = new cc.Color().fromHEX("#FFFFFF");
        if (state.num == state.curNum) {
            this.btn.bg.imgName = ""; //高亮选中
            this.btn.text.node.color = color1;
        } else {
            this.btn.bg.imgName = ""; //未选中
            this.btn.text.node.color = color2;
        }

        this.btn.onClick = () => {
            if (this.state.cb) state.cb(this.state.num);
        };
    }
}
