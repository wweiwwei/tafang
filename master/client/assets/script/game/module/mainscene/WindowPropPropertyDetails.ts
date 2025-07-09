import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIWindow from "../../../framework/ui/UIWindow";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIList from "../../../framework/ui/UIList";
import ListItemPropertyTipsItem from "../common/ListItemPropertyTipsItem";

const { ccclass, property } = cc._decorator;

@registerClass("WindowPropPropertyDetails")
@ccclass
export default class WindowPropPropertyDetails extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: { pos?: cc.Vec3; key: string };
    _returnValue: { change: boolean };
    /** */
    @autowired(UIButton) closeBtn: UIButton = null;
    @autowired(UILabel) title: UILabel = null;
    /**限购 */
    @autowired(UIList) uiList: UIList<ListItemPropertyTipsItem> = null;

    private auto = false;

    protected onInited(): void {
        this.closeBtn.onClick = () => {
            this.close();
        };

        const list = GTable.getList("BattlePropertyTbl");
        let tbl = list.find((d) => d.key == this._windowParam.key);
        this.title.setText([tbl.displayDesc]);
        let obj = { left: -100, right: 100 };

        console.log("pos =", this._windowParam.pos);

        let p = this.node.convertToNodeSpaceAR(this._windowParam.pos);
        console.log("pos2 =", p);
        this.node.getChildByName("content").position = new cc.Vec3(p.x, p.y);
        let arr = [];
        this.uiList.setState(
            arr.map((d) => {
                return { name: d.name, num: d.num, isClick: false };
            })
        );
    }
}
