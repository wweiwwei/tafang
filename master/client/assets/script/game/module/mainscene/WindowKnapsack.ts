import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UIWindow from "../../../framework/ui/UIWindow";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import { CarEquipmentWrapper } from "../../entity/CarEquipment";
import { EquipmentWrapper } from "../../entity/Equipment";
import Item from "../../entity/Item";
import EventName from "../../event/EventName";
import ListItemItem from "../common/ListItemItem";
import UIList from "../../../framework/ui/UIList";

const { ccclass, property } = cc._decorator;
@registerClass("WindowKnapsack")
@ccclass
export default class WindowKnapsack extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
        hideMainScene: true,
    };
    _windowParam: number;
    _returnValue: any;
    /** */
    @autowired(UIScrollList) ItemsContainer: UIScrollList<ListItemItem> = null;
    /**法宝按钮 */
    @autowired(UIButton) props: UIButton = null;
    /**祝福按钮 */
    @autowired(UIButton) equipments: UIButton = null;
    /**返回 */
    @autowired(UIButton) returnBtn: UIButton = null;
    /**菜单按钮提示1 */
    @autowired(UIImage) menuTips1: UIImage = null;
    /**菜单按钮提示2 */
    @autowired(UIImage) menuTips2: UIImage = null;

    /**选择的物品 */
    @autowired(UIList) switchGoods: UIList<ListItemItem> = null;
    /**物品名称 */
    @autowired(UILabel) goodsName: UILabel = null;
    /**物品描述 */
    @autowired(UILabel) goodsText: UILabel = null;
    /**信息描述 */
    @autowired(UILabel) infoLab: UILabel = null;
    /**信息节点 */
    @autowired(UIList) infoList: UIList<ListItemItem> = null;
    /**中间提示 */
    @autowired(UILabel) tip: UILabel = null;

    private page = 0;
    protected onInited(): void {
        this.page = this._windowParam | 0;
        this.windowInit();
    }
    protected onRecycle(): void {}
    @message([EventName.stateKey.storage])
    windowInit() {
        let show = false;
        let storage = GModel.knapsack.getStorageById(GIndex.id.coinId);
        // GModel.hero
        //     .getAllEquipment()
        //     .map((t) => t.getEquipmentWrapperList())
        //     .reduce((acc, cur) => acc.concat(cur), [])
        //     .map((t) => {
        //         ((!t.isEquipmentMaxRank() &&
        //             t.getExpInfo().exp >= t.getExpInfo().require &&
        //             t.getUpgradeRankCoinRequire().count <= storage) ||
        //             (!t.isEquipmentMaxLevel() && t.upgradeCoinRequire().count <= storage)) &&
        //             (show = true);
        //     });
        this.equipments.bg.imgName = this.page === 1 ? "hero_list_chosen" : "hero_list_unchosen";
        this.props.bg.imgName = this.page === 0 ? "hero_list_chosen" : "hero_list_unchosen";
        this.infoLab.setText(this.page === 0 ? ["_rs组合技能"] : ["_rs流派名字"]);
        this.initInfo();
        this.props.onClick = () => {
            this.page = 0;
            this.windowInit();
        };
        this.equipments.onClick = () => {
            this.page = 1;
            this.windowInit();
        };
        this.returnBtn.onClick = () => {
            this.close();
        };
        this.refreshItems();
    }

    initInfo() {
        let state = [];
        switch (this.page) {
            case 0: {
                state = [];
            }
            case 1: {
                state = [];
            }
        }
        this.infoList.setState(state);
    }

    @message([EventName.stateKey.storage])
    refreshItems() {
        let state: {
            carEquipment: CarEquipmentWrapper;
            equipment: EquipmentWrapper;
            item: Item;
            status: number;
        }[] = [];
        if (this.page === 1) {
            // state = GModel.hero
            //     .getAllEquipment()
            //     .map((t) => t.getEquipmentWrapperList())
            //     .reduce((acc, cur) => acc.concat(cur), [])
            //     .filter((e) => e.count > 0)
            //     .sort((a, b) => {
            //         return b.getTbl().quality - a.getTbl().quality;
            //     })
            //     .map((t) => {
            //         return { carEquipment: null, equipment: t, item: null, status: 0 };
            //     });
        } else if (this.page == 0) {
            state = GModel.knapsack
                .getAllStorage()
                .filter((t) => Item.getKind(t) !== 21 && t.count > 0)
                .sort((a, b) => {
                    return Item.getQuality(b) - Item.getQuality(a);
                })
                .map((t) => {
                    return { carEquipment: null, item: t, equipment: null, status: 0 };
                });
        } else {
            state = GModel.car
                .getAllCarEquipment()
                .map((t) => t.getEquipmentWrapperList())
                .reduce((acc, cur) => acc.concat(cur), [])
                .sort((a, b) => {
                    return b.getTbl().quality - a.getTbl().quality;
                })
                .map((t) => {
                    return { carEquipment: t, item: null, equipment: null, status: 0 };
                });
        }
        this.ItemsContainer.setState(state);
    }
}
