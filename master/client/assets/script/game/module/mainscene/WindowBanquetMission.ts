import { autowired, message, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIRichText from "../../../framework/ui/UIRichText";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UIWindow from "../../../framework/ui/UIWindow";
import EventName from "../../event/EventName";
import ListItemBanquetMission from "./ListItemBanquetMission";
import ListItemBanquetMissionDayBtn from "./ListItemBanquetMissionDayBtn";

const { ccclass, property } = cc._decorator;
@registerClass("WindowBanquetMission")
@ccclass
export default class WindowBanquetMission extends UIWindow {
    _windowParam: any;
    _returnValue: any;
    /** */
    @autowired(UIScrollList) uiScrollList: UIScrollList<ListItemBanquetMission> = null;
    @autowired(UIList) dayBtnUiList: UIList<ListItemBanquetMissionDayBtn> = null;

    /**返回按钮 */
    @autowired(UIButton) closeBtn: UIButton = null;

    private curDayNum: number = 1;
    protected onInited(): void {
        this.refItem();

        this.closeBtn.onClick = () => {
            this.close();
        };
        this.refBtnItem();
    }

    refBtnItem() {
        let state = [];
        let tbls = GTable.getList("BanquetMissionTbl");
        let maxDay = tbls[tbls.length - 1].day;
        for (let i = 0; i < maxDay; i++) {
            state.push({
                day: i + 1,
                curDay: this.curDayNum,
                cb: (touchDay) => {
                    this.curDayNum = touchDay;
                    this.refItem();
                    this.refBtnItem();
                },
            });
        }
        this.dayBtnUiList.setState(state);
    }

    @message([EventName.stateKey.banquetMission])
    refItem() {
        // return;
        let d = [];
        GTable.getList("BanquetMissionTbl").map((t) => {
            if (t.day == this.curDayNum) {
                d.push({
                    id: t.id,
                });
            }
        });
        this.uiScrollList.setState(d);
    }
}
