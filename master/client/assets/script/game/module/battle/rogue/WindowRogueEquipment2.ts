import { autowired, registerClass } from "../../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../../framework/ui/GWindow";
import UIButton from "../../../../framework/ui/UIButton";
import UIImage from "../../../../framework/ui/UIImage";
import UILabel from "../../../../framework/ui/UILabel";
import UIWindow from "../../../../framework/ui/UIWindow";
const { ccclass, property } = cc._decorator;
@registerClass("WindowRogueEquipment2")
@ccclass
export default class WindowRogueEquipment2 extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: {
        id: number;
    };
    _returnValue: any;
    /** */
    @autowired(UIButton) click: UIButton = null;
    @autowired(UILabel) nameLab: UILabel = null;
    @autowired(UILabel) desc: UILabel = null;
    @autowired(UIImage) img: UIImage = null;
    @autowired(UIImage) bg: UIImage = null;
    @autowired(UIImage) bg1: UIImage = null;
    @autowired(UIImage) title: UIImage = null;

    /**确认 */
    @autowired(UIButton) confirm: UIButton = null;
    /**高亮*/
    //@autowired(UIImage) high: UIImage = null;
    /**新装备 */
    @autowired(UIImage) newEquipment: UIImage = null;
    @autowired(UIImage) quality: UIImage = null;

    onInited(): void {
        const tbl = GTable.getById("RogueEquipmentTbl", this._windowParam.id);
        this.img.imgName = tbl.img;
        this.bg.imgName = "battle_select_bg_quality" + tbl.quality;
        this.nameLab.setText([tbl.name]);
        this.desc.setText([tbl.description]);
        this.confirm.onClick = () => {
            GWindow.close(WindowRogueEquipment2);
        };
    }
}
