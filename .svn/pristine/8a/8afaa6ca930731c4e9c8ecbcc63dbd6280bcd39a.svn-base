import { autowired, message, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIList from "../../../framework/ui/UIList";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UIWindow from "../../../framework/ui/UIWindow";
import EventName from "../../event/EventName";
import ListItemBanquetGroup from "./ListItemBanquetGroup";
import ListItemBanquetGroupDayBtn from "./ListItemBanquetGroupDayBtn";

const { ccclass, property } = cc._decorator;
@registerClass("WindowBanquetGroup")
@ccclass
export default class WindowBanquetGroup extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };

    _windowParam: any;
    _returnValue: any;
    /**列表 */
    @autowired(UIScrollList) uiScrollList: UIScrollList<ListItemBanquetGroup> = null;
    @autowired(UIList) dayBtnList: UIList<ListItemBanquetGroupDayBtn> = null;
    /**返回按钮 */
    @autowired(UIButton) closeBtn: UIButton = null;

    private dayArr: Array<number> = [];

    private curDayNum = 0;
    protected onInited(): void {
        GTable.getList("BanquetGroupTbl").map((t) => {
            if (!this.dayArr.includes(t.day)) this.dayArr.push(t.day);
        });
        this.curDayNum = this.dayArr[0];
        this.refItem();
        this.refDay();

        this.closeBtn.onClick = () => {
            this.close();
        };
    }

    refDay() {
        let a = this.dayArr.map((d) => {
            return {
                day: d,
                curDay: this.curDayNum,
                cb: (day) => {
                    this.curDayNum = day;
                    this.refDay();
                    this.refItem();
                    this.uiScrollList.getComponent(cc.ScrollView).scrollToTop();
                },
            };
        });
        this.dayBtnList.setState(a);
    }

    @message([EventName.stateKey.banquetData])
    refItem() {
        let a = [];
        GTable.getList("BanquetGroupTbl").map((t) => {
            if (t.day == this.curDayNum) a.push({ type: 1, id: t.id });
        });
        this.uiScrollList.setState(a);
        // this.togColor();
    }
}
