import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIWindow from "../../../framework/ui/UIWindow";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import Item from "../../entity/Item";

const { ccclass, property } = cc._decorator;
@registerClass("WindowItemDescription")
@ccclass
export default class WindowItemDescription extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: {
        item?: Item;
        initItem?: {
            quality: number;
            imageName: string;
            count: number;
            itemName: string;
            description: string;
        };
    };
    _returnValue: any;
    @autowired(UIButton) closeBtn: UIButton = null;
    @autowired(UIImage) quality: UIImage = null;
    @autowired(UIImage) image: UIImage = null;
    @autowired(UILabel) count: UILabel = null;
    @autowired(UILabel) itemName: UILabel = null;
    @autowired(UILabel) storage: UILabel = null;
    @autowired(UILabel) description: UILabel = null;
    protected onInited(): void {
        this.closeBtn.setTransition(false);
        this.closeBtn.onClick = () => {
            this.close();
        };
        if (this._windowParam.item) {
            this.quality.imgName = GConstant.quality[Item.getQuality(this._windowParam.item)];
            this.image.imgName = Item.getImg(this._windowParam.item);
            this.count.node.active = false;
            // this.count.setText(["_rsx" + GUtils.ui.getNumberString(this._windowParam.item.count, 0)]);
            this.storage.setText([
                "_rs" + GUtils.ui.getNumberString(GModel.knapsack.getStorageById(this._windowParam.item.id), 1),
            ]);
            this.itemName.setText(Item.getName(this._windowParam.item));
            this.description.setText(Item.getDescription(this._windowParam.item));
        }

        if (this._windowParam.initItem) {
            this.quality.imgName = GConstant.quality[this._windowParam.initItem.quality];
            this.image.imgName = this._windowParam.initItem.imageName;
            if (this._windowParam.initItem.count) {
                this.count.node.active = true;
                this.count.setText(["_rs" + this._windowParam.initItem.count]);
            }
            this.storage.node.active = false;
            this.storage.node.parent.getChildByName("UILabel").active = false;
            this.itemName.setText([this._windowParam.initItem.itemName]);
            this.description.setText([this._windowParam.initItem.description]);
        }
    }
}
