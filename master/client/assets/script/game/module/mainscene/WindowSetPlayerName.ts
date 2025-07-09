import { autowired, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIEditBox from "../../../framework/ui/UIEditBox";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIWindow from "../../../framework/ui/UIWindow";
import Item from "../../entity/Item";
import ListItemCost from "../hero/ListItemCost";

const { ccclass, property } = cc._decorator;
@registerClass("WindowSetPlayerName")
@ccclass
export default class WindowSetPlayerName extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    @autowired(UIButton) closeBtn: UIButton = null;
    @autowired(UIList) list: UIList<ListItemCost> = null;

    /**输入文本 */
    @autowired(UIEditBox) inputName: UIEditBox = null;
    /**使用 */
    @autowired(UIButton) useBtn: UIButton = null;
    @autowired(UILabel) setNameFree: UILabel = null;

    _windowParam: any;
    _returnValue: any;
    protected onInited(): void {
        this.closeBtn.onClick = () => {
            this.close();
        };

        this.setNameFree.node.active = GModel.player.isFreeChangeName();
        this.list.node.active = !GModel.player.isFreeChangeName();

        this.useBtn.onClick = () => {
            if (this.inputName.string.length == 0) {
                GTip.showTip([GLang.code.ui.chatSendMsgNotBeBlank]);
                return;
            }

            if (GModel.player.isFreeChangeName()) GModel.player.changeRoleName(this.inputName.string);
            else {
                GModel.player.changeRoleName(this.inputName.string);
            }
            this.inputName.string = "";
            this.close();
        };

        this.refList();
    }

    refList() {
        const cost2 = new Item(GIndex.id.diamondId, GConfig.player.changeNameCost);
        this.list.setState([{ item: cost2, require: cost2.count, storage: Item.getStorage(cost2) }]);
    }
}
