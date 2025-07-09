import { autowired, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UIWindow from "../../../framework/ui/UIWindow";
import ListItemFacilityItem from "./ListItemFacilityItem";

const { ccclass, property } = cc._decorator;
@registerClass("WindowFacilityList")
@ccclass
export default class WindowFacilityList extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
        hideMainScene: true,
    };
    @autowired(UIButton) return: UIButton = null;
    @autowired(UIScrollList) ItemsContainer: UIScrollList<ListItemFacilityItem> = null;
    _windowParam: any;
    _returnValue: any;
    protected onInited(): void {
        this.return.onClick = () => {
            this.close();
        };
        let state = GModel.facility
            .getAllFacility()
            .sort((a, b) => a.getTbl().captainRankRequire - b.getTbl().captainRankRequire)
            .map((t) => {
                return { id: t.id };
            });
        this.ItemsContainer.setState(state);
    }
}
