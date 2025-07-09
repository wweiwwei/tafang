import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
import EventName from "../../event/EventName";
import WindowAddPower from "./WindowAddPower";
import WindowDiamondShop from "./WindowDiamondShop";
const { ccclass, property } = cc._decorator;
@registerClass("ListItemCurrencyTop")
@ccclass
export default class ListItemCurrencyTop extends UIListItem {
    /**银 */
    @autowired(UIButton) silverBtn: UIButton = null;
    /**玉数量 */
    @autowired(UIButton) jadeBtn: UIButton = null;
    /**体力数量 */
    @autowired(UIButton) powerBtn: UIButton = null;
    @autowired(UILabel) powerTime: UILabel = null;

    state: {};
    setState(state: this["state"]): void {
        this.state = state;
        // this.state.unlockable = true;
        this.silverBtn.onClick = () => {
            GWindow.open(WindowDiamondShop);
        };
        this.jadeBtn.onClick = () => {
            GWindow.open(WindowDiamondShop);
        };
        this.powerBtn.onClick = () => {
            GWindow.open(WindowAddPower);
        };

        this.refresh();
        this.schedule(this.refreshTime, 1);
    }
    @message([EventName.stateKey.storage, EventName.stateKey.powerData])
    refresh() {
        const powerInfo = GModel.power.powerInfo();
        this.powerBtn.text.setText([`_rs${powerInfo.power}/${powerInfo.maxPower}`]);
        this.jadeBtn.text.setText([
            "_rs" + GUtils.ui.getNumberString(GModel.knapsack.getStorageById(GIndex.id.diamondId), 7),
        ]);
        this.silverBtn.text.setText([
            "_rs" + GUtils.ui.getNumberString(GModel.knapsack.getStorageById(GIndex.id.coinId), 7),
        ]);
        this.refreshTime();
    }

    refreshTime() {
        const powerInfo = GModel.power.powerInfo();
        if (powerInfo.power === powerInfo.maxPower) {
            this.powerTime.node.active = false;
        } else {
            this.powerTime.node.active = true;
            const time = powerInfo.refreshRemain > 0 ? powerInfo.refreshRemain : 0;
            this.powerTime.setText(["_rs" + GUtils.date.formatRemainTime(time, "mm:ss")]);
        }
    }
}
