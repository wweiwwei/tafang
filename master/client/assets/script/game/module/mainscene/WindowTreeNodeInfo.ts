import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIWindow from "../../../framework/ui/UIWindow";
import EventName from "../../event/EventName";

const { ccclass, property } = cc._decorator;
@registerClass("WindowTreeNodeInfo", { preloadPrefab: ["ListItemTree"] })
@ccclass
export default class WindowTreeNodeInfo extends UIWindow {
    _windowParam: {
        id: number;
    };
    _returnValue: any;
    @autowired(UIButton) closeBtn: UIButton = null;
    /**图片 */
    @autowired(UIImage) icon: UIImage = null;
    /**品质 */
    @autowired(UIImage) itemBtn: UIImage = null;
    /**等级 */
    @autowired(UILabel) lv: UILabel = null;
    /**名称 */
    @autowired(UILabel) nameLabel: UILabel = null;
    /**属性1 */
    @autowired(UILabel) attribute: UILabel = null;

    protected onInited(): void {
        this.node.getComponent(UIButton).onClick = () => {
            this.close();
        };
        this.node.getComponent(UIButton).setTransition(false);
        let tbl = GState.data.techTree[this._windowParam.id];
        this.nameLabel.setText([tbl.getTbl().name]);
        this.lv.setText(["_rslv." + tbl.level]);
        this.icon.imgName = tbl.getTbl().img;
        let index = tbl.getTbl().levelRange.findIndex((t) => tbl.level <= t);
        this.itemBtn.imgName = GConstant.itemQualityBg[tbl.getTbl().quality[index] - 1];
        this.refItem();
    }

    @message([EventName.stateKey.techData, EventName.stateKey.techTree])
    refItem() {
        let tbl = GState.data.techTree[this._windowParam.id];
        this.attribute.setText(
            ...tbl
                .getProperty()
                .map((d) => [
                    [GIndex.battle.propertyText(d.property)],
                    ["_rs+" + GIndex.battle.propertyShowMethod(d.property)(d.value)],
                ])
                .reduce((p, c) => p.concat(c), [])
        );
    }
}
