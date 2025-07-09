import { autowired, message, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIList from "../../../framework/ui/UIList";
import UIWindow from "../../../framework/ui/UIWindow";
import Item from "../../entity/Item";
import EventName from "../../event/EventName";
import ListItemBanquetMissionBtn from "./ListItemBanquetMissionBtn";
import ListItemBanquetStore from "./ListItemBanquetStore";

const { ccclass, property } = cc._decorator;
@registerClass("WindowBanquetStore")
@ccclass
export default class WindowBanquetStore extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };

    _windowParam: any;
    _returnValue: any;
    /**列表 */
    @autowired(UIList) uiList: UIList<ListItemBanquetStore> = null;
    @autowired(UIList) btnList: UIList<ListItemBanquetMissionBtn> = null;
    /**返回按钮 */
    @autowired(UIButton) closeBtn: UIButton = null;

    /**积分 */
    @autowired(UIButton) point: UIButton = null;
    /**砖石 */
    @autowired(UIButton) diamond: UIButton = null;

    private curTagNum = 0;

    private menuText = [GLang.code.ui.banquet_ptsc, GLang.code.ui.banquet_zssc, GLang.code.ui.banquet_zhuanshi];
    protected onInited(): void {
        this.refItem();

        this.refPD();
        this.refBtn();
        this.closeBtn.onClick = () => {
            this.close();
        };
    }

    refBtn() {
        let a = this.menuText.map((t, index) => {
            return {
                num: index,
                curNum: this.curTagNum,
                text: t,
                cb: (num) => {
                    this.curTagNum = num;
                    this.refBtn();
                    this.refItem();
                },
            };
        });
        this.btnList.setState(a);
    }

    @message([EventName.stateKey.storage])
    refPD() {
        let i = new Item(20011, 0);
        this.point.bg.imgName = Item.getImg(i);
        this.point.text.setText(["_rs" + GUtils.ui.getNumberString(GModel.knapsack.getStorageById(52003), 2)]);

        let i2 = new Item(GIndex.id.diamondId, 0);
        this.diamond.bg.imgName = Item.getImg(i2);
        this.diamond.text.setText([
            "_rs" + GUtils.ui.getNumberString(GModel.knapsack.getStorageById(GIndex.id.diamondId), 2),
        ]);
    }

    @message([EventName.stateKey.banquetData])
    refItem() {
        let a = [];
        GTable.getList("BanquetShopTbl").map((t) => {
            if (t.page == this.curTagNum) a.push({ id: t.id });
        });
        this.uiList.setState(a);
    }
}
