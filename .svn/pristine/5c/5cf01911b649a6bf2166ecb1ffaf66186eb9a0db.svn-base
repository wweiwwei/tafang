import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIWindow from "../../../framework/ui/UIWindow";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import Item from "../../entity/Item";
import UIList from "../../../framework/ui/UIList";
import ListItemCost from "../hero/ListItemCost";
import UISlider from "../../../framework/ui/UISlider";
import EventName from "../../event/EventName";

const { ccclass, property } = cc._decorator;

@registerClass("WindowBuyStaff")
@ccclass
export default class WindowBuyStaff extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: {
        /**法杖id */
        id: number;
    };
    _returnValue: any;

    /**减少数量按钮 */
    @autowired(UIButton) decrease: UIButton = null;
    /**增加数量按钮 */
    @autowired(UIButton) plus: UIButton = null;
    @autowired(UIButton) cancel: UIButton = null;
    @autowired(UIButton) closeBtn: UIButton = null;
    @autowired(UIButton) purchase: UIButton = null;
    /**获取次数 */
    @autowired(UILabel) times: UILabel = null;
    @autowired(UIImage) image: UIImage = null;
    @autowired(UILabel) itemName: UILabel = null;
    /**拥有数量 */
    @autowired(UILabel) ownedCount: UILabel = null;
    /**物品简介 */
    @autowired(UILabel) itemInfo: UILabel = null;
    /**购买数量 */
    @autowired(UILabel) amount: UILabel = null;
    @autowired(UISlider) slider: UISlider = null;
    /**消耗列表 */
    @autowired(UIList) cost: UIList<ListItemCost> = null;
    private count = 1;
    protected onInited(): void {
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.windowInit();
    }
    @message([EventName.stateKey.storage])
    windowInit() {
        let itemtbl = GTable.getById("ItemTbl", this._windowParam.id);
        let stafftbl = GTable.getById("MagicStaffTbl", this._windowParam.id);
        [this.plus, this.decrease].forEach((b, i) => {
            b.onClick = () => {
                if (this.count > 1 && i === 1) {
                    this.amount.setText(["_rs" + --this.count + "/20"]);
                }
                if (this.count < 20 && i === 0) {
                    this.amount.setText(["_rs" + ++this.count + "/20"]);
                }
                this.slider.setProgress(this.count / 20);
                this.refreshCost();
            };
        });
        this.slider.onProgress = () => {
            this.count = Math.round(this.slider.bar.progress * 20);
            this.amount.setText(["_rs" + this.count + "/20"]);
        };
        this.cancel.onClick = () => {
            GModel.battle.videoAddMagicStaff(this._windowParam.id);
        };
        this.purchase.onClick = () => {
            GModel.battle.diamondBuyMagicStaff(this._windowParam.id, this.count);
        };
        this.times.setText(
            [GLang.code.ui.staff_get_times],
            ["_rs" + GModel.battle.getRemainVideoCount(this._windowParam.id) + "/" + stafftbl.videoLimit]
        );
        this.ownedCount.setText([
            "_rs" + GUtils.ui.getNumberString(GModel.knapsack.getStorageById(this._windowParam.id), 1),
        ]);
        this.itemInfo.setText([itemtbl.description]);
        this.image.imgName = itemtbl.img;
        this.itemName.setText([itemtbl.name]);
        this.amount.setText(["_rs" + this.count + "/20"]);
        this.slider.setProgress(this.count / 20);
        this.refreshCost();
    }
    refreshCost() {
        let stafftbl = GTable.getById("MagicStaffTbl", this._windowParam.id);
        this.cost.setState([
            {
                item: new Item(GIndex.id.diamondId, this.count * stafftbl.price),
                require: this.count * stafftbl.price,
                storage: GModel.knapsack.getStorageById(GIndex.id.diamondId),
            },
        ]);
    }
}
