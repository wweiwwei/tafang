import { autowired, message, registerClass } from "../../../framework/Decorator";
import { GameDate } from "../../../framework/date/GameDate";
import EventBus from "../../../framework/event/EventBus";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIRichText from "../../../framework/ui/UIRichText";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UIWindow from "../../../framework/ui/UIWindow";
import EventName from "../../event/EventName";
import ListItemItem from "../common/ListItemItem";
import ListItemInstance from "./ListItemInstance";

const { ccclass, property } = cc._decorator;
@registerClass("WindowInstance")
@ccclass
export default class WindowInstance extends UIWindow {
    _windowParam: any;
    _returnValue: any;
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.no,
    };
    @autowired(UILabel) remainTime: UILabel = null;
    @autowired(UIScrollList) instanceList: UIScrollList<ListItemInstance> = null;

    protected onInited(): void {
        EventBus.emit(EventName.hideMainSceneLeftMenuUi, false);
        this.node.zIndex = -1;
        this.refresh();
        this.refreshTime();
        this.schedule(this.refreshTime, 1);
    }

    protected onRecycle(): void {
        this.unscheduleAllCallbacks();
    }

    refreshTime() {
        const time = new GameDate(GameDate.nowUpdated()).todayRemainMillisecond();
        this.remainTime.setText(["_rs" + GUtils.date.formatRemainTime(time, "hh:mm:ss")]);
    }

    refresh() {
        const tblList = GTable.getList("UIMainSceneTbl").filter((t) => t.position === 10);
        this.instanceList.setState(
            tblList.map((t) => {
                return {
                    id: t.id,
                };
            })
        );
    }

    protected onDisable(): void {
        EventBus.emit(EventName.hideMainSceneLeftMenuUi, true);
    }
}
