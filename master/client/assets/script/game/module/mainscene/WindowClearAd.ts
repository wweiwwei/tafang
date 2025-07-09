import { autowired, message, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIWindow from "../../../framework/ui/UIWindow";
import EventName from "../../event/EventName";
import ListItemClearAd from "./ListItemClearAd";

const { ccclass, property } = cc._decorator;

@registerClass("WindowClearAd")
@ccclass
export default class WindowClearAd extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: any;
    _returnValue: any;
    @autowired(UIList) signingPermissionList: UIList<ListItemClearAd> = null;
    @autowired(UIButton) closeBtn: UIButton = null;
    @autowired(UIButton) signingBtn: UIButton = null;
    @autowired(UILabel) activityTime: UILabel = null;
    @autowired(UILabel) count: UILabel = null;
    @autowired(UILabel) price: UILabel = null;
    @autowired(UILabel) rewardCount: UILabel = null;
    protected onInited(): void {
        this.closeBtn.setTransition(false);
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.windowInit();
    }
    @message([EventName.stateKey.charge])
    windowInit() {
        this.signingBtn.setEnable(!GModel.charge.isClearAd());
        this.signingBtn.onClick = () => {
            // GModel.charge.pay(GConstant.monthCardId,"")
            GModel.charge.pay(GConstant.clearAdId, "");
        };
        let count = GTable.getById("ClearAdTbl", GConstant.clearAdId).reward[0][1];
        this.count.setText(["_rs" + count]);
        this.price.setText(["_rs￥" + GTable.getById("ChargeTbl", GConstant.clearAdId).cny / 100]);
        this.rewardCount.setText([GLang.code.ui.reward], ["_rs" + count], [GLang.code.table_item.pink_diamond]);
        let state: ListItemClearAd["state"][] = [
            { imgName: "", text1: "_rstext", text2: "_rstext" },
            { imgName: "", text1: "_rstext", text2: "_rstext" },
            { imgName: "", text1: "_rstext", text2: "_rstext" },
            { imgName: "", text1: "_rstext", text2: "_rstext" },
        ].map((t, index) => {
            if (index === 0 || index % 2 === 0) t.imgName = "ad_item1";
            else t.imgName = "ad_item2";
            return t;
        });
        this.activityTime.setText(["ui/activityTime", "_rs14"]);
        // this.signingPermissionList.setState(state);
    }
}
