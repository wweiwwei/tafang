import { autowired, message, registerClass } from "../../../framework/Decorator";
import EventBus from "../../../framework/event/EventBus";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UIWindow from "../../../framework/ui/UIWindow";
import EventName from "../../event/EventName";
import ListItemStage from "./ListItemStage";

const { ccclass, property } = cc._decorator;
@registerClass("WindowStage")
@ccclass
export default class WindowStage extends UIWindow {
    _windowParam: any;
    _returnValue: any;
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.no,
        hideMainScene: false,
    };
    @autowired(UIScrollList) instanceList: UIScrollList<ListItemStage> = null;

    protected onInited(): void {
        EventBus.emit(EventName.openWindowStage);
        this.node.zIndex = -1;
        this.refresh();
    }

    @message([EventName.stateKey.stage])
    refresh() {
        const tblList = GTable.getList("StageMapTbl");
        this.instanceList.setState(
            tblList.map((t) => {
                return {
                    mapIndex: t.mapIndex,
                };
            })
        );
    }
}
