import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIWindow from "../../../framework/ui/UIWindow";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import Item from "../../entity/Item";

const { ccclass, property } = cc._decorator;

@registerClass("WindowComfirmBuy")
@ccclass
export default class WindowComfirmBuy extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: {
        /**声望商店物品 */
        item: Item;
        /**声望商店列表id */
        id: number;
    };
    _returnValue: any;

    /**减少数量按钮 */
    @autowired(UIButton) decrease: UIButton = null;
    /**增加数量按钮 */
    @autowired(UIButton) plus: UIButton = null;
    /**最小按钮 */
    @autowired(UIButton) minimum: UIButton = null;
    /**最大按钮 */
    @autowired(UIButton) maximum: UIButton = null;
    @autowired(UIButton) cancel: UIButton = null;
    @autowired(UIButton) closeBtn: UIButton = null;
    @autowired(UIButton) purchase: UIButton = null;
    /**购买一次得到的数量 */
    @autowired(UILabel) count: UILabel = null;
    @autowired(UIImage) image: UIImage = null;
    @autowired(UILabel) itemName: UILabel = null;
    /**拥有数量 */
    @autowired(UILabel) ownedCount: UILabel = null;
    @autowired(UILabel) itemInfo: UILabel = null;
    /**购买数量 */
    @autowired(UILabel) amount: UILabel = null;
    /**消耗物品 */
    @autowired(UIImage) costItem: UIImage = null;
    /**消耗数量 */
    @autowired(UILabel) costAmount: UILabel = null;
    private qty = 0;
    protected onInited(): void {
        let shoptbl = GTable.getById("StageReputationShopTbl", this._windowParam.id);
        let consume = shoptbl.reputation;
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.decrease.onClick = () => {
            if (this.qty > 0) {
                this.amount.setText(["_rs" + --this.qty]);
                this.costAmount.setText(["_rs" + this.qty * consume]);
            }
        };
        this.plus.onClick = () => {
            if (this.qty < shoptbl.storage) {
                this.amount.setText(["_rs" + ++this.qty]);
                this.costAmount.setText(["_rs" + this.qty * consume]);
            }
        };
        this.minimum.onClick = () => {
            this.qty = 1;
            this.amount.setText(["_rs" + this.qty]);
            this.costAmount.setText(["_rs" + this.qty * consume]);
        };
        this.maximum.onClick = () => {
            this.qty = shoptbl.storage;
            this.amount.setText(["_rs" + this.qty]);
            this.costAmount.setText(["_rs" + this.qty * consume]);
        };
        this.cancel.onClick = () => {
            this.close();
        };
        this.purchase.onClick = async () => {
            if (this.qty > 0) {
                await GModel.stage.buyReputationShopItem(this._windowParam.id, this.qty);
                this.close();
                GTip.showTip([GLang.code.ui.shop_success_buy]);
            } else {
                GTip.showTip([GLang.code.ui.buy_tip]);
            }
        };
        this.windowInit();
    }
    windowInit() {
        let itemtbl = GTable.getById("ItemTbl", this._windowParam.item.id);
        this.count.setText(["_rsx" + this._windowParam.item.count]);
        this.ownedCount.setText([
            "_rs" + GUtils.ui.getNumberString(GModel.knapsack.getStorageById(this._windowParam.item.id), 1),
        ]);
        this.itemInfo.setText([itemtbl.description]);
        this.image.imgName = itemtbl.img;
        this.itemName.setText([itemtbl.name]);
        this.amount.setText(["_rs" + 0]);
        this.costAmount.setText(["_rs" + 0]);
    }
}
