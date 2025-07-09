import { autowired, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIRichText from "../../../framework/ui/UIRichText";
import UIWindow from "../../../framework/ui/UIWindow";

const { ccclass, property } = cc._decorator;
@registerClass("WindowFireBallDescription")
@ccclass
export default class WindowFireBallDescription extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    @autowired(UIButton) closeBtn: UIButton = null;
    @autowired(UILabel) tittle: UILabel = null;
    @autowired(UIRichText) time: UIRichText = null;
    @autowired(UIRichText) frequency: UIRichText = null;
    @autowired(UIRichText) speed: UIRichText = null;
    @autowired(UIRichText) improve: UIRichText = null;
    _windowParam: { id: number };
    _returnValue: any;
    protected onInited(): void {
        let tbl = GTable.getById("MagicStaffTbl", this._windowParam.id);
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.tittle.setText([GTable.getById("ItemTbl", tbl.id).name]);
        this.time.setText([GLang.code.ui.staff_last_time, "_rs" + tbl.duration]);
        this.frequency.setText([GLang.code.ui.staff_attack_speed, "_rs" + tbl.attackSpeed]);
        this.speed.setText([GLang.code.ui.staff_battle_speed, "_rs" + tbl.battleSpeed / 10000]);
        this.improve.setText([GLang.code.ui.staff_attack_improve, "_rs" + tbl.attackBuff / 100 + "%"]);
    }
}
