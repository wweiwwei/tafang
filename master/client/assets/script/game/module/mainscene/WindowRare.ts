import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIWindow from "../../../framework/ui/UIWindow";
import EventName from "../../event/EventName";
import UIList from "../../../framework/ui/UIList";
import UILabel from "../../../framework/ui/UILabel";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import ListItemRare from "./ListItemRare";

const { ccclass, property } = cc._decorator;
@registerClass("WindowRare")
@ccclass
export default class WindowRare extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: any;
    _returnValue: any;
    /**概率列表 */
    @autowired(UIList) property: UIList<ListItemRare> = null;
    @autowired(UILabel) level: UILabel = null;
    @autowired(UILabel) nextLevel: UILabel = null;

    protected onInited(): void {
        this.node.getComponent(UIButton).onClick = () => {
            this.close();
        };
        this.node.getComponent(UIButton).setTransition(false);
        this.initProperty();
        this.level.setText([GLang.code.ui.setRank_rankN, "_rs" + GState.data.towerWashData.washLevel]);
        this.nextLevel.setText([GLang.code.ui.next_level, "_rs" + [GState.data.towerWashData.washLevel + 1]]);
        this.nextLevel.node.active = !GModel.playerEquipment.isMaxWashLevel();
    }
    @message([EventName.stateKey.playerEquipmentPlace])
    initProperty() {
        const tbl = GTable.getList("TowerWashRareTbl").find((t) => t.level === GState.data.towerWashData.washLevel);
        const next = GTable.getList("TowerWashRareTbl").find(
            (t) => t.level === GState.data.towerWashData.washLevel + 1
        );
        this.property.setState(
            tbl.rare.map((t, i) => {
                return {
                    rare: GUtils.ui.getFixed(t / 100, 2) + "%",
                    nextRare: next ? GUtils.ui.getFixed(next.rare[i] / 100, 2) + "%" : "",
                    quality: i,
                };
            })
        );
    }
}
