import { autowired, message, registerClass } from "../../../framework/Decorator";
import { GameDate } from "../../../framework/date/GameDate";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UIListItem from "../../../framework/ui/UIListItem";
import EventName from "../../event/EventName";

const { ccclass } = cc._decorator;
@registerClass("ListItemBanquetMissionDayBtn")
@ccclass
export default class ListItemBanquetMissionDayBtn extends UIListItem {
    /**完成图标 */
    @autowired(UIImage) tips: UIImage = null;
    /**前往按钮 */
    @autowired(UIButton) btn: UIButton = null;
    /**前往按钮 */
    @autowired(UIImage) lock: UIImage = null;

    state: {
        day: number;
        curDay: number;
        cb: Function;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.refRed();
        let lock = GameDate.now() - GState.data.banquetData.beginTime <= (state.day - 1) * GameDate.OneDay;
        this.lock.node.active = lock;

        let color1: cc.Color = new cc.Color().fromHEX("#BAAF00");
        let color2: cc.Color = new cc.Color().fromHEX("#FFFFFF");
        if (state.day == state.curDay) {
            this.btn.bg.imgName = ""; //高亮选中
            this.btn.text.node.color = color1;
        } else {
            this.btn.bg.imgName = ""; //未选中
            this.btn.text.node.color = color2;
        }

        this.btn.text.setText([GLang.code.ui.banquet_dnt, "_rs" + state.day]);

        this.btn.onClick = () => {
            if (lock) {
                GTip.showTip([GLang.code.ui.banquet_dntNodeLock]);
                return;
            }
            if (this.state.cb) state.cb(this.state.day);
        };
    }

    @message([EventName.stateKey.banquetMission])
    refRed() {
        let showTips = false;
        GModel.banquet.getMissionList(this.state.day).map((d) => {
            if (d.progress > d.getRequire()) showTips = true;
        });

        this.tips.node.active = showTips;
    }
}
